<script lang="ts">
	import { onMount } from "svelte";
	import { graphqlGetFilteredTransactionsWithAggregates } from "../graphql/graphqlApi";
	import { breadCrumbStore, transactionStore } from "../store";
	import type { GetFilteredTransactionQuery } from "../graphql/graphql";
	import TransactionTable from "../components/TransactionTable.svelte";
	import GeneralAggregatesHeader from "../components/GeneralAggregatesHeader.svelte";
	import { getFilteredTransactionsWithAggregates } from "../services/getData";
	import TransactionsFilters from "../components/TransactionsFilters.svelte";

  let transactionAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  $: sumByStatus = new Map<string, GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]>()
  $: transactions = $transactionStore
  $breadCrumbStore = [{ name: 'home', url: '/' }]

  onMount(async () => {
    let response = await getFilteredTransactionsWithAggregates({})
    $transactionStore = response.transactions
    transactionAggregates = response.accountAggregates
    getTransactionSumByStatus('completed')
    getTransactionSumByStatus('pending')
  })

  async function getTransactionSumByStatus(status: string) {
    const response = await graphqlGetFilteredTransactionsWithAggregates({where: {"status": {"_eq": status}}})
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
<TransactionsFilters bind:transactions />
<TransactionTable {transactions} />
