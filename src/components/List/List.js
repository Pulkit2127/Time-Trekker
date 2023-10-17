import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import classes from "./List.module.css";
import { Navigate, useNavigate } from "react-router-dom";

function List() {
  const loggedIn=JSON.parse(localStorage.getItem("loggedIn"));
  if(!loggedIn)
  {
     Navigate("/");
  }
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Month:', selectedMonth);
    console.log('Year:', selectedYear);
  };


  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const[user,setUser]=useState("");
  
  useEffect(() => {
    let user=localStorage.getItem('current_user');
    console.log(user);
    let savedTodo = JSON.parse(localStorage.getItem(user+"?list"));
    setUser(user);
    let savedCompletedTodo = JSON.parse(localStorage.getItem(user+"?comList"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if(savedCompletedTodo)
    {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);
  const onCompleteHandler=(index)=>{
    let updatedTodoArr = [...allTodos];
    let complete=[...completedTodos];
    complete.push(allTodos[index]);
    localStorage.setItem(user+"?comList",JSON.stringify(complete));
    setCompletedTodos(complete);
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);
    localStorage.setItem(user+"?list", JSON.stringify(updatedTodoArr));
  }
  const onDeleteHandler=(index)=>{
    let updatedTodoArr = [...completedTodos];
    updatedTodoArr.splice(index, 1);
    setCompletedTodos(updatedTodoArr);
    localStorage.setItem(user+"?comList", JSON.stringify(updatedTodoArr));
  }
  let listItems=allTodos.map((item, index) => {
    return (
      <div className={classes.item} key={index}>
        <div className={classes.title}>Title: {item.title}</div>
        <div className={classes.dis}>discription: {item.description}</div>
        <div>
          <button className={classes.mark} onClick={()=>{onCompleteHandler(index)}}>Mark as done</button>
        </div>
      </div>
    );
  })
  if (isCompleteScreen==true){
    listItems=completedTodos.map((item, index) => {
      return (
        <div className={classes.item} key={index}>
          <div className={classes.title}>Title: {item.title}</div>
          <div className={classes.dis}> discription:{item.description}</div>
          <div>
          <button onClick={()=>{onDeleteHandler(index)}}>Delete</button>
          </div>
        </div>
      );
  })
}
  const textHandler=(e)=>{
    setNewDescription(e.target.value);
  }
  
 const titleHandler=(e)=>{
  setNewTitle(e.target.value);
 }
 const handleAddTodo = () => {
  const titleExist=allTodos.some(todo=>todo.title===newTitle);
  if(newTitle==''|| newDescription==''){
    alert("fill the title and discription filed");
  }
  else if(titleExist){
    alert("title alredy exist");
  }
  else{
  let newTodoItem = {
    title: newTitle,
    description: newDescription,
  };
  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);
  localStorage.setItem(user+"?list", JSON.stringify(updatedTodoArr));
}
  setNewDescription('');
  setNewTitle('');
};
  return (
    <>
    <div className={classes.container}>
        <div className={classes.column1}>
           <div className={classes.addArea}>
           <button className={classes.add} onClick={handleAddTodo}> + Add task</button>
            <div>Title:</div>
           <div><input type="text" onChange={titleHandler} value={newTitle}></input></div>
           <div>Description:</div>
            <div><textarea type="text" onChange={textHandler} value={newDescription}></textarea></div>
           </div>
            <div className={classes.options} onClick={() => setIsCompleteScreen(true)}>completed</div>
            <div className={classes.options}> Today</div>
            
             <div className={classes.options} onClick={() => setIsCompleteScreen(false)}> Todo</div>
            <div className={classes.filter}>
     
    </div>
        </div>
        <div className={classes.column2}>
         {listItems}
        </div>
    </div> 
    </>
  )
}
export default List;


