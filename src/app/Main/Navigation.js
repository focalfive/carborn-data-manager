import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


class Navigation extends React.Component {

    render() {
        return (
            <nav>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.props.open}
                    onRequestChange={this.props.onRequestChange}
                >
                    <MenuItem>Menu 1</MenuItem>
                    <MenuItem>Menu 2</MenuItem>
                </Drawer>
            </nav>
        );
    }
}

export default Navigation;
