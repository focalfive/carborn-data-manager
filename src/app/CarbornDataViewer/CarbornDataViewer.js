import React from 'react'
import {List, ListItem} from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'

const styles = {
	root: {
		width: 200,
	},
}

class CarbornDataViewer extends React.Component {

	componentWillMount() {
		console.log('componentWillMount')
	}

    render() {
        return (
			<List style={styles.root}>
				<Subheader>Brand List</Subheader>
				<ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
				<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
			</List>
        )
    }
}

export default CarbornDataViewer
