import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  money: any;
  timestamptz: any;
};

/** columns and relationships of "Accounts" */
export type Accounts = {
  __typename?: 'Accounts';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "Accounts" */
export type Accounts_Aggregate = {
  __typename?: 'Accounts_aggregate';
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

/** aggregate fields of "Accounts" */
export type Accounts_Aggregate_Fields = {
  __typename?: 'Accounts_aggregate_fields';
  avg?: Maybe<Accounts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
  stddev?: Maybe<Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Sum_Fields>;
  var_pop?: Maybe<Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Variance_Fields>;
};


/** aggregate fields of "Accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
  __typename?: 'Accounts_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "Accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Accounts" */
export enum Accounts_Constraint {
  /** unique or primary key constraint on columns "name" */
  AccountsNameKey = 'Accounts_name_key',
  /** unique or primary key constraint on columns "id" */
  AccountsPkey = 'Accounts_pkey'
}

/** input type for incrementing numeric columns in table "Accounts" */
export type Accounts_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Accounts" */
export type Accounts_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: 'Accounts_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: 'Accounts_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "Accounts" */
export type Accounts_Mutation_Response = {
  __typename?: 'Accounts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Accounts>;
};

/** on_conflict condition type for table "Accounts" */
export type Accounts_On_Conflict = {
  constraint: Accounts_Constraint;
  update_columns?: Array<Accounts_Update_Column>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "Accounts". */
export type Accounts_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Accounts */
export type Accounts_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "Accounts" */
export enum Accounts_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "Accounts" */
export type Accounts_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
  __typename?: 'Accounts_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
  __typename?: 'Accounts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
  __typename?: 'Accounts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "Accounts" */
export type Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
  __typename?: 'Accounts_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "Accounts" */
export enum Accounts_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Accounts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Accounts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Accounts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Accounts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
  __typename?: 'Accounts_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
  __typename?: 'Accounts_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
  __typename?: 'Accounts_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Account transaction data */
export type Transactions = {
  __typename?: 'Transactions';
  accountName: Scalars['String'];
  amount: Scalars['money'];
  category: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  postDate?: Maybe<Scalars['date']>;
  status: Scalars['String'];
  transactionDate: Scalars['date'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "Transactions" */
export type Transactions_Aggregate = {
  __typename?: 'Transactions_aggregate';
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

/** aggregate fields of "Transactions" */
export type Transactions_Aggregate_Fields = {
  __typename?: 'Transactions_aggregate_fields';
  avg?: Maybe<Transactions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "Transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  __typename?: 'Transactions_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "Transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Transactions_Bool_Exp>>;
  _not?: InputMaybe<Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Transactions_Bool_Exp>>;
  accountName?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Money_Comparison_Exp>;
  category?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  postDate?: InputMaybe<Date_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  transactionDate?: InputMaybe<Date_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint on columns "id" */
  TransactionsPkey = 'Transactions_pkey'
}

/** input type for incrementing numeric columns in table "Transactions" */
export type Transactions_Inc_Input = {
  amount?: InputMaybe<Scalars['money']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Transactions" */
export type Transactions_Insert_Input = {
  accountName?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['money']>;
  category?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  postDate?: InputMaybe<Scalars['date']>;
  status?: InputMaybe<Scalars['String']>;
  transactionDate?: InputMaybe<Scalars['date']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  __typename?: 'Transactions_max_fields';
  accountName?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['money']>;
  category?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  postDate?: Maybe<Scalars['date']>;
  status?: Maybe<Scalars['String']>;
  transactionDate?: Maybe<Scalars['date']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  __typename?: 'Transactions_min_fields';
  accountName?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['money']>;
  category?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  postDate?: Maybe<Scalars['date']>;
  status?: Maybe<Scalars['String']>;
  transactionDate?: Maybe<Scalars['date']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "Transactions" */
export type Transactions_Mutation_Response = {
  __typename?: 'Transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Transactions>;
};

/** on_conflict condition type for table "Transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns?: Array<Transactions_Update_Column>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "Transactions". */
export type Transactions_Order_By = {
  accountName?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  postDate?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transactionDate?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Transactions */
export type Transactions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "Transactions" */
export enum Transactions_Select_Column {
  /** column name */
  AccountName = 'accountName',
  /** column name */
  Amount = 'amount',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Notes = 'notes',
  /** column name */
  PostDate = 'postDate',
  /** column name */
  Status = 'status',
  /** column name */
  TransactionDate = 'transactionDate',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Transactions" */
export type Transactions_Set_Input = {
  accountName?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['money']>;
  category?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  postDate?: InputMaybe<Scalars['date']>;
  status?: InputMaybe<Scalars['String']>;
  transactionDate?: InputMaybe<Scalars['date']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  __typename?: 'Transactions_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  __typename?: 'Transactions_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  __typename?: 'Transactions_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "Transactions" */
export type Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transactions_Stream_Cursor_Value_Input = {
  accountName?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['money']>;
  category?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  postDate?: InputMaybe<Scalars['date']>;
  status?: InputMaybe<Scalars['String']>;
  transactionDate?: InputMaybe<Scalars['date']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  __typename?: 'Transactions_sum_fields';
  amount?: Maybe<Scalars['money']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "Transactions" */
export enum Transactions_Update_Column {
  /** column name */
  AccountName = 'accountName',
  /** column name */
  Amount = 'amount',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Notes = 'notes',
  /** column name */
  PostDate = 'postDate',
  /** column name */
  Status = 'status',
  /** column name */
  TransactionDate = 'transactionDate',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Transactions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Transactions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Transactions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Transactions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  __typename?: 'Transactions_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  __typename?: 'Transactions_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  __typename?: 'Transactions_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

/** Boolean expression to compare columns of type "money". All fields are combined with logical 'AND'. */
export type Money_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['money']>;
  _gt?: InputMaybe<Scalars['money']>;
  _gte?: InputMaybe<Scalars['money']>;
  _in?: InputMaybe<Array<Scalars['money']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['money']>;
  _lte?: InputMaybe<Scalars['money']>;
  _neq?: InputMaybe<Scalars['money']>;
  _nin?: InputMaybe<Array<Scalars['money']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Accounts" */
  delete_Accounts?: Maybe<Accounts_Mutation_Response>;
  /** delete single row from the table: "Accounts" */
  delete_Accounts_by_pk?: Maybe<Accounts>;
  /** delete data from the table: "Transactions" */
  delete_Transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "Transactions" */
  delete_Transactions_by_pk?: Maybe<Transactions>;
  /** insert data into the table: "Accounts" */
  insert_Accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert a single row into the table: "Accounts" */
  insert_Accounts_one?: Maybe<Accounts>;
  /** insert data into the table: "Transactions" */
  insert_Transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "Transactions" */
  insert_Transactions_one?: Maybe<Transactions>;
  /** update data of the table: "Accounts" */
  update_Accounts?: Maybe<Accounts_Mutation_Response>;
  /** update single row of the table: "Accounts" */
  update_Accounts_by_pk?: Maybe<Accounts>;
  /** update multiples rows of table: "Accounts" */
  update_Accounts_many?: Maybe<Array<Maybe<Accounts_Mutation_Response>>>;
  /** update data of the table: "Transactions" */
  update_Transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "Transactions" */
  update_Transactions_by_pk?: Maybe<Transactions>;
  /** update multiples rows of table: "Transactions" */
  update_Transactions_many?: Maybe<Array<Maybe<Transactions_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Accounts_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transactions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
  objects: Array<Accounts_Insert_Input>;
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Accounts_OneArgs = {
  object: Accounts_Insert_Input;
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transactions_OneArgs = {
  object: Transactions_Insert_Input;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
  _inc?: InputMaybe<Accounts_Inc_Input>;
  _set?: InputMaybe<Accounts_Set_Input>;
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Accounts_By_PkArgs = {
  _inc?: InputMaybe<Accounts_Inc_Input>;
  _set?: InputMaybe<Accounts_Set_Input>;
  pk_columns: Accounts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Accounts_ManyArgs = {
  updates: Array<Accounts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionsArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_By_PkArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  pk_columns: Transactions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_ManyArgs = {
  updates: Array<Transactions_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Accounts" */
  Accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "Accounts" */
  Accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "Accounts" using primary key columns */
  Accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "Transactions" */
  Transactions: Array<Transactions>;
  /** fetch aggregated fields from the table: "Transactions" */
  Transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "Transactions" using primary key columns */
  Transactions_by_pk?: Maybe<Transactions>;
};


export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Accounts" */
  Accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "Accounts" */
  Accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "Accounts" using primary key columns */
  Accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table in a streaming manner: "Accounts" */
  Accounts_stream: Array<Accounts>;
  /** fetch data from the table: "Transactions" */
  Transactions: Array<Transactions>;
  /** fetch aggregated fields from the table: "Transactions" */
  Transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "Transactions" using primary key columns */
  Transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table in a streaming manner: "Transactions" */
  Transactions_stream: Array<Transactions>;
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootAccounts_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootTransactions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type InsertTransactionMutationVariables = Exact<{
  object: Array<Transactions_Insert_Input> | Transactions_Insert_Input;
}>;


export type InsertTransactionMutation = { __typename?: 'mutation_root', insert_Transactions?: { __typename?: 'Transactions_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'Transactions', amount: any, category: string, createdAt: any, description: string, id: number, postDate?: any | null, status: string, transactionDate: any, updatedAt: any, notes?: string | null, accountName: string }> } | null };

export type GetTransactionSumByStatusQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetTransactionSumByStatusQuery = { __typename?: 'query_root', Transactions_aggregate: { __typename?: 'Transactions_aggregate', aggregate?: { __typename?: 'Transactions_aggregate_fields', count: number, sum?: { __typename?: 'Transactions_sum_fields', amount?: any | null } | null } | null } };

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionsQuery = { __typename?: 'query_root', Transactions: Array<{ __typename?: 'Transactions', amount: any, category: string, createdAt: any, description: string, id: number, postDate?: any | null, status: string, transactionDate: any, updatedAt: any, notes?: string | null, accountName: string }> };

export type GetTransactionsWithAggregatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionsWithAggregatesQuery = { __typename?: 'query_root', Transactions_aggregate: { __typename?: 'Transactions_aggregate', aggregate?: { __typename?: 'Transactions_aggregate_fields', count: number, sum?: { __typename?: 'Transactions_sum_fields', amount?: any | null } | null } | null }, Transactions: Array<{ __typename?: 'Transactions', amount: any, category: string, createdAt: any, description: string, id: number, postDate?: any | null, status: string, transactionDate: any, updatedAt: any, notes?: string | null, accountName: string }> };

export type TransactionsFragment = { __typename?: 'Transactions', amount: any, category: string, createdAt: any, description: string, id: number, postDate?: any | null, status: string, transactionDate: any, updatedAt: any, notes?: string | null, accountName: string };

export const TransactionsFragmentDoc = gql`
    fragment transactions on Transactions {
  amount
  category
  createdAt
  description
  id
  postDate
  status
  transactionDate
  updatedAt
  notes
  accountName
}
    `;
export const InsertTransactionDocument = gql`
    mutation insertTransaction($object: [Transactions_insert_input!]!) {
  insert_Transactions(objects: $object) {
    affected_rows
    returning {
      ...transactions
    }
  }
}
    ${TransactionsFragmentDoc}`;
export const GetTransactionSumByStatusDocument = gql`
    query GetTransactionSumByStatus($status: String) {
  Transactions_aggregate(where: {status: {_eq: $status}}) {
    aggregate {
      count
      sum {
        amount
      }
    }
  }
}
    `;
export const GetTransactionsDocument = gql`
    query getTransactions {
  Transactions {
    ...transactions
  }
}
    ${TransactionsFragmentDoc}`;
export const GetTransactionsWithAggregatesDocument = gql`
    query getTransactionsWithAggregates {
  Transactions_aggregate {
    aggregate {
      sum {
        amount
      }
      count
    }
  }
  Transactions(order_by: {transactionDate: asc}) {
    ...transactions
  }
}
    ${TransactionsFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    insertTransaction(variables: InsertTransactionMutationVariables, options?: C): Promise<InsertTransactionMutation> {
      return requester<InsertTransactionMutation, InsertTransactionMutationVariables>(InsertTransactionDocument, variables, options) as Promise<InsertTransactionMutation>;
    },
    GetTransactionSumByStatus(variables?: GetTransactionSumByStatusQueryVariables, options?: C): Promise<GetTransactionSumByStatusQuery> {
      return requester<GetTransactionSumByStatusQuery, GetTransactionSumByStatusQueryVariables>(GetTransactionSumByStatusDocument, variables, options) as Promise<GetTransactionSumByStatusQuery>;
    },
    getTransactions(variables?: GetTransactionsQueryVariables, options?: C): Promise<GetTransactionsQuery> {
      return requester<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, variables, options) as Promise<GetTransactionsQuery>;
    },
    getTransactionsWithAggregates(variables?: GetTransactionsWithAggregatesQueryVariables, options?: C): Promise<GetTransactionsWithAggregatesQuery> {
      return requester<GetTransactionsWithAggregatesQuery, GetTransactionsWithAggregatesQueryVariables>(GetTransactionsWithAggregatesDocument, variables, options) as Promise<GetTransactionsWithAggregatesQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;