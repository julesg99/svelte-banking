<script lang='ts'>
  import type { AccountsFragment } from "../graphql/graphql";

  export let accounts: AccountsFragment[]
  let filteredAccounts: AccountsFragment[]
  let listToDisplay: AccountsFragment[]

  let filter: string
  $: {
    filteredAccounts = accounts.filter((acct) => (acct.name).includes(filter))
    if (filteredAccounts.length > 0) listToDisplay = filteredAccounts
    else listToDisplay = accounts
  }
</script>

<div class="m-2">
  <input class="h-10 m-1 ml-3 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Filter by Name" bind:value={filter}/>
  <div class="grid grid-cols-4">
    {#each listToDisplay as acct (acct.id)}
    <div class="grid-item p-2 m-2 border border-1 border-gray-300 rounded-xl shadow-md">
      <div class="h-6 bg-cyan-700 -m-2 rounded-t-xl" />
      
      <div class="flex mt-4">

        <div class='w-3/4'>
          <p>
            <b>Id:</b>
            {acct.id}
          </p>
          <p>
            <b>Name:</b>
            {acct.name}
          </p>    
        </div>

        <div class="w-1/4 flex justify-end">
          <a href='./accounts/{acct.id}'>
            <button class="w-16 h-8 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100">
              Select
            </button>
          </a>
        </div>

      </div>

    </div>  
    {/each}
    
  </div>

</div>
