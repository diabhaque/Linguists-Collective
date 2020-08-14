import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <h1>Hello.</h1>
            <h2>Welcome to Linguists Collective</h2>
            <p>Know more about us <Link to="/about">here</Link></p>
            <p><Link to="/postjob">Post a job</Link></p>
        </>
    )
}

export default HomePage