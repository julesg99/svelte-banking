<script lang='ts'>
	import { createEventDispatcher } from "svelte";
	import type { transactionFilters } from "../../services/filters";
  let dispatch = createEventDispatcher()

  export let filters: transactionFilters
  export let statusTypes: string[]

  let statusFilter: string = 'undefined'
  let categoryFilter: string = ''
  let dateFilter: Date

  $: {
    filters.category = categoryFilter
    filters.date = dateFilter
    filters.status = statusFilter
  }

</script>

<div class="">
  <select bind:value={statusFilter} 
    class="h-10 mx-3 p-2 rounded-lg outline outline-1 outline-gray-300 bg-gray-50 shadow-md capitalize"
  >
    <option value={'undefined'} selected>Status Filter</option>
    {#each statusTypes as status, index}
      <option value={status} class="capitalize">{status}</option>
    {/each}
  </select>
  <input type='date' bind:value={dateFilter} 
    class="h-10 p-2 rounded-lg outline outline-1 outline-gray-300 bg-gray-50 shadow-md" placeholder="Filter by Transaction Date"
  />
  <input bind:value={categoryFilter} 
    class="h-10 p-2 mx-3 rounded-lg outline outline-1 outline-gray-300 bg-gray-50 shadow-md" placeholder="Filter by Category" 
  />
  <button on:click={() => {dispatch('clear')}}
    class="hover:text-red-500 hover:bg-gray-200 hover:shadow-md hover:outline outline-1 outline-red-500 rounded-lg p-1"
  >
    Clear Filters
  </button>
</div>