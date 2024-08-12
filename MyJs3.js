
function ButtonClick (strID, ev) {

var btX = parseInt( strID[strID.length-2] ) ;
var btY= parseInt( strID[strID.length-1] );

//alert(" "+btX+ " "+ btY);
console.log(" "+btX+ " "+ btY);

 newBoard.KSudGrid[btY][btX].displayGridObj();
// this.innerHTML =  newBoard.CurrentDigit;
//this.childNodes[0].rows[1].cells[0].innerHTML = newBoard.CurrentDigit;
displayEnter( newBoard.CurrentDigit, btX, btY);
ev.stopPropergation();
}

function displayEnter(val, x, y){
var butIdTab = "ButTab"+x+y;
var outButTab = document.getElementById(butIdTab);
 outButTab.rows[1].cells[0].innerHTML = val ; 
if(val<=0)
 outButTab.rows[1].cells[0].innerHTML ="";


var x=89;    //. rand instruct for  break point
}


function displayClue(val, x, y){
var butIdTab = "ButTab"+x+y;
var outButTab = document.getElementById(butIdTab);
if(val>0)
 outButTab.rows[0].cells[0].innerHTML = val ; 
else outButTab.rows[0].cells[0].innerHTML = "";

var x=89;    //. rand instruct for  break point
}


function ShowAllGrpClues(){
    for (let i = 0 ; i < 9 ; i++)
         for (let j = 0 ; j < 9 ; j++)
     {
  //   if(newBoard.KSudGrid[j][i].groupVal>0)  
 displayClue(newBoard.KSudGrid[i][j].groupVal, j, i);
 //      displayClue(89, j, i);
      }
}

function initializeParaTable( height, x, y ) {
var newTab = document.createElement("table");

newTab.id = "ButTab"+x+y;
newTab.style.hieght = "50px";

 var row0 = newTab.insertRow(0);
// set attributes for this row
row0.style.height ="9px";
row0.style.width ="50px";


// insert the single td
var cell0 = row0.insertCell(0);

// set attributes for this Td
cell0.style.fontSize ="9px";
//cell0.text-align ="left";
cell0.style.color="white";
cell0.style.fontWeight ="bold";
// cell0.innerHTML ="T";
 cell0.style.width ="50px";
cell0.style.textAlign ="left";
cell0.style.border  ="none";
cell0.style.padding  ="none";

var row1 = newTab.insertRow(1);
// set attributes for this row
row1.style.height ="10px";
row1.attributes.style.alignContent ="center";

// insert the single td
var cell1 = row1.insertCell(0);

// set attributes for this Td
cell1.style.fontSize ="15px";
//cell1.attributes.style.font-size ="20px";
// cell1.innerHTML ="m";
 cell1.style.width ="50px";
cell1.style.textAlign ="center";
cell1.style.border  ="none";
cell1.style.padding  ="none";
cell1.style.color="black";
cell1.style.fontWeight ="bold";

var row2 = newTab.insertRow(2);
// set attributes for this row
row2.style.height ="9px";
row2.attributes.style.alignContent  ="right";

// insert the single td
var cell2 = row2.insertCell(0);

// set attributes for this Td
// cell2.innerHTML ="b";
 cell2.style.width ="50px";
cell2.style.textAlign ="right";
cell2.style.fontSize ="10px";
cell2.style.border  ="none";
cell2.style.color="white";
cell2.style.fontWeight ="bold";
cell2.style.padding  ="none";

return( newTab);
} // end  initializeParaTable



function initializeTable(table, Grid, width, height ) {
 for (let  i = 0; i<height ; i++)
{
  var cell = [];
  var bttn = [];
// var arryParag = [];
  var row = table.insertRow(i);
 
    for (let j = 0 ; j < width ; j++)
     {
        cell[j] = row.insertCell(j);
        bttn[j] = document.createElement("button");
//        arryParag[j] = document.createElement( "para");
        bttn[j].id = "Bttn"+j +i;    
        bttn[j].addEventListener('click', ButtonClick.bind(this, bttn[j].id));

 //  bttn[j].style.border  ="none";

     if (Grid[i][j].bTop) {
         bttn[j].classList.add("Dtop");
       }else  bttn[j].classList.add("Optop");

       if (Grid[i][j].bRight) {
         bttn[j].classList.add("Dright");
       }else  bttn[j].classList.add("Opright");


       if (Grid[i][j].bLeft) {
         bttn[j].classList.add("Dleft");
       }else  bttn[j].classList.add("Opleft");

       if (Grid[i][j].bBottom) {
         bttn[j].classList.add("Dbottom");
       }else  bttn[j].classList.add("Opbottom");

   var newtab= initializeParaTable(50, j, i);
      bttn[j].appendChild(newtab);        

//       if(Grid[i][j].groupVal >0)
//displayClue(Grid[i][j].groupVal.GrpVal, i, j);

  //     bttn[j].innerHTML  =""+ Grid[i][j].groupVal;
  //     newtab.row[0].cell[0].innerHTML  =""+ Grid[i][j].groupVal;

         cell[j].appendChild(bttn[j]);
         }


     }
}// end fnc initializeTable


function initializeGrid(table){

    for (let j = 0 ; j < 9 ; j++){
           for (let i = 0 ; i < 9 ; i++){
           if (j%3 == 0)
           table.rows[j].cells[i].style.borderTop ="solid";
          if (i%3 == 0)
           table.rows[j].cells[i].style.borderLeft ="solid";
           }
     }

}


function DisplayGridObj2Button(GridObj, CurrentBttn) {

   if (GridObj.bTop) {
         CurrentBttn.classList.add("Dtop");
       }else  CurrentBttn.classList.add("Optop");

       if (GridObj.bRight) {
         CurrentBttn.classList.add("Dright");
       }else  CurrentBttn.classList.add("Opright");


       if (GridObj.bLeft) {
         CurrentBttn.classList.add("Dleft");
       }else  CurrentBttn.classList.add("Opleft");

       if (GridObj.bBottom) {
         CurrentBttn.classList.add("Dbottom");
       }else  CurrentBttn.classList.add("Opbottom");

/*   yet to do output the Groupval, Grid set val and any combos
    if (GridObj.groupVal > 0){
     }
*/

}

function Display2Table(table, Grid, width, height ) {
 for (let  i = 0; i<height ; i++)
{
    for (let j = 0 ; j < width ; j++)
     {
       var bttnId = "Bttn"+j +i;    
       var CurrentBttn = document.getElementById(bttnId );

       DisplayGridObj2Button(Grid[i][j], CurrentBttn); 
         }
     }

}// end fnc Display2Table