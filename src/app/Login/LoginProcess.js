import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';
import history from '../History';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { User } from '../User';

const styles = {
    template: {
        textAlign: 'center',
        paddingTop: 200,
    },
};

class LoginProcess extends React.Component {

	componentWillMount() {
		console.log("componentWillMount");
		const user = User.getSharedObject();
		if(user.logged) {
			history().push("/");
			return;
		}

		user.checkLogin().then(() => {
			history().push("/");
		}, () => {
			this.openLogin();
		});
	}

	openLogin() {
		User.getSharedObject().login();
	}

    render() {
        return(
            <div style={styles.template}>
				<CircularProgress />
            </div>
        );
    }
}

export default LoginProcess;
