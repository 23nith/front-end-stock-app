import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/dashboard/menu';
import { useState } from 'react';
import Contentarea from './components/dashboard/contentarea';
import Portfolio from './components/dashboard/portfolio';
import History from './components/dashboard/history';
import Discover from './components/dashboard/discover';
import UserManagement from './components/dashboard/userManagement';
import TopTenContextProvider from './contexts/TopTenContext';
import TransactionsContextProvider from './contexts/TransactionsContext';
import StocksContextProvider from './contexts/StocksContext';
import GraphContextProvider from './contexts/GraphContext';
import UserContextProvider from './contexts/UserContext';
import TradersContextProvider from './contexts/TradersContext';
import SignUp from './components/signup';

const API_URL = 'http://localhost:3000/Login'

function App() {
  const [showLogin, setShowLogin] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <Router>
      <TopTenContextProvider>
        <TransactionsContextProvider>
          <StocksContextProvider>
            <GraphContextProvider>
              <UserContextProvider>
                <TradersContextProvider>
                  <div className="App">
                    {showLogin && <Login setShowLogin={setShowLogin} setShowSignUp={setShowSignUp}/>}
                    {showSignUp && <SignUp setShowLogin={setShowLogin} setShowSignUp={setShowSignUp}/>}
                    {(!showLogin && !showSignUp) && <div className='flex border-black border-2 h-screen'>
                      <Menu setShowLogin={setShowLogin}/>
                      <Switch>
                        <Route exact path="/front-end-stock-app/">
                          <Contentarea/>
                        </Route>
                        <Route exact path="/front-end-stock-app/portfolio">
                          <Portfolio/>
                        </Route>
                        <Route exact path="/front-end-stock-app/discover">
                          <Discover/>
                        </Route>
                        <Route exact path="/front-end-stock-app/history">
                          <History/>
                        </Route>
                        <Route exact path="/front-end-stock-app/management">
                          <UserManagement/>
                        </Route>
                      </Switch>
                    </div>}
                  </div>
                </TradersContextProvider>
              </UserContextProvider>
            </GraphContextProvider>
          </StocksContextProvider>
        </TransactionsContextProvider>
      </TopTenContextProvider>
    </Router>
  );
}

export default App;
