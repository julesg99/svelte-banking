import { Order_By, type AccountsFragment, type GetAccountsQuery, type GetFilteredTransactionQuery, type TransactionsFragment, type Transactions_Bool_Exp } from "../graphql/graphql"
import { graphqlGetAccounts, graphqlGetFilteredTransactionsWithAggregates } from "../graphql/graphqlApi"

export async function getFilteredTransactionsWithAggregates(where: Transactions_Bool_Exp, limit: number, offset: number, orderBy?: Order_By) {
  let accountAggregates: GetFilteredTransactionQuery["Transactions_aggregate"]["aggregate"]
  let transactions: TransactionsFragment[] = []
  const response = await graphqlGetFilteredTransactionsWithAggregates({where: where, limit: limit, offset: offset, dateOrder: Order_By.Asc})
  if (response.errors) {
    response.errors.map((error: any) => console.log(error.message))
    alert('Account transactions failed to load.')
  } else {
    transactions = response.data.Transactions
    accountAggregates = response.data.Transactions_aggregate.aggregate
  }
  return {accountAggregates, transactions}
}

export async function getAccounts() {
  let accountAggregates: GetAccountsQuery["Accounts_aggregate"]["aggregate"]
  let accounts: AccountsFragment[] = []
  const response = await graphqlGetAccounts({})
  if (response.errors){
    response.errors.map((error: any) => console.log(error.message))
    alert('Server failed to load accounts.')
  } else {
    accounts = response.data.Accounts
    accountAggregates = response.data.Accounts_aggregate.aggregate
  }
  return {accounts, accountAggregates}
}