import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { getEmployee, updateEmployee } from "../store/actions";
import { ICurrentEmployeeState, IState } from "../types/types";
import { getCurrentEmployeeState } from "../store/selectors";
import Spinner from "./blocks/spinner";

const FormGroup = styled.div`
	margin-bottom: 1em;
`;
const Button = styled.button`
	background: #ffc600;
	border: #ffc600 1px solid;
	color: white;
	transition: 0.5s cubic-bezier(0, 0, 0.2, 1);
	${css`
		&:hover {
			background: none;
			border: #ffc600 1px solid;
			box-shadow: 0px 5px 0px 0px #ffc600;
			color: #ffc600;
		}
	`}
`;

interface IProps {
	currentEmployee: ICurrentEmployeeState;
	getEmployee: Function;
}

const EditEmployee = ({ currentEmployee, getEmployee }: IProps) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [salary, setSalary] = useState(currentEmployee.data.salary);
	const isLoading = currentEmployee.loading;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateEmployee({ ...currentEmployee.data, salary }));
		navigate("/");
	};
	const onChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSalary(Number(e.target.value));
	};

	useEffect(() => {
		getEmployee({ _id: id });
	}, []);

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<div>
			<h3>Edit Employee Info</h3>
			<form onSubmit={handleSubmit}>
				<FormGroup className="form-group">
					<label>Name: </label>
					<input
						type="text"
						required
						className="form-control"
						value={currentEmployee.data.name}
						disabled
					/>
				</FormGroup>
				<FormGroup className="form-group">
					<label>Date of Birth: </label>
					<div>
						<input
							type="text"
							className="form-control"
							value={currentEmployee.data.birthDate
								?.toString()
								.substring(0, 10)}
							disabled
						/>
					</div>
				</FormGroup>
				<FormGroup className="form-group">
					<label>Gender: </label>
					<input
						type="text"
						className="form-control"
						value={currentEmployee.data.gender === "f" ? "Female" : "Male"}
						disabled
					/>
				</FormGroup>
				<FormGroup className="form-group">
					<label>Salary: </label>
					<input
						type="text"
						className="form-control"
						defaultValue={currentEmployee.data.salary}
						onChange={onChangeSalary}
					/>
				</FormGroup>

				<FormGroup className="form-group">
					<Button className="btn btn-primary">Submit</Button>
				</FormGroup>
			</form>
		</div>
	);
};

const mapStateToProps = (state: IState) => {
	const currentEmployee = getCurrentEmployeeState(state);
	return { currentEmployee };
};

export default connect(mapStateToProps, { getEmployee })(EditEmployee);
