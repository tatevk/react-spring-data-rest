'use strict';

// tag::vars[]
import React from 'react';
import ReactDOM from 'react-dom';
import client from './client';
import follow from './follow';
import CreateDialog from './components/createDialog';
import ToDoList from './components/ToDoList';

const root = '/api';


// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {todoes: [], attributes: [], pageSize: 100, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
	}
	loadFromServer(pageSize)
    {
    	follow(client, root, [
    		{rel: 'toDoLists', params: {size: pageSize}}]
    	).then(todoCollection => {
    		return client({
    			method: 'GET',
    			path: todoCollection.entity._links.profile.href,
    			headers: {'Accept': 'application/schema+json'}
    		}).then(schema => {
    			this.schema = schema.entity;
    			return todoCollection;
    		});
    	}).done(todoCollection => {
    		this.setState({
    			todoes: todoCollection.entity._embedded.toDoLists,
    			attributes: Object.keys(this.schema.properties),
    			pageSize: pageSize,
    			links: todoCollection.entity._links});
    	});
    }


    // tag::create[]
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

	componentDidMount() {
//		client({method: 'GET', path: '/api/toDoLists'}).done(response => {
//			this.setState({todoes: response.entity._embedded.toDoLists});
//		});
    this.loadFromServer(this.state.pageSize);
	}

	render() {
		return (
		<div>
		    <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
			<ToDoList todoes={this.state.todoes}
                    pageSize={this.state.pageSize}
                    onNavigate={this.onNavigate}
			/>
		</div>
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

