import * as db from "../Database.js";



const name = document.querySelectorAll(".profName")

const teacherid = db.getCurrentSession().userId

name.forEach(element => {
    element.innerHTML = db.getTeacher(teacherid).fullName
});



const addStudentForm = document.getElementById("addStudentForm")

addStudentForm.addEventListener("submit",(e)=>{
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    db.createStudent(data.studentName,data.nationalId,data.phoneNumber,data.studentEmail,data.studentPassword)
    alert("Account created");
})