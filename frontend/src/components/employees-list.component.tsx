import { Component } from "react";
import styled, { css } from "styled-components";
import "../stylesheets/App.css";
import { IEmployee } from '../types/types';

interface IProps {
  employees: Array<IEmployee>;
  onInit: Function;
  onGetOne: Function;
  onDelete: Function;
}

interface IState {
  employees: IEmployee[];
}
interface IPropEmployee {
  employee: IEmployee;
  onGetOne: Function;
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

const Employee = ({employee, onGetOne, onDelete}: IPropEmployee) => (
  <Tr>
    <td>{employee.name}</td>
    <td>{employee.birthDate.toString().substring(0, 10)}</td>
    <td>{employee.gender === "f" ? "Female" : "Male"}</td>
    <td>{employee.salary}</td>
    <td>
      <Link href={"/edit/" + employee._id} onClick={() => onGetOne({_id: employee._id})}>edit</Link> |
      <Button onClick={() => onDelete({_id: employee._id})}>delete</Button>
    </td>
  </Tr>
);

export default class EmployeesList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.props.onInit();
  }

  employeeList() {
    return this.props.employees.map((e) => {
      return (
        <Employee
          employee={e}
          onGetOne={this.props.onGetOne}
          onDelete={this.props.onDelete}
          key={e._id}
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
