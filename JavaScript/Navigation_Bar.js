
function Move_Pointer(){
    var Button_Index = parseInt(this.id.split("_")[2])-1;
    var Positions = ["9.2%","28.8%","48.9%","69%","88.3%"];
    var Target_Position = Positions[Button_Index];
    var Arrow_Indicator = document.getElementsByClassName('Arrow')[0];
    Arrow_Indicator.style.left = Target_Position;
}

function Navigation_Button_Pressed(){
  var Menu_Button = document.getElementById(this.id);
  Menu_Button.classList.remove("Jump_Animation_2");
  void Menu_Button.offsetWidth;
  Menu_Button.classList.add("Jump_Animation_2");
  var Button_Index = parseInt(this.id.split("_")[2]) - 1;
  console.log(Button_Index);
  var Pages = ["./Resistor_Calculator.html","./Digital_Logic_Gates.html","../index.html","./Capacitor_Calculator.html","./Resistor_List_Maker.html"];
    window.location.href = Pages[Button_Index];
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

function Adjust_Mobile_Menu() {
  var Mobile_Flag = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if(Mobile_Flag){
  var Mobile_Menu = document.getElementsByClassName('Slide_Menu_Button')[0];
  Mobile_Menu.classList.add('Slide_Menu_Button_Mobile');
    }
  }
