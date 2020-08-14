import React, { useState } from 'react';
import AppRouter from './routers/AppRouter'
import CurrentUserContext from './context/current-user.context'

function App() {
  const defaultUser={
    token: undefined,
    userId: ""
  }

  const user=(JSON.parse(localStorage.getItem('user'))||defaultUser)

  const [currentUser, setCurrentUser]=useState({
    token: user.token,
    userId: user.userId
  })

  return (
    <CurrentUserContext.Provider 
      value={[currentUser, setCurrentUser]}>
      <AppRouter/>
    </CurrentUserContext.Provider>
  );
}

export default App;
