import { writable } from "svelte/store";

export interface TransactionType {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  description: String,
  amount: number,
  status: String,
  category: String,
  transactionDate: Date,
  postDate?: Date
}

const emptyTransactions : TransactionType[] = []

export const transactionStore = writable(emptyTransactions)