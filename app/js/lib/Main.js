import React, { Component } from 'react';
import NewTask from './NewTask';
import Tasks from './Tasks';

class Main extends Component {
  render() {
    const { tasks,  addTask, Task_finished_change } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NewTask addTask={addTask} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Tasks tasks={tasks} Task_finished_change={Task_finished_change} />
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
