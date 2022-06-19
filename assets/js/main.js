var employeeNameInput = document.getElementById('employeeName');
var employeeAgeInput = document.getElementById('employeeAge');
var employeePhoneInput = document.getElementById('employeePhone');
var employeeDepartmentInput = document.getElementById('employeeDepartment');
var employeeSalaryInput = document.getElementById('employeeSalary');
var inputs = document.getElementsByClassName('form-control');
var addBtn = document.getElementById('click');
var data = document.getElementById('data');
var deleteBtn = document.getElementById('deleteBtn');
var currentIndex = 0;

if(localStorage.getItem("employeesList") == null){
    var employees = [];
}else{
    var employees = JSON.parse(localStorage.getItem("employeesList"));
    displayData();
}

addBtn.onclick = function(){
    if(addBtn.innerHTML == "Add Employee"){
        addEmployee();
    }else{
        updateEmployee();
    }
    displayData();
    clearForm();
}

function addEmployee(){
    var employee = {
        name : employeeNameInput.value,
        age : employeeAgeInput.value,
        phone : employeePhoneInput.value,
        department : employeeDepartmentInput.value,
        salary : employeeSalaryInput.value,
    }
    employees.push(employee); 
    localStorage.setItem("employeesList",JSON.stringify(employees));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been added',
        showConfirmButton: false,
        timer: 1500
      })
}

function displayData(){
    var result = "";
    for(var i = 0; i < employees.length; i++){
        result += `<tr>
        <td> ${i} </td> 
        <td> ${employees[i].name} </td> 
        <td> ${employees[i].age} </td>
        <td> ${employees[i].phone} </td>
        <td> ${employees[i].department} </td> 
        <td> ${employees[i].salary} </td> 
        <td> <button onclick="getEmployeeData(${i})" class="update"> update </button> </td> 
        <td> <button onclick="deleteEmployee(${i})" class="delete"> delete </button> </td> 
        </tr>`
    }
    data.innerHTML = result;
}

function clearForm(){
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteEmployee(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            employees.splice(index,1);
            localStorage.setItem("employeesList",JSON.stringify(employees));
            displayData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

deleteBtn.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("employeesList");
            data.innerHTML = "";
            employees = [];
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

function search(searchText){
    var result = "";
    for(var i = 0; i < employees.length; i++){
        if(employees[i].name.toLowerCase().includes(searchText.toLowerCase())){
            result += `<tr>
            <td> ${i} </td> 
            <td> ${employees[i].name} </td> 
            <td> ${employees[i].age} </td> 
            <td> ${employees[i].phone} </td> 
            <td> ${employees[i].department} </td> 
            <td> ${employees[i].salary} </td> 
            <td> <button class="update"> update </button> </td> 
            <td> <button onclick="deleteEmployee(${i})" class="delete"> delete </button> </td> 
            </tr>`
        }
    }
    data.innerHTML = result;
}

function getEmployeeData(index){
    employeeNameInput.value = employees[index].name;
    employeeAgeInput.value = employees[index].age;
    employeePhoneInput.value = employees[index].phone;
    employeeDepartmentInput.value = employees[index].department;
    employeeSalaryInput.value = employees[index].salary;

    addBtn.innerHTML = "update employee";
    currentIndex = index;
}

function updateEmployee(){
    employees[currentIndex].name = employeeNameInput.value;
    employees[currentIndex].age = employeeAgeInput.value;
    employees[currentIndex].phone = employeePhoneInput.value;
    employees[currentIndex].department = employeeDepartmentInput.value;
    employees[currentIndex].salary = employeeSalaryInput.value;
    
    localStorage.setItem("employeesList",JSON.stringify(employees));
    addBtn.innerHTML = "Add Employee";

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been updated',
        showConfirmButton: false,
        timer: 1500
      })
}

employeeName.onkeyup = function(){
    var namePatter = /^[A-Z][a-z]{2,15}$/;
    if(namePatter.test(employeeName.value)){
        addBtn.removeAttribute("disabled");
        employeeName.classList.add("is-valid");
        employeeName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
    }else{
        addBtn.setAttribute("disabled","true");
        employeeName.classList.add("is-invalid");
        employeeName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
}

employeeAge.onkeyup = function(){
    var agePatter = /^([2-7][0-9]|80){1}$/;
    //OR
    // var agePatter = /^100|[1-9]\d|[1-9]$/;
    if(agePatter.test(employeeAge.value)){
        addBtn.removeAttribute("disabled");
        employeeAge.classList.add("is-valid");
        employeeAge.classList.remove("is-invalid");
        ageAlert.classList.add("d-none");
    }else{
        addBtn.setAttribute("disabled","true");
        employeeAge.classList.add("is-invalid");
        employeeAge.classList.remove("is-valid");
        ageAlert.classList.remove("d-none");
    }
}

employeePhone.onkeyup = function(){
    var phonePatter = /^(\+970|\+972|00970|00972)[0-9]{2}[0-9]{3}[0-9]{4}$/;
    // var phonePatter = /^[+][970]|[972]\(?(\d{2})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if(phonePatter.test(employeePhone.value)){
        addBtn.removeAttribute("disabled");
        employeePhone.classList.add("is-valid");
        employeePhone.classList.remove("is-invalid");
    }else{
        addBtn.setAttribute("disabled","true");
        employeePhone.classList.add("is-invalid");
        employeePhone.classList.remove("is-valid");
    }
}

employeeDepartment.onkeyup = function(){
    var departmentPattern = /^[A-Z][a-z]{1,15}$/;
    if(departmentPattern.test(employeeDepartment)){
        addBtn.removeAttribute("disabled");
        employeeDepartment.classList.add("is-valid");
        employeeDepartment.classList.remove("is-invalid");
    }else{
        addBtn.setAttribute("disabled","true");
        employeeDepartment.classList.add("is-invalid");
        employeeDepartment.classList.remove("is-valid");
    }
}

employeeSalary.onkeyup = function(){
    var salaryPattern ;
    if(salaryPattern.test(employeeSalary)){
        addBtn.removeAttribute("disabled");
        employeeSalary.classList.add("is-valid");
        employeeSalary.classList.remove("is-invalid");
    }else{
        addBtn.setAttribute("disabled","true");
        employeeSalary.classList.add("is-invalid");
        employeeSalary.classList.remove("is-valid");
    }
}