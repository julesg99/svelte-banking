<script lang='ts'>
	import { page } from '$app/stores';
  import Time from 'svelte-time';
	import type { TransactionType } from "../store";

  
  export let transactions: TransactionType[]
</script>

<table class="w-[98%] outline outline-1 outline-gray-300 m-3 p-3 rounded shadow-lg">
  <tr class="w-[98%] outline outline-1 outline-gray-300 rounded p-2 text-center">
    {#if (!$page.params.accountId)}
      <td class="w-40">Name</td>    
    {/if}
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
      {#if (!$page.params.accountId)}
        <td>{entry.Account.name}</td>
      {/if}
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