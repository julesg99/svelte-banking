<script lang="ts">
	import { onMount } from "svelte";
	import { graphqlGetTransactions } from "../graphql/graphqlApi";
	import { transactionStore } from "../store";

  $: transactions = $transactionStore
  $: console.log('transactions @ base route', transactions)

  onMount(() => loadTransactions())

  async function loadTransactions() {
    const response = await graphqlGetTransactions({})
    if (response.errors) {
      response.errors.map((error: any) => console.log(error.message))
      alert('Transactions failed to load.')
    } else {
      transactions = response.data.Transactions
    }
  }
</script>

<table class="w-[98%] outline outline-1 outline-gray-300 m-3 p-3 rounded">
  <tr class="w-[98%] outline outline-1 outline-gray-300 rounded p-2 text-center">
    <td class="w-10 outline outline-1 outline-gray-50">id</td>
    <td class="w-20">created</td>
    <td class="w-20">updated</td>
    <td class="w-36">description</td>
    <td class="w-20">amount</td>
    <td class="w-20">status</td>
    <td class="w-20">category</td>
    <td class="w-20">transaction date</td>
    <td class="w-20">post date</td>
  </tr>
  {#each transactions as entry (entry.id)}
    <tr class='text-center'>
      <td class="">{entry.id}</td>
      <td>{entry.createdAt}</td>
      <td>{entry.updatedAt}</td>
      <td>{entry.description}</td>
      <td>{entry.amount}</td>
      <td>{entry.status}</td>
      <td>{entry.category}</td>
      <td>{entry.transactionDate}</td>
      {#if entry.postDate}
        <td>{entry.postDate}</td>
      {/if}
    </tr>
  {/each}
</table>
