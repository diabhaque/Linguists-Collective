import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation= {
    // Email and SMS confimation
    // Use simpler ID fields for reporting
    // password123/456

    async loginUser(parent, { data }, { prisma }, info){
        const user= await prisma.user({ email: data.email })

        if(!user){
            throw new Error(`User with email ${data.email} does not exist`) 
        }

        const isMatch = await bcrypt.compare(data.password, user.password)
        
        if(!isMatch){
            throw new Error('Unable to login')
        }

        return {
            user, 
            token: generateToken(user.id)
        }
    },
    async createUser(parent, { data }, { prisma }, info){

        const password = await hashPassword(data.password)

        const emailTaken = await prisma.$exists.user({
            email: data.email
        })

        const phoneNumberTaken = await prisma.$exists.user({
            phoneNumber: data.phoneNumber
        })

        if(emailTaken){
            throw new Error("Email Taken")
        }

        if(phoneNumberTaken){
            throw new Error("Phone Number Taken")
        }

        const user={
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: password
        }

        const currentUser= await prisma.createUser(user)

        return {
            user: currentUser,
            token: generateToken(currentUser.id)
        }

    },
    async createJob(parent, { data }, { prisma, request }, info){
        const userId=  getUserId(request)

        const job={
            title: data.title,
            description: data.description,
            languages: {
                set: data.languages
            },
            associateType: data.associateType,
            date: data.date,
            location: data.location,
            client: {
                connect:{
                    id: userId
                }
            },
            currency: data.currency,
            bill: data.bill,    
        }
        
        return prisma.createJob(job)
    },
    async deleteUser(parent, { id }, { prisma, request }, info){
        // Archive for 6 months - TODO
        const userId = getUserId(request)

        return prisma.deleteUser({ id: userId })

    },
    async deleteJob(parent, { id }, { prisma, request }, info){
        // Archive for 6 months - TODO
        const userId = getUserId(request)

        const user= await prisma.job({ id: id }).client()

        if(!user){
            throw new Error("Job does not exist")
        }

        if(user.id!=userId){
            throw new Error("You do not have the permissions to delete this Job")
        }

        return prisma.deleteJob({ id: id })
    },
    async updateUser(parent, { data }, { prisma, request }, info){
        const userId = getUserId(request)
        
        const languages=data.languages
        if (Array.isArray(languages)){
            data.languages={}
            data.languages.set=languages
        }

        const associateTypes=data.associateTypes
        if (Array.isArray(associateTypes)){
            data.associateTypes={}
            data.associateTypes.set=associateTypes
        }
        
        if (typeof data.email === 'string'){
            const emailTaken = await prisma.$exists.user({
                email: data.email
            })

            if (emailTaken){
                throw new Error('Email Taken')
            }
        }

        if (typeof data.phoneNumber === 'string'){
            const phoneNumberTaken = await prisma.$exists.user({
                phoneNumber: data.phoneNumber
            })
    
            if(phoneNumberTaken){
                throw new Error("Phone Number Taken")
            }
        }

        // console.log(JSON.stringify(data, undefined, 2))

        return prisma.updateUser({
            where:{
                id: userId
            },
            data: data
        })
        
    },
    async updatePassword(parent, { password }, { prisma, request }, info){
        const userId =getUserId(request)

        const data={
            password: password
        }
        
        return prisma.updateUser({
            where:{
                id: userId
            },
            data: data
        })
        
    },
    async updateJob(parent, { id, data }, { prisma, request }, info){
        const userId = getUserId(request)

        const user= await prisma.job({ id: id }).client()

        if(!user){
            throw new Error("Job does not exist")
        }

        if(user.id!=userId){
            throw new Error("You do not have the permissions to update this Job")
        }

        const languages=data.languages
        data.languages={set: languages}

        // const client=userId
        // should not be able to change client

        // if (typeof client === 'string'){
        //     data.client={}
        //     data.client.connect={id: client}
        // }

        // console.log(JSON.stringify(data, undefined, 2))
        
        return prisma.updateJob({
            where:{
                id: id
            },
            data: data
        })
    },
    async acceptJob(parent, { id }, { prisma, request }){
        const userId = getUserId(request)

        const job = await prisma.job({ id: id })
        const client = await prisma.job({ id: id }).client()

        if(client.id=== userId){
            throw new Error("Cannot accept the job you posted.")
        }

        if( !job || !job.published || job.accepted ){
            throw new Error("This job is no longer accepting associates.")
        }

        const data={}
        data.associate={}
        data.accepted=true
        data.associate.connect={id: userId}

        // Update associates' accumulated invoice before this.
        // console.log(id)
        return prisma.updateJob({
            where:{
                id: id
            },
            data: data
        })
    }
}

export { Mutation as default }