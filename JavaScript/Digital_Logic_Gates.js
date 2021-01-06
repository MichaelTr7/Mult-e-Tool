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

  var Indicator_Buttons = document.getElementsByClassName('Not_Active');
  for(Index = 0; Index < Indicator_Buttons.length; Index++){
    Indicator_Buttons[Index].addEventListener("mouseenter",Display_Gate_Name);
    Indicator_Buttons[Index].addEventListener("mouseleave",Hide_Gate_Name);
  }

  window.addEventListener('resize',Resize_Carousel);

  Adjust_Mobile_Menu();
  $('.carousel').carousel({interval: false});
  Resize_Carousel();
}

function Display_Gate_Name(){
  var Gate_Label = document.getElementsByClassName('Logic_Gate_Label')[0];
  var Gate_Names = ["AND","NAND","OR","NOR","XOR","XNOR","NOT","BUFFER"];
  var Indicator_Index = parseInt((String(this.id)).split("_")[1]);
  Gate_Label.innerHTML = Gate_Names[Indicator_Index-1];
  Gate_Label.classList.add('Logic_Gate_Label_Active');

}
  
function Hide_Gate_Name(){
  var Gate_Label = document.getElementsByClassName('Logic_Gate_Label')[0];
  Gate_Label.classList.remove('Logic_Gate_Label_Active');
}
  
function Resize_Carousel(){
  var Carousel = document.getElementsByClassName('Carousel_Item_Containers');    
  Carousel_Style = window.getComputedStyle(Carousel[0]);
  var Carousel_Height = parseInt(String(Carousel_Style.getPropertyValue('height')));    
  var Carousel_Top_Margin = parseInt(String(Carousel_Style.getPropertyValue('margin-top')));    
  var Window_Height = parseInt(window.innerHeight);
  var Carousel_Scaling_Factor = Window_Height/Carousel_Height;
  // var Size_Difference = (Carousel_Height - Carousel_Height*Carousel_Scaling_Factor)/2;
  // var New_Margin = Carousel_Top_Margin - Size_Difference;

    if(Carousel_Scaling_Factor < 1){
      for(Index = 0; Index < Carousel.length; Index++){
        Carousel[Index].style.transform = "scale(" + String(Carousel_Scaling_Factor) + ")";
      //   if(Size_Difference > 0){
      //   Carousel[Index].style.marginTop = String(New_Margin) + "px";
      // }
      }
    }
}
  
  
  
  
  
  
  

