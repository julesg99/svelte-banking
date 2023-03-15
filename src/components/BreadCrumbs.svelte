<script lang='ts'>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { breadCrumbStore, type breadCrumbInfo } from "../store";

  let testCrumbs: breadCrumbInfo[]
  onMount(() => makeCrumbs())

  function makeCrumbs() {
    let route = $page.route.id?.split('/')
    route?.splice(0,1)
    // console.log(route)
  }

  let breadCrumbs: breadCrumbInfo[]
  $: breadCrumbs = $breadCrumbStore
</script>

<div class="h-[4rem] w-full pl-5 bg-gray-50 flex items-center align-middle border-b-2 border-gray-200">
  {#each breadCrumbs as crumb, index}
    <a href='/{crumb.url}' class="underline underline-offset-2 text-cyan-600 hover:text-purple-500">
      <p class="ml-2 font-bold text-cyan-600 text-xl capitalize hover:text-purple-500">{crumb.name}</p>
    </a>
    {#if (breadCrumbs.indexOf(crumb) < breadCrumbs.length-1)}
      <p class="ml-2 font-bold text-cyan-500 text-xl">{'>'}</p>
    {/if}
  {/each}
</div>