import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import CurrentUserContext from '../../context/current-user.context'
import { getProfile, getUser } from '../../utils/operations'
import { useQuery } from '@apollo/react-hooks'
import { Spin } from 'antd'
import getClient from '../../utils/getClient'
import ProfileCard from './ProfileCard'

const GREETINGS={
    'noOne':['',''],
    'me':['My', 'Welcome, '],
    'user': ['User', 'This is the profile of ']
}

const ProfilePage = (props) => {
    const [greetings, setGreetings]=useState(GREETINGS.noOne)
    const [userId, setUserId]=useState("")
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [loading, setLoading]=useState(true)
    const [error, setError]= useState(false)
    const { match: { params } }= props
    const [currentUser] =useContext(CurrentUserContext)

    useEffect(()=>{
        console.log(currentUser)
        
        if (currentUser.token && params.id===currentUser.userId){
            const client = getClient(currentUser.token)
            
            client.query({
                query:getProfile 
            }).then(({ data })=>{
                setUserId(data.me.id)
                setName(data.me.name)
                setEmail(data.me.email)
                setGreetings(GREETINGS.me)
                setLoading(false)
            })
            // .error((data)=>{
            //     setError(true)
            //     console.log(data)
            // })
        }else{
            // get other users' profile
            const client = getClient(currentUser.token)
            
            const variables={
                id: params.id
            }

            client.query({
                query: getUser, 
                variables
            }).then(({data})=>{
                setUserId(data.user.id)
                setName(data.user.name)
                setGreetings(GREETINGS.user)
                setEmail("")
                setLoading(false)
            })
            
        }
    }, [currentUser, params.id])
    
    return (
        <>
        {
            loading?(
                <Spin size="large"/>
            ):(
                <>
                    <h1>{greetings[0]} Profile</h1>
                    <ProfileCard name={name} id={userId}/>
                </>    
            )
        } 
        </>
    )
}

export default ProfilePage