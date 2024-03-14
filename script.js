var maxLessons = 2;
var words = [];
var meanings = [];
var sentences = [];
var sentences_kor = [];
var split_blanks_1 = [];
var split_blanks_2 = [];

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
      totalHTML += ((i+1)+". "+split_blanks_1[i] + '<input autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blanks_2[i] + "<br>");
      totalHTML += ("&nbsp;&nbsp;"+sentences_kor[i] + "<br><br><br>");
    }
    else if (mode == "Quiz") {
      totalHTML += ((i+1)+". "+split_blanks_1[i] + '<input autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blanks_2[i] + "<br><br><br>");
    }
  }
  return totalHTML;

}

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
for(var j = 1; j <= maxLessons; j++){
  $("#check"+j).change(function(){
    $('#textArea').html("");
    addWords();
  })
}
function addWords(){
  var fileName = "./csvs/504words_lesson";
  words = [];
  meanings = [];
  sentences = [];
  sentences_kor = [];
  split_blanks_1 = [];
  split_blanks_2 = [];

  var sentencess = "";  
  for(let lessonN = 1; lessonN <= maxLessons; lessonN++){
    if(!$("#check"+lessonN).is(":checked")) continue;
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
        //console.log(allRow);
        var rows = allRow.split("\n");

        shuffle(rows);
        for (var i = 0; i < rows.length; i++) {
          var value = rows[i].split(",");
          var word = value[0];
          if(word == "") continue;
          for(var j = 1; j <= 4; j++){
            value[j] = value[j].replace(/쉼표/g, ",");
            value[j] = value[j].replace(/따옴표/g, "'");
          }
          var meaning = value[1];
          var sentence = value[2];
          var sentence_kor = value[3];
          var blank = value[4];
          var split_blank = blank.split("_");
          words.push(word);
          meanings.push(meaning);
          sentences.push(sentence);
          sentences_kor.push(sentence_kor);
          split_blanks_1.push(split_blank[0]);
          split_blanks_2.push(split_blank[1]);

        }

      }
    });
  }
}

function check(n) {
  if(n == -1){    
  }
  else{
    if ($('#blank' + n).val() == words[n]) {
      $('#blank' + n).css("color", "blue");
    }
    else {
      $('#blank' + n).css("color", "red");
    }
  }
}