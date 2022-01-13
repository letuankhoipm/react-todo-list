import { Component } from 'react';

class TodoBanner extends Component {
  render = () => {
    return (
      <h4 className='bg-primary text-white text-center p-2'>
        {this.props.name}'s to do list. (
        {this.props.tasks.filter((t) => !t.done).length} items to do)
      </h4>
    );
  };
}

export default TodoBanner;
