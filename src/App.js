import './App.css';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Rooney',
      toDoITems: [
        {
          action: 'By Flowers',
          done: false,
        },
        {
          action: 'Get Shoes',
          done: false,
        },
        {
          action: 'Collect Tickets',
          done: true,
        },
        {
          action: 'Call Joe',
          done: false,
        },
      ],
      newItemText: '',
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = () => {
    const match = this.state.toDoITems.find(
      (item) => item.action === this.state.newItemText
    );
    if (!match) {
      this.setState({
        toDoITems: [
          ...this.state.toDoITems,
          { action: this.state.newItemText, done: false },
        ],
      });
    }
  };

  render = () => {
    return (
      <div>
        <h4 className='bg-primary text-white text-center p-2'>
          {this.state.userName}'s To Do List
        </h4>
        <button className='btn btn-primary m-2' onClick={this.changeStateData}>
          Change
        </button>
      </div>
    );
  };
}
