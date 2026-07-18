// seedData.js

import {
    initApp,
    createTeacher,
    createStudent,
    createQuestion,
    createExam,
    createResult,
    setSession
} from "./Database.js";


export function seedData() {

    // Creates the empty localStorage structure
    initApp();
    setSession(0,"teacher")

    // ==================================================
    // TEACHER
    // ==================================================

    const teacherId = createTeacher(
        "Mr. Ahmad Khalil",
        "admin@gmail.com",
        "admin123"
    );


    // ==================================================
    // STUDENTS
    // ==================================================

    const student1Id = createStudent(
        "Sara Ali",
        "9981234501",
        "0791234501",
        "sara.ali@gmail.com",
        "12345"
    );

    const student2Id = createStudent(
        "Omar Khaled",
        "9981234502",
        "0791234502",
        "omar.khaled",
        "12345"
    );

    const student3Id = createStudent(
        "Lina Ahmad",
        "9981234503",
        "0791234503",
        "lina.ahmad",
        "12345"
    );

    const student4Id = createStudent(
        "Yazan Jaber",
        "9981234504",
        "0791234504",
        "yazan.jaber",
        "12345"
    );

    const student5Id = createStudent(
        "Noor Hassan",
        "9981234505",
        "0791234505",
        "noor.hassan",
        "12345"
    );


    // ==================================================
    // MATHEMATICS QUESTIONS
    // ==================================================

    const mathQuestion1Id = createQuestion(
        "What is 5 + 5?",
        {
            0: "5",
            1: "10",
            2: "15",
            3: "20"
        },
        1,
        "MCQ",
        2
    );

    const mathQuestion2Id = createQuestion(
        "What is 6 × 4?",
        {
            0: "20",
            1: "22",
            2: "24",
            3: "26"
        },
        2,
        "MCQ",
        2
    );

    const mathQuestion3Id = createQuestion(
        "What is 20 ÷ 4?",
        {
            0: "4",
            1: "5",
            2: "6",
            3: "8"
        },
        1,
        "MCQ",
        2
    );

    const mathQuestion4Id = createQuestion(
        "A triangle has three sides.",
        {
            0: "True",
            1: "False"
        },
        0,
        "TrueFalse",
        2
    );

    const mathQuestion5Id = createQuestion(
        "What is the square root of 81?",
        {
            0: "7",
            1: "8",
            2: "9",
            3: "10"
        },
        2,
        "MCQ",
        2
    );

    const mathQuestionIds = [
        mathQuestion1Id,
        mathQuestion2Id,
        mathQuestion3Id,
        mathQuestion4Id,
        mathQuestion5Id
    ];


    // ==================================================
    // JAVASCRIPT QUESTIONS
    // ==================================================

    const jsQuestion1Id = createQuestion(
        "Which keyword creates a variable that can change?",
        {
            0: "let",
            1: "const",
            2: "return",
            3: "function"
        },
        0,
        "MCQ",
        2
    );

    const jsQuestion2Id = createQuestion(
        "Which method converts JSON text into an object?",
        {
            0: "JSON.stringify",
            1: "JSON.parse",
            2: "JSON.convert",
            3: "JSON.object"
        },
        1,
        "MCQ",
        2
    );

    const jsQuestion3Id = createQuestion(
        "JavaScript array indexes start at zero.",
        {
            0: "True",
            1: "False"
        },
        0,
        "TrueFalse",
        2
    );

    const jsQuestion4Id = createQuestion(
        "Which method adds an item to the end of an array?",
        {
            0: "pop",
            1: "push",
            2: "shift",
            3: "slice"
        },
        1,
        "MCQ",
        2
    );

    const jsQuestion5Id = createQuestion(
        "localStorage stores values as strings.",
        {
            0: "True",
            1: "False"
        },
        0,
        "TrueFalse",
        2
    );

    const jsQuestionIds = [
        jsQuestion1Id,
        jsQuestion2Id,
        jsQuestion3Id,
        jsQuestion4Id,
        jsQuestion5Id
    ];


    // ==================================================
    // EXAMS
    // ==================================================

    const mathExamId = createExam(
        "Mathematics Exam",
        "2026-07-10T10:00",
        "Active",
        mathQuestionIds
    );

    const javascriptExamId = createExam(
        "JavaScript Basics Exam",
        "2026-07-15T10:00",
        "Active",
        jsQuestionIds
    );


    // ==================================================
    // MATHEMATICS RESULTS
    // Five students attempt the same exam
    // ==================================================

    const student1MathResultId = createResult(
        student1Id,
        mathExamId,
        [1, 2, 1, 0, 2],
        mathQuestionIds
    );

    const student2MathResultId = createResult(
        student2Id,
        mathExamId,
        [1, 2, 1, 1, 2],
        mathQuestionIds
    );

    const student3MathResultId = createResult(
        student3Id,
        mathExamId,
        [1, 2, 1, 0, 2],
        mathQuestionIds
    );

    const student4MathResultId = createResult(
        student4Id,
        mathExamId,
        [1, 0, 1, 1, 2],
        mathQuestionIds
    );

    const student5MathResultId = createResult(
        student5Id,
        mathExamId,
        [0, 2, 0, 0, 2],
        mathQuestionIds
    );


    // ==================================================
    // JAVASCRIPT RESULTS
    // The same five students attempt the second exam
    // ==================================================

    const student1JsResultId = createResult(
        student1Id,
        javascriptExamId,
        [0, 1, 0, 1, 0],
        jsQuestionIds
    );

    const student2JsResultId = createResult(
        student2Id,
        javascriptExamId,
        [0, 1, 0, 0, 0],
        jsQuestionIds
    );

    const student3JsResultId = createResult(
        student3Id,
        javascriptExamId,
        [0, 1, 0, 1, 1],
        jsQuestionIds
    );

    const student4JsResultId = createResult(
        student4Id,
        javascriptExamId,
        [0, 0, 0, 1, 1],
        jsQuestionIds
    );

    const student5JsResultId = createResult(
        student5Id,
        javascriptExamId,
        [1, 0, 1, 1, 0],
        jsQuestionIds
    );


}


seedData();