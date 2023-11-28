import { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineSearch, AiOutlineDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";

const getLocalList = () =>{
  let list = localStorage.getItem('tasks');
  if(list){
    return JSON.parse(list);
  }
  return []
}

function App() {
  const [list, setlist] = useState(getLocalList());
  const [virlist, setvirlist] = useState(list);

  const [stateo, setstateo] = useState(0);

  const [searchstr, setsearchstr] = useState("");

  const [ele, setele] = useState({add: {title: "", desc: "", dat: "", priority: 0}, view: {title: "", desc: "", dat: "", priority: 0}, replace: {id: -1}});

  useEffect(()=>{
    setvirlist(list)
    localStorage.setItem('tasks', JSON.stringify(list));
  },[list])

  useEffect(()=>{
    setvirlist(list.filter(ele => ele.title.indexOf(searchstr) !== -1 || ele.desc.indexOf(searchstr) !== -1));
  }, [searchstr])

  return (
    <div className="App">
      <div className='covering'></div>
      <div className='App-cover2'>
        <div className='label'>Tasks For Today...</div>
        
        <div className='App-searchbar'>
          <input type='text' placeholder='Search...' value={searchstr} onChange={e => setsearchstr(e.target.value)} />
          <button className='Searchbtn'><AiOutlineSearch /></button>
        </div>

        <div className='App-Tasklist'>
          {virlist.map((val, index) =>{
            return (
              <div className="App-tasktab" key={index} style={{
                "--val": index%2===1?index-1:index,
                "--ind": index,
                "--left": index%2===0?"0px":"",
                "--right": index%2===1?"10px":"",
              }}>
                <div className='App-priority' style={{backgroundColor: val.priority==="High"?"var(--danger)":val.priority==="Medium"?"var(--warning)":"var(--success)"}}></div>
                <div className='App-title'>{val.title}</div>
                <div className='App-date' title={val.desc} onClick={()=>{
                  setele({...ele, view: val, replace: {id: index}})
                  setstateo(2)
                }}>due date: {val.dat}</div>
                <div className='App-btns'>
                  <button className='editbtn' title='Edit Task' onClick={()=>{
                    setele({...ele, replace: {id: index}, add: val})
                    setstateo(1)
                  }}><AiFillEdit /></button>
                  <button className='deletebtn' title='Delete Task' onClick={()=>{
                    setele({...ele,delete: {id: index}})
                    setstateo(3)
                  }}><AiOutlineDelete /></button>
                </div>
              </div>
            )
          })}
          
        </div>

      <div className='App-Add' title='Add Task' onClick={()=>{
        setele({add: {title: "", desc: "", dat: "", priority: 0}, view: {title: "", desc: "", dat: "", priority: 0}, replace: {id: -1}})
        setstateo(1)
      }}><AiOutlinePlus /></div>
      </div>
      <div className='App-hidden' style={{left: stateo===0?"100%":""}}>
        <div className='Edit' style={{left: stateo===1?"":"100%"}}>
          <div className='Edit-cont title'>
            <label for="titleinp">Title:</label>
            <input type="text" id='titleinp' value={ele.add.title} onChange={(e)=>{setele({...ele, add: {...ele.add, title: e.target.value}})}} />
          </div>
          <div className='Edit-cont desc'>
            <label for="descinp">Description:</label>
            <textarea id='descinp'  value={ele.add.desc} onChange={(e)=>{setele({...ele, add: {...ele.add, desc: e.target.value}})}}/>
            </div>
          <div className='Edit-cont due'>
            <label for="dateinp">Due Date:</label>
            <input type="date" id='dateinp'  value={ele.add.dat} onChange={(e)=>{setele({...ele, add: {...ele.add, dat: e.target.value}})}} />
            </div>
          <div className='Edit-cont priority'>
            <label for="titleinp">Priority:</label>
            <div className='radgrp'>
              <label style={{fontWeight: ele.add.priority==="High"?"700":"400"}} onClick={()=>setele({...ele, add: {...ele.add, priority: "High"}})}><input type='radio' name="Priority" value="High" checked={ele.add.priority==="High"}></input>High</label>
              <label style={{fontWeight: ele.add.priority==="Medium"?"700":"400"}} onClick={()=>setele({...ele, add: {...ele.add, priority: "Medium"}})}><input type='radio' name="Priority" value="Medium" checked={ele.add.priority==="Medium"}></input>Medium</label>
              <label style={{fontWeight: ele.add.priority==="Low"?"700":"400"}} onClick={()=>setele({...ele, add: {...ele.add, priority: "Low"}})}><input type='radio' name="Priority" value="Low" checked={ele.add.priority==="Low"}></input>Low</label>
            </div>
          </div>

          <button className='Save' onClick={()=>{
            if(ele.replace.id === -1) setlist([...list, ele.add]);
            else{
              list[ele.replace.id] = ele.add;
              setlist(list);
            }
            setvirlist(list)
            setele({add: {title: "", desc: "", dat: "", priority: 0}, view: {title: "", desc: "", dat: "", priority: 0}, replace: {id: -1}})
            setstateo(0)
          }}>Save</button>
          <button className='Cancel' onClick={()=>{
            setstateo(0)
          }}>Cancel</button>

        </div>
        <div className='View' style={{left: stateo===2?"":"100%"}}>
          <div className='View-cont title'>{ele.view.title}</div>
          <div className='View-cont desc'>{ele.view.desc}</div>
          <div className='View-cont due'>Due Date : {ele.view.dat}</div>
          <div className='View-cont priority'>Priority: {ele.view.priority}</div>

          <button className='Edit' onClick={()=>{
            setele({add: ele.view, view: {title: "", desc: "", dat: "", priority: 0}, replace: ele.replace})
            setstateo(1)
          }}>Edit</button>
          <button className='Back' onClick={()=>{
            setele({add: {title: "", desc: "", dat: "", priority: 0}, view: {title: "", desc: "", dat: "", priority: 0}, replace: {id: -1}})
            setstateo(0)
          }}>Back</button>
      </div>
        <div className='PopUp' style={{display: stateo===3?"block":"none"}}>
          <div className='labell'>
          Are you sure you want to delete this task?<br/>
          Name : name of task
          </div>
          <button className='yes' onClick={()=>{
            list.splice(ele.delete.id, 1)
            setlist(list);
            setvirlist(list);
            setele({add: {title: "", desc: "", dat: "", priority: 0}, view: {title: "", desc: "", dat: "", priority: 0}, replace: {id: -1}});
            setstateo(0);
          }}>Yes</button>
          <button className='no' onClick={()=>{
            setstateo(0)
          }}>No</button>
        </div>
      </div>
    </div>
  );
}

export default App;
