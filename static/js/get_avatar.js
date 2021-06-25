function get_avatar(){
    if (document.getElementById( "div_avatar" ).style.visibility == "visible")
    {
       document.getElementById( "div_avatar" ).style.visibility = "hidden";
        document.getElementById( "button_avatar" ).className  = "btn btn-outline-primary";
    }
    else if(document.getElementById( "div_avatar" ).style.visibility == "hidden")
    {
       document.getElementById( "div_avatar" ).style.visibility = "visible";
       document.getElementById( "button_avatar" ).className  = "btn btn-outline-success";
    }
}

function selected_avatar(src){
   document.querySelector('input[type="file"]').value = src;
}
