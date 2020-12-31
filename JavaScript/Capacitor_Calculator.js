window.onload = function(){
  var Top_Bar_Buttons = document.getElementsByClassName('Menu_Buttons');
  for(Navigation_Button_Index = 0; Navigation_Button_Index < Top_Bar_Buttons.length; Navigation_Button_Index++){
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("click",Navigation_Button_Pressed);
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("mouseenter",Move_Pointer);
  }
  
  var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
  Top_Bar_Wrapper.addEventListener("mouseenter",Entered_Navigation_Bar);

  var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
  Top_Bar_Wrapper.addEventListener("mouseleave",Left_Navigation_Bar);

  var Slider = document.getElementById('Tolerance_Slider');
  Slider.addEventListener("input",Update_Tolerance); 
  
  var Code_Buttons = document.getElementsByClassName('Digit_Buttons');
  for(Button_Index = 0; Button_Index < Code_Buttons.length; Button_Index++){
    Code_Buttons[Button_Index].addEventListener("input",Update_Capacitor_Preview)
  }
}

function Update_Tolerance(){
  var Slider = document.getElementById('Tolerance_Slider');
  var Capacitor_Value_Label = document.getElementById('Capacitor_Value');
  var Current_Value = Capacitor_Value_Label.innerHTML;
  Current_Value = Current_Value.substring(0,Current_Value.length - 1);
  var Tolerance_Code = ["B","C","D","F","G","J","K","M","Z"];
  document.getElementById('Selected_Label').innerHTML = String(Tolerance_Code[parseInt(Slider.value)]);
  var Updated_Capacitor_Code = Current_Value + String(Tolerance_Code[parseInt(Slider.value)]);
  Capacitor_Value_Label.innerHTML = Updated_Capacitor_Code;  
}

function Update_Capacitor_Preview(){
  console.log("Update Capacitor Value");





  
}

