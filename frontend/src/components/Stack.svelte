<script>
    import Icon from "./Icon.svelte.unused.txt";
    import store from '../stores/store'
    import { stackPhases } from "../stores/store";
    // import { defaultStackSettings } from '../stores/store'
    import StackInputRow from "./StackInputRow.svelte";
    import { send } from "../utils/websocket";
    import StackStatus from "./StackStatus.svelte";
    import Separator from "./Separator.svelte";
    import { IconAperture, IconClock, IconFlag, IconPlayerPlay, IconRotate, IconSquareX } from "@tabler/icons-svelte"
    

    $: stackIsRunning = $store.stack_phase!==stackPhases.stopped

    function handleStart() {
        send({
            type: 'start_stack',
            stack_count: $store.stack_shots,
            step_distance: $store.stack_end >= 0 ? $store.step_distance : -$store.step_distance,
            stabilize_ms: $store.delay_stabilize * 1000,
            expose_ms: $store.delay_exposure * 1000,
            flash_recycle: $store.flash_recycle * 1000,
            stack_return: $store.stack_return,
        })
    }
    function handleStop() {
        send({ type: 'stop_stack' })
    }
    function handlePause() {
        send({ type: 'pause_stack' })
    }
    function handleResume() {
        send({ type: 'resume_stack' })
    }


</script>


<!-- <div>Travel: { travel } mm ({ state.stack_start } → { state.stack_end })</div> -->
<div class="input-fields">

    <!-- Travel -->
    <StackInputRow
        disabled={ stackIsRunning }
        staticValue={ $store.stack_end }
        label='Travel'
        unit='mm'
        step={ 0.1 }
        decimals={ 2 }
    />

    <!-- Step distance -->
    <StackInputRow
        disabled={ stackIsRunning }
        label='Step distance'
        unit='mm'
        fieldKey='step_distance'
        step={ 0.01 }
        decimals={ 3 }
    >   <IconFlag/>
    </StackInputRow>

    <!-- Stack shots -->
    <StackInputRow
        disabled={ stackIsRunning }
        label='Stack shots'
        fieldKey='stack_shots'
    >   <IconAperture/>
    </StackInputRow>

    <!-- Delay (stabilize) -->
    <StackInputRow
        disabled={ stackIsRunning }
        label='Delay (stabilize)'
        unit='s'
        fieldKey='delay_stabilize'
        step={ 0.1 }
    >   <IconClock/>
    </StackInputRow>

    <!-- Delay (exposure) -->
    <StackInputRow
        disabled={ stackIsRunning }
        label='Delay (exposure)'
        unit='s'
        fieldKey='delay_exposure'
        step={ 0.1 }
    >   <IconClock/>
    </StackInputRow>

    <!-- Delay (flash recycle) -->
    <StackInputRow
        disabled={ stackIsRunning }
        label='Flash recycle time'
        unit='s'
        fieldKey='flash_recycle'
        step={ 0.1 }
    >   <IconClock/>
    </StackInputRow>

    <!-- Return to start -->
    <StackInputRow
        disabled={ stackIsRunning }
        widget='checkbox'
        label='Return to zero once complete'
        fieldKey='stack_return'
    >   <IconRotate/>
    </StackInputRow>

</div>

<Separator/>

<StackStatus/>

<!-- [STOP] [PAUSE] [START/RESUME] -->
<div class="buttons centered">
    <button disabled={ !stackIsRunning } on:click={ handleStop }><IconSquareX color='firebrick' size={ 24 } />Stop</button>
    <button disabled={ !stackIsRunning && $store.stack_paused===false } on:click={ handlePause }><IconPlayerPlay color='dodgerblue' size={ 24 } />Pause</button>
    {#if stackIsRunning && $store.stack_paused }
    <button on:click={ handleResume }><IconPlayerPlay color='darkgreen' size={ 24 } />Resume</button>
    {:else }
    <button on:click={ handleStart }><IconPlayerPlay color='darkgreen' size={ 24 } />Start</button>
    {/if}
</div>


<style>

    .input-fields {
        display: grid;
        grid-template-columns: auto 1fr 5rem auto;
        text-align: left;
        row-gap: .5rem;
        column-gap: .5rem;
        vertical-align: middle;

        /* [All rows should have the same height] */
        /* grid-auto-rows: 1fr; */
    }

    .buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }

    .centered {
        justify-content: center;
    }

    :global(button:disabled svg) {
        opacity: .4;
    }

    button {
        min-height: auto;
    }
    
</style>