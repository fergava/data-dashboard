var students = document.querySelector(".students");

function addStudents() {
  
  var localMenu = "AQP";
  var yearClassMenu = "2016-2";

  for (student of data[localMenu][yearClassMenu]["students"]) {
    var block = document.createElement("div");
    var name = document.createElement("h4");
    var setName = document.createElement("div");
    var photo = document.createElement("img");
    var setPhoto = document.createElement("div");
    var container = document.createElement("div");
    var gradeTech = document.createElement("p");
    var gradeHSE = document.createElement("p");
    var situation = document.createElement("p");
    var setScore = document.createElement("div");

    block.setAttribute("class", "setStudents");
    name.setAttribute("class","names");
    setName.setAttribute("class", "setNames");
    photo.setAttribute("class", "photos");
    setPhoto.setAttribute("class", "setPhoto");
    container.setAttribute("class", "setContainer");
    gradeTech.setAttribute("class", "Tech");
    gradeHSE.setAttribute("class", "HSE");
    situation.setAttribute("class", "status");
    setScore.setAttribute("class", "setScore");

    name.innerHTML = student.name;
    photo.src = student.photo;
    gradeTech.innerHTML = calcTech(student);
    gradeHSE. innerHTML = calcHSE(student);
    situation.innerHTML = student.active;

    setName.appendChild(name);
    block.appendChild(setName);   
    block.appendChild(container);
    setPhoto.appendChild(photo);
    setScore.appendChild(gradeTech);
    setScore.appendChild(gradeHSE);
    setScore.appendChild(situation);
    container.appendChild(setPhoto);
    container.appendChild(setScore);
    block.appendChild(container);
    students.appendChild(block);
  }
}

function calcTech(student) {
  var grade = 0;
  var average = 0;
  var count = student.sprints.length;
  for (sprint of student.sprints) {
  grade += sprint.score.tech;
  }
  average = grade / count;
  var percent = (average / 1800) * 100;
  return percent.toFixed(1);
}

function calcHSE(student) {
  var grade = 0;
  var average = 0;
  var count = student.sprints.length;
  for (sprint of student.sprints) {
  grade += sprint.score.hse;
  }
  average = grade / count;
  var percent = (average / 1200) * 100;
  return percent.toFixed(1);
}




addStudents();
// console.log(student);