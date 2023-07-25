<script>
    import store from '../stores/store'
</script>


<div class="fields">

    {#each $store.step_values as stepValue,i}
        <label for={ 'step'+i }>Button { i+1 }</label>
        <span class='plusminus'>±</span>
        <input type="number" bind:value={ stepValue } name="" id={ 'step'+i } min={0}>
        <span>mm</span>
    {/each}

</div>


<style>

    .fields {
        display: grid;
        grid-template-columns: 2fr auto 1fr auto;
        row-gap: .5rem;
    }

    .plusminus {
        font-size: 1.2em;
    }

    .fields label,
    .fields span {
        display: flex;
        align-items: center;
        margin: 0 .5rem;
    }

    .fields input {
        width: 100%;
    }

</style>
