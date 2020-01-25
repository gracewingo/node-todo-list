import React, { Component } from 'react';
import './App.css';
import TodoItems from "./TodoItems";
import CompletedItems from './CompleteItems';
import axios from 'axios';

class TodoList extends Component {
    state = {
      newItem: "",
      todos: [],
      intervalIsSet: false,
      showingComplete: false
    }

  componentDidMount = () => {
    this.getDataFromDb(); // make this more resilient 

    if (!this.state.intervalIsSet){
      let interval = setInterval(() => {
        this.getDataFromDb();
      }, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  getDataFromDb = async () => {
    const response1 = await fetch("http://localhost:3001/api/todos/test");
    const todos = await response1.json();
    this.setState({ todos: todos })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addItem = (event) => {
    axios.post('/api/todo', { todo: this.state.newItem });
    this.setState({ newItem: "" })
    event.preventDefault();
  }
  
  deleteItems = async(_id) => {
    // call this only when user hits 'clear all' 
    console.log(_id)
    axios.delete("/api/todo", {
      headers: { "Content-Type": "application/json" },
      data: {_id}
    });
  }

  showComplete = () => {
    // when i hit show complete, show only todo items that are complete 
    if (this.state.showingComplete){
        this.setState({
          showingComplete: false
        })
    } else {
        this.setState({
          showingComplete: true
        })
    }
  }

  checked = async (todo) => {
    todo.isDone === false ? todo.isDone = true : todo.isDone = false;
    axios.post('/api/todo', { todo });
  }

  render(){
    const { newItem, todos, showingComplete } = this.state;
    let toggleButton;
    let todoList = [...this.state.todos];

    if (!showingComplete){
        toggleButton = "Show Complete"
        todoList.filter(todo => todo.isDone === false)
        todoList = 
          <TodoItems todos={todos} 
            onToggleComplete={this.checked}
          />
    } else {
        toggleButton = "Show All"
        todoList = todoList.filter(todo => todo.isDone === true)
        todoList = <CompletedItems completed={todoList}/>
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

          <div className="control-buttons">
            <div className="show-complete" onClick={this.showComplete}>
                <span>
                  {toggleButton}
                </span>
              </div>
              <div onClick={this.deleteItems}>Clear All</div>
          </div>
      </div>
    );
  }
}

export default TodoList;

/*

To do: 
- have the checked property be apart of state? even with database
- checked={this.state.isGoing}

inspo:
https://vuejsexamples.com/a-simple-todo-list-in-vue-js-with-localstorage/

https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

*/