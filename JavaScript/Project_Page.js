
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
  
  document.getElementsByClassName('Unit_Toggle_Buttons')[0].addEventListener("click",Toggle_Units);
  document.getElementsByClassName('Unit_Toggle_Buttons')[1].addEventListener("click",Toggle_Units);
  document.getElementsByClassName('Button_Labels')[0].addEventListener("mouseenter",Animate_Hovered_Button);
  document.getElementsByClassName('Button_Labels')[1].addEventListener("mouseenter",Animate_Hovered_Button);
  document.getElementsByClassName('Button_Labels')[0].addEventListener("mouseleave",Remove_Hovered_Button_Animation);
  document.getElementsByClassName('Button_Labels')[1].addEventListener("mouseleave",Remove_Hovered_Button_Animation);
  document.getElementsByClassName('Add_Buttons')[0].addEventListener("click",Animate_Clicked_Buttons);
  document.getElementsByClassName('Add_Buttons')[1].addEventListener("click",Animate_Clicked_Buttons);
  // document.addEventListener("keydown",Guard_Against_Text_Inputs);
}

function Guard_Against_Text_Inputs(e){
  
  //Validating the keys are numerical,a decimal point or backspace/delete key
  var Valid_Keys = ["0","1","2","3","4","5","6","7","8","9",".","Backspace"];
  if(!Valid_Keys.includes(String(e.key))){
    e.preventDefault();
  }
  
  //Preventing multiple decimal points
  var Active_Input_Field = document.activeElement;
  var Current_Input = String(Active_Input_Field.value);
  if(Current_Input.includes(".") & String(e.key) == "."){
    e.preventDefault();
  }
}

function Toggle_Units(){
  var Button_Name = String(this.id);
  var Current_Text = String(this.innerHTML);
  if(Button_Name == "Resistor_Units_Toggle"){
    var Resistor_Unit_Prefixes = ["mΩ","Ω","KΩ","MΩ"];
    var Current_Index = Resistor_Unit_Prefixes.indexOf(Current_Text);
    var Next_Index = (Current_Index+1)%Resistor_Unit_Prefixes.length;
    this.innerHTML =  String(Resistor_Unit_Prefixes[Next_Index]);
  }else{
    var Capacitor_Unit_Prefixes = ["pF","nF","µF","mF","F"];
    var Current_Index = Capacitor_Unit_Prefixes.indexOf(Current_Text);
    var Next_Index = (Current_Index+1)%Capacitor_Unit_Prefixes.length;
    this.innerHTML =  String(Capacitor_Unit_Prefixes[Next_Index]);
  }  
  
  this.classList.remove('Jump_Animation_2');
  void this.offsetWidth;
  this.classList.add('Jump_Animation_2');
}

function Animate_Hovered_Button(){
  this.classList.remove('Slide_Label_Left');
  this.classList.remove('Slide_Label_Right');
  void this.offsetWidth;
  this.classList.add('Slide_Label_Left');
}

function Remove_Hovered_Button_Animation(){
  this.classList.remove('Slide_Label_Left');
  this.classList.remove('Slide_Label_Right'); 
  void this.offsetWidth;
  this.classList.add('Slide_Label_Right'); 
}

function Animate_Clicked_Buttons(){
  this.classList.remove('Jump_Animation_2');
  void this.offsetWidth;
  this.classList.add('Jump_Animation_2');
  var Button_Name = String(this.id);
  if(Button_Name == "Add_Resistor_Button"){
    Add_Resistor_To_List();
  }else{
    Add_Capacitor_To_List();
  }
}

function Add_Resistor_To_List(){
  var Unit_String = String(document.getElementById('Resistor_Units_Toggle').innerHTML);
  var Resistor_Units_Bank = {"mΩ":"-3", "Ω":"0", "KΩ":"3", "MΩ":"6"};
  var Multiplier = 10**parseInt(Resistor_Units_Bank[Unit_String]);
  var Input_Resistance_Value = parseFloat(document.getElementById('Resistor_Value_Field').value);
  if(String(Input_Resistance_Value) != "NaN"){
    var Resistance_In_Ohms = parseFloat(Input_Resistance_Value*Multiplier);
    Create_Resistor_Tile(Resistance_In_Ohms)
  }
}

function Add_Capacitor_To_List(){
  var Unit_String = String(document.getElementById('Capacitor_Units_Toggle').innerHTML);
  var Capacitor_Units_Bank = {"pF":"-12", "nF":"-9", "µF":"-6", "mF":"-3", "F":"0"};
  var Multiplier = 10**parseInt(Capacitor_Units_Bank[Unit_String]);
  var Input_Capacitance_Value = parseFloat(document.getElementById('Capacitor_Value_Field').value);
  if(String(Input_Capacitance_Value) != "NaN"){
    var Capacitance_In_Farads = parseFloat(Input_Capacitance_Value*Multiplier);
    Create_Capacitor_Tile(Capacitance_In_Farads);
  }
}

function Create_Resistor_Tile(Resistance_In_Ohms){
  console.log(Resistance_In_Ohms);
  
  // Evaluating resistor colour bands (4 band and 5 band)
  var Sub_Panel = document.getElementById('Resistor_Sub_Panel');
  var New_Tile = document.createElement('li');
  New_Tile.classList.add('Resistor_Component_Tiles');
  var Left_Sub_Panel = document.getElementById("Resistor_Sub_Panel");
  Left_Sub_Panel.appendChild(New_Tile);
}

function Create_Capacitor_Tile(Capacitance_In_Farads){
  console.log(Capacitance_In_Farads);
  
  // Evaluating capacitor code
  var Sub_Panel = document.getElementById('Capacitor_Sub_Panel');
  var New_Tile = document.createElement('li');
  New_Tile.classList.add('Capacitor_Component_Tiles');
  var Right_Sub_Panel = document.getElementById("Capacitor_Sub_Panel");
  Right_Sub_Panel.appendChild(New_Tile);
}

function Check_If_Resistor_Exists(){
  console.log("");
}

function Check_If_Capacitor_Exists(){  
  console.log("");
}













