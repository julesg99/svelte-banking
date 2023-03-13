import { env } from "$env/dynamic/public";
import { print } from 'graphql';
import { GetTransactionsDocument, type GetTransactionsQuery, type GetTransactionsQueryVariables,
  InsertTransactionDocument, type InsertTransactionMutation, type InsertTransactionMutationVariables, type GetTransactionsWithAggregatesQueryVariables, GetTransactionsWithAggregatesDocument, type GetTransactionsWithAggregatesQuery
   } from "./graphql";

const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': env.PUBLIC_HASURA_ADMIN_SECRET
}

type GraphQLResponse<T> = {
  errors: any;
  data: T;
}

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