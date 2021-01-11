
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

  const Launch_Rows = document.querySelectorAll("section");
  const options = {threshold: 1};
  let Scroll_Observer = new IntersectionObserver(Scroll_Check,options);
  Launch_Rows.forEach(Row => {
    Scroll_Observer.observe(Row);
  });


}

function Launch_Webapp(){
  var Webapp_Index = parseInt(document.getElementById(this.id).value) - 1;
  var Webapp_Pages = ["./Resistor_Calculator.html","./Capacitor_Calculator.html","./Digital_Logic_Gates.html"];
  var Webapp_Link = Webapp_Pages[Webapp_Index];
  console.log(Webapp_Link);
  window.location.href = Webapp_Link;
}

var Focussed_Page = "";
var Number_Of_Sections = 3;
var Run = 0;

function Scroll_Check(entries){
  entries.forEach(entry => {
    var Target_Row = entry.target.id;
    if(Focussed_Page != Target_Row){
      Focussed_Page = Target_Row;
      if(Run > Number_Of_Sections){
        Animate_Row();
      }
      Run = Run + 1;
    }
  });  
}

function Animate_Row(){
  if(Focussed_Page != "Resistor_Calulator_Launch_Rows"){
    Focussed_Page = Focussed_Page.replace("_Launch_Rows","")
    if(Focussed_Page != "Mobile"){
      var Scroll_Label = document.getElementsByClassName('Scroll_Indicator')[0];
      Scroll_Label.style.opacity = 1;
    var Target_Row = document.getElementById(Focussed_Page + "_Launch_Button");
    Target_Row.classList.add('Spring_Animation');
  }
  console.log(Focussed_Page);
  if(Focussed_Page == "Mobile"){
    
    var Scroll_Label = document.getElementsByClassName('Scroll_Indicator')[0];
    Scroll_Label.style.opacity = 0;
  }
  }
}






