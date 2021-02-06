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
  document.addEventListener("keydown",Shift_Key_Pressed);
  document.addEventListener("keyup",Shift_Key_Released);
}

var Shift_Is_Pressed = false;

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
  var Project_List = document.getElementById("Project_List");
  var Number_Of_Projects = Project_List.children.length;

  if(Number_Of_Projects == 20){
    Display_Maximum_Project_Notification();
  }

  if(Number_Of_Projects <= 20){
    var Project_Placeholder_Name = String(Number_Of_Projects+1) + ".";
    var New_List_Element = document.createElement("li");
    New_List_Element.classList.add("Project_Rows");
    New_List_Element.id = "Project_" + String(Number_Of_Projects+1);
    New_List_Element.appendChild(document.createTextNode(Project_Placeholder_Name));
    Project_List.appendChild(New_List_Element);
    New_List_Element.addEventListener("click",Project_Selected);
  }  
}

function Trash_Pressed(){
  console.log("Trash selected project");
    var Project_List_Elements = document.getElementsByClassName('Project_Rows');
    var Elements_To_Delete = [];
    var Index = 0;
    for(Element_Index = 0; Element_Index < Project_List_Elements.length; Element_Index++){
      var Selected = Project_List_Elements[Element_Index].classList.contains('Project_Selected');
      if(Selected == true){
        Elements_To_Delete[Index] = Project_List_Elements[Element_Index].id;
        Index = Index + 1;
      }
    }   
    for(Delete_Index = 0; Delete_Index < Elements_To_Delete.length; Delete_Index++){
      document.getElementById(Elements_To_Delete[Delete_Index]).remove();
    }    
    Rename_List(Project_List_Elements);
}

function Rename_List(List_Elements){
  for(Element_Index = 0; Element_Index < List_Elements.length; Element_Index++){
  var Updated_Project_Prefix = String(Element_Index+1) + ".";
  var Project_Suffix = List_Elements[Element_Index].innerHTML.split(".")[1];
  List_Elements[Element_Index].innerHTML = Updated_Project_Prefix + Project_Suffix;
  List_Elements[Element_Index].id = "Project_" + String(Element_Index+1);
  console.log(Updated_Project_Prefix + Project_Suffix);
  }
}

function Display_Maximum_Project_Notification(){
  console.log("Reached maximum number of projects");
}

function Project_Selected(){
  console.log("Project Selected");
  var Selected_Index = parseInt(String(this.id).split("_")[1]) - 1;  
  var Project_List_Elements = document.getElementsByClassName('Project_Rows');
  
  if(!Shift_Is_Pressed){
    for(Element_Index = 0; Element_Index < Project_List_Elements.length; Element_Index++){
      if(Element_Index != Selected_Index){
      Project_List_Elements[Element_Index].classList.remove('Project_Selected');
      }
    }
  }
  
  var Focussed_Project_Element = document.getElementById(this.id);
  Focussed_Project_Element.classList.toggle('Project_Selected');
}

function Shift_Key_Pressed(e){
  var Key_Name = String(e.key);
  var Key_Code = String(e.code);
  if(Key_Code == "ShiftLeft"|Key_Code == "ShiftRight"|Key_Code == "MetaLeft"|Key_Code == "MetaRight"){
    Shift_Is_Pressed = true;
  }
}

function Shift_Key_Released(e){
  var Key_Name = String(e.key);
  var Key_Code = String(e.code);
  if(Key_Code == "ShiftLeft"|Key_Code == "ShiftRight"|Key_Code == "MetaLeft"|Key_Code == "MetaRight"){
    Shift_Is_Pressed = false;
  }
}






























