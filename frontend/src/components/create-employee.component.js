import axios from "axios";
import { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateEmployee extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            birthDate: '',
            gender: '',
            salary: 0
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeBirthDate(date) {
        this.setState({
            birthDate: date
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeSalary(e) {
        this.setState({
            salary: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const employee = {
            name: this.state.name,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            salary: this.state.salary,
        }

        console.log(employee);

        axios.post('http://localhost:9000/api/v1/employees', employee)
            .then((res) => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Register New Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Full Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Birth Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.birthDate}
                                onChange={this.onChangeBirthDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <select required className="form-control" onChange={this.onChangeGender}>
                            <option value='' disabled selected>Select</option>
                            <option key='f' value='f'>Female</option>
                            <option key='m' value='m'>Male</option>
                        </select>
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