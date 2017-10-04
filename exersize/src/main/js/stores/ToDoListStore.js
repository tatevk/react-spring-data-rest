import client from '../scripts/client';
import follow from '../scripts/follow';
import {observable, action} from "mobx";
const root = '/api';

export default class toDoListState{
     @observable state={todoes:[]};
     constructor() {


        this.loadFromServer(20);
     }

     @action
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
        		this.state=({
        			todoes: todoCollection.entity._embedded.toDoLists,
        			attributes: Object.keys(this.schema.properties),
        			pageSize: pageSize,
        			links: todoCollection.entity._links});
        	});
        }

    }