import $ from 'jquery';
import cookie from 'react-cookie';

var sharedObject = null;

class User {
    user = cookie.load('user');
    token = cookie.load('token');

    get logged() {
        return !!this.user && !!this.token && !!this.token.length;
    }

	set redirection(href) {
		if(!href) {
			cookie.remove('redirection');

		} else {
			cookie.save('redirection', href);
		}
	}

	get redirection() {
		return cookie.load('redirection');
	}

    didLoginSuccess() {
        console.log('User.didLoginSuccess called. Override this function');
    }

    didLoginFail() {
        console.log('User.didLoginFail called. Override this function');
    }

	saveUserInfo(user, token) {
		this.user = user;
		this.token = token;
		cookie.save('user', user);
		cookie.save('token', token);
	}

	clearUserInfo() {
		this.user = null;
		this.token = null;
		cookie.remove('user');
		cookie.remove('token')
	}

	login() {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	checkLogin = () => {
		return new Promise((resolve, reject) => {
			firebase.auth().getRedirectResult().then((result) => {
				if(result.credential) {
					var token = result.credential.accessToken;
				}
				var user = result.user;
				if(user && token) {
					console.log("save");
					this.saveUserInfo(user, token);
					resolve();
					return;
				}
				reject();
			}).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
				console.log("error", errorCode, errorMessage, email, credential);
				// user.clearUserInfo();
				reject();
			});
		});
	}

    logout = () => {
		return new Promise((resolve, reject) => {
			firebase.auth().signOut().then(() => {
				console.log("Sign-out successful.");
				this.clearUserInfo();
				// this.didLoginFail();
				resolve();
			}).catch((error) => {
				console.log("Sign-out error.")
				reject();
			});
		});
    }
}

User.getSharedObject = () => {
    if(sharedObject == null) {
        sharedObject = new User();
    }

    return sharedObject;
}

export default User;
