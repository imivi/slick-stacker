<script lang="ts">
    // Components
    import { onMount } from "svelte";
    import Icon from './components/Icon.svelte.unused.txt'
    import Stack from './components/Stack.svelte';
    import Settings from './components/Settings.svelte';
    import EditSteps from './components/EditSteps.svelte';
    import Modal from "./components/Modal.svelte";
    import StatusBar from './components/StatusBar.svelte'

    // Store & utils
    import store from './stores/store'
    import { websocket, send } from './utils/websocket'
    import round from './utils/round'
    import fixed from './utils/fixed'

    // Icons
    import { IconArrowUp, IconArrowDown, IconEdit, IconArrowRight, IconX, IconCircle, IconDisc, IconAperture, IconCameraOff, IconSettings, IconLayersSubtract, IconStack2, IconCircleDot } from "@tabler/icons-svelte"


    let showStack = false
    let showSettings = false
    let showEditSteps = false

    // let showDummyModal = false

    let connected = false

    const DEBUG = true

    $: motorIsIdle = Math.abs($store.position - $store.target) < 0.01


    onMount(() => {
            console.log('Assigning callbacks to websocket')
            
            // Assign callbacks
            websocket.onopen = function(evt) { onOpen(evt) };
            websocket.onclose = function(evt) { onClose(evt) };
            websocket.onmessage = function(evt) { onMessage(evt) };
            websocket.onerror = function(evt) { onError(evt) };
    });

    // Called when a WebSocket connection is established with the server
    function onOpen(evt) {
        console.log("Connected");
        connected = true;
        send({ type: "get_position" })
    }

    // Called when the WebSocket connection is closed
    function onClose(evt) {
        console.log("Disconnected");
        connected = false;
    }

    // Called when a message is received from the server
    function onMessage(evt) {
        const data = JSON.parse(evt.data)
        // console.log("Message received from server:");
        // console.log(data);
        $store = { ...$store, ...data }
    }

    // Called when a WebSocket error occurs
    function onError(evt) {
        console.log("Websocket error: " + evt.data);
    }

    /***** Issuing messages to the server *****/

    function issueStep(stepValue) {
        // console.log('Stepping by distance:',stepValue)
        send({ type: 'step', value: stepValue })
        send({ type: 'get_position' })
    }

    function issueShoot() {
        send({ type: 'shoot' })
    }

    function issueFocus() {
        send({ type: 'focus' })
    }

    function issueSetZero() {
        send({ type: 'set_zero' })
    }
    function issueGoZero() {
        send({ type: 'go_to', value: 0 })
    }
    function issueSetEnd() {
        $store.stack_end = round($store.position, 2)
        // send({ type: 'set_end' })
    }
    function issueGoEnd() {
        send({ type: 'go_to', value: $store.stack_end })
    }

    function issueStop() {
        send({ type: 'stop' })
    }

    function handleSetTargetPosition(event) {
        const newTargetPosition = Number(event.target.value)
        $store.target = newTargetPosition
        send({ type: 'set_target', value: newTargetPosition })
    }

    function handleInputStackEnd() {
        if($store.stack_end !== 0) {
            // To do (fix)
            $store.stack_shots = Math.ceil(Math.abs($store.stack_end) / $store.step_distance) + 1
            $store.step_distance = Math.abs($store.stack_end) / ($store.stack_shots-1)
        }
    }

</script>




<StatusBar {connected}/>


<main>

    <!-- Modals -->
    
    <Modal on:click={ ()=>showEditSteps=!showEditSteps} show={ showEditSteps } title='Edit values' icon='flag' iconColor='dodgerblue'>
        <EditSteps/>
    </Modal>

    <Modal on:click={ ()=>showStack=!showStack} show={ showStack } title='Stack' icon='layers' iconColor='green'>
        <Stack/>
    </Modal>

    <Modal on:click={ ()=>showSettings=!showSettings} show={ showSettings } title='Settings' icon='settings' iconColor='slategray'>
        <Settings/>
    </Modal>

    <!-- <Modal show={ showDummyModal } title='Dummy' icon='info'>
        <p>Dummy modal content</p>
    </Modal> -->

    <div class="interface">

        <!-- <button on:click={ () => showDummyModal=true }>Show dummy modal</button> -->

        <div class='position'>

            <!-- Labels -->
            <span class="label">Position (mm)</span>
            <span></span>
            <span class="label">Target</span>

            <!-- [Position] [->] [Target] -->

            <div>{ fixed($store.position) }</div>

            {#if motorIsIdle}
                <span>
                    <IconArrowRight color='rosybrown' size={ 26 }/></span>
            {:else}
                <span on:click={ issueStop } class="cursor-pointer">
                    <IconX color='firebrick' size={ 26 }/>
                </span>
            {/if}

            <div class="target-position-container">
                <input
                    class="target-position buttonless"
                    id='target-position'
                    type="number" size={ 1 }
                    step={ 0.01 }
                    value={ fixed($store.target) }
                    on:change={ (e) => handleSetTargetPosition(e) }>
                <!-- <label for="target-position"><Icon name='edit' color='gray' size='26'/></label> -->
                <label for="target-position" class="target-position-edit cursor-pointer">
                    <IconEdit size={ 16 } color='#aaa'/>
                </label>
            </div>
        </div>
        

        <!-- Step: [10] [1] [0.1] [0.01] -->
        <div>

            {#each [1,-1] as direction} 
            <div class="step-buttons">
                {#each $store.step_values as value }
                    <button on:click={ () => issueStep(value*direction) }>
                        {#if direction===1}
                            <IconArrowUp size={ 20 }/>
                        {:else}
                            <IconArrowDown size={ 20 }/>
                        {/if}
                        <span class='monospace'>{ direction===1 ? '+' : '-' }</span>
                        <span>{ value }</span>
                    </button>
                {/each}
            </div>
            {/each}

            <div class="edit-steps-buttons">
            <!-- {#each stepValues as value,i }
                <button>edit</button>
            {/each} -->
            <button on:click={ () => showEditSteps = true }>
                <span>edit values</span>
                <IconEdit color='steelblue' size={14}/>
            </button>
            </div>

        </div>


        <!--
        <div class="edit-custom-step">
            <Icon name='edit' color='dodgerblue' size='18'/>
            <input type="number" step="0.1" min="0" bind:value={ stepValues[3] }>
        </div>
        -->


        <!-- Stack start [SET] [GO] -->
        <!-- Stack end   [SET] [GO] -->
        <div class="stack-limits">
            <div class="limit-controls">
                <span>Stack start</span>
                <input type="number" value={ 0 } disabled>
                <button on:click={ issueSetZero }>
                    <IconCircleDot color='brown' size={ 16 }/>Set
                </button>
                <button on:click={ issueGoZero }><IconArrowRight color='steelblue' size={ 20 }/>Go</button>
            </div>
            <div class="limit-controls">
                <span>Stack end</span>
                <input type="number" bind:value={ $store.stack_end } on:input={ handleInputStackEnd }>
                <button on:click={ issueSetEnd }>
                    <IconCircleDot color='brown' size={ 16 }/>Set
                </button>
                <button on:click={ issueGoEnd }><IconArrowRight color='steelblue' size={ 20 }/>Go</button>
            </div>
        </div>


        <!-- [SHOOT] [FOCUS] [STACK] -->
        <div class="buttons-grid">

            <!-- SHOOT -->
            <button on:click={ issueShoot }><IconAperture color='dodgerblue' size={ 22 }/>Shoot</button>
            
            <!-- STACK -->
            <button on:click={ () => {showStack=true} }>
                <IconStack2 color='green' size={ 22 }/>
                <span class="chevron-right">Stack</span>
            </button>
            
            <!-- FOCUS -->
            <button on:click={ issueFocus }><IconCameraOff color='darkorange' size={ 22 }/>Focus</button>
            
            <!-- SETTINGS -->
            <button on:click={ () => {showSettings=true} }>
                <IconSettings color='slategray' size={ 22 }/>
                <span class="chevron-right">Settings</span>
            </button>
            
            <!-- DEBUG STUFF -->
            {#if DEBUG}
            <button class='debug' on:click={ () => send({type:'get_position'}) }>Get info</button>
            <button class='debug' on:click={ () => console.log($store) }>Log store</button>
            {/if}
            <!-- <button on:click={ issueStop } disabled={ Math.abs($store.position-$store.target)<0.1 }><Icon name='x-square' color='firebrick' size={ 18 }/>Stop</button> -->
        </div>


    </div>
    
</main>



<style>

    * {
        box-sizing: border-box;
    }

    main {
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }

    main {
        position: relative;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
    }

    .interface {
        width: 100%;
        height: 100%;
        margin: auto;
        /* background-color: #eee; */
        display: flex;
        gap: 1rem;
        flex-direction: column;
        text-align: center;
        padding: 2vw;
        /* position: relative; */
    }

    @media screen and (min-width: 600px) {
        .interface {
            border: 2px dashed #ddd;
        }
    }

    .step-buttons {
        /* display: grid; */
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: .2rem 0;
        /* grid-template-columns: repeat(4, 1fr); */
        /* grid-template-columns: minmax(auto, 25%) minmax(auto, 25%) minmax(auto, 25%) minmax(auto, 25%); */
        /* gap: 10px; */
    }

    .step-buttons button {
        width: 24%;
        display: flex;
        /* justify-content: flex-start; */
        align-items: center;
        /* padding: 4px 0 4px 5px; */
        /* font-size: 16px; */
    }

    .monospace {
        font-family: 'Courier New', Courier, monospace;
        margin: 0 -4px -4px -4px;
    }

    .buttons-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .5rem;
    }

    .buttons-grid button {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
        padding: .3rem .5rem;
    }

    .edit-steps-buttons {
        display: flex;
        width: 100%;
        /* justify-content: space-around; */
        justify-content: flex-end;
    }

    .edit-steps-buttons button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        height: auto;
        min-height: auto;
        color: steelblue;
        font-size: .9rem;
        cursor: pointer;
    }

    .chevron-right {
        position: relative;
    }

    .chevron-right::after {
        content: '›';
        margin-left: .3rem;
        font-size: 1.5em;
        position: absolute;
        bottom: -4px;
    }

    :global(.buttons-grid button svg) {
        margin-right: .3rem;
    }

    .position {
        gap: .5rem;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        padding: 5px;
        border-radius: 2px;

        display: grid;
        grid-template-columns: 1fr auto 1fr;
    }

    .position .label {
        font-size: 1.2rem;
        color: #999;
    }

    input.target-position {
        max-width: 7rem;
        text-align: center;
        border: none;
        border-radius: 0;
        border-bottom: 2px solid #ddd;
    }

    .target-position-container {
        position: relative;
    }

    .target-position-edit {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    /* Hide up/down buttons on number input fields */
    :global(input[type=number].buttonless::-webkit-inner-spin-button),
    :global(input[type=number].buttonless::-webkit-outer-spin-button) { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    :global(input[type=number].buttonless) {
        -moz-appearance:textfield;
        margin: 0;
        padding: 0;
    }

    :global(input, button, select, textarea) {
        font-family: inherit;
        font-size: inherit;
        -webkit-padding: 0.4em 0;
        padding: 0.4em;
        /* margin: 0 0 0.5em 0; */
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
    }

    /* .edit-custom-step {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: .5rem;
        color: dodgerblue;
    }
    .edit-custom-step input {
        text-align: center;
        max-width: 4.5rem;
    }
    button.colored {
        border-color: dodgerblue;
    } */

    .limit-controls {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: .5rem;
        width: 100%;
        margin: .5rem 0;
    }
    .limit-controls input {
        max-width: 5rem;
    }
    .limit-controls span {
        display: flex;
        align-items: center;
        justify-content: center;
    }


    input:disabled {
        color: #ccc;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    :global(button) {
        color: #333;
        background-color: #f4f4f4;
        outline: none;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .3rem;
    }

    :global(button:disabled) {
        color: #999;
    }

    :global(button:not(:disabled):active) {
        background-color: #ddd;
    }

    :global(button:focus) {
        border-color: #666;
    }

    button.debug {
        border: 2px dashed brown;
        color: brown;
    }

</style>