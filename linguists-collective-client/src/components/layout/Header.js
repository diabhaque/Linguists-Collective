import React, { useContext } from "react"
import { NavLink, withRouter } from "react-router-dom"
import headerStyles from "./header.module.scss"
import CurrentUserContext from '../../context/current-user.context'
// import LogOut from "../../routes/authentication/LogOut"

const Header = ({history}) => {
  const [currentUser, setCurrentUser]=useContext(CurrentUserContext)

  const LogOut=()=>{
      if(currentUser.token){
          console.log(currentUser, "logging out")
          setCurrentUser({
              token: undefined,
              userId: ""
          })
          localStorage.removeItem("user")
          history.push('/')
      }
  }

  return (
    <header className={headerStyles.header}>
      <h1>
        <NavLink className={headerStyles.title} to="/">
          LinguistsCollective.com
        </NavLink>
      </h1>
      <nav className={headerStyles.navWhole}>
        <ul className={headerStyles.navList}>
          <li>
            <NavLink
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/"
              exact={true}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/findjob"
            >
              Find Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/postjob"
            >
              Post a Job
            </NavLink>
          </li>
        </ul>
        <ul className={headerStyles.navList}>
        {
          !currentUser.token?(
            <>
              <li>
                <NavLink
                    className={headerStyles.navItem}
                    activeClassName={headerStyles.activeNavItem}
                    to="/signin"
                >
                    Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                    className={headerStyles.navItem}
                    activeClassName={headerStyles.activeNavItem}
                    to="/signup"
                >
                    Sign Up
                </NavLink>
              </li>
            </>
          ):(
            <>
              <li>
                <NavLink
                    className={headerStyles.navItem}
                    activeClassName={headerStyles.activeNavItem}
                    to={`/profile/${currentUser.userId}`}
                >
                    Profile
                </NavLink>
              </li>
              <li>
                <button 
                  className={headerStyles.button}
                  onClick={LogOut}
                >
                  Log out
                </button>
                {/* <NavLink
                    className={headerStyles.navItem}
                    activeClassName={headerStyles.activeNavItem}
                    to="/logout"
                >
                    Log out
                </NavLink> */}
              </li>
            </>
          )
        }
          
        </ul>
        
      </nav>
    </header>
  )
}

export default withRouter(Header)
