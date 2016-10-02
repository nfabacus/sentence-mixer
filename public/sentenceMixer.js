"use strict";
function shuffle(myArray) {
  var currentIndex = myArray.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = myArray[currentIndex];
    myArray[currentIndex] = myArray[randomIndex];
    myArray[randomIndex] = temporaryValue;
  }
  return myArray;
}

function split(sentence) {
    if (typeof sentence !== "string"|| /^\s*$/.test(sentence)){
    return false;
  } else {
    var sentenceArr = sentence.split(/\s+/);
    return sentenceArr;
  }
}

function split_sentences(originalArr) {
  var newArr=[];
  originalArr.forEach(function(sentence, index){
    var sentenceArr = split(sentence);
    newArr.push(sentenceArr);
  });
    return newArr;
}

function scramble_SentencesSplit(originalSentencesSplit){
  var newArr=[];
  originalSentencesSplit.forEach(function(sentenceSplit){
    var scrambledSentenceSplit = shuffle(sentenceSplit);
    newArr.push(scrambledSentenceSplit);
  });
  return newArr;
}

function display_questionDiv(sentenceArr, sentenceID) {
  var qNo = sentenceID+1;
  var sentenceHTML = make_sentenceHTML(sentenceArr);
  append_questionDiv(sentenceHTML, sentenceID);
  $( "#sortable"+sentenceID ).sortable();
  $("#checkBtn"+sentenceID).click(function(){
    check_answer(sentenceArr, sentenceID);
  });

  function make_sentenceHTML(sentenceArr) {
    var str ="";
    sentenceArr.forEach(function(word, wordIndex){
        str += "<span class='waves-effect waves-light btn-large wordBox' id='"+wordIndex+"'>"+word+"</span>";
    });
    return str;
  }

  function append_questionDiv(sentenceHTML, sentenceID){
    $("div#questions").append("<div class='singleQuestionDiv'><b>Question No: "+qNo+"</b><p id='sortable"+sentenceID+"'>"+sentenceHTML+"</p><button class='waves-effect waves-light btn checkBtn' id='checkBtn"+sentenceID+"'>Check</button><span id='response"+sentenceID+"'></span></div>");
  };
}

function check_answer(sentenceArr, sentenceID) {
  var originalSentencesSplit = split_sentences(originalSentences);
  var yourAnsByWordId = $( "#sortable"+sentenceID ).sortable('toArray');
  var yourAnsArr = [];
  yourAnsByWordId.forEach(function(wordId){
    yourAnsArr.push(sentenceArr[wordId]);
  });
  if (originalSentencesSplit[sentenceID].join(" ")==yourAnsArr.join(" ")){
    $("#response"+sentenceID).hide();
    $("#response"+sentenceID).html("You are correct!! <i class='material-icons medium icon-green'>done</i>");
    $("#response"+sentenceID).show("fade");
  } else {
    $("#response"+sentenceID).hide();
    $("#response"+sentenceID).html("Try again! <i class='material-icons medium icon-red'>bug_report</i>");
    $("#response"+sentenceID).show("fade");
  }
}

var originalSentences;

function initializeQuiz(sentencesStock) {
  $("div#questions").empty();
  originalSentences = shuffle(sentencesStock);
  var selectedTenQs = originalSentences.slice(0,10);
  var selectedTenQsSplit = split_sentences(selectedTenQs);
  var scrambledSentencesSplit = scramble_SentencesSplit(selectedTenQsSplit);
  scrambledSentencesSplit.forEach(display_questionDiv);
}

initializeQuiz(sentencesStock);

$("#shuffleButton").click(function(){
  initializeQuiz(sentencesStock);
});
