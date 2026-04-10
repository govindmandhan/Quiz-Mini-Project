/* ============================================================
   quiz.js – Play quiz logic
   ============================================================ */

var currentQuiz   = null;
var answeredCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  initializeData();
  loadQuiz();
});

/* ----------------------------------------------------------
   Load the quiz identified by the URL ?id= parameter
   ---------------------------------------------------------- */
function loadQuiz() {
  var params = new URLSearchParams(window.location.search);
  var quizId = params.get("id");

  if (!quizId) {
    showError();
    return;
  }

  currentQuiz = getQuizById(quizId);

  if (!currentQuiz) {
    showError();
    return;
  }

  /* Update page title */
  document.title = currentQuiz.title + " – QuizHub";

  /* Populate sticky header title */
  document.getElementById("stickyTitle").textContent = currentQuiz.title;

  /* Render the intro block and questions */
  renderIntro();
  renderQuestions();

  /* Wire up buttons */
  document.getElementById("submitBtn").addEventListener("click", submitQuiz);
  document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}

/* ----------------------------------------------------------
   Render the quiz intro (title + description)
   ---------------------------------------------------------- */
function renderIntro() {
  var el = document.getElementById("quizIntro");
  el.innerHTML =
    '<div class="quiz-intro">' +
      '<h2>' + escapeHtml(currentQuiz.title) + '</h2>' +
      (currentQuiz.description
        ? '<p>' + escapeHtml(currentQuiz.description) + '</p>'
        : '') +
    '</div>';
}

/* ----------------------------------------------------------
   Render all question cards
   ---------------------------------------------------------- */
function renderQuestions() {
  var container = document.getElementById("quizContent");
  container.innerHTML = "";
  answeredCount = 0;

  currentQuiz.questions.forEach(function (q, index) {
    var card = document.createElement("article");
    card.className = "question-card";
    card.setAttribute("aria-label", "Question " + (index + 1));

    /* Build option rows HTML */
    var optionsHtml = q.options.map(function (opt, optIndex) {
      var labelId = "label-" + index + "-" + optIndex;
      return (
        '<label class="option-row" id="' + labelId + '">' +
          '<input type="radio" name="q' + index + '" value="' + optIndex + '">' +
          '<span>' + escapeHtml(opt) + '</span>' +
        '</label>'
      );
    }).join("");

    card.innerHTML =
      '<div class="question-label">Question ' + (index + 1) + ' of ' + currentQuiz.questions.length + '</div>' +
      '<div class="question-text">' + escapeHtml(q.question) + '</div>' +
      '<div class="options-group">' + optionsHtml + '</div>';

    /* Listen for option selection on this card */
    card.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        onOptionChange(index);
      });
    });

    container.appendChild(card);
  });

  updateProgress();
}

/* ----------------------------------------------------------
   Handle a radio button change: update visual state + progress
   ---------------------------------------------------------- */
function onOptionChange(questionIndex) {
  /* Remove .selected from all labels in this question */
  var allLabels = document.querySelectorAll(
    '[id^="label-' + questionIndex + '-"]'
  );
  allLabels.forEach(function (lbl) {
    lbl.classList.remove("selected");
  });

  /* Add .selected to the chosen option's label */
  var checked = document.querySelector('input[name="q' + questionIndex + '"]:checked');
  if (checked) {
    var selectedLabel = document.getElementById(
      "label-" + questionIndex + "-" + checked.value
    );
    if (selectedLabel) {
      selectedLabel.classList.add("selected");
    }
  }

  /* Recount total answered questions */
  answeredCount = 0;
  currentQuiz.questions.forEach(function (_, i) {
    if (document.querySelector('input[name="q' + i + '"]:checked')) {
      answeredCount++;
    }
  });

  updateProgress();
}

/* ----------------------------------------------------------
   Update the progress bar and submit button state
   ---------------------------------------------------------- */
function updateProgress() {
  if (!currentQuiz) return;

  var total = currentQuiz.questions.length;
  var pct   = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  var bar = document.getElementById("progressBar");
  bar.style.width = pct + "%";
  bar.parentElement.setAttribute("aria-valuenow", pct);

  document.getElementById("progressLabel").textContent =
    answeredCount + " / " + total + " answered";

  document.getElementById("submitBtn").disabled = answeredCount < total;
}

/* ----------------------------------------------------------
   Score the quiz and show the result
   ---------------------------------------------------------- */
function submitQuiz() {
  var score = 0;

  currentQuiz.questions.forEach(function (q, i) {
    var selected = document.querySelector('input[name="q' + i + '"]:checked');
    if (selected && parseInt(selected.value, 10) === q.correct) {
      score++;
    }
  });

  showResult(score, currentQuiz.questions.length);
}

/* ----------------------------------------------------------
   Display the result section
   ---------------------------------------------------------- */
function showResult(score, total) {
  /* Hide quiz UI */
  document.getElementById("quizIntro").classList.add("d-none");
  document.getElementById("quizContent").classList.add("d-none");
  document.getElementById("quizStickyHeader").classList.add("d-none");

  /* Show result section */
  var resultSection = document.getElementById("resultSection");
  resultSection.classList.remove("d-none");

  var pct = Math.round((score / total) * 100);

  /* Choose message and alert type based on score */
  var message, alertClass;
  if (pct === 100) {
    message    = "Perfect score! Outstanding!";
    alertClass = "alert-success";
  } else if (pct >= 80) {
    message    = "Excellent work!";
    alertClass = "alert-success";
  } else if (pct >= 60) {
    message    = "Good job! Keep it up.";
    alertClass = "alert-info";
  } else if (pct >= 40) {
    message    = "Not bad. A bit more practice will help.";
    alertClass = "alert-warning";
  } else {
    message    = "Keep practicing – you can do better!";
    alertClass = "alert-danger";
  }

  document.getElementById("resultAlert").innerHTML =
    '<div class="alert ' + alertClass + ' mb-0" role="alert">' +
      '<strong>' + message + '</strong>' +
    '</div>';

  document.getElementById("resultScore").textContent = score + " / " + total;
  document.getElementById("resultSubtitle").textContent =
    'You scored ' + pct + '% on "' + currentQuiz.title + '"';

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ----------------------------------------------------------
   Reset the quiz so the user can try again
   ---------------------------------------------------------- */
function restartQuiz() {
  document.getElementById("quizIntro").classList.remove("d-none");
  document.getElementById("quizContent").classList.remove("d-none");
  document.getElementById("quizStickyHeader").classList.remove("d-none");
  document.getElementById("resultSection").classList.add("d-none");

  renderQuestions();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ----------------------------------------------------------
   Show the error state when a quiz cannot be found
   ---------------------------------------------------------- */
function showError() {
  document.getElementById("quizStickyHeader").classList.add("d-none");
  document.getElementById("errorSection").classList.remove("d-none");
}
