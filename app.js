const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Salary',
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection Established Successfully');
    }
    else {
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    }
});

app.get('/', (req, res) => {
    res.send('In Home Page');
});

app.post('/addUser', (req, res) => {
    try {
        console.log(req)
        if (req.body.user_name === undefined || req.body.email_id === undefined || req.body.password === undefined || req.body.usertype === undefined) {
            throw 'Invalid Fields';
        }
        else {
            let data = {
                user_name: req.body.user_name,
                email_id: req.body.email_id,
                password: req.body.password,
                usertype: req.body.usertype,
            }

            let query = 'INSERT INTO User ( user_name , email_id , password , usertype ) VALUES ( "' + data.user_name + '" , "' + data.email_id + '" , "' + data.password + '" , "' + data.usertype + '" )';

            mysqlConnection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else {
                    console.log('Data Added');
                    res.status(201).json({
                        message: 'Data Added'
                    })
                }
            })

        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});

app.post('/checkUser', (req, res) => {
    try {
        if (req.body.email_id === undefined || req.body.password === undefined) {
            throw 'Invalid Fields';
        }
        else {
            let data = {
                email_id: req.body.email_id,
                password: req.body.password,
            }
            console.log(data)
            let query = 'SELECT * FROM User WHERE email_id="' + req.body.email_id + '" AND password="' + req.body.password + '"';

            mysqlConnection.query(query, (err, result) => {
                if (result[0] == null) {
                    console.log(err);
                    res.json({
                        status: 400,
                        success: false
                    })
                }
                else {
                    console.log(result[0]);
                    res.json({
                        status: 200,
                        success: true,
                        result: result[0]
                    })
                }
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});



app.put('/updatePassword', (req, res) => {
    try {
        if (req.body.email_id === undefined || req.body.oldPassword === undefined || req.body.newPassword === undefined) {
            throw 'Invalid Exception';
        }
        else {
            let query = 'UPDATE User SET password="' + req.body.newPassword + '" WHERE password="' + req.body.oldPassword + '" AND email_id="' + req.body.email_id + '"';
            mysqlConnection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else {
                    console.log('Data Updated');
                    res.status(201).json({
                        message: 'Data Updated'
                    })
                }
            })
        }
    }
    catch (e) {
        res.status(400).json({
            message: e
        })
    }
});

app.get('/getAllUsers', (req, res) => {
    let query = 'SELECT * FROM User';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result,
                col_name: Object.keys(result[0])
            })
        }
    })
});

app.delete('/deleteUser', (req, res) => {
    mysqlConnection.query('DELETE FROM User WHERE email_id = "' + req.body.email_id + '"', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Record deleted successfully.');
        else
            console.log(err);
    })
})

app.post('/addDept', (req, res) => {
    try {
        console.log(req.body)
        if (req.body.dept_name === undefined) {
            throw 'Invalid Fields';
        }
        else {
            let data = {
                dept_name: req.body.dept_name,
            }

            let query = 'INSERT INTO Department ( dept_name ) VALUES ( "' + data.dept_name + '" )';

            mysqlConnection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else {
                    console.log('Data Added');
                    res.status(201).json({
                        message: 'Data Added'
                    })
                }
            })

        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});

app.delete('/deleteDept', (req, res) => {
    mysqlConnection.query('DELETE FROM Department WHERE dept_name = "' + req.body.dept_name + '"', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Department deleted successfully.');
        else
            console.log(err);
    })
})

app.get('/getAllDept', (req, res) => {
    let query = 'SELECT * FROM Department';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

app.post('/addEmployee', (req, res) => {
    try {
        console.log(req.body)
        if (req.body.emp_title === undefined || req.body.emp_name === undefined || req.body.emp_dob === undefined || req.body.emp_doj === undefined || req.body.emp_address === undefined || req.body.emp_city === undefined || req.body.emp_state === undefined || req.body.emp_pincode === undefined || req.body.emp_mobile_no === undefined || req.body.emp_mail_id === undefined || req.body.emp_aadhar_no === undefined) {
            throw 'Invalid Fields';
        }
        else {
            let data = {
                emp_title: req.body.emp_title,
                emp_name: req.body.emp_name,
                emp_dob: req.body.emp_dob,
                emp_doj: req.body.emp_doj,
                emp_address: req.body.emp_address,
                emp_city: req.body.emp_city,
                emp_state: req.body.emp_state,
                emp_pincode: req.body.emp_pincode,
                emp_mobile_no: req.body.emp_mobile_no,
                emp_mail_id: req.body.emp_mail_id,
                emp_aadhar_no: req.body.emp_aadhar_no,
            }

            let query = 'INSERT INTO Employee ( emp_title, emp_name, emp_dob, emp_doj, emp_address, emp_city, emp_state, emp_pincode, emp_mobile_no, emp_mail_id, emp_aadhar_no ) VALUES ( "' + data.emp_title + '", "' + data.emp_name + '", "' + data.emp_dob + '", "' + data.emp_doj + '", "' + data.emp_address + '", "' + data.emp_city + '", "' + data.emp_state + '", "' + data.emp_pincode + '", "' + data.emp_mobile_no + '", "' + data.emp_mail_id + '", "' + data.emp_aadhar_no + '" )';

            mysqlConnection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else {
                    console.log('Data Added');
                    res.status(201).json({
                        message: 'Data Added'
                    })
                }
            })

        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});

app.get('/getAllEmployee', (req, res) => {
    let query = 'SELECT * FROM Employee';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

app.get('/getAnEmployee', (req, res) => {
    let query = 'SELECT * FROM Employee where emp_mail_id = "' + req.body.emp_mail_id + '"';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

app.delete('/deleteEmployee', (req, res) => {
    
    mysqlConnection.query('DELETE FROM Employee_Salary_Details WHERE emp_id IN ( SELECT emp_id FROM Employee WHERE emp_mail_id = "' + req.body.emp_mail_id + '")', [req.params.id], (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query('DELETE FROM Employee WHERE emp_mail_id = "' + req.body.emp_mail_id + '"', [req.params.id], (err, rows, fields) => {
                if (!err) {
                    res.send('Employee deleted successfully.');
                }
                else
                    console.log(err);
            })
        }
        else
            console.log(err);
    })
})

app.post('/addGrade', (req, res) => {
    try {
        console.log(req.body)
        if (req.body.grade_short_name === undefined || req.body.grade_name === undefined || req.body.grade_basic === undefined || req.body.grade_ma === undefined || req.body.grade_bonus === undefined || req.body.grade_pt === undefined) {
            throw 'Invalid Fields';
        }
        else {
            let data = {
                grade_name: req.body.grade_name,
                grade_short_name: req.body.grade_short_name,
                grade_basic: req.body.grade_basic,
                grade_ma: req.body.grade_ma,
                grade_bonus: req.body.grade_bonus,
                grade_pt: req.body.grade_pt,
            }

            let query = 'INSERT INTO Grade ( grade_name, grade_short_name, grade_basic, grade_ma, grade_bonus, grade_pt ) VALUES ( "' + data.grade_name + '", "' + data.grade_short_name + '", "' + data.grade_basic + '", "' + data.grade_ma + '", "' + data.grade_bonus + '", "' + data.grade_pt + '" )';

            mysqlConnection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else {
                    console.log('Data Added');
                    res.status(201).json({
                        message: 'Data Added'
                    })
                }
            })

        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});

app.get('/getAllGrade', (req, res) => {
    let query = 'SELECT * FROM Grade';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

app.post('/addEmployeeSalary', (req, res) => {
    try {
        console.log(req.body)
        if (req.body.emp_id === undefined || req.body.emp_salary_year === undefined || req.body.emp_salary_month === undefined || req.body.emp_salary_reimbursement_date === undefined || req.body.emp_dept_id === undefined || req.body.emp_grade_id === undefined) {
            throw 'Invalid Fields';
        }
        else {

            let query1 = 'SELECT * FROM Grade WHERE grade_id = "' + req.body.emp_grade_id + '"';

            mysqlConnection.query(query1, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else {
                    let new_result = JSON.parse(JSON.stringify(result))[0];
                    let data = {
                        emp_id: req.body.emp_id,
                        emp_salary_year: req.body.emp_salary_year,
                        emp_salary_month: req.body.emp_salary_month,
                        emp_salary_reimbursement_date: req.body.emp_salary_reimbursement_date,
                        emp_dept_id: req.body.emp_dept_id,
                        emp_grade_id: req.body.emp_grade_id,
                        emp_gross: new_result.grade_basic + new_result.grade_bonus + new_result.grade_ma,
                        emp_total_salary: new_result.grade_basic + new_result.grade_bonus + new_result.grade_ma - new_result.grade_pt
                    }
                    let query = 'INSERT INTO Employee_Salary_Details ( emp_id, emp_salary_year, emp_salary_month, emp_salary_reimbursement_date, emp_dept_id, emp_grade_id, emp_gross, emp_total_salary ) VALUES ( "' + data.emp_id + '", "' + data.emp_salary_year + '", "' + data.emp_salary_month + '", "' + data.emp_salary_reimbursement_date + '", "' + data.emp_dept_id + '", "' + data.emp_grade_id + '", "' + data.emp_gross + '", "' + data.emp_total_salary + '" )';

                    mysqlConnection.query(query, (err1, result1) => {
                        if (err1) {
                            console.log(err1);
                            res.status(503).json({
                                message: err1
                            });
                        }
                        else {
                            console.log('Data Added');
                            res.status(201).json({
                                message: 'Data Added'
                            })
                        }
                    })
                }
            })

        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});

app.get('/getAllEmployeeSalary', (req, res) => {
    let query = 'SELECT * FROM Employee_Salary_Details';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

app.get('/getAnEmployeeSalary', (req, res) => {
    let query = 'SELECT * FROM Employee_Salary_Details where emp_id = "' + req.body.emp_id + '"';
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else {
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}..`));