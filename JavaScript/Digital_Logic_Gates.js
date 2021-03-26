window.onload = function(){

  Adjust_Mobile_Menu();  

  var Top_Bar_Buttons = document.getElementsByClassName('Menu_Buttons');
  for(Navigation_Button_Index = 0; Navigation_Button_Index < Top_Bar_Buttons.length; Navigation_Button_Index++){
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("click",Navigation_Button_Pressed);
      Top_Bar_Buttons[Navigation_Button_Index].addEventListener("mouseenter",Move_Pointer);
  }

  var Slide_Menu_Button = document.getElementsByClassName('Slide_Menu_Button')[0];
  Slide_Menu_Button.addEventListener("click",Slide_Menu_Button_Update);
  
  // var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
  // Top_Bar_Wrapper.addEventListener("mouseenter",Entered_Navigation_Bar);
  // 
  // var Top_Bar_Wrapper = document.getElementsByClassName('Top_Bar')[0];
  // Top_Bar_Wrapper.addEventListener("mouseleave",Left_Navigation_Bar);

  var Face_Elements = document.getElementsByClassName('Gate_Faces');
  for(Index = 0; Index < Face_Elements.length; Index++){
    Face_Elements[Index].addEventListener("click",Face_Pressed);
  }

  var Indicator_Buttons = document.getElementsByClassName('Not_Active');
  for(Index = 0; Index < Indicator_Buttons.length; Index++){
    Indicator_Buttons[Index].addEventListener("mouseenter",Display_Gate_Name);
    Indicator_Buttons[Index].addEventListener("mouseleave",Hide_Gate_Name);
  }
  
  var AND_LEDs = document.getElementsByClassName('AND_Gate')[0].children;
  var NAND_LEDs = document.getElementsByClassName('NAND_Gate')[0].children;
  var OR_LEDs = document.getElementsByClassName('OR_Gate')[0].children;
  var NOR_LEDs = document.getElementsByClassName('NOR_Gate')[0].children;
  var XOR_LEDs = document.getElementsByClassName('XOR_Gate')[0].children;
  var XNOR_LEDs = document.getElementsByClassName('XNOR_Gate')[0].children;
  var BUFFER_LEDs = document.getElementsByClassName('BUFFER_Gate')[0].children;
  var NOT_LEDs = document.getElementsByClassName('NOT_Gate')[0].children;

  for(LED_Index = 0; LED_Index < AND_LEDs.length-1; LED_Index++){
    AND_LEDs[LED_Index].addEventListener("click",Update_AND_Gate);
    NAND_LEDs[LED_Index].addEventListener("click",Update_NAND_Gate);
    OR_LEDs[LED_Index].addEventListener("click",Update_OR_Gate);
    NOR_LEDs[LED_Index].addEventListener("click",Update_NOR_Gate);
    XOR_LEDs[LED_Index].addEventListener("click",Update_XOR_Gate);
    XNOR_LEDs[LED_Index].addEventListener("click",Update_XNOR_Gate);
    BUFFER_LEDs[LED_Index].addEventListener("click",Update_BUFFER_Gate);
    NOT_LEDs[LED_Index].addEventListener("click",Update_NOT_Gate);
  }
  
  var Style_Toggle_Buttons = document.getElementsByClassName('Style_Toggle');
  for(Button_Index = 0; Button_Index < Style_Toggle_Buttons.length; Button_Index++){
    Style_Toggle_Buttons[Button_Index].addEventListener("click",Toggle_Style);
  }
    
  // Logic gates initial states
  document.getElementById('NAND_Output').classList.add('LED_ON');
  document.getElementById('NOR_Output').classList.add('LED_ON');
  document.getElementById('XNOR_Output').classList.add('LED_ON');
  document.getElementById('NOT_Output').classList.add('LED_ON');

  var Gate_Types = ["AND_Binary","NAND_Binary","OR_Binary","NOR_Binary","XOR_Binary","XNOR_Binary","BUFFER_Binary","NOT_Binary"];
  
for(Gate_Index = 0; Gate_Index < Gate_Types.length; Gate_Index++){
  var Initial_States = document.getElementsByClassName(Gate_Types[Gate_Index]);
  Initial_States[2].classList.add('Light_Up_Value');
  Initial_States[3].classList.add('Light_Up_Value');
  if(Gate_Types[Gate_Index] != "BUFFER_Binary" & Gate_Types[Gate_Index] != "NOT_Binary"){
  Initial_States[4].classList.add('Light_Up_Value');
  }
}
}

function Update_AND_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);  
  var Input_1_State = document.getElementById('AND_Input_1').classList.contains('LED_ON');
  var Input_2_State = document.getElementById('AND_Input_2').classList.contains('LED_ON');
  var Output_State = Boolean(Input_1_State & Input_2_State);  
  if(Output_State){document.getElementById('AND_Output').classList.add('LED_ON');}
  else{document.getElementById('AND_Output').classList.remove('LED_ON');}
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('AND_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('AND_Right_Eyes');
  if(Eye_To_Toggle == 1){
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
  }
  if(Eye_To_Toggle == 2){
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
  }  
}

function Update_NAND_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('NAND_Input_1').classList.contains('LED_ON');
  var Input_2_State = document.getElementById('NAND_Input_2').classList.contains('LED_ON');
  var Output_State = !Boolean(Input_1_State & Input_2_State)
  if(Output_State){document.getElementById('NAND_Output').classList.add('LED_ON');}
  else{document.getElementById('NAND_Output').classList.remove('LED_ON');}
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('NAND_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('NAND_Right_Eyes');
  if(Eye_To_Toggle == 1){
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
  }
  if(Eye_To_Toggle == 2){
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
  }  
}

function Update_OR_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('OR_Input_1').classList.contains('LED_ON');
  var Input_2_State = document.getElementById('OR_Input_2').classList.contains('LED_ON');
  var Output_State = Boolean(Input_1_State|Input_2_State);
  if(Output_State){document.getElementById('OR_Output').classList.add('LED_ON');}
  else{document.getElementById('OR_Output').classList.remove('LED_ON');}
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('OR_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('OR_Right_Eyes');
  if(Eye_To_Toggle == 1){
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
  }
  if(Eye_To_Toggle == 2){
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
  }  
}

function Update_NOR_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('NOR_Input_1').classList.contains('LED_ON');
  var Input_2_State = document.getElementById('NOR_Input_2').classList.contains('LED_ON');
  var Output_State = !Boolean(Input_1_State|Input_2_State);
  if(Output_State){document.getElementById('NOR_Output').classList.add('LED_ON');}
  else{document.getElementById('NOR_Output').classList.remove('LED_ON');}
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('NOR_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('NOR_Right_Eyes');
  if(Eye_To_Toggle == 1){
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
  }
  if(Eye_To_Toggle == 2){
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
  }
}

function Update_XOR_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('XOR_Input_1').classList.contains('LED_ON');
  var Input_2_State = document.getElementById('XOR_Input_2').classList.contains('LED_ON');
  if(Input_1_State == Input_2_State){var Output_State = false;}
  else{var Output_State = true;}
  if(Output_State){document.getElementById('XOR_Output').classList.add('LED_ON');}
  else{document.getElementById('XOR_Output').classList.remove('LED_ON');}
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('XOR_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('XOR_Right_Eyes');
  if(Eye_To_Toggle == 1){
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
  }
  if(Eye_To_Toggle == 2){
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
  }
}

function Update_XNOR_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('XNOR_Input_1').classList.contains('LED_ON');
  var Input_2_State = document.getElementById('XNOR_Input_2').classList.contains('LED_ON');
  if(Input_1_State == Input_2_State){var Output_State = false;}
  else{var Output_State = true;}
  if(!Output_State){document.getElementById('XNOR_Output').classList.add('LED_ON');}
  else{document.getElementById('XNOR_Output').classList.remove('LED_ON');}
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('XNOR_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('XNOR_Right_Eyes');
  if(Eye_To_Toggle == 1){
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
  }
  if(Eye_To_Toggle == 2){
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
  }
}

function Update_BUFFER_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('BUFFER_Input_1').classList.contains('LED_ON');
  if(Input_1_State){document.getElementById('BUFFER_Output').classList.add('LED_ON');}
  else{document.getElementById('BUFFER_Output').classList.remove('LED_ON');}
  var Input_2_State = NaN;
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('BUFFER_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('BUFFER_Right_Eyes');
    Left_Eyes[0].classList.toggle('Open_Eyes');
    Left_Eyes[1].classList.toggle('Open_Eyes');
    Right_Eyes[0].classList.toggle('Open_Eyes');
    Right_Eyes[1].classList.toggle('Open_Eyes');
}

function Update_NOT_Gate(){
  var LED_Object = document.getElementById(this.id);
  var LED_Gate_Class = String(this.id).split("_")[0];
  Toggle_LED(LED_Object);
  var Input_1_State = document.getElementById('NOT_Input_1').classList.contains('LED_ON');
  if(!Input_1_State){document.getElementById('NOT_Output').classList.add('LED_ON');}
  else{document.getElementById('NOT_Output').classList.remove('LED_ON');}
  var Input_2_State = NaN;
  Update_Truth_Table(Input_1_State,Input_2_State,LED_Gate_Class);
  var Eye_To_Toggle = parseInt(String(this.id).split("_")[2]);
  var Left_Eyes = document.getElementsByClassName('NOT_Left_Eyes');
  var Right_Eyes = document.getElementsByClassName('NOT_Right_Eyes');
  Left_Eyes[0].classList.toggle('Open_Eyes');
  Left_Eyes[1].classList.toggle('Open_Eyes');
  Right_Eyes[0].classList.toggle('Open_Eyes');
  Right_Eyes[1].classList.toggle('Open_Eyes');
}

function Toggle_LED(Target_LED){
  var LED_Colour = String(window.getComputedStyle(Target_LED).getPropertyValue('background-color'));  
  Target_LED.classList.toggle('LED_ON');
  Target_LED.classList.toggle('Jump_Animation');
}

function Update_Truth_Table(Left_Input,Right_Input,Gate_Class){
var Binary_Values = document.getElementsByClassName(Gate_Class+"_Binary");
for(Binary_Value = 0; Binary_Value < Binary_Values.length; Binary_Value++){
  Binary_Values[Binary_Value].classList.remove('Light_Up_Value');
}
if(Left_Input == false & Right_Input == false){
  Binary_Values[2].classList.add('Light_Up_Value');
  Binary_Values[3].classList.add('Light_Up_Value');
  Binary_Values[4].classList.add('Light_Up_Value');
}
if(Left_Input == false & Right_Input == true){
  Binary_Values[5].classList.add('Light_Up_Value');
  Binary_Values[6].classList.add('Light_Up_Value');
  Binary_Values[7].classList.add('Light_Up_Value');
}
if(Left_Input == true & Right_Input == false){
  Binary_Values[8].classList.add('Light_Up_Value');
  Binary_Values[9].classList.add('Light_Up_Value');
  Binary_Values[10].classList.add('Light_Up_Value');
}
if(Left_Input == true & Right_Input == true){
  Binary_Values[11].classList.add('Light_Up_Value');
  Binary_Values[12].classList.add('Light_Up_Value');
  Binary_Values[13].classList.add('Light_Up_Value');
}
if(Left_Input == false & String(Right_Input) == "NaN"){
  Binary_Values[2].classList.add('Light_Up_Value');
  Binary_Values[3].classList.add('Light_Up_Value');
}
if(Left_Input == true & String(Right_Input) == "NaN"){
  Binary_Values[4].classList.add('Light_Up_Value');
  Binary_Values[5].classList.add('Light_Up_Value');
}
}

function Face_Pressed(){
  var Styling = document.getElementsByClassName('Style_Toggle')[0].value;  
  if(Styling == "Detailed"){
    var Face_Objects = document.getElementsByClassName('Gate_Faces');
    var Opacity = parseInt(window.getComputedStyle(Face_Objects[0]).getPropertyValue('opacity'));  
    Opacity ^= 1;
    for(Face_Index = 0; Face_Index < Face_Objects.length; Face_Index++){
      Face_Objects[Face_Index].classList.toggle('Jump_Animation');
      Face_Objects[Face_Index].style.opacity = Opacity;
    }
  }
}

function Toggle_Style(){
  var Styling = document.getElementsByClassName('Style_Toggle')[0].value;  
  var Pressed_Button = document.getElementsByClassName(String(this.className).split(" ")[0])[0];
  Pressed_Button.classList.remove('Jump_Animation');
  void Pressed_Button.offsetWidth;
  Pressed_Button.classList.add('Jump_Animation');
  var Logic_Gate_Diagram = document.getElementsByClassName('Logic_Gate_Diagrams');
  var Style_Toggle_Buttons = document.getElementsByClassName('Style_Toggle');
  
  for(Toggle_Index = 0; Toggle_Index < Style_Toggle_Buttons.length; Toggle_Index++){
    var Target_Toggle_Button = Style_Toggle_Buttons[Toggle_Index];
    var Image_Class = String(String(Style_Toggle_Buttons[Toggle_Index].className).split(" ")[0] + "_Detailed");
    Target_Toggle_Button.classList.toggle(Image_Class);
  }
  

  for(Diagram_Index = 0; Diagram_Index < Logic_Gate_Diagram.length; Diagram_Index++){
    var Target_Class = String(Logic_Gate_Diagram[Diagram_Index].className).split(" ")[1];
    var Target_Object = document.getElementsByClassName(Target_Class)[0];
    Target_Object.classList.toggle(Target_Class + "_Simple_Style");
    if(Styling == "Detailed"){
      Style_Toggle_Buttons[Diagram_Index].value = "Simple";
      var Face_Objects = document.getElementsByClassName('Gate_Faces');
      for(Face_Index = 0; Face_Index < Face_Objects.length; Face_Index++){
        if(Face_Objects[Face_Index].style.opacity == 1){
          Face_Objects[Face_Index].classList.toggle('Jump_Animation');
          Face_Objects[Face_Index].style.opacity = 0;
        }
      }
    }
    else{
      Style_Toggle_Buttons[Diagram_Index].value = "Detailed";
    }
    
  }

}




