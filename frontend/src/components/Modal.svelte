<script>
    import { IconX } from "@tabler/icons-svelte"
    import Separator from "./Separator.svelte";

    export let icon = ''
    export let iconColor = 'black'
    export let title = 'Title'
    
    export let show = false

</script>


{#if show}
<div class="modal">
    <div class="background black" on:click></div>
    <div class="content">

        <header>
            <h1>
                <!-- <Icon name={ icon } color={ iconColor } size={ 24 }/> -->
                { title }
            </h1>
            <button on:click><IconX color='gray' size={ 22 } />Close</button>
        </header>

        <Separator/>

        <slot></slot>

    </div>
</div>
{/if}


<style>

    .modal {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
    }

    .background {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    header {
        display: flex;
        width: 100%;
        /* justify-content: space-around; */
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2vh;
        gap: 1rem;
    }

    h1 {
        margin: 0;
        /* margin: 0 auto; */
        /* margin-bottom: 1rem; */
        padding: 0;
        display: flex;
        gap: .5rem;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }

    button {
        padding: .3rem .5rem;
        min-height: auto;
    }
    
    .black {
        background-color: rgba(0, 0, 0, 0.5);
        transition-property: background-color;
        transition-duration: 500ms;
    }

    .content {
        max-width: 400px;
        overflow-y: auto;
        background-color: white;
        margin: 1rem;
        padding: 1rem;
        z-index: 10;
        border-radius: 3px;
    }

</style>
