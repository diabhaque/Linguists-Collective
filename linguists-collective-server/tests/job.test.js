import 'cross-fetch/polyfill'
import "regenerator-runtime/runtime.js"
import seedDatabse, { userOne, jobOne, jobTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getJobs, myJobsPosted, updateJob, createJob, deleteJob, subscribeToMyJobsPosted, getJob, acceptJob } from './utils/operations'
const { prisma } = require('../prisma-api/generated/prisma-client')

const client = getClient(undefined)

beforeEach(seedDatabse, 20000)

test('Should return published jobs', async ()=>{
    const response = await client.query({
        query: getJobs
    })

    expect(response.data.jobs.length).toBe(1)
    expect(response.data.jobs[0].published).toBe(true)
    expect(response.data.jobs[0].title).toBe("Translator Wanted!")

}, 20000)

test('Should fetch users jobs', async ()=>{
    const client = getClient(userOne.jwt)

    const { data } = await client.query({
       query: myJobsPosted
    })

    expect(data.myJobsPosted.length).toBe(2)
    
}, 20000)

test('Should be able to update own posted job', async ()=>{
    const client = getClient(userOne.jwt)

    const variables ={
        id: jobOne.job.id,
        data:{
            published: false
        }
    }

    const { data } = await client.mutate({
        mutation: updateJob,
        variables
    })

    const exists = await prisma.$exists.job({ id: jobOne.job.id, published: false })

    expect(data.updateJob.published).toBe(false)
    expect(exists).toBe(true)
    
}, 20000)

test('Should be able to post job', async ()=>{
    const client = getClient(userOne.jwt)

    const variables ={
        data:{
            title: "This is a test",
            description: "data.description",
            languages:["data.languages", "Another String"],
            associateType: "data.associateType",
            date: "data.date",
            location: "data.location",
            currency: "data.currency",
            bill: 100,   
        }
    }

    const { data } = await client.mutate({
        mutation: createJob,
        variables
    })

    const exists = await prisma.$exists.job({ id: data.createJob.id })

    expect(exists).toBe(true)
    expect(data.createJob.title).toBe("This is a test")
    expect(data.createJob.description).toBe("data.description")
    expect(data.createJob.published).toBe(true)
    
}, 20000)

test('Should be able to delete job', async ()=>{
    const client = getClient(userOne.jwt)
    const variables = {
        id: jobTwo.job.id
    }

    await client.mutate({
        mutation: deleteJob,
        variables
    })

    const exists = await prisma.$exists.job({ id: jobTwo.job.id })

    expect(exists).toBe(false)
    
}, 20000)

test('Should fetch single job', async ()=>{
    const variables={
        id: jobTwo.job.id
    }

    const { data }= await client.query({
        query: getJob,
        variables
    })

    expect(data.job.id).toBe(jobTwo.job.id)
}, 20000)

// test('Should subscribe to jobs posted by user', async (done)=>{
//     const client = getClient(userOne.jwt)

//     client.subscribe({
//         query: subscribeToMyJobsPosted
//     }).subscribe({
//         next(response){
//             console.log(response)
//             done()
//         }
//     })

//     await prisma.deleteJob({id: jobTwo.job.id})

// })