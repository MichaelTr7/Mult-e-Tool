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
  document.getElementById('OK_Button').addEventListener("click",Set_Project_Name);
  document.getElementById('Close_Button').addEventListener("click",Close_Project_Naming_Modal);
  document.addEventListener("keydown",Shift_Key_Pressed);
  document.addEventListener("keyup",Shift_Key_Released);
  document.addEventListener("keydown",Delete_Key_Pressed);
  document.addEventListener("keydown",Entered_Key_Pressed);
}

//Variables local to file
var Shift_Is_Pressed = false;
var Last_Clicked_Project_Element = "";
var Actively_Changing_Project_Name = false;

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

  if(Number_Of_Projects < 20){
    //Creating new list element
    var Project_Placeholder_Name = String(Number_Of_Projects+1) + ".";
    var New_List_Element = document.createElement("li");
    New_List_Element.classList.add('Project_Rows');
    New_List_Element.id = "Project_" + String(Number_Of_Projects+1);
    Project_List.appendChild(New_List_Element);
    New_List_Element.addEventListener("click",Project_Selected);
    New_List_Element.addEventListener("click",Save_Last_Clicked_Project);
    New_List_Element.addEventListener("contextmenu",Reveal_Sub_Menu);
    
    //Creating new label for the newly created list element
    var New_Label_Element = document.createElement("label");
    New_Label_Element.classList.add('Project_Label_Containers');
    New_List_Element.appendChild(New_Label_Element);
    New_Label_Element.innerHTML = Project_Placeholder_Name;
    
    //Creating project name label for newly created list element
    var New_Project_Label_Element = document.createElement("div");
    New_Project_Label_Element.classList.add('Project_Name_Containers');
    // New_Project_Label_Element.innerHTML = "Test";
    New_List_Element.appendChild(New_Project_Label_Element);
    
    //Creating new div (edit) button element for the newly created list element
    var New_Edit_Button_Element = document.createElement("div");
    New_Edit_Button_Element.classList.add('Edit_Button');
    New_List_Element.appendChild(New_Edit_Button_Element);
    New_Edit_Button_Element.innerHTML = "✎";
    New_Edit_Button_Element.addEventListener("click",Edit_Project_Name);
    
    //Creating new div (open) button element for the newly created list element
    var New_Open_Button_Element = document.createElement("div");
    New_Open_Button_Element.classList.add('Open_Button');
    New_List_Element.appendChild(New_Open_Button_Element);
    New_Open_Button_Element.innerHTML = "Open";
    New_Open_Button_Element.addEventListener("click",Open_Project);
  }  
  
    var Naming_Modal = document.getElementById('Modal_Backdrop');
    Naming_Modal.classList.remove('Fade_Out_Rename_Modal_Animation');
    Naming_Modal.style.display = "block";
    var Field_Name = document.getElementById('Project_Name_Field');
    Field_Name.value = "";
}

function Trash_Pressed(){
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
  var Project_Suffix = List_Elements[Element_Index].children[0].innerHTML.split(".")[1];
  List_Elements[Element_Index].id = "Project_" + String(Element_Index+1);
  var Inner_Label = List_Elements[Element_Index].children[0];
  Inner_Label.innerHTML = Updated_Project_Prefix + Project_Suffix;
  }
}

function Display_Maximum_Project_Notification(){
  console.log("Reached maximum number of projects");
}

function Project_Selected(){
  // console.log(this.id);
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

function Reveal_Sub_Menu(){
  console.log("Reveal sub menu");
}

function Open_Project(){
  console.log("Open project");
}

function Save_Last_Clicked_Project(){
  Last_Clicked_Project_Element = String(this.id);
}

function Delete_Key_Pressed(e){
    if(e.key == "Backspace"){
      if(Last_Clicked_Project_Element != ""){
      var Target_List_Element = document.getElementById(Last_Clicked_Project_Element);
      var Focussed = Target_List_Element.classList.contains('Project_Selected');
    if(Focussed){
      var Name_Label = Target_List_Element.children[1];
      console.log(Name_Label);
      Name_Label.contentEditable = "true";
      Name_Label.setAttribute('contenteditable', 'true');
      Name_Label.style.backgroundColor = "rgb(35,35,35)";  
    }
    }
    }
}

function Set_Project_Name(){
  var Name_Exists_Label = document.getElementById('Error_Message_Label');
  Name_Exists_Label.classList.remove('Fade_In_Rename_Modal_Animation');
  
  var Name = String(document.getElementById('Project_Name_Field').value);
  var Project_Labels = document.getElementsByClassName('Project_Name_Containers');
  var Project_Names = [];
  for(Project_Index = 0; Project_Index < Project_Labels.length-1; Project_Index++){
    Project_Names[Project_Index] = Project_Labels[Project_Index].innerHTML;
  }
  
  var Name_Exists = Project_Names.includes(Name);   
  if(Name_Exists){
    var Name_Exists_Label = document.getElementById('Error_Message_Label');
    Name_Exists_Label.classList.add('Fade_In_Rename_Modal_Animation');
  }

  if(Name != "" & !Name_Exists){
    var List_Elements = document.getElementsByClassName('Project_Rows');
    var Newly_Added_Element = List_Elements[parseInt(List_Elements.length)-1]
    var Modal = document.getElementById('Modal_Backdrop');
    Modal.classList.add('Fade_Out_Rename_Modal_Animation');
    var Animation_Duration = parseFloat(getComputedStyle(Modal).getPropertyValue('--Fade_Out_Duration'))*1000;
    setTimeout(function () {
      Modal.style.display = "none";
    }, Animation_Duration);    
    Newly_Added_Element.children[1].innerHTML = Name;
  }
}

function Close_Project_Naming_Modal(){
  var Modal = document.getElementById('Modal_Backdrop');
  Modal.classList.add('Fade_Out_Rename_Modal_Animation');
  var Animation_Duration = parseFloat(getComputedStyle(Modal).getPropertyValue('--Fade_Out_Duration'))*1000;
  setTimeout(function () {
    Modal.style.display = "none";
  }, Animation_Duration); 
  
  var Last_List_Element = document.getElementById('Project_List').lastElementChild;
  Last_List_Element.remove();    
}

function Edit_Project_Name(){
  var Sibling_Label = this.previousSibling;
  console.log(Sibling_Label);
  
}

function Entered_Key_Pressed(e){
  if(String(e.key) == "Enter"){
    var Modal_In_View = String(window.getComputedStyle(document.getElementById("Modal_Backdrop")).getPropertyValue('display'));
    if(Modal_In_View == "block"){
    document.getElementById('OK_Button').click();
    }
  }  
}





















