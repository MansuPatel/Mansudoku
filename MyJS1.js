
const ValErrorColour = "red";
const ValValidColour =   "yellow"; 

function dispButtonTop(){
 var myBut = document.getElementById("Bttn23");
myBut.classList.add("Dtop");

myBut.innerHTML = "X";
}



class GrpObj {
   constructor(val,IndexArr){
   this.testval = false;
    this.GrpVal = val;
    this.GrpIndedArray = IndexArr;
    this.clueErr = false;
    }
}



class GridObj {

constructor( xpos, ypos){
this.val = 0;
this.isEditable= true;
this.groupIndex =-999;
this.groupVal=-1;
this.x = xpos;
this.y = ypos;
this.bTop = false ;
this.bRight = false ;
this.bBottom = false ;
this.bLeft = false ;
this.combs = ""; //+xpos+ypos;

/*if(xpos== ypos)   // 3 lines if for testing valErr flag  can be deleted 
this.valErr = false;  //
else //*/

this.valErr = false;
this.clueErr =false;

} // end of constructor

UpdateGridObjOutput(){

var strbttnId = "Bttn"+this.x + this.y;

var outButton = document.getElementById(strbttnId);
 this.val=newBoard.CurrentDigit;

}//end function 


displayCanvasGridObj(){

var canvas = document.getElementById('myCanvas');
if (canvas.getContext) {
var ctx = canvas.getContext('2d');

// here put the code to display one gridObj
var scale = 55;
var pad = 4;
var widthcell=scale;
var heightcell=scale ;
var fontSize =19;
var cluefontSize =12;
var fontName = 'Verdana';


ctx.strokeStyle = "black";
ctx.lineWidth =1;

ctx.fillStyle = "purple"
ctx.fillRect(this.x*widthcell, this.y*heightcell, widthcell, heightcell);
ctx.setLineDash([1, 0]);
ctx.strokeRect(this.x*widthcell, this.y*heightcell, widthcell, heightcell);



//const ValErrorColour = "red"; 
//const ValValidColour =  "black"

ctx.fillStyle = ValValidColour; //"black";
//ctx.font = "16px Verdana";
ctx.font = ''+ fontSize +'px '+ fontName ;
if(this.val >0)
{    //  remove = after testing as zero denotes empty 

if (this.valErr == true)
 ctx.fillStyle = ValErrorColour ;
ctx.fillText(this.val , this.x*widthcell+ (widthcell/3)    , this.y*heightcell+fontSize+ (heightcell/3) );
}else {
ctx.fillStyle =  ValValidColour ; //"yellow"; //ValErrorColour;//"red";
ctx.fillText(" " , this.x*widthcell+ (widthcell/3)    , this.y*heightcell+fontSize+ (heightcell/3) );

if(this.combs.length > 1){
ctx.fillStyle = "yellow ";
ctx.font = ''+ 10 +'px '+ fontName ;
 ctx.fillText(this.combs , this.x*widthcell+ pad    , this.y*heightcell+fontSize+ (heightcell/2) );
}


}
// put else here to empty griditem with fillrect


ctx.setLineDash([7, 3]);
ctx.lineWidth =1;
if(this.bTop){

 ctx.moveTo(this.x*widthcell, this.y*heightcell+pad);
 ctx.lineTo(this.x*widthcell+ widthcell, this.y*heightcell+pad);
ctx.strokeStyle = "yellow"; // "red";
ctx.stroke();
}
if(this.bBottom){
 ctx.moveTo(this.x*widthcell, this.y*heightcell+heightcell-pad);
 ctx.lineTo(this.x*widthcell+ widthcell, this.y*heightcell +heightcell-pad);
ctx.strokeStyle = "red";
ctx.stroke();
}

if(this.bLeft){
 ctx.moveTo(this.x*widthcell+pad, this.y*heightcell);
 ctx.lineTo(this.x*widthcell+pad, this.y*heightcell+heightcell);
ctx.strokeStyle = "red";
ctx.stroke();
}
if(this.bRight){
 ctx.moveTo(this.x*widthcell+widthcell-pad, this.y*heightcell);
 ctx.lineTo(this.x*widthcell+ widthcell-pad, this.y*heightcell +heightcell);
ctx.strokeStyle = "red";
ctx.stroke();
}



if(this.groupVal >=0)
{

//var testout  = newBoard.KSudGrps[this.groupIndex].testval;
//if (testout)
//var bGroupTotal = newBoard.KSudGrps[this.groupIndex].clueErr;
////else 
//var bGroupTotal = false;

//if(bGroupTotal == false)
ctx.fillStyle = "white";
//else  ctx.fillStyle = "red";
//ctx.font = "10px Verdana";
ctx.font = ''+ cluefontSize +'px '+ fontName 
ctx.fillText(this.groupVal, this.x*widthcell+pad+2, this.y*heightcell+cluefontSize+pad+2 );
}



}

DrawQuads();
}

displayGridObj(){
var strbttnId = "Bttn"+this.x + this.y;
var outButton = document.getElementById(strbttnId);
var paraTab = outButton.childNodes[0];
if(this.groupVal >=0)
paraTab.rows[0].cells[0].innerHTML = this.groupVal;
if(this.val > 0)
paraTab.rows[1].cells[0].innerHTML = this.val;
paraTab.rows[2].cells[0].innerHTML = this.combs;
if(this.bTop) 
outButton.classList.add("Dtop");  
if (this.bRight) {
         outButton.classList.add("Dright");
       }else  outButton.classList.add("Opright");
      if (this.bLeft) {
         outButton.classList.add("Dleft");
       }else  outButton.classList.add("Opleft");
       if (this.bBottom) {
        outButton.classList.add("Dbottom");
       }else  outButton.classList.add("Opbottom");
}//end function displayGridObj

 
initializeGridObj(){
this.val = 0;
this.groupIndex =-999;
this.groupVal=-1;
this.bTop = false ;
this.bRight = false ;
this.bBottom = false ;
this.bLeft = false ;
this.combs = "";
this.valErr = true;
this.clueErr =false;
 }


}// end of class GridObj






function GroupIndexAssignGrid(GroupArr, GridArr){
for (let z =0; z <GroupArr.length ; z++){
for (let i =0; i <GroupArr[z].GrpIndedArray.length ; i++){
var posxy = GroupArr[z].GrpIndedArray[i];
var y = posxy % 10;
var x = Math.floor(posxy / 10);
GridArr[y-1][x-1].groupIndex  = z;
if (i==0){
GridArr[y-1][x-1].groupVal=  GroupArr[z].GrpVal ;
}
}
}
}

function ResolveBorders(GridArr){
for (let  j= 0 ; j < 9; j++){
  for(let i =0; i<9 ;i++){
    //
    if((i==0)||(GridArr[j][i].groupIndex!=GridArr[j][i-1].groupIndex))
       GridArr[j][i].bLeft  = true;
    if((i==8)||(GridArr[j][i].groupIndex!=GridArr[j][i+1].groupIndex))
       GridArr[j][i].bRight   = true;
    if((j==0)||(GridArr[j][i].groupIndex!=GridArr[j-1][i].groupIndex))
       GridArr[j][i].bTop = true;
    if((j==8)||(GridArr[j][i].groupIndex!=GridArr[j+1][i].groupIndex))
       GridArr[j][i].bBottom = true;
   //    console.log(GridArr[j][i].groupIndex);
   }// for i
}// for j

}// end fn ResolveBorders




function RecCell(LoadData, KSudGrps) {
var totalFoundElements = 0;
var GroupArr = LoadData.split("}");
for (let z =0; z <GroupArr.length-1 ; z++){
var GrParams = GroupArr[z].split("{");
var indices = GrParams[1].split(",");
var GrValStr = GrParams[0].split(":");
var GrVal =0;

if (GrValStr.length > 1){
  GrVal = parseInt(GrValStr[1]);
} else {
  GrVal= parseInt(GrValStr[0]) }

var IntCoordArr = [];
   for (let i = 0; i < indices.length ; i++){
   IntCoordArr.push(parseInt(indices[i])) ;
   totalFoundElements++;
   }

var myObj = new GrpObj(GrVal, IntCoordArr);
KSudGrps.push(myObj);

}
console.log("total Found Elements ="+totalFoundElements);
console.log(KSudGrps);

}

function DrawQuads(){
var canvas = document.getElementById('myCanvas');
if (canvas.getContext) {
var ctx = canvas.getContext('2d');

ctx.setLineDash([1, 1]);
ctx.strokeStyle = "black";
ctx.lineWidth =4;
ctx.fillStyle = "green"
var widthBox =  canvas.width/3;
var heightBox = canvas.height/3;

for (let y =0; y <3; y++){
for (let x =0; x <3; x++){
ctx.strokeRect(x*widthBox , y*heightBox, widthBox , heightBox);
}
}
}// endof  if (canvas
}// endof function DrawQuads


function LoadGame(InData, KSudGrps, KSudGrid ){
KSudGrps= [];
newBoard.initializeBoard();
RecCell(InData,  KSudGrps);
GroupIndexAssignGrid(KSudGrps, KSudGrid);
ResolveBorders(KSudGrid);
for (let  j= 0 ; j < 9; j++){
for(let i =0; i<9 ;i++){
newBoard.KSudGrid[j][i].displayGridObj();
//newBoard.KSudGrid[j][i].displayCanvasGridObj();
}
}

newBoard.RenderDisplay();
//displayCanvasGridObj();

var outDisp =  document.getElementById("my2Table");
newBoard.OutDisplay =outDisp ;
newBoard.Display =outDisp ;


DrawQuads();
} // eofn LoadGame




function ToggleBordersSel(ID)
{
//var myBut = document.getElementById("ToolDigBtn10");
var myBut = document.getElementById(ID);
myBut.classList.toggle("toolButtonSelected");
}



function ToolCombToggle(strID, ev){
this.bCombs = ! this.bCombs;

var myBut = document.getElementById("ToolDigBtn10");
//if(this.bCombs)
myBut.classList.toggle("toolButtonSelected");
//else
//myBut.classList.add("toolButtnUnSel");
}

function ToolDigButtonClick(strID, ev){
var lastChar = strID[strID.length-1];
var curdigit = parseInt(  lastChar );
var strOldOff  = strID;
strOldOff[strOldOff.length-1]=newBoard.CurrentDigit;
//ToggleBordersSel(strOldOff);

if(newBoard.CurrentDigit>=0)
ToggleBordersSel("ToolDigBtn"+ newBoard.CurrentDigit);

if( newBoard.CurrentDigit != curdigit ){

newBoard.SetCurDigit(curdigit);

ToggleBordersSel(strID);
}
}


class KSudBoard {

constructor(DataSrc, OutTab){
this.ValidEntryCount = 0;
this.GameOver = false;
this.bGroupsEnables = false;   // need to be unpdated to true when loading Killer is done
this.InData = DataSrc;
this.OutDisplay =OutTab ;
this.BsizeX = 9;
this.BsizeY = 9;
this.KSudGrid = [];
this.KSudGrps = [];
this.Display  = OutTab;
this.CurrentDigit = -1;   // not yet valid number
this.bCombs = false ;
this.EnterTotal = 0;
this.CorrectTotal = 0;

//board initialize 

for (let j=0; j<9; j++){
var cellcol = [];
for (let i=0; i<9 ; i++){
var newGridObj = new GridObj(j, i);
newGridObj.x = i ;
newGridObj.y = j ;
cellcol.push(newGridObj);
}
this.KSudGrid.push(cellcol);
}
initializeTable(this.OutDisplay, this.KSudGrid, this.BsizeX, this.BsizeY);   // 
var outDisp2 =  document.getElementById("my2Table");

initializeTable(outDisp2, this.KSudGrid, this.BsizeX, this.BsizeY);

DrawQuads();

initializeGrid(this.OutDisplay);

initializeGrid(outDisp2);

RenderDisplay();

 var Tooltable = document.getElementById("myTools");
  var trs = Tooltable.getElementsByTagName("tr");
 var tds = document.getElementsByTagName("td");

for (let j = 0 ; j <= 10 ; j++){
var DigitBtns = [];
        DigitBtns[j] = document.createElement("button");
        DigitBtns[j].width = 30;
        DigitBtns[j].height = 30;
        DigitBtns[j].innerHTML =j;
        DigitBtns[j].id = "ToolDigBtn" + (j) ;
        if(j == 0 )  DigitBtns[j].innerHTML = "Del" ;
        if(j != 10 ) DigitBtns[j].addEventListener('click', ToolDigButtonClick.bind(this,  DigitBtns[j].id));
        if(j == 10 ){
         DigitBtns[j].innerHTML = "Combs" ;
        DigitBtns[j].addEventListener('click', ToolCombToggle.bind(this,  DigitBtns[j].id));
         }
       Tooltable.rows[0].cells[0].appendChild(DigitBtns[j]);
       tds[0].appendChild(DigitBtns[j]);
}

var br= 1;
} //end of constructor KSudBoard


 initializeToolBar()
{
 var Tooltable = document.getElementById("myTools");
 var trs = Tooltable.getElementsByTagName("tr");
var tds = document.getElementsByTagName("td");

for (let j = 0 ; j <= 9 ; j++){
var DigitBtns = [];
     
   DigitBtns[j] = document.createElement("button");
   DigitBtns[j].width = 30;     
   DigitBtns[j].height = 30;    
   DigitBtns[j].innerHTML =j;
   DigitBtns[j].id = "ToolDigBtn" + (j) ;
    DigitBtns[j].addEventListener('click', ToolDigButtonClick.bind(this,  DigitBtns[j].id));
//     Tooltable.row[0].cell[0].appendChild(DigitBtns[j]); 
     tds[0].appendChild(DigitBtns[j]);
}
}//end of initialize toolbar


isValidHorizontal(CurDigit, x, y){
var validState = true ;
for (let i=0; i<9; i++){
if((this.KSudGrid[i][y].val ==CurDigit)&(i!=x)){
 validState = false;
this.KSudGrid[i][y].valErr=true;
}
}
this.KSudGrid[x][y].valErr= !validState;
return (validState);
} // eofn isValidHorizontal

isValidVirt(CurDigit, x, y){
var validState = true ;
for (let j=0; j<9; j++){
if((this.KSudGrid[x][j].val ==CurDigit)&(j!=y)){ validState = false;
this.KSudGrid[x][j].valErr=true;
}
}

this.KSudGrid[x][y].valErr= !validState;
return (validState);
}// eon isValidVirt


CheckValidEntry(CurDigit, x, y){
var entryIsValid = this.isValidVirt(CurDigit, x, y) && this.isValidHorizontal(CurDigit, x, y);
return (true);
}


clearAllBoardValueErrorFlags(){
for (let j=0; j<9; j++){
for (let i=0; i<9 ; i++){
this.KSudGrid[i][j].valErr= false;
}// end for i
}  // end for j

}//endof clearAllBoardValueErrorFlags()

getXY(Sec){
var x = Sec %3;
var  y= Math.trunc(Sec /3);
var retArray=[];

retArray.push(x);
retArray.push(y);

return(retArray); 
}


updateSectorCollisions(){
for (let sec=0; sec<9; sec++){

var SecCoords = this.getXY(sec);
//console.log("x="+SecCoords[0] + "  y="+SecCoords[1]  );
for (let digit =1; digit<=9 ; digit++){
var ArrSecColls = [];
for (let GrdInd=0; GrdInd<9; GrdInd++){
var Coords = this.getXY(GrdInd);
var x = SecCoords[0]*3  + Coords[0];
var y = SecCoords[1]*3  + Coords[1];
if (this.KSudGrid[x][y].val==digit ){
var BCoords =[ x, y];
ArrSecColls.push(BCoords) ;
}

//if (sec == 8) console.log("x="+x + "  y="+ y  );
if(ArrSecColls.length >1){
  for (let k = 0; k < ArrSecColls.length; k++){
   this.KSudGrid[ArrSecColls[k][0]][ArrSecColls[k][1]].valErr= true;
 }
}
}
}
}
} //eoffnc  updateSectorCollisions

updateBoardValidFlags(){
this.clearAllBoardValueErrorFlags();

// for each Row cheak for duplicate digit entries
for (let j=0; j<9; j++){
for (let digit =1; digit<=9 ; digit++){
var ArrHline = [];
var ArrVline = [];
for (let i=0; i<9 ; i++){
if (this.KSudGrid[i][j].val==digit ) ArrHline.push(i) ;
if (this.KSudGrid[j][i].val==digit ) ArrVline.push(i) ;
}//end  i
if(ArrHline.length >1){
  for (let k = 0; k < ArrHline.length; k++){
   this.KSudGrid[ArrHline[k]][j].valErr= true;
   }
}// end if ArrHline

if(ArrVline.length >1){
  for (let k = 0; k < ArrVline.length; k++){
   this.KSudGrid[j][ArrVline[k]].valErr= true;
   }
}// end if ArrVline


}
} //end j


} //offnc   updateBoardValidFlags



UpdateGroupSumsErrors(GroupArr, GridArr){
for (let z =0; z <GroupArr.length ; z++){
var grpElementValSum =0;

//if (i==0){
//GridArr[y-1][x-1].groupVal=  GroupArr[z].GrpVal ;
//}

 for (let i =0; i <GroupArr[z].GrpIndedArray.length ; i++){
var posxy = GroupArr[z].GrpIndedArray[i];
var y = posxy % 10;
var x = Math.floor(posxy / 10);
grpElementValSum += GridArr[y-1][x-1].val;

}// endOf i
if( grpElementValSum >   GroupArr[z].GrpVal ) 
 GroupArr[z].clueErr = true;
else  GroupArr[z].clueErr = false;
}
}

NumberOfGridsEntered(){
var total =0;
for (let j=0; j<9; j++){
for (let i=0; i<9 ; i++){
   if (( this.KSudGrid[i][j].valErr == false)&&(this.KSudGrid[i][j].val>0))
    total++;
   }
}
return(total );
}


isAllEntriesValid(){
for (let j=0; j<9; j++){
for (let i=0; i<9 ; i++){
   if ( this.KSudGrid[i][j].valErr)
     return(false);
   }
}
return(true);
}





NextMove( j, i) {

var newEntry = this.CurrentDigit ;

if(this.CurrentDigit >=0){
/*
  if(this.CurrentDigit ==0){
  this.KSudGrid[i][j].val = this.CurrentDigit;
this.KSudGrid[i][j].displayCanvasGridObj();
}
  else{
//   this.CheckValidEntry(newEntry, i, j);
     this.KSudGrid[i][j].val = this.CurrentDigit;
     this.KSudGrid[i][j].displayCanvasGridObj();
       
}
*/
     this.KSudGrid[i][j].val = this.CurrentDigit;
      this.KSudGrid[i][j].displayCanvasGridObj();
//   this.CheckValidEntry(newEntry, i, j); // if this check to add up correct entry count for game over 
   this.updateBoardValidFlags();
   this.updateSectorCollisions();
   
if (this.isAllEntriesValid()) 
 this.ValidEntryCount++;
if (this.ValidEntryCount==81)
   this.GameOver = true;

setTimeout(this.RenderDisplay, 200);


} else console.log("Error invalid toolbar option ");

//this.KSudGrid[i][j].displayCanvasGridObj();

}// eofn   NextMove




SetCurDigit(val){
if ((val >=0) && (val <=9)){
 this.CurrentDigit = val;
var OutDig = document.getElementById( "CurDig" );
if (val ==0)
OutDig.innerHTML ="Del";
else 
OutDig.innerHTML = val ;
}
else alert("out of range curdigit attempt to = " + val);
}

RenderDisplay()
{
for (let j=0; j<9; j++){
for (let i=0; i<9 ; i++){
newBoard.KSudGrid[i][j].displayCanvasGridObj();
}// end for i
}// end for j

var enteredScore = newBoard.NumberOfGridsEntered();
var OutDlg = document.getElementById( "status" );
if(enteredScore < 18)
OutDlg.innerHTML  = "Game Status is "+  enteredScore + " entered cells out of 81";
else
OutDlg.innerHTML  = "GAME OVER YOU WINNER";

//DrawQuads();

}//EofnRenderDisplay

initializeBoard(){
this.KSudGrps = [];
for (let j=0; j<9; j++){
for (let i=0; i<9 ; i++){
newBoard.KSudGrid[i][j].initializeGridObj();
}// end for i
}// end for j


}



}//end of class KSudBoard



var LoadData = "Groups:14{11,12}6{21,31}12{41,42,32}12{51,61,71}27{81,91,82,92}10{22,23}12{52,62}18{72,73,74}6{13,14}" +
   "14{33,43,53}14{63,64,54}8{83,84}9{93,94}14{24,34}22{44,45,55,65,66}14{15,25,35}15{75,85,95}12{16,17}9{26,27}" +
    "10{36,37,38}24{46,56,47}10{76,86}10{96,97}6{57,67,77}13{87,88}22{18,28,19,29}10{48,58}17{68,78,69}6{98,99}" +
    "20{39,49,59}9{79,89}";

var LoadData2 ="Groups:15{11,21,31}11{41,42,43}12{51,52,53}13{61,62}30{71,81,72,73}7{91,92,82}10{12,13}10{22,23}" +
"10{32,33}16{63,64,65}17{83,93,94}7{14,24}9{34,35}22{44,54,55,56,66}9{74,84}11{15,25}20{45,46,47}12{75,76}7{85,95}" +
"22{16,17,27}9{26,36}8{86,96}25{37,38,39,29}20{57,58,59}12{67,68,69}7{77,78}7{87,88}13{97,98}" +
"7{18,28,19}9{48,49}18{79,89,99}"

var newBoard ;


function init()
{
  
console.log(" Good not Initialise is invoking instead of reboot main");
   window.onload = null ;
}

function isvalidHorizontal(CurDigit, x, y){
var validState = true ;
for (let i=0; i<9; i++){
if((newBoard.KSudGrid[i][y].val ==CurDigit)&(i!=x)) validState = false;
}
return (validState);
}

function isvalidVirt(CurDigit, x, y){
var validState = true ;
for (let j=0; j<9; j++){
if((newBoard.KSudGrid[x][j].val ==CurDigit)&(j!=y)) validState = false;
}
return (validState);
}


function isvalidEntry(CurDigit, x, y){
return (true);
}


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
var j = Math. trunc(x / 55);
var i = Math. trunc(y / 55);
    console.log("x: " + x + " y: " + y+ "----"+ "i: " + i + "j: " + j);

newBoard.NextMove(j, i);

}  //endof getCursorPosition

function main()
 {
console.log("main code begin");
var outDisp =  document.getElementById("myTable");
if(newBoard == undefined )
 newBoard = new KSudBoard(LoadData,  outDisp);
//ShowAllGrpClues();
var ele =newBoard.KSudGrid[1][1] ;

for (let  j= 0 ; j < 9; j++){
  for(let i =0; i<9 ;i++){
     newBoard.KSudGrid[j][i].displayGridObj();
}
}

const canvas = document.querySelector('canvas');
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
});
  window.onload = init ;
 }


