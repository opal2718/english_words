var minLessonsList = [null, 0, -33, 0];
var maxLessonsList = [null, 7, 28, 1];
var directory_grade = [null, "./csvs/Grade1/Word_Master_week", "./csvs/Grade2/504words_lesson", "./csvs/Grade3/Hackers_TEPS_lesson"];
var grade = 2;
var words = [];
var meanings = [];
var sentences = [];
var sentences_kor = [];
var split_blanks_1 = [];
var split_blanks_2 = [];
var answers = [];
var buttons = ["#Answer", "#Quiz", "#Words", "#Quiz_Korean", "#Quiz_Korean_First", "#Quiz_Reversed"]
var mode = "Answer";

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

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

function alterGrade(target){
  grade = target
  document.title = "Hello Words! | Grade "+target;
}

function addWords(){
  var fileName = directory_grade[grade];
  var maxLessons = maxLessonsList[grade];
  var minLessons = minLessonsList[grade];
  
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

function buttonInit(){
  //단어 세트 변경
  for(let grade_temp = 1; grade_temp <= 3; grade_temp++){
    for(let i = minLessonsList[grade_temp]; i <= maxLessonsList[grade_temp]; i++){
      let buttonName = ("#check"+grade_temp+"_"+i);
      $(buttonName).change(function(){
        if($(buttonName).is(":checked")){
          alterGrade(grade_temp)
          for(let j = 1; j <= 3; j++){
            if(grade_temp == j) continue;
            for(let k = minLessonsList[j]; k <= maxLessonsList[j]; k++){
              $("#check"+j+"_"+k).prop("checked", false);
            }
          }
        }
        $('#textArea').html("");
        addWords();
      })
    }
  }
  //mode alteration
  for(let i = 0; i < buttons.length; i++){
    $(buttons[i]).change(function(){
      if($(buttons[i]).is(":checked")){
        mode = buttons[i];
        for(let j = 0; j < buttons.length; j++){
          if(i == j) continue;
          $(buttons[j]).prop("checked", false);
        }
      }
      else mode = "";
      $('#textArea').html("");
      addWords();
    });
  }
}

function SetDday(){
  var date = new Date();
  var year=date.getFullYear(), month=date.getMonth()+1, day=date.getDate(), hour=date.getHours(), minute=date.getMinutes();
  var dyear = 2024, dmonth=10, dday=14;
  var monthLength=[0,31,29,31,30,31,30,31,31,30,31,30,31];
  var dayLeft = dday-day;
  for(var leftDI=month; leftDI<dmonth; leftDI++) dayLeft+=monthLength[leftDI];
  if(dayLeft >= 0) $("#dday").html("D - "+(dayLeft));
  else $("#dday").html("D + "+(-dayLeft));
  //alert("시험 "+dayLeft+"일 남음 ㅋㅋㅋㅋ");
}

//모드 변경
function newSet(){
  $(function() {
    $('#textArea').html("");
    addWords();
  });
}

function Initiate(){
  buttonInit();
  SetDday();
  window.addEventListener("keydown", (e) => {
    if (e.key == "F2") newSet();
  });
  newSet();
}
Initiate();