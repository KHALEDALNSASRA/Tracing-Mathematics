import * as db from "../Database.js";




/* =========================
   Teacher information
========================= */

const teacherId = db.getCurrentSession().userId;
const teacher = db.getTeacher(teacherId);

document.querySelectorAll(".profName").forEach(element => {
    element.textContent = teacher.fullName;
});


/* =========================
   Students table
========================= */

const students = [...db.getAllStudents()];

const tbody = document.getElementById("Student");
const filter = document.getElementById("filter");
const searchBar = document.getElementById("searchBar");

let displayedStudents = [];


function getResults(student) {
    return Array.isArray(student.results)
        ? student.results
        : [];
}


function getLastSubmission(student) {
    const results = getResults(student);
    const lastResultId = results.at(-1);

    if (lastResultId === undefined) {
        return "No submissions";
    }

    const result = db.getResult(lastResultId);

    return result?.submittedAt || "No submissions";
}


function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function loadStudents(studentList) {
    displayedStudents = [...studentList];
    tbody.innerHTML = "";

    if (displayedStudents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="no-students-message">
                    No students found
                </td>
            </tr>
        `;

        return;
    }

    displayedStudents.forEach((student, index) => {
        const results = getResults(student);
        const lastSubmit = getLastSubmission(student);

        tbody.insertAdjacentHTML(
            "beforeend",
            `
                <tr
                    class="student-table-row"
                    data-student-index="${index}"
                    tabindex="0"
                    role="button"
                    aria-label="Open ${escapeHTML(student.fullName)} profile"
                >
                    <td data-label="Student">
                        ${escapeHTML(student.fullName)}
                    </td>

                    <td data-label="Email">
                        ${escapeHTML(student.username)}
                    </td>

                    <td data-label="Last Submit">
                        ${escapeHTML(lastSubmit)}
                    </td>

                    <td data-label="Avg Score">
                        ${Number(student.avgGrade || 0)}%
                    </td>

                    <td data-label="Exams Done">
                        ${results.length}
                    </td>
                </tr>
            `
        );
    });
}


/* =========================
   Search and filtering
========================= */

function updateStudentTable() {
    const searchValue = searchBar.value.trim();
    const filterValue = filter.value;

    let filteredStudents = [...students];

    if (searchValue !== "") {
        try {
            const regex = new RegExp(searchValue, "i");

            filteredStudents = filteredStudents.filter(student => {
                const results = getResults(student);

                return (
                    regex.test(student.fullName || "") ||
                    regex.test(student.username || "") ||
                    regex.test(student.nationalId || "") ||
                    regex.test(student.phoneNumber || "") ||
                    regex.test(String(student.avgGrade ?? "")) ||
                    regex.test(String(results.length))
                );
            });
        } catch (error) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="no-students-message">
                        Invalid search expression
                    </td>
                </tr>
            `;

            displayedStudents = [];
            return;
        }
    }

    if (filterValue === "Highest score") {
        filteredStudents.sort(
            (a, b) => Number(b.avgGrade || 0) - Number(a.avgGrade || 0)
        );
    }

    if (filterValue === "Lowest score") {
        filteredStudents.sort(
            (a, b) => Number(a.avgGrade || 0) - Number(b.avgGrade || 0)
        );
    }

    if (filterValue === "Most exams") {
        filteredStudents.sort(
            (a, b) => getResults(b).length - getResults(a).length
        );
    }

    loadStudents(filteredStudents);
}


filter.addEventListener("change", updateStudentTable);
searchBar.addEventListener("input", updateStudentTable);


/* =========================
   Student popup creation
========================= */

function createStudentPopup() {
    const style = document.createElement("style");

    style.textContent = `
        .student-table-row {
            cursor: pointer;
            transition:
                background-color var(--fast) var(--ease),
                transform var(--fast) var(--ease);
        }

        .student-table-row:hover {
            background-color: var(--primary-tint);
        }

        .student-table-row:focus {
            outline: 2px solid var(--primary);
            outline-offset: -2px;
        }

        .no-students-message {
            height: 90px;
            text-align: center;
            color: #64748b;
        }

        .student-modal {
            position: fixed;
            inset: 0;
            z-index: 5000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(4px);
        }

        .student-modal.open {
            display: flex;
        }

        .student-modal-card {
            width: min(760px, 100%);
            max-height: calc(100vh - 48px);
            overflow-y: auto;
            position: relative;
            border-radius: var(--r-lg);
            background: var(--card);
            box-shadow: var(--shadow-lg);
            animation: openStudentModal 180ms var(--ease);
        }

        @keyframes openStudentModal {
            from {
                opacity: 0;
                transform: translateY(12px) scale(0.98);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .student-modal-header {
            height: 48px;
            background: var(--secondary);
            border-radius: var(--r-lg) var(--r-lg) 0 0;
        }

        .student-modal-close {
            width: 36px;
            height: 36px;
            position: absolute;
            top: 6px;
            right: 8px;
            display: grid;
            place-items: center;
            border: none;
            border-radius: 50%;
            background: transparent;
            color: #fff;
            font-size: 25px;
            line-height: 1;
            cursor: pointer;
        }

        .student-modal-close:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .student-profile-content {
            padding: 26px 32px 32px;
        }

        .student-profile-top {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .student-profile-icon {
            width: 76px;
            height: 76px;
            color: var(--accent);
        }

        .student-profile-role {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 76px;
            padding: 8px 14px;
            border-radius: 999px;
            background: var(--accent-tint);
            color: var(--accent);
            font-size: 11px;
            text-align: center;
        }

        .student-profile-name {
            margin: 15px 0 3px;
            color: var(--text);
            font-size: 25px;
            font-weight: 600;
            text-align: center;
        }

        .student-profile-email {
            margin: 0;
            color: var(--primary);
            font-size: 14px;
            text-align: center;
        }

        .student-profile-divider {
            width: 55%;
            margin: 24px auto;
            border: none;
            border-top: 1px solid var(--border);
        }

        .student-profile-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
        }

        .student-profile-field {
            min-height: 84px;
            padding: 17px;
            border: 1px solid var(--border);
            border-radius: var(--r-md);
            background: var(--bg);
        }

        .student-profile-label {
            display: block;
            margin-bottom: 15px;
            color: #64748b;
            font-size: 11px;
        }

        .student-profile-value {
            color: var(--text);
            font-size: 13px;
            overflow-wrap: anywhere;
        }

        @media (max-width: 620px) {
            .student-modal {
                padding: 12px;
            }

            .student-profile-content {
                padding: 22px 16px;
            }

            .student-profile-role {
                position: static;
                margin-top: 12px;
            }

            .student-profile-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .student-profile-divider {
                width: 85%;
            }
        }
    `;

    document.head.appendChild(style);

    const modal = document.createElement("div");

    modal.className = "student-modal";
    modal.id = "studentProfileModal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <section
            class="student-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="studentModalName"
        >
            <div class="student-modal-header"></div>

            <button
                class="student-modal-close"
                id="closeStudentModal"
                type="button"
                aria-label="Close student profile"
            >
                &times;
            </button>

            <div class="student-profile-content">

                <div class="student-profile-top">

                    <svg
                        class="student-profile-icon"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="9" r="3.2"></circle>
                        <path d="M5.8 19c1.1-3.4 3.2-5.1 6.2-5.1s5.1 1.7 6.2 5.1"></path>
                    </svg>

                    <span class="student-profile-role">
                        Student
                    </span>

                    <h2
                        class="student-profile-name"
                        id="studentModalName"
                    ></h2>

                    <p
                        class="student-profile-email"
                        id="studentModalEmail"
                    ></p>

                </div>

                <hr class="student-profile-divider">

                <div class="student-profile-grid">

                    <div class="student-profile-field">
                        <span class="student-profile-label">
                            National ID
                        </span>

                        <span
                            class="student-profile-value"
                            id="studentModalNationalId"
                        ></span>
                    </div>

                    <div class="student-profile-field">
                        <span class="student-profile-label">
                            Email
                        </span>

                        <span
                            class="student-profile-value"
                            id="studentModalEmailField"
                        ></span>
                    </div>

                    <div class="student-profile-field">
                        <span class="student-profile-label">
                            Mobile number
                        </span>

                        <span
                            class="student-profile-value"
                            id="studentModalPhone"
                        ></span>
                    </div>

                    <div class="student-profile-field">
                        <span class="student-profile-label">
                            Average score
                        </span>

                        <span
                            class="student-profile-value"
                            id="studentModalAverage"
                        ></span>
                    </div>

                    <div class="student-profile-field">
                        <span class="student-profile-label">
                            Exams completed
                        </span>

                        <span
                            class="student-profile-value"
                            id="studentModalExams"
                        ></span>
                    </div>

                    <div class="student-profile-field">
                        <span class="student-profile-label">
                            Last submission
                        </span>

                        <span
                            class="student-profile-value"
                            id="studentModalLastSubmit"
                        ></span>
                    </div>

                </div>

            </div>
        </section>
    `;

    document.body.appendChild(modal);

    return modal;
}


const studentModal = createStudentPopup();
const closeStudentModalButton =
    document.getElementById("closeStudentModal");

let previousBodyOverflow = "";


function getStudentNationalId(student) {
    return (
        student.nationalId ??
        student.nationalID ??
        student.idNumber ??
        student.studentId ??
        student.id ??
        "Not available"
    );
}


function getStudentPhone(student) {
    return (
        student.phoneNumber ??
        student.mobileNumber ??
        student.mobile ??
        student.phone ??
        "Not available"
    );
}


function openStudentModal(student) {
    const results = getResults(student);

    document.getElementById("studentModalName").textContent =
        student.fullName || "Student";

    document.getElementById("studentModalEmail").textContent =
        student.username || "Email not available";

    document.getElementById("studentModalNationalId").textContent =
        getStudentNationalId(student);

    document.getElementById("studentModalEmailField").textContent =
        student.username || "Not available";

    document.getElementById("studentModalPhone").textContent =
        getStudentPhone(student);

    document.getElementById("studentModalAverage").textContent =
        `${Number(student.avgGrade || 0)}%`;

    document.getElementById("studentModalExams").textContent =
        results.length;

    document.getElementById("studentModalLastSubmit").textContent =
        getLastSubmission(student);

    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    studentModal.classList.add("open");
    studentModal.setAttribute("aria-hidden", "false");

    closeStudentModalButton.focus();
}


function closeStudentModal() {
    studentModal.classList.remove("open");
    studentModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = previousBodyOverflow;
}


/* Open student popup when a row is clicked */

tbody.addEventListener("click", event => {
    const row = event.target.closest(".student-table-row");

    if (!row) return;

    const studentIndex = Number(row.dataset.studentIndex);
    const selectedStudent = displayedStudents[studentIndex];

    if (selectedStudent) {
        openStudentModal(selectedStudent);
    }
});


/* Support opening the student with Enter or Space */

tbody.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    const row = event.target.closest(".student-table-row");

    if (!row) return;

    event.preventDefault();

    const studentIndex = Number(row.dataset.studentIndex);
    const selectedStudent = displayedStudents[studentIndex];

    if (selectedStudent) {
        openStudentModal(selectedStudent);
    }
});


/* Close popup */

closeStudentModalButton.addEventListener(
    "click",
    closeStudentModal
);

studentModal.addEventListener("click", event => {
    if (event.target === studentModal) {
        closeStudentModal();
    }
});

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        studentModal.classList.contains("open")
    ) {
        closeStudentModal();
    }
});


/* Initial table load */

loadStudents(students);