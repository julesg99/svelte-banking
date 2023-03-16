<script lang='ts'>
	import { page } from "$app/stores";
	import Time from "svelte-time/src/Time.svelte";
	import type { TransactionsFragment } from "../../graphql/graphql";

  export let transaction: TransactionsFragment

</script>

<tr class='text-center border-t border-t-1'>
  {#if (!$page.params.accountId)}
    <td>{transaction.Account.name}</td>
  {/if}
  <td class="capitalize px-2">{transaction.status}</td>
  <td class="px-2">{transaction.amount}</td>
  <td><Time timestamp={transaction.transactionDate}/></td>

  {#if transaction.postDate} <td><Time timestamp={transaction.postDate}/></td>
  {:else} <td></td>
  {/if}

  <td class="capitalize">{transaction.category}</td>
  <td>{transaction.description}</td>

  {#if transaction.notes} <td>{transaction.notes}</td>
  {:else} <td></td>
  {/if}
</tr>