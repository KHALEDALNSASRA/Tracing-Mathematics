import * as db from "../Database.js";
 
const questionCounterEl = document.getElementById("currentQuestionNumber");
const totalQuestionsEl = document.getElementById("totalQuestions");
const questionTextEl = document.getElementById("questionText");
const questionHelperEl = document.getElementById("questionHelper");
const answersContainerEl = document.getElementById("answersContainer");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
 
let exam = null;
let questionIds = [];
let questions = [];
let studentAnswers = [];
let currentIndex = 0;
 
const getExamIdFromUrl = () =>
    new URLSearchParams(window.location.search).get("examId");
 
const getStudentId = () => {
    const session = db.getCurrentSession();
    return session ? session.userId : null;
};
 
const loadExamData = (examId) => {
    exam = db.getExam(examId);
    questionIds = exam.questions;
    questions = db.getQuestionsByIds(questionIds);
    studentAnswers = new Array(questions.length).fill(undefined);
};
 
const optionLetter = (index) => String.fromCharCode(65 + index);
 
const renderHelper = (question) => {
    if (question.helper) {
        questionHelperEl.textContent = question.helper;
        questionHelperEl.hidden = false;
    } else {
        questionHelperEl.hidden = true;
        questionHelperEl.textContent = "";
    }
};
 
const renderOptions = (question, selectedOption) => {
    answersContainerEl.innerHTML = "";
 
    Object.entries(question.option).forEach(([optionIndex, optionText]) => {
        const index = Number(optionIndex);
        const isSelected = selectedOption === index;
 
        const optionEl = document.createElement("div");
        optionEl.className = `answer-option${isSelected ? " is-selected" : ""}`;
        optionEl.setAttribute("role", "button");
        optionEl.setAttribute("tabindex", "0");
 
        optionEl.innerHTML = `
            <span class="answer-option__letter">${optionLetter(index)}</span>
            <span class="answer-option__text">${optionText}</span>
        `;
 
        optionEl.addEventListener("click", () => selectAnswer(index));
        optionEl.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectAnswer(index);
            }
        });
 
        answersContainerEl.appendChild(optionEl);
    });
};
 
const updateNavigationButtons = () => {
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === questions.length - 1;
 
    previousBtn.hidden = isFirst;
    nextBtn.hidden = isLast;
    submitBtn.hidden = !isLast;
};
 
const renderQuestion = () => {
    const question = questions[currentIndex];
 
    questionCounterEl.textContent = currentIndex + 1;
    totalQuestionsEl.textContent = questions.length;
    questionTextEl.textContent = question.text;
 
    renderHelper(question);
    renderOptions(question, studentAnswers[currentIndex]);
    updateNavigationButtons();
};
 
const selectAnswer = (optionIndex) => {
    studentAnswers[currentIndex] = optionIndex;
    renderOptions(questions[currentIndex], optionIndex);
};
 
const goToPrevious = () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        renderQuestion();
    }
};
 
const goToNext = () => {
    if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        renderQuestion();
    }
};
 
const getUnansweredQuestions = () =>
    studentAnswers
        .map((answer, index) => (answer === undefined ? index + 1 : null))
        .filter((questionNumber) => questionNumber !== null);
 
const handleSubmit = () => {
    const unanswered = getUnansweredQuestions();
 
    if (unanswered.length > 0) {
        alert(`Please answer all questions before submitting.\nUnanswered: ${unanswered.join(", ")}`);
        return;
    }
 
    const studentId = getStudentId();
    const examId = getExamIdFromUrl();
    const resultId = db.createResult(studentId, examId, studentAnswers, questionIds);
 
    // Update this if your project's results page has a different filename.
    // window.location.href = `student-result.html?resultId=${resultId}`;
};
 
const initExamPage = () => {
    const examId = getExamIdFromUrl();
 
    if (!examId) {
        questionTextEl.textContent = "No exam selected.";
        return;
    }
 
    loadExamData(examId);
 
    if (!questions.length) {
        questionTextEl.textContent = "This exam has no questions.";
        return;
    }
 
    previousBtn.addEventListener("click", goToPrevious);
    nextBtn.addEventListener("click", goToNext);
    submitBtn.addEventListener("click", handleSubmit);
 
    renderQuestion();
};
 
document.addEventListener("DOMContentLoaded", initExamPage);
 