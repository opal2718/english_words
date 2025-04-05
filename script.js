var minLessonsList = [null, 1, -33, 1];
var maxLessonsList = [null, 7, 28, 4];
var directory_grade = [null, "./csvs/Grade1/Word_Master_week", "./csvs/Grade2/504words_lesson", "./csvs/Grade3/HackersTEPS_Day"];
var directory_grade_appendix = [null, null, "./csvs/Grade2/appendix", null];
var grade = 2718;
var words = [];
var meanings = [];
var sentences = [];
var sentences_kor = [];
var split_blanks_1 = [];
var split_blanks_2 = [];
var answers = [];
var buttons = ["Answer", "Quiz", "Words", "Quiz_Korean", "Quiz_Korean_First", "Quiz_Reversed"]
var related = [];
// Answer Words Quiz_Korean Quiz_Reversed Quiz Quiz_Korean_First
var mode = "Answer";
var doShuffle = true;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function shuffleWords(){
  var empty = [];
  
  var Twords = [];
  var Tmeanings = [];
  var Tsentences = [];
  var Tsentences_kor = [];
  var Tsplit_blanks_1 = [];
  var Tsplit_blanks_2 = [];
  var Tanswers = [];

  //shuffle words
  var emptyI = 0;
  for(emptyI = 0; emptyI < words.length; emptyI++){
    empty.push(emptyI);
    Twords.push(words[emptyI]);
    Tmeanings.push(meanings[emptyI]);
    Tsentences.push(sentences[emptyI]);
    Tsentences_kor.push(sentences_kor[emptyI]);
    Tsplit_blanks_1.push(split_blanks_1[emptyI]);
    Tsplit_blanks_2.push(split_blanks_2[emptyI]);
    Tanswers.push(answers[emptyI]);
  }
  if(doShuffle) shuffle(empty);
  for(emptyI = 0; emptyI < words.length; emptyI++){
    words[emptyI] = Twords[empty[emptyI]];
    meanings[emptyI] = Tmeanings[empty[emptyI]];
    sentences[emptyI] = Tsentences[empty[emptyI]];
    sentences_kor[emptyI] = Tsentences_kor[empty[emptyI]];
    split_blanks_1[emptyI] = Tsplit_blanks_1[empty[emptyI]];
    split_blanks_2[emptyI] = Tsplit_blanks_2[empty[emptyI]];
    answers[emptyI] = Tanswers[empty[emptyI]];
  }
}
function changeHTML(){
  var totalHTML = "";
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

function alterGrade(target){
  grade = target
  document.title = "Hello Words! | Grade "+target;
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

function makePage(fileName, parseName){
  //why am I using this meaningless for loop..?
  for (var i = 1; i < 2; i++) {
    parse = parseInt(i);
    parseName = fileName;// + parse + '.csv';	// 파일 경로 + sequence + 확장자

    //what is this $.ajax for..?
    $.ajax({
      url: parseName,
      dataType: 'text',
      success: function(data) {
        var allRow = data;
        var rows = allRow.split("\n");

        shuffle(rows);
        for (var i = 0; i < rows.length; i++) {
          //data preprocessing
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
    if(!$("#check"+grade+"_"+lessonN).is(":checked")) continue; //ignore data that are not selected

    //select the source file
    if(grade == 1 && (lessonN == 1 || lessonN == 4)) continue;//없는 데이터 예외처리
    var thisfile = fileName+String(lessonN)+".csv";
    //word lists out of the books
    if(lessonN <= 0){
      if(directory_grade_appendix[grade] == null) {console.error("there doesn't exist such a word list"); break;}
      if(-6 < lessonN && lessonN < 0) thisfile = "grade2_s1_mid_"+String(-lessonN);
      else if(-14 < lessonN && lessonN < -6) thisfile = "grade2_s1_mid_info_"+String(-lessonN-6)
      else if(-21 <= lessonN && lessonN <= -17) thisfile = ".grade2_s1_final_"+String(-lessonN-16);
      else {switch(lessonN){
        case -6: thisfile = "grade2_s1_mid_munhak"; break;
        case -14: thisfile = "grade2_munhak_size"; break;
        case -15: thisfile = "grade2_munhak_generalization"; break;
        case -16: thisfile = "grade2_munhak_urgency"; break;
        case -22: thisfile = "Midterm1"; break;
        case -23: thisfile = "Midterm_Important"; break;
        case -24: thisfile = "Midterm1_abc"; break;
        case -25: thisfile = "Midterm1_de"; break;
        case -26: thisfile = "Midterm1_f2n"; break;
        case -27: thisfile = "Midterm1_opq"; break;
        case -28: thisfile = "Midterm1_r"; break;
        case -29: thisfile = "Midterm1_s"; break;
        case -30: thisfile = "Midterm1_t2z"; break;
        case -31: thisfile = "Midterm1_added1"; break;
        case -32: thisfile = "Biology_Words"; break;
        case -33: thisfile = "grade2_s2_final"; break;
      }}
      thisfile = directory_grade_appendix[grade]+thisfile+".csv";
    }
    makePage(thisfile, "");
  }
  setTimeout(() => {
    //alert(words.length);
    shuffleWords();
    sentencess += changeHTML();
    $('#textArea').append(sentencess + "<br>");
  }, 500);
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
      var changeOps = true;
      if(answerV[answerV.length-2] == ":"){
        guessing = answerV[answerV.length-1];
        answerV = (answerV.slice(0, answerV.length-2)).trim();
        changeOps = false;
      }
      if(answerV[answerV.length-1] == ":"){
        answerV = (answerV.slice(0, answerV.length-1)).trim();
        changeOps = false;
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
        if(changeOps){
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
        }
      }
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
      });
    }
  }
  //mode alteration
  for(let i = 0; i < buttons.length; i++){
    $("#"+buttons[i]).click(function(){
      mode = buttons[i];
      for(let j = 0; j < buttons.length; j++){
        if(i == j){
          $("#"+buttons[j]).css("border", "thin solid black")
          continue;
        }
        $("#"+buttons[j]).css("border", "none");
      }
      $('#textArea').html("");
      addWords();
    });
  }
  $(".gradeBox").on("toggle", function() {
    if ($(this).prop("open")) {
      $(this).css("border", "thin solid black");
    } else {
      $(this).css("border", "none");
    }
  });
  $("#head_float").change(function(){
    if($("#head_float").is(":checked")){
      alert("메뉴 상단 고정 기능은 가로 화면에서만 사용하기를 권장합니다.\n[모든 메뉴 확대/축소] 버튼을 눌러 상단 메뉴바의 크기를 줄일 수 있습니다.")
      $('#headering').css(
        {"background-color": "#eeeeee", 
          "position": "fixed",
          "left":"10%",
          "right":"10%",
          "z-index": "1000"
        });
      $('#margining').css(
        {"margin-top": "25%"
        });
    }else{
      $('#headering').css(
        {"background-color": "#eeeeee", 
          "position": "static",
          "left":"auto",
          "right":"auto",
          "z-index": "1000"
        });
        $('#margining').css(
          {"margin-top": "0%"
          });
    }
  })
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
  grade = "❤️";
  alterGrade(grade);
  buttonInit();
  SetDday();
  window.addEventListener("keydown", (e) => {
    if (e.key == "F2") newSet();
  });
  newSet();
  $("#"+mode).click();
}
Initiate();