import * as db from "../Database.js";

const name = document.querySelectorAll(".profName")

const teacherid = db.getCurrentSession().userId
name.forEach(element => {
    element.innerHTML = db.getTeacher(teacherid).fullName
});

const students = db.getAllStudents()
const tbody = document.getElementById("Student")

function loadStudents(students){
    tbody.innerHTML = " "
    students.forEach(student => {

    const lastResultId = student.results.at(-1);

    const lastSubmit =
        lastResultId !== undefined
            ? db.getResult(lastResultId).submittedAt
            : "No submissions";

    tbody.innerHTML += `
        <tr>
            <td data-label="Student">${student.fullName}</td>
            <td data-label="Email">${student.username}</td>
            <td data-label="Last Submit">${lastSubmit}</td>
            <td data-label="Avg Score">${student.avgGrade}%</td>
            <td data-label="Exams Done">${student.results.length}</td>
        </tr>
    `;
});
}

loadStudents(students)

const filter = document.getElementById("filter") 

filter.addEventListener("change",event=>{
    if(event.target.value == "Highest score")
        students.sort((a, b) => b.avgGrade - a.avgGrade);
    else if(event.target.value == "Lowest score")
        students.sort((a, b) => a.avgGrade - b.avgGrade);
    else if(event.target.value == "Most exams")
        students.sort((a, b) => b.results.length - a.avgGrade.length);

    loadStudents(students)
})


const searchBar = document.getElementById("searchBar")

searchBar.addEventListener("input", event => {
    const searchValue = event.target.value.trim();

    if (searchValue === "") {
        loadStudents(students);
        return;
    }

    try {
        const regex = new RegExp(searchValue, "i");

        const filteredStudents = students.filter(student =>
            regex.test(student.fullName) ||
            regex.test(student.username) ||
            regex.test(String(student.avgGrade)) ||
            regex.test(String(student.results.length))
        );

        loadStudents(filteredStudents);
    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5">Invalid search expression</td>
            </tr>
        `;
    }
});