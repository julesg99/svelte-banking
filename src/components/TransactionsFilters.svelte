<script lang='ts'>
	import { onMount } from "svelte";
	import type { TransactionsFragment } from "../graphql/graphql";
	import { filterTransactions, type transactionFilters} from "../services/filters";

  export let transactions: TransactionsFragment[]
  export let accountId: string = ""

  let statusTypes: string[] = ["completed", "pending"]
  let filters: transactionFilters = {status: "", category: "", date: new Date("999-11-31")}
  let statusFilter: string
  let categoryFilter: string 
  let dateFilter: Date
  $: {
    filters.category = categoryFilter
    filters.date = dateFilter
    filters.status = statusFilter
  }

  // onMount(() => {
  //   let status: string[] = []
  //   transactions.flatMap(trans => {
  //     if (!status.includes(trans.status)) status.push(trans.status)
  //   })
  //   statusTypes = status
  // })


</script>

<div class="">
  <select bind:value={statusFilter} on:change={async () => {transactions = await filterTransactions(filters, statusTypes, accountId)}}
    class="h-10 mx-3 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm capitalize"
  >
    <option selected>Status Filter</option>
    {#each statusTypes as status, index}
      <option value={status} class="capitalize">{status}</option>
    {/each}
  </select>
  <input type='date' bind:value={dateFilter} on:change={async () => {transactions = await filterTransactions(filters, statusTypes, accountId)}}
    class="h-10 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Transaction Date"
  />
  <input bind:value={categoryFilter} on:change={async () => {transactions = await filterTransactions(filters, statusTypes, accountId)}}
    class="h-10 p-2 mx-3 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Category" 
  />
</div>