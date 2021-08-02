/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { AlertContext } from '../alertColor/ContextProvider.js';

import { v4 as uuid } from 'uuid';

import './todo.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';




import Auth from '../auth/auth.js';
import axios from 'axios';




const ToDo = () => {
  
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [completedTask, setCompleteTask] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  
  //---------------------PAGINATION------------------------//
  //Alerts is from ContextProvider
  const Alerts = useContext(AlertContext);
  // Starting index for the pagination
  const [startIndex, setStartIndex] = useState(0);
  // Ending index for the pagination or limit 
  const [endIndex, setEndIndex] = useState(Alerts.item);
//--------------------------PAGINATION------------------------//

//--------------------------ADDING AN ITEM---------------------//
  function addItem(item) {
    if(list.length >= 15){
      alert('You have exceeded task list limit, please complete tasks or delete before adding');
    }else{
      console.log(item);
      item.id = uuid();
      item.complete = false;
      axios.post('https://todohubserver.herokuapp.com/todos', item).then(function(response){
        console.log('from axios post todos', response);
      }).catch(function(err){
        console.error(err)
      })
      setList([...list, item]);
    }
    if(list.length >= 5){
      Alerts.setPageOne('visible');
      Alerts.setPageTwo('visible');
    }
    if(list.length >= 10){
      Alerts.setPageThree('visible');
    }
  }
//--------------------------ADDING AN ITEM---------------------//

//----------------------------DELETING AN ITEM------------------------//
  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }
//----------------------------DELETING AN ITEM------------------------//

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    if(list.length <= 10){
      Alerts.setPageThree('hidden')
    }
    if(list.length <= 5){
      Alerts.setPageTwo('hidden')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomplete, list]);

  useEffect(() => {
    let completed = list.filter(item => item.complete).length;
    setCompleteTask(completed);
    document.title = `Completed Tasks: ${completedTask}`;
  }, [completedTask, list]);





  //-------------------PAGINATION-------------------------//
  // function pagination will slice the list array to limit the displayed list to 5
  function pagination() {
    let addedToList = list.slice(startIndex, endIndex);
    return addedToList; 
  }
// function next will be the next 5 in the pagination
function next() {
    setStartIndex(startIndex + Alerts.item);
    setEndIndex(endIndex + Alerts.item)
}
function previous() {
    setStartIndex(startIndex - Alerts.item);
    setEndIndex(endIndex - Alerts.item);
}
//statically set pageOne 
function pageOne(){ 
  setStartIndex(0);
  setEndIndex(5);
}
//statically set pageTwo
function pageTwo(){
  setStartIndex(5);
  setEndIndex(10);
}
//statically set pageThree
function pageThree(){
  setStartIndex(10);
  setEndIndex(15);
}


//--------------------------PAGINATION------------------//

let completed = list.filter(item => item.complete); 

  return (
    <>
        <header id="ListManager">
          <h1>To Do List: {incomplete} items pending</h1>
          <h1>Completed: {completedTask}</h1>
        </header>

        <div className="completedClass">
          <h1 id="TodoHeading">Completed:</h1>
          {completed.map(item => 
            <Alert variant="success" className="completed">
              <p>To Do Item: {item.text}</p>
              <p>Assigned To: {item.assignee}</p> 
              <p>Item Difficulty: {item.difficulty}</p>
              <Button style={{marginLeft:"10px"}} onClick={() => deleteItem(item.id)} variant="danger">Delete</Button>
            </Alert>
            )}
        </div>

        <h2 id="TodoHeading" style={{marginLeft:"5%"}}>Add To Do Item</h2>

       
          <Auth capability='read'>
            <div className="todoFormDiv">
              <Form className="todoForm" onSubmit={handleSubmit}>
                <Form.Group className="label">
                  <Form.Label>
                    <Form.Text>To Do Item </Form.Text>
                    <Form.Control onChange={handleChange} name="text" type="text" placeholder="Item Details" />
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">
                    <Form.Text>Assigned To </Form.Text>
                    <Form.Control onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                  </Form.Label>
                </Form.Group>

                <Form.Group className="label">
                <Form.Label>
                  <Form.Text>Difficulty </Form.Text>
                  <Form.Control onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
                </Form.Label>
                </Form.Group>
                <Button style={{marginLeft: "10px", marginRight:'0'}} variant="primary" type="submit">Add Item</Button>
              </Form>
            </div>

        </Auth>
       
 

      <div className="alertContainer" >
        <h1 id="TodoHeading" style={{marginLeft:"5%"}} >Assigned Tasks:</h1>
        {pagination().map(item => (
          <Alert variant="danger" className="addedItem" key={item.id}>
            <p>ToDo: {item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>

            <Auth capability='delete'>
              <Button style={{marginLeft:"10px"}} onClick={() => deleteItem(item.id)} variant="danger">Delete</Button>
            </Auth>
          </Alert>
        ))}
          <nav  className="paginationTemptation" aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" style={{visibility: Alerts.pageTwo, marginRight: "100px"}} onClick={previous}>Previous</a></li>
              <li className="page-item"><a className="page-link" style={{visibility: Alerts.pageTwo}} onClick={pageOne}>1</a></li>
              <li className="page-item"><a className="page-link" style={{visibility: Alerts.pageTwo}} onClick={pageTwo}>2</a></li>
              <li className="page-item"><a className="page-link" style={{visibility: Alerts.pageThree}} onClick={pageThree}>3</a></li>
              <li className="page-item"><a className="page-link" style={{visibility: Alerts.pageTwo, marginLeft: "100px"}} onClick={next}>Next</a></li>
            </ul>
          </nav>

        </div>
    </>
  );
};

export default ToDo;