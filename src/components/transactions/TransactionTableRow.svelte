<script lang='ts'>
	import { page } from "$app/stores";
	import { createEventDispatcher } from "svelte";
	import Time from "svelte-time/src/Time.svelte";
	import type { TransactionsFragment } from "../../graphql/graphql";

  const dispatch = createEventDispatcher();

  export let transaction: TransactionsFragment

  let isEdit: boolean = false
  function handleSubmitUpdate() {
    dispatch('save', transaction)
    isEdit = false
  }
</script>

{#if !isEdit}
  <tr class='text-center border-t border-2 border-gray-200'>
    {#if (!$page.params.accountId)}
      <td class="">{transaction.Account.name}</td>
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
    <td class="flex justify-end">
      <button on:click={() => isEdit = true}
        class="h-6 px-2 m-1 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100"
      >Edit</button>
    </td>
  </tr>
{:else}
  <tr class="text-center border-t border-2 border-gray-200">
    {#if (!$page.params.accountId)}
      <td class="">{transaction.Account.name}</td>
    {/if}
    <td class="capitalize px-2">{transaction.status}</td>
    <td class="">
      <input bind:value={transaction.amount}
        class="w-24 m-1 p-1 outline outline-1 outline-gray-300 bg-gray-50 rounded"
      />
    </td>
    <td>
      <input type="date" bind:value={transaction.transactionDate}
        class="w-32 m-1 p-1 outline outline-1 outline-gray-300 bg-gray-50 rounded"
      />
    </td>
    <td>
      <input type="date" bind:value={transaction.postDate}
        class="w-32 m-1 p-1 outline outline-1 outline-gray-300 bg-gray-50 rounded"
      />
    </td>
    <td>
      <input bind:value={transaction.category}
        class="w-40 m-1 p-1 outline outline-1 outline-gray-300 bg-gray-50 rounded"
      />
    </td>
    <td>
      <input bind:value={transaction.description}
        class="w-ful m-1 p-1 outline outline-1 outline-gray-300 bg-gray-50 rounded"
      />
    </td>
    <td>
      <input bind:value={transaction.notes} placeholder="notes"
        class="m-1 p-1 outline outline-1 outline-gray-300 bg-gray-50 rounded"
      />
    </td>
    <td>
      <button on:click={handleSubmitUpdate}
        class="h-6 px-2 m-1 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100"
      >Save</button>
      <button on:click={() => isEdit = false}
        class="h-6 px-2 m-1 bg-red-300 outline outline-1 outline-red-500 rounded-lg hover:bg-red-400 hover:outline-red-600"
      >Cancel</button>
    </td>
  </tr>
{/if}
