
var words = [];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

var mode = $('#mode').val();
function changeHTML(word, meaning, sentence, sentence_kor, split_blank, i){
  
  var totalHTML = ""
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

$(function() {
  var fileName = "./504words_week1.csv";

  // 파일 이름
  var parseName = "";	// 파일 이름 + 숫자 (var -> int 할거)
  var parse = 0; 		// var형 i를 정수로 변환시킨 값을 담을 변수

  makePage(fileName, parseName);

  

});

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
            value[j] = value[j].replace("/", ",");
            value[j] = value[j].replace("@", "'");
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
    $('#textArea').html("");
    makePage("./504words_week1.csv", "");
  }
  else{
    if ($('#blank' + n).val() == words[n]) {
      $('#blank' + n).css("color", "blue");
    }
    else {
      $('#blank' + n).css("color", "red");
    }
    if(mode != $('#mode').val()){
      mode = $('#mode').val();
    }
  }
}