import 'cross-fetch/polyfill'
import "regenerator-runtime/runtime.js"
import seedDatabse, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
const { prisma } = require('../prisma-api/generated/prisma-client')
import { createUser, login, getUsers, getProfile, getUser } from './utils/operations'

const client = getClient(undefined)

beforeEach(seedDatabse, 20000)

test('Should create a new user', async ()=>{
    const variables={
        data:{
            name: "Ishmam Haque",
            email: "ishmam@gmail.com",
            password: "password123",
            phoneNumber: "+8801722148513"
        }
    }

    const response = await client.mutate({
        mutation: createUser,
        variables
    })

    const created = await prisma.$exists.user({id: response.data.createUser.user.id})

    expect(created).toBe(true)
    
}, 20000)

test('Should expect public user profiles', async ()=>{

    const response = await client.query({
        query: getUsers
    })

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe("Diabul Haque")

}, 20000)

test('Should not login with bad credentials', async ()=>{
    const variables ={
        data:{
            email: "diab@connect.hku.hk",
            password: "password124"
        }
    }

    await expect(
        client.mutate({
            mutation: login,
            variables
        })
    ).rejects.toThrow()


}, 20000)

test('Should not signup with bad credentials', async ()=>{
    const variables = {
        data:{
            name: "Ishmam Haque",
            email: "ishmam@gmail.com",
            password: "passwo",
            phoneNumber: "+8801722148513"
        }
    }

    await expect(
        client.mutate({
            mutation: createUser,
            variables
        })
    ).rejects.toThrow()


}, 20000)

test('Should fetch user profile', async ()=>{
    const client = getClient(userOne.jwt)

    const { data } = await client.query({
       query:getProfile 
    })

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
    
}, 20000)

test('Should be able to get user', async ()=>{
    const variables={
        id:userOne.user.id
    }

    const { data } = await client.query({
        query: getUser,
        variables
    })

    expect(data.user.id).toBe(userOne.user.id)
    expect(data.user.name).toBe(userOne.user.name)
},20000)