<script lang='ts'>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AccountAggregatesHeader from "../../../../components/AccountAggregatesHeader.svelte";
	import TransactionTable from "../../../../components/TransactionTable.svelte";
	import type { GetTransactionByAccountWithAggregatesQuery, TransactionsFragment } from "../../../../graphql/graphql";
	import { graphqlGetTransactionsByAccount } from "../../../../graphql/graphqlApi";
	import { accountStore, breadCrumbStore } from "../../../../store";

  onMount(() => getTransactionsByAccount(Number($page.params.accountId)))

  let accountAggregates: GetTransactionByAccountWithAggregatesQuery["Transactions_aggregate"]["aggregate"]
  let transactions: TransactionsFragment[] = []

  $: accounts = $accountStore

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
  
  async function getTransactionsByAccount(accountId: number) {
    const response = await graphqlGetTransactionsByAccount({object: accountId})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Account transactions failed to load.')
    } else {
      transactions = response.data.Transactions
      accountAggregates = response.data.Transactions_aggregate.aggregate
    }
  }
</script>

<AccountAggregatesHeader aggregates={accountAggregates}/>
<div class="">
  <input class="h-10 mx-3 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Category"/>
  <select class="h-10 mx-3 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm">
    <option>Select Status Filter</option>
    <option>All</option>
    <option>Completed</option>
    <option>Pending</option>
  </select>
</div>
{#if transactions.length > 0}
  <TransactionTable {transactions} />
{:else}
  <div class="flex justify-center mt-10">
    <p class="font-bold text-cyan-500 text-xl">Huh? You don't have any transactions yet? Get to work!</p>
  </div>
{/if}
