$(document).ready(function() {
    // Initial array to store selected questions
    var selectedQuestions = [];

    // Function to add a question to the selected questions array
    function addQuestion(question) {
        selectedQuestions.push(question);
        updateSelectedQuestions();
    }

    // Function to remove a question from the selected questions array
    function removeQuestion(question) {
        var index = selectedQuestions.indexOf(question);
        if (index > -1) {
            selectedQuestions.splice(index, 1);
            updateSelectedQuestions();
        }
    }

    // Function to update the display of selected questions
    function updateSelectedQuestions() {
        // Clear the selected questions div
        $('#selectedQuestions').empty();
        
        // Append each question to the selected questions div
        selectedQuestions.forEach(function(question) {
            $('#selectedQuestions').append(`
                <div class="selected-question">
                    <h4>${question.text}</h4>
                    <input type="number" class="marks-input" value="${question.marks}">
                    <input type="number" class="time-input" value="${question.approximate_time}">
                    <button class="remove-button">Remove</button>
                </div>
            `);
        });

        // Add event listener to remove buttons
        $('.remove-button').click(function() {
            var questionText = $(this).parent().find('h4').text();
            removeQuestion({ text: questionText });
        });

        // Add event listener to marks and time inputs
        $('.marks-input, .time-input').change(function() {
            var questionText = $(this).parent().find('h4').text();
            var question = selectedQuestions.find(q => q.text === questionText);
            if (this.className === 'marks-input') {
                question.marks = this.value;
            } else {
                question.approximate_time = this.value;
            }
        });
    }

    // Add event listener to select buttons
    $('.select-button').click(function() {
        var questionDiv = $(this).parent();
        var question = {
            text: questionDiv.find('.question-text').text(),
            marks: questionDiv.find('.marks').text(),
            approximate_time: questionDiv.find('.approximate-time').text()
        };
        addQuestion(question);
    });
});

  // Create the question paper template
    // var questionPaperTemplate = document.createElement("div");
    // questionPaperTemplate.classList.add("questionPaperTemplate","container","mt-3","border");
  
    // selectedQuestionGroups.forEach(function(questionGroup, index) {
    //   var questionGroupElement = document.createElement("div");
    //   questionGroupElement.classList.add("questionGroupTemplate");
  
    //   var questionGroupTitle = document.createElement("h3");
    //   questionGroupTitle.classList.add("card-title");
    //   questionGroupTitle.textContent = "Question Group " + (index + 1);
  
    //   var questionGroupDescription = document.createElement("p");
    //   questionGroupDescription.textContent = "Question Group Description: " + questionGroup.questionDescription;
  
    //   var questionList = document.createElement("ul");
    //   questionList.classList.add("questionList");
  
    //   questionGroup.questions.forEach(function(question, questionIndex) {
    //     var questionItem = document.createElement("li");
    //     questionItem.textContent = "Q" + (questionIndex + 1) + ". " + question.questionText;
  
    //     var marks = document.createElement("p");
    //     marks.classList.add("marks");
    //     marks.textContent = "[Marks: " + question.marks + "]";
  
    //     var answer = document.createElement("p");
    //     answer.textContent = "Ans: " + question.answerText;
  
    //     questionItem.appendChild(marks);
    //     questionItem.appendChild(answer);
    //     questionList.appendChild(questionItem);
    //   });
  
    //   var totalMarks = document.createElement("p");
    //   totalMarks.textContent = "Total Marks: " + questionGroup.totalMarks;
  
    //   var totalTime = document.createElement("p");
    //   totalTime.textContent = "Total Time: " + questionGroup.totalTime;
  
    //   questionGroupElement.appendChild(questionGroupTitle);
    //   questionGroupElement.appendChild(totalMarks);
    //   questionGroupElement.appendChild(totalTime);
    //   questionGroupElement.appendChild(questionGroupDescription);
    //   questionGroupElement.appendChild(questionList);
  
    //   questionPaperTemplate.appendChild(questionGroupElement);
    // });
  
    // // Append the question paper template to the document
    // var container = document.getElementById("questionPaperContainer");
    // container.innerHTML = ""; // Clear previous template
    // container.appendChild(questionPaperTemplate);