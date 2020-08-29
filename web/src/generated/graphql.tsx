import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  findUser: User;
  me?: Maybe<User>;
  getUserCategories: Array<Category>;
  getSingleCategory: Category;
  getAllUserEntries: Array<JournalEntry>;
  getEntriesByCategory: Array<JournalEntry>;
};


export type QueryFindUserArgs = {
  userId: Scalars['Int'];
};


export type QueryGetSingleCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type QueryGetEntriesByCategoryArgs = {
  categoryId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  categories: Array<Category>;
  entries: Array<JournalEntry>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  description: Scalars['String'];
  duration: Scalars['Int'];
  entries?: Maybe<Array<JournalEntry>>;
};

export type JournalEntry = {
  __typename?: 'JournalEntry';
  id: Scalars['Int'];
  date?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  duration: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  categoryId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  logout: Scalars['Boolean'];
  registerUser: User;
  deleteAllUsers: Scalars['Boolean'];
  createCategory: Array<Category>;
  deleteCategory: Scalars['Boolean'];
  createEntry: JournalEntryResponse;
  deleteEntry: JournalEntryResponse;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  description: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationCreateEntryArgs = {
  date?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  categoryId: Scalars['Int'];
};


export type MutationDeleteEntryArgs = {
  id: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type JournalEntryResponse = {
  __typename?: 'JournalEntryResponse';
  entries: Array<JournalEntry>;
  categories: Array<Category>;
};

export type GetUserCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCategoriesQuery = (
  { __typename?: 'Query' }
  & { getUserCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'description' | 'duration'>
  )> }
);

export type CreateCategoryMutationVariables = Exact<{
  description: Scalars['String'];
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'description' | 'duration'>
  )> }
);

export type CreateEntryMutationVariables = Exact<{
  categoryId: Scalars['Int'];
  title: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  date?: Maybe<Scalars['String']>;
}>;


export type CreateEntryMutation = (
  { __typename?: 'Mutation' }
  & { createEntry: (
    { __typename?: 'JournalEntryResponse' }
    & { entries: Array<(
      { __typename?: 'JournalEntry' }
      & Pick<JournalEntry, 'id' | 'title' | 'notes' | 'duration' | 'date' | 'categoryId'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'description' | 'duration'>
    )> }
  ) }
);

export type DeleteEntryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEntryMutation = (
  { __typename?: 'Mutation' }
  & { deleteEntry: (
    { __typename?: 'JournalEntryResponse' }
    & { entries: Array<(
      { __typename?: 'JournalEntry' }
      & Pick<JournalEntry, 'id' | 'title' | 'notes' | 'duration' | 'date' | 'categoryId'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'description' | 'duration'>
    )> }
  ) }
);

export type GetAllUserEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserEntriesQuery = (
  { __typename?: 'Query' }
  & { getAllUserEntries: Array<(
    { __typename?: 'JournalEntry' }
    & Pick<JournalEntry, 'id' | 'title' | 'notes' | 'duration' | 'date' | 'categoryId'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);

export type RegisterUserMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);


export const GetUserCategoriesDocument = gql`
    query getUserCategories {
  getUserCategories {
    id
    description
    duration
  }
}
    `;

/**
 * __useGetUserCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>) {
        return Apollo.useQuery<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>(GetUserCategoriesDocument, baseOptions);
      }
export function useGetUserCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>(GetUserCategoriesDocument, baseOptions);
        }
export type GetUserCategoriesQueryHookResult = ReturnType<typeof useGetUserCategoriesQuery>;
export type GetUserCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserCategoriesLazyQuery>;
export type GetUserCategoriesQueryResult = Apollo.QueryResult<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($description: String!) {
  createCategory(description: $description) {
    id
    description
    duration
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateEntryDocument = gql`
    mutation createEntry($categoryId: Int!, $title: String!, $notes: String, $duration: Int!, $date: String) {
  createEntry(categoryId: $categoryId, title: $title, notes: $notes, duration: $duration, date: $date) {
    entries {
      id
      title
      notes
      duration
      date
      categoryId
    }
    categories {
      id
      description
      duration
    }
  }
}
    `;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      title: // value for 'title'
 *      notes: // value for 'notes'
 *      duration: // value for 'duration'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, baseOptions);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation deleteEntry($id: Int!) {
  deleteEntry(id: $id) {
    entries {
      id
      title
      notes
      duration
      date
      categoryId
    }
    categories {
      id
      description
      duration
    }
  }
}
    `;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, baseOptions);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const GetAllUserEntriesDocument = gql`
    query getAllUserEntries {
  getAllUserEntries {
    id
    title
    notes
    duration
    date
    categoryId
  }
}
    `;

/**
 * __useGetAllUserEntriesQuery__
 *
 * To run a query within a React component, call `useGetAllUserEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserEntriesQuery, GetAllUserEntriesQueryVariables>) {
        return Apollo.useQuery<GetAllUserEntriesQuery, GetAllUserEntriesQueryVariables>(GetAllUserEntriesDocument, baseOptions);
      }
export function useGetAllUserEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserEntriesQuery, GetAllUserEntriesQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUserEntriesQuery, GetAllUserEntriesQueryVariables>(GetAllUserEntriesDocument, baseOptions);
        }
export type GetAllUserEntriesQueryHookResult = ReturnType<typeof useGetAllUserEntriesQuery>;
export type GetAllUserEntriesLazyQueryHookResult = ReturnType<typeof useGetAllUserEntriesLazyQuery>;
export type GetAllUserEntriesQueryResult = Apollo.QueryResult<GetAllUserEntriesQuery, GetAllUserEntriesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      email
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;