import { Component } from "react";
import styled, { css } from "styled-components";
import "../App.css";

interface IProps {
  employees: Array<IEmployee>;
  onInit: Function;
  onGetOne: Function;
  onEdit: Function;
  onDelete: Function;
}
interface IEmployee {
  _id?: string;
  name?: string;
  birthDate: Date;
  gender?: string;
  salary?: number;
}
interface IState {
  employees: IEmployee[];
}
interface IPropEmployee {
  employee: IEmployee;
  onGetOne: Function;
  onEdit: Function;
  onDelete: Function;
}

const Link = styled.a`
  color: #91c483;
  text-decoration: none;
  ${css`
    &:hover {
      color: #63cb47 !important;
      text-decoration: underline;
    }
  `}
`;

const Button = styled.button`
  color: #ff6464;
  text-decoration: none;
  ${css`
    &:hover {
      color: #fd3a3a !important;
      text-decoration: underline;
    }
  `}
`;

const Tr = styled.tr`
  ${css`
    &:hover {
      background: #f3f1f5;
    }
  `}
`;

const Employee = ({employee, onGetOne, onEdit, onDelete}: IPropEmployee) => (
  <Tr>
    <td>{employee.name}</td>
    <td>{employee.birthDate.toString().substring(0, 10)}</td>
    <td>{employee.gender === "f" ? "Female" : "Male"}</td>
    <td>{employee.salary}</td>
    <td>
      <Link href={"/edit/" + employee._id}>edit</Link> |
      <Button onClick={() => onDelete({_id: employee._id})}>delete</Button>
    </td>
  </Tr>
);

export default class EmployeesList extends Component<IProps, IState> {

  employeeList() {
    return this.props.employees.map((currentEmployee) => {
      return (
        <Employee
          employee={currentEmployee}
          onGetOne={this.props.onGetOne}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete}
          key={currentEmployee._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Employees List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>{this.employeeList()}</tbody>
        </table>
      </div>
    );
  }
}
