// PAGE 2 - SCREEN1.html

var localMenu = localStorage.getItem('localMenu');
var yearClassMenu = localStorage.getItem('yearClassMenu');

if (!localMenu || !yearClassMenu) {
  window.location.href = 'index.html';
}

var selectedLocal = document.querySelector("#selectedLocal");

selectedLocal.innerHTML = localMenu + ' - ' + yearClassMenu;

google.charts.load('current', {
  'packages': ['corechart']
});

//grafico 1 (pizza) - Ativas e Inativas por sede
google.charts.setOnLoadCallback(drawChartPizza);

function printActiveStudents() {

  var active = 0;
  var inactive = 0;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.active === true) {
      active++;
    } else {
      inactive++;
    }
  }
  var arr = [
    ["Ativas", active],
    ["Inativas", inactive]
  ];
  // printando os dados antes do grafico
  // pegar a div do html para manipular
  var dateDiv = document.querySelector(".dateDiv1");

  // criar nome da seção
  var sectionName = document.createElement("h1");
  sectionName.innerHTML = "Alunas inscritas"
  dateDiv.appendChild(sectionName);

  // criar div drop pra colocar 2 dados: numero e leganda
  var divActive = document.createElement("div");
  // p - Numero
  var intoBoxActiveP1 = document.createElement("h2");
  intoBoxActiveP1.innerHTML = active;
  divActive.appendChild(intoBoxActiveP1);
  // p - legenda
  var intoBoxActiveP2 = document.createElement("small");
  intoBoxActiveP2.innerHTML = "Alunas Ativas";
  divActive.appendChild(intoBoxActiveP2);
  // colocar dentro da div do html
  dateDiv.appendChild(divActive);

  // calculos drop
  var studentsTotal = (active + inactive);
  var drop = (inactive / studentsTotal) * 100;

  // criar div drop pra colocar 2 dados: numero e leganda
  var divDrop = document.createElement("div");

  // p - Numero
  var intoBoxP1 = document.createElement("h2");
  intoBoxP1.innerHTML = drop.toFixed(1);
  divDrop.appendChild(intoBoxP1);
  // p - legenda
  var intoBoxP2 = document.createElement("small");
  intoBoxP2.innerHTML = "Desistentes";
  divDrop.appendChild(intoBoxP2);

  // colocar dentro da div do html
  dateDiv.appendChild(divDrop);

  return arr;
}

function drawChartPizza() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Qts");
  data.addRows(printActiveStudents());
  var options = {
    title: 'Média de alunas inscritas',
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    "width": 400,
    "height": 300,
    "colors": ["#FFE521", "#CD2626"]
  };
  var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}


// grafico 2 (linha) - maiores de 70% tech e hse por sprints
google.charts.setOnLoadCallback(drawChart);

function averageGeneral() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;

  var arr = [
    ['Sprints', 'quantidade de alunas ativas com media maior que 70']
  ];

  for (var i = 1; i <= sprintSize; i++) {
    arr.push(["SP" + i, 0]);
  }

  for (student of data[localMenu][yearClassMenu]["students"]) {
    // console.log(student)
    for (sprint of student.sprints) {
      // console.log(sprint.number);

      if (student.active === true) {
        if (calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
          switch (sprint.number) {
            case 1:
              arr[1][1] += 1;
              break;
            case 2:
              arr[2][1] += 1;
              break;
            case 3:
              arr[3][1] += 1;
              break;
            case 4:
              arr[4][1] += 1;
              break;
          }
        }
      }
    }
  }


  console.log(arr);

  // printando os dados antes do grafico
  // pegar a div do html para manipular
  // var dateDiv2 = document.querySelector(".dateDiv2");

  // // criar nome da seção
  //   var sectionName = document.createElement("h1");
  //   sectionName.innerHTML = "Alunas em Destaque > 70% em Tech e HSE"
  //   dateDiv2.appendChild(sectionName);

  //   // conta média
  //   var sprintMedia = parseInt((sp1 + sp2 + sp3 + sp4) / 4);
  //   // console.log(sprintMedia)

  //   // criar div total number pra colocar 2 dados: numero e leganda
  //   var divTotalNumber = document.createElement("div"); 
  //     // p - Numero
  //     var intoBoxActiveP1 = document.createElement("h2");
  //     intoBoxActiveP1.innerHTML = sprintMedia;
  //     divTotalNumber.appendChild(intoBoxActiveP1);
  //     // p - legenda
  //     var intoBoxActiveP2 = document.createElement("small");
  //     intoBoxActiveP2.innerHTML = "Alunas contemplam essa média.";
  //     divTotalNumber.appendChild(intoBoxActiveP2);
  // // colocar dentro da div do html
  // dateDiv2.appendChild(divTotalNumber);

  //   // criar div drop pra colocar 2 dados: numero e leganda
  //   var divTotalNumberPercent = document.createElement("div"); 

  //     // p - Numero
  //     var intoBoxP1 = document.createElement("h2");
  //     intoBoxP1.innerHTML = sprintMedia * 100;
  //     divTotalNumberPercent.appendChild(intoBoxP1);
  //     // p - legenda
  //     var intoBoxP2 = document.createElement("small");
  //     intoBoxP2.innerHTML = "Porcento do Total de " + (sprintMedia * 100);
  //     divTotalNumberPercent.appendChild(intoBoxP2);

  // // colocar dentro da div do html
  // dateDiv2.appendChild(divTotalNumberPercent);

  return arr;
}

function calcTechSprint(sprint) {
  var percent = (sprint.score.tech / 1800) * 100;
  return percent.toFixed(1);
}

function calcHseSprint(sprint) {
  var percent = (sprint.score.hse / 1200) * 100;
  return percent.toFixed(1);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable(averageGeneral());
  var options = {
    title: 'Quantidade de alunas acima da média em todos os sprints',
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}

//grafico 3 (barra) - NPS
google.charts.setOnLoadCallback(drawBarChart);

function calcNps() {
  var sprint = 0;
  var totalNps = 0;
  var promoters = 0;
  var passive = 0;
  var detractors = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    promoters += rating.nps.promoters;
    passive += rating.nps.passive;
    detractors += rating.nps.detractors;
    sprint++;
  }
  totalNps = promoters - detractors;

  var arr = [
    ['Name', '%'],
    ['NPS', (totalNps / sprint)],
    ['Promoters', (promoters / sprint)],
    ['Passive', (passive / sprint)],
    ['Detractors', (detractors / sprint)]
  ];
  return arr;
}

function drawBarChart() {
  var data = google.visualization.arrayToDataTable(calcNps());
  var options = {
    title: "NPS médio dos sprints",
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    width: 600,
    height: 400,
    bar: {
      groupWidth: "70%"
    },
    legend: {
      position: "none"
    },
  };
  var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
  chart.draw(data, options);
}

//Gráfico 4 - Tech Skills


var selectSprintTech = document.getElementById('selectSprintTech');
var selectSprintHse = document.getElementById('selectSprintHse');

window.onload = loadSelect();
window.onload = drawChartStudentsScoresTech();
window.onload = drawChartStudentsScoresHse();

function loadSelect() {
  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  for (var i = 1; i <= sprintSize; i++) {
    var localOptionsTech = document.createElement("option");
    var localOptionsHse = document.createElement("option");
    localOptionsTech.innerHTML = "SP" + i;
    localOptionsHse.innerHTML = "SP" + i;
    localOptionsTech.value = i - 1;
    localOptionsHse.value = i - 1;
    selectSprintTech.appendChild(localOptionsTech);
    selectSprintHse.appendChild(localOptionsHse);
  }
}

selectSprintTech.addEventListener('change', avgTechStudents);
selectSprintTech.addEventListener('change', drawChartStudentsScoresTech);
selectSprintHse.addEventListener('change', avgHseStudents);
selectSprintHse.addEventListener('change', drawChartStudentsScoresHse);

function drawChartStudentsScoresTech() {
  google.charts.setOnLoadCallback(drawPieChartTech);
}

function drawChartStudentsScoresHse() {
  google.charts.setOnLoadCallback(drawPieChartHse);
}



// Qtd e Porcentagem de alunas com media > 70 por sprint em TECH
function avgTechStudents() {

  var sprint = selectSprintTech.value;

  var qtd = 0;
  var pct = 0;
  var total = data[localMenu][yearClassMenu]["students"].length;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.sprints[sprint].score.tech >= 1260) {
      qtd++;
    }
  }

  pct = (qtd / total) * 100;

  var qtdStdTech = document.getElementById('qtdStdTech');
  var qtdStdLegendTech = document.getElementById('qtdStdLegendTech');
  var avgStdTech = document.getElementById('avgStdTech');
  var ttStdTech = document.getElementById('ttStdTech');
  qtdStdTech.innerHTML = qtd;
  qtdStdLegendTech.innerHTML = 'Número de Alunas';
  avgStdTech.innerHTML = Math.round(pct) + '%';
  ttStdTech.innerHTML = `% de total (${total})`;

  return arr = [
    ['Qtd Alunas', '%'],
    ['Acima media', Math.round(pct)],
    ['Baixo media', Math.round((100 - pct))]
  ];
}


function drawPieChartTech() {

  var data = google.visualization.arrayToDataTable(avgTechStudents());

  var options = {
    title: 'Porcentagem da média das alunas em Tech',
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: 'black',
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchartTech'));
  chart.draw(data, options);
}

// Qtd e Porcentagem de alunas com media > 70 por sprint em HSE
function avgHseStudents() {

  var sprint = selectSprintHse.value;

  var qtd = 0;
  var pct = 0;
  var total = data[localMenu][yearClassMenu]["students"].length;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.sprints[sprint].score.hse >= 840) {
      qtd++;
    }
  }

  pct = (qtd / total) * 100;

  var qtdStdHse = document.getElementById('qtdStdHse');
  var qtdStdLegendHse = document.getElementById('qtdStdLegendHse');
  var avgStdHse = document.getElementById('avgStdHse');
  var ttStdHse = document.getElementById('ttStdHse');
  qtdStdHse.innerHTML = qtd;
  qtdStdLegendHse.innerHTML = 'Número de Alunas';
  avgStdHse.innerHTML = Math.round(pct) + '%';
  ttStdHse.innerHTML = `% de total (${total})`;

  return arr = [
    ['Qtd Alunas', '%'],
    ['Acima media', Math.round(pct)],
    ['Baixo media', Math.round((100 - pct))]
  ];
}

function drawPieChartHse() {

  var data = google.visualization.arrayToDataTable(avgHseStudents());

  var options = {
    title: 'Porcentagem da média das alunas em HSE',
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: 'black',
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchartHse'));
  chart.draw(data, options);
}


var studentSatisfactionInfo = document.getElementById('studentSatisfactionInfo');
var studentSatisfactionGraphic = document.getElementById('studentSatisfactionGraphic');

function studentSatisfactionData() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  var array = [
    ['Sprints', '% de Alunas']
  ];

  for (var i = 1; i <= sprintSize; i++) {
    array.push(["SP" + i, 0]);
  }
  
  var x = 1;
  var avgSs = 0
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    array[x][1] += (rating.student.cumple + rating.student.supera);
    avgSs += (rating.student.cumple + rating.student.supera);
    x++;
  }

  var studentSatisfactionInfo = document.getElementById('studentSatisfactionInfo');
  var totalAlunas = data[localMenu][yearClassMenu].students.length; 

  avgSs = (avgSs/sprintSize);
  
  var totalSs = (avgSs * totalAlunas) / 100;

  studentSatisfactionInfo.innerHTML = Math.round(totalSs);
  
  return array;
}

google.charts.setOnLoadCallback(drawLineChartStudentSatisfaction);

function drawLineChartStudentSatisfaction() {

  var data = google.visualization.arrayToDataTable(studentSatisfactionData());

  var options = {
    title: 'Estudantes Satisfeitas por Sprint em %',
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('studentSatisfactionGraphic'));
  chart.draw(data, options);
}


var teacherRatingInfo = document.getElementById('teacherRatingInfo');
var teacherRatingGraphic = document.getElementById('teacherRatingGraphic');

function teacherRatingData() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  var array = [
    ['Sprints', 'Professores']
  ];

  for (var i = 1; i <= sprintSize; i++) {
    array.push(["SP" + i, 0]);
  }
  
  var x = 1;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    array[x][1] += rating.teacher;
    x++;
  }

  return array;
}

google.charts.setOnLoadCallback(drawLineChartTeacherRating);

function drawLineChartTeacherRating() {

  var data = google.visualization.arrayToDataTable(teacherRatingData());

  var options = {
    title: 'Nota dos professores por sprint',
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('teacherRatingGraphic'));
  chart.draw(data, options);
}



var jediMasterRatingInfo = document.getElementById('jediMasterRatingInfo');
var jediMasterRatingGraphic = document.getElementById('jediMasterRatingGraphic');

function jediMasterRatingData() {
  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  var array = [
    ['Sprints', 'Mentores']
  ];

  for (var i = 1; i <= sprintSize; i++) {
    array.push(["SP" + i, 0]);
  }
  
  var x = 1;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    array[x][1] += rating.jedi;
    x++;
  }
  
  return array;
}

google.charts.setOnLoadCallback(drawLineChartJediMasterRating);

function drawLineChartJediMasterRating() {

  var data = google.visualization.arrayToDataTable(jediMasterRatingData());

  var options = {
    title: 'Nota dos mentores por sprint',
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('jediMasterRatingGraphic'));
  chart.draw(data, options);
}