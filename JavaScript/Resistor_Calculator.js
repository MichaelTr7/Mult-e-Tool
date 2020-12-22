

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
  console.log(Button_Index);
  var Pages = ["./index.html","","","",""];
  window.location.href = Pages[Button_Index];
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
  console.log("Saving to Recents");
  
}




