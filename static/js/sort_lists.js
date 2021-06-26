function sortList(ol){
    var new_ol = ol.cloneNode(false);

    // Add all lis to an array
    var lis = [];
    for(var i = ol.childNodes.length; i--;){
        if(ol.childNodes[i].nodeName === 'UL')
            lis.push(ol.childNodes[i]);
    }

    // Sort the lis in descending order
    lis.sort(function(a, b){
       return parseInt(b.childNodes[0].data , 10) -
              parseInt(a.childNodes[0].data , 10);
    });

    // Add them into the ul in order
    for(var i = 0; i < lis.length; i++)
        new_ol.appendChild(lis[i]);
    ol.parentNode.replaceChild(new_ol, ol);



    if (document.getElementById( "button_avatar" ).className  == "btn btn-secondary btn-xs")
    {
       document.getElementById( "button_avatar" ).className  = "btn btn-success btn-xs";
    }
    else if(document.getElementById( "button_avatar" ).className  == "btn btn-success btn-xs")
    {
       document.getElementById( "button_avatar" ).className  = "btn btn-secondary btn-xs";
    }
}