/******************** LOGIN ****************    **/

let test_logged;
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username');




function is_logged(){
    
    let buttons = "";
    if(username == null){
        buttons += "<a href='./index_log.html' class='btn-link label-medium' id='log_in' >Log in</a>";
        buttons += "<a href='./index_sing.html' class='btn btn-fill label-medium' id='get_started'>" +
        "<button type='button' class='btn btn-primary' id='get_started'>Get Started</button>"+
        "</a>";
        test_logged = false;
        //links
        document.getElementById('prop-link').href = "../index.html#prop";
        document.getElementById('prop2').href = "../index.html#prop";
        document.getElementById('home_link').href = "../index.html";
        document.getElementById('home_link4').href = "../index.html";
        document.getElementById('home_link2').href = "../index.html";
        document.getElementById('home_link3').href = "../index.html";
    }else{
        buttons += "<a href='../index.html' class='btn-link label-medium' id='log_in' >Log out</a>";
        buttons += "<a href='./profil.html?username=" + username + "' class='btn btn-fill label-medium' id='get_started'><button type='button' class='btn btn-primary' id='get_started'><i class=\"fa-solid fa-user\" style='color: #FFF; margin-right: 5px;'></i>" + username + "</button></a>";
        test_logged = true;
        
        //links
        document.getElementById('prop-link').href = "../index.html?username="+username+"#prop";
        document.getElementById('prop2').href = "../index.html?username="+username+"#prop";
        document.getElementById('home_link').href = "../index.html?username="+username;
        document.getElementById('home_link4').href = "../index.html?username="+username;
        document.getElementById('home_link2').href = "../index.html?username="+username;
        document.getElementById('home_link3').href = "../index.html?username="+username;
    }
    document.getElementById('is_logged').innerHTML = buttons;
}

   
