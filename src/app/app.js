import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import history from './History';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import cookie from 'react-cookie';
import $ from 'jquery';
import Main from './Main';
import { Login, LoginProcess } from './Login';
import { User } from './User';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const appHistory = history();
const muiTheme = getMuiTheme();
const user = User.getSharedObject();

const checkLogin = () => {
	if(!user.logged) {
		appHistory.replace('login');
	}
	return;

	console.log("checkLogin", location.hash);
    user.checkLogin();
	return;

    user.checkLogin().then((userInfo, token) => {
		console.log("Success", userInfo, token, user.redirection);
		if(!!user.redirection) {
			console.log("Redirect to", user.redirection);
			const href = user.redirection;
			user.redirection = null;
			location.href = href;
		} else {
			location.href = "/";
		}
	}, (errorMessage) => {
		console.log("Error", errorMessage, location.hash);
		if(location.hash != "#/login") {
			user.redirection = location.href;
			console.log("Redirect to login", user.redirection);
			// appHistory.replace('login');
			location.hash = "login";
		}
	});
}

/// Application component
class App extends React.Component {

    /**
     * Render view
     */
    render() {
        // TODO: Change to route value, not location.hash

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app">
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }

    /**/
}

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Main} onEnter={checkLogin} />
            <Route path="login" component={Login} />
            <Route path="loginProcess" component={LoginProcess} />
        </Route>
    </Router>,
    document.getElementById('app')
);

// For example, add <Route /> inside of root <Route /> to route component
// <Route path="component" component={Component} />
