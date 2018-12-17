import React, { Component } from 'react';
import { formatDate } from '../formatdate';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.renderTask = this.renderTask.bind(this);
  }

  renderTask(task, i) {
    return (
      <tr key={i} >
        <td>{task[0]}</td>
        <td>{task[1]}</td>
        <td>{task[2]}</td>
        <td>{task[3]}</td>
        <td>
          <input 
            type="checkbox" 
            checked={!!task[4]}
            onChange={() => this.props.Task_finished_change(task[0])}
          />
        </td>
        <td>{formatDate(task[6])}</td>
        <td>{formatDate(task[7])}</td>
        <td>
          {task[8] != '0' ? formatDate(task[8]) : ''}
        </td>
        <td>{task[5]}</td>
      </tr>
    );
  }
  render() {
    const { tasks } = this.props;
    
    return (
    <div className="card">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="orange">Tasks</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Name</th>               
                <th>Discription</th>
                <th>IPFS Hash</th>
                <th>Finished</th>
                <th>Date</th>
                <th>Deadline</th>
                <th>Date Complete</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody id="tasks">
              {tasks.map((task, i) => this.renderTask(task, i))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }
}

export default Tasks;
