import React from 'react';
import ReactDOM from 'react-dom';

// start::create-dialog[]
class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		var newToDo = {};
		this.props.attributes.forEach(attribute => {
			newToDo[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newToDo);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {

		var inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" required placeholder={attribute} ref={attribute} className="field" />
			</p>
		);

		return (
			<div>


				<div id="createToDO" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new toDo</h2>

						<form>
							{inputs}
							<input value="Create!!!" type="submit" className="btn btn-success" onClick={this.handleSubmit}/>

						</form>
					</div>
				</div>
			</div>
		)
	}

}
// end::create-dialog[]
export default CreateDialog;