function solve() {


    let firstName = document.getElementsByName('firstName')[0];
    let lastName = document.getElementsByName('lastName')[0];
    let facultyNumber = document.getElementsByName('facultyNumber')[0];
    let grade = document.getElementsByName('grade')[0];
    let body = document.querySelector('tbody');
    
    document.getElementById('submit').addEventListener('click', addStudent);

    window.onload = extract();

    async function addStudent(e) {
        e.preventDefault();
        
        if (firstName.value == '' || lastName.value == '' || facultyNumber.value == '' || grade.value == '') { return };
        if (isNaN(facultyNumber.value) || isNaN(grade.value)) {
            facultyNumber.value = '';
            grade.value = '';
            return
        };
        
        body.replaceChildren();

        let student = {
            firstName: firstName.value,
            lastName: lastName.value,
            facultyNumber: facultyNumber.value,
            grade: grade.value
        }
        await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            body: JSON.stringify(student)
        });
        extract();
        clear();
    }

    async function extract() {

        let res = await fetch('http://localhost:3030/jsonstore/collections/students');
        let data = await res.json();
        console.log(Object.values(data));
        Object.values(data).forEach(e => {
            e.grade = Number(e.grade);
            let tr = document.createElement('tr');
            tr.innerHTML +=
                `
        <td>${e.firstName}</td>
        <td>${e.lastName}</td>
        <td>${e.facultyNumber}</td>
        <td>${e.grade.toFixed(2)}</td>`
            body.appendChild(tr);
        });
    }
    function clear() {
        firstName.value = '';
        lastName.value = '';
        facultyNumber.value = '';
        grade.value = '';
    }
}
solve();