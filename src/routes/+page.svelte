<script lang="ts">
	import { onMount } from "svelte";
	import { breadCrumbStore, transactionStore } from "../store";
	import type { GetFilteredTransactionQuery } from "../graphql/graphql";
	import TransactionTable from "../components/transactions/TransactionTable.svelte";
	import GeneralAggregatesHeader from "../components/GeneralAggregatesHeader.svelte";
	import { getFilteredTransactionsWithAggregates } from "../services/getData";
	import DashboardGraphs from "../components/DashboardGraphs.svelte";

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
  
  enum tabs {
    Table,
    Graph
  }
  let currentTab: tabs = tabs.Table
</script>

<div class="-z-1">
  <div class="w-fit space-x-12 mx-10 mt-2">
    <button on:click={() => currentTab = tabs.Graph}
      class="w-24 h-12 p-1 mx-1 border border-1 border-b-0 border-gray-300 bg-gray-100 hover:bg-cyan-600 hover:border-cyan-200 hover:text-white rounded-t-xl"
    >
      Graph
    </button>
    
    <button on:click={() => currentTab = tabs.Table}
      class="w-24 h-12 p-1 mx-1 border border-1 border-b-0 border-gray-300 bg-gray-100 hover:bg-cyan-600 hover:border-cyan-200 hover:text-white rounded-t-xl"
    >
      Table
    </button>
  </div>
  
</div>
<div class="mx-2 py-2 bg-gray-100 border border-1 border-gray-300 rounded">
  <GeneralAggregatesHeader aggregates={transactionAggregates} {sumByStatus} />
  {#if currentTab === tabs.Table}
    <TransactionTable />
  {:else if currentTab === tabs.Graph}
    <DashboardGraphs />  
  {/if}
  
</div>
