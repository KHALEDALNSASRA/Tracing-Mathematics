import * as db from "../Database.js"



// =========================
// Check Session
// =========================

const session = db.getCurrentSession();

if (!session) {
    window.location.href = "login.html";
}

// =========================
// Get Student
// =========================

const student = db.getStudent(session.userId);

if (!student) {
    alert("Student not found.");
    window.location.href = "login.html";
}

// =========================
// Elements
// =========================

const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const studentEmail = document.getElementById("studentEmail");
const studentAverage = document.getElementById("studentAverage");
const teacherName = document.getElementById("teacherName");

// =========================
// Render Profile
// =========================

studentName.textContent = student.fullName;

studentId.textContent = student.nationalId;

studentEmail.textContent = student.username;

studentAverage.textContent = `${Number(student.avgGrade).toFixed(2)} %`;




teacherName.textContent = "Mr. Ahmad Khalil";