import { Fragment, useContext, useEffect } from 'react';
import './App.scss';
import Login from "./controllers/Login/Login";
import Header from "./controllers/header/header";
import EventComponent from "./controllers/Event/event-container";
import AppContext from './context/app-context';


function App() {
  const ctx = useContext(AppContext);
  const userLoggedIn = ctx?.user?.userToken?.access_token;
  const isLoggedIn = () => {
    if (!ctx.user) {
      const tokenFromSession = localStorage.getItem('token') || '';
      const userDetailsFromSession = localStorage.getItem('user') || '';
      if (tokenFromSession && userDetailsFromSession) {

        const newUser = {
          userProfile: JSON.parse(userDetailsFromSession),
          userToken: JSON.parse(tokenFromSession)
        }
        ctx.setUserDetails(newUser);
      }
    }
  }

  useEffect(isLoggedIn)

  return (
    <Fragment>
      {(!userLoggedIn) && <Login />}
      {userLoggedIn && <Header />}
      {userLoggedIn && <EventComponent />}
    </Fragment>
  );
}

export default App;
