<script lang="ts">
	import { faker } from '@faker-js/faker';
	import type { AccountsFragment } from '../../graphql/graphql';
	import { graphqlInsertTransactions } from '../../graphql/graphqlApi';
	import { transactionStore } from '../../store';

  export let accounts: AccountsFragment[]
  $: transactions = $transactionStore

	function generateTransaction() {
		const transactionDate = faker.date.between('2023-02-13', '2023-04-13');
		const status = faker.helpers.arrayElement(['pending', 'completed']);
		let postDate: Date | null = null;
		if (status === 'completed') {
			postDate = transactionDate;
			postDate.setDate(transactionDate.getDate() + faker.datatype.number({ min: 1, max: 3 }));
		}

		const category = faker.helpers.arrayElement(['food', 'entertainment', 'utilities']);
		const description = faker.helpers.arrayElement(
			{
				food: ['coffee', 'groceries', 'burritos'],
				entertainment: ['streaming', 'movies', 'pickleball'],
				utilities: ['electricity', 'water', 'gas']
			}[category]
		);

    let accountId = accounts.find(acct => acct.name === accountName)?.id ?? -1

    return {
			amount: faker.finance.amount(),
			description,
			category,
			status,
			transactionDate,
			postDate,
      accountId
		};
	}
  $: {
    if (accountName !== '') disabled=false
    else disabled = true
  }

	let result = '';
	let statusCode = '';
  let accountName: string = '';
	let disabled = true;
	async function generate() {
		disabled = true;
    const response = await graphqlInsertTransactions({object: [...Array(10).keys()].map(generateTransaction)})
		if (response.errors) {
      statusCode = 'Error'
			result = 'GraphQL Errors :(. Please see console';
			console.error('Genertion error - open me!', response.errors);
		} else if (response.data.insert_Transactions?.returning) {
      let insertedTrans = response.data.insert_Transactions?.returning
      statusCode = 'OK'
			result = JSON.stringify(insertedTrans.map((transaction) => transaction.id));
      transactions = [...transactions, ...insertedTrans]
		}
		disabled = false;
	}
</script>

<div class="m-1 p-2 rounded-lg border border-cyan-500">
  <input class="h-8 m-1 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Account Name" bind:value={accountName} />
  <div class=''>
    <button
      class="rounded-lg border border-cyan-600 bg-cyan-500 p-2 m-1 hover:bg-cyan-400 hover:outline-cyan-100 {disabled
        ? 'opacity-50 cursor-not-allowed'
        : ''}"
      on:click={generate}
      {disabled}>Generate 10 Transactions</button
    >
    <p class="opacity-0 z-10 flex justify-center items-center text-sm {disabled
      ? 'opacity-100'
      : ''
    }"
    >Please enter a valid Account Name to Generate Transactions.</p>
  </div>
	<div class="mt-4">
		<div>Response</div>
		<div>Status: {statusCode}</div>
		<div>{result}</div>
	</div>
</div>
