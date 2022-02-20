import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Navbar from './components/navbar.component';
import EmployeesList from './components/employees-list.component';
import EditEmployee from './components/edit-employee.component';
import CreateEmployee from './components/create-employee.component';

const Div = styled.div`
  padding: 0 1em;
`

function App({state, onInit, onCreate, onEdit, onDelete}) {
  // onInit();
  console.log(state);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <br />
        <Div>
          <Routes>
            <Route path='/' exact element={<EmployeesList state={state} onInit={onInit} />} />
            <Route path='/register' element={<CreateEmployee />} />
            <Route path='/edit/:id' element={<EditEmployee />} />
          </Routes>
        </Div>
      </div>
    </BrowserRouter>
  );
}

export default App;
