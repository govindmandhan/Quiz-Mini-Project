/* ============================================================
   data.js – Quiz data store and localStorage helpers
   ============================================================ */

const PREDEFINED_QUIZZES = [
  /* ---- Science ---- */
  {
    id: "q1",
    title: "Basic Science",
    category: "Science",
    description: "Test your knowledge of fundamental science concepts.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "What is the chemical symbol for water?",
        options: ["HO", "H2O", "CO2", "O2"],
        correct: 1
      },
      {
        question: "How many bones are in the adult human body?",
        options: ["206", "208", "300", "156"],
        correct: 0
      },
      {
        question: "What is the approximate speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000 km/s"],
        correct: 0
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Venus", "Mercury", "Mars"],
        correct: 2
      },
      {
        question: "What gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 2
      }
    ]
  },
  {
    id: "q2",
    title: "Human Body",
    category: "Science",
    description: "Explore the fascinating science of the human body.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "Which organ pumps blood through the body?",
        options: ["Liver", "Kidney", "Lung", "Heart"],
        correct: 3
      },
      {
        question: "How many chambers does the human heart have?",
        options: ["2", "3", "4", "6"],
        correct: 2
      },
      {
        question: "What is the largest organ of the human body?",
        options: ["Liver", "Skin", "Brain", "Lung"],
        correct: 1
      },
      {
        question: "How many teeth does a healthy adult normally have?",
        options: ["28", "30", "32", "36"],
        correct: 2
      },
      {
        question: "What is the primary function of red blood cells?",
        options: ["Fight infection", "Carry oxygen", "Produce hormones", "Digest food"],
        correct: 1
      }
    ]
  },

  /* ---- History ---- */
  {
    id: "q3",
    title: "World History",
    category: "History",
    description: "Key events and turning points from world history.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
      },
      {
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "Thomas Jefferson", "John Adams", "George Washington"],
        correct: 3
      },
      {
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek", "Ottoman", "Roman", "Byzantine"],
        correct: 2
      },
      {
        question: "In which year did the Berlin Wall fall?",
        options: ["1987", "1989", "1991", "1993"],
        correct: 1
      },
      {
        question: "Which country launched the first artificial satellite into space?",
        options: ["USA", "Germany", "USSR", "UK"],
        correct: 2
      }
    ]
  },
  {
    id: "q4",
    title: "Ancient Civilizations",
    category: "History",
    description: "Discover the wonders of the ancient world.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "Where were the ancient Pyramids of Giza built?",
        options: ["Sudan", "Iraq", "Egypt", "Libya"],
        correct: 2
      },
      {
        question: "What was the writing system of ancient Egypt called?",
        options: ["Cuneiform", "Sanskrit", "Hieroglyphics", "Runes"],
        correct: 2
      },
      {
        question: "Which ancient wonder was located in Alexandria, Egypt?",
        options: ["Hanging Gardens", "Lighthouse", "Colossus", "Statue of Zeus"],
        correct: 1
      },
      {
        question: "The Roman Colosseum was primarily used for?",
        options: ["Trade fairs", "Religious ceremonies", "Gladiatorial combat", "Education"],
        correct: 2
      },
      {
        question: "What was the capital of the ancient Inca Empire?",
        options: ["Lima", "Cuzco", "Quito", "Bogotá"],
        correct: 1
      }
    ]
  },

  /* ---- Technology ---- */
  {
    id: "q5",
    title: "Technology Basics",
    category: "Technology",
    description: "Fundamental concepts in computers and technology.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Utility", "Computing Power Unit"],
        correct: 0
      },
      {
        question: "Which company created the iPhone?",
        options: ["Samsung", "Google", "Apple", "Microsoft"],
        correct: 2
      },
      {
        question: "What does RAM stand for?",
        options: ["Read And Memory", "Random Access Memory", "Rapid Action Mode", "Runtime Application Memory"],
        correct: 1
      },
      {
        question: "Who is widely considered the 'father of computers'?",
        options: ["Alan Turing", "Bill Gates", "Charles Babbage", "Steve Jobs"],
        correct: 2
      },
      {
        question: "What does the acronym 'Wi-Fi' stand for?",
        options: ["Wireless Fidelity", "Wide Frequency", "Wireless Frequency", "Wire-Free Internet"],
        correct: 0
      }
    ]
  },
  {
    id: "q6",
    title: "Internet & Web",
    category: "Technology",
    description: "Test your knowledge of the internet and web technologies.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Transfer Markup Language", "HyperText Markup Language", "High Text Making Language", "Hyperlink Text Machine Language"],
        correct: 1
      },
      {
        question: "What does URL stand for?",
        options: ["Universal Resource Locator", "Unified Reference Link", "Uniform Resource Locator", "Universal Route Link"],
        correct: 2
      },
      {
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correct: 2
      },
      {
        question: "What does CSS stand for?",
        options: ["Computer Style System", "Creative Style Sheets", "Cascading Style Sheets", "Central Style Settings"],
        correct: 2
      },
      {
        question: "Which search engine has the highest global market share?",
        options: ["Bing", "Yahoo", "DuckDuckGo", "Google"],
        correct: 3
      }
    ]
  },

  /* ---- Geography ---- */
  {
    id: "q7",
    title: "World Geography",
    category: "Geography",
    description: "Explore the physical features of our world.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "What is the largest continent by area?",
        options: ["Africa", "Asia", "North America", "Europe"],
        correct: 1
      },
      {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Yangtze", "Mississippi", "Nile"],
        correct: 3
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
      },
      {
        question: "Which country has the largest land area in the world?",
        options: ["China", "USA", "Russia", "Canada"],
        correct: 2
      },
      {
        question: "On which continent is the Sahara Desert located?",
        options: ["Asia", "South America", "Africa", "Australia"],
        correct: 2
      }
    ]
  },
  {
    id: "q8",
    title: "Countries & Capitals",
    category: "Geography",
    description: "How well do you know the world's capital cities?",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2
      },
      {
        question: "What is the capital of Brazil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2
      },
      {
        question: "What is the capital of Japan?",
        options: ["Osaka", "Kyoto", "Hiroshima", "Tokyo"],
        correct: 3
      },
      {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correct: 2
      },
      {
        question: "What is the capital of Argentina?",
        options: ["Buenos Aires", "Montevideo", "Santiago", "Lima"],
        correct: 0
      }
    ]
  },

  /* ---- General Knowledge ---- */
  {
    id: "q9",
    title: "General Knowledge",
    category: "General Knowledge",
    description: "A mix of interesting trivia from various fields.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correct: 1
      },
      {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        correct: 3
      },
      {
        question: "What is the smallest country in the world by area?",
        options: ["Monaco", "Maldives", "Vatican City", "San Marino"],
        correct: 2
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Saturn", "Mars"],
        correct: 3
      },
      {
        question: "How many colors are in a rainbow?",
        options: ["5", "6", "7", "8"],
        correct: 2
      }
    ]
  },
  {
    id: "q10",
    title: "Sports & Games",
    category: "General Knowledge",
    description: "Questions about popular sports and classic games.",
    createdBy: { name: "Admin", email: "" },
    isCustom: false,
    questions: [
      {
        question: "How many players are on a standard soccer (football) team?",
        options: ["9", "10", "11", "12"],
        correct: 2
      },
      {
        question: "In which sport is a shuttlecock used?",
        options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        correct: 1
      },
      {
        question: "How many rings are on the Olympic flag?",
        options: ["3", "4", "5", "6"],
        correct: 2
      },
      {
        question: "How many points is a basketball free throw worth?",
        options: ["1", "2", "3", "4"],
        correct: 0
      },
      {
        question: "In chess, which piece can only move diagonally?",
        options: ["Rook", "Knight", "King", "Bishop"],
        correct: 3
      }
    ]
  }
];

/* ============================================================
   localStorage helpers
   ============================================================ */

/**
 * Populate localStorage with predefined quizzes if none exist yet.
 */
function initializeData() {
  if (!localStorage.getItem("quizzes")) {
    localStorage.setItem("quizzes", JSON.stringify(PREDEFINED_QUIZZES));
  }
}

/**
 * Return all quizzes from localStorage (initializes on first call).
 */
function getAllQuizzes() {
  initializeData();
  return JSON.parse(localStorage.getItem("quizzes"));
}

/**
 * Find and return a single quiz by id, or null if not found.
 */
function getQuizById(id) {
  return getAllQuizzes().find(function(q) { return q.id === id; }) || null;
}

/**
 * Append a new quiz object to the localStorage array.
 */
function saveQuiz(quiz) {
  var quizzes = getAllQuizzes();
  quizzes.push(quiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

/**
 * Generate a unique id for custom quizzes.
 */
function generateId() {
  return "custom_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Escape user-provided strings before injecting into innerHTML.
 */
function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}
