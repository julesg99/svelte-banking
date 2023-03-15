import { env } from "$env/dynamic/public";
import { print } from 'graphql';
import { 
  InsertTransactionDocument, type InsertTransactionMutation, type InsertTransactionMutationVariables,
  GetAccountsDocument, type GetAccountsQueryVariables, type GetAccountsQuery,
  GetFilteredTransactionDocument, type GetFilteredTransactionQueryVariables, type GetFilteredTransactionQuery 
} from "./graphql";

const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': env.PUBLIC_HASURA_ADMIN_SECRET
}

type GraphQLResponse<T> = {
  errors: any;
  data: T;
}

// GETTERS //

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

export async function graphqlGetFilteredTransactionsWithAggregates(variables: GetFilteredTransactionQueryVariables) {
  const request = await fetch(env.PUBLIC_HASURA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: print(GetFilteredTransactionDocument),
      variables
    })
  })
  return await request.json() as GraphQLResponse<GetFilteredTransactionQuery>
}

// SETTERS //

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