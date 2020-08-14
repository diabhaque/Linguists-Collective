import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Layout from '../components/layout/Layout'

import SignIn from '../routes/authentication/SignIn'
import SignUp from '../routes/authentication/SignUp'

import HomePage from '../routes/pages/Index'
import AboutPage from '../routes/pages/About'
import ContactPage from '../routes/pages/Contact'

import ProfilePage from '../routes/profile/Profile'

import FindJobPage from '../routes/jobs/FindJob'
import PostJobPage from '../routes/jobs/PostJob'
import JobPage from '../routes/jobs/Job'

import NotFoundPage from '../routes/pages/NotFound'
import CurrentUserContext from '../context/current-user.context'
import 'antd/dist/antd.css'


const AppRouter=()=>{
    const [currentUser]= useContext(CurrentUserContext)
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path='/' component={HomePage} exact={true}/>
                    <Route path='/about' component={AboutPage}/>
                    <Route path='/contact' component={ContactPage}/>
                    <Route path='/profile/:id' component={ProfilePage}/>
                    <Route path='/postjob' component={PostJobPage}/>
                    <Route path='/findjob' component={FindJobPage}/>
                    <Route path='/job/:id' component={JobPage}/>
                    <Route 
                        path='/signin' 
                        render={()=>
                            currentUser.token?(
                                <Redirect to='/'/>
                            ):(
                                <SignIn/>
                            )
                        }  
                    />
                    <Route 
                        path='/signup' 
                        render={()=>
                            currentUser.token?(
                                <Redirect to='/'/>
                            ):(
                                <SignUp/>
                            )
                        }  
                    />
                    <Route component={NotFoundPage}/>
                </Switch> 
            </Layout>
        </Router>
    )
}

export default AppRouter