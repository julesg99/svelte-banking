<script lang="ts">
	import { onMount } from "svelte";
	import { graphqlGetTransactionSumByStatus, graphqlGetTransactionsWithAggregates } from "../graphql/graphqlApi";
	import { transactionStore } from "../store";
	import type { GetTransactionSumByStatusQuery, GetTransactionsWithAggregatesQuery } from "../graphql/graphql";
	import TransactionTable from "../components/TransactionTable.svelte";

  let aggregates: GetTransactionsWithAggregatesQuery["Transactions_aggregate"]["aggregate"]
  $: sumByStatus = new Map<string, GetTransactionSumByStatusQuery["Transactions_aggregate"]["aggregate"]>()
  $: transactions = $transactionStore
  $: console.log('transactions @ base route', transactions)

  onMount(() => {
    loadTransactionsWithAggregates()
    getTransactionSumByStatus('completed')
    getTransactionSumByStatus('pending')
  })

  async function loadTransactionsWithAggregates() {
    const response = await graphqlGetTransactionsWithAggregates({})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Server to load transactions.')
    } else {
      transactions = response.data.Transactions
      aggregates = response.data.Transactions_aggregate.aggregate
    }
  }

  async function getTransactionSumByStatus(status: string) {
    const response = await graphqlGetTransactionSumByStatus({status: status})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Server to load transactions.')
    } else {
      sumByStatus.set(status, response.data.Transactions_aggregate.aggregate)
      sumByStatus = sumByStatus
    }
  }
</script>

<TransactionTable {aggregates} {sumByStatus} {transactions} />
