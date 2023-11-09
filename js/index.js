let rowData = document.querySelector(".prod")

async function getSearch(value) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    let data = await response.json()
    // console.log(data.meals);
    // console.log(data.meals[5].strMeal);
    let cart = ''
    for (let i = 0; i < data.meals.length; i++) {
        // console.log(data.meals[i].strMeal + i);
        cart += `                        
        <div onclick="getSpecialMeal(${data.meals[i].idMeal})" class="col-md-3" id="${data.meals[i].idMeal}">
            <div class="item rounded-4 position-relative overflow-hidden" >
                <img src="${data.meals[i].strMealThumb}" class="w-100 " alt="">
                <div class="overlay position-absolute rounded-3 d+">
                    <p>${data.meals[i].strMeal}</p>
                </div>
                
            </div>
        </div>`
    }
    rowData.innerHTML = cart
    // console.log(rowData.innerHTML);
}

async function getSpecialMeal(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await response.json()
    console.log(data.meals);
    let cart = `
        <div class="row text-white">
            <div class="col-md-4 d-flex justify-content-center align-items-center flex-column">
                <div>
                    <img src="${data.meals[0].strMealThumb}"
                        class=" rounded-3 w-100" alt="">
                </div>
                <p class="fs-2 px-1 fw-bold">${data.meals[0].strMeal}</p>
            </div>
            <div class="col-md-8">
                <div>
                    <p class="fs-2 fw-bold">Instructions</p>
                    <p>${data.meals[0].strInstructions}</p>
                    <p class="fs-3 fw-medium"><span class="fs-2 px-1 fw-bold">Area :</span>${data.meals[0].strArea}</p>
                    <p class="fs-3 fw-medium"><span class="fs-2 px-1 fw-bold">Category :</span>${data.meals[0].strCategory}</p>
                    <p class="fs-3 fw-bold">Reciepes :</p>
                    <div class="d-flex gap-3 py-2 flex-wrap" id="ingredients">
                    </div>
                    <p class="fs-3 fw-bold">tags:</p>
                    <div class="d-flex gap-3 flex-wrap" id="tags">
                    </div>
                    <div class="d-flex pt-4 gap-2">
                        <button class="btn btn-danger"><a target="_blank" href="${data.meals[0].strYoutube}">Youtube</a></button>
                        <button class="btn btn-success"><a href="${data.meals[0].strSource}">Source</a></button>
                    </div>
                </div>
            </div>
        </div>
</div>`
    let ingr = ``;
    for (let i = 1; i < 20; i++) {
        if (data.meals[0][`strIngredient${i}`] == "" || data.meals[0][`strIngredient${i}`] == null)
            break;
        ingr += `<div class=" border border-0  d-flex justify-content-center align-items-center rounded-3">
         <p class="p-2 m-0">${data.meals[0][`strIngredient${i}`]}</p>
     </div>`;
    }
    let tag = ``;
    if (data.meals[0].strTags != "" && data.meals[0].strTags != null) {
        let tags = data.meals[0].strTags.split(",")

        for (i = 0; i < tags.length; i++) {
            tag += ` <div class=" border border-0 d-flex justify-content-center align-items-center rounded-3">
        <p class="p-2 m-0">${tags[i]}</p>
    </div>`;
        }
    }
    console.log(ingr + tag);
    setTimeout(() => {
        let ingredients = document.querySelector('#ingredients')
        let tags = document.querySelector('#tags')
        if (ingredients != null && tags != null) {
            ingredients.innerHTML = ingr
            tags.innerHTML = tag
            console.log(ingredients, tags);
        }
    }, 1)
    async function addRecpiece() {

    }
    addRecpiece()
    rowData.innerHTML = cart
}
getSearch("")

async function getCategories() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let { categories } = await response.json()
    console.log(categories);
    let cart = ''
    for (let i = 0; i < categories.length; i++) {
        // console.log(data.meals[i].strMeal + i);
        cart += `                        
        <div onclick="getSpecialMeal(${categories[i].idCategory})" class="col-md-3" id="${categories[i].idMeal}">
            <div onclick="getCategoriesOf('${categories[i].strCategory}')" class="item rounded-4 position-relative overflow-hidden" >
                <img src="${categories[i].strCategoryThumb}" class="w-100 " alt="">
                <div class="overlay position-absolute rounded-3 d-flex flex-column">
                <p class="text-center p-0 m-0 fw-medium">${categories[i].strCategory}</p>
                <p class="fs-5 px-2">${categories[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
                </div>
                
            </div>
        </div>`
    }
    rowData.innerHTML = cart
    hideSide()
}

async function getArea() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let { meals } = await response.json()
    console.log(meals);
    let cart = ''
    for (let i = 0; i < meals.length; i++) {
        // console.log(data.meals[i].strMeal + i);
        cart += `                        
        <div class="col-md-3 ">
            <div onclick="getAreaOf('${meals[i].strArea}')" class="border-3 bg-black text-white text-center pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <p class="fs-2 fw-medium">${meals[i].strArea}</p>
            </div>
    </div>`
    }
    rowData.innerHTML = cart
    hideSide()
}

async function getIngredient() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i= `)
    let data = await response.json()
    console.log(data);
    let cart = ''
    for (let i = 0; i < 20; i++) {
        cart += `                        
        <div class="col-md-3" >
        <div onclick="getIngradinatOf('${data.meals[i].strIngredient}')" class="text-center text-white pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <p class="fs-3 fw-medium p-0 m-0">${data.meals[i].strIngredient}</p>
            <p>${data.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>`
    }
    rowData.innerHTML = cart
    hideSide()
}

async function getCategoriesOf(val) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${val}`)
    let data = await response.json()
    console.log(data.meals);
    displayMeals(data.meals)
}

function displayMeals(params) {
    let cart = "";
    for (let i = 0; i < params.length; i++) {
        cart += `                        
        <div onclick="getSpecialMeal(${params[i].idMeal})" class="col-md-3 pe-1 position-relative">
            <div class="item rounded-3 position-relative overflow-hidden" >
                <img src="${params[i].strMealThumb}" class="w-100 " alt="">
                <div class="overlay rounded-3 d-flex align-items-center">
                    <p>${params[i].strMeal}</p>
                </div>
            </div>
        </div>`
    }
    rowData.innerHTML = cart
}

async function getAreaOf(val) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${val}`)
    let data = await response.json()
    console.log(data.meals);
    displayMeals(data.meals)
}

async function getIngradinatOf(val) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`)
    let data = await response.json()
    console.log(data.meals);
    displayMeals(data.meals)
}

async function getSearch1() {
    let cart = `<div class="d-flex justify-content-center flex-column py-2">
    <div class=" w-75 m-auto d-flex gap-4 z-2">
        <input oninput="searchByName(this.value);" id="name" type="text" placeholder="Search By Name"
            class="form-control placeholder-white bg-black text-white py-2 px-2 w-50">
        <input oninput="searchByLetter(this.value);" id="letter" type="text" placeholder="Search By First Letter"
        maxlength="1" class="form-control placeholder-white bg-black text-white py-2 px-2 w-50">
    </div>
    <div id="searchData" class="row mt-3 g-4">
    </div>
</div>`
    rowData.innerHTML = cart
    hideSide()
}
async function searchByName(value) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    let data = await response.json()
    // console.log(data.meals);
    // console.log(data.meals[5].strMeal);
    let cartona = ""
    for (let i = 0; i < data.meals.length; i++) {
        // console.log(data.meals[i].strMeal + i);
        cartona += `                        
    <div onclick="getSpecialMeal(${data.meals[i].idMeal})" class="col-md-3" id="${data.meals[i].idMeal}">
        <div class="item rounded-4 position-relative overflow-hidden" >
            <img src="${data.meals[i].strMealThumb}" class="w-100 " alt="">
            <div class="overlay position-absolute rounded-3 d+">
                <p>${data.meals[i].strMeal}</p>
            </div>
            
        </div>
    </div>`
    }
    document.getElementById("searchData").innerHTML = cartona
}

async function searchByLetter(value) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
    let data = await response.json()
    console.log(data.meals);
    // console.log(data.meals[5].strMeal);
    let cartona = ""
    for (let i = 0; i < data.meals.length; i++) {
        console.log(data.meals[i].strMeal + i);
        cartona += `                        
    <div onclick="getSpecialMeal(${data.meals[i].idMeal})" class="col-md-3" >
        <div class="item rounded-4 position-relative overflow-hidden" >
            <img src="${data.meals[i].strMealThumb}" class="w-100 " alt="">
            <div class="overlay position-absolute rounded-3 d+">
                <p>${data.meals[i].strMeal}</p>
            </div>
            
        </div>
    </div>`
    }
    document.getElementById("searchData").innerHTML = cartona
}

function contact() {
    let cart = `
    <div class="col-md-6 ">
    <div class="">
        <input onkeyup="validateName(this.value)" class="form-control" type="text" name="name"
            id="name" placeholder="Enter Your Name">
        <label id="labelName" class="text-center my-2 py-2 d-none rounded-2">
            Special characters and numbers not allowed max 15</label>
    </div>
</div>
<div class="col-md-6">
    <div class="">
        <input onkeyup="validateEmail(this.value)" class="form-control" type="email" name="email"
            id="email" placeholder="Enter Your Email">
        <label id="labelEmail" class="text-center my-2 py-2 d-none rounded-2">
            Email not valid *exemple@yyy.zzz</label>
    </div>
</div>
<div class="col-md-6 ">
    <div class="">
        <input onkeyup="validatePhone(this.value)" class="form-control" type="tel" name="phone"
            id="phone" placeholder="Enter Your Phone">
        <label id="labelPhone" class="text-center my-2 py-2 d-none rounded-2">
            Enter valid Phone Number</label>
    </div>
</div>
<div class="col-md-6 ">
    <div class="">
        <input onkeyup="validateAge(this.value)" class="form-control" type="number" name="age"
            id="age" placeholder="Enter Your Age">
        <label id="labelAge" class="text-center my-2 py-2 d-none rounded-2">
            Enter valid Age</label>
    </div>
</div>
<div class="col-md-6 ">
    <div class="">
        <input onkeyup="validatePass(this.value)" class="form-control" type="password" name="password"
            id="password" placeholder="Enter Your Password">
        <label id="labelPass" class="text-center my-2 py-2 d-none rounded-2">
            Enter valid password *Minimum eight characters, at least one letter and one
            number:*</label>
    </div>
</div>
<div class="col-md-6 ">
    <div class="">
        <input onkeyup="validateRepass(this.value)" class="form-control" type="password"
            name="rePassword" id="rePassword" placeholder="Enter Your rePassword">
        <label id="labelRePass" class="text-center my-2 py-2 d-none rounded-2">
            Enter valid repassword</label>
    </div>
</div>
<div class="d-flex justify-content-center">
    <button class="btn btn-danger disabled m-2" id="submet">Submit</button>
</div>
    `
    rowData.innerHTML = cart
    hideSide()
}
let nameIsValid = false
let emailIsValid = false
let phoneIsValid = false
let ageIsValid = false
let passIsValid = false
let rePassIsValid = false
function validateName(params) {
    let NameReg = /^[a-zA-Z]{1,15}$/
    let nameRegex = NameReg.test(params)
    if (nameRegex == true) {
        document.getElementById("labelName").classList.add('d-none')
        nameIsValid = true
    }
    else {
        document.getElementById("labelName").classList.replace('d-none', 'd-block')
        nameIsValid = false
    }
    submetButton()
}
function validateEmail(params) {
    let emailReg = /^[a-zA-Z0-9]{1,}@[a-zA-Z]{1,}.com$/;
    let emailRegex = emailReg.test(params)
    if (emailRegex == true) {
        document.getElementById("labelEmail").classList.add('d-none')
        emailIsValid = true
    }
    else {
        document.getElementById("labelEmail").classList.replace('d-none', 'd-block')
        emailIsValid = false
    }
    submetButton()
}
function validatePhone(params) {
    let PhoneReg = /^(002|\+2){0,1}01[0125][0-9]{8}$/;
    let PhoneRegex = PhoneReg.test(params)
    if (PhoneRegex == true) {
        document.getElementById("labelPhone").classList.add('d-none')
        phoneIsValid = true
    }
    else {
        document.getElementById("labelPhone").classList.replace('d-none', 'd-block')
        phoneIsValid = false
    }
    submetButton()
}
function validateAge(params) {
    let AgeReg = /^[1-9][0-9]{0,1}$/;
    let AgeRegex = AgeReg.test(params)
    if (AgeRegex == true) {
        document.getElementById("labelAge").classList.add('d-none')
        ageIsValid = true
    }
    else {
        document.getElementById("labelAge").classList.replace('d-none', 'd-block')
        ageIsValid = false
    }
    submetButton()
}
function validatePass(params) {
    let PassReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let PassRegex = PassReg.test(params)
    if (PassRegex == true) {
        document.getElementById("labelPass").classList.add('d-none')
        passIsValid = true
    }
    else {
        document.getElementById("labelPass").classList.replace('d-none', 'd-block')
        passIsValid = false
    }
    submetButton()
}

function validateRepass(params) {
    let rePassReg = document.getElementById("password").value
    if (rePassReg == params) {
        document.getElementById("labelRePass").classList.add('d-none')
        rePassIsValid = true
    }
    else {
        document.getElementById("labelRePass").classList.replace('d-none', 'd-block')
        rePassIsValid = false
    }
    submetButton()
}
function submetButton() {
    if (nameIsValid == true && phoneIsValid == true && emailIsValid == true
        && ageIsValid == true && passIsValid == true && rePassIsValid == true) {
        document.getElementById("submet").classList.remove('disabled')
        console.log(nameIsValid);
    }
    else {
        document.getElementById("submet").classList.add('disabled')
    }
}

function showSide() {
    document.getElementById("show").classList.add("d-none")
    document.getElementById("sideBar").style.transform="translateX(0)"
    document.getElementById("hide").classList.remove("d-none")
    let child =document.getElementById("buttons").children
    for (let i = 0; i < child.length; i++) {
        child[i].style.transform="translateY(0)"
    }
    document.getElementById("buttons").style.transform="translateY(0)"
    document.getElementById("buttons").style.transition="0s"
}

function hideSide() {
    document.getElementById("show").classList.remove("d-none")
    document.getElementById("hide").classList.add("d-none")
    document.getElementById("sideBar").style.transform="translateX(-80%)"
    let child =document.getElementById("buttons").children
    for (let i = 0; i < child.length; i++) {
        child[i].style.transform="translateY(900%)"
    }
    document.getElementById("buttons").style.transform="translateY(200%)"
    document.getElementById("buttons").style.transition=".8s"
}