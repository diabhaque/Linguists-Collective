import getUserId from '../utils/getUserId'

const Subscription={
    job:{
        async subscribe(parent, { clientId, associateId }, { prisma } , info){
            // subscribe to specific users
            const listener= await prisma.$subscribe.job()
            return listener
        }, 
        resolve(payload, args, ctx, info){
            return payload
        }
    },
    myJobs:{
        async subscribe(parent, args , { prisma, request } , info){
            const userId = getUserId(request)
            const listener= await prisma.$subscribe.job({
                mutation_in: ['UPDATED'],
                node: {
                  associate: {
                    id: userId,
                  }
                },
              })
            return listener
        }, 
        resolve(payload, args, ctx, info){
            return payload
        }
    },
    myJobsPosted:{
        async subscribe(parent, args , { prisma, request } , info){
            const userId = getUserId(request)
            const listener= await prisma.$subscribe.job({
                mutation_in: ['UPDATED'],
                node: {
                  client: {
                    id: userId,
                  }
                },
              })
            return listener
        }, 
        resolve(payload, args, ctx, info){
            return payload
        }
    }
}

export { Subscription as default }


