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
    <td class="w-40">Name</td>
    <td class="w-10">Status</td>
    <td class="w-10">Amount</td>
    <td class="w-32">Transaction Date</td>
    <td class="w-32">Post Date</td>
    <td class="w-32">Category</td>
    <td class="w-1/5">Description</td>
    <td class="w-1/5">Notes</td>
  </tr>
  {#each transactions as entry (entry.id)}
    <tr class='text-center border-t border-t-1'>
      <td>{entry.Account.name}</td>
      <td class="capitalize px-2">{entry.status}</td>
      <td class="px-2">{entry.amount}</td>
      <td><Time timestamp={entry.transactionDate}/></td>

      {#if entry.postDate} <td><Time timestamp={entry.postDate}/></td>
      {:else} <td></td>
      {/if}

      <td class="capitalize">{entry.category}</td>
      <td>{entry.description}</td>

      {#if entry.notes} <td>{entry.notes}</td>
      {:else} <td></td>
      {/if}
    </tr>
  {/each}
</table>