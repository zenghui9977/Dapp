import React, { Component } from 'react';
import NewTask from './NewTask';
import TaskAnt from './taskant';

class Main extends Component {
  render() {
    const { tasks, tasks_Date, addTask, Task_finished_change } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NewTask addTask={addTask} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
             <TaskAnt tasks={tasks} tasks_Date={tasks_Date} Task_finished_change={Task_finished_change}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
