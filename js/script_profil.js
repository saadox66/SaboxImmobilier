/********************************************************* get Link Info **********************************************************/



let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let test_logged;
let username = urlParams.get('username');
let username_2 = username;



function is_logged(){
    
    let buttons = "";
    if(username == null){
        buttons += "<a href='./pages/index_log.html' class='btn-link label-medium' id='log_in' >Log in</a>";
        buttons += "<a href='./pages/index_sing.html' class='btn btn-fill label-medium' id='get_started'>" +
        "<button type='button' class='btn btn-primary' id='get_started'>Get Started</button>"+
        "</a>";
        test_logged = false;
        
    }else{
        buttons += "<a href='../index.html' class='btn-link label-medium' id='log_in' >Log out</a>";
        buttons += "<a href='#' class='btn btn-fill label-medium' id='get_started'><button type='button' class='btn btn-primary' id='get_started'><i class=\"fa-solid fa-user\" style='color: #FFF; margin-right: 5px;'></i>" + username_2 + "</button></a>";
        test_logged = true;
        document.getElementById('admin_mode').href = "./user_listed.html?username="+username;
        document.getElementById('home_link').href = "../index.html?username="+username;
        document.getElementById('home_link1').href = "../index.html?username="+username;
        document.getElementById('home_link2').href = "../index.html?username="+username;
        document.getElementById('home_link3').href = "../index.html?username="+username;
        document.getElementById('about-link1').href = "./submit.html?username="+username;
        document.getElementById('about-link2').href = "./submit.html?username="+username;
        document.getElementById('prop').href = "../index.html?username="+username+"#prop";
        
        document.getElementById('prop1').href = "../index.html?username="+username+"#prop";
        document.getElementById('about-link2').href = "./submit.html?username="+username;
    }
    document.getElementById('is_logged').innerHTML = buttons;                                                                                   
}

function onload_func(){
    is_logged();
    loadXMLDoc_1();
    loadXMLDoc_2();
}


/*************************************************** XML ***********************************************************/


let xmlhttp_1 = new XMLHttpRequest();
function loadXMLDoc_1() {
    xmlhttp_1.onreadystatechange = function () {
        if (xmlhttp_1.readyState == 4 && xmlhttp_1.status == 200) {
            fetchData_1();
        }
    };
    xmlhttp_1.open("GET", "../data/properties_db.xml", true);
    xmlhttp_1.send();
}

function fetchData_1() {
    let i = 0;
    let xmlDoc = xmlhttp_1.responseXML;
    let card = "";
    let x = xmlDoc.getElementsByTagName("property");
    let old_Favorites = localStorage.getItem(username) || "";
    let fav_array = old_Favorites.split(',');
    for(var j = 0 ; j < fav_array.length ; j++){
        for(i = 0 ; i < x.length ; i++){
            if(fav_array[j] === x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue){
                card += "<div class='card-1' style='width: 18rem;'>"+
                        "<img src='../images/" + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' class='card-img-top' alt='...'>"+
                        "<div class='card-body'>"+
                            "<h5 class='card-title'>"+ x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</h5>"+
                            "<div class='d-flex' style='gap: 8px;'>"+
                                "<i class='fa-solid fa-location-dot' style='color: #2179FF;'></i>"+
                                "<address class='card-text text-secondary'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "</div>"+
                            "<h5 style='color: #074693;'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</h5>"+
                            "<div class='d-flex' style='justify-content: space-between;'>"+
                                "<a href='./detail.html?username="+username+"&id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"'><button type='button' class='btn btn-primary'>View Details</button></a>"+
                                "<button type='button' class='btn btn-danger' onclick='deleteFromFavorites("+ x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+")'>Delete</button>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
            }
            
        }
    }
    
    document.getElementById('items-js').innerHTML = card;
}


let xmlhttp_2 = new XMLHttpRequest();
function loadXMLDoc_2() {
    xmlhttp_2.onreadystatechange = function () {
        if (xmlhttp_2.readyState == 4 && xmlhttp_2.status == 200) {
            fetchData_2();
        }
    };
    xmlhttp_2.open("GET", "../data/admin_login.xml", true);
    xmlhttp_2.send();
}

function fetchData_2() {
    let i ;
    let xmlDoc = xmlhttp_2.responseXML;
    let name_libel = document.getElementById('name_libel');
    let email_libel = document.getElementById('email_libel');
    let phone_libel = document.getElementById('phone_libel');
    let id_libel = document.getElementById('id_libel');
    let address_libel = document.getElementById('address_libel');
    let x = xmlDoc.getElementsByTagName("admin");
    for(i = 0 ; i < x.length ; i++){
        if(username === x[i].getElementsByTagName("username")[0].childNodes[0].nodeValue){
            break;
        }
    }
    name_libel.innerHTML = x[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
    email_libel.innerHTML = x[i].getElementsByTagName("mail")[0].childNodes[0].nodeValue;
    phone_libel.innerHTML = x[i].getElementsByTagName("phone")[0].childNodes[0].nodeValue;
    id_libel.innerHTML = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
    address_libel.innerHTML = x[i].getElementsByTagName("address")[0].childNodes[0].nodeValue;
}





/********************************************** localStorage **********************************************************/

function deleteFromFavorites(item_id){
    let old_Favorites = localStorage.getItem(username) || "";
    let fav_array = old_Favorites.split(',');
    let index = fav_array.indexOf(item_id.toString());
    console.log(fav_array);
    console.log(index);
    if( index != -1 ){
        fav_array.splice(index , 1);
        localStorage.setItem(username , fav_array.join(','));
        fetchData_1();
        alert("This proprety has been DELETED in your favorites SUCCESSFULLY");
    }
}




/******************************************************** UPDATE ******************************************************************/

function update_info(){
    let phone_input = document.getElementById('phone_input');
    let name_input = document.getElementById('name_input');
    if(phone_input.value != "" || name_input.value != ""){
        if(phone_input.value != ""){
            let phone_libel = document.getElementById('phone_libel');
            phone_libel.innerHTML = phone_input.value; 
            phone_input.value = "";
        }
        if(name_input.value != ""){
            let name_libel = document.getElementById('name_libel');
            name_libel.innerHTML = name_input.value;
            username_2 = name_input.value;
            is_logged();
            name_input.value = "";
        }
        alert("Your personal information has been UPDATED !");
    }else{
        alert("inputs must be FIELED !");
    }
}