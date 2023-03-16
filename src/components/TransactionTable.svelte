<script lang='ts'>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
  import Time from 'svelte-time';
	import type { GetFilteredTransactionQuery, TransactionsFragment } from '../graphql/graphql';
	import { filterTransactions, type transactionFilters } from '../services/filters';
	import { getFilteredTransactionsWithAggregates } from '../services/getData';
	import TransactionsFilters from './TransactionsFilters.svelte';

  export let accountId: string = ''

  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  let transactions: TransactionsFragment[] = []
  $: transactions = transactions

  let pageOptions: number[] = [10, 20, 25, 50]
  let pageLimit: number = 10
  let currentPage: number = 0

  let statusTypes: string[] = ["completed", "pending"]
  let statusFilter: string
  let categoryFilter: string 
  let dateFilter: Date
  let filters: transactionFilters = { category: "", status: "", date: new Date("999-11-31")}
  $: {
    filters.category = categoryFilter
    filters.date = dateFilter
    filters.status = statusFilter
  }

  // {
  //   if (transactions.length > 0) isHidden = true
  //   else isHidden = false
  // }
  // let isHidden = false


  onMount(async () => {
    let response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": +(accountId)}}, pageLimit, currentPage)
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  })

  async function changeFilter() {
    let response = await filterTransactions(filters, statusTypes, accountId, pageLimit, currentPage)
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  }

  $: {
    currentPage, pageLimit, filters
    changeFilter()
  }

</script>

<div class="">
  <TransactionsFilters bind:filters {statusTypes}/>

  <table class="w-[98%] outline outline-1 outline-gray-300 m-3 p-3 rounded shadow-lg">
    <tr class="w-[98%] outline outline-1 outline-gray-300 rounded p-2 text-center">
      {#if (!$page.params.accountId)}
        <td class="w-40">Name</td>    
      {/if}
      <td class="w-10">Status</td>
      <td class="w-10">Amount</td>
      <td class="w-32">Transaction Date</td>
      <td class="w-32">Post Date</td>
      <td class="w-32">Category</td>
      <td class="w-1/5">Description</td>
      <td class="w-1/5">Notes</td>
    </tr>
    {#each transactions as entry (entry.id)}
      <tr class='text-center border-t border-t-1'>
        {#if (!$page.params.accountId)}
          <td>{entry.Account.name}</td>
        {/if}
        <td class="capitalize px-2">{entry.status}</td>
        <td class="px-2">{entry.amount}</td>
        <td><Time timestamp={entry.transactionDate}/></td>
  
        {#if entry.postDate} <td><Time timestamp={entry.postDate}/></td>
        {:else} <td></td>
        {/if}
  
        <td class="capitalize">{entry.category}</td>
        <td>{entry.description}</td>
  
        {#if entry.notes} <td>{entry.notes}</td>
        {:else} <td></td>
        {/if}
      </tr>
    {/each}
  </table>
  <div class="flex mx-4">
    <p class="my-3">Page: {(currentPage/pageLimit)+1}</p>
    <button on:click={() => {if (currentPage > 0) {currentPage-=10}}}
      class="h-8 px-2 m-2 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100"
    >
      Prev
    </button>
    <button on:click={() => {currentPage+=10}}
      class="h-8 px-2 m-2 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100"
    >
      Next
    </button>  
    <p class="w-24 text-sm ml-5">Transactions per Page</p>
    <select bind:value={pageLimit}
      class="h-fit w-fit p-1 my-1 rounded-lg outline outline-1 outline-gray-400 shadow-sm"
    >
      {#each pageOptions as pg, index}
        <option value={pg}>{pg}</option>
      {/each}
    </select>
  </div>
</div>
