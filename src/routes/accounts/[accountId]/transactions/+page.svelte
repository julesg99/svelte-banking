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
  console.log(accounts)

  let accountName: string
  $: {
    accountName = accounts.find(acct => acct.id === Number($page.params.accountId))?.name ?? 'Error'
    $breadCrumbStore = [
      { name: 'home', url: './' },
      { name: 'accounts', url: './accounts' },
      { name: accountName, url: `./accounts/${$page.params.accountId}` },
      { name: 'transactions', url: `./accounts/${$page.params.accountId}/transactions`}
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
<TransactionTable {transactions} />
