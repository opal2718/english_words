
var words = [];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


$(function() {
  var fileName = "./word1.csv";

  // 파일 이름
  var parseName = "";	// 파일 이름 + 숫자 (var -> int 할거)
  var parse = 0; 		// var형 i를 정수로 변환시킨 값을 담을 변수
  var mode = "quiz";



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
          var meaning = String(value[1]).replace("/", ",");
          var sentence = String(value[2]).replace("/", ",");
          var sentence_kor = String(value[3]).replace("/", ",");
          var blank = String(value[4]).replace("/", ",");
          var split_blank = blank.split("_");

          var totalHTML = ""
          if (mode == "ans") {
            totalHTML += ("<b>" + word + "</b>" + "<br>");
            totalHTML += (meaning + "<br><br>");
            totalHTML += (sentence + "<br>");
            totalHTML += (sentence_kor + "<br><br><br>");
          }
          else if (mode == "quiz") {
            totalHTML += (split_blank[0] + '<input onkeyup="check(' + i + ')" type="text" id="blank' + i + '">' + split_blank[1] + "<br>");
          }


          $('#textArea').append(totalHTML + "<br>");
          console.log($('#test'));


        }

      }
    });
  }

});

function check(n) {
  if ($('#blank' + n).val() == words[n]) {
    $('#blank' + n).css("color", "blue");
  }
  else {
    $('#blank' + n).css("color", "red");
  }
}