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

  var Slider = document.getElementById('Tolerance_Slider');
  Slider.addEventListener("input",Update_Tolerance); 
  
  var Code_Buttons = document.getElementsByClassName('Digit_Buttons');
  for(Button_Index = 0; Button_Index < Code_Buttons.length; Button_Index++){
    Code_Buttons[Button_Index].addEventListener("input",Update_Capacitor_Preview);
    Code_Buttons[Button_Index].addEventListener("click",Field_Clicked);
  }
  
  var Switch_Button = document.getElementsByClassName('Swap_Button')[0];
  Switch_Button.addEventListener("click",Switch_Inputs);
  
  var Unit_Button = document.getElementsByClassName('Unit_Square')[0];
  Unit_Button.addEventListener("click",Switch_Units);
    
  var Capacitance_Input_Field = document.getElementsByClassName('Result_Inset')[0];
  Capacitance_Input_Field.addEventListener("input",Change_Input_Capacitance);

  var Tolerance_Selector = document.getElementsByClassName('Tolerance_Value')[0];
  Tolerance_Selector.addEventListener("click",Switch_Tolerance);
  
  var Value_Inputs = document.getElementsByClassName('Value_Inputs');
  var Code_Inputs = document.getElementsByClassName('Code_Inputs');
  for(Code_Index = 0; Code_Index < Code_Inputs.length; Code_Index++){
    Code_Inputs[Code_Index].addEventListener("mouseenter",Highlight);
    Code_Inputs[Code_Index].addEventListener("mouseleave",Unhighlight);
    Value_Inputs[Code_Index].addEventListener("mouseenter",Highlight);
    Value_Inputs[Code_Index].addEventListener("mouseleave",Unhighlight);
  }  
  
  Adjust_Mobile_Menu();
  
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
    Capacitor_Code = String(parseInt(Capacitor_Code));
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
  // console.log(Capacitance_In_Picofarads);
  
  /*
  pF -> 10^-12 
  nF -> 10^-9 (1000 conversion factor)
  µF -> 10^-6 (1000*1000 conversion factor)
  mF -> 10^-3 (1000*1000*1000 conversion factor)
  */
  
  if(Capacitance_In_Picofarads <= 990){
    var Capacitance = Capacitance_In_Picofarads;
    var Unit_String = "pF";
  }
  
  if(990 < Capacitance_In_Picofarads && Capacitance_In_Picofarads <= 990000){
    var Capacitance = Capacitance_In_Picofarads/1000;
    var Unit_String = "nF";
  }
  
  if(990000 < Capacitance_In_Picofarads && Capacitance_In_Picofarads <= 990000000){
    var Capacitance = Capacitance_In_Picofarads/(1000*1000);
    var Unit_String = "µF";
  }
  
  if(990000000 < Capacitance_In_Picofarads){
    var Capacitance = Capacitance_In_Picofarads/(1000*1000*1000);
    var Unit_String = "mF";
  }
  
  var Result_Display = document.getElementsByClassName('Result_Inset')[0];
  Result_Display.value = Capacitance;
  var Unit_Display = document.getElementsByClassName('Unit_Square')[0];
  Unit_Display.value = Unit_String;
  Unit_Display.innerHTML = Unit_String;
  
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
  "Z": "Tolerance: - 20% to + 80%"};
  var Tolerance_Value = Tolerance_Dictionary[Tolerance_Letter];
  document.getElementsByClassName('Tolerance_Value')[0].value = Tolerance_Value;  
  document.getElementsByClassName('Tolerance_Value')[0].innerHTML = Tolerance_Value;  
}

function Switch_Inputs(){
  var Left_Input_Panel = document.getElementsByClassName('Left_Panel')[0];
  var Right_Input_Panel = document.getElementsByClassName('Right_Panel')[0];  
  var Swap_Button = document.getElementsByClassName('Swap_Button')[0];
  var Code_Buttons = document.getElementsByClassName('Digit_Buttons');
  var Result_Inset = document.getElementsByClassName('Result_Inset')[0];
  var Unit_Square = document.getElementsByClassName('Unit_Square')[0];
  var Tolerance_Value = document.getElementsByClassName('Tolerance_Value')[0];
  var Left_Header = document.getElementById('Input_Header');
  var Right_Header = document.getElementById('Result_Header');
  var Tutorial_Panel_1 = document.getElementsByClassName('Function_Panel_1')[0];
  var Tutorial_Panel_2 = document.getElementsByClassName('Function_Panel_3')[0];

  Swap_Button.classList.remove('Jump_Animation_2');
  void Swap_Button.offsetWidth;
  Swap_Button.classList.add('Jump_Animation_2');

  Preview_Grid_Column = parseInt((window.getComputedStyle(Left_Input_Panel).getPropertyValue('grid-column')).split("/")[0]);
  
  if(Preview_Grid_Column == 1){
    Left_Input_Panel.classList.add('Left_Panel_Swapped');
    Right_Input_Panel.classList.add('Right_Panel_Swapped');
    Swap_Button.classList.add('Swap_Button_Swapped');
    document.getElementById("Tolerance_Slider").disabled = true;
    for(Index = 0; Index < Code_Buttons.length; Index++){
      Code_Buttons[Index].disabled = true;
      Code_Buttons[Index].classList.add('Colour_Swap_2');
    }
    Result_Inset.classList.add('Colour_Swap');
    Unit_Square.classList.add('Colour_Swap');
    Tolerance_Value.classList.add('Colour_Swap');
    Result_Inset.disabled = false;
    Unit_Square.disabled = false;
    Tolerance_Value.disabled = false;
    Left_Header.innerHTML = "Inputs: Capacitance Value";
    Right_Header.innerHTML = "Result: Capacitor Code";
    Tutorial_Panel_1.classList.add('Function_Panel_1_Swapped');
    Tutorial_Panel_2.classList.add('Function_Panel_3_Swapped');  
  }

  if(Preview_Grid_Column == 5){
    Left_Input_Panel.classList.remove('Left_Panel_Swapped');
    Right_Input_Panel.classList.remove('Right_Panel_Swapped'); 
    Swap_Button.classList.remove('Swap_Button_Swapped');   
    document.getElementById("Tolerance_Slider").disabled = false;
    for(Index = 0; Index < Code_Buttons.length; Index++){
      Code_Buttons[Index].disabled = false;
      Code_Buttons[Index].classList.remove('Colour_Swap_2');
    }
    Result_Inset.classList.remove('Colour_Swap');
    Unit_Square.classList.remove('Colour_Swap');
    Tolerance_Value.classList.remove('Colour_Swap');
    Result_Inset.disabled = true;
    Unit_Square.disabled = true;
    Tolerance_Value.disabled = true;
    Left_Header.innerHTML = "Inputs: Capacitor Code";
    Right_Header.innerHTML = "Result: Capacitance Value";
    Tutorial_Panel_1.classList.remove('Function_Panel_1_Swapped');
    Tutorial_Panel_2.classList.remove('Function_Panel_3_Swapped');  
  }
}

function Switch_Units(){
  var Capacitance_Input_Field = document.getElementsByClassName('Result_Inset')[0];
  var Current_Capacitance_Value = parseInt(Capacitance_Input_Field.value);
  var Previous_Unit = String(document.getElementsByClassName('Unit_Square')[0].value);
  var Units_Dictionary = ["pF","nF","µF","mF"];
  var Next_Index = Units_Dictionary.indexOf(Previous_Unit) + 1;
  Next_Index = Next_Index % 4;
  if(Next_Index != 0){
    Capacitance_Input_Field.value = Current_Capacitance_Value/1000;
  }
  
  if(Next_Index == 0){
    Capacitance_Input_Field.value = Current_Capacitance_Value*(1000*1000*1000);
  }
  
  var Current_Unit = Units_Dictionary[Next_Index];
  var Unit_Square_Element = document.getElementsByClassName('Unit_Square')[0];
  Unit_Square_Element.value = Current_Unit;
  Unit_Square_Element.innerHTML = Current_Unit;
  Unit_Square_Element.classList.remove('Jump_Animation_2');
  void Unit_Square_Element.offsetWidth;
  Unit_Square_Element.classList.add('Jump_Animation_2');
  Change_Input_Capacitance();
  Calculate_Capacitor_Code();
}

function Change_Input_Capacitance(){
  var Current_Unit = String(document.getElementsByClassName('Unit_Square')[0].value);
  if(Current_Unit == "pF"){
    var Maximum = 99000000000;
  }
  if(Current_Unit == "nF"){
    var Maximum = 99000000;
  }
  if(Current_Unit == "µF"){
    var Maximum = 99000;
  }
  if(Current_Unit == "mF"){
    var Maximum = 99;
  }
  
  var Capacitance_Input_Field = document.getElementsByClassName('Result_Inset')[0];
  var Input_Value = parseInt(Capacitance_Input_Field.value);
  Capacitance_Input_Field.value = Input_Value;
  
  if(isNaN(Input_Value)){
    Capacitance_Input_Field.value = "";
  }
  if(Input_Value > Maximum){
    Capacitance_Input_Field.value = "Max";
  }

  Calculate_Capacitor_Code();
}

function Switch_Tolerance(){
  
  var Tolerance_Dictionary = ["Tolerance: ± 0.1%","Tolerance: ± 0.25%","Tolerance: ± 0.5%","Tolerance: ± 1%","Tolerance: ± 2%","Tolerance: ± 5%","Tolerance: ± 10%","Tolerance: ± 20%","Tolerance: - 20% to + 80%"];  
  var Tolerance_Field = document.getElementsByClassName('Tolerance_Value')[0];  
  Tolerance_Field.classList.remove('Jump_Animation_2');
  void Tolerance_Field.offsetWidth;
  Tolerance_Field.classList.add('Jump_Animation_2');
  var Current_Tolerance = String(Tolerance_Field.value); 
  var Next_Tolerance_Index = Tolerance_Dictionary.indexOf(Current_Tolerance) + 1;
  Next_Tolerance_Index = Next_Tolerance_Index % Tolerance_Dictionary.length;
  Tolerance_Field.value = Tolerance_Dictionary[Next_Tolerance_Index];
  Tolerance_Field.innerHTML = Tolerance_Dictionary[Next_Tolerance_Index];
  Tolerance_Slider.value = Next_Tolerance_Index  
  var Tolerance_Code = ["B","C","D","F","G","J","K","M","Z"];
  document.getElementById('Selected_Label').innerHTML = Tolerance_Code[Next_Tolerance_Index];
  var Current_Capacitor_Code = document.getElementById('Capacitor_Value');
  var Code_Digits = Current_Capacitor_Code.innerHTML.substring(0,Current_Capacitor_Code.innerHTML.length - 1);
  Current_Capacitor_Code.innerHTML = Code_Digits + Tolerance_Code[Next_Tolerance_Index];  
}

function Calculate_Capacitor_Code(){
  var Capacitance_Input_Field = document.getElementsByClassName('Result_Inset')[0];
  var Units_Input_Field = document.getElementsByClassName('Unit_Square')[0];
  var Tolerance_Input_Field = document.getElementsByClassName('Tolerance_Value')[0];
  var Capacitance_Digits = Capacitance_Input_Field.value;
  var Unit_Symbol = Units_Input_Field.value;
  var Unit_Multiplier_Conversion_Dictionary = {
    "pF":1,
    "nF":1000,
    "µF":1000*1000,
    "mF":1000*1000*1000
    }
    
  var Conversion_Factor = Unit_Multiplier_Conversion_Dictionary[Unit_Symbol];
  var Capacitance_In_Picofarads = Capacitance_Digits*Conversion_Factor;
  var Order_Digit = String(String(Capacitance_In_Picofarads).length - 2);
  var Round_Order_Factor = 10**(Order_Digit);
  var Significant_Digits = String(Math.round(Capacitance_In_Picofarads/Round_Order_Factor));
  var Capacitor_Display_Code = String(Significant_Digits + Order_Digit);
  
  if(parseInt(Order_Digit) < 0){
    Capacitor_Display_Code = String(Capacitance_Digits);
  }
  
  var Capacitor_Code_Containers = document.getElementsByClassName('Digit_Buttons');
  var Button_Limit = String(Capacitor_Display_Code).length;
  
  for(Container_Index = 0; Container_Index <= 2; Container_Index++){
    Capacitor_Code_Containers[Container_Index].value = "";
  }
  
  if(Capacitance_Digits != "Max" && Capacitance_Digits != "Min"){
  if(Capacitor_Display_Code != "0"){
    for(Container_Index = 0; Container_Index < Capacitor_Display_Code.length; Container_Index++){
      Capacitor_Code_Containers[Container_Index].value = Capacitor_Display_Code.split("")[Container_Index];
    }
    }
  }
  
  if(Capacitor_Display_Code == "0"){
    Capacitor_Display_Code = "";
  }
  
  var Digit_1 = String(document.getElementsByClassName('Digit_Buttons')[0].value);
  var Digit_2 = String(document.getElementsByClassName('Digit_Buttons')[1].value);
  var Digit_3 = String(document.getElementsByClassName('Digit_Buttons')[2].value);

  var Display_Code = Digit_1 + Digit_2 + Digit_3;
  
  var Tolerance_Letter = document.getElementById('Selected_Label').innerHTML;  
  var Capacitor_Preview = document.getElementById('Capacitor_Value');
  Capacitor_Preview.innerHTML = Display_Code + Tolerance_Letter;

}


function Highlight(){
  var Highlight_Object = document.getElementById(this.id);
  Highlight_Object.classList.add('Active_Input');  
}

function Unhighlight(){
  var Highlight_Object = document.getElementById(this.id);
  Highlight_Object.classList.remove('Active_Input');
}


function Adjust_Mobile_Menu() {
  var Mobile_Flag = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(Mobile_Flag){
    var Digit_Buttons = document.getElementsByClassName('Digit_Buttons');
    for(Button_Index = 0; Button_Index < Digit_Buttons.length; Button_Index++){
      Digit_Buttons[Button_Index].classList.add('Digit_Buttons_Mobile_Configuration');    
    }
    }
  }



function Field_Clicked(){
  var Text_Field = document.getElementById(this.id);
  Text_Field.focus();
  Text_Field.selectionStart = Text_Field.selectionEnd = 1;
  
}


 
