function toRoman(num) {
  var romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  var result = '';

  for (var key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      result += key;
      num -= romanNumerals[key];
    }
  }

  return result;
}

function filterQuestions(questionGroup) {
  var questionType = questionGroup.querySelector(".questionType").value;
  var difficulty = questionGroup.querySelector(".filterDifficulty").value;
  var objective = questionGroup.querySelector(".filterObjective").value;
  var time = questionGroup.querySelector(".filterTime").value;
  var marks = questionGroup.querySelector(".filterMarks").value;

  var selectedQuestions = questionGroup.querySelector(".selectedQuestions");
  selectedQuestions.innerHTML = '';

  var matchingQuestions = window.questions.filter(function(question) {
    return question.question_type === questionType &&
      (difficulty === 'all' || question.difficulty_level === difficulty) &&
      (objective === 'all' || question.objective === objective) &&
      (time === 'all' || question.approximate_time.toString() === time) &&
      (marks === 'all' || question.marks.toString() === marks);
  });

  matchingQuestions.forEach(function(question, index) {
    var questionElement = document.createElement("div");
    questionElement.classList.add("card", "mb-2");

    var questionCardBody = document.createElement("div");
    questionCardBody.classList.add("card-body","container");

    // Add a click event listener to the questionCardBody div
    // questionCardBody.addEventListener("click", function () {
    //   var checkbox = this.querySelector('input[type="checkbox"]');
    //   checkbox.checked = !checkbox.checked; // Toggle the checkbox
    // });

    questionCardBody.addEventListener("click", function (event) {
      // Check if the clicked element is the checkbox itself
      if (event.target.nodeName === "INPUT" && event.target.type === "checkbox") {
        return; // Do nothing if the clicked element is the checkbox
      }
      
      var checkbox = this.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked; // Toggle the checkbox
    });

    var questionRow = document.createElement("div");
    questionRow.classList.add("row");

    var questionTextCol = document.createElement("div");
    questionTextCol.classList.add("col-10","font-weight-bold");

    var questionText = document.createElement("p");
    questionText.textContent = "Q"+ (index + 1) + ". "+ question.question_text;
    questionTextCol.appendChild(questionText);

    var questionMarksCol = document.createElement("div");
    questionMarksCol.classList.add("col-2","font-weight-bold");

    var questionMarks = document.createElement("p");
    questionMarks.textContent = "Marks: " + question.marks; // Display marks
    questionMarksCol.appendChild(questionMarks);

    var answerText = document.createElement("p");
    answerText.textContent = "Ans: "+ question.answer_text;
    questionCardBody.appendChild(answerText);

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = question.id;
    checkbox.name = "selectedQuestions";
    questionCardBody.appendChild(checkbox);

    questionRow.appendChild(questionTextCol);
    questionRow.appendChild(questionMarksCol);

    questionCardBody.appendChild(questionRow);
    questionCardBody.appendChild(answerText);
    questionCardBody.appendChild(checkbox);

    questionElement.appendChild(questionCardBody);
    selectedQuestions.appendChild(questionElement);
  });
}

document.getElementById("addQuestionGroupButton").addEventListener("click", function() {
  var questionGroupContainer = document.getElementById("questionGroupContainer");
  var questionGroupTemplate = document.getElementById("questionGroupTemplate");
  var questionGroup = questionGroupTemplate.content.cloneNode(true); // directly clone the template content
  
  questionGroupContainer.appendChild(questionGroup);  // Append the questionGroup first
  
  var questionTypeElement = questionGroupContainer.lastElementChild.querySelector(".questionType"); // refer to the last appended element to set up the event listener
  console.log(questionTypeElement);
  
  questionTypeElement.addEventListener("change", function() {
      filterQuestions(questionGroupContainer.lastElementChild);
  });

  questionGroupContainer.lastElementChild.querySelector(".filterDifficulty").addEventListener("change", function() {
      filterQuestions(questionGroupContainer.lastElementChild);
  });
  questionGroupContainer.lastElementChild.querySelector(".filterObjective").addEventListener("change", function() {
      filterQuestions(questionGroupContainer.lastElementChild);
  });
  questionGroupContainer.lastElementChild.querySelector(".filterTime").addEventListener("change", function() {
      filterQuestions(questionGroupContainer.lastElementChild);
  });
  questionGroupContainer.lastElementChild.querySelector(".filterMarks").addEventListener("change", function() {
      filterQuestions(questionGroupContainer.lastElementChild);
  });
  

  questionGroupContainer.appendChild(questionGroup);
});


function submitQuestions() {
    var questionGroupContainer = document.getElementById("questionGroupContainer");
    var questionGroups = questionGroupContainer.getElementsByClassName("questionGroup");
  
    var selectedQuestionGroups = []; // Array to store selected question IDs and additional information for each question group
    var questionPaperTotalMarks = 0;
    var questionPaperTotalTime = 0;
    var examHeadInput = document.getElementById("examHead");
    var examHeader = examHeadInput.value;
  
    for (var i = 0; i < questionGroups.length; i++) {
      var questionGroup = questionGroups[i];
  
      // Retrieve the selected questions for the current question group
      var selectedQuestions = questionGroup.querySelectorAll('input[name="selectedQuestions"]:checked');
  
      // Retrieve the total marks, question description, and total time for the current question group
      var totalMarksInput = questionGroup.querySelector('input[name="totalMarks"]');
      var totalMarks = parseInt(totalMarksInput.value) || 0;
      var questionDescriptionInput = questionGroup.querySelector('input[name="questionDescription"]');
      var questionDescription = questionDescriptionInput.value;
      var totalTimeInput = questionGroup.querySelector('input[name="totalTime"]');
      var totalTime = parseInt(totalTimeInput.value) || 0;
  
      var selectedQuestionData = Array.from(selectedQuestions).map(function(checkbox) {
        var questionElement = checkbox.parentNode.parentNode;
        var questionText = questionElement.querySelector(".col-10.font-weight-bold p").textContent.replace(/^Q\d+\.\s+/, ""); // Extract the question text
        var questionMarks = parseInt(questionElement.querySelector(".col-2.font-weight-bold p").textContent.replace("Marks: ", "")); // Extract the question marks
        var answerText = questionElement.querySelector(".card-body p").textContent.replace(/^Ans:\s+/, ""); // Extract the answer text

        return {
          questionText: questionText,
          marks: questionMarks,
          answerText: answerText
        };
      });

      var questionGroupData = {
        questions: selectedQuestionData,
        totalMarks: totalMarks,
        questionDescription: questionDescription,
        totalTime: totalTime
      };

      selectedQuestionGroups.push(questionGroupData);
      questionPaperTotalMarks += totalMarks;
      questionPaperTotalTime += totalTime;
    }
  
    // Perform the desired action with the selected question data and additional information for each question group (e.g., send them to the server)
    console.log(selectedQuestionGroups);

var questionPaperTemplate = document.createElement("div");
questionPaperTemplate.classList.add("questionPaperTemplate","card","mt-3");

var questionPaperTitleContainer = document.createElement("div");
questionPaperTitleContainer.classList.add("row","text-center");

var questionPaperTitle = document.createElement("h2");
questionPaperTitle.textContent = examHeader;
questionPaperTitle.classList.add("text-center","mt-3");

var qqtm = document.createElement("div");
qqtm.classList.add("col-6");

var qqtt = document.createElement("div");
qqtt.classList.add("col-6");

var questionGroupTotalMarks = document.createElement("h5");
questionGroupTotalMarks.textContent="Total Marks: "+questionPaperTotalMarks;

var questionGroupTotalTime = document.createElement("h5");
questionGroupTotalTime.textContent="Total Time: "+questionPaperTotalTime+" Min";

qqtm.appendChild(questionGroupTotalMarks);
qqtt.appendChild(questionGroupTotalTime);

var questionHrLine = document.createElement("hr");
var brtag = document.createElement("br");

questionPaperTitleContainer.appendChild(qqtm);
questionPaperTitleContainer.appendChild(qqtt);

questionPaperTemplate.appendChild(questionPaperTitle);
questionPaperTemplate.appendChild(brtag);
questionPaperTemplate.appendChild(brtag);
questionPaperTemplate.appendChild(questionPaperTitleContainer);
questionPaperTemplate.appendChild(questionHrLine);

selectedQuestionGroups.forEach(function(questionGroup, index) {
  var questionGroupElement = document.createElement("div");
  questionGroupElement.classList.add("questionGroupTemplate", "container", "mt-3");

  var questionHead = document.createElement("div");
  questionHead.classList.add("row","card-body","font-weight-bold");

  var titleCol = document.createElement("div");
  titleCol.classList.add("col-8");

  // var questionGroupTitle = document.createElement("p");
  // // questionGroupTitle.classList.add("");
  // questionGroupTitle.textContent = "Question Group " + (index + 1);

  // titleCol.appendChild(questionGroupTitle);

  var totalMarksCol = document.createElement("div");
  totalMarksCol.classList.add("col-2");

  var totalMarks = document.createElement("p");
  totalMarks.textContent = "Total Marks: " + questionGroup.totalMarks;

  totalMarksCol.appendChild(totalMarks);

  var totalTimeCol = document.createElement("div");
  totalTimeCol.classList.add("col-2");

  var totalTime = document.createElement("p");
  totalTime.textContent = "Total Time: " + questionGroup.totalTime;

  totalTimeCol.appendChild(totalTime);

  var questionGroupDescription = document.createElement("p");
  questionGroupDescription.textContent = "Q"+toRoman(index+1)+". "+ questionGroup.questionDescription;

  titleCol.appendChild(questionGroupDescription);
  

  var questionData = document.createElement("div");
  questionData.classList.add("row","card-body");

  questionGroup.questions.forEach(function(question, questionIndex) {
    var questionItem = document.createElement("p");
    questionItem.textContent = "Q" + toRoman(questionIndex + 1) + ". " + question.questionText;

    var marks = document.createElement("span");
    marks.classList.add("marks");
    marks.textContent = " [Marks: " + question.marks + "]";

    var answer = document.createElement("p");
    answer.textContent = "Ans: " + question.answerText;

    questionItem.appendChild(marks);
    questionItem.appendChild(answer);
    questionData.appendChild(questionItem);
  });

  questionHead.appendChild(titleCol);
  questionHead.appendChild(totalMarksCol);
  questionHead.appendChild(totalTimeCol);
  questionGroupElement.appendChild(questionHead);
  questionGroupElement.appendChild(questionData);

  questionPaperTemplate.appendChild(questionGroupElement);
});

// Append the question paper template to the document
var container = document.getElementById("questionPaperContainer");
container.innerHTML = ""; // Clear previous template
container.appendChild(questionPaperTemplate);
  
}
  


