import React, { Component } from 'react';
import './App.css';
import TodoItems from "./TodoItems";
import axios from 'axios';

class TodoList extends Component {
    state = {
      newItem: "",
      todos: [],
      intervalIsSet: false,
      todosToShow: "Show Completed"
    }

  componentDidMount = () => {
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addItem = (event) => {
    axios.post('/api/todo', { todo: this.state.newItem });
    this.setState({ newItem: "" })
    event.preventDefault();
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
    this.setState({
      todosToShow: this.state.todosToShow === "Show Completed" ? "Show All" : "Show Completed"
    })
  }

  checked = (todo) => {
    todo.isDone === false ? todo.isDone = true : todo.isDone = false;
    axios.post('/api/todo', { todo });
  }

  render(){
    const { newItem } = this.state;
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
            <form className="flex-form" onSubmit={this.addItem}>
                <input 
                  name = "newItem"
                  placeholder="enter task" 
                  value={newItem} 
                  onChange={this.handleChange}
                  />
                <button id="add-button" disabled= {newItem.length < 1 ? 'disabled': null}>add</button>
            </form>
             {todoList}
          </div>
          <div>{this.state.todos.filter(todo => 
            !todo.isDone).length === 0 && this.state.todosToShow === "Show Completed"? 
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
                    {(this.state.todos.filter(todo => todo.isDone).length) === 0 
                      && this.state.todosToShow === "Show Completed" ? 
                        null : <div>{this.state.todosToShow}</div>
                    }
                    </div>
                  <div className="ctrl-btn" onClick={this.deleteAllItems}>Clear All</div>
              </div> : null}
      </div>
    );
  }
}

export default TodoList;

/*

To do: 
- have the checked property be apart of state? even with database
- checked={this.state.isGoing}
- fix the checkmark 

if hte amount of todos left is equal to the amount of todos 

then, render the show compelte page 

inspo:
https://vuejsexamples.com/a-simple-todo-list-in-vue-js-with-localstorage/

https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

*/