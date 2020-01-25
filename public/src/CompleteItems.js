import React from 'react';

export default function CompletedItems(props){

    return (
       <div>
            {props.completed.map((todo, index)  => {
                let id =`checked_${index}`
                return (
                    <label className="container" key={todo._id} htmlFor={id}>{todo.todo}
                        <input 
                            id ={id}
                            className="active" 
                            data-id={todo._id} 
                            name="isComplete"
                            type="checkbox"
                            defaultChecked="checked"
                        />
                        <span className="checkmark"></span>
                        <span className="delete"></span>
                    </label>
                )
            })}
        </div>
    )
}