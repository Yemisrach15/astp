import axios from "axios";
import { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from "react-router";
import styled, { css } from 'styled-components';

interface EditEmployeeProps {
    onEdit: Function
    onGetOne: Function;
    employees: Array<IEmployee>;
    currentEmployee: IEmployee;
}

interface IProps extends EditEmployeeProps {
    id: string;
}

interface IState {
  name?: string;
  birthDate: Date;
  gender?: string;
  salary?: number; 
}

interface IEmployee extends IState {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number
}

export default function EditEmployee({onEdit, onGetOne, employees, currentEmployee}: EditEmployeeProps) {
    const { id } = useParams();

    return (
        <EditEmployeeWithProps id={id!} onEdit={onEdit} onGetOne={onGetOne} employees={employees} currentEmployee={currentEmployee} />
    );
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
class EditEmployeeWithProps extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            birthDate: new Date(),
            gender: '',
            salary: 0
        }
    }

    componentDidMount() {
        this.props.onGetOne({_id: this.props.id});
        // let e = this.props.currentEmployee;
        let e = this.props.employees.find((e) => e._id === this.props.id);
        this.setState({
            name: e?.name,
            birthDate: e? e.birthDate: new Date(),
            gender: e?.gender,
            salary: e?.salary
        });

        // axios.get('http://localhost:9000/api/v1/employees/' + this.props.id)
        //     .then(response => {
        //         this.setState({
        //             name: response.data.name,
        //             birthDate: new Date(response.data.birthDate),
        //             gender: response.data.gender,
        //             salary: response.data.salary
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

    onChangeSalary(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            salary: Number(e.target.value)
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.onEdit(this.state);
        window.location.href = '/'; // FIXME: if not working, window.location = '/'
    }
        
    render() {        
        return (
            <div>
                <h3>Edit Employee Info</h3>
                <form onSubmit={this.onSubmit}>
                    <FormGroup className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            disabled
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Date of Birth: </label>
                        <div>
                            <input type="text"
                                className="form-control"
                                value={''}
                                onChange={()=>null}
                                disabled
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Gender: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.gender === 'f'? "Female" : "Male"}
                            disabled
                        />
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