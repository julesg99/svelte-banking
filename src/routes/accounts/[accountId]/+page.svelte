<script lang='ts'>
	import { page } from "$app/stores";
	import { accountStore, breadCrumbStore } from "../../../store";

  $: accounts = $accountStore;

  let accountName: string
  $: {
    accountName = accounts.find(acct => acct.id === Number($page.params.accountId))?.name ?? 'Error'
    $breadCrumbStore = [
      { name: 'home', url: './' },
      { name: 'accounts', url: './accounts' },
      { name: accountName, url: `./accounts/${$page.params.accountId}` }
    ]
  }
  
</script>

<div class="m-4"> 
  <p>Nothing to see here...yet.</p>
  <a href='{$page.params.accountId}/transactions'>
    <button class="p-2 px-3 my-3 bg-cyan-500 outline outline-1 outline-gray-300 rounded-lg hover:bg-cyan-400 hover:outline-cyan-100">
      Go to Account Transactions
    </button>
  </a>
</div>

