import type { GetFilteredTransactionQuery, TransactionsFragment } from "../graphql/graphql"
import { getFilteredTransactionsWithAggregates } from "./getData"

export interface transactionFilters {
  status: string
  date: Date
  category: string
}

export async function filterTransactions(filters: transactionFilters, statusTypes: string[], accountId: string) {
  let transactions: TransactionsFragment[] = []
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  let input:string = '{'
  let args: string[] = []
  
  if (accountId)
    args.push(`\"accountId\": {\"_eq\": ${Number(accountId)}}`)
  if (statusTypes.includes(filters.status)) {
    args.push(`\"status\": {\"_eq\": \"${filters.status}\"}`)
  } 
  if (filters.date) {
    args.push(`\"transactionDate\": {\"_gte\": \"${filters.date}\"}`)
  }
  if (filters.category) {
    args.push(`\"category\": {\"_like\": \"${filters.category.toLowerCase()}\"}`)
  }
  input += args.join(', ') + '}'
  console.log(input)
  let response = await getFilteredTransactionsWithAggregates(JSON.parse(input))
  accountAggregates = response.accountAggregates
  transactions = response.transactions

  return transactions
}
