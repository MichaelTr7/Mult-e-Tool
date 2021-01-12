
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
  const options = {threshold: 0.7};
  let Scroll_Observer = new IntersectionObserver(Scroll_Check,options);
  Launch_Rows.forEach(Row => {Scroll_Observer.observe(Row);});
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

  var Phones = document.getElementsByClassName('Mobile_Views');
  // Phones[0].classList.remove('Pop_Animation_1');
  // Phones[1].classList.remove('Pop_Animation_2');
  // Phones[2].classList.remove('Pop_Animation_3');  
  var Summary_Texts = document.getElementsByClassName('Summaries');
  Summary_Texts[0].classList.remove('Text_Pop_Animation_From_Right');
  void Summary_Texts[0].offsetWidth;
  Summary_Texts[1].classList.remove('Text_Pop_Animation_From_Left');
  Summary_Texts[2].classList.remove('Text_Pop_Animation_From_Right');
  
  if(Focussed_Page == "Resistor_Calulator_Launch_Rows"){
    var Scroll_Label = document.getElementsByClassName('Scroll_Indicator')[0];
    Scroll_Label.style.opacity = 1;
  }
  
  Focussed_Page = Focussed_Page.replace("_Launch_Rows","")    
  if(Focussed_Page != "Resistor_Calculator" & Focussed_Page != ""){
    if(Focussed_Page != "Mobile"){
      var Scroll_Label = document.getElementsByClassName('Scroll_Indicator')[0];
      Scroll_Label.style.opacity = 1;
      var Target_Row = document.getElementById(Focussed_Page + "_Launch_Button");
      Target_Row.classList.add('Spring_Animation');
    }
    if(Focussed_Page == "Mobile"){
      var Scroll_Label = document.getElementsByClassName('Scroll_Indicator')[0];
      Scroll_Label.style.opacity = 0;
      var Phones = document.getElementsByClassName('Mobile_Views');
      Phones[0].classList.add('Pop_Animation_1');
      Phones[1].classList.add('Pop_Animation_2');
      Phones[2].classList.add('Pop_Animation_3');  
    }
  }
  if(Focussed_Page == "Resistor_Calculator"|Focussed_Page == "Capacitor_Calculator"|Focussed_Page == "Digital_Logic_Gates"){
    Animate_Text_Summaries(Focussed_Page);
  }

}

function Animate_Text_Summaries(Target_Banner){
  Target_Summary = (Target_Banner + "_Summary").toString();
  var Summary_Text = document.getElementById(Target_Summary);
  if(Target_Summary == "Capacitor_Calculator_Summary"){
    Summary_Text.classList.add('Text_Pop_Animation_From_Left');
  }
  if(Target_Summary == "Resistor_Calculator_Summary"|Target_Summary == "Digital_Logic_Gates_Summary"){
    Summary_Text.classList.add('Text_Pop_Animation_From_Right');
  }
}




