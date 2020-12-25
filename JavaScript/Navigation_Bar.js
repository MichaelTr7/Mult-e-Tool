
window.onload = function(){

  var Top_Bar_Buttons = document.getElementsByClassName('Menu_Buttons');
  for(Navigation_Button_Index = 0; Navigation_Button_Index < Top_Bar_Buttons.length; Navigation_Button_Index++){
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("click",Navigation_Button_Pressed);
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("mouseenter",Move_Pointer);
  }

}

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
  var Pages = ["./Resistor_Calculator.html","./Resistor_List_Maker.html","./index.html","./Capacitor_Calculator.html","./Digital_Logic_Gates.html"];
  setTimeout(function () {
    window.location.href = Pages[Button_Index];
  }, 200);
}