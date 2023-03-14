import { writable } from "svelte/store";
import type { AccountsFragment, TransactionsFragment } from "./graphql/graphql";

export type TransactionType = TransactionsFragment

const emptyTransactions : TransactionType[] = []
const emptyAccounts: AccountsFragment[] = []

export const transactionStore = writable(emptyTransactions)
export const accountStore = writable(emptyAccounts)