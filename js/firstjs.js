/**
 * Created by Administrator on 2016/9/1.
 */
window.onload  = function() {
  function clock() {
    var time = new Date();
    var attime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    document.getElementById("clock").value = attime;
  }

  setInterval(clock, 100);

  function selectRGB() {
    return Math.floor(Math.random() * 256);
  }

  var arr = document.getElementsByClassName("color");

  function setColor() {

    var r = selectRGB();
    var g = selectRGB();
    var b = selectRGB();
    return "rgb(" + r + "," + g + "," + b + ")";

  }

  function changeColor() {
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.backgroundColor = setColor();
    }
  }

  var start = document.getElementById("start");
  var setid;
  start.onclick = function (){
    setid = setInterval(changeColor, 1000);
  };
  var end = document.getElementById("end");
  end.onclick = function () {
    clearInterval(setid);
  };
};



