import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import {
  NumberValueAccessor
} from '@angular/forms';
import $ from "jquery";


let results: any = {};
var City = [];
var res;
var pp = 0;
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],

})


export class CityComponent implements OnInit {

  constructor() {

  }


  ngOnInit(): void {
    // let weeks:any=document.querySelector("#weeks");
    // let diffusion:any=document.querySelector("#diffusion");
    // let submit_button=document.querySelector("#submit_button");
    // let delhi:any=document.querySelector("#delhi");
    // // let mumbai
    // // let pune
    // // let ahmedabad
    // // let surat
    // submit_button.addEventListener("click",(event)=>{
    //   console.log("cicked")
    //   City[4].lockdown = true; 
    //   console.log($('#delhi').is(":checked")?"Delhi":0);
    //   let data:any={};
    //   data.weeks=weeks.value;
    //   data.diffusion=diffusion.value;
    //   data.input_params={};
    //   data.input_params.delhi=$('#delhi').is(":checked")?"Delhi":0;
    //   data.input_params.mumbai=$('#mumbai').is(":checked")?"Mumbai":0;
    //   data.input_params.surat=$('#surat').is(":checked")?"Surat":0;
    //   data.input_params.pune=$('#pune').is(":checked")?"Pune":0;
    //   data.input_params.ahmedabad=$('#ahmedabad').is(":checked")?"Ahmedabad":0;
    //   $.ajax({url:"http://localhost:3000/api",type:'POST',async:false, data:data,success: (response, status) => { //ajax call to post the data on the app.post()
    //       console.log(status);
    //       results=response;
    //       // console.log(results);
    //   },error:(xhr,status,error)=>{
    //       console.log("Web request terminated with xhr:"+xhr+"status: "+status+ " error: "+error);
    //   }});
    //   res = results;
    //  console.log('v', results);
    // });


    // let mumbai
    // let pune
    // let ahmedabad
    // let surat
    //   document.querySelector("#submit_button").addEventListener("click",(event)=>{
    //     let weeks:any=document.querySelector("#weeks");
    //     let diffusion:any=document.querySelector("#diffusion");
    //     let delhi:any=document.querySelector("#delhi");
    //     console.log("clicked")
    //     City[4].lockdown = true; 
    //     console.log($('#delhi').is(":checked")?"Delhi":0);
    //     let data:any={};
    //     data.weeks=weeks.value;
    //     data.diffusion=diffusion.value;
    //     data.input_params={};
    //     data.input_params.delhi=$('#delhi').is(":checked")?"Delhi":0;
    //     data.input_params.mumbai=$('#mumbai').is(":checked")?"Mumbai":0;
    //     data.input_params.surat=$('#surat').is(":checked")?"Surat":0;
    //     data.input_params.pune=$('#pune').is(":checked")?"Pune":0;
    //     data.input_params.ahmedabad=$('#ahmedabad').is(":checked")?"Ahmedabad":0;
    //     $.ajax({url:"http://localhost:3000/api",type:'POST',async:false, data:data,success: (response, status) => { //ajax call to post the data on the app.post()
    //         console.log(status);
    //         results=response;
    //         // console.log(results);
    //     },error:(xhr,status,error)=>{
    //         console.log("Web request terminated with xhr:"+xhr+"status: "+status+ " error: "+error);
    //     }});
    //     res = results;
    //    console.log('v', results);
    //   });

  }

}



$(document).ready(function () {

  $('img.city-1').hover(function () {
      var x  = res['data']['week'].toString();
      
      var y = res['data']['Mumbai']['yhat'][7*x].toString();
      var show  = "<b>City</b> - Mumbai";
      show+="<br>";
      show+= "<b>Predicted Cases </b>";
      show +=y;
      
      
      
     let  l = document.getElementById('div1');
      l.innerHTML=show;

  });
  $('img.city-2').hover(function () {
    var x  = res['data']['week'].toString();
      
      var y = res['data']['Delhi']['yhat'][7*x].toString();
      var show  = "<b>City</b> - Delhi";
      show+="<br>";
      show+= "<b>Predicted Cases </b>";
      show +=y;
      
      
      
     let  l = document.getElementById('div2');
      l.innerHTML=show;
  });
  $('img.city-3').hover(function () {

    var x  = res['data']['week'].toString();
      
      var y = res['data']['Ahmedabad']['yhat'][7*x].toString();
      var show  = "<b>City</b> - Ahmedabad";
      show+="<br>";
      show+= "<b>Predicted Cases </b>";
      show +=y;
      
      
      
     let  l = document.getElementById('div3');
      l.innerHTML=show;

  });
  $('img.city-4').hover(function () {

    var x  = res['data']['week'].toString();
      
      var y = res['data']['Surat']['yhat'][7*x].toString();
      var show  = "<b>City</b> - Surat";
      show+="<br>";
      show+= "<b>Predicted Cases </b>";
      show +=y;
      
      
      
     let  l = document.getElementById('div4');
      l.innerHTML=show;
  });
  $('img.city-5').hover(function () {

    var x  = res['data']['week'].toString();
      
      var y = res['data']['Pune']['yhat'][7*x].toString();
      var show  = "<b>City</b> - Pune";
      show+="<br>";
      show+= "<b>Predicted Cases </b>";
      show +=y;
      
      
      
     let  l = document.getElementById('div5');
      l.innerHTML=show;
  });
  document.querySelector("#submit_button").addEventListener("click", (event) => {
    let weeks: any = document.querySelector("#weeks");
    let diffusion: any = document.querySelector("#diffusion");
    console.log("clicked")
    // City[4].lockdown = true;
    console.log(City);
    console.log($('#delhi').is(":checked") ? "Delhi" : 0);
    let data: any = {};
    data.weeks = weeks.value;
    data.diffusion = diffusion.value;
    data.input_params = {};
    data.input_params.delhi = $('#delhi').is(":checked") ? "Delhi" : 0;
    data.input_params.mumbai = $('#mumbai').is(":checked") ? "Mumbai" : 0;
    data.input_params.surat = $('#surat').is(":checked") ? "Surat" : 0;
    data.input_params.pune = $('#pune').is(":checked") ? "Pune" : 0;
    data.input_params.ahmedabad = $('#ahmedabad').is(":checked") ? "Ahmedabad" : 0;
    $.ajax({
      url: "http://localhost:3000/api",
      type: 'POST',
      async: false,
      data: data,
      success: (response, status) => { //ajax call to post the data on the app.post()
        console.log(status);
        results = response;
        // console.log(results);
      },
      error: (xhr, status, error) => {
        console.log("Web request terminated with xhr:" + xhr + "status: " + status + " error: " + error);
      }
    });
    res = results;
    console.log('v', results);
    // var x = res['data']['week'].toString();
    // let l = document.getElementById('div1');
    // l.innerHTML = x;

    // $('img.city-1').hover(function(){
    //   var x  = res['data']['weeks'].toString();
    //  let  l = document.getElementById('div1');
    //   l.innerHTML=x;

    // });
    // $('img.city-2').hover(function(){
    //   var x  = "I am Shrishtri-rtyyy";
    //  let  l = document.getElementById('div2');
    //   l.innerHTML=x;

    // });
    // $('img.city-3').hover(function(){

    //   var x  = "I am Shrishtri-rtiy";
    //  let  l = document.getElementById('div3');
    //   l.innerHTML=x;

    // });
    // $('img.city-4').hover(function(){

    //   var x  = "I am Shrishtri-tri2";
    //  let  l = document.getElementById('div4');
    //   l.innerHTML=x;

    // });
    // $('img.city-5').hover(function(){

    //   var x  = "I am Shrishtri-tri";
    //  let  l = document.getElementById('div5');
    //   l.innerHTML=x;
    // });
    //   // $('img.city-1').cl(function(){
    //  //   $('img.city-1').show();
    // // });


    

    class city {
      name: string;
      population: number;
      covid_infected: number;
      lockdown: boolean;
      xcord: number;
      ycord: number;
    }
    var canvas = $('canvas.dots');

    var cities = ['Delhi', 'Mumbai', 'Lucknow', 'Patna', 'Chennai']
    var ycord = [50, 50, 500, 500, 275];
    var xcord = [50, 1050, 1050, 50, 550];


    for (i = 1; i <= 5; i++) {
      var temp = new city();
      temp.name = cities[i - 1];
      temp.population = 200;
      temp.lockdown = false;
      temp.covid_infected = 10 * i;
      temp.xcord = xcord[i - 1];
      temp.ycord = ycord[i - 1];
      City.push(temp);

    }


    // ----------------------------------------

    var dotMargin = 0;
    var numRows = 5;
    var numCols = 10;
    // Set the colors you want to support in this array
    var colors = ['green', 'brown', 'black', 'blue', 'red'];
    var directions = ['+', '-'];
    var speeds = [0.5, 1, 0.7, 2];


    console.log(canvas.width(), canvas.height())
    var context = canvas[0].getContext('2d');
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height(); // this one is new
    canvas.attr({
      height: canvasHeight,
      width: canvasWidth
    });

    var dotWidth = 10;
    var dotHeight = 10;


    var xMargin = (canvasWidth - dotWidth);
    var yMargin = (canvasHeight - dotHeight);
    var dotDiameter = dotHeight * 10;

    // Start with an empty array of dots.
    var dots = [];

    var dotRadius = dotDiameter * 0.5;

    for (var i = 0; i < 5; i++) {
      var dot = {
        x: City[i].xcord,
        y: City[i].ycord,
        radius: dotRadius,
        xMove: '',
        yMove: '',
        color: colors[i],
        speed: 0,
      };

      // Save it to the dots array.
      dots.push(dot);
      drawDot(dot);

      // }
    }
    console.log(dots);
    // Draw each dot in the dots array.
    for (i = 0; i < dots.length; i++) {
      drawDot(dots[i]);
    };



    dots = [];
    console.log(dots);
    dotRadius = 3;
//    console.log(results.data.cpr.citiesInLockdown.length)
    for(var i=0;i<results.data.cpr.citiesInLockdown.length;i++){
      if(results.data.cpr.citiesInLockdown[i]==="Mumbai"){
        City[0].lockdown = true;
      }
      if(results.data.cpr.citiesInLockdown[i]==="Pune"){
        City[4].lockdown = true;
      }
      if(results.data.cpr.citiesInLockdown[i]==="Surat"){
        City[2].lockdown = true;
      }
      if(results.data.cpr.citiesInLockdown[i]==="Ahmedabad"){
        City[3].lockdown = true;
      }
      if(results.data.cpr.citiesInLockdown[i]=="Delhi"){
        City[1].lockdown = true;
      }
    }
    // City[4].lockdown = true; 
    
    // // City[0].lockdown = true; 
    var myvar = setInterval(myTimer, 2000)

    function myTimer() {
      if (pp === 1) {
        City[4].lockdown = true;
      }
    }
    var city_points = [
      [0, 30, 0, 30, 30],
      [30, 0, 30, 0, 30],
      [0, 30, 0, 30, 30],
      [30, 0, 30, 0, 30],
      [30, 30, 30, 30, 0]
    ];
    var city_xspeed = [
      [0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 1, 0, 1],
      [1, 1, 1, 1, 0]
    ];
    var city_yspeed = [
      [0, 0, 0, 1, 0.45],
      [0, 0, 1, 0, 0.45],
      [0, 1, 0, 0, 0.45],
      [1, 0, 0, 0, 0.45],
      [0.45, 0.45, 0.45, 0.45, 0]
    ];
    for (i = 0; i < City.length; i++) {
      for (let j = 0; j < City.length; j++) {
        if (City[i].lockdown == true || City[j].lockdown == true)
          continue;
        else {
          for (let k = 0; k < city_points[i][j]; k++) {
            var rand = Math.random() * (1 - 0.2) + 0.2;
            var col = ['red', 'green'];
            var xmin = Math.min(City[i].xcord, City[j].xcord);
            var ymin = Math.min(City[i].ycord, City[j].ycord);
            var xmax = Math.max(City[i].xcord, City[j].xcord);
            var ymax = Math.max(City[i].ycord, City[j].ycord);
            var xsp = city_xspeed[i][j] * rand;
            var ysp = city_yspeed[i][j] * rand;

            var dt = {
              x: City[i].xcord,
              y: City[i].ycord,
              radius: dotRadius,
              xMove: '+',
              yMove: '+',
              color: col[Math.floor(Math.random() * colors.length)],
              xMin: xmin,
              xMax: xmax,
              yMax: ymax,
              yMin: ymin,
              xSpeed: xsp,
              ySpeed: ysp,
            };
            dots.push(dt);
          }
        }

      }
    }

    window.requestAnimationFrame(moveDot);


    function moveDot() {

      context.clearRect(0, 0, canvasWidth, canvasHeight)
      for (i = 0; i < dots.length; i++) {
        if (dots[i].xMove == '+') {
          dots[i].x += dots[i].xSpeed;
        } else {
          dots[i].x -= dots[i].xSpeed;
        }
        if (dots[i].yMove == '+') {
          dots[i].y += dots[i].ySpeed;
        } else {
          dots[i].y -= dots[i].ySpeed;
        }

        drawDot(dots[i])

        if ((dots[i].x + dots[i].radius) >= dots[i].xMax) {
          dots[i].xMove = '-';
        }
        if ((dots[i].x - dots[i].radius) <= dots[i].xMin) {
          dots[i].xMove = '+';
        }
        if ((dots[i].y + dots[i].radius) >= dots[i].yMax) {
          dots[i].yMove = '-';
        }
        if ((dots[i].y - dots[i].radius) <= dots[i].yMin) {
          dots[i].yMove = '+';
        }
      }
      window.requestAnimationFrame(moveDot);
    }





    function drawDot(dot) {
      context.globalAlpha = 0.9;
      context.beginPath();
      context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
      context.fillStyle = dot.color;
      context.fill();


    }
    draw_path();

    function draw_path() {
      context.setLineDash([1, 10]);
      context.moveTo(50, 50);
      context.lineTo(1050, 500);
      context.stroke();

      context.moveTo(50, 50);
      context.lineTo(1050, 50);
      context.stroke();

      context.moveTo(1050, 50);
      context.lineTo(1050, 500);
      context.stroke();

      context.moveTo(1050, 50);
      context.lineTo(50, 500);
      context.stroke();

      context.moveTo(50, 500);
      context.lineTo(1050, 500);
      context.stroke();

      context.moveTo(50, 50);
      context.lineTo(50, 500);
      context.stroke();

    }

  });






  // ----------------------------------------

});
