<script lang='ts'>
	import { onMount } from "svelte";
  import AccountDisplay from "../../components/AccountDisplay.svelte";
	import { graphqlGetAccounts } from "../../graphql/graphqlApi";
	import { accountStore } from "../../store";

  $: accounts = $accountStore

</script>

<AccountDisplay {accounts}/>