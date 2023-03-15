<script lang='ts'>
	import { page } from "$app/stores";
  import AccountDisplay from "../../components/AccountListDisplay.svelte";
	import { accountStore, breadCrumbStore } from "../../store";

  $: {
    if ($page.params.accountId) console.log($page.params.accountId)
    else console.log('doesnt exist')
  }

  $: accounts = $accountStore
  $breadCrumbStore = [
    { name: 'home', url: './' },
    { name: 'accounts', url: './accounts' }
  ]

</script>

<AccountDisplay {accounts}/>