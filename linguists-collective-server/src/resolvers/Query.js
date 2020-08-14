import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { prisma }, info){
        const opArgs ={
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if(args.query){
            opArgs.where={
                OR:[
                    {
                        name_contains: args.query
                    },
                    {
                        id_contains: args.query
                    }
                ]
            }
        }  
        
        return prisma.users(opArgs)
    },
    jobs(parent, args, { prisma }, info){
        const opArgs ={
            where:{
                published: true,
                // accepted: false
            },
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if(args.query){
            opArgs.where.OR=[
                {
                    title_contains: args.query
                },
                {
                    description_contains: args.query
                }
            ]
        }  
        return prisma.jobs(opArgs)
    },
    me(parent, args, { prisma, request }, info){
        const userId= getUserId(request)
        return prisma.user({id: userId})
    },
    myJobs(parent, args, { prisma, request }, info){
        const opArgs ={
            where:{
                // published: true,
                // accepted: false
            },
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if(args.query){
            opArgs.where.OR=[
                {
                    title_contains: args.query
                },
                {
                    description_contains: args.query
                }
            ]
        }  
        const userId = getUserId(request)
        return prisma.user({id: userId}).jobs(opArgs)
    },
    myJobsPosted(parent, args, { prisma, request }, info){
        const opArgs ={
            where:{
                // published: true,
                // accepted: false
            },
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if(args.query){
            opArgs.where.OR=[
                {
                    title_contains: args.query
                },
                {
                    description_contains: args.query
                }
            ]
        } 
        const userId = getUserId(request)
        return prisma.user({id: userId}).jobsPosted(opArgs)
    },
    async user(parent, { id }, { prisma }, info){
        const userExists= await prisma.$exists.user({id: id})

        if(!userExists){
            throw new Error("User does not exist")
        }

        return prisma.user({id: id})
    },
    async job(parent, { id }, { prisma }, info){
        const jobExists= await prisma.$exists.job({id: id})

        if(!jobExists){
            throw new Error("Job does not exist")
        }

        return prisma.job({id: id})
    }
}

export { Query as default}