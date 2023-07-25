<script>
    import store from '../stores/store'
    import { defaultSettings } from "../stores/store";
    import { send } from "../utils/websocket";

    function sendMicrostepping() {
        send({ type: 'set_microstepping', value: $store.microstepping })
    }
    function sendMaxSpeed() {
        send({ type: 'set_speed', value: $store.max_speed })
    }
    function sendAcceleration() {
        send({ type: 'set_acceleration', value: $store.acceleration })
    }
    function sendStepsPerTurn() {
        send({ type: 'set_steps_per_turn', value: $store.steps_per_turn })
    }
    function sendScrewLead() {
        send({ type: 'set_screw_lead', value: $store.screw_lead })
    }
    function sendUnpower() {
        send({ type: 'unpower_idle', value: $store.unpower_idle })
    }
    function sendInvert() {
        send({ type: 'set_invert', value: $store.invert })
    }
    function resetDefaultSettings() {
        $store = { ...$store, ...defaultSettings }
    }

</script>



<div class="fields">

    <!-- SPEED -->
    <label for="_inputSpeed">Max speed (mm/s)</label>
    <input type="number" bind:value={ $store.max_speed } name="" id="inputSpeed" min={0} on:input={ sendMaxSpeed }>

    <!-- ACCELERATION -->
    <label for="_inputSpeed">Acceleration (mm/s/s)</label>
    <input type="number" bind:value={ $store.acceleration } name="" id="inputSpeed" min={0} on:input={ sendAcceleration }>

    <!-- MICROSTEPPING -->
    <label for="_microstepping">Microstepping</label>
    <select bind:value={ $store.microstepping } name="microstepping" id="" on:change={ sendMicrostepping }>
        <option value={1}>1</option>
        <option value={2}>1/2</option>
        <option value={4}>1/4</option>
        <option value={8}>1/8</option>
        <option value={16}>1/16</option>
        <option value={32}>1/32</option>
    </select>

    <!-- STEPS PER TURN -->
    <label for="_steps_per_turn">Steps per turn</label>
    <input type="number" bind:value={ $store.steps_per_turn } name="" id="steps_per_turn" min={0} on:input={ sendStepsPerTurn }>

    <!-- SCREW LEAD -->
    <label for="_screw_lead">Screw lead (mm)</label>
    <input type="number" bind:value={ $store.screw_lead } name="" id="screw_lead" min={0} on:input={ sendScrewLead }>

    <!-- INVERT DIRECTION -->
    <label for="_invert">Invert direction</label>
    <div class="center">
        <input type="checkbox" name="" id="invert" bind:checked={ $store.invert } on:click={ sendInvert }>
    </div>

    <!-- DISABLE STEPPER WHEN IDLE -->
    <label for="_unpower_idle">Unpower motor if idle</label>
    <div class="center">
        <input type="checkbox" name="" id="unpower_idle" bind:checked={ $store.unpower_idle } on:click={ sendUnpower }>
    </div>

</div>

<div>
    <button on:click={ resetDefaultSettings }>Reset all default settings</button>
</div>


<style>

    .fields {
        display: grid;
        grid-template-columns: 2fr 1fr;
        row-gap: .5rem;
    }

    .fields label {
        display: flex;
        align-items: center;
    }

    .fields input,
    .fields select {
        width: 100%;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button {
        margin: auto;
        margin-top: 1rem;
    }

</style>