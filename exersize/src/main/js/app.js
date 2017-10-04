'use strict';

// tag::vars[]
import React from 'react';
import ReactDOM from 'react-dom';
import client from './scripts/client';
import follow from './scripts/follow';
import CreateDialog from './components/createDialog';
import ToDoList from './components/toDoList';
import { Provider } from 'mobx-react';
import toDoListState from './stores/ToDoListStore';

const root = '/api';
const store = new toDoListState();

// end::vars[]

// tag::app[]

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {todoes: [], attributes: [], pageSize: 100, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this)
        this.onNavigate = this.onNavigate.bind(this);
	}

    	onCreate(newToDo)
    	{
    		follow(client, root, ['toDoLists']).then(todoCollection => {
    			return client({
    				method: 'POST',
    				path: todoCollection.entity._links.self.href,
    				entity: newToDo,
    				headers: {'Content-Type': 'application/json'}
    			})
    		}).then(response => {
    			return follow(client, root, [
    				{rel: 'toDoLists', params: {'size': this.state.pageSize}}]);
    		}).done(response => {
    			if (typeof response.entity._links.last != "undefined") {
    				this.onNavigate(response.entity._links.last.href);
    			} else {
    				this.onNavigate(response.entity._links.self.href);
    			}
    		});
    	}
    	// end::create[]
    	    	// tag::delete[]
            	onDelete(toDo) {
            		client({method: 'DELETE', path: toDo._links.self.href}).done(response => {
            			this.loadFromServer(this.state.pageSize);
            		});
            	}
            	// end::delete[]
    		// tag::navigate[]
        	onNavigate(navUri) {
        	//debugger;
        		client({method: 'GET', path: navUri}).done(todoCollection => {
        			this.setState({
        				todoes: todoCollection.entity._embedded.toDoLists,
        				attributes: this.state.attributes,
        				pageSize: this.state.pageSize,
        				links: todoCollection.entity._links
        			});
        		});
        	}
        	// end::navigate[]

        	// tag::update-page-size[]
        	updatePageSize(pageSize) {
        		if (pageSize !== this.state.pageSize) {
        			this.loadFromServer(pageSize);
        		}
        	}
        	// end::update-page-size[]


	render() {
		return (
		<Provider toDoListStore={store}>
		<div>
		    <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
			<ToDoList
                    pageSize={this.state.pageSize}
                    onNavigate={this.onNavigate}
                     onDelete={this.onDelete}
			/>
		</div>
		</Provider>
		)
	}
}
// end::app[]


// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]

