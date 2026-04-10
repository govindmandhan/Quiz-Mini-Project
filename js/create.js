/* ============================================================
   create.js – Create Quiz form logic
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initializeData();

  document.getElementById("generateBtn").addEventListener("click", generateQuestionFields);
  document.getElementById("createQuizForm").addEventListener("submit", handleSubmit);
  document.getElementById("createAnotherBtn").addEventListener("click", resetForm);
});

/* ----------------------------------------------------------
   Generate question input blocks based on the number entered
   ---------------------------------------------------------- */
function generateQuestionFields() {
  /* Validate the three required quiz-info fields first */
  var titleInput    = document.getElementById("quizTitle");
  var numInput      = document.getElementById("numQuestions");
  var categoryInput = document.getElementById("quizCategory");
  var valid = true;

  if (!titleInput.value.trim()) {
    titleInput.classList.add("is-invalid");
    valid = false;
  } else {
    titleInput.classList.remove("is-invalid");
  }

  var num = parseInt(numInput.value, 10);
  if (!numInput.value || isNaN(num) || num < 5 || num > 20) {
    numInput.classList.add("is-invalid");
    valid = false;
  } else {
    numInput.classList.remove("is-invalid");
  }

  if (!categoryInput.value) {
    categoryInput.classList.add("is-invalid");
    valid = false;
  } else {
    categoryInput.classList.remove("is-invalid");
  }

  if (!valid) {
    /* Scroll to the first invalid field */
    var first = document.querySelector(".is-invalid");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  /* Build question blocks */
  var container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  for (var i = 1; i <= num; i++) {
    container.appendChild(buildQuestionBlock(i));
  }

  /* Reveal the questions section */
  var section = document.getElementById("questionsSection");
  section.classList.remove("d-none");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ----------------------------------------------------------
   Build a single question block DOM element
   ---------------------------------------------------------- */
function buildQuestionBlock(num) {
  var block = document.createElement("div");
  block.className = "question-block";

  /* Four option rows */
  var optionRows = [0, 1, 2, 3].map(function (i) {
    return (
      '<div class="input-group mb-2">' +
        '<span class="input-group-text" title="Mark as correct answer">' +
          '<input type="radio" class="form-check-input mt-0 correct-radio"' +
                 ' name="correct-' + num + '" value="' + i + '"' +
                 ' aria-label="Option ' + (i + 1) + ' is correct">' +
        '</span>' +
        '<input type="text" class="form-control option-input"' +
               ' placeholder="Option ' + (i + 1) + '" required>' +
        '<div class="invalid-feedback">Please fill in this option.</div>' +
      '</div>'
    );
  }).join("");

  block.innerHTML =
    '<div class="question-block-label">Question ' + num + '</div>' +

    '<div class="mb-3">' +
      '<label class="form-label">Question Text <span class="text-danger">*</span></label>' +
      '<input type="text" class="form-control question-text"' +
             ' placeholder="Enter your question…" required>' +
      '<div class="invalid-feedback">Please enter the question text.</div>' +
    '</div>' +

    '<div class="mb-1">' +
      '<label class="form-label">' +
        'Options <span class="text-danger">*</span>' +
        ' <span class="text-muted fw-normal" style="font-size:0.8rem;">' +
          '– tick the radio button next to the correct answer' +
        '</span>' +
      '</label>' +
      optionRows +
      '<div class="correct-error text-danger d-none" style="font-size:0.85rem;">' +
        'Please select the correct answer.' +
      '</div>' +
    '</div>';

  return block;
}

/* ----------------------------------------------------------
   Handle form submission
   ---------------------------------------------------------- */
function handleSubmit(e) {
  e.preventDefault();

  var valid = true;

  /* --- Quiz info validation --- */
  var titleInput    = document.getElementById("quizTitle");
  var numInput      = document.getElementById("numQuestions");
  var categoryInput = document.getElementById("quizCategory");
  var emailInput    = document.getElementById("creatorEmail");

  if (!titleInput.value.trim()) {
    titleInput.classList.add("is-invalid");
    valid = false;
  } else {
    titleInput.classList.remove("is-invalid");
  }

  var num = parseInt(numInput.value, 10);
  if (isNaN(num) || num < 5 || num > 20) {
    numInput.classList.add("is-invalid");
    valid = false;
  } else {
    numInput.classList.remove("is-invalid");
  }

  if (!categoryInput.value) {
    categoryInput.classList.add("is-invalid");
    valid = false;
  } else {
    categoryInput.classList.remove("is-invalid");
  }

  if (emailInput.value.trim() && !isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add("is-invalid");
    valid = false;
  } else {
    emailInput.classList.remove("is-invalid");
  }

  /* --- Question blocks validation --- */
  var blocks = document.querySelectorAll(".question-block");

  if (blocks.length === 0) {
    /* Questions have not been generated yet */
    alert("Please generate the question fields before saving.");
    return;
  }

  blocks.forEach(function (block) {
    /* Question text */
    var qText = block.querySelector(".question-text");
    if (!qText.value.trim()) {
      qText.classList.add("is-invalid");
      valid = false;
    } else {
      qText.classList.remove("is-invalid");
    }

    /* Each option */
    block.querySelectorAll(".option-input").forEach(function (opt) {
      if (!opt.value.trim()) {
        opt.classList.add("is-invalid");
        valid = false;
      } else {
        opt.classList.remove("is-invalid");
      }
    });

    /* Correct answer selection */
    var correctEl   = block.querySelector(".correct-radio:checked");
    var errorEl     = block.querySelector(".correct-error");
    if (!correctEl) {
      errorEl.classList.remove("d-none");
      valid = false;
    } else {
      errorEl.classList.add("d-none");
    }
  });

  if (!valid) {
    /* Scroll to the first problem */
    var firstProblem = document.querySelector(
      ".is-invalid, .correct-error:not(.d-none)"
    );
    if (firstProblem) {
      firstProblem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  /* --- Build quiz object --- */
  var questions = Array.from(blocks).map(function (block) {
    var questionText = block.querySelector(".question-text").value.trim();
    var options = Array.from(block.querySelectorAll(".option-input")).map(
      function (o) { return o.value.trim(); }
    );
    var correct = parseInt(block.querySelector(".correct-radio:checked").value, 10);
    return { question: questionText, options: options, correct: correct };
  });

  var quiz = {
    id:          generateId(),
    title:       titleInput.value.trim(),
    category:    categoryInput.value,
    description: document.getElementById("quizDescription").value.trim(),
    createdBy: {
      name:  document.getElementById("creatorName").value.trim(),
      email: emailInput.value.trim()
    },
    isCustom:  true,
    questions: questions
  };

  saveQuiz(quiz);

  /* Show success, hide form */
  document.getElementById("createQuizForm").classList.add("d-none");
  document.getElementById("successSection").classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ----------------------------------------------------------
   Reset the form to allow creating another quiz
   ---------------------------------------------------------- */
function resetForm() {
  /* Reset all input values */
  document.getElementById("createQuizForm").reset();

  /* Clear question blocks */
  document.getElementById("questionsContainer").innerHTML = "";
  document.getElementById("questionsSection").classList.add("d-none");

  /* Remove validation classes */
  document.querySelectorAll(".is-invalid").forEach(function (el) {
    el.classList.remove("is-invalid");
  });
  document.querySelectorAll(".correct-error").forEach(function (el) {
    el.classList.add("d-none");
  });

  /* Swap success → form */
  document.getElementById("successSection").classList.add("d-none");
  document.getElementById("createQuizForm").classList.remove("d-none");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ----------------------------------------------------------
   Validate an email address with a basic regex
   ---------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
