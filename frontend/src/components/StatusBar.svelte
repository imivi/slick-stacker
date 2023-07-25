<script>
    import { IconCheck, IconRotate, IconRotateClockwise2, IconX } from "@tabler/icons-svelte"
    import Icon from "./Icon.svelte.unused.txt";

    export let connected = false;
</script>




<div class="status-bar" class:connected={connected}>
    {#if connected}
        <IconCheck size={ 18 } color='darkgreen'/>
        CONNECTED
    {:else}
        <IconX size={ 18 } color='darkred'/>
        DISCONNECTED
        <a href='/' class='button'>
            <IconRotate size={14}/>
            Reload
        </a>
    {/if}
</div>



<style>
    
    .status-bar {
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
        /* text-transform: uppercase; */
        /* background-color: rgb(186, 205, 224); */
        /* position: absolute; */
        /* top: 0; */
        text-align: center;
        padding: .2rem 0;
        font-size: .9rem;
        background-color: #eee;
        color: darkred;
    }

    .status-bar.connected {
        color: darkgreen;
    }

    a {
        text-decoration: none;
        color: #333;
    }
    
    .button {
        color: #333;
        background-color: #f4f4f4;
        outline: none;
        
        /* padding: 2px 5px; */
        margin: 0 .5rem;
        min-height: auto;

        font-family: inherit;
        font-size: inherit;
        -webkit-padding: 0.2em 0.4em;
        padding: 0.2em 0.4em;
        /* margin: 0 0 0.5em 0; */
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
        cursor: default;
    }

    .button:hover {
        background-color: #f8f8f8;
    }

    .button:active {
        background-color: #eee;
    }

    .button:focus {
        border-color: #666;
    }


</style>