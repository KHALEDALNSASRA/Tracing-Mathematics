import * as db from "../Database.js";
import * as seed from "../seedData.js"


seed.seedData()

const name = document.querySelectorAll(".profName")

const teacherid = db.getCurrentSession().userId

name.forEach(element => {
    element.innerHTML = db.getTeacher(teacherid).fullName
});


const totalSudents = db.getAllStudents().length
document.getElementById("totalSudents").innerHTML = `${totalSudents}`


document.getElementById("activeExams").innerHTML = `${db.getActiveExams().length}`

let classAvg = 0;
let countofActiveStudent = 0;
const students = db.getAllStudents();
const topStudents = {};

students.forEach(student => {
    if (student.results.length > 0) {
        countofActiveStudent++;
        classAvg += student.avgGrade;
    }
});
classAvg = classAvg/countofActiveStudent
document.getElementById("classAvg").innerHTML = `${classAvg}`


students.sort((a, b) => b.avgGrade - a.avgGrade);


const topStu = document.getElementById("topStu")

topStu.innerHTML =`<div class="panel-header">
                            <h2 class="panel-title">Top Students</h2>
                            <a class="panel-link" href="#">See all students →</a>
                        </div>
                        <ul class="student-list">
                            <li class="student-row">
                                <span class="student-name"><span class="student-dot">M</span>${students[0].fullName}</span>
                                <span class="student-score">${students[0].avgGrade}%</span>
                            </li>
                            <li class="student-row">
                                <span class="student-name"><span class="student-dot">M</span>${students[1].fullName}</span>
                                <span class="student-score">${students[1].avgGrade}%</span>
                            </li>
                            <li class="student-row">
                                <span class="student-name"><span class="student-dot">M</span>${students[3].fullName}</span>
                                <span class="student-score">${students[2].avgGrade}%</span>
                            </li>
                        </ul>`


const Exams = db.getAllExams()


const redundantHtml = `
    <td data-label="Exam Title">
        <div class="exam-title-cell">
            <span class="exam-icon">
                <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    viewBox="0 0 24 24"
                >
                    <path d="M4 5h6a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4z"></path>
                    <path d="M20 5h-6a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h6z"></path>
                </svg>
            </span>
`;

const recentExams = document.getElementById("recentExams");
 
let rows = "";

for (let i = 0; i < Exams.length && i < 4; i++) {
    rows += `
        <tr>
            ${redundantHtml}
                <span>${Exams[i].title}</span>
            </div>
            </td>

            <td data-label="Date">
                ${Exams[i].dateTime}
            </td>

            <td data-label="Total Points">
                ${Exams[i].totalPoints}
            </td>

            <td data-label="Average Score">
                76%
            </td>

            <td
                class="status-${Exams[i].status.toLowerCase()}"
                data-label="Status"
            >
                ${Exams[i].status}
            </td>
        </tr>
    `;
}

recentExams.innerHTML = rows;
