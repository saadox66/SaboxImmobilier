let xmlhttp = new XMLHttpRequest();

/******************** LOGIN ****************    **/

let test_logged;
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username');




function is_logged(){
    
    let buttons = "";
    if(username == null){
        buttons += "<a href='./pages/index_log.html' class='btn-link label-medium'>Login</a>";
        buttons += "<a href='./pages/index_sing.html' class='btn btn-fill label-medium'>Get Started</a>";
        test_logged = false;
        document.getElementById('submit-p').href = "./pages/index_log.html?next=user_listed";
        //links
        document.getElementById('about-link1').href = "./pages/submit.html";
        document.getElementById('about-link2').href = "./pages/submit.html";
    }else{
        buttons += "<a href='./index.html' class='btn-link label-medium'>Log out</a>";
        buttons += "<a href='./pages/profil.html?username=" + username + "' class='btn btn-fill label-medium' style='display: flex;'><i class=\"fa-solid fa-user\" style='color: #FFF; margin-right: 5px;'></i>" +username+"</a>";
        test_logged = true;
        document.getElementById('submit-p').href = "./pages/user_listed.html?username=" + username;
        //links
        document.getElementById('about-link1').href = "./pages/submit.html?username="+username;
        document.getElementById('about-link2').href = "./pages/submit.html?username="+username;
    }
    document.getElementById('is_logged').innerHTML = buttons;
}

function onload_func(){
    is_logged();
    loadXMLDoc();
}


function admin(){

}



/******************** XML ********************/

let nbPage = 0;
let pageSize = 6;
let startIndex = 0;
let endIndex = 0;
let page = 1;


function loadPage(pageNumber) {
    //Mettre à jour la valeur de page en fonction de pageNumber
    page = pageNumber;
    //Appeler la fonction fetchData
    fetchData(); 
}   

function showPageLinks() {
    let divpl = document.getElementById("pageLinks");
    let i;
    let xmlDoc = xmlhttp.responseXML;       
    let x = xmlDoc.getElementsByTagName("property");
    let str = "";
    //Calculer nbPage    
    nbPage = x.length / pageSize;
   
    for(i = 0 ; i < nbPage  ; i++){
        str += "<input type='button' class='' id='page_input' onclick=loadPage(" + (i+1) + ") value='" + (i+1) + "'></input>";
    }
    divpl.innerHTML = str;
    console.log(divpl);
}


function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
            showPageLinks();
        }
    };
    xmlhttp.open("GET", "data/properties_db.xml", true);
    xmlhttp.send();
}

function fetchData(){
    document.getElementById('pageLinks').style.display = "flex";
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let card = "";
    
    let x = xmlDoc.getElementsByTagName("property");

    //Calculer nbPage    
    nbPage = x.length / pageSize;
    //Calculer startIndex et endIndex    
    startIndex = (page-1) * pageSize;
    endIndex = startIndex + pageSize;
    //Mettre à jour la boucle en tenant compte startIndex et endIndex


    
    
    for (i = startIndex; i < endIndex && i < x.length; i++) {
        card += "<div class='card'>" +
                    "<div class='card-banner'>" +
                        "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                            "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                        "</figure>"+
                        "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                        /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                    "</div>"+
                    "<div class='card-content'>"+
                        "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                        "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                        "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                        "<div class='card-meta-list'>"+
                            "<div class='meta-item'>"+
                                "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                            "</div>"+
                            "<div class='meta-item'>"+
                                "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                            "</div>"+
                            "<div class='meta-item'>"+
                                "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>";
    }
    document.getElementById("property-card").innerHTML = card;
}     










/****
 * navbar  toggle in mobile
 */

const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelector("[data-nav-toggler]");

$navToggler.addEventListener("click", () => $navbar.classList.toggle("active"));

/***
 * Header scroll state
 */

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", e => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
})


/***
 * Add to favorite button
 

const toggleBtns = document.getElementsByClassName("fav-btn");
function try_fav(){
    Array.from(toggleBtns).forEach(toggleBtn => {
        toggleBtn.addEventListener("click", () => {
            toggleBtn.classList.toggle("active");
        });
    });
}

*/





/**********************************************************Filters && Search****************************************************************/
        




function Search_Filters(){
    
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let card = "";
    let x = xmlDoc.getElementsByTagName("property");
    const type_select = document.getElementById('type_select');
    const search_input = document.getElementById('search_input');
    const status_select =document.getElementById('status_select');
    
    if(search_input.value === "" && type_select.value === "" && status_select.value === "" ){
        alert("Please Fill out Filters or Search Bar !");
        nbPage = 0;
        pageSize = 6;
        startIndex = 0;
        endIndex = 0;
        page = 1;
        fetchData();
    }else{
        document.getElementById('pageLinks').style.display = "none";
        for (i = 0; i < x.length; i++) {
            if(x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue.toLowerCase().includes(search_input.value.toLowerCase())){
                if(type_select.value === "" && status_select.value === ""){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                if(type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue && status_select.value === "" ){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === ""){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                
            }else if(search_input.value === ""){
                if(type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue && status_select.value === "" ){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === ""){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue){
                    card += "<div class='card'>" +
                        "<div class='card-banner'>" +
                            "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                                "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                            "</figure>"+
                            "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                            /*"<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+*/
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                            "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                            "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                            "<div class='card-meta-list'>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                    "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                                "</div>"+
                                "<div class='meta-item'>"+
                                    "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                    "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
            }
            
        }
        if(card === ""){
            alert("No results FOUNDED !");
            if(get_index_select(status_select , "") !== -1)
                status_select.options[get_index_select(status_select , "")].selected = true;
            if(get_index_select(type_select , "") !== -1)
                type_select.options[get_index_select( type_select, "")].selected = true;
            search_input.value = "";
            fetchData();
        }else{
            document.getElementById("property-card").innerHTML = card;
        }
    }
    
    
}     

function get_index_select(select_item , val){
    for(var i = 0 ; i < select_item.length ; i++)
        if(select_item.options[i].value === val)
            return i;
    return -1;
}




/*
let xmlDoc1;

function Search_Filters(){
    
    let i;
    xmlDoc1 = xmlhttp.responseXML;
    let x = xmlDoc1.getElementsByTagName("property");
    const type_select = document.getElementById('type_select');
    const search_input = document.getElementById('search_input');
    const status_select =document.getElementById('status_select');
    let propertyXml = "<?xml version='1.0' encoding='UTF-8'?>"+
                    "<properties>";

    if(search_input.value === "" && type_select.value === "" && status_select.value === "" ){
        alert("Please Fill out Filters or Search Bar !");
        nbPage = 0;
        pageSize = 6;
        startIndex = 0;
        endIndex = 0;
        page = 1;
        fetchData();
    }else{
        for (i = 0; i < x.length; i++) {
            if(x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue.toLowerCase().includes(search_input.value.toLowerCase())){
                if(type_select.value === "" && status_select.value === ""){
                    propertyXml += 
        "<property>" +
            "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
            "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
            "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
            "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
            "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
            "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
            "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
            "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
            "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
            "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
            "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
            "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
            "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
            "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
            "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
            "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
            "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
            "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
            "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
            "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
            "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
            "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
            "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
            "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
            "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
            "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
            "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
            "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
            "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
            "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
            "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
            "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
            "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
        "</property>";
                }
                if(type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue && status_select.value === "" ){
                    "<property>" +
            "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
            "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
            "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
            "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
            "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
            "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
            "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
            "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
            "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
            "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
            "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
            "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
            "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
            "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
            "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
            "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
            "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
            "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
            "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
            "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
            "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
            "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
            "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
            "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
            "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
            "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
            "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
            "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
            "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
            "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
            "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
            "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
            "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
        "</property>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === ""){
                    "<property>" +
            "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
            "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
            "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
            "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
            "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
            "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
            "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
            "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
            "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
            "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
            "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
            "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
            "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
            "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
            "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
            "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
            "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
            "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
            "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
            "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
            "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
            "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
            "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
            "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
            "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
            "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
            "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
            "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
            "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
            "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
            "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
            "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
            "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
        "</property>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue){
                    "<property>" +
                    "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
                    "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
                    "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
                    "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
                    "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
                    "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
                    "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
                    "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
                    "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
                    "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
                    "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
                    "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
                    "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
                    "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
                    "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
                    "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
                    "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
                    "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
                    "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
                    "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
                    "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
                    "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
                    "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
                    "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
                    "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
                    "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
                    "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
                    "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
                    "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
                    "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
                    "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
                    "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
                    "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
                    "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
                    "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
                "</property>";
                }
                
            }else if(search_input.value === ""){
                if(type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue && status_select.value === "" ){
                    "<property>" +
            "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
            "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
            "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
            "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
            "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
            "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
            "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
            "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
            "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
            "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
            "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
            "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
            "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
            "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
            "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
            "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
            "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
            "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
            "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
            "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
            "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
            "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
            "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
            "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
            "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
            "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
            "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
            "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
            "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
            "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
            "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
            "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
            "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
        "</property>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === ""){
                    "<property>" +
            "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
            "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
            "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
            "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
            "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
            "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
            "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
            "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
            "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
            "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
            "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
            "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
            "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
            "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
            "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
            "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
            "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
            "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
            "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
            "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
            "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
            "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
            "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
            "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
            "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
            "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
            "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
            "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
            "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
            "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
            "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
            "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
            "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
        "</property>";
                }
                if(status_select.value === x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue && type_select.value === x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue){
                    "<property>" +
            "<id>"+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue+"</id>" +
            "<title>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</title>" +
            "<property_type>"+x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue+"</property_type>" +
            "<adresse>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</adresse>" +
            "<prix>"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue+"</prix>" +
            "<statut>"+x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</statut>" +
            "<bhk>"+x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue+"</bhk>" +
            "<bed>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+"</bed>" +
            "<bathroom>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+"</bathroom>" +
            "<balcony>"+x[i].getElementsByTagName("balcony")[0].childNodes[0].nodeValue+"</balcony>" +
            "<hall>"+x[i].getElementsByTagName("hall")[0].childNodes[0].nodeValue+"</hall>" +
            "<kitchen>"+x[i].getElementsByTagName("kitchen")[0].childNodes[0].nodeValue+"</kitchen>" +
            "<floor>"+x[i].getElementsByTagName("floor")[0].childNodes[0].nodeValue+"</floor>" +
            "<total_floor>"+x[i].getElementsByTagName("total_floor")[0].childNodes[0].nodeValue+"</total_floor>" +
            "<area_size>"+x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue+"</area_size>" +
            "<city>"+x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue+"</city>" +
            "<state>"+x[i].getElementsByTagName("state")[0].childNodes[0].nodeValue+"</state>" +
            "<elevator>"+x[i].getElementsByTagName("elevator")[0].childNodes[0].nodeValue+"</elevator>" +
            "<security_guards>"+x[i].getElementsByTagName("security_guards")[0].childNodes[0].nodeValue+"</security_guards>" +
            "<gardens>"+x[i].getElementsByTagName("gardens")[0].childNodes[0].nodeValue+"</gardens>" +
            "<water_supply>"+x[i].getElementsByTagName("water_supply")[0].childNodes[0].nodeValue+"</water_supply>" +
            "<power_backup>"+x[i].getElementsByTagName("power_backup")[0].childNodes[0].nodeValue+"</power_backup>" +
            "<parking_area>"+x[i].getElementsByTagName("parking_area")[0].childNodes[0].nodeValue+"</parking_area>" +
            "<gym>"+x[i].getElementsByTagName("gym")[0].childNodes[0].nodeValue+"</gym>" +
            "<mall>"+x[i].getElementsByTagName("mall")[0].childNodes[0].nodeValue+"</mall>" +
            "<hospital>"+x[i].getElementsByTagName("hospital")[0].childNodes[0].nodeValue+"</hospital>" +
            "<schools>"+x[i].getElementsByTagName("schools")[0].childNodes[0].nodeValue+"</schools>" +
            "<status>"+x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue+"</status>" +
            "<is_featured>"+x[i].getElementsByTagName("is_featured")[0].childNodes[0].nodeValue+"</is_featured>" +
            "<description>"+x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue+"</description>" +
            "<publisher_name>"+x[i].getElementsByTagName("publisher_name")[0].childNodes[0].nodeValue+"</publisher_name>" +
            "<publisher_number>"+x[i].getElementsByTagName("publisher_number")[0].childNodes[0].nodeValue+"</publisher_number>" +
            "<image>"+x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[1].childNodes[0].nodeValue+"</image>" +
            "<image>"+x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue+"</image>" +
        "</property>";
                }
            }
            
        }
        propertyXml += '</properties>';
        var parser,
        parser = new DOMParser();
        xmlDoc1 = parser.parseFromString(propertyXml,"text/xml");
        showPageLinks1();
        fetchData1();
    }
} 


function showPageLinks1 (){
    let divpl = document.getElementById("pageLinks");
    let i;
    let xmlDoc1 = xmlhttp.responseXML;       
    let x = xmlDoc1.getElementsByTagName("property");
    let str = "";
    //Calculer nbPage    
    nbPage = x.length / pageSize;
       
    for(i = 0 ; i < nbPage  ; i++){
        str += "<input type='button' id='page_input' onclick=loadPage(" + (i+1) + ") value='" + (i+1) + "'></input>";
    }
    divpl.innerHTML = str;
    console.log(divpl);
}




function fetchData1(){
    let i;
    xmlDoc1 = xmlhttp.responseXML;
    let card = "";
    
    let x = xmlDoc1.getElementsByTagName("property");

    //Calculer nbPage    
    nbPage = x.length / pageSize;
    //Calculer startIndex et endIndex    
    startIndex = (page-1) * pageSize;
    endIndex = startIndex + pageSize;
    //Mettre à jour la boucle en tenant compte startIndex et endIndex


    
    
    for (i = startIndex; i < endIndex && i < x.length; i++) {
        card += "<div class='card'>" +
                    "<div class='card-banner'>" +
                        "<figure class='img-holder' style='--width: 585; --height: 390;'>" +
                            "<img src='./images/"+ x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue+"' width='585' height='390' class='img-cover' alt='COVA Home Realty'>" +
                        "</figure>"+
                        "<span class='badge label-medium'>"+ x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue+"</span>"+
                        "<button class='icon-btn fav-btn' aria-label='add to favorite' data-toggle-btn><span class='material-symbols-rounded' aria-hidden='true'>favorite</span></button>"+
                    "</div>"+
                    "<div class='card-content'>"+
                        "<span class='title-large'>$"+x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +"</span>"+
                        "<h3><a href='"+(username != null ? "./pages/detail.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +"&username="+ username : "./pages/index_log.html?id="+x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue ) +"' class='title-small card-title'>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a></h3>"+
                        "<address class='body-medium card-text'>"+x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue+"</address>"+
                        "<div class='card-meta-list'>"+
                            "<div class='meta-item'>"+
                                "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bed</span>"+
                                "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bed")[0].childNodes[0].nodeValue+ "bed</span>"+
                            "</div>"+
                            "<div class='meta-item'>"+
                                "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>bathroom</span>"+
                                "<span class='meta-text label-medium'>"+x[i].getElementsByTagName("bathroom")[0].childNodes[0].nodeValue+ "Bath</span>"+
                            "</div>"+
                            "<div class='meta-item'>"+
                                "<span class='material-symbols-rounded meta-icon' aria-hidden='true'>straighten</span>"+
                                "<span class='meta-text label-medium'>"+ x[i].getElementsByTagName("area_size")[0].childNodes[0].nodeValue +"</span>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>";
    }
    document.getElementById("property-card").innerHTML = card;
}*/