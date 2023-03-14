import { writable } from "svelte/store";
import type { AccountsFragment, TransactionsFragment } from "./graphql/graphql";


export type TransactionType = TransactionsFragment
const emptyTransactions : TransactionType[] = []
export const transactionStore = writable(emptyTransactions)


const emptyAccounts: AccountsFragment[] = []
export const accountStore = writable(emptyAccounts)


export const breadCrumbStore = writable<{ name: string; url: string }[]>([]);
