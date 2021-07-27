
import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { AlertContext } from '../alertColor/ContextProvider.js';

import { v4 as uuid } from 'uuid';

import './todo.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const ToDo = () => {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id) {
        item.complete = ! item.complete;
        AlertColor.setColor('success');
      }
      return item;
    });

    setList(items);

  }


  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  const AlertColor = useContext(AlertContext);

  return (
    <>
      <header id="ListManager">
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

        <h2 id="TodoHeading" style={{marginLeft:"5%"}}>Add To Do Item</h2>
    <div className="sideBySide">

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

        <Button style={{marginLeft: "10px"}} variant="primary" type="submit">Add Item</Button>
      </Form>
 
      {list.map(item => (
        <Alert variant={AlertColor.color} className="addedItem" key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
          <Button style={{marginLeft:"10px"}} onClick={() => deleteItem(item.id)} variant="danger">Delete</Button>
        </Alert>
      ))}
      </div>

    </>
  );
};

export default ToDo;