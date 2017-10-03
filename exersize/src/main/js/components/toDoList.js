import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './toDo';

class ToDoList extends React.Component{
debugger;
	render() {
	   // console.log(this.props.todoes)
		var todoes = this.props.todoes.map(todo =>
			<Todo key={todo._links.self.href} todo={todo}/>
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