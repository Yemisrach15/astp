import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Navbar, EmployeesList, CreateEmployee, EditEmployee } from './components/index';
import { AppProps, IEmployee } from './types/types';

const Div = styled.div`
  padding: 0 1em;
`

function App({state, onInit, onGetOne, onCreate, onEdit, onDelete}: AppProps) {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <br />
        <Div>
          <Routes>
            <Route path='/' element={<EmployeesList employees={state.employees} onInit={onInit} onGetOne={onGetOne} onDelete={onDelete} />} />
            <Route path='/register' element={<CreateEmployee onCreate={onCreate} />} />
            <Route path='/edit/:id' element={<EditEmployee onEdit={onEdit} currentEmployee={state.currentEmployee as IEmployee} />} />
          </Routes>
        </Div>
      </div>
    </BrowserRouter>
  );
}

export default App;
