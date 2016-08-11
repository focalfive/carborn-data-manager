import React from 'react'
import Navigation from './Navigation'
import Header from './Header'
import CarbornDataScanner from '../CarbornDataScanner'
import CarbornDataViewer from '../CarbornDataViewer'


class Main extends React.Component {

    state = {
        navigationOpen: false,
    }

    leftMenuDidTouch = () => {
        this.setState({
            navigationOpen: !this.state.navigationOpen,
        })
    }

    render() {
        return (
            <div>
                <Header onLeftMenuTouchTap={this.leftMenuDidTouch} />
                <Navigation onRequestChange={this.leftMenuDidTouch} open={this.state.navigationOpen} />
                <CarbornDataViewer />
                <CarbornDataScanner />
            </div>
        )
    }
}

export default Main
