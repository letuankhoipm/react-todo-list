import './App.css';
import { Component } from 'react';
import TodoRow from './components/TodoRow';
import TodoBanner from './components/TodoBanner';
import TodoCreator from './components/TodoCreator';
import VisibilityControl from './components/VisibilityControl';

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
      showCompleted: true,
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = (task) => {
    const match = this.state.toDoITems.find((item) => item.action === task);
    if (!match) {
      this.setState(
        {
          toDoITems: [...this.state.toDoITems, { action: task, done: false }],
        },
        () => localStorage.setItem('todoItems', JSON.stringify(this.state))
      );
    }
  };

  toggleTodo = (todo) =>
    this.setState({
      toDoITems: this.state.toDoITems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      ),
    });

  todoTableRows = (doneValue) =>
    this.state.toDoITems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow
          key={item.action}
          item={item}
          callback={this.toggleTodo}
        ></TodoRow>
      ));

  componentDidMount = () => {
    let data = localStorage.getItem('todoItems');
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: 'Ronaldo',
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
            showCompleted: true,
          }
    );
  };

  render = () => {
    return (
      <div>
        <TodoBanner
          name={this.state.userName}
          tasks={this.state.toDoITems}
        ></TodoBanner>
        <div className='container-fluid'>
          <TodoCreator callback={this.createNewTodo}></TodoCreator>
        </div>

        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className='bg-secondary text-white text-center p-2'>
          <VisibilityControl
            description='Completed tasks'
            isChecked={this.state.showCompleted}
            callback={(checked) => {
              this.setState({
                showCompleted: checked,
              });
            }}
          ></VisibilityControl>
        </div>
        {this.state.showCompleted && (
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    );
  };
}
