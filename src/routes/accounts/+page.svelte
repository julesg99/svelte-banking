<script lang='ts'>
	import { onMount } from "svelte";
  import AccountDisplay from "../../components/AccountDisplay.svelte";
	import { graphqlGetAccounts } from "../../graphql/graphqlApi";
	import { accountStore, breadCrumbStore } from "../../store";

  $: accounts = $accountStore
  $breadCrumbStore = [
    { name: 'home', url: './' },
    { name: 'accounts', url: './accounts' }
  ]

</script>

<AccountDisplay {accounts}/>