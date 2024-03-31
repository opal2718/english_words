var maxLessons_1 = 3;
var maxLessons_2 = 8;
var maxLessons_3 = 1;
var grade = 2;
var words = [];
var meanings = [];
var sentences = [];
var sentences_kor = [];
var split_blanks_1 = [];
var split_blanks_2 = [];
var answers = [];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

var mode = "Answer";
function changeHTML(){
  var totalHTML = "";
  for(var i = 0; i < words.length; i++){
    if (mode == "Answer") {
      totalHTML += ("<b>" + words[i] + "</b>" + "<br>");
      totalHTML += (meanings[i] + "<br><br>");
      totalHTML += (sentences[i] + "<br>");
      totalHTML += (sentences_kor[i] + "<br><br><br>");

    }
    else if (mode == "Quiz_Korean") {
      totalHTML += ((i+1)+". "+split_blanks_1[i] + '<input value="'+answers[i][0]+'" autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blanks_2[i] + "<br>");
      totalHTML += ("&nbsp;&nbsp;"+sentences_kor[i] + "<br><br><br>");
    }
    else if (mode == "Quiz") {
      totalHTML += ((i+1)+". "+split_blanks_1[i] + '<input value="'+answers[i][0]+'" autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blanks_2[i] + "<br><br><br>");
    }
  }
  return totalHTML;

}

var date = new Date();
var year=date.getFullYear(), month=date.getMonth()+1, day=date.getDate(), hour=date.getHours(), minute=date.getMinutes();
var dyear = 2024, dmonth=4, dday=22;
var monthLength=[0,31,29,31,30,31,30,31,31,30,31,30,31];
var dayLeft = dday-day;
for(var leftDI=month; leftDI<dmonth; leftDI++) dayLeft+=monthLength[leftDI];
$("#dday").html("D-"+dayLeft);

$("#answer").change(function(){
  if($("#answer").is(":checked")){
    mode = "Answer";
    $("#quiz").prop("checked", false);
    $("#quiz_korean").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});
$("#quiz").change(function(){
  if($("#quiz").is(":checked")){
    mode = "Quiz";
    $("#answer").prop("checked", false);
    $("#quiz_korean").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});
$("#quiz_korean").change(function(){
  if($("#quiz_korean").is(":checked")){
    mode = "Quiz_Korean";
    $("#quiz").prop("checked", false);
    $("#answer").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});



//모드 변경
$(function() {
  $('#textArea').html("");
  addWords();
});

//단어 세트 변경
for(var j1 = 1; j1 <= maxLessons_1; j1++){
  var temp1 = j1;
  $("#check1_"+temp1).change(function(){
    if($("#check1_"+temp1).is(":checked")){
      grade = 1;
      document.title = "Hello Worlds! | Grade 1";
      for(var k11 = 1; k11 <= maxLessons_2; k11++){
        var temp11 = k11;
        $("#check2_"+temp11).prop("checked", false);
      }
      for(var k12 = 1; k12 <= maxLessons_3; k12++){
        var temp12 = k12;
        $("#check3_"+temp12).prop("checked", false);
      }
    }
    $('#textArea').html("");
    addWords();
  })
}
for(var j2 = 1; j2 <= maxLessons_2; j2++){
  var temp2 = j2;
  $("#check2_"+temp2).change(function(){
    if($("#check2_"+temp2).is(":checked")){
      grade = 2;
      document.title = "Hello Worlds! | Grade 2";
      for(var k21 = 1; k21 <= maxLessons_1; k21++){
        var temp21 = k21;
        $("#check1_"+temp21).prop("checked", false);
      }
      for(var k22 = 1; k22 <= maxLessons_3; k22++){
        var temp22 = k22;
        $("#check3_"+temp22).prop("checked", false);
      }
    }
    $('#textArea').html("");
    addWords();
  })
}
for(var j3 = 1; j3 <= maxLessons_3; j3++){
  var temp3 = j3;
  $("#check3_"+temp3).change(function(){
    if($("#check3_"+temp3).is(":checked")){
      grade = 3;
      document.title = "Hello Worlds! | Grade 3";
      for(var k31 = 1; k31 <= maxLessons_2; k31++){
        var temp31 = k31;
        $("#check2_"+temp31).prop("checked", false);
      }
      for(var k32 = 1; k32 <= maxLessons_1; k32++){
        var temp32 = k32;
        $("#check1_"+temp32).prop("checked", false);
      }
    }
    $('#textArea').html("");
    addWords();
  })
}

function addWords(){
  var fileName = "";

  var maxLessons = 0;
  if(grade == 1) {
    fileName = "./csvs/Word_Master_week";
    maxLessons = maxLessons_1;
  }
  else if(grade == 2) {
    fileName = "./csvs/504words_lesson";
    maxLessons = maxLessons_2;
  }
  else if(grade == 3) {
    fileName = "./csvs/Hackers_TEPS_lesson";
    maxLessons = maxLessons_3;
  }
  words = [];
  meanings = [];
  sentences = [];
  sentences_kor = [];
  split_blanks_1 = [];
  split_blanks_2 = [];
  answers = [];

  var sentencess = "";  
  for(let lessonN = 1; lessonN <= maxLessons; lessonN++){
    if(!$("#check"+grade+"_"+lessonN).is(":checked")) continue;
    if(grade == 1 && lessonN == 1) continue;//없는 데이터 예외처리
    var thisfile = fileName+String(lessonN)+".csv";
    makePage(thisfile, "");
  }
  setTimeout(() => {
    //alert(words.length);

    sentencess += changeHTML();
    $('#textArea').append(sentencess + "<br>");
  }, 500);
}

function makePage(fileName, parseName){
  for (var i = 1; i < 2; i++) {
    parse = parseInt(i);
    parseName = fileName;// + parse + '.csv';	// 파일 경로 + sequence + 확장자

    $.ajax({
      url: parseName,
      dataType: 'text',
      success: function(data) {
        var allRow = data;
        var rows = allRow.split("\n");

        shuffle(rows);
        for (var i = 0; i < rows.length; i++) {
          var value = rows[i].split(",");
          console.log(rows[i]);
          var word = value[0];
          if(word == "") continue;
          for(var j = 1; j <= 4; j++){
            value[j] = value[j].replace(/쉼표/g, ",");
            value[j] = value[j].replace(/따옴표/g, "'");
            while(value[j].indexOf("__") != -1){
              value[j] = value[j].replace("__", "_");
            }
          }
          var meaning = value[1];
          var sentence = value[2];
          var sentence_kor = value[3];
          var blank = value[4];
          var answer = value[6];
          var split_blank = blank.split("_");
          words.push(word);
          meanings.push(meaning);
          sentences.push(sentence);
          sentences_kor.push(sentence_kor);
          split_blanks_1.push(split_blank[0]);
          split_blanks_2.push(split_blank[1]);
          answers.push(answer);

          if(i == 0){
            //alert(value[5]);
            //alert(value[6]);
          }

        }

      }
    });
  }
}

function check(n) {
  //alert($('#blank' + n).val());
  //alert(answers[n]);
  if(n == -1){    
  }
  else{
    if ($('#blank' + n).val().toLowerCase() == answers[n].toLowerCase()) {
      $('#blank' + n).css("color", "blue");
    }
    else {
      $('#blank' + n).css("color", "red");
    }
    if($('#blank' + n).val() == "?"){
      $('#blank' + n).val(answers[n]);
      $('#blank' + n).css("color", "black");
    }
  }
}