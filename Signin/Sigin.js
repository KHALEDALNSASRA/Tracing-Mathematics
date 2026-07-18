import * as db from "../Database.js";





const create = document.getElementById("createTeacher");

console.log(create);

create.addEventListener("submit", function () {
    

    alert("Submit Works");

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    db.createTeacher(fullName, email, password);

   
});
