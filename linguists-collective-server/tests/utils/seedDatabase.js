import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const { prisma } = require('../../prisma-api/generated/prisma-client')

const userOne={
    input:{
        name: "Diabul Haque",
        email: "diab@connect.hku.hk",
        password: bcrypt.hashSync("password123"),
        phoneNumber: "+85261570767"
    },
    user: undefined,
    jwt: undefined
}

const jobOne={
    job:undefined
}

const jobTwo={
    job: undefined
}

const seedDatabase= async () => {
    // Delete test data
    await prisma.deleteManyJobs()
    await prisma.deleteManyUsers()

    // Create  user one
    userOne.user = await prisma.createUser(userOne.input)
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // create job one
    jobOne.job = await prisma.createJob({
        title:"Translator Wanted!",
        description:"Need a translator to third wheel me on my date with this Indian girl",
        associateType: "Translator",
        languages: {
            set: ["English", "Hindi"]
        },
        date: "28:10:2020",
        location: "HKU",
        currency: "HKD",
        bill: 100,
        client: {
            connect:{
                id: userOne.user.id
            }
        }
    })

    // create job one
    jobTwo.job =await prisma.createJob({
        title:"Translator No Longer Wanted!",
        description:"Need a translator to third wheel me on my date with this Indian girl",
        associateType: "Translator",
        languages: {
            set: ["English", "Hindi"]
        },
        date: "28:10:2020",
        location: "HKU",
        published: false,
        currency: "HKD",
        bill: 100,
        client: {
            connect:{
                id: userOne.user.id
            }
        }
    })
}

export { seedDatabase as default, userOne, jobOne, jobTwo }