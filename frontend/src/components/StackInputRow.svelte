<script>
    import store from "../stores/store";
    // import Tooltip from "./unused/Tooltip.svelte";
    // import SvelteTooltip from 'svelte-tooltip';
    import round from '../utils/round'
    // import { onMount } from "svelte";

    export let disabled = false
    // export let icon = null
    export let staticValue = null
    export let widget = 'number' // Any of these: ['number', 'checkbox']
    export let label = ''
    export let unit = ''
    export let fieldKey = null
    export let min = 0
    export let step = 1
    export let decimals = null

    let showTooltip = false

    $: travel = Math.abs($store.stack_end)
    // $: value = $store[fieldKey]

    // The true step distance rounded 
    $: trueStepDistance = round(Math.abs($store.stack_end) / ($store.stack_shots-1))


    // Two field are special: stack_shots and step_distance
    // If one of the two is changed, the other has to be recalculated
    function handleInput(event) {
        const value = Number(event.target?.value) || Number(event?.data)

        if(value===0)
            return

        console.log('New input:',value)

        $store[fieldKey] = decimals ? round(value,decimals) : value

        if(fieldKey === 'stack_shots') {
            updateStepDistance(value);
        }
        if(fieldKey === 'step_distance') {
            updateStackShots(value);
        }
    }
    
    function updateStepDistance(stack_shots) {
        if(stack_shots !== 0) {
            const newValue = (travel / (stack_shots-1))
            console.log('Recalculating step_distance from stack_shots:',newValue)
            $store.step_distance = round(newValue,2)
        }
    }

    function updateStackShots(step_distance) {
        if(step_distance !== 0) {
            console.log(travel,'/',step_distance)
            const newValue = Math.ceil(travel / step_distance)
            console.log('Recalculating stack_shots from step_distance:',newValue)
            $store.stack_shots = Number(newValue)+1
        }
    }

</script>




<!-- Icon -->
<span class="icon">
    <slot/>
</span>

<!-- Label -->
<span>
    <label for={ '_'+label }>{ label }</label>
    
    <!-- Info icon (with popup) -->
    <!-- {#if fieldKey==='step_distance' && Math.abs(trueStepDistance - $store.step_distance) > 0.01 }
    <div class="tooltip" on:click={ () => showTooltip = !showTooltip }>
        <SvelteTooltip
            tip={ `Will get rounded to ${ trueStepDistance } (${ Math.abs($store.stack_end) }mm / ${ $store.stack_shots } + 1)` }
            color='#000000b0' active={ showTooltip } bottom>
            &nbsp;<Icon name='info' color='gray' size=16/>
        </SvelteTooltip>
    </div>
    {/if} -->
</span>

<!-- Input widget -->
{#if staticValue !== null}
    <div class="display-field" class:error={ staticValue==0 }>{ decimals ? round(staticValue,decimals) : staticValue }</div>

    <!-- To do: add +/- buttons -->

{:else if widget==='number'}
    <!-- {#if decimals === null} -->
    {#if fieldKey === 'step_distance' || fieldKey === 'stack_shots'}
    <input {disabled} type="number" id={ label } value={ $store[fieldKey] } on:input={ handleInput } min={ min } step={ step }>
    {:else}
    <input {disabled} type="number" id={ label } bind:value={ $store[fieldKey] } min={ min } step={ step }>
    {/if}
    <!-- {:else}
    <input type="number" id={ label } value={ trueValue.toFixed(decimals) } min={ min } step={ step } on:input={ (e) => handleInput(e) }>
    {/if} -->

{:else if widget==='checkbox'}
    <input {disabled} type="checkbox" id={ label } bind:checked={ $store[fieldKey] }>

{/if}

<!-- Unit -->
<span class="unit">{ unit }</span>





<style>
    
    span, label {
        display: flex;
        align-items: center;
    }
    
    input {
        /* max-width: 5rem; */
        max-width: 100%;
    }

    input[type=checkbox] {
        margin: auto;
        width: 1rem;
        height: 1rem;
        aspect-ratio: 1;
    }

    .display-field {
        /* max-width: 5rem; */
        max-width: 100%;
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 0.4em;
        cursor: default;
        color: #888;
    }

    .tooltip {
        color: white;
    }

    .error {
        border: 2px solid darkred;
        color: darkred;
    }

</style>