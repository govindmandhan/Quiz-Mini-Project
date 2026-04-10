/* ============================================================
   categories.js – Render quiz categories and cards
   ============================================================ */

/* Map category names to Bootstrap Icons */
var CATEGORY_ICONS = {
  "Science":          "bi-flask",
  "History":          "bi-clock-history",
  "Technology":       "bi-cpu",
  "Geography":        "bi-globe",
  "General Knowledge": "bi-lightbulb"
};

document.addEventListener("DOMContentLoaded", function () {
  initializeData();
  renderPage();
});

/* ----------------------------------------------------------
   Main render function
   ---------------------------------------------------------- */
function renderPage() {
  var quizzes = getAllQuizzes();

  /* Group quizzes by category, preserving insertion order */
  var grouped = {};
  quizzes.forEach(function (quiz) {
    if (!grouped[quiz.category]) {
      grouped[quiz.category] = [];
    }
    grouped[quiz.category].push(quiz);
  });

  var categories = Object.keys(grouped);

  renderCategoryNav(categories);
  renderQuizSections(categories, grouped);
}

/* ----------------------------------------------------------
   Render the top anchor-link buttons
   ---------------------------------------------------------- */
function renderCategoryNav(categories) {
  var nav = document.getElementById("categoryNav");
  nav.innerHTML = "";

  categories.forEach(function (cat) {
    var anchorId = categoryId(cat);
    var icon = CATEGORY_ICONS[cat] || "bi-tag";

    var link = document.createElement("a");
    link.href = "#" + anchorId;
    link.className = "btn btn-outline-primary btn-sm";
    link.innerHTML = '<i class="bi ' + icon + ' me-1"></i>' + escapeHtml(cat);
    nav.appendChild(link);
  });
}

/* ----------------------------------------------------------
   Render each category section with its quiz cards
   ---------------------------------------------------------- */
function renderQuizSections(categories, grouped) {
  var container = document.getElementById("quizSections");
  container.innerHTML = "";

  categories.forEach(function (cat) {
    var section = document.createElement("section");
    section.className = "category-section";
    section.id = categoryId(cat);

    var icon = CATEGORY_ICONS[cat] || "bi-tag";

    /* Section heading */
    var heading = document.createElement("h2");
    heading.className = "section-heading";
    heading.innerHTML = '<i class="bi ' + icon + '"></i>' + escapeHtml(cat);
    section.appendChild(heading);

    /* Grid row */
    var row = document.createElement("div");
    row.className = "row g-3";

    grouped[cat].forEach(function (quiz) {
      row.innerHTML += buildQuizCard(quiz);
    });

    section.appendChild(row);
    container.appendChild(section);
  });
}

/* ----------------------------------------------------------
   Build the HTML string for a single quiz card column
   ---------------------------------------------------------- */
function buildQuizCard(quiz) {
  var quizUrl = "quiz.html?id=" + encodeURIComponent(quiz.id);
  var questionCount = quiz.questions.length;
  var label = questionCount === 1 ? "question" : "questions";

  return (
    '<div class="col-6 col-md-4 col-lg-3">' +
      '<div class="quiz-card">' +
        '<div class="quiz-card-body">' +
          '<h5>' + escapeHtml(quiz.title) + '</h5>' +
          '<p class="quiz-card-meta">' +
            '<i class="bi bi-question-circle me-1"></i>' +
            questionCount + ' ' + label +
          '</p>' +
          '<a href="' + quizUrl + '" class="btn btn-primary btn-sm w-100 mt-auto">' +
            'Start' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

/* ----------------------------------------------------------
   Utility: convert a category name to a safe HTML id
   ---------------------------------------------------------- */
function categoryId(cat) {
  return "cat-" + cat.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
