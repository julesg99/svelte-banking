<script lang='ts'>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AccountAggregatesHeader from "../../../../components/AccountAggregatesHeader.svelte";
	import TransactionTable from "../../../../components/TransactionTable.svelte";
	import type { GetFilteredTransactionQuery, TransactionsFragment } from "../../../../graphql/graphql";
	import { getFilteredTransactionsWithAggregates } from "../../../../services/getTransactions";
	import { accountStore, breadCrumbStore } from "../../../../store";

  onMount(async () => {
    let response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": Number($page.params.accountId)}})
    accountAggregates = response.accountAggregates
    transactions = response.transactions
  })

  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  let transactions: TransactionsFragment[] = []

  $: accounts = $accountStore

  let statusTypes: string[] = ['all']
  $: {
    let status: string[] = []
    transactions.flatMap(trans => {
      if (!status.includes(trans.status)) status.push(trans.status)
    })
    statusTypes = [...statusTypes, ...status]
  }

  let accountName: string
  let accountId: string
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
  
</script>

<AccountAggregatesHeader aggregates={accountAggregates}/>
<div class="">
  <select class="h-10 mx-3 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm capitalize">
    <option>Status Filter</option>
    {#each statusTypes as status, index}
      <option value={status} class="capitalize">{status}</option>
    {/each}
  </select>
  <input class="h-10 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Transaction Date"/>
  <input class="h-10 p-2 mx-3 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Category" />
</div>
{#if transactions.length > 0}
  <TransactionTable {transactions} />
{:else}
  <div class="flex justify-center mt-10">
    <p class="font-bold text-cyan-500 text-xl">Huh? You don't have any transactions yet? Get to work!</p>
  </div>
{/if}
