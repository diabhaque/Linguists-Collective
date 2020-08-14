// Can pass arguments down these to refine search

const Job= {
    client(parent, args, { prisma }, info){
        return prisma.job({ id: parent.id }).client()
    },
    associate(parent, args, { prisma }, info){
        return prisma.job({ id: parent.id }).associate()
    }
}

export { Job as default}