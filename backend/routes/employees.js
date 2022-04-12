const router = require('express').Router();
const validator = require('validator');
const checkError = require('../utils/validator');
let Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').post((req, res) => {
    let name = req.body.name;
    let birthDate = req.body.birthDate;
    let gender = req.body.gender;
    let salary = req.body.salary;
	const today = (new Date()).toISOString().substring(0, 10);
	let errors = [];

	if (checkError(name, 'string', 'name', 1, 50, / /))
		errors.push(...checkError(name, 'string', 'name', 1, 50, / /));
	if (checkError(birthDate, 'date', 'birthDate', '1951-01-01', today))
		errors.push(...checkError(birthDate, 'date', 'birthDate', '1951-01-01', today));
	if (checkError(gender, 'string', 'gender', null, null, null, ['m', 'f']))
		errors.push(...checkError(gender, 'string', 'gender', null, null, null, ['m', 'f']));
	if (checkError(salary, 'number', 'salary', 0))
		errors.push(...checkError(salary, 'number', 'salary', 0));

	if (Object.keys(errors).length)
		return res.status(422).json({ code: 422, errors});

	
	birthDate = Date.parse(birthDate);
	salary = Number(salary);
    const newEmployee = new Employee({
        name, birthDate, gender, salary
    });

    newEmployee.save()
        .then((e) => res.json(e))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/analytics').get((req, res) => {
	Employee.aggregate([
		{ $group: { _id: '$gender', averageSalary: {$avg: '$salary', } } }
	])
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').put((req, res) => {
	if (!validator.isMongoId(req.params.id))
		return res.status(422).json({code: 422, error: "Invalid id"});

    Employee.findById(req.params.id)
        .then(employee => {
            let name = req.body.name;
			let birthDate = req.body.birthDate;
			let gender = req.body.gender;
			let salary = req.body.salary;
			const today = (new Date()).toISOString().substring(0, 10);
			let errors = [];

			if (checkError(name, 'string', 'name', 1, 50, / /))
				errors.push(...checkError(name, 'string', 'name', 1, 50, / /));
			if (checkError(birthDate, 'date', 'birthDate', '1951-01-01', today))
				errors.push(...checkError(birthDate, 'date', 'birthDate', '1951-01-01', today));
			if (checkError(gender, 'string', 'gender', null, null, null, ['m', 'f']))
				errors.push(...checkError(gender, 'string', 'gender', null, null, null, ['m', 'f']));
			if (checkError(salary, 'number', 'salary', 0))
				errors.push(...checkError(salary, 'number', 'salary', 0));

			if (Object.keys(errors).length)
				return res.status(422).json({ code: 422, errors});

			employee.name = name;
			employee.birthDate = Date.parse(birthDate);
			employee.gender = gender;
			employee.salary = Number(salary);
            employee.save()
                .then((e) => res.json(e))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/:id').delete((req, res) => {
	if (!validator.isMongoId(req.params.id))
		return res.status(422).json({code: 422, error: 'Invalid id'});

    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;