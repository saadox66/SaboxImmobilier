/********************************************************* get Link Info **********************************************************/



let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let test_logged;
let username = urlParams.get('username');




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
        buttons += "<a href='./profil.html?username=" + username + "' class='btn btn-fill label-medium' id='get_started'><button type='button' class='btn btn-primary' id='get_started'><i class=\"fa-solid fa-user\" style='color: #FFF; margin-right: 5px;'></i>" + username + "</button></a>";
        test_logged = true;
        //links
        document.getElementById('home_link1').href = "../index.html?username="+username;
        document.getElementById('home_link2').href = "../index.html?username="+username;
        document.getElementById('home_link3').href = "../index.html?username="+username;
        document.getElementById('home_link4').href = "../index.html?username="+username;
        document.getElementById('about_link1').href = "./submit.html?username="+username;
        document.getElementById('about_link2').href = "./submit.html?username="+username;
        document.getElementById('prop_link1').href = "../index.html?username="+username+"#prop";
        document.getElementById('prop_link2').href = "../index.html?username="+username+"#prop";
    }
    document.getElementById('is_logged').innerHTML = buttons;                                                                                   
}

function onload_func(){
    is_logged();
    loadXMLDoc();
}

/*************************************************** XML ***********************************************************/


let xmlhttp = new XMLHttpRequest();
function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
        }
    };
    xmlhttp.open("GET", "../data/properties_db.xml", true);
    xmlhttp.send();
}

function fetchData(){
    let i = id;
    let xmlDoc = xmlhttp.responseXML;
    let card = "";
    let x = xmlDoc.getElementsByTagName("property");
    card += "<div id='carouselExampleDark' class='carousel carousel-light slide' data-bs-ride ='carousel'>" +
                "<div class='carousel-indicators'>" +
                    "<button type='button' data-bs-target='#carouselExampleDark' data-bs-slide-to='0' class='active aria-current='true' aria-label='Slide 1'></button>" +
                    "<button type='button' data-bs-target='#carouselExampleDark' data-bs-slide-to='1' aria-label='Slide 2'></button>" +
                    "<button type='button' data-bs-target='#carouselExampleDark' data-bs-slide-to='2' aria-label='Slide 3'></button>" +
                "</div>" +
                "<div class='carousel-inner'>" +
                    "<div class='carousel-item active' data-bs-interval='10000'>" +
                        "<img src='../images/" + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + "' class='d-block w-100' alt='...'>" +
                    "</div>" +
                    "<div class='carousel-item' data-bs-interval='2000'>" +
                        "<img src='../images/" + x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue + "' class='d-block w-100' alt='...'>" +
                    "</div>" +
                    "<div class='carousel-item'>" +
                        "<img src='../images/" + x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue + "' class='d-block w-100' alt='...'>" +
                    "</div>" +
                    "</div>" +
                        "<button class='carousel-control-prev' type='button' data-bs-target='#carouselExampleDark' data-bs-slide='prev'>" +
                            "<span class='carousel-control-prev-icon' aria-hidden='true'></span>" +
                            "<span class='visually-hidden'>Previous</span>" +
                        "</button>" +
                         "<button class='carousel-control-next' type='button' data-bs-target='#carouselExampleDark' data-bs-slide='next'>" +
                            "<span class='carousel-control-next-icon' aria-hidden='true'></span>" +
                            "<span class='visually-hidden'>Next</span>" +
                        "</button>" +
                    "</div>" +
                    "<div class='d-flex justify-content-between'>" +
                        "<h2><span class='badge' style='background-color: #072e61;'>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span></h2>" +
                        "<h2 style='color: #074693;'>" + x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue + "$</h2>" +
                    "</div>" +
                    "<h4>" + x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</h4>" +
                    "<div class='d-flex' style='gap: 10px;'>" +
                        "<i class='fa-solid fa-location-dot' style='color: #2179FF;'></i>" +
                        "<address class='text-secondary'>" + x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue + "</address>" +
                    "</div>" +
                    "<div class='detail-1 d-flex justify-content-between' style='padding: 20px; gap: 20px; background-color: #ebe8e8; border-radius: 12px;'>" +
                    "<div>" +
                    "<p>" + x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue + "</p>" +
                    "<div class='d-flex' style='gap: 7px;'>" +
                        "<i class='fa-solid fa-chart-area' style='color: #2179FF;'></i>" +
                        "<p class='text-secondary'>sqft</p>" +
                    "</div>" +
                "</div>" +
                "<div>" +
                    "<p>" + x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue + "</p>" +
                    "<div class='d-flex' style='gap: 7px;'>" +
                        " <i class='fa-solid fa-bed' style='color: #2179FF;'></i>" +
                        "<p class='text-secondary'>Bedroom</p>" +
                    "</div>" +
                "</div>" +
                "<div>" +
                    "<p>" + x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue + "</p>" +
                    "<div class='d-flex' style='gap: 7px;'>" +
                        "<i class='fa-solid fa-toilet' style='color: #2179FF;'></i>" +
                        "<p class='text-secondary'>Bathroom</p>" +
                    "</div>" +
                "</div>" +
                "<div>" +
                    "<p>" + x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue + "</p>" +
                    "<div class='d-flex' style='gap: 7px;'>" +
                        "<i class='fa-solid fa-city' style='color: #2179FF;'></i>" +
                        "<p class='text-secondary'>Balcony</p>" +
                    "</div>" +
                "</div>" +
                "<div>" +
                    "<p>" + x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue + "</p>" +
                    "<div class='d-flex' style='gap: 7px;'>" +
                        "<i class='fa-solid fa-couch' style='color: #2179FF;'></i>" +
                        "<p class='text-secondary'>Hall</p>" +
                    "</div>" +
                "</div>" +
                "<div>" +
                    "<p>" + x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue +"</p>" +
                    "<div class='d-flex' style='gap: 7px;'>" +
                        "<i class='fa-solid fa-kitchen-set' style='color: #2179FF;'></i>" +
                        "<p class='text-secondary'>Kitchen</p>" +
                    "</div>" +
                "</div>" +
            "</div>" +
            "<h4 style='border-top: 1px solid #ebe8e8 ; margin-top: 20px; padding: 30px;'>Description</h4>" +
            "<p class='text-secondary'>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p>" +
            "<h4 style='border-top: 1px solid #ebe8e8 ; margin-top: 20px; padding-top: 30px;'>Proprety Summary</h4>" +
            "<table class='table table-striped'>" +
                "<tr>" +
                    "<td>BHK:</td>" +
                    "<td>" + x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue + "</td>" +
                    "<td>Proprety Type:</td>" +
                    "<td>" + x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue + "</td>" +
                "</tr>" +
                "<tr>" +
                    "<td>Floor:</td>" +
                    "<td>" + x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue + "</td>" +
                    "<td>Total Floor:</td>" +
                    "<td>" + x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue + " Floor</td>" +
                "</tr>" +
                "<tr>" +
                    "<td>City:</td>" +
                    "<td>" + x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue + "</td>" +
                    "<td>State:</td>" +
                    "<td>" + x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue + "</td>" +
                "</tr>" +
            "</table>" +
            "<h4 style='border-top: 1px solid #ebe8e8 ; margin-top: 20px; padding: 30px;'>Features</h4>" +
            "<div class='bool-feature d-flex justify-content-between' style='gap: 50px; flex-wrap: wrap;'>" +
                "<div class='right'>" +
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Elevator</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Security guards</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Guardens</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Water supply</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Power backup</p>" +
                    "</div>"+
                "</div>" +
                "<div class='left' style='margin-right: 300px;'>" +
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Parking area</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Gym</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Shopping mall</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Hospital</p>" +
                    "</div>"+
                    "<div class='d-flex' style='gap: 15px;'>" + 
                        "<i class='fa-solid fa-"+ (x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue == "true"  ? "check" : "xmark")+"' style='color: #2179FF;'></i>"+
                        "<p class='text-secondary'>Schools</p>" +
                    "</div>"+
                "</div>" +
            "</div>" +
            "<h4 style='border-top: 1px solid #ebe8e8 ; margin-top: 20px; padding: 30px;'>Contact Agent</h4>" +
            "<div class='d-flex' style='gap: 40px; flex-wrap: wrap;'>" +
                "<div class='right' style='width: 200px; height: 200px;'>" +
                    "<img src='../images/profil.png' style='width: 100%; height: auto;'>" +
                "</div>" +
                "<div class='left'>" +
                    "<h2 style='color: #072e61;'>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue +"</h2>" +
                    "<p class='text-secondary'>"+ x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue  +"</p>" +
                    "<div class='d-flex' style='flex-wrap: wrap; gap: 8px;'>" +
                        "<a href='#'><i class='fa-brands fa-facebook' style='color: #2179FF; font-size: 2rem;'></i></a>" +
                        "<a href='#'><i class='fa-brands fa-twitter' style='color: #2179FF; font-size: 2rem;'></i></a>" +
                        "<a href='#'><i class='fa-brands fa-linkedin' style='color: #2179FF; font-size: 2rem;'></i></a>" +
                        "<a href='#'><i class='fa-solid fa-envelope' style='color: #2179FF; font-size: 2rem;'></i></a>" +
                        "<i class='fa-solid fa-gmail' style='color: #2179FF;'></i>" +
                    "</div>" +
                "</div>" +
            "</div>" +
            "<button type='button' class='btn  btn-lg' id='fav' style='background-color: #072e61; color: #fff;' onclick='addToFavorites()'>Save as Favorit</button>";
    
    document.getElementById('card-container').innerHTML = card;
}


/***************************************** Local Storage *********************************************************/

function addToFavorites(){
    let old_Favorites = localStorage.getItem(username) || "";
    let fav_array = old_Favorites.split(',');
    if( fav_array.indexOf(id.toString()) === -1 ){
        fav_array.push(id.toString());
        localStorage.setItem(username , fav_array.join(','));
    }
    alert("This proprety has been saved in your favorites SUCCESSFULLY");
}