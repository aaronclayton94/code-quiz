// Variables to keep track of quiz score/time/questions
var time = questions.length * 15;
var questionIndex = 0;
var timerId;

var currentTime = document.getElementById("#time");
var timer = document.getElementById("#start");
var startQuiz = document.getElementById("#startQuiz");
var wrapper = document.querySelector(".wrapper");
  
// 15 Seconds per question
var secondsLeft = 75;
// Interval time
var holdInterval = 0;
// Penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");
  
