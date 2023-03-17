<script lang='ts'>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Order_By, type GetFilteredTransactionQuery, type TransactionsFragment, type Transactions_Set_Input } from '../../graphql/graphql';
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
  let amountOrder: Order_By
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
    const response = await graphqlUpdateTransactions({id: event.detail.id, input: event.detail.changedProperties})
    if (response.errors) {
      console.log('response errors')
      response.errors.map((error: any) => console.log(error.message))
    } else {
      console.log('save Changes response', response.data.update_Transactions_by_pk)
    }
    changeFilter()
  }

  async function changeFilter() {
    let response = await filterTransactions(filters, statusTypes, accountId, pageLimit, currentPage, amountOrder)
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  }

  $: {
    currentPage, pageLimit, filters, amountOrder
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
      <td class="w-20 flex">
        Amount
        {#if (amountOrder === undefined)}
          <button on:click={() => amountOrder = Order_By.Asc}
            class="h-fit m-1 hover:outline outline-1 outline-gray-400 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>          
          </button>
        {:else if (amountOrder === Order_By.Asc)}
          <button on:click={() => amountOrder = Order_By.Desc}
            class="h-fit m-1 hover:outline outline-1 outline-gray-400 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
            </svg>
          </button>
        {:else if (amountOrder === Order_By.Desc)}
          <button on:click={() => amountOrder = Order_By.Asc}
            class="h-fit m-1 hover:outline outline-1 outline-gray-400 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd" />
            </svg>
          </button>
        {/if}
      </td>
      <td class="w-36">Transaction Date</td>
      <td class="w-32">Post Date</td>
      <td class="w-32">Category</td>
      <td class="w-1/5">Description</td>
      <td class="w-1/5">Notes</td>
    </tr>
    {#each transactions as entry (entry.id)}
      <TransactionTableRow transaction={entry} on:save={saveChanges}/>
    {/each}
  </table>
  <TransactionPaging bind:currentPage bind:pageLimit {pageOptions} totalTransactions={accountAggregates?.count ?? transactions.length}/>
</div>
