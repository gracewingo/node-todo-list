import React from 'react';
import TodoForm from './TodoForm';

export default class Todolist extends React.Component {

    state = {
        todos: []
    };

    addTodo = (todo) => {
        // add todo to beginning & copy the values from state
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }
    render(){
        return (
            <div>
                <TodoForm onSubmit={this.addTodo} />
            </div>
        )
    }
}