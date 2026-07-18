

/* 

    localStorage
    key : value

    Users :{
        Techer:{
        key : value
        key -> 0 1 2 3 ...
        value ->  // teacher data
        }

        Teacher : {
        0 : {
                fullName: "Mr. Ahmad",
                username: "admin",
                password: "admin123", 
          }
        
        1 : {
                fullName: "Mr. Ahmad",
                username: "admin",
                password: "admin123", 
          }
        }

        Student:{
        key : value
        key -> 0 1 2 3 ...
        value ->  // student data
        }

        Student:{
          0 : {
                fullName: "Sara Ali",
                nationalId: "9981234567",
                phone: "0791234567",
                username: "sara.ali",
                password: "12345",
                results : [0,1,2] // results keys
                avgGrade : 90
          }
      }

    }



    Exams: {
      key:value
      key -> 0 1 2 3 ...
      value -> // exams data 
    }
    
    Exams: {
        0 : {
            title: "Math Midterm",
            dateTime: "2026-07-20T10:00",
            status: "Active",  
            qustions : [0 , 1, 2]//qIDs
            totalPoints: 10
        }

    Quastions:{
        key: value
        key -> 0 1 2 3 ...
        value -> // quastions data
    }

    Questions: {
    0: {
        text: "1+1",
        option: {
            0: "1",
            1: "4",
            2: "0",
            3: "2"
        },
        correctAns: 3// index in option array
        type: "MCQ",// "MCQ" | "TrueFalse"
        points: 2
    }
}



   Results: {
    key: value
    key -> 0 1 2 3 ...
    value -> // one exam attempt by one student
}

Results: {
    0: {
        studentId: 0,          // key into Users.Student
        examId: 0,             // key into Exams
        submittedAt: "2026-07-20T10:15",
        totalPoints: 10,
        earnedPoints: 8,
        percentage: 80,
        passed: true,
        answers: {
            0: { //
                studentAns: 3, // index in option array 
                isCorrect: true,
                qustionID: 2
                pointsEarned: 2
            },
            1: {
                studentAns: 0 ,
                isCorrect: false,
                qustionID: 2,
                pointsEarned: 0
            }
        }
    }
    1:{
    }
}

*/


export function initApp(){
    localStorage.clear()
  if(!localStorage.getItem("Users")){
    const user = {
      Teacher : {},
      Student : {}
    }
    localStorage.setItem("Users",JSON.stringify(user))
  }

  if (!localStorage.getItem("Exams")) {
        localStorage.setItem("Exams", JSON.stringify({}));
    }

    if (!localStorage.getItem("Questions")) {
        localStorage.setItem("Questions", JSON.stringify({}));
    }

    if (!localStorage.getItem("Results")) {
        localStorage.setItem("Results", JSON.stringify({}));
    }
}



export function getNextKey(object) {
    const keys = Object.keys(object).map(Number); 

    if (keys.length === 0) {
        return 0; 
    }

    return Math.max(...keys) + 1;
}




export function createTeacher(fullName, username, password){
  const users = JSON.parse(localStorage.getItem("Users"))
  const newKey = getNextKey(users.Teacher)


  users.Teacher[newKey]={
    fullName,
    username,
    password
  }

  localStorage.setItem("Users",JSON.stringify(users))
  return newKey;
}




export function getTeacher(teacherId){
  const teacher = JSON.parse(localStorage.getItem("Users")).Teacher[teacherId]
  return teacher
}



export function getTeacherByUsername(username){
  const teachers = JSON.parse(localStorage.getItem("Users")).Teacher
  let found
  Object.entries(teachers).forEach(([id,teacher]) =>{
    if(teacher.username == username)
      found = {
        id:Number(id),
        teacher
    }
  })
  return found
}





export function createStudent(fullName, nationalId, phone, username, password){
  const data = JSON.parse(localStorage.getItem("Users"))
  const newKey = getNextKey(data.Student);
  data.Student[newKey] = {
    fullName,
    nationalId,
    phone,
    username,
    password,
    results :[],
    avgGrade: 0
  }

  localStorage.setItem("Users",JSON.stringify(data))
  return newKey;
}




export function getStudent(studentId) {
    const data = JSON.parse(localStorage.getItem("Users"));
    return data.Student[studentId];
}




export function getAllStudents() {
    const data = JSON.parse(localStorage.getItem("Users"));
    return Object.values(data.Student); // object → array of student objects
}



export function getStudentByUsername(username) {
  const students = JSON.parse(localStorage.getItem("Users")).Student
  let found
  Object.entries(students).forEach(([id,student]) =>{
    if(student.username == username)
      found = {
        id:Number(id),
        student
    }
  })
  return found
}



export function addResultToStudent(studentId, resultId) {
    const data = JSON.parse(localStorage.getItem("Users"));
    const result = getResult(resultId);
    const student = data.Student[studentId];

    const addedGrade = result.percentage;          // performance, not max score
    const oldAvg = student.avgGrade || 0;           // 0 if undefined/first result
    const newAvg = (oldAvg * student.results.length + addedGrade) / (student.results.length + 1);

    student.results.push(resultId);
    student.avgGrade = newAvg;

    localStorage.setItem("Users", JSON.stringify(data));
}


export function createExam(title, dateTime, status, questionIds) {
    const data = JSON.parse(localStorage.getItem("Exams")) || {};
    const newKey = getNextKey(data);

    let totalPoints = 0;

    questionIds.forEach(qid => {
        const question = getQuestion(qid);

        if (question) {
            totalPoints += Number(question.points);
        }
    });

    data[newKey] = {
        title,
        dateTime,
        status,
        questions: questionIds,
        totalPoints
    };

    localStorage.setItem("Exams", JSON.stringify(data));

    return newKey;
}


export function getExam(examId) {
    const data = JSON.parse(localStorage.getItem("Exams"));
    return data[examId];
}

export function getAllExams() {
    const data = JSON.parse(localStorage.getItem("Exams"));
    return Object.values(data);
}

export function getActiveExams() {
    const exams = getAllExams();
    return exams.filter(exam => exam.status === "Active");
}





export function createQuestion(text, options, correctAnsIndex, type, points) {
    const data = JSON.parse(localStorage.getItem("Questions"));
    const newKey = getNextKey(data);

    data[newKey] = {
        text,
        option: options,       
        correctAns: correctAnsIndex,
        type,
        points
    };

    localStorage.setItem("Questions", JSON.stringify(data));
    return newKey;
}





export function getQuestion(questionId) {
    const data = JSON.parse(localStorage.getItem("Questions"));
    return data[questionId];
}



export function getQuestionsByIds(questionIdsArray) {
    const data = JSON.parse(localStorage.getItem("Questions"));
    return questionIdsArray.map(id => data[id]); 
}



/*
Results: {
    0: {
        studentId: 0,          // key into Users.Student
        examId: 0,             // key into Exams
        submittedAt: "2026-07-20T10:15",
        totalPoints: 10,
        earnedPoints: 8,
        percentage: 80,
        passed: true,
        answers: {
            0: { //
                studentAns: 3, // index in option array 
                isCorrect: true,
                qustionID: 2
                pointsEarned: 2
            },
            1: {
                studentAns: 0 ,
                isCorrect: false,
                qustionID: 2,
                pointsEarned: 0
            }
        }
    }

*/
export function createResult(studentId, examId, ans, qId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    const newKey = getNextKey(data);
    const exam = getExam(examId);
    let totalPoints = exam.totalPoints

    let earnedPoints = 0
    const answers ={}
    let percentage;
    let passed;
    for(let i = 0; i < qId.length; i++){
        const question = getQuestion(qId[i])
        const isCorrect = Number(question.correctAns) === (ans[i]);
        let points;
        if(isCorrect)
            {
                points = question.points
                earnedPoints += points
            }
        else
            points = 0
 
        answers[i]={
            studentAns : ans[i],
            isCorrect,
            qustionID : qId[i],
            pointsEarned : points
        }
         percentage =
        totalPoints === 0 ? 0 : (earnedPoints / totalPoints) * 100;

    const passed = percentage >= 50;
    }


    data[newKey] = {
        studentId,
        examId,
        submittedAt: new Date().toISOString(),
        totalPoints,
        earnedPoints,
        percentage,
        passed,
        answers
    };

    localStorage.setItem("Results", JSON.stringify(data));

    addResultToStudent(studentId, newKey); // keep Student.results in sync, per earlier discussion

    return newKey;
}


// create exam edit (totale points)

export function getResult(resultId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    return data[resultId];
}




export function getResultsByStudent(studentId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    return Object.values(data).filter(r => r.studentId === studentId);
}


export function login(username, password) {
    const teacher = getTeacherByUsername(username);
    if (teacher && teacher.teacher.password === password) {
        setSession(teacher.id,"teacher")
        return { role: "teacher", user: teacher.teacher};
    }

    const student = getStudentByUsername(username);
    if (student && student.student.password === password) {
        setSession(student.id,"student")
        return { role: "student", user: student.student };
    }

    return null; // no match — wrong username or password
}

export function setSession(userId, role) {
    sessionStorage.setItem("Session", JSON.stringify({ userId, role }));
}

export function getCurrentSession() {
    const raw = sessionStorage.getItem("Session");
    return raw ? JSON.parse(raw) : null;
}

export function logout() {
    sessionStorage.removeItem("Session");
}


export function addQuestionToExam(examId, questionId) {
    const data = JSON.parse(localStorage.getItem("Exams"));
    data[examId].questions.push(questionId);
    localStorage.setItem("Exams", JSON.stringify(data));
}



export function getResultsByExam(examId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    return Object.values(data).filter(r => r.examId === examId);
}




export function hasStudentTakenExam(studentId, examId) {
    const results = getResultsByStudent(studentId);
    return results.some(r => r.examId === examId); // true/false, not the result itself
}
