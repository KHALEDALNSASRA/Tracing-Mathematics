import * as db from "../Database.js";
import * as seed from "../seedData.js"
seed.seedData()
document.addEventListener("DOMContentLoaded", () => {
    const session = db.getCurrentSession();

    if (!session) {
        alert("You are not logged in.");
        return;
    }

    if (session.role !== "teacher") {
        alert("This page is only available for teachers.");
        return;
    }

    const teacherId = session.userId;
    const teacher = db.getTeacher(teacherId);

    if (!teacher) {
        alert("Teacher information could not be found.");
        return;
    }

    const teacherName = document.getElementById("teacherName");
    const teacherMainEmail =
        document.getElementById("teacherMainEmail");

    const teacherIdElement =
        document.getElementById("teacherId");

    const teacherEmail =
        document.getElementById("teacherEmail");

    const teacherNationalId =
        document.getElementById("teacherNationalId");

    const teacherPhone =
        document.getElementById("teacherPhone");

    if (teacherName) {
        teacherName.textContent = teacher.fullName;
    }

    if (teacherMainEmail) {
        teacherMainEmail.textContent = teacher.username;
    }

    if (teacherIdElement) {
        teacherIdElement.textContent = teacherId;
    }

    if (teacherEmail) {
        teacherEmail.textContent = teacher.username;
    }

    if (teacherNationalId) {
        teacherNationalId.textContent = "Not available";
    }

    if (teacherPhone) {
        teacherPhone.textContent = "Not available";
    }
});