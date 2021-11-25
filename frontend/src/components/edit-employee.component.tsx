import axios from "axios";
import { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from "react-router";

interface IProps {
    id: string;
}

interface IState {
  name?: string;
  birthDate?: Date;
  gender?: string;
  salary?: number; 
}

export default function EditEmployee() {
    const { id } = useParams();

    return (
        <EditEmployeeWithProps id={id!} />
    );
}

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
        // console.log(this);
        axios.get('http://localhost:9000/api/v1/employees/' + this.props.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    birthDate: new Date(response.data.birthDate),
                    gender: response.data.gender,
                    salary: response.data.salary
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeSalary(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            salary: Number(e.target.value)
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const employee = {
            name: this.state.name,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            salary: this.state.salary,
        }

        console.log(employee);

        axios.post('http://localhost:9000/api/v1/employees/' + this.props.id, employee)
            .then((res) => console.log(res.data));
        // FIXME: if not working, window.location = '/'
        window.location.href = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Employee Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <div>
                            <DatePicker
                                selected={this.state.birthDate}
                                onChange={()=>null}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.gender === 'f'? "Female" : "Male"}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.salary}
                            onChange={this.onChangeSalary}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}