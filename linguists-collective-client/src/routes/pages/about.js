import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CurrentUserContext from '../../context/current-user.context'

const AboutPage = () => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    return (
        <>
            <h1>About Us</h1>
            <p>We provide interpreting, translation, forensic/investigative linguistics & expert witness, cultural consultancy, and cultural mediation services</p>
            {
                currentUser.token?(
                    <></>
                ):(
                    <p>Want to join our array of cooperators? <Link to="/signup">Sign Up</Link></p>
                )
            }
            <p>Need our services. <Link to="/postjob">Post a job</Link></p>
        </>
    )
}

export default AboutPage