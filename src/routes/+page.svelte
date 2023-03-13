<script lang="ts">
  import Time from "svelte-time";
	import { onMount } from "svelte";
	import { graphqlGetTransactions, graphqlGetTransactionsWithAggregates } from "../graphql/graphqlApi";
	import { transactionStore } from "../store";
	import type { GetTransactionsWithAggregatesQuery } from "../graphql/graphql";

  let aggregates: GetTransactionsWithAggregatesQuery["Transactions_aggregate"]['aggregate'];
  $: transactions = $transactionStore
  $: console.log('transactions @ base route', transactions)

  onMount(() => loadTransactionsWithAggregates())

  async function loadTransactionsWithAggregates() {
    const response = await graphqlGetTransactionsWithAggregates({})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Transactions failed to load.')
    } else {
      transactions = response.data.Transactions
      aggregates = response.data.Transactions_aggregate.aggregate
    }
  }
</script>

<div class="flex justify-center w-[98%] space-x-20 outline outline-1 outline-gray-300 m-3 p-3 rounded text-center">
  <div>
    <p># Transactions:</p>
    <p>{aggregates?.count}</p>
  </div>

  <divider class="border border-1 border-gray-300"/>

  <div>
    <p>Total for All: </p>
    <p>{aggregates?.sum?.amount}</p>
  </div>

  <divider class="border border-1 border-gray-300"/>

  <div>
    <p>Total for Complete: </p>
  </div>

  <divider class="border border-1 border-gray-300"/>

  <div>
    <p>Total for Pending: </p>
  </div>
</div>

<table class="w-[98%] outline outline-1 outline-gray-300 m-3 p-3 rounded">
  <tr class="w-[98%] outline outline-1 outline-gray-300 rounded p-2 text-center">
    <td class="w-6">Id</td>
    <td class="w-16">Created</td>
    <td class="w-16">Updated</td>
    <td class="w-20">Status</td>
    <td class="w-20">Amount</td>
    <td class="w-20">Category</td>
    <td class="w-40">Description</td>
    <td class="w-20">Transaction Date</td>
    <td class="w-20">Post Date</td>
  </tr>
  {#each transactions as entry (entry.id)}
    <tr class='text-center border-t border-t-1'>
      <td class="">{entry.id}</td>
      <td><Time timestamp={entry.createdAt} format='h:mm A on MMM D, YYYY'/></td>
      <td><Time timestamp={entry.updatedAt} format='h:mm A on MMM D, YYYY'/></td>
      <td>{entry.status}</td>
      <td>{entry.amount}</td>
      <td>{entry.category}</td>
      <td>{entry.description}</td>
      <td><Time timestamp={entry.transactionDate}/></td>
      {#if entry.postDate}
        <td><Time timestamp={entry.postDate}/></td>
      {/if}
    </tr>
  {/each}
</table>
