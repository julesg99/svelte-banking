<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';
	import GenerateFakeTransaction from '../components/prototype/GenerateFakeTransaction.svelte';
	import type { GetAccountsQuery } from '../graphql/graphql';
	import { graphqlGetAccounts } from '../graphql/graphqlApi';
	import { accountStore } from '../store';

  let accountAggregates: GetAccountsQuery["Accounts_aggregate"]["aggregate"]
  $: accounts = $accountStore

  let pageTitle: string = 'Home'
  $: {
    if ($page.route.id === '/') pageTitle='Home'
    else pageTitle = $page.route.id?.substring(1) ?? 'Error'
  }

  onMount(() => {
    loadAccounts()
  })

  async function loadAccounts() {
    const response = await graphqlGetAccounts({})
    if (response.errors){
      response.errors.map((error: any) => console.log(error.message))
      alert('Server failed to load accounts.')
    } else {
      $accountStore = response.data.Accounts
      accountAggregates = response.data.Accounts_aggregate.aggregate
    }
  }

</script>

<div class="flex">
	<div class="w-[20rem] p-2 min-h-[100vh] bg-gray-100 border-r-2 border-gray-200">
		<div class="h-[3rem] text-blue-500 flex justify-center items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
			<div class="ml-2 font-bold">Hey Integritier!</div>
		</div>

    <div class="m-1 mt-3 p-2 rounded-lg border border-cyan-500">
      <a href='/' class="w-full text-cyan-600 underline underline-offset-2 decoration-1 hover:text-purple-500"><p>Home</p></a>
      <a href='/accounts' class="w-full text-cyan-600 underline underline-offset-2 decoration-1 hover:text-purple-500"><p>Accounts</p></a>
    </div>

		<div class="mt-4"><GenerateFakeTransaction {accounts} /></div>
	</div>
	<div class="w-full">
		<div
			class="h-[4rem] w-full bg-gray-50 flex justify-between items-center align-middle border-b-2 border-gray-200"
		>
			<div class="ml-5 font-bold text-cyan-600 text-xl capitalize">{pageTitle}</div>
		</div>

		<slot />
	</div>

</div>
