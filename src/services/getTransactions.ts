import type { GetFilteredTransactionQuery, TransactionsFragment, Transactions_Bool_Exp } from "../graphql/graphql"
import { graphqlGetFilteredTransactionsWithAggregates } from "../graphql/graphqlApi"

export async function getFilteredTransactionsWithAggregates(where: Transactions_Bool_Exp) {
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  let transactions: TransactionsFragment[] = []
  const response = await graphqlGetFilteredTransactionsWithAggregates({where})
  if (response.errors) {
    response.errors.map((error: any) => console.log(error.message))
    alert('Account transactions failed to load.')
  } else {
    transactions = response.data.Transactions
    accountAggregates = response.data.Transactions_aggregate.aggregate
  }
  return {accountAggregates, transactions}
}