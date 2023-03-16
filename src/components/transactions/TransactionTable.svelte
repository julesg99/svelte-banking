<script lang='ts'>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { GetFilteredTransactionQuery, TransactionsFragment, Transactions_Set_Input } from '../../graphql/graphql';
	import { graphqlUpdateTransactions } from '../../graphql/graphqlApi';
	import { filterTransactions, type transactionFilters } from '../../services/filters';
	import { getFilteredTransactionsWithAggregates } from '../../services/getData';
	import TransactionPaging from './TransactionPaging.svelte';
	import TransactionsFilters from './TransactionsFilters.svelte';
	import TransactionTableRow from './TransactionTableRow.svelte';

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

  async function saveChanges(event: any) {
    delete event.detail.Account
    let transaction: Transactions_Set_Input = event.detail
    const response = await graphqlUpdateTransactions({id: event.detail.id, input: transaction})
    if (response.errors) {
      console.log('update transaction event', transaction)
      console.log('response errors')
      response.errors.map((error: any) => console.log(error.message))
    } else {
      console.log('response', response.data.update_Transactions_by_pk)
    }
    changeFilter()
  }

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

<div class="mx-2 py-2 bg-gray-100 border border-1 border-gray-300 rounded">
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
      <TransactionTableRow transaction={entry} on:save={saveChanges}/>
    {/each}
  </table>
  <TransactionPaging bind:currentPage bind:pageLimit {pageOptions} />
</div>
