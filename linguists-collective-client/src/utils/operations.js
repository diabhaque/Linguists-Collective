import { gql } from 'apollo-boost'

const createUser = gql`
    mutation ($data: CreateUserInput!){
        createUser(
            data: $data
        ){
            token
            user{
                id
                name
                email
                isAssociate   
            }
        }
    }
`

const login = gql`
    mutation($data: LoginUserInput!){
        loginUser(
            data:$data
        ){
            token
            user{
                id
            }
        }
    }
`

const getUsers = gql`
    query{
        users{
            id
            name
            email
        }
    }
`

const getUser =gql`
    query($id: ID!){
        user(
            id: $id
        ){
            id
            name
            phoneNumber
            isAssociate
        }
    }
`

const getProfile = gql`
    query{
        me{
            id
            name
            email
        }
    }
`

const getJobs = gql`
    query($orderBy: JobOrderByInput){
        jobs(orderBy: $orderBy){
            id
            title
            description
            languages
            associateType
            currency
            bill
            published
            createdAt
            updatedAt
        }
    }
`

const getJob = gql`
    query($id: ID!){
        job(
            id: $id
        ){
            id
            title
            description
            languages
            associateType
            currency
            bill
            date
            published
            client{
                id
                name    
            }
            associate{
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`

const myJobsPosted = gql`
    query{
        myJobsPosted{
            id
            title
            description
            published
        }
    }
`

const updateJob = gql`
    mutation ($id: ID!, $data: UpdateJobInput!){
        updateJob(
            id: $id,
            data: $data
        ){
            id
            title
            description
            published   
        }
    }
`

const createJob = gql`
    mutation ($data: CreateJobInput!){
        createJob(
            data: $data
        ){
            id
            title
            description
            published   
        }
    }
`

const deleteJob = gql`
    mutation ($id: ID!){
        deleteJob(
            id: $id
        ){
            id
        }
    }
`

const acceptJob =gql`
    mutation($id: ID!){
        acceptJob(
            id: $id
        ){
            associate{
                name
                id
            }
        }
    }
`

const subscribeToMyJobsPosted = gql`
    subscription{
        myJobsPosted{
            mutation
            node{
                id
                title
                description
            }
        }
    }
`


export { createUser, login, getUsers, getProfile, getJobs, myJobsPosted, updateJob, createJob, deleteJob, subscribeToMyJobsPosted, getJob, getUser, acceptJob }