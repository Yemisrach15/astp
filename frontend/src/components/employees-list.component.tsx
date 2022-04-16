import { Component } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "../store/actions";
import styled, { css } from "styled-components";
import "../stylesheets/App.css";
import { IEmployee, IState as IStateProps } from "../types/types";
import { getEmployeesState } from "../store/selectors";

interface IProps {
	employees: Array<IEmployee>;
	getEmployees: Function;
	// getEmployee: Function;
	deleteEmployee: Function;
}

interface IState {
	employees: IEmployee[];
}
interface IPropEmployee {
	employee: IEmployee;
	onDelete: Function;
}

const Link = styled(LinkRouter)`
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

const Employee = ({ employee, onDelete }: IPropEmployee) => (
	<Tr>
		<td>{employee.name}</td>
		<td>{employee.birthDate.toString().substring(0, 10)}</td>
		<td>{employee.gender === "f" ? "Female" : "Male"}</td>
		<td>{employee.salary}</td>
		<td>
			<Link to={"/edit/" + employee._id}>edit</Link> |
			<Button onClick={() => onDelete({ _id: employee._id })}>delete</Button>
		</td>
	</Tr>
);

class EmployeesList extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.props.getEmployees();
	}

	employeeList() {
		return this.props.employees.map((e) => {
			return (
				<Employee
					employee={e}
					onDelete={this.props.deleteEmployee}
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

const mapStateToProps = (state: IStateProps) => {
	const employees = getEmployeesState(state);
	return { employees };
};

export default connect(mapStateToProps, {
	getEmployees,
	deleteEmployee
})(EmployeesList);
