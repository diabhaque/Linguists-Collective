import getUserId from '../utils/getUserId'

// Can pass arguments down to these to refine search

const User= {
    email(parent, args, { prisma, request }, info){
        const userId= getUserId(request, false)

        if(userId && userId === parent.id){
            return parent.email
        }else{
            return null
        }
    },
    jobsPosted(parent, args, { prisma }, info){
        return prisma.user({ id: parent.id }).jobsPosted()
    },
    jobs(parent, args, { prisma }, info){
        return prisma.user({ id: parent.id }).jobs()
    }
}

export { User as default}