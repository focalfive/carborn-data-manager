import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';
import history from '../History';
import RaisedButton from 'material-ui/RaisedButton';
import { User } from '../User';

const styles = {
    template: {
        textAlign: 'center',
        paddingTop: 200,
    },
};

class Login extends React.Component {

    openLogin = () => {
		console.log("openLogin")
		history().push("loginProcess");
    }

    render() {
        return(
            <div style={styles.template}>
                <RaisedButton label="Log-in with Google" primary={true} onTouchTap={this.openLogin} />
            </div>
        );
    }
}

export default Login;
