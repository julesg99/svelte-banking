<script lang='ts'>
	import { page } from "$app/stores";
	import TransactionTable from "../../../../components/TransactionTable.svelte";
	import type { TransactionsFragment } from "../../../../graphql/graphql";
	import { graphqlGetTransactionsByAccount } from "../../../../graphql/graphqlApi";

  let transactions: TransactionsFragment[]
  async function getTransactionsByAccount(accountId: number) {
    const response = await graphqlGetTransactionsByAccount({object: accountId})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Account transactions failed to load.')
    } else {
      transactions = response.data.Transactions
    }
  }
</script>

<!-- <TransactionTable {transactions} />/ -->
