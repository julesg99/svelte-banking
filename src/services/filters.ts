import type { GetFilteredTransactionQuery, Order_By, TransactionsFragment, Transactions_Bool_Exp } from "../graphql/graphql"
import { getFilteredTransactionsWithAggregates } from "./getData"

export interface transactionFilters {
  status: string
  date: Date
  category: string
}

export async function filterTransactions(filters: transactionFilters, statusTypes: string[], accountId: string, limit: number, offset: number, orderBy?: Order_By) {
  let transactions: TransactionsFragment[] = []
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  let where: Transactions_Bool_Exp = {}
  
  if (accountId)
    where.accountId = { _eq: +accountId } 
  if (statusTypes.includes(filters.status)) {
    where.status = { _eq: filters.status }
  } 
  if (filters.date) {
    where.transactionDate = { _gte: filters.date }
  }
  if (filters.category) {
    where.category = { _eq: filters.category.toLowerCase()}
  }
  let response = await getFilteredTransactionsWithAggregates(where, limit, offset, orderBy)
  accountAggregates = response.accountAggregates
  transactions = response.transactions

  return {transactions, accountAggregates}
}