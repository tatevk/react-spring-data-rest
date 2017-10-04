import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";

@observer class Todo extends React.Component{
    constructor(props) {
    		super(props);
    		this.handleDelete = this.handleDelete.bind(this);
    	}

    	handleDelete() {
    		this.props.onDelete(this.props.todo);
    	}
	render() {

		return (
			<tr>
				<td>{this.props.todo.todoList}</td>
				<td>{this.props.todo.time}</td>
				<td>{this.props.todo.status}</td>
				<td>
                    <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </td>
			</tr>
		)
	}
}
export default  Todo;
