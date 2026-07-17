import * as db from "./Database.js";


db.createQuestion()
db.initApp();

const teacherId = db.createTeacher(
    "Mr. Ahmad",
    "admin",
    "admin123"
);
db.setSession(0,"teacher")

const studentId = db.createStudent(
    "Sara Ali",
    "9981234567",
    "0791234567",
    "sara",
    "12345"
);

const question1 = db.createQuestion(
    "1 + 1 = ?",
    ["1", "2", "3", "4"],
    1,
    "MCQ",
    5
);

const question2 = db.createQuestion(
    "JavaScript is a programming language.",
    ["True", "False"],
    0,
    "TrueFalse",
    5
);

const examId = db.createExam(
    "Test Exam",
    "2026-07-20T10:00",
    "Active",
    [question1, question2]
);


const exam = db.getExam(0);
exam.questions.forEach(qid => {
    console.log(db.getQuestion(qid))
});

db.setSession(0,"teacher")
