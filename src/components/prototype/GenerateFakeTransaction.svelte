<script lang="ts">
	import { faker } from '@faker-js/faker';
	import type { Writable } from 'svelte/store';
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
			postDate
		};
	}

	let result = '';
	let statusCode = '';
	let disabled = false;
	async function generate() {
		disabled = true;
    const response = await graphqlInsertTransactions({object: [...Array(10).keys()].map(generateTransaction)})
    const insertedTrans = response.data.insert_Transactions?.returning
    console.log(insertedTrans)
		if (response.errors) {
			result = 'GraphQL Errors :(. Please see console';
			console.error('Genertion error - open me!', response.errors);
		} else if (insertedTrans) {
			result = JSON.stringify(insertedTrans.map((transaction) => transaction.id));
      transactions = [...transactions, ...insertedTrans]
		}
		disabled = false;
	}
</script>

<div class="m-1 p-2 rounded-lg border border-cyan-500">
	<button
		class="rounded-lg border border-blue-600 bg-blue-500 p-2 m-1 text-white {disabled
			? 'opacity-50 cursor-not-allowed'
			: ''}"
		on:click={generate}
		{disabled}>Generate 10 Transactions</button
	>
	<div>
		<div>Response</div>
		<div>Status Code: {statusCode}</div>
		<div>{result}</div>
	</div>
</div>
