import jwt from 'jsonwebtoken'
//If you change the secret, change it in getUserId too
const generateToken=(id)=>{
    return jwt.sign({ userId: id}, process.env.JWT_SECRET , { expiresIn: '7 days'})
}

export {generateToken as default}

// 'this-is-a-secret'