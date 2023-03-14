<script lang="ts">
	import { faker } from '@faker-js/faker';
	import type { TransactionsFragment } from '../../graphql/graphql';
	import { graphqlInsertTransactions } from '../../graphql/graphqlApi';
	import { transactionStore } from '../../store';

  export let transactions: TransactionsFragment[]
  $: console.log('transactions @ generation', transactions)
  // export let transactions: TransactionsFragment[]

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

	let result = '';
	let statusCode = '';
  let accountId: number;
	let disabled = false;
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
  <input class="h-8 m-1 p-2 rounded-lg outline outline-1 outline-gray-400 shadow-sm" placeholder="Account Name" bind:value={accountId} />
  <button
    class="rounded-lg border border-blue-600 bg-blue-500 p-2 m-1 text-white {disabled
      ? 'opacity-50 cursor-not-allowed'
      : ''}"
    on:click={generate}
    {disabled}>Generate 10 Transactions</button
  >
	<div>
		<div>Response</div>
		<div>Status: {statusCode}</div>
		<div>{result}</div>
	</div>
</div>
