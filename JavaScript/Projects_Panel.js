window.onload = function(){
  Adjust_Mobile_Menu();

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

  var Control_Buttons = document.getElementsByClassName('Control_Buttons');
  for(Index = 0; Index < Control_Buttons.length; Index++){
    Control_Buttons[Index].addEventListener("click",Animate_Buttons);
  }
  
  document.getElementById('Account_Settings_Button').addEventListener("click",Account_Settings_Pressed);
  document.getElementById('Logout_Button').addEventListener("click",Logout_Pressed);
  document.getElementById('New_Project_Button').addEventListener("click",New_Project_Pressed);
  document.getElementById('Trash_Button').addEventListener("click",Trash_Pressed);  
}

function Animate_Buttons(){
  var Button = document.getElementById(this.id);
  Button.classList.remove("Squeeze_Animation");
  void Button.offsetWidth;
  Button.classList.add("Squeeze_Animation");
}

function Account_Settings_Pressed(){
  console.log("Go to account settings");
}

function Logout_Pressed(){
  console.log("Logout of account");
  
}

function New_Project_Pressed(){
  console.log("Add project");
  
}

function Trash_Pressed(){
  console.log("Trash selected project");
  
}





































