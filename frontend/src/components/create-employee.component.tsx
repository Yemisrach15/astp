import { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { css } from "styled-components";
import { IEmployee } from "../types/types";

interface IProps {
    onCreate: Function
}

interface IState extends Omit<IEmployee, 'birthDate'> {
    birthDate?: Date;
}

const FormGroup = styled.div`
    margin-bottom: 1em;
`
const Button = styled.button`
    background: #FFC600;
    border: #FFC600 1px solid;
    color: white;
    transition: .5s cubic-bezier(0, 0, 0.2, 1);
    ${css`
        &:hover {
            background: none;
            border:  #FFC600 1px solid;
            box-shadow: 0px 5px 0px 0px #ffc600;
            color: #FFC600;
        }
    `}
`

export default class CreateEmployee extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            birthDate: new Date(),
            gender: '',
            salary: 0
        }
    }

    onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeBirthDate(date: Date) {
        this.setState({
            birthDate: date
        });
    }

    onChangeGender(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeSalary(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            salary: Number(e.target.value)
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.onCreate(this.state);
        window.location.href = '/'; // FIXME: if not working, window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Register New Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <FormGroup className="form-group">
                        <label>Full Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Birth Date: </label>
                        <div>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                selected={this.state.birthDate}
                                onChange={this.onChangeBirthDate}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Gender: </label>
                        <select required className="form-control" onChange={this.onChangeGender} defaultValue='n'>
                            <option value='n' disabled>Select</option>
                            <option key='f' value='f'>Female</option>
                            <option key='m' value='m'>Male</option>
                        </select>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Salary: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.salary}
                            onChange={this.onChangeSalary}
                        />
                    </FormGroup>
            
                    <FormGroup className="form-group">
                        <Button className="btn btn-primary">Submit</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}