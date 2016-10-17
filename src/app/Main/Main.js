import React from 'react'
import Navigation from './Navigation'
import Header from './Header'
import RaisedButton from 'material-ui/RaisedButton';


class Main extends React.Component {

    state = {
        navigationOpen: false,
    }

    leftMenuDidTouch = () => {
        this.setState({
            navigationOpen: !this.state.navigationOpen,
        })
    }

	test1 = () => {
		var ref = firebase.database().ref('/cars/');
		var path = ref.root.toString();
		console.log(path);
		ref.on('value', function(dataSnapshot) {
			console.log(dataSnapshot.val()[0]);
		});
	}

    render() {
        return (
            <div>
                <Header onLeftMenuTouchTap={this.leftMenuDidTouch} />
                <Navigation onRequestChange={this.leftMenuDidTouch} open={this.state.navigationOpen} />
                <RaisedButton label="test" primary={true} onTouchTap={this.test1} />
            </div>
        )
    }
}

export default Main
