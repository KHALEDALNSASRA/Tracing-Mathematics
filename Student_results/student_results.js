import * as db from "../Database.js";

const name = document.querySelectorAll(".profName")

const teacherid = db.getCurrentSession().userId
name.forEach(element => {
    element.innerHTML = db.getTeacher(teacherid).fullName
});

const students = db.getAllStudents()
const tbody = document.getElementById("Student")
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
