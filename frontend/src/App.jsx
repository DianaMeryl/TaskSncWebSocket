
import './App.css'
// import Task from './components/Task'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Layout from './layout/Layout';
import React, { Suspense } from 'react';
// import { useSelector } from 'react-redux';
import Update from './components/Update';
import Task from './components/Task';
import TaskTable from './components/TaskTable';

// import Update from './components/Update';

const LazyRegistration = React.lazy(() => import('./components/RegistrationForm'));

function App() {

  // const currentUserId = useSelector(state => state.activeUserId) || {};

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route  path="/home" element={ <Suspense fallback={<div>Loading...</div>}><LazyRegistration /></Suspense>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/task" element={<Task />} />
            <Route path="/tasktable" element={<TaskTable />} />
            <Route path='/edit/:id' element={<Update />} />
            {/* <Route path="/task" element={<Task userId={currentUserId}/>} /> */}
            {/* <Route path='/edit/:id' element={<Update />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App