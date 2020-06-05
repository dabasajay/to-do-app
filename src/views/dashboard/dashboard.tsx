import React from 'react';
import './dashboard.css';

import { ApplicationContainer } from '../../providers/application';

import { HLine } from '../../components/hline/hline';

import { Writer } from '../writer/writer';
import { Editor } from '../editor/editor';
import { Viewer } from '../viewer/viewer';

const Dashboard = () : JSX.Element => {

  const {
    state: applicationState
  } = ApplicationContainer.useContainer();

  const activeCount = applicationState.todos.filter(
    (item) => item.status === true
  ).length;

  const completedCount = applicationState.todos.filter(
    (item) => item.status === false
  ).length;

  return (
    <div className = 'Dashboard'>
      {/* Heading */}
      <div>
        Add a To-Do
      </div>
      <HLine/>
      {/* Writer - Write and add a todo */}
      <Writer/>
      {/* Heading */}
      <div>
        Active To-Dos <span style = {{color: '#005C42'}}>({activeCount})</span>
      </div>
      <HLine/>
      {/* Editor - View, Edit, Delete, Mark as complete a todo */}
      <Editor/>
      {/* Heading */}
      <div>
        Completed To-Dos <span style = {{color: '#821517'}}>({completedCount})</span>
      </div>
      <HLine/>
      {/* Viewer - View, Delete, Mark as incomplete a todo */}
      <Viewer/>
    </div>
  );
}

export default Dashboard;