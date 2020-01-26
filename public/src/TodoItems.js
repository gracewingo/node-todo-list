import React from 'react';

export default class TodoItems extends React.Component {

    handleClick = (todo) => {
        this.props.onToggleComplete(todo);
    }

    createList = (todo, index) => {
        let id =`checked_${index}`

        return (
            <label className="container" key={todo._id} htmlFor={id}>
                <input 
                    id ={id} 
                    data-id={todo._id} 
                    type="checkbox" 
                    defaultChecked={todo.isDone ? "checked" : null}
                    onClick={() => this.handleClick(todo)}
                    
                />
                <span className="checkmark"></span>

                <span style ={{ 
                        textDecoration: todo.isDone ? "line-through" : ""
                    }}>{todo.todo}</span>
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


/*
if i uncheck and the completed todos are ZERO, then, show in completed to do s


*/