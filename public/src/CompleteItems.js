import React from 'react';

export default function CompletedItems(props){

    return (
       <div>
            {props.completed.map(todo => {
                return (
                    <label className="container" key={todo._id}>{todo.todo}
                        <input 
                            className="active" 
                            data-id={todo._id} 
                            type="checkbox"
                            defaultChecked="checked"
                            />
                        <span className="delete"></span>
                        <span className="checkmark"></span>
                    </label>
                )
            })}
        </div>
    )
}