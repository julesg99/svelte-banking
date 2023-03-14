import { writable } from "svelte/store";
import type { AccountsFragment, TransactionsFragment } from "./graphql/graphql";


export type TransactionType = TransactionsFragment
const emptyTransactions : TransactionType[] = []
export const transactionStore = writable(emptyTransactions)


const emptyAccounts: AccountsFragment[] = []
export const accountStore = writable(emptyAccounts)

export interface breadCrumbInfo {
  url: string,
  name: string
}
const emptyCrumbs: breadCrumbInfo[] = []
export const breadCrumbStore = writable(emptyCrumbs);
