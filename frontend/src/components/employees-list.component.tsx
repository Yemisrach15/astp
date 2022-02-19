import axios from "axios";
import { Component } from "react";
import styled, { css } from "styled-components";
import "../App.css";

interface IProps {}
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
  deleteEmployee: Function;
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

const Employee = (props: IPropEmployee) => (
  <Tr>
    <td>{props.employee.name}</td>
    <td>{props.employee.birthDate.toString().substring(0, 10)}</td>
    <td>{props.employee.gender === "f" ? "Female" : "Male"}</td>
    <td>{props.employee.salary}</td>
    <td>
      <Link href={"/edit/" + props.employee._id}>edit</Link> |
      <Button
        onClick={() => {
          props.deleteEmployee(props.employee._id);
        }}
      >
        delete
      </Button>
    </td>
  </Tr>
);

export default class EmployeesList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/api/v1/employees")
      .then((res) => {
        this.setState({
          employees: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteEmployee(id: String) {
    axios.delete("http://localhost:9000/api/v1/employees/" + id).then((res) => {
      console.log(res.data);
    });

    this.setState({
      employees: this.state.employees.filter((e) => e._id !== id),
    });
  }

  employeeList() {
    return this.state.employees.map((currentEmployee) => {
      return (
        <Employee
          employee={currentEmployee}
          deleteEmployee={this.deleteEmployee}
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
