/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
import { Link } from 'react-router-dom';

class Replay extends React.Component{
	render () {
		return (
				<ul>
					{Object.keys(this.props.chats).map((key, index) => <li key={index}><Link to={`/replays/${key}`}>{this.props.chats[key].startTime}</Link></li>)}
				</ul>
			)
	}
}

export default Replay