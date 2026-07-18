import * as db from "../Database.js";

import * as questions from "./htmlComponents.js"


const name = document.querySelectorAll(".profName")

const teacherid = db.getCurrentSession().userId
name.forEach(element => {
    element.innerHTML = db.getTeacher(teacherid).fullName
});

const addQuestionButton = document.getElementById("addQuestionButton");
const questionsContainer = document.getElementById("questionsContainer");

const questionTemplates = {
    "multiple-choice": questions.MCQhtml,
    "multi-select": questions.multiselecthtml,
    "true-false": questions.tofhtlm,
    "short-answer": questions.texthtml
};

addQuestionButton.addEventListener("click", () => {
    questionsContainer.insertAdjacentHTML(
        "beforeend",
        questions.MCQhtml
    );
});

// Delete a question
questionsContainer.addEventListener("click", event => {
    const deleteButton = event.target.closest(".delete-question-button");

    if (!deleteButton) return;

    const questionCard = deleteButton.closest(".question-card");

    if (questionCard) {
        questionCard.remove();
    }
});

// Change the question type
questionsContainer.addEventListener("change", event => {
    const typeSelect = event.target.closest(".question-type-select");

    if (!typeSelect) return;

    const questionCard = typeSelect.closest(".question-card");
    const newQuestionHTML = questionTemplates[typeSelect.value];

    if (questionCard && newQuestionHTML) {
        questionCard.outerHTML = newQuestionHTML;
    }
});


function createQuestionFromCard(card) {
    const textInput = card.querySelector(".question-text-input");
    const pointsInput = card.querySelector(".points-input");
    const typeSelect = card.querySelector(".question-type-select");

    const text = textInput.value.trim();
    const points = Number(pointsInput.value);
    const selectedType = typeSelect.value;

    if (!text) {
        alert("Every question must have question text.");
        return null;
    }

    if (!points || points < 1) {
        alert("Every question must have valid points.");
        return null;
    }

    let options = {};
    let correctAnswer;
    let databaseType;

    // Multiple choice
    if (selectedType === "multiple-choice") {
        const answerInputs = [
            ...card.querySelectorAll(".answer-input")
        ];

        const radioInputs = [
            ...card.querySelectorAll(
                'input[type="radio"]'
            )
        ];

        const checkedRadio = card.querySelector(
            'input[type="radio"]:checked'
        );

        if (!checkedRadio) {
            alert("Select the correct multiple-choice answer.");
            return null;
        }

        answerInputs.forEach((input, index) => {
            options[index] = input.value.trim();
        });

        if (Object.values(options).some(option => option === "")) {
            alert("Please fill in all multiple-choice options.");
            return null;
        }

        correctAnswer = radioInputs.indexOf(checkedRadio);
        databaseType = "MCQ";
    }

    // True or false
    else if (selectedType === "true-false") {
        const checkedAnswer = card.querySelector(
            'input[type="radio"]:checked'
        );

        if (!checkedAnswer) {
            alert("Select True or False.");
            return null;
        }

        options = {
            0: "True",
            1: "False"
        };

        correctAnswer =
            checkedAnswer.value.toLowerCase() === "true"
                ? 0
                : 1;

        databaseType = "TrueFalse";
    }

    // Multi-select
    else if (selectedType === "multi-select") {
        const answerInputs = [
            ...card.querySelectorAll(".answer-input")
        ];

        const checkboxInputs = [
            ...card.querySelectorAll(
                'input[type="checkbox"]'
            )
        ];

        answerInputs.forEach((input, index) => {
            options[index] = input.value.trim();
        });

        if (Object.values(options).some(option => option === "")) {
            alert("Please fill in all multi-select options.");
            return null;
        }

        correctAnswer = checkboxInputs
            .map((checkbox, index) =>
                checkbox.checked ? index : null
            )
            .filter(index => index !== null);

        if (correctAnswer.length === 0) {
            alert("Select at least one correct answer.");
            return null;
        }

        databaseType = "MultiSelect";
    }

    // Short answer
    else if (selectedType === "short-answer") {
        const expectedAnswer = card.querySelector(
            ".short-answer-input"
        ).value.trim();

        if (!expectedAnswer) {
            alert("Enter the expected short answer.");
            return null;
        }

        options = {};
        correctAnswer = expectedAnswer;
        databaseType = "ShortAnswer";
    }

    else {
        alert("Unknown question type.");
        return null;
    }

    return db.createQuestion(
        text,
        options,
        correctAnswer,
        databaseType,
        points
    );
}


const examForm = document.getElementById("examBuilderForm");

examForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("examTitle").value.trim();
    const dateValue = document.getElementById("examDate").value;

    if (!title || !dateValue) {
        alert("Please enter the exam title and date.");
        return;
    }

    const questionCards = document.querySelectorAll(".question-card");

    if (questionCards.length === 0) {
        alert("Please add at least one question.");
        return;
    }

    const dateTime = dateValue.includes("T")
        ? dateValue
        : `${dateValue}T00:00`;

    const status = "Active";

    // Create the exam first with no questions.
    const examId = db.createExam(
        title,
        dateTime,
        status,
        []
    );

    for (const card of questionCards) {
        const questionId = createQuestionFromCard(card);

        if (questionId === null) {
            return;
        }

        db.addQuestionToExam(examId, questionId);
    }

    alert("Exam saved successfully.");

    examForm.reset();
    questionsContainer.innerHTML = "";
});