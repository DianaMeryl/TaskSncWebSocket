import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Layout from './layout/Layout';
import React, { Suspense } from 'react';
import Update from './components/Update';
import Task from './components/Task';
import TaskTable from './components/TaskTable';
import NoPage from './components/NoPage';
import RegistrationForm from './components/RegistrationForm';

const LazyRegistration = React.lazy(() => import('./components/LoginForm'));

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route  path="/home" element={ <Suspense fallback={<div>Loading...</div>}><LazyRegistration /></Suspense>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/task" element={<Task />} />
            <Route path="/tasktable" element={<TaskTable />} />
            <Route path='/edit/:id' element={<Update />} />
            <Route path="*" element={<NoPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App