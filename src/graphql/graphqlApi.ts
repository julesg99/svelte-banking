import { env } from "$env/dynamic/public";
import { print } from 'graphql';
import { 
  GetTransactionsDocument, type GetTransactionsQuery, type GetTransactionsQueryVariables,
  InsertTransactionDocument, type InsertTransactionMutation, type InsertTransactionMutationVariables,
  GetTransactionsWithAggregatesDocument, type GetTransactionsWithAggregatesQueryVariables, type GetTransactionsWithAggregatesQuery,
  GetTransactionSumByStatusDocument, type GetTransactionSumByStatusQueryVariables, type GetTransactionSumByStatusQuery,
  GetAccountsDocument, type GetAccountsQueryVariables, type GetAccountsQuery,
  GetTransactionByAccountWithAggregatesDocument, type GetTransactionByAccountWithAggregatesQueryVariables, type GetTransactionByAccountWithAggregatesQuery 
} from "./graphql";

const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': env.PUBLIC_HASURA_ADMIN_SECRET
}

type GraphQLResponse<T> = {
  errors: any;
  data: T;
}

// GETTERS
export async function graphqlGetTransactions(variables: GetTransactionsQueryVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers, 
    body: JSON.stringify({
      query: print(GetTransactionsDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<GetTransactionsQuery>;
}

export async function graphqlGetTransactionsWithAggregates(variables: GetTransactionsWithAggregatesQueryVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(GetTransactionsWithAggregatesDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<GetTransactionsWithAggregatesQuery>
}

export async function graphqlGetTransactionSumByStatus(variables: GetTransactionSumByStatusQueryVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(GetTransactionSumByStatusDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<GetTransactionSumByStatusQuery>
}

export async function graphqlGetTransactionsByAccount(variables: GetTransactionByAccountWithAggregatesQueryVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(GetTransactionByAccountWithAggregatesDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<GetTransactionByAccountWithAggregatesQuery>
}

export async function graphqlGetAccounts(variables: GetAccountsQueryVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(GetAccountsDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<GetAccountsQuery>
}


// SETTERS
export async function graphqlInsertTransactions(variables: InsertTransactionMutationVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(InsertTransactionDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<InsertTransactionMutation>;
}