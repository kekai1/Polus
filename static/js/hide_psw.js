function show() {
    var p = document.getElementById('password-input');
    var p2 = document.getElementById('password-input2');
    p.setAttribute('type', 'text');
    p2.setAttribute('type', 'text');
}

function hide() {
    var p = document.getElementById('password-input');
    var p2 = document.getElementById('password-input2');
    p.setAttribute('type', 'password');
    p2.setAttribute('type', 'password');


}
var pwShown = 0;

document.getElementById("eyeIcon").addEventListener("click", function () {
    if (pwShown == 0) {
        pwShown = 1;

        show();
    } else {
        pwShown = 0;
        hide();
    }
}, false);



