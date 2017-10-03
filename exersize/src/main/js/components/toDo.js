import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.todo.todoList}</td>
				<td>{this.props.todo.time}</td>
				<td>{this.props.todo.status}</td>
			</tr>
		)
	}
}
export default  Todo;
