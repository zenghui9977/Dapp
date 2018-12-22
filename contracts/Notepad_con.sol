pragma solidity ^0.4.24;

/**
 * The Notepad_con contract does this and that...
 */
contract Notepad_con {
    //person 
    struct  Owner {
        address hash_address;
        string  name;   
    }
       
    //Task
    struct Task {
        uint id;
        string task_name;
        string description;
        string ipfs_hash;
        bool finished;
        uint timestamp;
        uint deadline;
        uint completedData; 
    }


    //one owner might have many tasks,but for one task,it only has one owner
    mapping (uint => address) public TaskID_to_Address;
    mapping (uint => Task) public TaskID_to_Task;
    

    //the task list ,the number of task,all of the tasks are stored here
    Task[] public Task_list;
    uint public taskNumber;

    
    //the owner list ,and owner number
    Owner[] public Owner_list;
    uint public ownerNumber;

    //mapping that every owner's Task count 
    mapping (address => uint) OwnerTaskCount;

    //taskID list
    uint[] taskIds;

    //events
    event TaskAdded(
        string task_name, 
        string description, 
        string ipfs_hash, 
        bool finished, 
        uint deadline,
        uint nowtime, 
        address ownerAddr);

    event OwnerAdded(address ownerAddr);
    event TaskFinishedChanged(uint id , bool finished, uint completedData);
    event TaskDDLChanged(uint id ,uint deadline);
    event TaskDescriptionChanged(uint id ,string description);
    event TaskNameChanged(uint id ,string name);
    event TaskFileChanged(uint id ,string ipfs_hash);
    
    
          
    //Constructor
    constructor() public {
        taskNumber = 0;
        ownerNumber = 0;
    }
   
    //get the certain owner's Task list,return the id array
    function get_Owner_TaskList (address owner) public returns(uint[]) {
        uint[] memory TaskIdList = new uint[](OwnerTaskCount[owner]);
        uint index = 0;
        for(uint i = 1;i < Task_list.length; i++)
        {      
             if(TaskID_to_Address[i]==owner)
             {
                TaskIdList[index]=i;
                index ++;
             }
        }
        return TaskIdList;
    }

    //get the id list 
    function getTaskIds() public constant returns(uint[]) {
       return taskIds;
    }      
        
    //get task by id,
    function getTask (uint id) public 
    returns(
        uint,
        string,
        string,
        string,
        bool,
        address) 
    {
        require (id >= 0);       
        return(
         id,
         TaskID_to_Task[id].task_name,
         TaskID_to_Task[id].description,
         TaskID_to_Task[id].ipfs_hash,
         TaskID_to_Task[id].finished,
         TaskID_to_Address[id]
         );      
    }

    //get task date information by _id
    function getTask_Date (uint id) public returns(uint, uint, uint) {       
        require (id>=0);
        return(
        TaskID_to_Task[id].timestamp,
        TaskID_to_Task[id].deadline,
        TaskID_to_Task[id].completedData
        );
        
    }
    
      


    //add task
    function addTask (
        string _task_name,
        string _description,
        string _ipfsHash,
        uint _deadline,
        address ownerAddr ) public {
        //the length of ipfs hash is 46      
        //require (bytes(_hash).length == 46);
        //the length of task_name must between 0 to 256
        //require (bytes(_task_name).length<=256&&bytes(_task_name).length>0);

        //timestamp is now
        uint update_time = now * 1000;

        taskNumber++;
        Task memory task = Task(taskNumber, _task_name, _description, _ipfsHash, false, update_time, _deadline,0);

        //add into Task_list
        Task_list.push(task);
        taskIds.push(taskNumber);

        //add into mapping
        TaskID_to_Address[taskNumber] = ownerAddr;
        TaskID_to_Task[taskNumber] = task;
        OwnerTaskCount[ownerAddr]++;
        emit TaskAdded(_task_name, _description, _ipfsHash, false, _deadline, update_time, ownerAddr);
    }

   //judge whether the Owner is in the list
    modifier OwnerNotExist(address owner) { 
        for(uint i=1; i <Owner_list.length;i++)
        {
            require (Owner_list[i].hash_address != owner); 
        }
        _; 
    }
    

    function addOwner (address ownerAddr) OwnerNotExist(ownerAddr) public {
        Owner memory owner = Owner(ownerAddr,"");
        Owner_list.push(owner);
        ownerNumber++;
        emit OwnerAdded(ownerAddr);
    }
    
  
    //change the state that has been finished or not
    function Task_finished_change (uint _id) public {
        //find the task
         
        //Task_list update
        Task_list[_id-1].finished = !Task_list[_id-1].finished;
        //mapping update
        TaskID_to_Task[_id].finished = !TaskID_to_Task[_id].finished;

        //change the completedData
        Task_list[_id-1].completedData = Task_list[_id-1].finished ? now*1000 : 0;
        TaskID_to_Task[_id].completedData = TaskID_to_Task[_id].finished ? now*1000 : 0;

        emit TaskFinishedChanged(_id, TaskID_to_Task[_id].finished, TaskID_to_Task[_id].completedData);      
    }

    //change the deadline,confirming that the time's type is unit by web input
    function Task_DDL_change (uint _id, uint256 _deadline) public {        
        require (_id <= taskNumber);       
        Task_list[_id].deadline = _deadline;
        //mapping update
        TaskID_to_Task[_id].deadline = _deadline;
        emit TaskDDLChanged(_id, _deadline);
    }
        
    //change the description of the task
    function Task_description_change (uint _id, string _description) public {
        require (_id <= taskNumber);
        Task_list[_id].description = _description;
        //mapping update
        TaskID_to_Task[_id].description = _description; 
        emit TaskDescriptionChanged(_id, _description);     
    }

    //change the name of the task
    function Task_taskName_change (uint _id, string _task_name)  public {
        require (_id <= taskNumber);
        Task_list[_id].task_name = _task_name;
        //mapping update
        TaskID_to_Task[_id].task_name = _task_name;
        emit TaskNameChanged(_id, _task_name);           
    }
    
    //change file hash 
    function Task_ipfsHash_change (uint _id, string _ipfsHash) public {
       require (_id <= taskNumber);
       Task_list[_id].ipfs_hash = _ipfsHash;
       //mapping update
       TaskID_to_Task[_id].ipfs_hash = _ipfsHash;
       emit TaskFileChanged(_id, _ipfsHash); 
    }
            
    
}
