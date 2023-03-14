<script lang="ts">
	import { onMount } from "svelte";
	import { graphqlGetTransactionSumByStatus, graphqlGetTransactionsWithAggregates } from "../graphql/graphqlApi";
	import { breadCrumbStore, transactionStore } from "../store";
	import type { GetTransactionSumByStatusQuery, GetTransactionsWithAggregatesQuery } from "../graphql/graphql";
	import TransactionTable from "../components/TransactionTable.svelte";
	import GeneralAggregatesHeader from "../components/GeneralAggregatesHeader.svelte";

  let transactionAggregates: GetTransactionsWithAggregatesQuery["Transactions_aggregate"]["aggregate"]
  $: sumByStatus = new Map<string, GetTransactionSumByStatusQuery["Transactions_aggregate"]["aggregate"]>()
  $: transactions = $transactionStore
  $breadCrumbStore = [{ name: 'home', url: '/' }]

  onMount(() => {
    loadTransactionsWithAggregates()
    getTransactionSumByStatus('completed')
    getTransactionSumByStatus('pending')
  })

  async function loadTransactionsWithAggregates() {
    const response = await graphqlGetTransactionsWithAggregates({})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Server failed to load transactions.')
    } else {
      $transactionStore = response.data.Transactions
      transactionAggregates = response.data.Transactions_aggregate.aggregate
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

<GeneralAggregatesHeader aggregates={transactionAggregates} {sumByStatus} />
<TransactionTable {transactions} />
