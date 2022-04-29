from flask import Flask, request, render_template, url_for, jsonify
import json
import requests

app = Flask(__name__)

@app.route('/')
def initialize():
    return render_template('login.html')

@app.route('/signup', methods = ['GET','POST'])
def signup():
    if request.method == 'POST':
        user=request.form.get('user')
        email=request.form.get('email')
        password=request.form.get('pass')
        val = {
            "user_name": user,
            "email_id": email,
            "password": password,
            "usertype": "Regular"
        }
        print(json.dumps(val))
        r=requests.post('http://localhost:8082/addUser',json=val)
        print(r)
        return render_template('home.html', task=0)
    return render_template('signup.html')

@app.route('/newpass', methods = ['GET','POST'])
def newpass():
    if request.method == 'POST':
        email=request.form.get('email')
        oldpass=request.form.get('oldpass')
        newpass=request.form.get('newpass')
        val = {
            "email_id": email,
            "oldPassword": oldpass,
            "newPassword": newpass
        }
        r=requests.put('http://localhost:8082/updatePassword',json=val)
        print(r)
        return render_template('login.html')
    return render_template('newpass.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email=request.form.get('email')
        password=request.form.get('pass')
        val = {
            "email_id": email,
            "password": password
        }
        print(requests.post('http://localhost:8082/checkUser',json=val).content)
        response =  requests.post('http://localhost:8082/checkUser',json=val).content
        log_stat = json.loads(response)['success']
        if log_stat == True:
            return render_template('home.html', task=0)
        else:
            return render_template('login.html')
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html', task=0)

@app.route('/home/r/')
def readtable():
    return render_template('home.html', task=1)

# @app.route('/home/c/')
# def query_route():
#     return render_template('home.html', task=2)

@app.route('/home/a/')
def adddata():
    return render_template('home.html', task=4, addstat=0)

@app.route('/home/d/')
def deldata():
    return render_template('home.html', task=3, delstat=0)

@app.route('/read-form', methods=['GET','POST'])
def read_table_val():
    if request.method == "POST":
        val = request.form.get("table-val")
        print(val)
        if int(val) == 1:
            table_json = requests.get('http://localhost:8082/getAllEmployee').text
            table_data = json.loads(table_json)
            # print(table_data)
        elif int(val) == 2:
            table_json = requests.get('http://localhost:8082/getAllEmployeeSalary').text
            table_data = json.loads(table_json)
            # print(table_data)
        else:
            table_data = '-'
        return render_template('home.html', task=1, readval=int(val), datalist=table_data)

@app.route('/add-form', methods=['GET','POST'])
def add_table_val():
    if request.method == "POST":
        val = request.form.get("table-val")
        print(val)
        return render_template('home.html', task=4, addval=int(val), addstat=0)

@app.route('/del-form', methods=['GET','POST'])
def del_table_val():
    if request.method == "POST":
        val = request.form.get("emp_mail_id")
        print(val)
        mail_data = {
            "emp_mail_id": val
        }
        requests.delete('http://localhost:8082/deleteEmployee',json=mail_data)
        return render_template('home.html', task=3, delstat=int(1))
    return render_template('home.html', task=3, delstat=0)

@app.route('/add-data/emp/', methods=['GET','POST'])
def add_emp_data():
    if request.method == "POST":
        emp_title = request.form.get('emp_title')
        emp_name = request.form.get('emp_name')
        emp_dob = request.form.get('emp_dob')
        emp_doj = request.form.get('emp_doj')
        emp_mobile_no = request.form.get('emp_mobile_no')
        emp_mail_id = request.form.get('emp_mail_id')
        emp_address = request.form.get('emp_address')
        emp_city = request.form.get('emp_city')
        emp_state = request.form.get('emp_state')
        emp_pincode = request.form.get('emp_pincode')
        emp_aadhar_no = request.form.get('emp_aadhar_no')
        print(emp_title)
        print(emp_name)
        print(emp_dob)
        print(emp_doj)
        print(emp_mobile_no)
        print(emp_mail_id)
        print(emp_address)
        print(emp_city)
        print(emp_state)
        print(emp_pincode)
        print(emp_aadhar_no)
        data = {
            "emp_title": emp_title,
            "emp_name": emp_name,
            "emp_dob": emp_dob,
            "emp_doj": emp_doj,
            "emp_mobile_no": emp_mobile_no,
            "emp_mail_id": emp_mail_id,
            "emp_address": emp_address,
            "emp_city": emp_city,
            "emp_state": emp_state,
            "emp_pincode": emp_pincode,
            "emp_aadhar_no": emp_aadhar_no
        }
        r=requests.post('http://localhost:8082/addEmployee',json=data)
        print(r)
        return render_template('home.html', task=4, addval=int(1), addstat=int(1))
        
@app.route('/add-data/empsal/', methods=['GET','POST'])
def add_emp_sal_data():
    if request.method == "POST":
        emp_id=request.form.get('emp_id')
        emp_salary_year=request.form.get('emp_salary_year')
        emp_salary_month=request.form.get('emp_salary_month')
        emp_salary_reimbursement_date=request.form.get('emp_salary_reimbursement_date')
        emp_dept_id=request.form.get('emp_dept_id')
        emp_grade_id=request.form.get('emp_grade_id')
        data = {
            "emp_id": emp_id,
            "emp_salary_year": emp_salary_year,
            "emp_salary_month": emp_salary_month,
            "emp_salary_reimbursement_date": emp_salary_reimbursement_date,
            "emp_dept_id": emp_dept_id,
            "emp_grade_id": emp_grade_id
        }
        r=requests.post('http://localhost:8082/addEmployeeSalary',json=data)
        print(r)
        return render_template('home.html', task=4, addval=int(2), addstat=int(1))
        
@app.route('/add-data/grade/', methods=['GET','POST'])
def add_grade_data():
    if request.method == "POST":
        grade_name=request.form.get('grade_name')
        grade_short_name=request.form.get('grade_short_name')
        grade_basic=request.form.get('grade_basic')
        grade_ma=request.form.get('grade_ma')
        grade_bonus=request.form.get('grade_bonus')
        grade_pt=request.form.get('grade_pt')
        data = {
            "grade_name": grade_name,
            "grade_short_name": grade_short_name,
            "grade_basic": grade_basic,
            "grade_ma": grade_ma,
            "grade_bonus": grade_bonus,
            "grade_pt": grade_pt
        }
        r=requests.post('http://localhost:8082/addGrade',json=data)
        print(r)
        return render_template('home.html', task=4, addval=int(3), addstat=int(1))

if __name__ == "__main__":
    app.run(debug=True, port=5003)