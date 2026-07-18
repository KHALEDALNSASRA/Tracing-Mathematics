import * as db from "../Database.js";
import * as seed from "../seedData.js"


const name = document.querySelectorAll(".profName")

const teacherid = db.getCurrentSession().userId

name.forEach(element => {
    element.innerHTML = db.getTeacher(teacherid).fullName
});



const addStudentForm = document.getElementById("addStudentForm")

addStudentForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    db.createStudent(data.studentName,data.nationalId,data.phoneNumber,data.studentEmail,data.studentPassword)
})