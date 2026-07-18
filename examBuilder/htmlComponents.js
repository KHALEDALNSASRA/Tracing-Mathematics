export const MCQhtml = `<!-- 1. Multiple Choice -->
    <article class="question-card" data-question-type="multiple-choice">

        <header class="question-header">

            <span class="question-number">Q1</span>

            <div class="question-header-actions">

                <select
                    class="question-type-select"
                    name="questionType1"
                    aria-label="Question type"
                >
                    <option value="multiple-choice" selected>
                        Multiple Choice
                    </option>

                    <option value="true-false">
                        True or False
                    </option>

                    <option value="multi-select">
                        Multi-select
                    </option>

                    <option value="short-answer">
                        Short Answer
                    </option>
                </select>

                <label class="points-label" for="questionPoints1">
                    Points:
                </label>

                <input
                    class="points-input"
                    id="questionPoints1"
                    name="questionPoints1"
                    type="number"
                    min="1"
                    value="5"
                >

                <button
                    class="delete-question-button"
                    type="button"
                    aria-label="Delete question"
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 7h16"></path>
                        <path d="M9 7V4h6v3"></path>
                        <path d="M7 7l1 13h8l1-13"></path>
                    </svg>
                </button>

            </div>

        </header>

        <div class="question-body">

            <input
                class="question-text-input"
                name="questionText1"
                type="text"
                value="What is the capital of Jordan?"
                placeholder="Enter your question"
            >

            <p class="question-help">
                Select one correct answer.
            </p>

            <div class="answers-grid">

                <label class="answer-option">
                    <input
                        type="radio"
                        name="correctAnswer1"
                        value="Amman"
                        checked
                    >

                    <input
                        class="answer-input"
                        name="question1Option1"
                        type="text"
                        value="Amman"
                    >
                </label>

                <label class="answer-option">
                    <input
                        type="radio"
                        name="correctAnswer1"
                        value="Aqaba"
                    >

                    <input
                        class="answer-input"
                        name="question1Option2"
                        type="text"
                        value="Aqaba"
                    >
                </label>

                <label class="answer-option">
                    <input
                        type="radio"
                        name="correctAnswer1"
                        value="Irbid"
                    >

                    <input
                        class="answer-input"
                        name="question1Option3"
                        type="text"
                        value="Irbid"
                    >
                </label>

                <label class="answer-option">
                    <input
                        type="radio"
                        name="correctAnswer1"
                        value="Zarqa"
                    >

                    <input
                        class="answer-input"
                        name="question1Option4"
                        type="text"
                        value="Zarqa"
                    >
                </label>

            </div>

        </div>

    </article>`

export const tofhtlm = `<!-- 2. True or False -->
    <article class="question-card" data-question-type="true-false">

        <header class="question-header">

            <span class="question-number">Q2</span>

            <div class="question-header-actions">

                <select
                    class="question-type-select"
                    name="questionType2"
                    aria-label="Question type"
                >
                    <option value="multiple-choice">
                        Multiple Choice
                    </option>

                    <option value="true-false" selected>
                        True or False
                    </option>

                    <option value="multi-select">
                        Multi-select
                    </option>

                    <option value="short-answer">
                        Short Answer
                    </option>
                </select>

                <label class="points-label" for="questionPoints2">
                    Points:
                </label>

                <input
                    class="points-input"
                    id="questionPoints2"
                    name="questionPoints2"
                    type="number"
                    min="1"
                    value="2"
                >

                <button
                    class="delete-question-button"
                    type="button"
                    aria-label="Delete question"
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 7h16"></path>
                        <path d="M9 7V4h6v3"></path>
                        <path d="M7 7l1 13h8l1-13"></path>
                    </svg>
                </button>

            </div>

        </header>

        <div class="question-body">

            <input
                class="question-text-input"
                name="questionText2"
                type="text"
                value="The Earth revolves around the Sun."
                placeholder="Enter your question"
            >

            <p class="question-help">
                Select the correct answer.
            </p>

            <div class="boolean-options">

                <label class="boolean-option">
                    <input
                        type="radio"
                        name="correctAnswer2"
                        value="true"
                        checked
                    >

                    <span>True</span>
                </label>

                <label class="boolean-option">
                    <input
                        type="radio"
                        name="correctAnswer2"
                        value="false"
                    >

                    <span>False</span>
                </label>

            </div>

        </div>

    </article>`

export const multiselecthtml =`    <!-- 3. Multi-select -->
    <article class="question-card" data-question-type="multi-select">

        <header class="question-header">

            <span class="question-number">Q3</span>

            <div class="question-header-actions">

                <select
                    class="question-type-select"
                    name="questionType3"
                    aria-label="Question type"
                >
                    <option value="multiple-choice">
                        Multiple Choice
                    </option>

                    <option value="true-false">
                        True or False
                    </option>

                    <option value="multi-select" selected>
                        Multi-select
                    </option>

                    <option value="short-answer">
                        Short Answer
                    </option>
                </select>

                <label class="points-label" for="questionPoints3">
                    Points:
                </label>

                <input
                    class="points-input"
                    id="questionPoints3"
                    name="questionPoints3"
                    type="number"
                    min="1"
                    value="6"
                >

                <button
                    class="delete-question-button"
                    type="button"
                    aria-label="Delete question"
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 7h16"></path>
                        <path d="M9 7V4h6v3"></path>
                        <path d="M7 7l1 13h8l1-13"></path>
                    </svg>
                </button>

            </div>

        </header>

        <div class="question-body">

            <input
                class="question-text-input"
                name="questionText3"
                type="text"
                value="Which of the following are programming languages?"
                placeholder="Enter your question"
            >

            <p class="question-help">
                Select all correct answers.
            </p>

            <div class="answers-grid">

                <label class="answer-option">
                    <input
                        type="checkbox"
                        name="correctAnswers3"
                        value="JavaScript"
                        checked
                    >

                    <input
                        class="answer-input"
                        name="question3Option1"
                        type="text"
                        value="JavaScript"
                    >
                </label>

                <label class="answer-option">
                    <input
                        type="checkbox"
                        name="correctAnswers3"
                        value="Python"
                        checked
                    >

                    <input
                        class="answer-input"
                        name="question3Option2"
                        type="text"
                        value="Python"
                    >
                </label>

                <label class="answer-option">
                    <input
                        type="checkbox"
                        name="correctAnswers3"
                        value="HTML"
                    >

                    <input
                        class="answer-input"
                        name="question3Option3"
                        type="text"
                        value="HTML"
                    >
                </label>

                <label class="answer-option">
                    <input
                        type="checkbox"
                        name="correctAnswers3"
                        value="Java"
                        checked
                    >

                    <input
                        class="answer-input"
                        name="question3Option4"
                        type="text"
                        value="Java"
                    >
                </label>

            </div>

        </div>

    </article>`

export const texthtml =`    <!-- 4. Short Answer -->
    <article class="question-card" data-question-type="short-answer">

        <header class="question-header">

            <span class="question-number">Q4</span>

            <div class="question-header-actions">

                <select
                    class="question-type-select"
                    name="questionType4"
                    aria-label="Question type"
                >
                    <option value="multiple-choice">
                        Multiple Choice
                    </option>

                    <option value="true-false">
                        True or False
                    </option>

                    <option value="multi-select">
                        Multi-select
                    </option>

                    <option value="short-answer" selected>
                        Short Answer
                    </option>
                </select>

                <label class="points-label" for="questionPoints4">
                    Points:
                </label>

                <input
                    class="points-input"
                    id="questionPoints4"
                    name="questionPoints4"
                    type="number"
                    min="1"
                    value="4"
                >

                <button
                    class="delete-question-button"
                    type="button"
                    aria-label="Delete question"
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 7h16"></path>
                        <path d="M9 7V4h6v3"></path>
                        <path d="M7 7l1 13h8l1-13"></path>
                    </svg>
                </button>

            </div>

        </header>

        <div class="question-body">

            <input
                class="question-text-input"
                name="questionText4"
                type="text"
                value="Explain the difference between let and const."
                placeholder="Enter your question"
            >

            <p class="question-help">
                Enter an example correct answer.
            </p>

            <textarea
                class="short-answer-input"
                name="correctAnswer4"
                placeholder="Enter the expected answer"
            >let allows reassignment, while const does not allow the variable to be reassigned.</textarea>

        </div>

    </article>`