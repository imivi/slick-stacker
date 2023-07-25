<script>
    import { IconPlayerPause } from '@tabler/icons-svelte'
    import store from '../stores/store'
    import { stackPhases } from "../stores/store";
    import { stackPhaseNames } from "../stores/store";

    $: stackIsRunning = $store.stack_phase!==stackPhases.stopped

</script>


<!-- Stack stopped || shot 0/4 -->
<div class="container">
    <div class='stack-status' class:invisible={ !stackIsRunning }>
        <!-- <spanRunning? { stackIsRunning }</span -->
        <span>Stack <strong>{ stackPhaseNames[$store.stack_phase] }</strong></span>

        {#if $store.stack_paused }
        <span><IconPlayerPause size={18} color='dodgerblue'/></span>
        {/if }

        <span>shot <strong>{ $store.shot_counter } / { $store.stack_shots }</strong></span>
    </div>
</div>


<style>

    .container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }
    
    .stack-status {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-wrap: wrap;
        border: 1px solid #ccc;
        border-radius: .3rem;
        justify-self: center;
        align-self: center;
    }

    .stack-status span {
        padding: .2rem .5rem;
    }

    /* .stack-status span:nth-child(even) {
        background-color: #eee;
    } */

    .invisible {
        /* visibility: hidden; */
        opacity: 0.3;
    }

</style>