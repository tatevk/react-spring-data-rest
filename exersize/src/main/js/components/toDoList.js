import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action } from "mobx";
import { observer, inject} from "mobx-react";
import Todo from './toDo';

@inject('toDoListStore') @observer
class ToDoList extends React.Component{
	render() {
	   // console.log(this.props.todoes)
		var todoes = this.props.toDoListStore.state.todoes.map(todo =>
			<Todo key={todo._links.self.href} todo={todo} onDelete={this.props.onDelete}/>
		);
		//console.log(todoes);
		return (
		    <div>
		        <h1>My To Do List!!!!!!!!</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>What To Do</th>
                            <th>When To Do</th>
                            <th>Status of To Doeee</th>
                        </tr>
                        {todoes}
                    </tbody>
                </table>
			</div>
		)
	}
}

export default  ToDoList;