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
    Code_Buttons[Button_Index].addEventListener("input",Update_Capacitor_Preview);
  }
    
}

function Update_Tolerance(){
  var Slider = document.getElementById('Tolerance_Slider');
  var Capacitor_Value_Label = document.getElementById('Capacitor_Value');
  var Current_Value = Capacitor_Value_Label.innerHTML;
  Current_Value = Current_Value.substring(0,Current_Value.length - 1);
  var Tolerance_Code = ["B","C","D","F","G","J","K","M","Z"];
  document.getElementById('Selected_Label').innerHTML = String(Tolerance_Code[parseInt(Slider.value)]);
  
  var Capacitor_Code = "";
  var Code_Buttons = document.getElementsByClassName('Digit_Buttons');
  for(Button_Index = 0; Button_Index < Code_Buttons.length; Button_Index++){
    Capacitor_Code = Capacitor_Code + String(Code_Buttons[Button_Index].value);
  }
  
  var Tolerance_Letter = String(Tolerance_Code[parseInt(Slider.value)])
  var Capacitor_Value_Label = document.getElementById('Capacitor_Value');
  Capacitor_Value_Label.innerHTML = Capacitor_Code + Tolerance_Letter;
  Calculate_Tolerance(Tolerance_Letter);
  }

function Update_Capacitor_Preview(){
    var Key_Pressed = event.which;
    var Key_Code =  event.keyCode;
    var Valid_Keys = [48,49,50,51,52,53,54,55,56,57];
    var Current_Text_Element = parseInt(document.getElementById(this.id).value);
    
    if(isNaN(Current_Text_Element)){
      document.getElementById(this.id).value = "";
      // event.preventDefault();
    }    

    var Capacitor_Code = "";
    var Code_Buttons = document.getElementsByClassName('Digit_Buttons');
    for(Button_Index = 0; Button_Index < Code_Buttons.length; Button_Index++){
      Capacitor_Code = Capacitor_Code + String(Code_Buttons[Button_Index].value);
    }
    
    var Capacitor_Value_Label = document.getElementById('Capacitor_Value');
    var Tolerance_Code = String(document.getElementById('Selected_Label').innerHTML);
    Capacitor_Value_Label.innerHTML = Capacitor_Code + Tolerance_Code;
    Calculate_Capacitance(Capacitor_Code)
}

function Calculate_Capacitance(Capacitor_Code){
  var Significant_Digits = Capacitor_Code.substring(0,2);
  if(Capacitor_Code.length <= 2){
    var Trailing_Zeroes_Factor = 0;
    var Trailing_Zeroes_String = "";
  }
  else{
    var Trailing_Zeroes_Factor = parseInt(Capacitor_Code.split("").pop());
    var Trailing_Zeroes_String = String(10**Trailing_Zeroes_Factor);
    Trailing_Zeroes_String = Trailing_Zeroes_String.substring(1,Trailing_Zeroes_String.length);
  }
  
  var Capacitance_In_Picofarads = Significant_Digits + Trailing_Zeroes_String;
  console.log(Capacitance_In_Picofarads);
  
  /*Three maximum digits*/
  // if(){
  // 
  //   var Unit_String = "";
  // }
  // 
  // if(){
  // 
  //   var Unit_String = "";
  // }
  // 
  // if(){
  // 
  //   var Unit_String = "";
  // }
  // 
  // if(){
  // 
  //   var Unit_String = "";
  // 
  // }
  // 
  
  
}

function Calculate_Tolerance(Tolerance_Letter){
  var Tolerance_Dictionary = {
  "B": "Tolerance: ± 0.1%",
  "C": "Tolerance: ± 0.25%",
  "D": "Tolerance: ± 0.5%",
  "F": "Tolerance: ± 1%",
  "G": "Tolerance: ± 2%",
  "J": "Tolerance: ± 5%",
  "K": "Tolerance: ± 10%",
  "M": "Tolerance: ± 20%",
  "Z": "Tolerance: - 20% to + 80% "};
  var Tolerance_Value = Tolerance_Dictionary[Tolerance_Letter];
  document.getElementsByClassName('Tolerance_Value')[0].value = Tolerance_Value;  
}










 
