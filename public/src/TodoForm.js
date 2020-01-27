import React from 'react';

export default class TodoForm extends React.Component {
       
    state = {
        newItem: ""
    }

    addItem = (event) => {
        this.props.onAddItem(this.state.newItem);
        this.setState({ newItem: "" })
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return (
            <form className="flex-form" onSubmit={this.addItem}>
                <input 
                    name = "newItem"
                    value={this.state.newItem} 
                    onChange={this.handleChange}
                    placeholder="enter task" 
                />
                <button id="add-button" disabled= {this.state.newItem.length < 1 ? 'disabled': null}>add</button>
            </form>
        )
    }
}