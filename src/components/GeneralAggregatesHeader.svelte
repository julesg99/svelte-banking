<script lang='ts'>
  import type { GetTransactionSumByStatusQuery, GetTransactionsWithAggregatesQuery } from "../graphql/graphql";

  export let aggregates: GetTransactionsWithAggregatesQuery["Transactions_aggregate"]["aggregate"]
  export let sumByStatus: Map<string, GetTransactionSumByStatusQuery["Transactions_aggregate"]["aggregate"]>
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
