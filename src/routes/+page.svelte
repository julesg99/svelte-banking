<script lang="ts">
	import { onMount } from "svelte";
	import { breadCrumbStore, transactionStore } from "../store";
	import type { GetFilteredTransactionQuery } from "../graphql/graphql";
	import TransactionTable from "../components/transactions/TransactionTable.svelte";
	import GeneralAggregatesHeader from "../components/GeneralAggregatesHeader.svelte";
	import { getFilteredTransactionsWithAggregates } from "../services/getData";

  let transactionAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  $: sumByStatus = new Map<string, GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]>()
  $breadCrumbStore = [{ name: 'home', url: '/' }]

  onMount(async () => {
    let response = await getFilteredTransactionsWithAggregates({}, 5, 0)
    $transactionStore = response.transactions
    transactionAggregates = response.accountAggregates

    response = await getFilteredTransactionsWithAggregates({"status": {"_eq": "completed"}}, $transactionStore.length, 0)
    sumByStatus.set("completed", response.accountAggregates)

    response = await getFilteredTransactionsWithAggregates({"status": {"_eq": "pending"}}, $transactionStore.length, 0)
    sumByStatus.set("pending", response.accountAggregates)

    sumByStatus = sumByStatus
  })

</script>

<GeneralAggregatesHeader aggregates={transactionAggregates} {sumByStatus} />
<TransactionTable />
