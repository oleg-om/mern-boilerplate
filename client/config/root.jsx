import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/dashboard'
import DummyView from '../components/dummy-view-old'
import NotFound from '../components/404'
import Login from '../components/login'
import Register from '../components/register'

import Startup from './startup'
import setupInterceptors from '../services/setupInterceptors'
import Profile from '../components/profile'
import AuthVerify from '../common/AuthVerify'
import Navbar from '../components/navbar'
import Accounts from '../components/accounts'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  // const token = useSelector((state) => state.auth.user.accessToken)

  const func = (props) => {
    if (!user) <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }

  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  // const token = useSelector((state) => state.auth.user.accessToken)

  const func = (props) => {
    if (user) return <Component {...props} />

    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }
  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  // const dispatch = useDispatch()
  // const logOut = useCallback(() => {
  //   dispatch(logout())
  // }, [dispatch])
  // useEffect(() => {
  //   history.listen((location) => {
  //     dispatch(clearMessage()); // clear message when changing location
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   EventBus.on('logout', () => {
  //     logOut()
  //   })

  //   return () => {
  //     EventBus.remove('logout')
  //   }
  // }, [logOut])
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Navbar />
          <Switch>
            <Route exact path="/" component={DummyView} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <OnlyAnonymousRoute exact path="/accounts" component={Accounts} />
            <PrivateRoute exact path="/dashboard" component={Home} />
            <PrivateRoute exact path="/hidden-route" component={DummyView} />
            <OnlyAnonymousRoute exact path="/anonymous-route" component={DummyView} />

            <Route component={NotFound} />
          </Switch>
          <AuthVerify />
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

setupInterceptors(store)

export default RootComponent
