var maxLessons_1 = 7;
var minLessons_1 = 0;
var maxLessons_2 = 28;
var minLessons_2 = -33;
var maxLessons_3 = 1;
var minLessons_3 = 0;
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
  var empty = [];
  
  var Twords = [];
  var Tmeanings = [];
  var Tsentences = [];
  var Tsentences_kor = [];
  var Tsplit_blanks_1 = [];
  var Tsplit_blanks_2 = [];
  var Tanswers = [];

  var emptyI = 0;
  for(emptyI = 0; emptyI < words.length; emptyI++){
    empty.push(emptyI);
    Twords.push(words[emptyI]);
    Tmeanings.push(meanings[emptyI]);
    Tsentences.push(sentences[emptyI]);
    Tsentences_kor.push(sentences_kor[emptyI]);
    Tsplit_blanks_1.push(split_blanks_1[emptyI]);
    Tsplit_blanks_2.push(split_blanks_2[emptyI]);
    Tanswers.push(answers [emptyI]);
  }
  shuffle(empty);

  for(emptyI = 0; emptyI < words.length; emptyI++){
    words[emptyI] = Twords[empty[emptyI]];
    meanings[emptyI] = Tmeanings[empty[emptyI]];
    sentences[emptyI] = Tsentences[empty[emptyI]];
    sentences_kor[emptyI] = Tsentences_kor[empty[emptyI]];
    split_blanks_1[emptyI] = Tsplit_blanks_1[empty[emptyI]];
    split_blanks_2[emptyI] = Tsplit_blanks_2[empty[emptyI]];
    answers[emptyI] = Tanswers[empty[emptyI]];
  }
  for(var i = 0; i < words.length; i++){
    if (mode == "Answer") {
      totalHTML += ("<b>" + words[i] + "</b>" + "<br>");
      totalHTML += ("뜻:"+meanings[i] + "<br><br>");
      totalHTML += ("예문:"+sentences[i] + "<br>");
      totalHTML += ("예문 번역:"+sentences_kor[i] + "<br><br><hr>");

    }
    if (mode == "Words") {
      totalHTML += ("<b>" + words[i] + "</b>" + "<br><br><hr>");

    }
    else if (mode == "Quiz_Korean") { //뜻 > 단어
      totalHTML += ((i+1)+". "+'<input value="" autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">'+ "<br>");
      totalHTML += (meanings[i] + "<br><br><br>");
    }
    else if (mode == "Quiz_Reversed") {
      totalHTML += ((i+1)+". "+'<input value="" autocomplete="off" onkeyup="check_reversed(' + i + ')" type="text" id="blank' + i + '">'+ "<br>");
      totalHTML += ('<div id="options'+i+'">'+'</div><br>');
      totalHTML += (words[i] + "<br><br><br>");
    }
    else if (mode == "Quiz") {
      totalHTML += ((i+1)+". "+split_blanks_1[i] + '<input value="'+answers[i][0]+'" autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blanks_2[i] + "<br><br><hr>");
    }
    else if (mode == "Quiz_Korean_First") {
      if(sentences[i]==""){
        totalHTML += (words[i] + ": 예문 미등록<br><br><br>");
        continue;
      }
      totalHTML += ((i+1)+". "+split_blanks_1[i] + '<input value="'+answers[i][0]+'" autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blanks_2[i] + "<br>");
      totalHTML += (sentences_kor[i] + "<br><br><br>");
    }
  }
  return totalHTML;

}
var related = [];
function check_reversed(n) {
  //alert($('#blank' + n).val());
  //alert(answers[n]);
  if(n == -1){    
  }
  else{
    var answerV = $('#blank' + n).val();
    check(n);
    if(answerV[0] == ":"){
      var tttt = 0;
      var guessing = -1;
      answerV = (answerV.slice(1)).trim();
      if(answerV[answerV.length-2] == ":"){
        guessing = answerV[answerV.length-1];
        answerV = (answerV.slice(0, answerV.length-2)).trim();
      }
      if(answerV[answerV.length-1] == ":"){
        answerV = (answerV.slice(0, answerV.length-1)).trim();
      }
      if(answerV!="" && answerV!=" "){
        if(guessing >= 0){
          var whichOps = parseInt(guessing, 10);
          if(whichOps >= 0){
            $('#blank' + n).val(related[whichOps]);
            $('#options' + String(n)).html("");
            check_reversed(n);
          }
        }
        related = [];
        for(tttt = 0; tttt < words.length; tttt++){
          if(meanings[tttt].includes(answerV)) {
            related.push(meanings[tttt]);
          }

        }
        shuffle(related);
        var ttttt = 0;
        var optionsArr = "보기: <br>";
        for(ttttt = 0; ttttt < Math.min(related.length, 10); ttttt++){
          optionsArr += "&nbsp;&nbsp;&nbsp;&nbsp;"
          optionsArr += ttttt;
          optionsArr += ": ";
          var tttttS = String(related[ttttt]).replace(/<br>/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
          optionsArr += tttttS;
          optionsArr += "<br>";
        }
        optionsArr += "...";
        $('#options' + String(n)).html("");
        $('#options' + String(n)).append(optionsArr);
        //$('#blank' + n).val(answers[n]);
      }
    }
  }
}

var date = new Date();
var year=date.getFullYear(), month=date.getMonth()+1, day=date.getDate(), hour=date.getHours(), minute=date.getMinutes();
var dyear = 2024, dmonth=10, dday=14;
var monthLength=[0,31,29,31,30,31,30,31,31,30,31,30,31];
var dayLeft = dday-day;
for(var leftDI=month; leftDI<dmonth; leftDI++) dayLeft+=monthLength[leftDI];
if(dayLeft >= 0) $("#dday").html("D - "+(dayLeft));
else $("#dday").html("D + "+(-dayLeft));
//alert("시험 "+dayLeft+"일 남음 ㅋㅋㅋㅋ");

$("#answer").change(function(){
  if($("#answer").is(":checked")){
    mode = "Answer";
    $("#quiz").prop("checked", false);
    $("#words").prop("checked", false);
    $("#quiz_korean").prop("checked", false);
    $("#quiz_korean_first").prop("checked", false);
    $("#quiz_reversed").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});
$("#words").change(function(){
  if($("#words").is(":checked")){
    mode = "Words";
    $("#quiz").prop("checked", false);
    $("#answer").prop("checked", false);
    $("#quiz_korean").prop("checked", false);
    $("#quiz_korean_first").prop("checked", false);
    $("#quiz_reversed").prop("checked", false);
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
    $("#quiz_korean_first").prop("checked", false);
    $("#words").prop("checked", false);
    $("#quiz_reversed").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});
$("#quiz_reversed").change(function(){
  if($("#quiz_reversed").is(":checked")){
    mode = "Quiz_Reversed";
    $("#quiz").prop("checked", false);
    $("#answer").prop("checked", false);
    $("#quiz_korean").prop("checked", false);
    $("#quiz_korean_first").prop("checked", false);
    $("#words").prop("checked", false);
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
    $("#quiz_korean_first").prop("checked", false);
    $("#words").prop("checked", false);
    $("#quiz_reversed").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});
$("#quiz_korean_first").change(function(){
  if($("#quiz_korean_first").is(":checked")){
    mode = "Quiz_Korean_First";
    $("#quiz").prop("checked", false);
    $("#answer").prop("checked", false);
    $("#quiz_korean").prop("checked", false);
    $("#words").prop("checked", false);
    $("#quiz_reversed").prop("checked", false);
  }
  else mode = "";
  $('#textArea').html("");
  addWords();
});


//모드 변경
function newSet(){
  $(function() {
    $('#textArea').html("");
    addWords();
  });
}

newSet();

//단어 세트 변경
for(var j1 = minLessons_1; j1 <= maxLessons_1; j1++){
  var temp1 = j1;
  $("#check1_"+temp1).change(function(){
    if($("#check1_"+temp1).is(":checked")){
      grade = 1;
      document.title = "Hello Words! | Grade 1";
      for(var k11 = minLessons_2; k11 <= maxLessons_2; k11++){
        var temp11 = k11;
        $("#check2_"+temp11).prop("checked", false);
      }
      for(var k12 = minLessons_3; k12 <= maxLessons_3; k12++){
        var temp12 = k12;
        $("#check3_"+temp12).prop("checked", false);
      }
    }
    $('#textArea').html("");
    addWords();
  })
}
for(var j2 = minLessons_2; j2 <= maxLessons_2; j2++){
  var temp2 = j2;
  $("#check2_"+temp2).change(function(){
    if($("#check2_"+temp2).is(":checked")){
      grade = 2;
      document.title = "Hello Words! | Grade 2";
      for(var k21 = minLessons_1; k21 <= maxLessons_1; k21++){
        var temp21 = k21;
        $("#check1_"+temp21).prop("checked", false);
      }
      for(var k22 = minLessons_3; k22 <= maxLessons_3; k22++){
        var temp22 = k22;
        $("#check3_"+temp22).prop("checked", false);
      }
    }
    $('#textArea').html("");
    addWords();
  })
}
for(var j3 = minLessons_3; j3 <= maxLessons_3; j3++){
  var temp3 = j3;
  $("#check3_"+temp3).change(function(){
    if($("#check3_"+temp3).is(":checked")){
      grade = 3;
      document.title = "Hello Words! | Grade 3";
      for(var k31 = minLessons_2; k31 <= maxLessons_2; k31++){
        var temp31 = k31;
        $("#check2_"+temp31).prop("checked", false);
      }
      for(var k32 = minLessons_1; k32 <= maxLessons_1; k32++){
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
  var minLessons = 0;
  if(grade == 1) {
    fileName = "./csvs/Word_Master_week";
    maxLessons = maxLessons_1;
    minLessons = minLessons_1;
  }
  else if(grade == 2) {
    fileName = "./csvs/504words_lesson";
    maxLessons = maxLessons_2;
    minLessons = minLessons_2;
  }
  else if(grade == 3) {
    fileName = "./csvs/Hackers_TEPS_lesson";
    maxLessons = maxLessons_3;
    minLessons = minLessons_3;
  }
  words = [];
  meanings = [];
  sentences = [];
  sentences_kor = [];
  split_blanks_1 = [];
  split_blanks_2 = [];
  answers = [];

  var sentencess = "";  
  for(let lessonN = minLessons; lessonN <= maxLessons; lessonN++){
    if(!$("#check"+grade+"_"+lessonN).is(":checked")) continue;
    if(grade == 1 && (lessonN == 1 || lessonN == 4)) continue;//없는 데이터 예외처리
    if(grade != 2 && lessonN <= 0) continue;//없는 데이터 예외처리
    document.title = "Hello Words! | Grade "+String(grade);
    var thisfile = fileName+String(lessonN)+".csv";
    if(grade == 2){/*
      if(-6 < lessonN && lessonN < 0) thisfile = "./csvs/grade2_s1_mid_"+String(-lessonN)+".csv";
      if(lessonN == -6) thisfile = "./csvs/grade2_s1_mid_munhak.csv";
      if(-14 < lessonN && lessonN < -6) {
        thisfile = "./csvs/grade2_s1_mid_info_"+String(-lessonN-6)+".csv"
        document.title = "Hello 'Worlds!' | Grade 2";
      }
      if(lessonN == -14) thisfile = "./csvs/grade2_munhak_size.csv";
      if(lessonN == -15) thisfile = "./csvs/grade2_munhak_generalization.csv";
      if(lessonN == -16) thisfile = "./csvs/grade2_munhak_urgency.csv";
      if(-21 <= lessonN && lessonN <= -17) thisfile = "./csvs/grade2_s1_final_"+String(-lessonN-16)+".csv";*/
      switch(lessonN){
        case -22: thisfile = "./csvs/Midterm1.csv"; break;
        case -23: thisfile = "./csvs/Midterm_Important.csv"; break;
        case -24: thisfile = "./csvs/Midterm1_abc.csv"; break;
        case -25: thisfile = "./csvs/Midterm1_de.csv"; break;
        case -26: thisfile = "./csvs/Midterm1_f2n.csv"; break;
        case -27: thisfile = "./csvs/Midterm1_opq.csv"; break;
        case -28: thisfile = "./csvs/Midterm1_r.csv"; break;
        case -29: thisfile = "./csvs/Midterm1_s.csv"; break;
        case -30: thisfile = "./csvs/Midterm1_t2z.csv"; break;
        case -31: thisfile = "./csvs/Midterm1_added1.csv"; break;
        case -32: thisfile = "./csvs/Biology_Words.csv"; break;
        case -33: thisfile = "./csvs/grade2_s2_final.csv"; break;
      }
    }
    console.log(thisfile)
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
          if(value[0] == "") continue;
          for(var j = 0; j < value.length; j++){
            value[j] = value[j].replace(/쉼표/g, ",");
            value[j] = value[j].replace(/큰따옴표/g, '"');
            value[j] = value[j].replace(/따옴표/g, "'");
            value[j] = value[j].replace(/엔터/g, "<br>");
            value[j] = value[j].replace(/숫자/g, "");
            while(value[j].indexOf("__") != -1){
              value[j] = value[j].replace("__", "_");
            }
          }
          var word = value[0];
          var meaning = value[1];
          var sentence = value[2];
          var sentence_kor = value[3];
          var blank = value[4];
          var answer = value[6];
          var split_blank = blank.split("_");

          if(value.length >= 8 && value[7] != ""){
            meaning = "*"+meaning;
          }
          if(value.length >= 10 && value[9] != ""){
            meaning += "<br>"+value[9];
          }
          if(value.length >= 11 && value[10] != ""){
            meaning += "<br>synonyms: "+value[10];
            for(var j = 11; j < value.length; j++){
              meaning += ", "+value[j];
            }
          }
          wordSetAdd(word, meaning, sentence, sentence_kor, split_blank, answer);
        }
      }
    });
  }
}

function wordSetAdd(word, meaning, sentence, sentence_kor, split_blank, answer){
  words.push(word);
  meanings.push(meaning);
  sentences.push(sentence);
  sentences_kor.push(sentence_kor);
  split_blanks_1.push(split_blank[0]);
  split_blanks_2.push(split_blank[1]);
  if(mode == "Quiz_Reversed") answers.push(meaning);
  else answers.push(answer);
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



window.addEventListener("keydown", (e) => {
  if (e.key == "F2") newSet();
});