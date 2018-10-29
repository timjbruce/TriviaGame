
const app = document.getElementById('root');

//const logo = document.createElement('img');
//logo.src = 'logo.png';

//const container = document.createElement('div');
//container.setAttribute('class', 'container');

//app.appendChild(logo);
//app.appendChild(container);
const baseuri = 'https://sw5grt00ta.execute-api.us-east-1.amazonaws.com/test/index';
//const baseuri = 'https://gkevx3fe8f.execute-api.us-east-1.amazonaws.com/prod/index';

function selectAnswer(value) {
  var form = document.getElementById('response');
  form.answer.value = value;
  var divA = document.getElementById('divA');
  if (value == "A") { divA.style.borderStyle='double'; divA.style.borderColor='black'} else {divA.style.borderStyle='none'};
  var divB = document.getElementById('divB');
  if (value == "B") { divB.style.borderStyle='double'; divB.style.borderColor='black'} else {divB.style.borderStyle='none'};
  var divC = document.getElementById('divC');
  if (value == "C") { divC.style.borderStyle='double'; divC.style.borderColor='black'} else {divC.style.borderStyle='none'};
  var divD = document.getElementById('divD');
  if (value == "D") { divD.style.borderStyle='double'; divD.style.borderColor='black'} else {divD.style.borderStyle='none'};
  }

function enableState(mode) {
  var nextQuestion = document.getElementById('nextQuestionBtn');
  var checkAnswer = document.getElementById('checkAnswerBtn');
  var response = document.getElementById('divResponse');
  if(mode=="answer"){
    nextQuestion.enabled = false;
    nextQuestion.style.visibility = 'hidden';
    checkAnswer.enabled = true;
    checkAnswer.style.visibility = 'visible';
    response.style.visibility = 'hidden';
  } else {
    nextQuestion.enabled = true;
    nextQuestion.style.visibility = 'visible';
    checkAnswer.enabled = false;
    checkAnswer.style.visibility = 'hidden';
    response.style.visibility = 'visible';
  }


}

function checkAnswer() {
  var form = document.getElementById('response');
  var answer = form.answer.value;
  var qid = form.qid.value;
  if(answer == "") {
    alert('Please select an answer!');
    return;
  }
  var uri = baseuri + '?qid='+qid+'&answer='+answer;
  fetch(uri, {method: 'post'})
      .then(response => {
        if(response.ok) return response.json();
            throw new Error(response.statusText)  // throw an error if there's something wrong with the response
      })
     .then(function handleAnswer(data)
     {
          //console.log(data);
          var rightwrong = document.getElementById('hrightwrong');
          rightwrong.textContent = data.Response;
          var seemore = document.getElementById('hflavortext');
          seemore.textContent = data.Additional;
     });
     enableState('nextQuestion');
}

function retrieveQuestion() {
  fetch(baseuri, {method:"GET"})
      .then(response => {
        if(response.ok) return response.json();
            throw new Error(response.statusText)  // throw an error if there's something wrong with the response
      })
     .then(function setupQuestion(data)
     {
       // Begin accessing JSON data here

         var form = document.getElementById('response');
         form.reset();
         form.answer.value = '';
         var questionID = document.getElementById('qid');
         questionID.value = data.QuestionID.S;
         var question = document.getElementById('questiontext');
         question.textContent = data.Question.S;
         var A = document.getElementById('divA');
         A.text=data.A.S;
         var B = document.getElementById('divB');
         B.text=data.B.S;
         var C = document.getElementById('divC');
         C.text=data.C.S;
         var D = document.getElementById('divD');
         D.text=data.D.S;

         var rightwrong = document.getElementById('hrightwrong');
         rightwrong.textContent = '';
         var seemore = document.getElementById('hflavortext');
         seemore.textContent = '';
         selectAnswer("");
         enableState('answer');

      });
}

retrieveQuestion();
