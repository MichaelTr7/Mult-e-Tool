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

  var Indicator_Buttons = document.getElementsByClassName('Not_Active');
  for(Index = 0; Index < Indicator_Buttons.length; Index++){
    Indicator_Buttons[Index].addEventListener("mouseenter",Display_Gate_Name);
    Indicator_Buttons[Index].addEventListener("mouseleave",Hide_Gate_Name);
  }


  Adjust_Mobile_Menu();
  $('.carousel').carousel({interval: false});
}

function Display_Gate_Name(){
  var Gate_Label = document.getElementsByClassName('Logic_Gate_Label')[0];
  var Gate_Names = ["AND","NAND","OR","NOR","XOR","XNOR","NOT","BUFFER"];
  var Indicator_Index = parseInt((String(this.id)).split("_")[1]);
  Gate_Label.innerHTML = Gate_Names[Indicator_Index-1];
  Gate_Label.classList.add('Logic_Gate_Label_Active');

}
  
function Hide_Gate_Name(){
  var Gate_Label = document.getElementsByClassName('Logic_Gate_Label')[0];
  Gate_Label.classList.remove('Logic_Gate_Label_Active');
}
  
  
  
  
  
  
  
  
  
  

