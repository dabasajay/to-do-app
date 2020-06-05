import React from 'react';
import './dashboard.css';
import { HLine } from '../../components/hline/hline';

import { Writer } from '../writer/writer';
import { Editor } from '../editor/editor';
import { Viewer } from '../viewer/viewer';

const Dashboard = () : JSX.Element => {
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
        Active To-Dos
      </div>
      <HLine/>
      {/* Editor - View, Edit, Delete, Mark as complete a todo */}
      <Editor/>
      {/* Heading */}
      <div>
        Completed To-Dos
      </div>
      <HLine/>
      {/* Viewer - View, Delete, Mark as incomplete a todo */}
      <Viewer/>
    </div>
  );
}

export default Dashboard;