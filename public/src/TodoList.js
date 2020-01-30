import React, { Component } from 'react';
import './App.css';
import TodoItems from "./TodoItems";
import TodoForm from './TodoForm';
import axios from 'axios';

class TodoList extends Component {
    state = {
      todos: [],
      intervalIsSet: false,
      todosToShow: "Show Completed"
    }

  componentDidMount(){
    this.getDataFromDb();  

    if (!this.state.intervalIsSet){
      let interval = setInterval(() => {
        this.getDataFromDb();
      }, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = async () => {
    axios.get("http://localhost:3001/api/todos/test")
    .then(response => this.setState({ todos: response.data }))
    .catch(error  => console.log(error));
  }

  addItem = (newTodo) => {
    axios.post('/api/todo', { todo: newTodo });
  }
  
  deleteAllItems = () => {
    // clear all checked todos 
    let todosToDelete = this.state.todos.filter(todo => todo.isDone);
    
    axios.delete("/api/todo", {
      headers: { "Content-Type": "application/json" },
      data: todosToDelete
    });
    this.setState({ todosToShow: "Show Completed" })
  }

  toggleList = () => {
    this.setState(state => ({
      todosToShow: state.todosToShow === "Show Completed" ? "Show All" : "Show Completed"
    }));
  }

  checked = (todo) => {
    todo.isDone === false ? todo.isDone = true : todo.isDone = false;
    axios.post('/api/todo', { todo });
  }

  render(){
    let todoList = [...this.state.todos];

    if (this.state.todosToShow === 'Show Completed'){
        todoList = todoList.filter(todo => !todo.isDone);
        todoList = 
          <TodoItems 
            todos={todoList} 
            onToggleComplete={this.checked}
          />
    } else {
        todoList = todoList.filter(todo => todo.isDone);
        todoList = 
          <TodoItems 
            todos={todoList} 
            onToggleComplete={this.checked}
          />
    }
   
    return (
      <div className="todo-list-main">
        <h1 className="header">Todo:</h1>
          <div>
             <TodoForm 
                onAddItem = {this.addItem}
              />
             {todoList}
          </div>

          <div>{this.state.todos.every(todo => todo.isDone) && this.state.todosToShow === "Show Completed"? 
            <div style ={{
                padding: "20px",
                fontWeight: 700
              }}>Todos done!</div> : null}
            </div>

              {this.state.todos.length != 0 ?  
              <div className="control-buttons">
                <div 
                    className="ctrl-btn" 
                    onClick={this.toggleList}>
                    {this.state.todosToShow === "Show Completed" && 
                      this.state.todos.every(todo => !todo.isDone) ? 
                      "" : <div>{this.state.todosToShow}</div>}
                  </div>
                  <div className="ctrl-btn" onClick={this.deleteAllItems}>Clear All</div>
              </div> : null}
      </div>
    );
  }
}

export default TodoList;
