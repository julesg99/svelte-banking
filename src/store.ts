import { writable } from "svelte/store";
import type { TransactionsFragment } from "./graphql/graphql";

export type TransactionType = TransactionsFragment

const emptyTransactions : TransactionType[] = []

export const transactionStore = writable(emptyTransactions)