//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches'

let fields = [
  "fname",
  "lname",
  "dob",
  "tempadd",
  "permadd",
  "tempcity",
  "permcity",
  "temppin",
  "permpin",
  "tempphone",
  "tempmobile",
  "permpphone",
  "permmobile",
  "tempemail",
  "permemail",
  "hobby",
  "org",
  "course",
  "comp",
  "sign",
];

$(".next").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = now * 50 + "%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          transform: "scale(" + scale + ")",
          position: "absolute",
        });
        next_fs.css({ left: left, opacity: opacity });
      },

      duration: 500,
      complete: function () {
        current_fs.hide();
        animating = false;
      },

      //this comes from the custom easing plugin
      easing: "easeInOutBack",
    }
  );
});

$(".previous").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");

  //show the previous fieldset
  previous_fs.show();

  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({ left: left });
        previous_fs.css({
          transform: "scale(" + scale + ")",
          opacity: opacity,
        });
      },
      duration: 600,
      complete: function () {
        current_fs.hide();
        animating = false;
      },

      easing: "easeInOutBack",
    }
  );
});

$(".submit").click(function (e) {
  e.preventDefault(e);
  data = {};
  for (let i = 0; i < fields.length; i++) {
    data[fields[i]] = $(`#${fields[i]}`).val();
  }
  data["rollNum"] = "63110";
  data["sex"] = "M";
  data["isPrevOrg"] = false;
  postData(data);
  return false;
});

$("#pageone").ready(function () {
  $(".required").on("input change", function () {
    var fn = $("#fname").val();
    var ln = $("#lname").val();
    var db = $("#dob").val();
    var add1 = $("#tempadd").val();
    var add2 = $("#permadd").val();
    var city1 = $("#tempcity").val();
    var pin1 = $("#temppin").val();
    var city2 = $("#permcity").val();
    var pin2 = $("#permpin").val();
    var mob1 = $("#tempmobile").val();
    var mob2 = $("#permmobile").val();
    var m = $("#male").is(":checked");
    var f = $("#female").is(":checked");
    var email1 = $("#tempemail").val();
    var email2 = $("#permemail").val();
    var s1 = $("#saveone").is(":checked");
    if (
      fn != "" &&
      ln != "" &&
      db != "" &&
      add1 != "" &&
      add2 != "" &&
      city1 != "" &&
      pin1 != "" &&
      city2 != "" &&
      pin2 != "" &&
      mob1 != "" &&
      mob2 != "" &&
      email1 != "" &&
      email2 != "" &&
      (m || f) &&
      s1
    ) {
      $("#btone").prop("disabled", false);
      $("#btone").css({ "background-color": "#0000FF" });
    } else {
      if (fn.length > 2) $("#fname").css({ "background-color": "#98FB98" });
      else $("#fname").css({ "background-color": "" });
      if (ln.length >= 1) $("#lname").css({ "background-color": "#98FB98" });
      else $("#lname").css({ "background-color": "" });
      if (db.length) $("#dob").css({ "background-color": "#98FB98" });
      else $("#dob").css({ "background-color": "" });
      if (add1.length >= 1)
        $("#tempadd").css({ "background-color": "#98FB98" });
      else $("#tempadd").css({ "background-color": "" });
      if (add2.length >= 1)
        $("#permadd").css({ "background-color": "#98FB98" });
      else $("#permadd").css({ "background-color": "" });
      if (city1.length >= 1)
        $("#tempcity").css({ "background-color": "#98FB98" });
      else $("#tempcity").css({ "background-color": "" });
      if (city2.length >= 1)
        $("#permcity").css({ "background-color": "#98FB98" });
      else $("#permcity").css({ "background-color": "" });
      if (pin1.length == 6 && onlyDigits(pin1))
        $("#temppin").css({ "background-color": "#98FB98" });
      else $("#temppin").css({ "background-color": "" });
      if (pin2.length == 6 && onlyDigits(pin2))
        $("#permpin").css({ "background-color": "#98FB98" });
      else $("#permpin").css({ "background-color": "" });
      if (mob1.length == 10 && onlyDigits(mob1))
        $("#tempmobile").css({ "background-color": "#98FB98" });
      else $("#tempmobile").css({ "background-color": "" });
      if (mob2.length == 10 && onlyDigits(mob2))
        $("#permmobile").css({ "background-color": "#98FB98" });
      else $("#permmobile").css({ "background-color": "" });
      if (email1.length > 1)
        $("#tempemail").css({ "background-color": "#98FB98" });
      else $("#tempemail").css({ "background-color": "" });
      if (email2.length > 1)
        $("#permemail").css({ "background-color": "#98FB98" });
      else $("#permemail").css({ "background-color": "" });
      $("#btone").prop("disabled", true);
      $("#btone").css({ "background-color": "#C5C5F1" });
    }
  });
});

$("#pagetwo").ready(function () {
  $(".required").on("input change", function () {
    var course = $("#course option:selected").val();
    var yoc = $("#comp").val();
    var yes = $("#yes").is(":checked");
    var no = $("#no").is(":checked");
    var hobby = $("#hobby").val();
    var orgname = $("#org").val();
    var s2 = $("#savetwo").is(":checked");
    if (course != "" && yoc != "" && hobby != "" && (yes || no) && s2) {
      $("#bttwo").prop("disabled", false);
      $("#bttwo").css({ "background-color": "#0000FF" });
    } else {
      if (yoc.length > 2) $("#comp").css({ "background-color": "#98FB98" });
      else $("#comp").css({ "background-color": "" });

      if (hobby.length > 2) $("#hobby").css({ "background-color": "#98FB98" });
      else $("#hobby").css({ "background-color": "" });

      if (yes) {
        $("#org").prop("disabled", false);
        if (orgname.length > 2)
          $("#org").css({ "background-color": "#98FB98" });
        else $("#org").css({ "background-color": "" });
      } else {
        $("#org").val("");
        $("#org").prop("disabled", true);
        $("#org").css({ "background-color": "" });
      }
      $("#bttwo").prop("disabled", true);
      $("#bttwo").css({ "background-color": "#C5C5F1" });
    }
  });
});

$("#pagethree").ready(function () {
  $("input:file").on("input change", function () {
    var photo = $("#photo").val();
    var sign = $("#sign").val();
    if (photo && sign) {
      $("#btthree").prop("disabled", false);
      $("#btthree").css({ "background-color": "#0000FF" });
    } else {
      $("#btthree").prop("disabled", true);
      $("#btthree").css({ "background-color": "#C5C5F1" });
    }
  });
});

$("#pagefour").ready(function () {
  $(".required").on("input change", function () {
    var agree = $("#agree").is(":checked");
    if (agree) {
      $("#submit").prop("disabled", false);
      $("#submit").css({ "background-color": "#0000FF" });
    } else {
      $("#submit").prop("disabled", true);
      $("#submit").css({ "background-color": "#C5C5F1" });
    }
  });
});

/*function changecolor(object){
	var object = $(obj);
	if(object.length>2)
		object.css({"background-color":"#98FB98"});
	else
		object.css({"background-color":"#ffcccb"});		
}*/

function onlyDigits(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    const d = s.charCodeAt(i);
    if (d < 48 || d > 57) return false;
  }
  return true;
}

function postData(data1) {
  let conn = "/postdata";
  $.ajax({
    url: conn,
    headers: {
      "Content-Type": "application/json",
    },
    type: "POST",
    dataType: "json",
    data: JSON.stringify(data1),

    success: function (result) {
      alert("Data Saved Successfully");
    },
    error: function (e) {
      console.error("Error Occured");
      console.log(e);
    },
  });
}
