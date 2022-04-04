const router = require('express').Router();
const validator = require('validator');
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

	if (!validator.isAlpha(name, 'en-US', {ignore: ' '}) || !validator.isLength(name, {min: 1, max: 50}))
		return res.status(422).json({code: 422, error: 'Invalid name'});
	if (!validator.isDate(birthDate, {format: 'YYYY-MM-DD'}) || !validator.isAfter(birthDate, '1951-01-01') || !validator.isBefore(birthDate, today))
		return res.status(422).json({code: 422, error: 'Invalid date'});
	if (!validator.isIn(gender, ['m', 'f']))
		return res.status(422).json({code: 422, error: 'Invalid gender'});
	if (!validator.isNumeric(salary.toString(), {min: 0}))
		return res.status(422).json({code: 422, error: 'Invalid salary'});
	
	birthDate = Date.parse(birthDate);
	salary = Number(salary);
    const newEmployee = new Employee({
        name, birthDate, gender, salary
    });

    newEmployee.save()
        .then((e) => res.json(e))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').put((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.birthDate = Date.parse(req.body.birthDate);
            employee.gender = req.body.gender;
            employee.salary = Number(req.body.salary);

            employee.save()
                .then((e) => res.json(e))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;