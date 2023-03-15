<script lang='ts'>
  import AccountDisplay from "../../components/AccountListDisplay.svelte";
	import { accountStore, breadCrumbStore } from "../../store";

  $: accounts = $accountStore
  $breadCrumbStore = [
    { name: 'home', url: './' },
    { name: 'accounts', url: './accounts' }
  ]

</script>

<AccountDisplay {accounts}/>