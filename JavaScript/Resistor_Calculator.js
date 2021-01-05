

window.onload = function(){
var Band_1_Button_Set = document.getElementsByClassName('Band_1_Buttons');
var Band_2_Button_Set = document.getElementsByClassName('Band_2_Buttons');
var Band_3_Button_Set = document.getElementsByClassName('Band_3_Buttons');
var Multiplier_Band_Button_Set = document.getElementsByClassName('Multiplier_Band_Buttons');
var Tolerance_Band_Button_Set = document.getElementsByClassName('Tolerance_Band_Buttons');

for (Button_Index = 0; Button_Index < Band_1_Button_Set.length; Button_Index ++){
  Band_1_Button_Set[Button_Index].addEventListener("click", Update_Resistor_Preview);
  Band_2_Button_Set[Button_Index].addEventListener("click", Update_Resistor_Preview);
  Band_3_Button_Set[Button_Index].addEventListener("click", Update_Resistor_Preview);
  Multiplier_Band_Button_Set[Button_Index].addEventListener("click", Update_Resistor_Preview);
  Tolerance_Band_Button_Set[Button_Index].addEventListener("click", Update_Resistor_Preview);
}
var Four_Band_Select_Button = document.getElementsByClassName('Select_4');
var Five_Band_Select_Button = document.getElementsByClassName('Select_5');
Four_Band_Select_Button[0].addEventListener("click",Four_Band_Resistor_Configuration);
Five_Band_Select_Button[0].addEventListener("click",Five_Band_Resistor_Configuration);

var LED_Light_Bar_1 = document.getElementsByClassName('LED_Light_Bar_1'); 
for(LED_Index = 0; LED_Index < LED_Light_Bar_1.length; LED_Index++){
  LED_Light_Bar_1[LED_Index].classList.add('LED_Light_Bar_Active');
}

var Slide_Menu_Button = document.getElementsByClassName('Slide_Menu_Button')[0];
Slide_Menu_Button.addEventListener("click",Slide_Menu_Button_Update);

var Top_Bar_Buttons = document.getElementsByClassName('Menu_Buttons');
for(Navigation_Button_Index = 0; Navigation_Button_Index < Top_Bar_Buttons.length; Navigation_Button_Index++){
    Top_Bar_Buttons[Navigation_Button_Index].addEventListener("click",Navigation_Button_Pressed);
    Top_Bar_Buttons[Navigation_Button_Index].addEventListener("mouseenter",Move_Pointer);
}
var Add_To_Recents_Button = document.getElementsByClassName('Add_To_Recents_Button')[0];
Add_To_Recents_Button.addEventListener("click",Add_To_Recents);

var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
Top_Bar_Wrapper.addEventListener("mouseenter",Entered_Navigation_Bar);

var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
Top_Bar_Wrapper.addEventListener("mouseleave",Left_Navigation_Bar);

var Add_To_Recents_Button = document.getElementsByClassName('Add_To_Recents_Button')[0];
Add_To_Recents_Button.addEventListener("click",Save_To_Recents);

var Expand_Button = document.getElementsByClassName('Expand_Button')[0];
Expand_Button.addEventListener("click",Expand_Colour_Palette);  

  checkMobile();
  Adjust_Mobile_Menu();

}

function Update_Resistor_Preview(){  
  var Button_Descriptor = this.className; 
  var Band_Class = String(Button_Descriptor.split(" ")[0]);
  var Band_Value = String(Button_Descriptor.split(" ")[1]);
  var Button = document.getElementsByClassName(Button_Descriptor)[0];
  var Button_Colour = Button.style.backgroundColor;
    
  if(Band_Value != "Inactive"){
  Colour_Button_Selected(this);
  var Band_Names = ["Band_1_Buttons","Band_2_Buttons","Band_3_Buttons","Multiplier_Band_Buttons","Tolerance_Band_Buttons"];  
  var Band_Index = Band_Names.indexOf(Band_Class);    
  var Resistor_Bands_Preview = document.getElementsByClassName('Resistor_Bands');
  var Resistor_Bands_Preview_2 = document.getElementsByClassName('Resistor_Bands_Vertical');
  var Button_Colour_Identifier = String(Button_Colour);
  
  var Colour_Dictionary = {
  "rgb(20, 20, 20)": "Black",
  "rgb(103, 49, 0)": "Brown",
  "rgb(255, 0, 0)": "Red",
  "rgb(255, 100, 0)": "Orange",
  "rgb(255, 184, 0)": "Yellow",
  "rgb(78, 200, 5)": "Green",
  "rgb(0, 51, 234)": "Blue",
  "rgb(112, 0, 255)": "Purple",
  "rgb(70, 70, 70)": "Grey",
  "rgb(245, 245, 245)": "White",
  "rgb(187, 135, 0)": "Gold",
  "rgb(150, 150, 150)": "Silver"
  };

  var Resistor_To_Change = Resistor_Bands_Preview[Band_Index];
  var Resistor_To_Change_2 = Resistor_Bands_Preview_2[Band_Index];

  Resistor_To_Change.classList.remove("Horizontal_Squeeze_Animation");
  void Resistor_To_Change.offsetWidth;
  Resistor_To_Change.classList.add("Horizontal_Squeeze_Animation");

  Resistor_To_Change_2.classList.remove("Horizontal_Squeeze_Animation");
  void Resistor_To_Change_2.offsetWidth;
  Resistor_To_Change_2.classList.add("Horizontal_Squeeze_Animation");

  Resistor_To_Change.style.backgroundColor = Button_Colour;
  Resistor_To_Change_2.style.backgroundColor = Button_Colour;
  var Colour_Name = Colour_Dictionary[Button_Colour_Identifier];
  Resistor_To_Change.innerHTML = Colour_Name;
  Resistor_To_Change_2.innerHTML = Colour_Name;
  Calculate_Resistance();
}

}


function Four_Band_Resistor_Configuration(){
  var Band_3_Buttons = document.getElementsByClassName('Band_3_Buttons');
  for(Button_Index = 0; Button_Index < Band_3_Buttons.length; Button_Index++){
    Band_3_Buttons[Button_Index].disabled = true;    
  }
  
  var Four_Band_LED_Strip = document.getElementById('Four_Band_LED_Strip');
  Four_Band_LED_Strip.style.filter = "opacity(0.8)";
  
  var Five_Band_LED_Strip = document.getElementById('Five_Band_LED_Strip');
  Five_Band_LED_Strip.style.filter = "opacity(0.1)";
  
  var Expand_Button = document.getElementsByClassName('Expand_Button')[0];
  void Expand_Button.offsetWidth;
  Expand_Button.classList.remove('Expand_Button_5_Band_State');
  
  var Status = document.getElementById('Four_Band_Label');
  Status_Style = window.getComputedStyle(Status);
  Status_Colour = String(Status_Style.getPropertyValue('color'));
  
  if(Status_Colour == "rgb(170, 170, 170)"){
  
  var Band_3_Label = document.getElementsByClassName('Band_3')[0];
  var Band_3_Holder = document.getElementsByClassName('Band_3_Holder')[0];
  var Four_Band_Select_Button = document.getElementsByClassName('Select_4')[0];
  var Five_Band_Select_Button = document.getElementsByClassName('Select_5')[0];
  Four_Band_Select_Button.style.color = "rgb(200,200,200)";
  Five_Band_Select_Button.style.color = "rgb(170,170,170)";

  Four_Band_Select_Button.classList.remove("Squeeze_Animation");
  void Four_Band_Select_Button.offsetWidth;
  Four_Band_Select_Button.classList.add("Squeeze_Animation");

  Band_3_Label.classList.remove("Band_3_Active");
  Band_3_Holder.classList.remove("Band_3_Holder_Active");
  var Band_Strip_3 = document.getElementsByClassName('Band_Strip_3')[0];
  var Band_Strip_3_Vertical = document.getElementsByClassName('Band_Strip_Vertical_3')[0];
  Band_Strip_3.innerHTML = "Black";
  Band_Strip_3_Vertical.innerHTML = "Black";

  
  var Resistor_Preview_Band_4 = document.getElementsByClassName('Band_Strip_3')[0];
  var Resistor_Preview_Band_4_Vertical = document.getElementsByClassName('Band_Strip_Vertical_3')[0];
  Resistor_Preview_Band_4.classList.remove("Band_Strip_3_Active");
  Resistor_Preview_Band_4_Vertical.classList.remove("Band_Strip_Vertical_3_Active");
  
  Resistor_Preview_Band_4.style.backgroundColor = "rgba(0,0,0,0)";
  Resistor_Preview_Band_4_Vertical.style.backgroundColor = "rgba(0,0,0,0)";
  Resistor_Preview_Band_4.style.boxShadow = "none";
  Resistor_Preview_Band_4_Vertical.style.boxShadow = "none";
  
  var LED_Light_Bar_1 = document.getElementsByClassName('LED_Light_Bar_1'); 
  var LED_Light_Bar_2 = document.getElementsByClassName('LED_Light_Bar_2'); 

  var LED_Light_Bar_1 = document.getElementsByClassName('LED_Light_Bar_1'); 
  for(LED_Index = 0; LED_Index < LED_Light_Bar_1.length; LED_Index++){
    LED_Light_Bar_1[LED_Index].classList.add('LED_Light_Bar_Active');
  }
  
  for(LED_Index = 0; LED_Index < LED_Light_Bar_2.length; LED_Index++){
    LED_Light_Bar_2[LED_Index].classList.remove('LED_Light_Bar_Active');
  }
  
  Calculate_Resistance();
  
}
}

function Five_Band_Resistor_Configuration(){
  var Band_3_Buttons = document.getElementsByClassName('Band_3_Buttons');
  for(Button_Index = 0; Button_Index < Band_3_Buttons.length; Button_Index++){
    Band_3_Buttons[Button_Index].disabled = false;    
  }
  
  var Four_Band_LED_Strip = document.getElementById('Four_Band_LED_Strip');
  Four_Band_LED_Strip.style.filter = "opacity(0.1)";
  
  var Five_Band_LED_Strip = document.getElementById('Five_Band_LED_Strip');
  Five_Band_LED_Strip.style.filter = "opacity(0.8)";
  
  var Expand_Button = document.getElementsByClassName('Expand_Button')[0];
  void Expand_Button.offsetWidth;
  Expand_Button.classList.add('Expand_Button_5_Band_State');

  var Status = document.getElementById('Five_Band_Label');
  Status_Style = window.getComputedStyle(Status);
  Status_Colour = String(Status_Style.getPropertyValue('color'));
  
  if(Status_Colour == "rgb(170, 170, 170)"){

    var Bands_In_Row = document.getElementsByClassName('Band_3_Buttons');
    for(Index = 0; Index < Bands_In_Row.length; Index++){
      Bands_In_Row[Index].style.border = "1.5px solid rgba(0, 0, 0, 0.3)";
    }
  
  Bands_In_Row[0].style.border = "1.5px solid white";

  var Band_3_Label = document.getElementsByClassName('Band_3')[0];
  var Band_3_Holder = document.getElementsByClassName('Band_3_Holder')[0];
  Band_3_Label.classList.add("Band_3_Active");
  Band_3_Holder.classList.add("Band_3_Holder_Active");
  var Four_Band_Select_Button = document.getElementsByClassName('Select_4')[0];
  var Five_Band_Select_Button = document.getElementsByClassName('Select_5')[0];
  Four_Band_Select_Button.style.color = "rgb(170,170,170)";
  Five_Band_Select_Button.style.color = "rgb(200,200,200)";

  Five_Band_Select_Button.classList.remove("Squeeze_Animation");
  void Five_Band_Select_Button.offsetWidth;
  Five_Band_Select_Button.classList.add("Squeeze_Animation");

  var Resistor_Preview_Band_4 = document.getElementsByClassName('Band_Strip_3')[0];
  var Resistor_Preview_Band_4_Vertical = document.getElementsByClassName('Band_Strip_Vertical_3')[0];
  Resistor_Preview_Band_4.classList.add("Band_Strip_3_Active");
  Resistor_Preview_Band_4_Vertical.classList.add("Band_Strip_Vertical_3_Active");
  
  Resistor_Preview_Band_4.style.backgroundColor = "rgba(20,20,20,1)";
  Resistor_Preview_Band_4_Vertical.style.backgroundColor = "rgba(20,20,20,1)";
  Resistor_Preview_Band_4.style.boxShadow = "0px 2px 1px rgba(0,0,0,0.5), inset 0px 0.5px 0.2px rgba(255,255,255,0.2)";
  Resistor_Preview_Band_4_Vertical.style.boxShadow = "0px 2px 1px rgba(0,0,0,0.5), inset 0px 0.5px 0.2px rgba(255,255,255,0.2)";

  var LED_Light_Bar_1 = document.getElementsByClassName('LED_Light_Bar_1'); 
  var LED_Light_Bar_2 = document.getElementsByClassName('LED_Light_Bar_2'); 
    
  for(LED_Index = 0; LED_Index < LED_Light_Bar_1.length; LED_Index++){
    LED_Light_Bar_1[LED_Index].classList.remove('LED_Light_Bar_Active');
  }
   
  for(LED_Index = 0; LED_Index < LED_Light_Bar_2.length; LED_Index++){
    LED_Light_Bar_2[LED_Index].classList.add('LED_Light_Bar_Active');
  }
  
  Calculate_Resistance();
  
}
}

function Slide_Menu_Button_Update(){
  var Slide_Menu_Button = document.getElementsByClassName('Slide_Menu_Button')[0];
  style = window.getComputedStyle(Slide_Menu_Button),
  Menu_Symbol_Text_Colour = String(style.getPropertyValue('color'));
  Slide_Menu_Button.classList.remove('Slide_Menu_Button_Rotate');
  Slide_Menu_Button.classList.remove('Slide_Menu_Button_Revert_Rotate');
  void Slide_Menu_Button.offsetWidth;

  if(Menu_Symbol_Text_Colour == "rgb(170, 170, 170)"){
    Slide_Menu_Button.classList.add('Slide_Menu_Button_Rotate');
    var Slide_Down_Menu = document.getElementsByClassName('Drop_Down_Content_Wrapper')[0];
    Slide_Down_Menu.classList.remove('Slide_Down_Animation');
    Slide_Down_Menu.classList.remove('Slide_Up_Animation');
    void Slide_Down_Menu.offsetWidth;
    Slide_Down_Menu.classList.add('Slide_Down_Animation');
  }
  
  if(Menu_Symbol_Text_Colour != "rgb(170, 170, 170)"){
    Slide_Menu_Button.classList.add('Slide_Menu_Button_Revert_Rotate');
    var Slide_Down_Menu = document.getElementsByClassName('Drop_Down_Content_Wrapper')[0];
    Slide_Down_Menu.classList.remove('Slide_Up_Animation');
    Slide_Down_Menu.classList.remove('Slide_Down_Animation');
    void Slide_Down_Menu.offsetWidth;
    Slide_Down_Menu.classList.add('Slide_Up_Animation');
  }
}


function Calculate_Resistance(){
  var Band_1_Colour_Name = String(document.getElementsByClassName('Band_Strip_1')[0].innerHTML);  
  var Band_2_Colour_Name = String(document.getElementsByClassName('Band_Strip_2')[0].innerHTML);  
  var Band_3_Colour_Name = String(document.getElementsByClassName('Band_Strip_3')[0].innerHTML);  
  var Multiplier_Band_Colour_Name = String(document.getElementsByClassName('Band_Strip_4')[0].innerHTML);  
  var Tolerance_Band_Colour_Name = String(document.getElementsByClassName('Band_Strip_5')[0].innerHTML);  
    var Colour_To_Digit_Dictionary = {
        "Black":"0",
        "Brown":"1",
        "Red":"2",
        "Orange":"3",
        "Yellow":"4",
        "Green":"5",
        "Blue":"6",
        "Purple":"7",
        "Grey":"8",
        "White":"9",
        "Gold":"10",
        "Silver":"11",
    }
      var Colour_To_Multiplier_Digit_Dictionary = {
        "Black":"1",
        "Brown":"10",
        "Red":"100",
        "Orange":"1000",
        "Yellow":"10000",
        "Green":"100000",
        "Blue":"1000000",
        "Purple":"10000000",
        "Grey":"",
        "White":"",
        "Gold":"0.1",
        "Silver":"0.01",  
      }
      var Colour_To_Tolerance_Digit_Dictionary = {
        "Black":"",
        "Brown":"± 1%",
        "Red":"± 2%",
        "Orange":"",
        "Yellow":"",
        "Green":"± 0.5%",
        "Blue":"± 0.25%",
        "Purple":"± 0.10%",
        "Grey":"± 0.05%",
        "White":"",
        "Gold":"± 5%",
        "Silver":"± 10%",    
      }     
    if(Is_Four_Band_On()){
      var Colour_Array = [Band_1_Colour_Name,Band_2_Colour_Name,Multiplier_Band_Colour_Name,Tolerance_Band_Colour_Name];  
      var Digit_1 = Colour_To_Digit_Dictionary[Colour_Array[0]];
      var Digit_2 = Colour_To_Digit_Dictionary[Colour_Array[1]];
      var Multiplier = parseFloat(Colour_To_Multiplier_Digit_Dictionary[Colour_Array[2]]);
      var Tolerance_Digit = Colour_To_Tolerance_Digit_Dictionary[Colour_Array[3]];
      var Digits = parseFloat(Digit_1 + Digit_2);
      var Resistance_In_Ohms = parseFloat(Digits*Multiplier);
    }
    if(!Is_Four_Band_On()){
      var Colour_Array = [Band_1_Colour_Name,Band_2_Colour_Name,Band_3_Colour_Name,Multiplier_Band_Colour_Name,Tolerance_Band_Colour_Name];
      var Digit_1 = Colour_To_Digit_Dictionary[Colour_Array[0]];
      var Digit_2 = Colour_To_Digit_Dictionary[Colour_Array[1]];
      var Digit_3 = Colour_To_Digit_Dictionary[Colour_Array[2]];
      var Multiplier = parseFloat(Colour_To_Multiplier_Digit_Dictionary[Colour_Array[3]]);
      var Tolerance_Digit = Colour_To_Tolerance_Digit_Dictionary[Colour_Array[4]];
      var Digits = parseFloat(Digit_1 + Digit_2 + Digit_3);
      var Resistance_In_Ohms = parseFloat(Digits*Multiplier);
    }
    

    if(Resistance_In_Ohms < 1000){
      Resistance_In_Ohms = (Math.round(Resistance_In_Ohms*100))/100;
      var Resistance_String = Resistance_In_Ohms + "Ω";
    }
    if(1000 <= Resistance_In_Ohms && Resistance_In_Ohms < Math.pow(10,6)){
      var Resistance_In_KOhms = parseFloat(Resistance_In_Ohms/1000);
      Resistance_In_KOhms = (Math.round(Resistance_In_KOhms*100))/100;
      var Resistance_String = Resistance_In_KOhms + "KΩ";
    }
    if(Math.pow(10,6) <= Resistance_In_Ohms){
      var Resistance_In_MOhms = parseFloat(Resistance_In_Ohms/Math.pow(10,6));
      Resistance_In_MOhms = (Math.round(Resistance_In_MOhms*100))/100;
      var Resistance_String = Resistance_In_MOhms + "MΩ";
    }
    var Resistance_Label = document.getElementById('Result_Label');
    Resistance_Label.innerHTML = Resistance_String + " " + Tolerance_Digit;
}


function Is_Four_Band_On(){
  
  var Four_Band_LED = document.getElementsByClassName('LED_Light_Bar_1')[0];
  style = window.getComputedStyle(Four_Band_LED),
  Four_Band_LED_Colour = String(style.getPropertyValue('color'));
  if(Four_Band_LED_Colour == "rgb(200, 200, 200)"){
    return true;
  }
  if(Four_Band_LED_Colour != "rgb(200, 200, 200)"){
    return false;
  }  
}

function Colour_Button_Selected(Object){
  var Band_Class = Object.className.split(" ")[0];
  var Bands_In_Row = document.getElementsByClassName(Band_Class);
  for(Index = 0; Index < Bands_In_Row.length; Index++){
    Bands_In_Row[Index].style.border = "1.5px solid rgba(0, 0, 0, 0.3)";
  }
  var Button = document.getElementsByClassName(Object.className)[0];
  Button.style.border = "1.5px solid white";
  Button.classList.remove("Jump_Animation");
  void Button.offsetWidth;
  Button.classList.add("Jump_Animation");
}

function Navigation_Button_Pressed(){
  var Menu_Button = document.getElementById(this.id);
  Menu_Button.classList.remove("Jump_Animation_2");
  void Menu_Button.offsetWidth;
  Menu_Button.classList.add("Jump_Animation_2");
  var Button_Index = parseInt(this.id.split("_")[2]) - 1;
  var Pages = ["./Resistor_Calculator.html","./Resistor_List_Maker.html","./index.html","./Capacitor_Calculator.html","./Digital_Logic_Gates.html"];
  setTimeout(function () {
    window.location.href = Pages[Button_Index];
  }, 200);
}

function Add_To_Recents(){
  var Add_Recent_Button = document.getElementsByClassName('Add_To_Recents_Button')[0];
  Add_Recent_Button.classList.remove("Squeeze_Animation");
  void Add_Recent_Button.offsetWidth;
  Add_Recent_Button.classList.add("Squeeze_Animation");
}

function Move_Pointer(){
    var Button_Index = parseInt(this.id.split("_")[2])-1;
    var Positions = ["9.2%","28.8%","48.9%","69%","88.3%"];
    var Target_Position = Positions[Button_Index];
    var Arrow_Indicator = document.getElementsByClassName('Arrow')[0];
    Arrow_Indicator.style.left = Target_Position;
}

function Entered_Navigation_Bar(){
  var Slide_Bar = document.getElementsByClassName('Bottom_Bar')[0];
  Slide_Bar.style.backgroundColor = "rgb(55,55,55)";
  var Arrow_Indicator = document.getElementsByClassName('Arrow')[0];
  Arrow_Indicator.style.backgroundColor = "rgb(55,55,55)";
  Arrow_Indicator.style.borderBottom = "10px solid rgb(55,55,55)";
}

function Left_Navigation_Bar(){
  var Slide_Bar = document.getElementsByClassName('Bottom_Bar')[0];
  Slide_Bar.style.backgroundColor = "rgb(20,20,20)";
  var Arrow_Indicator = document.getElementsByClassName('Arrow')[0];
  Arrow_Indicator.style.borderBottom = "10px solid rgb(20,20,20)";
}

function Save_To_Recents(){
  var Resistor_Preview_Bands = document.getElementsByClassName('Resistor_Bands');
  var Band_Colours = new Array(5);
  for(Band_Index = 0; Band_Index < Resistor_Preview_Bands.length; Band_Index++){
    Focus_Band_Style = window.getComputedStyle(Resistor_Preview_Bands[Band_Index]);
    Band_Colours[Band_Index] = String(Focus_Band_Style.getPropertyValue('background-color'));  
  }
  
  var Band_Type = "Five Band Resistor";
  var Four_Band_LED_State = window.getComputedStyle(document.getElementsByClassName('LED_Light_Bar_1')[0]).getPropertyValue('background-color');
  if(Four_Band_LED_State == "rgba(255, 255, 255, 0.95)"){  
    var Container = Band_Colours[2];
    Band_Colours[2] = Band_Colours[3];
    Band_Colours[3] = Container;
    Band_Type = "Four Band Resistor";
  }
  
  var Number_Of_Matching_Resistors = 0;
  var Number_Of_Band_Groups = 5;
  var Kernel_Of_Colour_Bands = new Array(5);
  for(Band_Group_Index = 0; Band_Group_Index < Number_Of_Band_Groups; Band_Group_Index++){
  var Band_Group = document.getElementsByClassName('Recents_' + String(Band_Group_Index+1));
  for(Resistor_Band_Number = 0; Resistor_Band_Number < Band_Group.length; Resistor_Band_Number++){
    Focus_Band_Style = window.getComputedStyle(Band_Group[Resistor_Band_Number]);
    Kernel_Of_Colour_Bands[Resistor_Band_Number] = String(Focus_Band_Style.getPropertyValue('background-color'));  
  }

var Is_Matching = Do_Arrays_Match(Band_Colours,Kernel_Of_Colour_Bands);
if(Is_Matching == true){
  Number_Of_Matching_Resistors = Number_Of_Matching_Resistors + 1;
}
}

if(Number_Of_Matching_Resistors == 0){
  var Number_Of_Bands = 5;
  var Available_Bands = new Array(5);
  var Tile_Positions = new Array(5);
  for(Band_Index = 1; Band_Index <= Number_Of_Bands; Band_Index++){
    var Band_Class_Name = 'Recents_' + String(Band_Index);
    var Tile_Class_Name = 'Recents_Tiles_' + String(Band_Index);
    Band_Style = window.getComputedStyle(document.getElementsByClassName(Band_Class_Name)[0]).getPropertyValue('background-color');
    Tile_Style = window.getComputedStyle(document.getElementsByClassName(Tile_Class_Name)[0]).getPropertyValue('grid-column').split("/")[0];
      if(Band_Style == "rgba(0, 0, 0, 0)"){
        Available_Bands[Band_Index-1] = "Available_" + String(Band_Index);
      }
      if(Tile_Style == 5){
          var Tile_To_Jump_Class_Name = Tile_Class_Name;
      }
      Tile_Positions[Band_Index-1] = Tile_Style;
  }
  Shift_Tiles(Tile_Positions);

  var Current_Arrays = document.getElementsByClassName('Tiles');
  var Number_Of_Tiles = 5;
  var Current_Tile_Positions = new Array(5);
for(Tile_Index = 0; Tile_Index < Number_Of_Tiles; Tile_Index++){
  Current_Tile_Positions[Tile_Index] = parseInt(window.getComputedStyle(Current_Arrays[Tile_Index]).getPropertyValue('grid-column').split("/")[0]);
}

var Tile_Index_To_Change = Current_Tile_Positions.indexOf(1) + 1;
var Resistors_To_Change = document.getElementsByClassName('Recents_' + String(Tile_Index_To_Change));

for(Change_Index = 0; Change_Index < Resistors_To_Change.length; Change_Index++){
  Resistors_To_Change[Change_Index].style.backgroundColor = String(Band_Colours[Change_Index]);
  Resistors_To_Change[Change_Index].classList.remove('Colour_Band_Shadow_Active');
  void Resistors_To_Change[Change_Index].offsetWidth;
  if(String(Band_Colours[Change_Index]) != "rgba(0, 0, 0, 0)"){
    Resistors_To_Change[Change_Index].classList.add('Colour_Band_Shadow_Active');
  }
}
var Resistance_Value = document.getElementById('Result_Label').innerHTML;
var Resistance_Label_To_Change = document.getElementsByClassName('Resistance_Values')[parseInt(Tile_Index_To_Change-1)];
var Resistor_Type_Label_To_Change = document.getElementsByClassName('Resistor_Label')[parseInt(Tile_Index_To_Change-1)];
Resistance_Label_To_Change.innerHTML = Resistance_Value;
Resistor_Type_Label_To_Change.innerHTML = Band_Type;



}
}

function Do_Arrays_Match(Array_1,Array_2){
  var Is_A_Match = Array_1.every(function(element, index) {
      return element === Array_2[index]; 
  });
  return Is_A_Match;
}


function Shift_Tiles(Tile_Positions){
  var Number_Of_Tiles = 5;
  var Tiles = document.getElementsByClassName('Tiles');
  
  for(Tile_Index = 0; Tile_Index < Number_Of_Tiles; Tile_Index++){
  var Position = parseInt(Tile_Positions[Tile_Index]) + 1;
  Position = Position % 6;
  if(Position == 0){
    Position = 1;
  }

    Tiles[Tile_Index].classList.remove('Translate_Tiles_Animation');
    void Tiles[Tile_Index].offsetWidth;
    Tiles[Tile_Index].classList.add('Translate_Tiles_Animation');    
    Tiles[Tile_Index].style.gridColumn = Position;
  }  
}

function Expand_Colour_Palette(){
  var Four_Band_LED_State = window.getComputedStyle(document.getElementsByClassName('LED_Light_Bar_1')[0]).getPropertyValue('background-color');
  if(Four_Band_LED_State == "rgba(255, 255, 255, 0.95)"){ 
    Five_Band_Resistor_Configuration();
  }
  else{
    Four_Band_Resistor_Configuration();
  }
}

function checkMobile() {
  var Mobile_Flag = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(Mobile_Flag){
    var Multiplier_Button_Labels = document.getElementsByClassName('Multiplier_Band_Buttons');
    var Tolerance_Button_Labels = document.getElementsByClassName('Tolerance_Band_Buttons');
    for(Button_Index = 1; Button_Index < Multiplier_Button_Labels.length; Button_Index++){
    Multiplier_Button_Labels[Button_Index].classList.add('Multiplier_Band_Buttons_Active');
    Tolerance_Button_Labels[Button_Index].classList.add('Tolerance_Band_Buttons_Active');
    }
  }
}

function Adjust_Mobile_Menu() {
  var Mobile_Flag = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if(Mobile_Flag){
  var Mobile_Menu = document.getElementsByClassName('Slide_Menu_Button')[0];
  Mobile_Menu.classList.add('Slide_Menu_Button_Mobile');
    }
  }
