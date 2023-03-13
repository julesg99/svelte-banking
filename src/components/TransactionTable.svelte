<script lang='ts'>
  import Time from 'svelte-time';
	import type { GetTransactionSumByStatusQuery, GetTransactionsWithAggregatesQuery } from "../graphql/graphql";
	import type { TransactionType } from "../store";

  export let aggregates: GetTransactionsWithAggregatesQuery["Transactions_aggregate"]["aggregate"]
  export let sumByStatus: Map<string, GetTransactionSumByStatusQuery["Transactions_aggregate"]["aggregate"]>
  export let transactions: TransactionType[]
</script>

<div class="flex justify-center w-[98%] space-x-10 outline outline-1 outline-gray-300 m-3 p-3 rounded text-center shadow-md">

  <divider class="border border-1 border-gray-300"/>

  <div>
    <p># Transactions:</p>
    <p>{aggregates?.count}</p>
  </div>
  <div>
    <p>Total For All: </p>
    <p>{aggregates?.sum?.amount}</p>
  </div>
  <divider class="border border-1 border-gray-300"/>

  {#each [...sumByStatus] as status}
    <div>
      <p># Completed:</p>
      <p>{status[1]?.count}</p>
    </div>
    <div>
      <p class="capitalize">Total for {status[0]}:</p>
      <p>{status[1]?.sum?.amount}</p>
    </div>
    <divider class="border border-1 border-gray-300"/>
  {/each}

</div>

<table class="w-[98%] outline outline-1 outline-gray-300 m-3 p-3 rounded shadow-lg">
  <tr class="w-[98%] outline outline-1 outline-gray-300 rounded p-2 text-center">
    <td class="">Status</td>
    <td class="">Amount</td>
    <td class="">Category</td>
    <td class="w-48">Description</td>
    <td class="">Transaction Date</td>
    <td class="">Post Date</td>
    <td class="">Notes</td>
  </tr>
  {#each transactions as entry (entry.id)}
    <tr class='text-center border-t border-t-1'>
      <td class="capitalize">{entry.status}</td>
      <td>{entry.amount}</td>
      <td class="capitalize">{entry.category}</td>
      <td>{entry.description}</td>
      <td><Time timestamp={entry.transactionDate}/></td>
      {#if entry.postDate}
        <td><Time timestamp={entry.postDate}/></td>
      {:else}
        <td></td>
      {/if}
      {#if entry.notes}
        <td>{entry.notes}</td>
      {:else}
        <td></td>
      {/if}
    </tr>
  {/each}
</table>