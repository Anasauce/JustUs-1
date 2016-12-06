import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchSplashData } from 'fetch-data';
import { App, Splash, Dashboard, About, LoginOrRegister } from 'pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Splash} fetchData={fetchSplashData} />
      <Route path="about" component={About} />
    </Route>
  );
};
