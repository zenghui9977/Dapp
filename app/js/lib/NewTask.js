import React, { Component } from 'react';
import ipfs from './ipfs'

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
       ipfsHash: '',
       buffer: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) },()=>{
          ipfs.files.add(this.state.buffer, (error,result) => {
          if(error) {
            console.error(error)
            return
          }
          this.setState({ipfsHash: result[0].hash})
          console.log(this.state.ipfsHash);
        });       
      })
      console.log('buffer', this.state.buffer)
    };
    

  }
  


  onSubmit(e) {
    e.preventDefault();
    
    var name = e.target.elements[0].value;
    var discription = e.target.elements[1].value;
    var date = new Date(e.target.elements[3].value);
    var time = date.getTime();
    console.log(name, discription,time);
    var hash = this.state.ipfsHash;
    console.log('ipfs',this.state.ipfsHash,time);

    this.props.addTask(
        e.target.elements[0].value,
        e.target.elements[1].value,
        hash,
        time
      );
  }



  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="orange">Create Task</h2>
          </div>
        </div>
        <div className="row">
          <form id="new-task" className="col-sm-12" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="task-name">Name</label>
              <input id="task-name" type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label for="task-discription">Discription</label>
                <input id="task-discription" type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label for="task-ipfs">Select File</label>
                <input id="task-ipfs" type="file" className="form-control" onChange={this.captureFile}></input>
                
            </div>
            <div className="form-group">
                <label for="task-date">Select Date</label>
                <input id="task-date" type="date" className="form-control"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewTask;
