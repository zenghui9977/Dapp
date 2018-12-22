import React, { Component, Fragment } from 'react';
import Header from './Header';
import Main from './Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      address: null,
      tasks: [],
      tasks_Date: [],
    };
    this.getTasks = this.getTasks.bind(this);
    this.getTasks_Date = this.getTasks_Date.bind(this);
    this.addTask = this.addTask.bind(this);
    this.Task_finished_change = this.Task_finished_change.bind(this);
  }

  async getTasks() {
    const { todo } = this.props;
    const taskIds = await todo.methods.getTaskIds().call();
    const promises = [];
    taskIds.forEach((taskId) => {
        promises.push(todo.methods.getTask(taskId).call());
        console.log(todo.methods.getTask(taskId).call());
    });
    return await Promise.all(promises);
  }

  async getTasks_Date() {
    const { todo } = this.props;
    const taskIds = await todo.methods.getTaskIds().call();
    const promises = [];
    taskIds.forEach((taskId) => {
        promises.push(todo.methods.getTask_Date(taskId).call());
        console.log(todo.methods.getTask_Date(taskId).call());
    });
    return await Promise.all(promises);
  }

  async addTask(task_name, discription, ipfshash, deadline) {
    const { todo } = this.props;
    const receipt = await todo.methods
      .addTask(task_name, discription, ipfshash, deadline,this.state.accounts[0])
      .send({
        from: this.state.accounts[0],
        gas: 1000000
      });
    console.log(receipt);
    const tasks = await this.getTasks();
    const tasks_Date =await this.getTasks_Date();
    this.setState({tasks});
    this.setState({tasks_Date});
  }

  async Task_finished_change(id) {
    const { todo } = this.props;
    const receipt = await todo.methods
      .Task_finished_change(id)
      .send({
        from: this.state.accounts[0],
        gas: 1000000
      });
    console.log(receipt);
    const tasks = await this.getTasks();
    const tasks_Date =await this.getTasks_Date();
    this.setState({tasks});
    this.setState({tasks_Date});
  }

  async componentDidMount(){
    const { web3, todo } = this.props;
    const accounts = await web3.eth.getAccounts();
    const tasks = await this.getTasks();
    const tasks_Date = await this.getTasks_Date();
    this.setState({ 
      accounts,
      address: todo.options.address, 
      tasks,
      tasks_Date,
    });
  }

  render() {
    const { accounts, address, tasks, tasks_Date } = this.state;

    if(accounts.length === 0) return <div>Loading...</div>;
    return (
      <Fragment>
        <Header address={address} />
        <Main 
          tasks={tasks} 
          tasks_Date={tasks_Date}
          addTask={this.addTask} 
          Task_finished_change={this.Task_finished_change} 
        />
      </Fragment>
    );
  }
}

export default App;
