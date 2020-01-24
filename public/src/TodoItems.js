import React from 'react';

export default class TodoItems extends React.Component {

    handleDelete = (event) => {
        this.props.onDeleteItem(event.target.previousSibling.dataset.id)
    }

    checked = (event) => {
        let todo = this.props.todos.find(todo => todo._id === event.target.dataset.id );
        this.props.onChecked(todo);
    }

    createList = (todo, index) => {
        let id =`checked_${index}`

        return (
            <label className="container" key={todo._id} htmlFor={id}>{todo.todo}
                <input 
                    id ={id} 
                    className="active" 
                    data-id={todo._id} 
                    type="checkbox" 
                    onClick={this.checked}
                    defaultChecked={todo.isDone === true ? "checked" : null}
                />
                <span onClick={this.handleDelete} className="delete"></span>
                <span className="checkmark"></span>
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

