<script lang='ts'>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AccountAggregatesHeader from "../../../../components/AccountAggregatesHeader.svelte";
	import TransactionsFilters from "../../../../components/TransactionsFilters.svelte";
	import TransactionTable from "../../../../components/TransactionTable.svelte";
	import type { GetFilteredTransactionQuery, TransactionsFragment } from "../../../../graphql/graphql";
	import { getFilteredTransactionsWithAggregates } from "../../../../services/getData";
	import { accountStore, breadCrumbStore } from "../../../../store";

  $: accounts = $accountStore
  let accountId: string
  let accountName: string
  let transactions: TransactionsFragment[] 
  $: transactions = []
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]

  onMount(async () => {
    let response = await getFilteredTransactionsWithAggregates({"accountId": {"_eq": Number($page.params.accountId)}})
    accountAggregates = response.accountAggregates
    transactions = response.transactions
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

</script>

<AccountAggregatesHeader aggregates={accountAggregates}/>
<TransactionsFilters bind:transactions {accountId}/>
{#if transactions.length > 0}
  <TransactionTable {transactions} />
{:else}
  <div class="flex justify-center mt-10">
    <p class="font-bold text-cyan-500 text-xl">Huh? You don't have any transactions yet? Get to work!</p>
  </div>
{/if}
