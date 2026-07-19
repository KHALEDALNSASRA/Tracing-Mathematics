import * as db from "../Database.js";







const login = document.getElementById("login")


login.addEventListener("submit", function (e) {
    

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

  

    const result = db.login(email, password);

    

    if (result === null) {
        alert("Wrong username or password");
        return;
    }

   

    if (result.role === "teacher") {
        
        window.location.href = "../teacher_dashbors/teacher_dashbors.html";
    } else if (result.role === "student") {
        
        window.location.href = "../student pages/student-dashboard.html";
    }
});
        
    
    
    

    





