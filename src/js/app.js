const testModules = require('./test-module.js');
require('../css/app.css');
//const sass = require('sass');

const userFile = require('./random-user-mock.js');
//formattedUserFile = require('./formatted-user-mock.js');


//user_array = [];
processed_user_array = [];

top_teachers_array = [];
statistics_array = [];
favorites_array = [];

result_arr = [];

rowsPerPage = 10;
    currentPage = 1;
    ascendingOrderRequired = true;

//TASK1: Reformat data from random-user-mock.js into needed format
function format_data(random, additional) {
//console.log(rawData.name);
user_array = [];
//random formatting
random.forEach(user => {
 formattedUser = {};

formattedUser.gender = user.gender;
formattedUser.title = user.name.title;
formattedUser.full_name = user.name.first + ' ' + user.name.last;

formattedUser.city = user.location.city;
formattedUser.state = user.location.state;
formattedUser.country = user.location.country;
formattedUser.postcode = user.location.postcode;
formattedUser.coordinates = user.location.coordinates;
formattedUser.timezone = user.location.timezone;

formattedUser.email = user.email;

formattedUser.b_date = user.dob.date;
formattedUser.age = user.dob.age;

formattedUser.phone = user.phone;

formattedUser.picture_large = user.picture.large;
formattedUser.picture_thumbnail = user.picture.thumbnail;

//additional fields
formattedUser.id = create_id(user.id.name, user.id.value);
formattedUser.favorite = create_favorite(user.favorite);
formattedUser.course = create_course(user.course);
formattedUser.bg_color = create_bg_color(user.bg_color);
formattedUser.note = create_note(user.note);

user_array.push(formattedUser);
});

//additinal formatting
additional.forEach(user => {
 formattedUser = {};

formattedUser.gender = define(user.gender);
formattedUser.title = define(user.title);
formattedUser.full_name = define(user.full_name);

formattedUser.city = define(user.city);
formattedUser.state = define(user.state);
formattedUser.country = define(user.country);
formattedUser.postcode = define(user.postcode);
formattedUser.coordinates = define(user.coordinates);
formattedUser.timezone = define(user.timezone);

formattedUser.email = define(user.email);

formattedUser.b_date = define(user.b_day);
formattedUser.age = define(user.age);

formattedUser.phone = define(user.phone);

formattedUser.picture_large = define(user.picture_large);
formattedUser.picture_thumbnail = define(user.picture_thumbnail);

//additional fields
formattedUser.id = user.id;
formattedUser.favorite = create_favorite(user.favorite);
formattedUser.course = create_course(user.course);
formattedUser.bg_color = create_bg_color(user.bg_color);
formattedUser.note = create_note(user.note);

 user_array.push(formattedUser);
});

//process users so no duplicates are kept
processed_user_array.push(...check_for_duplicates(user_array));
//return the final array
return processed_user_array;
}


function define(data) {
return typeof data === "undefined" ? null : data;
}

function create_id(name, value) {

if(value === null) {//generate id value
name = 'TFN';
value = generate_tfn();
}
return name + '' + value;
}

function generate_tfn() {
  //create vars
  var tfn = Math.floor(100000000 + Math.random() * 900000000);
  var sum;
  var zero = 13;
  var weights = [10, 7, 8, 4, 6, 3, 5, 2, 1];

  //loop through each
  while (zero != 0) {
    //reset vars
    sum = 0;
    tfn = parseInt(tfn) + 1;
    product = 0;

    //Loop through each number
    for (var i = 0; i < String(tfn).length; i++) {
      //Check digit
      sum = sum + (String(tfn).substr(i, 1) * weights[i]);
    }

    //check if valid
    zero = sum % 11;
  }

 return tfn;
}

function create_favorite(data){
favorite = define(data);//check if field exists
if(favorite === null) {
favorite = Math.random()>=0.5;
}

return favorite;
}


function create_course(data){
let courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
                                            "Law", "Art", "Medicine", "Statistics"];
course = define(data);//check if field exists
if(course === null) {
course = courses[(Math.floor(Math.random() * courses.length))];
}

return course;
}

function create_bg_color(data) {
bg_color = define(data);//check if field exists
if(bg_color === null) {
bg_color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

return bg_color;
}

function create_note(data) {
default_note = define(data);
if(default_note === null) {
default_note = 'User is shy~';
}

return default_note;
}

function check_for_duplicates(array) {

filtered_array = array.reduce((temp_list, this_user) => {
if(!temp_list.find((user) => user.full_name === this_user.full_name)) {
    temp_list.push(this_user);
}
return temp_list;
}, []);

return filtered_array;
}



//TASK2: Validate object
function validate_users(us_array) {
//console.log(us_array.length);
for (i = 0; i < us_array.length; i++) {
user = us_array[i];
//string fields
//console.log("HI!");
validation = 'User ' + i + ' name is valid: ' + validate_string_field(user.full_name, i) +
';\nGender is valid: ' + validate_string_field(user.gender, i) +
';\nNote is valid: ' + validate_string_field(user.note, i) +
';\nState is valid: ' + validate_string_field(user.state, i) +
';\nCity is valid: ' + validate_string_field(user.city, i) +
';\nCountry is valid: ' + validate_string_field(user.country, i) +
';\nAge is valid: ' + isNumber(user.age) +
';\nPhone is valid: ' + isValidPhoneNumber(user.phone) + //phone number WHAT DO YOU MEAN BY COUNTRY. AM I SUPPOSED TO WRITE A MAP???
';\nEmail is valid: ' + isValidEmail(user.email);
//console.log("HI!");
}
}

function validate_string_field(data, index) {
field_is_valid = (isString(data) && firstLetterUppercase(data));

if (!isString(data) && !firstLetterUppercase(data)) {//case if totally invalid
console.log('User ' + index + ' field DOES NOT FIT CRITERIA;');
} else if (!isString(data)) {//not string
console.log('User ' + index + ' field IS NOT STRING');
} else if (!firstLetterUppercase(data)) {//1st letter not capitalized
console.log('User ' + index + ' field FIRST LETTER NOT CAPITALIZED');
} else {
return field_is_valid;
}
return field_is_valid;
}


function isString(value) {
return typeof value === 'string';
}

function firstLetterUppercase(value) {
return /^[A-Z]/.test(value);
}

function isNumber(age){
if (age === null) {
console.log('Age is null');
return false;
}
return  Number.isInteger(age);
}

function isValidPhoneNumber(phone) {

   //regex to check valid phone number.
    const pattern = /^(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

    if (phone === null) {
    console.log('Phone is null');
    return false;
    }
    //return true if the phone number matched the regex
    return pattern.test(phone)
}


function isValidEmail(email) {
    if (email === null) {
        console.log('Email is null');
        return false;
    }
  return email.includes('@');
}

//TASK 3: Filter objects by 4 parameters (&&)
function parameter_filter(user_array, country, min_age, max_age, gender, favorite, withPhoto) {
filtered_users = [];
final_filtered_users = [];
//all are "Any"
if(country === "any" && min_age === "any" && max_age === "any" && gender === "any") {
filtered_users = user_array;
}

//in case SOME are "Any"
//if AGE and GENDER are SPECIFIED
if(country === "any" && min_age !== "any" && max_age !== "any" && gender !== "any") {
filtered_users = user_array.filter(user => (user.age >= min_age && user.age <= max_age) && user.gender === gender);
}
//if COUNTRY and GENDER are specified
if(country !== "any" && min_age === "any" && max_age === "any" && gender !== "any") {
filtered_users = user_array.filter(user => user.country === country && user.gender === gender);
}
//if COUNTRY and AGE are SPECIFIED
if(country !== "any" && min_age !== "any" && max_age !== "any" && gender === "any") {
filtered_users = user_array.filter(user => user.country === country && (user.age >= min_age && user.age <= max_age));
}

//if AGE ONLY SPECIFIED
if(country === "any" && min_age !== "any" && max_age !== "any" && gender === "any") {
filtered_users = user_array.filter(user => (user.age >= min_age && user.age <= max_age));
}
//if COUNTRY ONLY SPECIFIED
if(country !== "any" && min_age === "any" && max_age === "any" && gender === "any") {
filtered_users = user_array.filter(user => user.country === country);
}
//if GENDER ONLY SPECIFIED
if(country === "any" && min_age === "any" && max_age === "any" && gender !== "any") {
filtered_users = user_array.filter(user => user.gender === gender);
}


//get the filtered users list by proper options (NONE are ANY)
if(country !== "any" && min_age !== "any" && max_age !== "any" && gender !== "any") {
filtered_users = user_array.filter(user => user.country === country
      && (user.age >= min_age && user.age <= max_age)
      && user.gender === gender);
      }

//ticks filtering
	  if(favorite && withPhoto) {
	  console.log("fav is true; photo is true");
	  final_filtered_users = filtered_users.filter(user => user.favorite && user.picture_thumbnail !== "");
	  } else if (favorite && !withPhoto) {
	  console.log("fav is true; photo is false");
	  final_filtered_users = filtered_users.filter(user => user.favorite);
	  } else if (!favorite && withPhoto) {
	  console.log("fav is false; photo is true");
	  final_filtered_users = filtered_users.filter(user => user.picture_thumbnail !== "");
	  } else {//so, not ONLY fas && NOT ONLY with pic
	  console.log("fav is false; photo is false");
	  final_filtered_users = filtered_users;
	  }


//console.log(filtered_users);
return final_filtered_users;
}



//TASK 4: Sort objects by 4 parameters (||)
function parameter_sort(user_array, sort_by_full_name, sort_by_age, sort_by_b_date, sort_by_country, sort_by_spec, ascending) {
user_array.sort((a, b) => {

if (sort_by_full_name) {
if (a.full_name < b.full_name) return ascending ? -1 : 1;
if (a.full_name > b.full_name) return ascending ? 1 : -1;
}

if (sort_by_age) {
if (a.age < b.age) return ascending ? -1 : 1;
if (a.age > b.age) return ascending ? 1 : -1;
}

if(sort_by_b_date) {
if (new Date(a.b_date) < new Date(b.b_date)) return ascending ? -1 : 1;
if (new Date(a.b_date) > new Date(b.b_date)) return ascending ? 1 : -1;
}

if(sort_by_country) {
if (a.country < b.country) return ascending ? -1 : 1;
if (a.country > b.country) return ascending ? 1 : -1;
}

if(sort_by_spec) {
if (a.course < b.course) return ascending ? -1 : 1;
if (a.course > b.course) return ascending ? 1 : -1;
}

//IF both identical return 0
return 0;
});

return user_array;
}


//TASK 5: find object by parameter
function find_user(user_array, field){
if(field === "") {
return user_array;
}

//console.log("Inside find_user field = " + field);
//console.log(user_array);
const filtered_users = user_array.filter(user =>
user.full_name === field
|| user.note === field
|| user.age == field
|| user.id === field
|| user.country === field
|| user.course === field
|| user.gender === field);

//console.log("filtered_users");
//console.log(filtered_users);

if(filtered_users.length == 0) {
console.log('No users found');
return 0;
}
return filtered_users;
}


//TASK 6: statistics
function calculate_statistics(user_array, field){
let temp = find_user(user_array, field);
//console.log(temp.length);
//if(temp.length == 0) {
//return "0"
//}
let percentage = Math.round(((temp.length / user_array.length) * 100) * 100) / 100;

return percentage;
}


//call functions LAB 2
//console.log(format_data(userFile.randomUserMock, userFile.additionalUsers)); //userFile.additionalUsers,
//validate_users(processed_user_array);
//parameter_filter(processed_user_array, 'Switzerland', 39, 'female', false);//since favorite is randomly generated it can appear or not appear
//console.log(parameter_sort(processed_user_array, false, true, false, true, true));//name age b_date country ascending(t/f)
//console.log(find_user(processed_user_array, 'old lady with a cats'));//name note age
//console.log(calculate_statistics(processed_user_array,  55) + "%");//get percentage from total

console.log(testModules.hello);



//LAB3

//const result = sass.compile("style.scss");
//console.log(result.css);

//transfer data to html TOP TEACHERS

//console.log("hELLO");
//const dataElement = document.querySelector('.searched-teacher-list');
//processed_user_array.map(user => {
//dataElement.insertAdjacentHTML('afterbegin', `
//
//        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
//            <div class="image-box">
//                <img class="teacher-image" src=${user.picture_thumbnail}>
//                <span class="teacher-initials">I.T</span>
//            </div>
//            <div class="teacher-item-info">
//                <p class="teacher-name">${user.full_name}</p>
//                <p class="teacher-spec">${user.course}</p>
//                <p class="teacher-region">${user.country}</p>
//            </div>
//        </div>
//`)
//})

//top_teachers_array
function cleanUpTeachers(){
 //("in cleanUpTeachers()");
    document.getElementById("top_teachers_list").innerHTML = "";
}

//clean stats table
function clearTable(){
    //document.getElementById("table_body_id").innerHTML = "";
    let specChartStatus = Chart.getChart("specialty_chart"); // <canvas> id
        if (specChartStatus != undefined) {
          specChartStatus.destroy();
        }
    let ageChartStatus = Chart.getChart("age_chart"); // <canvas> id
        if (ageChartStatus != undefined) {
          ageChartStatus.destroy();
        }

    let sexChartStatus = Chart.getChart("gender_chart"); // <canvas> id
        if (sexChartStatus != undefined) {
          sexChartStatus.destroy();
        }

    let countryChartStatus = Chart.getChart("nationality_chart"); // <canvas> id
        if (countryChartStatus != undefined) {
          countryChartStatus.destroy();
        }
}

//used in searchForTeacher()
function loadUpTeachers(arr) {
if(arr === null) {
return;
}
 //console.log("in loadUpTeachers()");
const dataElement = document.querySelector('.searched-teacher-list');
arr.map(user => {
dataElement.insertAdjacentHTML('afterbegin', `

        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <div class="image-box">
                <img class="teacher-image" src=${user.picture_thumbnail}>
                <span class="teacher-initials">I.T</span>
            </div>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-spec">${user.course}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
`)
})
}




//this function should also write info into info popup (by id)
function openTeacherInfo(teacher_id) {
    //open the popup
    let popup = document.getElementById("popup_id");
    popup.style.visibility = "visible";
//    let pop_img = document.getElementById("teacher_image_full");
//    pop_img.style.visibility = "visible";
    //call to fill with proper content
    fillPopupContent(teacher_id);
}


function openAddTeacherPopup(){
let popup = document.getElementById("add_teacher_popup");
    popup.style.visibility = "visible";
}


function fillPopupContent(teacher_id){
//put data that's actually supposed to be there
const popupInnards = processed_user_array.filter(user => user.id === teacher_id)[0];

//<img alt="Fav?" src="./images/star.png" id="teacher_favorite_star"  onclick="toggleFavorite(this.id)"/>
    const teacherFavStarImageContainer = document.getElementById("teacher_fav");
    teacherFavStarImageContainer.innerHTML = "";

    let teacherFavStarImage = document.createElement("img");
    teacherFavStarImage.id = "teacher_favorite_star";
    console.log(popupInnards.favorite);

    if(popupInnards.favorite) {
    teacherFavStarImage.src = "./images/star_filled.png";//filled star
    } else {
    teacherFavStarImage.src = "./images/star.png";//empty star
    }
    //console.log(teacherFavStarImage.src);
    teacherFavStarImage.addEventListener("click", function() {toggleFavorite(popupInnards.id)});

    teacherFavStarImageContainer.appendChild(teacherFavStarImage);


    const teacherInfoContainer = document.getElementById("teacher_info");
    teacherInfoContainer.innerHTML = "";

    let teacherInfoName = document.createElement("h1");
    teacherInfoName.id = "teacher_name";
     teacherInfoName.innerText = popupInnards.full_name;
    teacherInfoContainer.appendChild(teacherInfoName);

     let teacherInfoCourse = document.createElement("h3");
        teacherInfoCourse.id = "teacher_speciality_full";
         teacherInfoCourse.innerText = popupInnards.course;
        teacherInfoContainer.appendChild(teacherInfoCourse);

     let teacherInfoCountry = document.createElement("h4");
             teacherInfoCountry.id = "teacher_region_full";
              teacherInfoCountry.innerText = popupInnards.country;
             teacherInfoContainer.appendChild(teacherInfoCountry);

     let teacherInfoGender = document.createElement("h4");
                  teacherInfoGender.id = "teacher_age_gender_full";
                   teacherInfoGender.innerText = popupInnards.age + ", " + popupInnards.gender;
                  teacherInfoContainer.appendChild(teacherInfoGender);

    let teacherInfoEmail = document.createElement("address");
                      teacherInfoEmail.id = "email_address";
                       teacherInfoEmail.innerText = popupInnards.email;
                      teacherInfoContainer.appendChild(teacherInfoEmail);

    let teacherInfoPhone = document.createElement("h4");
                      teacherInfoPhone.id = " teacher_phone_full";
                       teacherInfoPhone.innerText = "+" + popupInnards.phone;
                      teacherInfoContainer.appendChild(teacherInfoPhone);


    const teacherInfoAbout = document.getElementById("teacher_desc_box");
    teacherInfoAbout.innerHTML = "";

        let teacherInfoDesc = document.createElement("p");
            teacherInfoDesc.id = "teacher_description_full";
             teacherInfoDesc.innerText = popupInnards.note;
            teacherInfoAbout.appendChild(teacherInfoDesc);


  const teacherInfoImageBox = document.getElementById("teacher_image");
    teacherInfoImageBox.innerHTML = "";

     let teacherInfoImg = document.createElement("img");
                teacherInfoImg.id = "teacher_image_full"
              // teacherInfoImg.class = "teacher-image-full";
               console.log(popupInnards.picture_large);
                 teacherInfoImg.src = popupInnards.picture_large;
                // document.getElementById('teacher_image_full').src = popupInnards.picture_large;
                 console.log(teacherInfoImg.src);
                teacherInfoImageBox.appendChild(teacherInfoImg);

    const teacherMapBox = document.getElementById("map_wrapper");
    teacherMapBox.innerHTML = "";

         teacherMapToggler = document.createElement("p");
            teacherMapToggler.id = "teacher_map_text";
        teacherMapToggler.innerText = "Toggle map";
        teacherMapToggler.style = "text-decoration: underline";
        teacherMapToggler.addEventListener("click", function() {openMapPopup(popupInnards.coordinates.latitude, popupInnards.coordinates.longitude)});

         teacherMapBox.appendChild(teacherMapToggler);//append the toggler

//        teacherActualMap = document.createElement("div");
//            teacherActualMap.id = 'map';
//            teacherActualMap.style = "height: 100px; width: 500px;";
//        teacherMapBox.appendChild(teacherActualMap);//append the map

}

function closeTeacherInfo() {
if(document.getElementById("map") !== null) {
mapChild = document.getElementById("map");
            mapChild.parentNode.removeChild(mapChild);
}
let popup = document.getElementById("popup_id");
            popup.style.visibility = "hidden";
}

function closeAddTeacherPopup() {
let popup = document.getElementById("add_teacher_popup");
            popup.style.visibility = "hidden";
}


function toggleFavorite(fav_id) {
let favImg = document.getElementById("teacher_favorite_star");
let thisTeacher = processed_user_array.filter(user => user.id === fav_id);
//console.log(thisTeacher);
//console.log(is_fav);
console.log("fav pre: " + thisTeacher.favorite);
if(!thisTeacher.favorite) {
     favImg.src =
     "./images/star_filled.png"
     thisTeacher.favorite = true;
     //favorites_array.push('fav!');//adding to favs
      console.log("fav: " + thisTeacher.favorite);
     } else {
     favImg.src ="./images/star.png"
     thisTeacher.favorite = false;
     //favorites_array.pop('fav!');//removing from favs
     console.log("fav: " + thisTeacher.favorite);
     }

}

//stats table stuff

    //////SORTING STATISTICS
    function sortStats(parameter) {
    clearTable();
    if (parameter === 'byname') {
    populateTable(parameter_sort(processed_user_array, 1, 0, 0, 0, 0, ascendingOrderRequired), currentPage);
    }
    if (parameter === 'byage') {
    populateTable(parameter_sort(processed_user_array, 0, 1, 0, 0, 0, ascendingOrderRequired), currentPage);
    }
    if (parameter === 'bycountry') {
    populateTable(parameter_sort(processed_user_array, 0, 0, 0, 1, 0, ascendingOrderRequired), currentPage);
    }
    if (parameter === 'byspec') {
    populateTable(parameter_sort(processed_user_array, 0, 0, 0, 0, 1, ascendingOrderRequired), currentPage);
    }
    ascendingOrderRequired = ascendingOrderRequired ? 0 : 1;
    }


function populateTable(array_of_users, page) {

spec_labels_list = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry',
                      'Law', 'Art', 'Medicine', 'Statistics'];
country_labels_list = [	'Australia', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Iran', 'Ireland', 'Netherlands',
'New Zeland', 'Norway', 'Spain', 'Switzerland', 'Turkey', 'Ukraine', 'United States'];

age_labels_list = ['18-31', '32-45', '46-59', '60-73', '74-87', '88-99'];
users_1831 = array_of_users.filter(user => (user.age >= 18 && user.age <= 31));
users_3245 = array_of_users.filter(user => (user.age >= 32 && user.age <= 45));
users_4659 = array_of_users.filter(user => (user.age >= 46 && user.age <= 59));
users_6073 = array_of_users.filter(user => (user.age >= 60 && user.age <= 73));
users_7487 = array_of_users.filter(user => (user.age >= 74 && user.age <= 87));
users_8899 = array_of_users.filter(user => (user.age >= 88 && user.age <= 99));

//array_of_users.forEach(user => { });
//ok so i get an array of teachers with a specialty and then the percentage size of that array to the array_of_users and that's what i translate to the pie
//1. arr of Math teachers:

       //CHART. maybe like. put it into populateTable and put the data in there..?
        ctxSpec = document.getElementById('specialty_chart');
         new Chart(ctxSpec, {
           type: 'pie',
           data: {
             labels: spec_labels_list,
             datasets: [{
               label: '% of Teachers in Specialty',
               data: [calculate_statistics(array_of_users, 'Mathematics'),
               calculate_statistics(array_of_users, 'Physics'),
               calculate_statistics(array_of_users, 'English'),
               calculate_statistics(array_of_users, 'Computer Science'),
               calculate_statistics(array_of_users, 'Dancing'),
               calculate_statistics(array_of_users, 'Chess'),
               calculate_statistics(array_of_users, 'Biology'),
               calculate_statistics(array_of_users, 'Chemistry'),
               calculate_statistics(array_of_users, 'Law'),
               calculate_statistics(array_of_users, 'Art'),
               calculate_statistics(array_of_users, 'Medicine'),
               calculate_statistics(array_of_users, 'Statistics')],
               borderWidth: 1,
               backgroundColor: [
                                  '#B91372',
                                  '#413620',
                                  '#357DED',
                                  '#09BC8A',
                                  '#875C74',
                                  '#D1FAFF',
                                  '#56667A',
                                  '#EFD3D7',
                                  '#FFFD82',
                                  '#F6AA28',
                                  '#BB342F',
                                  '#CC5A71'
                                ],
             }],

           },
           options: {
             scales: {
               y: {
                 beginAtZero: true
               }

             }
           }
         });


         ctxAge = document.getElementById('age_chart');
                  new Chart(ctxAge, {
                    type: 'pie',
                    data: {
                      labels: age_labels_list,
                      datasets: [{
                        label: '% of Teachers of Age',
                        data: [
                        Math.round(((users_1831.length / user_array.length) * 100) * 100) / 100,
                        Math.round(((users_3245.length / user_array.length) * 100) * 100) / 100,
                        Math.round(((users_4659.length / user_array.length) * 100) * 100) / 100,
                        Math.round(((users_6073.length / user_array.length) * 100) * 100) / 100,
                        Math.round(((users_7487.length / user_array.length) * 100) * 100) / 100,
                        Math.round(((users_8899.length / user_array.length) * 100) * 100) / 100
                        ],
                        borderWidth: 1,
                        backgroundColor: [
                                           '#56667A',
                                           '#EFD3D7',
                                           '#FFFD82',
                                           '#CC5A71',
                                           '#875C74',
                                           '#D1FAFF'
                                         ],
                      }],

                    },
                    options: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }
                  });


             ctxGender = document.getElementById('gender_chart');
                              new Chart(ctxGender, {
                                type: 'pie',
                                data: {
                                  labels: ['male', 'female'],
                                  datasets: [{
                                    label: '% of Teachers of Gender',
                                    data: [calculate_statistics(array_of_users, 'male'),
                                    calculate_statistics(array_of_users, 'female')
                                    ],
                                    borderWidth: 1,
                                    backgroundColor: [
                                                       '#B91372',
                                                       '#413620'
                                                      ],
                                  }],

                                },
                                options: {
                                  scales: {
                                    y: {
                                      beginAtZero: true
                                    }
                                  }
                                }
                              });


 ctxNat = document.getElementById('nationality_chart');
         new Chart(ctxNat, {
           type: 'pie',
           data: {
             labels: country_labels_list,
             datasets: [{
               label: '% of Teachers in Specialty',
               data: [calculate_statistics(array_of_users, 'Australia'),
               calculate_statistics(array_of_users, 'Canada'),
               calculate_statistics(array_of_users, 'Denmark'),
               calculate_statistics(array_of_users, 'Finland'),
               calculate_statistics(array_of_users, 'France'),
               calculate_statistics(array_of_users, 'Germany'),
               calculate_statistics(array_of_users, 'Iran'),
               calculate_statistics(array_of_users, 'Ireland'),
               calculate_statistics(array_of_users, 'Netherlands'),
               calculate_statistics(array_of_users, 'New Zeland'),
               calculate_statistics(array_of_users, 'Norway'),
               calculate_statistics(array_of_users, 'Spain'),
               calculate_statistics(array_of_users, 'Switzerland'),
               calculate_statistics(array_of_users, 'Turkey'),
               calculate_statistics(array_of_users, 'Ukraine'),
               calculate_statistics(array_of_users, 'United States')

               ],
               borderWidth: 1,
               backgroundColor: [
                                  '#B91372',
                                  '#413620',
                                  '#357DED',
                                  '#BB254B',
                                  '#6EA4BF',
                                  '#D1FAFF',
                                  '#56667A',
                                  '#EFD3D7',
                                  '#FFFD82',
                                  '#F6AA28',
                                  '#E6ADEC',
                                  '#CC5A71',
                                  '#06D6A0',
                                  '#E9ECF5',
                                  '#5E548E',
                                  '#76B041'
                                ],
             }],

           },
           options: {
             scales: {
               y: {
                 beginAtZero: true
               }
             }
           }
         });


       //table
//      let table = document.getElementById("table_body_id");
//
//      const startIndex = (page - 1) * rowsPerPage;
//      //console.log(startIndex);
//      const endIndex = startIndex + rowsPerPage;
//       //console.log(endIndex);
//      const slicedData = array_of_users.slice(startIndex, endIndex);
//      //console.log(slicedData);
//
//
//  table.innerHTML = "";
//  slicedData.forEach(user => {
//
//       let row = table.insertRow(-1);
//
////Create table cells
//      let name = row.insertCell(0);
//      let speciality = row.insertCell(1);
//      let age = row.insertCell(2);
//      let gender = row.insertCell(3);
//      let nationality = row.insertCell(4);
//
//      //Add data to cells
//            name.innerText = user.full_name;
//            speciality.innerText = user.course;
//            age.innerText = user.age;
//            gender.innerText = user.gender;
//            nationality.innerText = user.country;
//});
//
//       updatePagination(array_of_users, page);
}

function updatePagination(array_of_users, currentPage) {
            const pageCount = Math.ceil(array_of_users.length / rowsPerPage);
            const paginationContainer = document.getElementById("stats_nav");
            paginationContainer.innerHTML = "";

            for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement("button");
            pageButton.type = "button";
            pageButton.innerText = i;
            pageButton.onclick = function () {
                  populateTable(processed_user_array, i);
             };
             if (i === currentPage) {
                  pageButton.style.fontWeight = "bold";
             }
             paginationContainer.appendChild(pageButton);
             paginationContainer.appendChild(document.createTextNode(" "));

            }
        }

//actually call the table population function
//populateTable(processed_user_array, currentPage);


//SEARCHBAR (used inside HTML)
function searchForTeacher() {
//console.log(processed_user_array);
//getResponse.then(function(arr) {
      const input = document.getElementById("search_field");
      const search_parameter = input.value;
      const found_users = find_user(processed_user_array, search_parameter);
      console.log(found_users);
      //actually show found teachers
      //take array made by find_user(...) and put it into the function below
     // console.log("in searchForTeacher()");
     cleanUpTeachers();
     loadUpTeachers(found_users);
     //console.log(calculate_statistics(found_users, search_parameter) + "%");
     clearTable();
     populateTable(found_users, currentPage);
//});
}


function filterByOptions() {
regionControl = document.getElementById("region_control");
optionRegion = regionControl.options[regionControl.selectedIndex].value;
console.log(optionRegion);

ageControl = document.getElementById("age_control");
optionAge = ageControl.options[ageControl.selectedIndex].value;
ageMin = optionAge.slice(0, 2);
console.log(ageMin);
ageMax = optionAge.slice(2, 4);
console.log(ageMax);

if(optionAge === "any") {
ageMin = "any";
ageMax = "any";
console.log(ageMin);
console.log(ageMax);
}

sexControl = document.getElementById("sex_control");
optionSex = sexControl.options[sexControl.selectedIndex].value;
console.log(optionSex);

favoriteControl = document.getElementById("favorite_control");
tickFav = favoriteControl.checked;
console.log(tickFav);

photoControl = document.getElementById("photo_control");
tickPhoto = photoControl.checked;
console.log("tickphoto:" + tickPhoto);

//console.log(parameter_filter(processed_user_array, optionRegion, ageMin, ageMax, optionSex, tickFav, tickPhoto));
cleanUpTeachers();
changedTeacherArr = parameter_filter(processed_user_array, optionRegion, ageMin, ageMax, optionSex, tickFav, tickPhoto);
loadUpTeachers(changedTeacherArr);
//console.log(currentPage);
clearTable();
populateTable(changedTeacherArr, currentPage);
//console.log("Populated the table!");
//console.log(calculate_statistics(user_array, field + "%"));
}

function sexChange(sex) {
    if(sex.id === 'add_teacher_male') {
    document.getElementById('add_teacher_female').checked = false;
    } else if (sex.id === 'add_teacher_female') {
    document.getElementById('add_teacher_male').checked = false;
    }
}


////add teacher popup button event
function addNewTeacher() {

newTeacherInputName = document.getElementById("add_teacher_name");
newTeacherFullName = newTeacherInputName.value;
console.log("name: " + newTeacherFullName);

newTeacherInputSpecialty = document.getElementById("add_teacher_spec");
newTeacherSpecialty = newTeacherInputSpecialty.options[newTeacherInputSpecialty.selectedIndex].innerText;
console.log(newTeacherSpecialty);

newTeacherInputCountry = document.getElementById("add_teacher_country");
newTeacherCountry = newTeacherInputCountry.options[newTeacherInputCountry.selectedIndex].innerText;
console.log(newTeacherCountry);

newTeacherInputCity = document.getElementById("add_teacher_city");
newTeacherCity = newTeacherInputCity.value;
console.log("city: " + newTeacherCity);

newTeacherInputEmail = document.getElementById("add_teacher_email");
newTeacherEmail = newTeacherInputEmail.value;
console.log("email: " + newTeacherEmail);

newTeacherInputPhone = document.getElementById("add_teacher_phone");
newTeacherPhone  = newTeacherInputPhone.value;
console.log("phone: " + newTeacherPhone);

newTeacherInputDoB = document.getElementById("add_teacher_birthday");
newTeacherDoB  = new Date(newTeacherInputDoB.value);
console.log("DoB: " + newTeacherDoB);

newTeacherInputNote = document.getElementById("add_teacher_notes");
newTeacherNote = newTeacherInputNote.value;
console.log("note: " + newTeacherNote);

newTeacherInputSex = document.getElementById("add_teacher_female");
if(newTeacherInputSex.checked) {
newTeacherSex = "female";
newTeacherTitle = "Ms";
console.log("sex: " + newTeacherSex);
} else {
newTeacherSex = "male";
newTeacherTitle = "Mr";
console.log("sex: " + newTeacherSex);
}

newTeacherInputColor = document.getElementById("add_teacher_color");
newTeacherColor = newTeacherInputColor.value;
console.log("color: " + newTeacherColor);

user = {
gender: newTeacherSex,
title: newTeacherTitle,
full_name: newTeacherFullName,
b_day: newTeacherDoB,
bg_color: newTeacherColor,
city: newTeacherCity,
country: newTeacherCountry,
course: newTeacherSpecialty,
email: newTeacherEmail,
phone: newTeacherPhone,
note: newTeacherNote,

age: calculateAge(newTeacherDoB),
favorite: false,

picture_large: "",
picture_thumbnail: "",
}

new_arr = [];
console.log(user);
new_arr.push(user);
console.log(format_data([], new_arr));
cleanUpTeachers();
clearTable();

const dataElement = document.querySelector('.searched-teacher-list');
processed_user_array.map(user => {
dataElement.insertAdjacentHTML('afterbegin', `

        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <div class="image-box">
                <img class="teacher-image" src=${user.picture_thumbnail}>
                <span class="teacher-initials">I.T</span>
            </div>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-spec">${user.course}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
`)
})

populateTable(processed_user_array, currentPage);

}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


//LAB 4

//TASK 1: get request: 50 users from https://randomuser.me/api
async function getOurUsers(amount) {
dummy_arr = [];
do {
 try {
 const response = await fetch('https://randomuser.me/api');
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data = await response.json();
     //console.log(data);
     dummy_arr.push(data.results[0]);
 } catch (error) {
          console.error(error);
        }
        } while (dummy_arr.length < amount);

        return dummy_arr;
}

getResponse = getOurUsers(50);
getResponse.then(function(arr) {
acquired_users_array = format_data(arr, []);
validate_users(acquired_users_array);

console.log('length: ' + acquired_users_array.length);
console.log(acquired_users_array);

//put users into the page
loadUpTeachers(acquired_users_array);
populateTable(acquired_users_array, currentPage);
createFavList(acquired_users_array);
});


//add a function that filters the existing teachers arr to only keep those that have favorite: true;
function createFavList(arr){
favorites_array = arr.filter(function(el) { return el.favorite === true; });
console.log(favorites_array);
loadUpFavs(favorites_array);
}

//fill up favs list
function loadUpFavs(arr) {

const dataElement = document.querySelector('.teacher-carousel');
arr.map(user => {
    dataElement.insertAdjacentHTML('afterbegin', `
<div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <img class="teacher-image" src=${user.picture_thumbnail}>
            <span class="teacher-initials">I.T</span>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
  `)
  })
}

const list = document.getElementById('teacher_favs_list');

const prev = document.getElementById('fav-left-btn');
prev.addEventListener('click', () => {
    list.scrollLeft -= (120)
});
const next = document.getElementById('fav-right-btn');
next.addEventListener('click', () => {
    list.scrollLeft += (120)
});


function requestMoreTeachers() {
extra_teachers_array = [];

getOurUsers(10).then(function(arr) {
format_data(arr, []);
//console.log(processed_user_array);

cleanUpTeachers();
clearTable();

const dataElement = document.querySelector('.searched-teacher-list');
processed_user_array.map(user => {
dataElement.insertAdjacentHTML('afterbegin', `

        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <div class="image-box">
                <img class="teacher-image" src=${user.picture_thumbnail}>
                <span class="teacher-initials">I.T</span>
            </div>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-spec">${user.course}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
`)
})

populateTable(processed_user_array, currentPage);
createFavList(processed_user_array);
});
}

//LAB 5: libs

//map
mapIsOpen = false;
function openMapPopup(latitude, longitude) {
console.log(latitude + "; " +  longitude);
console.log("OK MAP START!");

if(document.getElementById("map") !== null) {
mapChild = document.getElementById("map");
mapChild.parentNode.removeChild(mapChild);
}


mapChild = document.createElement("div");
mapChild.id = "map";
mapChild.style = "height: 100px; width: 700px;";
document.getElementById("map_wrapper").appendChild(mapChild);


let popup = document.getElementById('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                                    ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
                map = new L.Map('map');
                map.setView(new L.LatLng(latitude, longitude), 9);
                map.addLayer(osmLayer);


if(!mapIsOpen) {//if it's hidden
    popup.style.visibility = "visible";
    mapIsOpen = true;
    } else {//if it's visible
    popup.style.visibility = "hidden";

    mapChild = document.getElementById("map");
    mapChild.parentNode.removeChild(mapChild);

     mapIsOpen = false;
    }
}

//chart.js

//function populatePieChart() {
////maybe like. put it into populateTable and put the data in there..?
// const ctx = document.getElementById('specialty_chart');
//  new Chart(ctx, {
//    type: 'pie',
//    data: {
//      labels: ['A', 'B', 'C', 'D'],
//      datasets: [{
//        label: '# of Teachers in Specialty',
//        data: [12, 19, 3, 5, 2],
//        borderWidth: 1
//      }]
//    },
//    options: {
//      scales: {
//        y: {
//          beginAtZero: true
//        }
//      }
//    }
//  });
//  }