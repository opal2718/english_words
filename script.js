var maxLessons = 2;
var words = [];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

var mode = "Answer";
function changeHTML(word, meaning, sentence, sentence_kor, split_blank, i){
  
  var totalHTML = $('#textArea').val();
  if (mode == "Answer") {
    totalHTML += ("<b>" + word + "</b>" + "<br>");
    totalHTML += (meaning + "<br><br>");
    totalHTML += (sentence + "<br>");
    totalHTML += (sentence_kor + "<br><br><br>");
  }
  else if (mode == "Quiz_Korean") {
    totalHTML += (split_blank[0] + '<input autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blank[1] + "<br>");
    totalHTML += (sentence_kor + "<br><br><br>");
  }
  else if (mode == "Quiz") {
    totalHTML += (split_blank[0] + '<input autocomplete="off" onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blank[1] + "<br><br><br>");
  }


  $('#textArea').append(totalHTML + "<br>");
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
  addWords();
});

//단어 세트 변경
for(var i = 1; i <= maxLessons; i++){
  $('#textArea').html("");
  $("#check"+i).change(function(){
    $('#textArea').html("");
    addWords();
  })
}
function addWords(){
  var fileName = "./csvs/504words_lesson";
  
  for(var i = 1; i <= maxLessons; i++){
    var thisfile = fileName+String(i)+".csv";
    makePage(thisfile, "");
    i++;
  }
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
        console.log(allRow);
        var rows = allRow.split("\n");

        shuffle(rows);
        for (var i = 0; i < rows.length; i++) {
          var value = rows[i].split(",");
          var word = value[0];
          if(word == "") continue;
          words[i] = word;
          for(var j = 1; j <= 4; j++){
            value[j] = value[j].replace(/쉼표/g, ",");
            value[j] = value[j].replace(/따옴표/g, "'");
          }
          var meaning = value[1];
          var sentence = value[2];
          var sentence_kor = value[3];
          var blank = value[4];
          var split_blank = blank.split("_");

          changeHTML(word, meaning, sentence, sentence_kor, split_blank, i);
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