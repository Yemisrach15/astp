import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component';
import EmployeesList from './components/employees-list.component';
import EditEmployee from './components/edit-employee.component';
import CreateEmployee from './components/create-employee.component';


function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <br />
        <Routes>
          <Route path='/' exact element={<EmployeesList />} />
          <Route path='/register' element={<CreateEmployee />} />
          <Route path='/edit/:id' element={<EditEmployee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
