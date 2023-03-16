<script lang='ts'>
  export let currentPage: number
  export let pageLimit: number
  export let pageOptions: number[]
</script>

<div class="flex mx-4">
  <p class="my-3">Page: {(currentPage/pageLimit)+1}</p>
  <button on:click={() => {if (currentPage > 0) {currentPage-=10}}}
    class="h-8 px-2 m-2 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100 shadow-md"
  >
    Prev
  </button>
  <button on:click={() => {currentPage+=10}}
    class="h-8 px-2 m-2 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100 shadow-md"
  >
    Next
  </button>  
  <p class="w-24 text-sm ml-5">Transactions per Page</p>
  <select bind:value={pageLimit}
    class="h-fit w-fit p-1 my-1 rounded-lg outline outline-1 outline-gray-300 bg-gray-50 shadow-md"
  >
    {#each pageOptions as pg, index}
      <option value={pg}>{pg}</option>
    {/each}
  </select>
</div>