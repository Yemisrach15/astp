const router = require('express').Router();
let Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').post((req, res) => {
    const name = req.body.name;
    const birthDate = Date.parse(req.body.birthDate);
    const gender = req.body.gender;
    const salary = Number(req.body.salary);

    const newEmployee = new Employee({
        name, birthDate, gender, salary
    });

    newEmployee.save()
        .then(() => res.json('Employee added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').post((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.birthDate = Date.parse(req.body.birthDate);
            employee.gender = req.body.gender;
            employee.salary = Number(req.body.salary);

            employee.save()
                .then(() => res.json('Employee updated'))
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