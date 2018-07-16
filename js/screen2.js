var students = document.querySelector(".students");

window.onload = addStudents();

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
    var titleTech = document.createElement("p");
    var textTech = document.createTextNode("TECH SKILL");
    var gradeTech = document.createElement("p");
    var tech = document.createElement("div");
    var titleHse = document.createElement("p");
    var textHse = document.createTextNode("HSE SKILL");
    var gradeHse = document.createElement("p");
    var hse = document.createElement("div");
    var status = document.createElement("div");
    var titleStatus = document.createElement("p");
    var textStatus = document.createTextNode("STATUS");
    var valueStatus = document.createElement("p");
    var setScore = document.createElement("div");

    block.setAttribute("class", "setStudents");
    name.setAttribute("class","names");
    setName.setAttribute("class", "setNames");
    photo.setAttribute("class", "photos");
    setPhoto.setAttribute("class", "setPhoto");
    container.setAttribute("class", "setContainer");
    titleTech.setAttribute("class", "titleTech");
    gradeTech.setAttribute("class", "gradeTech");
    tech.setAttribute("class", "tech");
    titleHse.setAttribute("class", "titleHse");
    gradeHse.setAttribute("class", "gradeHse");
    hse.setAttribute("class", "hse");
    status.setAttribute("class", "status");
    titleStatus.setAttribute("class", "titleStatus");
    setScore.setAttribute("class", "setScore");


    name.innerHTML = student.name;
    photo.src = student.photo;
    gradeTech.innerHTML = calcTech(student) + "%";
    gradeHse. innerHTML = calcHSE(student) + "%";
    valueStatus.innerHTML = (student.active) ? 'Ativa' : 'Inativa';

    setName.appendChild(name);
    block.appendChild(setName);   
    setPhoto.appendChild(photo);
    titleTech.appendChild(textTech);
    tech.appendChild(titleTech);
    tech.appendChild(gradeTech);
    setScore.appendChild(tech);
    titleHse.appendChild(textHse);
    hse.appendChild(titleHse);
    hse.appendChild(gradeHse);
    setScore.appendChild(hse);
    titleStatus.appendChild(textStatus);
    status.appendChild(titleStatus);
    status.appendChild(valueStatus);
    setScore.appendChild(status);
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
