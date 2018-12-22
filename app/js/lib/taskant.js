import {List, Avatar, Icon, Button,message} from 'antd';
import React, { Component } from 'react';
import { formatDate } from '../formatdate';

class TaskAnt extends Component{
    constructor(props){
      super(props);
      this.data1 = [];
      this.data2 = [];
      this.combined_Array = [];


      this.state={
        finished: false,
        buttonLabel: "完成",
      }   
   }

    theMapOfTask(task,i){
       this.data1.push(task);
    }

    theMapOfTaskDate(task_date,i){
       this.data2.push(task_date);
    }


    getData(tasks,tasks_Date){

      this.data1 = [];
      this.data2 = [];
      tasks.map((task,i) => this.theMapOfTask(task,i));
      tasks_Date.map((task_date,i) => this.theMapOfTaskDate(task_date, i));
      console.log(this.data1.length,this.data2.length,"length")
      if(this.data2.length>=1)
      {     
          this.combined_Array = [];
          for(let i=0;i<this.data2.length;i++)
          {

             let temp = Object.values(this.data1[i]);
             let temp2 = Object.values(this.data2[i]);
             console.log(temp,temp2,'lll');
             this.combined_Array.push([temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp2[0],temp2[1],temp2[2]]); 
          }
          console.log(this.combined_Array);
      }

      return this.combined_Array;
   }

    
    render(){
      const {tasks,tasks_Date,Task_finished_change} = this.props;
      
      const IconText = ({type, alt_text, text}) =>(
         <span>
             <Icon type={type} style={{marginRight : '8'}} />
             <div>{alt_text}</div>
             <div>{text}</div>
             
         </span>
      );


      return(
        <div className="card">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="orange">Tasks</h2>
            </div>          
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page)=> {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.getData(tasks,tasks_Date)}
                    renderItem={(item,index) => (
                      <List.Item 
                          key={item[0]} 
                          actions={[
                            <IconText type="calendar" alt_text="创建日期" text={formatDate(item[6])}/>,
                            <IconText type="calendar" alt_text="截至日期" text={formatDate(item[7])}/>,
                            <Button type="primary" onClick={(e)=>{
                                
                                console.log("button",item[0]);
                                Task_finished_change(item[0]);
                                message.success("the task \'"+item[1]+"\' finished");
                              }} 
                              disabled={item[4]}
                            >
                              <Icon type="check"/>{item[4]?"已完成":"完成"}
                            </Button>,
                            ]
                        }
                          extra={<img width="142px" height="142px" alt="logo" src={`https://ipfs.io/ipfs/${item[3]}`} />}
                          
                          >
                        <List.Item.Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={<a href="https://ant.design">{item[1]}</a>}
                          description={item[2]}                     
                        />


                      </List.Item>
                    )}
                  />           
              </div>
            </div>
          </div>
        </div>

      );

    }

}

export default TaskAnt;



