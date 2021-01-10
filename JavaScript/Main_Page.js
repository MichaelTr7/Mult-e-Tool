window.onload = function(){

  var Top_Bar_Buttons = document.getElementsByClassName('Menu_Buttons');
  for(Navigation_Button_Index = 0; Navigation_Button_Index < Top_Bar_Buttons.length; Navigation_Button_Index++){
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("click",Navigation_Button_Pressed);
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("mouseenter",Move_Pointer);
  }

  var Slide_Menu_Button = document.getElementsByClassName('Slide_Menu_Button')[0];
  Slide_Menu_Button.addEventListener("click",Slide_Menu_Button_Update);

  var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
  Top_Bar_Wrapper.addEventListener("mouseenter",Entered_Navigation_Bar);

  var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
  Top_Bar_Wrapper.addEventListener("mouseleave",Left_Navigation_Bar);

  var Launch_Buttons = document.getElementsByClassName('Launch_Buttons');
  for(Index = 0; Index < Launch_Buttons.length; Index++){
  Launch_Buttons[Index].addEventListener("click",Launch_Webapp);
  }
  
  Adjust_Mobile_Menu();
}

function Launch_Webapp(){
  var Webapp_Index = parseInt(document.getElementById(this.id).value) - 1;
  var Webapp_Pages = ["./Resistor_Calculator.html","./Capacitor_Calculator.html","./Digital_Logic_Gates.html"];
  var Webapp_Link = Webapp_Pages[Webapp_Index];
  console.log(Webapp_Link);
  
  window.location.href = Webapp_Link;

  // setTimeout(function () {
  //   window.location.href = Webapp_Pages[];
  // }, 200);
}