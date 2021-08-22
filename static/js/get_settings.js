function get_settings(){
    if (document.getElementById( "setting_1" ).style.visibility == "visible")
    {
       document.getElementById( "setting_1" ).style.visibility = "hidden";
       document.getElementById( "setting_2" ).style.visibility = "hidden";
    }
    else if(document.getElementById( "setting_1" ).style.visibility == "hidden")
    {
       document.getElementById( "setting_1" ).style.visibility = "visible";
       document.getElementById( "setting_2" ).style.visibility = "visible";
    }
}