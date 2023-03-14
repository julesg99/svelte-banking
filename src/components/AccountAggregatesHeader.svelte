<script lang='ts'>
	import type { GetTransactionByAccountWithAggregatesQuery } from "../graphql/graphql";

  export let aggregates: GetTransactionByAccountWithAggregatesQuery["Transactions_aggregate"]["aggregate"]
</script>

<div class="flex justify-center w-[98%] space-x-10 outline outline-1 outline-gray-300 m-3 p-3 rounded text-center shadow-md">

  <divider class="border border-1 border-gray-300"/>

  <div>
    <p># Transactions:</p>
    <p>{aggregates?.count}</p>
  </div>
  <div>
    <p>Total For All: </p>
    {#if (aggregates?.sum?.amount)}
      <p>{aggregates.sum.amount}</p>   
    {:else}
      <p>$0.00</p> 
    {/if}
  </div>
  <divider class="border border-1 border-gray-300" />

  <div>
    <p>Largest Purchase:</p>
  {#if (aggregates?.max?.amount)}
    <p>{aggregates.max.amount}</p>
  {:else}
    <p>$0.00</p>
  {/if}
  </div>
  <divider class="border border-1 border-gray-300" />

</div>
