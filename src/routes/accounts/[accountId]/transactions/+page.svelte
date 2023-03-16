<script lang='ts'>
	import { page } from "$app/stores";
	import AccountAggregatesHeader from "../../../../components/AccountAggregatesHeader.svelte";
	import TransactionTable from "../../../../components/transactions/TransactionTable.svelte";
	import type { GetFilteredTransactionQuery, TransactionsFragment } from "../../../../graphql/graphql";
	import { accountStore, breadCrumbStore } from "../../../../store";

  $: accounts = $accountStore
  let accountId: string = $page.params.accountId
  let accountName: string
  let transactions: TransactionsFragment[] 
  $: transactions = []
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]

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
<TransactionTable {accountId} />
