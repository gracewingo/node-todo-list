import React from 'react';

export default class TodoItems extends React.Component {

    handleClick = (event) => {
        console.dir(event.target)
        let todo = this.props.todos.find(todo => todo._id === event.target.dataset.id );
        this.props.onToggleComplete(todo);
    }

    createList = (todo, index) => {
        let id =`checked_${index}`

        return (
            <label className="container" key={todo._id} htmlFor={id}>
                <input 
                    id ={id} 
                    className="active" 
                    data-id={todo._id} 
                    type="checkbox" 
                    name="isComplete"
                    defaultChecked={todo.isDone === true ? "checked" : null}
                    onClick={this.handleClick}
                />
                <span className="checkmark"></span>
                <span>{todo.todo}</span>
                <span className="delete"></span>
            </label>
        ) 
    }

   render(){ 
        const { todos } = this.props
        const todoItems = todos.map(this.createList);

        return (
            <div>
                <div className="todo-items-container">{todoItems}</div>
            </div>
        )
    }
    
}

