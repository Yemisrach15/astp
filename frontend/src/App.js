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

function App({state, onInit, onGetOne, onCreate, onEdit, onDelete}) {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <br />
        <Div>
          <Routes>
            <Route path='/' exact element={<EmployeesList employees={state.employees} onInit={onInit} onGetOne={onGetOne} onDelete={onDelete} />} />
            <Route path='/register' element={<CreateEmployee onCreate={onCreate} />} />
            <Route path='/edit/:id' element={<EditEmployee onEdit={onEdit} currentEmployee={state.currentEmployee} />} />
          </Routes>
        </Div>
      </div>
    </BrowserRouter>
  );
}

export default App;
