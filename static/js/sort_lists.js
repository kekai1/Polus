function sortList(div){
    var new_div = div.cloneNode(false);

    // Add all lis to an array
    var lis = [];
    for(var i = div.childNodes.length; i--;){
        if(div.childNodes[i].nodeName === 'LI')
            lis.push(div.childNodes[i]);
    }

    // Sort the lis in descending order
    lis.sort(function(a, b){
       return parseInt(b.childNodes[0].data , 10) -
              parseInt(a.childNodes[0].data , 10);
    });

    // Add them into the ul in order
    for(var i = 0; i < lis.length; i++)
        new_div.appendChild(lis[i]);
    div.parentNode.replaceChild(new_div, div);



    if (document.getElementById( "button_avatar" ).className  == "btn btn-secondary btn-xs")
    {
       document.getElementById( "button_avatar" ).className  = "btn btn-success btn-xs";
    }
    else if(document.getElementById( "button_avatar" ).className  == "btn btn-success btn-xs")
    {
       document.getElementById( "button_avatar" ).className  = "btn btn-secondary btn-xs";
    }
}