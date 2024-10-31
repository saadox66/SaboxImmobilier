/******************** Link ****************    **/
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let user = urlParams.get('username');
let next = urlParams.get('next');






const $submit = document.getElementById("btn");
const $username = document.getElementById("username");
const $password = document.getElementById("password");
const $message = document.getElementById("message");
let xmlhttp = new XMLHttpRequest();


function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("good");
        }
    };
    xmlhttp.open("GET", "../data/admin_login.xml", true);
    xmlhttp.send();
}





$submit.addEventListener("click", () => {
    $message.innerHTML ="";
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("admin");
    let i;
    if ($username.value !== "" && $password.value !== "") {
        for (i = 0; i < x.length; i++) {
            if ($username.value === x[i].getElementsByTagName("username")[0].childNodes[0].nodeValue) {
                break;
            }
        }
        if (i !== x.length) {
            if ($password.value !== x[i].getElementsByTagName("password")[0].childNodes[0].nodeValue) {
                $message.innerHTML = "<p class='padding-left-20'>Password incorrect!</p>";
                $password.value = "";
            } else {
                if(id == null && next == null){
                    window.location.href = "../index.html?username=" + encodeURIComponent($username.value);
                }else if(next != null){
                    window.location.replace(`./${next}.html?username=${$username.value}`);
                }else{
                    window.location.replace(`./detail.html?id=${id}&username=${$username.value}`);
                }
                
            }
        } else {
            $message.innerHTML = "<p class='padding-left-20'>Your username isn't in the database</p>";
        }
    } else {
        $message.innerHTML = "<p class='padding-left-20'>! USERNAME and PASSWORD fields must be filled!</p>";
    }
});



