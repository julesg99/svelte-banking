<script lang='ts'>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AccountAggregatesHeader from "../../../../components/AccountAggregatesHeader.svelte";
	import TransactionTable from "../../../../components/TransactionTable.svelte";
	import { Order_By, type GetFilteredTransactionQuery, type TransactionsFragment } from "../../../../graphql/graphql";
	import { getFilteredTransactionsWithAggregates } from "../../../../services/getData";
	import { accountStore, breadCrumbStore } from "../../../../store";

  $: accounts = $accountStore
  let accountId: string
  let accountName: string
  let statusTypes: string[] = []
  let transactions: TransactionsFragment[] = []
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]

  onMount(async () => {
    let response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": Number($page.params.accountId)}})
    accountAggregates = response.accountAggregates
    transactions = response.transactions

    let status: string[] = []
    transactions.flatMap(trans => {
      if (!status.includes(trans.status)) status.push(trans.status)
    })
    statusTypes = [...statusTypes, ...status]
  })

  $: {
    accountId = $page.params.accountId
    accountName = accounts.find(acct => acct.id === Number(accountId))?.name ?? 'Error'
    $breadCrumbStore = [
      { name: 'home', url: './' },
      { name: 'accounts', url: './accounts' },
      { name: accountName, url: `./accounts/${accountId}` },
      { name: 'transactions', url: `./accounts/${accountId}/transactions`}
    ]
  }
  
  let statusFilter: string
  let dateFilter: Date
  let categoryFilter: string

  async function changeStatusFilter() {
    let response
    if (!statusTypes.includes(statusFilter)) 
      response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": Number($page.params.accountId)}})
    else {
      response = await getFilteredTransactionsWithAggregates(
        {
          "accountId": {"_eq": Number($page.params.accountId)},
          "status": {"_eq": statusFilter}
        }
      )
    }
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  }

  async function changeDateFilter() {
    let response
    if (!dateFilter)
      response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": Number($page.params.accountId)}})
    else {
      response = await getFilteredTransactionsWithAggregates(
        {
          "accountId": {"_eq": Number($page.params.accountId)},
          "transactionDate": {"_gte": dateFilter}
        }, Order_By.Asc
      )
    }
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  }

  async function changeCategoryFilter() {
    let response
    if (!categoryFilter)
      response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": Number($page.params.accountId)}})
    else {
      response = await getFilteredTransactionsWithAggregates(
        {
          "accountId": {"_eq": Number($page.params.accountId)},
          "category": {"_like": categoryFilter.toLowerCase()}
        }
      )
    }
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  }

</script>

<AccountAggregatesHeader aggregates={accountAggregates}/>
<div class="">
  <select bind:value={statusFilter} on:change={() => changeStatusFilter()}
    class="h-10 mx-3 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm capitalize"
  >
    <option>Status Filter</option>
    {#each statusTypes as status, index}
      <option value={status} class="capitalize">{status}</option>
    {/each}
  </select>
  <input type='date' bind:value={dateFilter} on:change={() => changeDateFilter()}
    class="h-10 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Transaction Date"
  />
  <input bind:value={categoryFilter} on:change={() => changeCategoryFilter()}
    class="h-10 p-2 mx-3 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Category" 
  />
</div>
{#if transactions.length > 0}
  <TransactionTable {transactions} />
{:else}
  <div class="flex justify-center mt-10">
    <p class="font-bold text-cyan-500 text-xl">Huh? You don't have any transactions yet? Get to work!</p>
  </div>
{/if}
