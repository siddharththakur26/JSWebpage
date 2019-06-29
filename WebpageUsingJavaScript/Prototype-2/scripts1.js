/*
Script is to display, edit and store the data of Employee records which takes the response from the 
Employee endpoint of  Payroll API.
*/
const app = document.getElementById('root');
const container = document.createElement('div');

container.setAttribute('class', 'container');
app.appendChild(container);
//Will be used to Xero Payroll API
// var request = new XMLHttpRequest();
// request.open('GET', '', true);
  //Try to hard code the JSON response.
  // var employee_e = [{
  //       "EmployeeID": "63c571b3-bff0-4ce1-94f7-255c235580fa",
  //       "FirstName": "Clive",
  //       "LastName": "Thomas",
  //       "Status": "ACTIVE",
  //       "DateOfBirth": "1992-02-05T00:00:00",
  //       "Gender": "M",
  //       "UpdatedDateUTC": "2018-08-08T05:31:38"
  //
  //     },
  //     {
  //           "EmployeeID": "63c571b3-bff0-4ce1-94f7",
  //           "FirstName": "Jane",
  //           "LastName": "Doe",
  //           "Status": "ACTIVE",
  //           "IsAuthorisedToApproveTimesheets": "True"
  //         }];

  //Importing JSON response
  var employee_e;
  $.getJSON("employees.json")
  .done(function(data){
    employee_e = data.Response;
    init()

  })
  .fail( function(){
    alert("Could not load data");
  });

//Storing Key-value pair for the endpoint which is used to display the records in sorted manner.
  var dataList = [
    {
      displayName: 'FirstName',
      value: "FirstName"
    },
    {
      displayName: 'MiddleName',
      value: "MiddleName"
    },
    {
      displayName: 'LastName',
      value: "LastName"
    },
    {
      displayName: 'Date of Birth',
      value: "DateOfBirth",
      type: "datetime-local"
    },
    {
      displayName: 'Home Address',
      value: "HomeAddress"
    },
    {
      displayName: 'Start Date',
      value: "StartDate",
      type: "datetime-local"
    },
    {
      displayName: 'Employee Title',
      value: "Title"
    },

    {
      displayName: 'Email',
      value: "Email"
    },
    {
      displayName: 'Gender',
      value: "Gender"
    },
    {
      displayName: 'Phone',
      value: "Phone"
    },
    {
      displayName: 'Mobile',
      value: "Mobile"
    },
    {
      displayName: 'Twitter User Name',
      value: "TwitterUserName"
    },
    {
      displayName: 'Is Authorised To Approve Leave',
      value: "IsAuthorisedToApproveLeave"
    },
    {
      displayName: 'Is Authorised To Approve Timesheets',
      value: "IsAuthorisedToApproveTimesheets"
    },
    {
      displayName: 'Job Title',
      value: "JobTitle"
    },
    {
      displayName: 'Classification',
      value: "Classification"
    },
    {
      displayName: 'Ordinary Earnings RateID',
      value: "OrdinaryEarningsRateID"
    },
    {
      displayName: 'Payroll Calendar ID',
      value: "PayrollCalendarID"
    },
    {
      displayName: 'Employee Group Name',
      value: "EmployeeGroupName"
    },
    {
      displayName: 'Bank Accounts',
      value: "BankAccounts"
    },
    {
      displayName: 'Pay Template',
      value: "PayTemplate"
    },
    {
      displayName: 'Opening Balances',
      value: "OpeningBalances"
    },
    {
      displayName: 'Leave Balances',
      value: "LeaveBalances"
    },
    {
      displayName: 'Super Memberships',
      value: "SuperMemberships"
    },
    {
      displayName: 'Termination Date',
      value: "TerminationDate"
    },
    {
      displayName: 'Employee ID',
      value: "EmployeeID"
    },
    {
      displayName: 'Status',
      value: "Status"
    },
    {
      displayName: 'Updated Date UTC',
      value: "UpdatedDateUTC",
      type: "datetime-local"
    }
  ];
  
function init() {
  //iterate every data in the JSON file
    employee_e.Employees.Employee.forEach(employee => {
    const card = document.createElement('form');
    card.setAttribute('class', 'card');
    const h1 = document.createElement('h1');
    h1.textContent = employee.FirstName +" "+ employee.LastName;

    // var delbutton = document.createElement('button');
    // delbutton.className = 'del-button';
    // delbutton.textContent = 'Delete';

    card.appendChild(h1);
    //Iterate the elements of JSON and storing the value in above created datalist
    for( var item of dataList) {
      if (!employee[item.value])
        continue;
      const div = document.createElement('div');
      const keyName = document.createElement('span');
      keyName.className = 'field-name';

      keyName.textContent = item.displayName + ': ';

      const employeeValue = document.createElement('span');
      if (item.type) {
        employeeValue.type = item.type;
      }
      let valueContent = '';
      if (employee[item.value])
        valueContent += employee[item.value] + ' '
      employeeValue.textContent = valueContent.trim();
      //Making the value editable
      $(employeeValue).attr('key', item.value)
      employeeValue.contentEditable = true;
      employeeValue.className = 'field-value';
      div.appendChild(keyName);
      div.appendChild(employeeValue);
      card.appendChild(div);
    }
    container.appendChild(card);


    });
    //Submit button to save the updated record.
    var button = document.createElement('button');
    button.className = 'submit-button';
    button.textContent = 'Submit';

    button.onclick = function () {
      extractdata()
    };

    function extractdata(){
      let cards = $(".card");
      let data = []
      console.log()
      for (let card of cards) {
          let employee = {}
          for (c of $(card).find('.field-value')) {
            employee[$(c).attr('key')] = c.textContent
          }
          data.push(employee);
      }
      console.log(data)
    }

    container.append(button);

  }



/*
Code has been referred from https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
*/
