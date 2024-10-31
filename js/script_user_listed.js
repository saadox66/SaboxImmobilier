/********************************************************* get Link Info **********************************************************/



let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let test_logged;
let username = urlParams.get('username');




function is_logged() {

    let buttons = "";
    if (username == null) {
        buttons += "<a href='./pages/index_log.html' class='btn-link label-medium' id='log_in' >Log in</a>";
        buttons += "<a href='./pages/index_sing.html' class='btn btn-fill label-medium' id='get_started'>" +
            "<button type='button' class='btn btn-primary' id='get_started'>Get Started</button>" +
            "</a>";
        test_logged = false;
    } else {
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

function onload_func() {
    is_logged();
    loadXMLDoc();
}


/******************************************* XML**************************************************/
let xmlhttp = new XMLHttpRequest();

let nbPage = 0;
let pageSize = 6;
let startIndex = 0;
let endIndex = 0;
let page = 1;


function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
            showPageLinks();
        }
    };
    xmlhttp.open("GET", "../data/properties_db.xml", true);
    xmlhttp.send();
}

function fetchData() {
    document.getElementById('pageLinks').style.display = "flex";
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let tr = "";
    let x = xmlDoc.getElementsByTagName("property");


    //Calculer nbPage    
    nbPage = x.length / pageSize;
    //Calculer startIndex et endIndex    
    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;
    //Mettre à jour la boucle en tenant compte startIndex et endIndex

    for (i = startIndex; i < endIndex && i < x.length; i++) {
        tr += "<tr>" +
            "<td class='text-secondary'>" +
            "<h5>" + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + "</h5>" +
            "</td>" +
            "<td style='width: auto;'>" +
            "<div class='d-flex' style='gap: 15px;'>" +
            "<div class='img-div'>" +
            "<img src='../images/" + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + "' alt='' style='width: 150px;'>" +
            "</div>" +
            "<div class='property-info'>" +
            "<h4>" + x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</h4>" +
            "<div class='d-flex' style='gap: 8px;'>" +
            "<i class='fa-solid fa-location-dot' style='color: #2179FF;'></i>" +
            "<address class='text-secondary'>" + x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue + "</address>" +
            "</div>" +
            "<h5 style='color: #074693;'> $" + x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue + "</h5>" +
            "</div>" +
            "</div>" +
            "</td>" +
            "<td>" +
            "<h5>" + x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue + "</h5>" +
            "</td>" +
            "<td>" +
            "<h5>" + x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue + "</h5>" +
            "</td>" +
            "<td><h5>" + x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue + "</h5></td>" +
            "<td>" +
            "<a href ='#cache_moi'>" + "<button type='button' class='btn btn-warning' onclick='editBien(" + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + ")'>Update</button>" + "</a>" +
            "</td>" +
            "<td><button type='button' class='btn btn-danger' onclick= 'deleteBien(" + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + ")'>Delete</button></td>" +
            "</tr>";
    }
    document.getElementById("container").innerHTML = tr;
}






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

    for (i = 0; i < nbPage; i++) {
        str += "<input type='button' id='page_input' onclick=loadPage(" + (i + 1) + ") value='" + (i + 1) + "'></input>";
    }

    divpl.innerHTML = str;
    console.log(divpl);
}


/******************************************* CRUD ******************************************************/


let global_id;

function editBien(id) {
    global_id = id;
    document.getElementById('submit_btn').style.display = "none";
    document.getElementById('modif_btn').style.display = "block";

    let xmlDoc = xmlhttp.responseXML;
    const title_input = document.getElementById('title-input');
    const description_input = document.getElementById('description-input');
    const type_select = document.getElementById('type-select');
    const sale_select = document.getElementById('sale_select');
    const bathroom_input = document.getElementById('bathroom-input');
    const kitchen_input = document.getElementById('kitchen-input');
    const bhk_select = document.getElementById('bhk-select');
    const bedroom_input = document.getElementById('bedroom_input');
    const balcony_input = document.getElementById('balcony_input');
    const hall_input = document.getElementById('hall_input');
    const floor_select = document.getElementById('floor_select');
    const price_input = document.getElementById('price_input');
    const city_input = document.getElementById('city_input');
    const state_input = document.getElementById('state_input');
    const total_floor_select = document.getElementById('total_floor_select');
    const area_input = document.getElementById('area_input');
    const address_input = document.getElementById('address_input');
    const elevator_select = document.getElementById('elevator_select');
    const security_select = document.getElementById('security_select');
    const guardens_select = document.getElementById('guardens_select');
    const water_select = document.getElementById('water_select');
    const power_select = document.getElementById('power_select');
    const parking_select = document.getElementById('parking_select');
    const gym_select = document.getElementById('gym_select');
    const mall_select = document.getElementById('mall_select');
    const hospital_select = document.getElementById('hospital_select');
    const school_select = document.getElementById('school_select');
    const status_select = document.getElementById('status_select');
    const featured_select = document.getElementById('featured_select');



    let biens = xmlDoc.getElementsByTagName("property");
    let bien;

    for (i = 0; i < biens.length; i++) {
        if (biens[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == id) {
            bien = biens[i];
        }
        console.log(biens[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);
    }


    document.getElementById('cache_moi').style.display = "flex";
    document.getElementById('card_title').innerText = "Modify Property";


    title_input.value = bien.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    description_input.value = bien.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    bathroom_input.value = bien.getElementsByTagName("bathroom")[0].childNodes[0].nodeValue;
    kitchen_input.value = bien.getElementsByTagName("kitchen")[0].childNodes[0].nodeValue;
    bedroom_input.value = bien.getElementsByTagName("bed")[0].childNodes[0].nodeValue;
    balcony_input.value = bien.getElementsByTagName("balcony")[0].childNodes[0].nodeValue;
    hall_input.value = bien.getElementsByTagName("hall")[0].childNodes[0].nodeValue;
    price_input.value = bien.getElementsByTagName("prix")[0].childNodes[0].nodeValue;
    city_input.value = bien.getElementsByTagName("city")[0].childNodes[0].nodeValue;
    state_input.value = bien.getElementsByTagName("state")[0].childNodes[0].nodeValue;
    area_input.value = bien.getElementsByTagName("area_size")[0].childNodes[0].nodeValue;
    address_input.value = bien.getElementsByTagName("adresse")[0].childNodes[0].nodeValue;

    selected_func(type_select, "property_type", bien);
    selected_func(sale_select, "statut", bien);
    selected_func(bhk_select, "bhk", bien);
    selected_func(floor_select, "floor", bien);
    selected_func(total_floor_select, "total_floor", bien);
    selected_func(elevator_select, "elevator", bien);
    selected_func(security_select, "security_guards", bien);
    selected_func(guardens_select, "gardens", bien);
    selected_func(water_select, "water_supply", bien);
    selected_func(power_select, "power_backup", bien);
    selected_func(parking_select, "parking_area", bien);
    selected_func(gym_select, "gym", bien);
    selected_func(mall_select, "mall", bien);
    selected_func(hospital_select, "hospital", bien);
    selected_func(school_select, "schools", bien);
    //selected_func(status_select , "mall" , bien);
    //selected_func(featured_select , "mall" , bien);
}


function selected_func(item, balise_name, xml_object) {
    for (var i = 0; i < item.options.length; i++) {
        if (item.options[i].value === xml_object.getElementsByTagName(balise_name)[0].childNodes[0].nodeValue) {
            item.options[i].selected = true;
            break;
        }
    }
}

function selected_return_func(item) {
    for (var i = 0; i < item.options.length; i++) {
        if (item.options[i].selected === true) {
            return item.options[i].value;
        }
    }
    return null;
}



function updateBien() {
    let xmlDoc = xmlhttp.responseXML;
    let biens = xmlDoc.getElementsByTagName("property");
    let bien;


    const title_input = document.getElementById('title-input');
    const description_input = document.getElementById('description-input');
    const type_select = document.getElementById('type-select');
    const sale_select = document.getElementById('sale_select');
    const bathroom_input = document.getElementById('bathroom-input');
    const kitchen_input = document.getElementById('kitchen-input');
    const bhk_select = document.getElementById('bhk-select');
    const bedroom_input = document.getElementById('bedroom_input');
    const balcony_input = document.getElementById('balcony_input');
    const hall_input = document.getElementById('hall_input');
    const floor_select = document.getElementById('floor_select');
    const price_input = document.getElementById('price_input');
    const city_input = document.getElementById('city_input');
    const state_input = document.getElementById('state_input');
    const total_floor_select = document.getElementById('total_floor_select');
    const area_input = document.getElementById('area_input');
    const address_input = document.getElementById('address_input');
    const elevator_select = document.getElementById('elevator_select');
    const security_select = document.getElementById('security_select');
    const guardens_select = document.getElementById('guardens_select');
    const water_select = document.getElementById('water_select');
    const power_select = document.getElementById('power_select');
    const parking_select = document.getElementById('parking_select');
    const gym_select = document.getElementById('gym_select');
    const mall_select = document.getElementById('mall_select');
    const hospital_select = document.getElementById('hospital_select');
    const school_select = document.getElementById('school_select');
    const status_select = document.getElementById('status_select');
    const featured_select = document.getElementById('featured_select');


    for (i = 0; i < biens.length; i++) {
        if (biens[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == global_id) {
            bien = biens[i];
        }
    }



    bien.getElementsByTagName("title")[0].childNodes[0].nodeValue = title_input.value;
    bien.getElementsByTagName("description")[0].childNodes[0].nodeValue = description_input.value;
    bien.getElementsByTagName("bathroom")[0].childNodes[0].nodeValue = bathroom_input.value;
    bien.getElementsByTagName("kitchen")[0].childNodes[0].nodeValue = kitchen_input.value;
    bien.getElementsByTagName("bed")[0].childNodes[0].nodeValue = bedroom_input.value;
    bien.getElementsByTagName("balcony")[0].childNodes[0].nodeValue = balcony_input.value;
    bien.getElementsByTagName("hall")[0].childNodes[0].nodeValue = hall_input.value;
    bien.getElementsByTagName("prix")[0].childNodes[0].nodeValue = price_input.value;
    bien.getElementsByTagName("city")[0].childNodes[0].nodeValue = city_input.value;
    bien.getElementsByTagName("state")[0].childNodes[0].nodeValue = state_input.value;
    bien.getElementsByTagName("area_size")[0].childNodes[0].nodeValue = area_input.value;
    bien.getElementsByTagName("adresse")[0].childNodes[0].nodeValue = address_input.value;


    bien.getElementsByTagName("property_type")[0].childNodes[0].nodeValue = selected_return_func(type_select);
    bien.getElementsByTagName("statut")[0].childNodes[0].nodeValue = selected_return_func(sale_select);
    bien.getElementsByTagName("bhk")[0].childNodes[0].nodeValue = selected_return_func(bhk_select);
    bien.getElementsByTagName("floor")[0].childNodes[0].nodeValue = selected_return_func(floor_select);
    bien.getElementsByTagName("total_floor")[0].childNodes[0].nodeValue = selected_return_func(total_floor_select);
    bien.getElementsByTagName("elevator")[0].childNodes[0].nodeValue = selected_return_func(elevator_select);
    bien.getElementsByTagName("security_guards")[0].childNodes[0].nodeValue = selected_return_func(security_select);
    bien.getElementsByTagName("gardens")[0].childNodes[0].nodeValue = selected_return_func(guardens_select);
    bien.getElementsByTagName("water_supply")[0].childNodes[0].nodeValue = selected_return_func(water_select);
    bien.getElementsByTagName("power_backup")[0].childNodes[0].nodeValue = selected_return_func(power_select);
    bien.getElementsByTagName("parking_area")[0].childNodes[0].nodeValue = selected_return_func(parking_select);
    bien.getElementsByTagName("gym")[0].childNodes[0].nodeValue = selected_return_func(gym_select);
    bien.getElementsByTagName("mall")[0].childNodes[0].nodeValue = selected_return_func(mall_select);
    bien.getElementsByTagName("hospital")[0].childNodes[0].nodeValue = selected_return_func(hospital_select);
    bien.getElementsByTagName("schools")[0].childNodes[0].nodeValue = selected_return_func(school_select);

    
    //showPageLinks();
    fetchData();
    undoModif();
}



function deleteBien(id) {
    let xmlDoc = xmlhttp.responseXML;
    let biens = xmlDoc.getElementsByTagName("property");
    let bien;

    for (i = 0; i < biens.length; i++) {
        if (biens[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == id) {
            bien = biens[i];
        }
    }

    xmlDoc.documentElement.removeChild(bien);
    fetchData();
}

function new_button(){
    undoModif();
    document.getElementById('submit_btn').style.display = "block";
    document.getElementById('modif_btn').style.display = "none";
    document.getElementById('cache_moi').style.display = "flex";
    document.getElementById('card_title').innerText = "Submit Property";
}

function addbien() {
    let xmlDoc = xmlhttp.responseXML;

    const title_input = document.getElementById('title-input');
    const description_input = document.getElementById('description-input');
    const type_select = document.getElementById('type-select');
    const sale_select = document.getElementById('sale_select');
    const bathroom_input = document.getElementById('bathroom-input');
    const kitchen_input = document.getElementById('kitchen-input');
    const bhk_select = document.getElementById('bhk-select');
    const bedroom_input = document.getElementById('bedroom_input');
    const balcony_input = document.getElementById('balcony_input');
    const hall_input = document.getElementById('hall_input');
    const floor_select = document.getElementById('floor_select');
    const price_input = document.getElementById('price_input');
    const city_input = document.getElementById('city_input');
    const state_input = document.getElementById('state_input');
    const total_floor_select = document.getElementById('total_floor_select');
    const area_input = document.getElementById('area_input');
    const address_input = document.getElementById('address_input');
    const elevator_select = document.getElementById('elevator_select');
    const security_select = document.getElementById('security_select');
    const guardens_select = document.getElementById('guardens_select');
    const water_select = document.getElementById('water_select');
    const power_select = document.getElementById('power_select');
    const parking_select = document.getElementById('parking_select');
    const gym_select = document.getElementById('gym_select');
    const mall_select = document.getElementById('mall_select');
    const hospital_select = document.getElementById('hospital_select');
    const school_select = document.getElementById('school_select');
    const image1_input = document.getElementById('image1_input');
    const image2_input = document.getElementById('image2_input');
    const image3_input = document.getElementById('image3_input');




    const id = xmlDoc.createElement("id");
    const title = xmlDoc.createElement("title");
    const description = xmlDoc.createElement("description");
    const type = xmlDoc.createElement("property_type");
    const sale = xmlDoc.createElement("statut");
    const bathroom = xmlDoc.createElement("bathroom");
    const kitchen = xmlDoc.createElement("kitchen");
    const bhk = xmlDoc.createElement("bhk");
    const bedroom = xmlDoc.createElement("bed");
    const balcony = xmlDoc.createElement("balcony");
    const hall = xmlDoc.createElement("hall");
    const floor = xmlDoc.createElement("floor");
    const price = xmlDoc.createElement("prix");
    const city = xmlDoc.createElement("city");
    const state = xmlDoc.createElement("state");
    const total_floor = xmlDoc.createElement("total_floor");
    const area = xmlDoc.createElement("area_size");
    const address = xmlDoc.createElement("adresse");
    const elevator = xmlDoc.createElement("elevator");
    const security = xmlDoc.createElement("security_guards");
    const guardens = xmlDoc.createElement("gardens");
    const water = xmlDoc.createElement("water_supply");
    const power = xmlDoc.createElement("power_backup");
    const parking = xmlDoc.createElement("parking_area");
    const gym = xmlDoc.createElement("gym");
    const mall = xmlDoc.createElement("mall");
    const hospital = xmlDoc.createElement("hospital");
    const school = xmlDoc.createElement("schools");
    const image1 = xmlDoc.createElement("image");
    const image2 = xmlDoc.createElement("image");
    const image3 = xmlDoc.createElement("image");



    if (image1_input.files.length > 0) {
        image1.appendChild(xmlDoc.createTextNode(image1_input.files[0].name));
      } else {
        // No file selected
        alert("In image 1 : No file selected");
        undoModif();
        return;
    }
    /*
    if (image2_input.files.length > 0) {
        image2.appendChild(xmlDoc.createTextNode(image2_input.files[0].name));
      } else {
        // No file selected
        alert("In image 2 : No file selected");
        undoModif();
        return;
    }

    if (image3_input.files.length > 0) {
        image3.appendChild(xmlDoc.createTextNode(image3_input.files[0].name));
      } else {
        // No file selected
        alert("In image 2 : No file selected");
        undoModif();
        return;
    }*/

    let bien = xmlDoc.createElement("property");


    
    

    id.appendChild(xmlDoc.createTextNode(xmlDoc.getElementsByTagName("property").length));
    title.appendChild(xmlDoc.createTextNode(title_input.value));
    description.appendChild(xmlDoc.createTextNode(description_input.value));
    type.appendChild(xmlDoc.createTextNode(type_select.value));
    sale.appendChild(xmlDoc.createTextNode(sale_select.value));
    bathroom.appendChild(xmlDoc.createTextNode(bathroom_input.value));
    kitchen.appendChild(xmlDoc.createTextNode(kitchen_input.value));
    bhk.appendChild(xmlDoc.createTextNode(bhk_select.value));
    bedroom.appendChild(xmlDoc.createTextNode(bedroom_input.value));
    balcony.appendChild(xmlDoc.createTextNode(balcony_input.value));
    hall.appendChild(xmlDoc.createTextNode(hall_input.value));
    floor.appendChild(xmlDoc.createTextNode(floor_select.value));
    price.appendChild(xmlDoc.createTextNode(price_input.value));
    city.appendChild(xmlDoc.createTextNode(city_input.value));
    state.appendChild(xmlDoc.createTextNode(state_input.value));
    total_floor.appendChild(xmlDoc.createTextNode(total_floor_select.value));
    area.appendChild(xmlDoc.createTextNode(area_input.value));
    address.appendChild(xmlDoc.createTextNode(address_input.value));
    elevator.appendChild(xmlDoc.createTextNode(elevator_select.value));
    security.appendChild(xmlDoc.createTextNode(security_select.value));
    guardens.appendChild(xmlDoc.createTextNode(guardens_select.value));
    water.appendChild(xmlDoc.createTextNode(water_select.value));
    power.appendChild(xmlDoc.createTextNode(power_select.value));
    parking.appendChild(xmlDoc.createTextNode(parking_select.value));
    gym.appendChild(xmlDoc.createTextNode(gym_select.value));
    mall.appendChild(xmlDoc.createTextNode(mall_select.value));
    hospital.appendChild(xmlDoc.createTextNode(hospital_select.value));
    school.appendChild(xmlDoc.createTextNode(school_select.value));




    bien.appendChild(id);
    bien.appendChild(title);
    bien.appendChild(description);
    bien.appendChild(type);
    bien.appendChild(sale);
    bien.appendChild(bathroom);
    bien.appendChild(kitchen);
    bien.appendChild(bhk);
    bien.appendChild(bedroom);
    bien.appendChild(balcony);
    bien.appendChild(hall);
    bien.appendChild(floor);
    bien.appendChild(price);
    bien.appendChild(city);

    bien.appendChild(state);
    bien.appendChild(total_floor);
    bien.appendChild(area);
    bien.appendChild(address);
    bien.appendChild(elevator);
    bien.appendChild(security);
    bien.appendChild(guardens);

    bien.appendChild(water);
    bien.appendChild(power);
    bien.appendChild(parking);
    bien.appendChild(gym);

    bien.appendChild(mall);
    bien.appendChild(hospital);
    bien.appendChild(school);

    bien.appendChild(image1);
    bien.appendChild(image2);
    bien.appendChild(image3);

    xmlDoc.getElementsByTagName("properties")[0].appendChild(bien);
    undoModif();
    showPageLinks();
    fetchData();

}







/********************************************************* Search ****************************************************************/





function Search_Filters() {
    document.getElementById('pageLinks').style.display = "none";
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let tr = "";
    let x = xmlDoc.getElementsByTagName("property");
    const search_input = document.getElementById('search_input');
    if (search_input.value == "") {
        fetchData();

        nbPage = 0;
        pageSize = 6;
        startIndex = 0;
        endIndex = 0;
        page = 1;
        showPageLinks();
        document.getElementById('pageLinks').style.display = "flex";
    } else {
        for (i = 0; i < x.length; i++) {
            if (x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue.toLowerCase().includes(search_input.value.toLowerCase()) || x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue.toLowerCase().includes(search_input.value.toLowerCase())) {
                tr += "<tr>" +
                    "<td class='text-secondary'>" +
                    "<h5>" + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + "</h5>" +
                    "</td>" +
                    "<td style='width: auto;'>" +
                    "<div class='d-flex' style='gap: 15px;'>" +
                    "<div class='img-div'>" +
                    "<img src='../images/" + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + "' alt='' style='width: 150px;'>" +
                    "</div>" +
                    "<div class='property-info'>" +
                    "<h4>" + x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</h4>" +
                    "<div class='d-flex' style='gap: 8px;'>" +
                    "<i class='fa-solid fa-location-dot' style='color: #2179FF;'></i>" +
                    "<address class='text-secondary'>" + x[i].getElementsByTagName("adresse")[0].childNodes[0].nodeValue + "</address>" +
                    "</div>" +
                    "<h5 style='color: #074693;'> $" + x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue + "</h5>" +
                    "</div>" +
                    "</div>" +
                    "</td>" +
                    "<td>" +
                    "<h5>" + x[i].getElementsByTagName("bhk")[0].childNodes[0].nodeValue + "</h5>" +
                    "</td>" +
                    "<td>" +
                    "<h5>" + x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue + "</h5>" +
                    "</td>" +
                    "<td><h5>" + x[i].getElementsByTagName("statut")[0].childNodes[0].nodeValue + "</h5></td>" +
                    "<td>" +
                    "<button type='button' class='btn btn-warning' onclick='editBien(" + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + ")'>Update</button>" +
                    "</td>" +
                    "<td><button type='button' class='btn btn-danger' onclick= 'deleteBien(" + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + ")'>Delete</button></td>" +
                    "</tr>";
            }
        }
        document.getElementById("container").innerHTML = tr;
    }

}


function undoModif() {
    const title_input = document.getElementById('title-input');
    const description_input = document.getElementById('description-input');
    const type_select = document.getElementById('type-select');
    const sale_select = document.getElementById('sale_select');
    const bathroom_input = document.getElementById('bathroom-input');
    const kitchen_input = document.getElementById('kitchen-input');
    const bhk_select = document.getElementById('bhk-select');
    const bedroom_input = document.getElementById('bedroom_input');
    const balcony_input = document.getElementById('balcony_input');
    const hall_input = document.getElementById('hall_input');
    const floor_select = document.getElementById('floor_select');
    const price_input = document.getElementById('price_input');
    const city_input = document.getElementById('city_input');
    const state_input = document.getElementById('state_input');
    const total_floor_select = document.getElementById('total_floor_select');
    const area_input = document.getElementById('area_input');
    const address_input = document.getElementById('address_input');
    const elevator_select = document.getElementById('elevator_select');
    const security_select = document.getElementById('security_select');
    const guardens_select = document.getElementById('guardens_select');
    const water_select = document.getElementById('water_select');
    const power_select = document.getElementById('power_select');
    const parking_select = document.getElementById('parking_select');
    const gym_select = document.getElementById('gym_select');
    const mall_select = document.getElementById('mall_select');
    const hospital_select = document.getElementById('hospital_select');
    const school_select = document.getElementById('school_select');
    const status_select = document.getElementById('status_select');
    const featured_select = document.getElementById('featured_select');
    const image1_input = document.getElementById('image1_input');
    const image2_input = document.getElementById('image2_input');
    const image3_input = document.getElementById('image3_input');


    image1_input.value = ""
    image2_input.value = "";
    image3_input.value = "";
    title_input.value = "";
    description_input.value = "";
    bathroom_input.value = "";
    kitchen_input.value = "";
    bedroom_input.value = "";
    balcony_input.value = "";
    hall_input.value = "";
    price_input.value = "";
    city_input.value = "";
    state_input.value = "";
    area_input.value = "";
    address_input.value = "";

    selected_undo_func(type_select,"");
    selected_undo_func(sale_select,"");
    selected_undo_func(bhk_select,"");
    selected_undo_func(floor_select,"");
    selected_undo_func(total_floor_select,"");
    selected_undo_func(elevator_select,"");
    selected_undo_func(security_select,"");
    selected_undo_func(guardens_select,"");
    selected_undo_func(water_select,"");
    selected_undo_func(parking_select,"");
    selected_undo_func(power_select,"");
    selected_undo_func(gym_select,"");
    selected_undo_func(mall_select,"");
    selected_undo_func(hospital_select,"");
    selected_undo_func(school_select,"");

    document.getElementById('modif_btn').style.display = "none";
    document.getElementById('submit_btn').style.display = "none";

    document.getElementById('cache_moi').style.display = "none";
}


function selected_undo_func(item, val) {
    for (var i = 0; i < item.options.length; i++) {
        if (item.options[i].value === val) {
            item.options[i].selected = true;
            break;
        }
    }
}