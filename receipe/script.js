
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

getRandomMeal();
displayFavoriteMeals();

async function displayFavoriteMeals() {
    const meals = await fetchFavoriteMeals();
    clearFavoriteMeals();
    for (let i = 0; i < meals.length; i++) {
        displayFavoriteMeal(meals[i]);
    }
}

function displayFavoriteMeal(meal) {
    if (!meal) {
        return;
    }

    const favoriteMealsElement = document.getElementById('favorite-meals');
    const favoriteMeal = document.createElement('li');
    favoriteMeal.title = meal.strMeal;
    favoriteMeal.innerHTML = ` <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <span>${meal.strMeal}</span>
    <button class="clear-button"><i class="fa fa-close"></i></button>
    `

    favoriteMeal.querySelector('.clear-button').addEventListener('click', (event) => {
        removeMealFromLocalStorage(meal);
        displayFavoriteMeals();
    })

    favoriteMealsElement.append(favoriteMeal);

}

function displayMeal(meal, isRandom = false) {
    if (!meal) {
        return;
    }

    const mealsElement = document.getElementById('meals');
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

    mealElement.innerHTML = `
    <div class="meal-header">
        ${isRandom ? `<span class="title"> Random Recipe </span>` : ``}
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${meal.strMeal}</h4>
        <button class="fav-button"><i class="fa fa-heart"></i></button>
    </div>`;

    const btn = mealElement.querySelector('.meal-body .fav-button');

    btn.addEventListener('click', (event) => {
        if (btn.classList.contains('active')) {
            removeMealFromLocalStorage(meal);
            btn.classList.remove('active');

        } else {
            addMealToLocalStorage(meal);
            btn.classList.add('active');
        }
        displayFavoriteMeals();
    });

    mealsElement.append(mealElement)
}

function addMealToLocalStorage(meal) {
    if (!meal) {
        return;
    }

    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('recipe-meal-ids', JSON.stringify([...mealIds, meal.idMeal]))
}

function getMealsFromLocalStorage() {
    const mealIds = localStorage.getItem('recipe-meal-ids');
    const ids = JSON.parse(mealIds);
    return Array.isArray(ids) && ids.length ? ids : []
}

function clearFavoriteMeals() {
    document.getElementById('favorite-meals').innerHTML = '';
}

function clearMeals(){
    document.getElementById('meals').innerHTML = '';
}

function removeMealFromLocalStorage(meal) {
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem(
        'recipe-meal-ids',
        JSON.stringify(mealIds.filter((id) => id !== meal.idMeal))
    );
}

async function getRandomMeal() {
    const randMealApiUrl = `https://themealdb.com/api/json/v1/1/random.php`;
    const resp = await fetch(randMealApiUrl);
    const result = await resp.json();

    if (Array.isArray(result.meals) && result.meals.length) {
        let meal = result.meals[0];
        displayMeal(meal, true);
    }
}

async function getMealById(id) {
    const getMealApiUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const resp = await fetch(getMealApiUrl);
    let result = await resp.json()
    let meal;

    if (Array.isArray(result.meals) && result.meals.length) {
        meal = result.meals[0];
    }

    return meal;
}

async function getMealsBySearch(term) {
    let meals = [];
    const getMealApiUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${term}`;
    const resp = await fetch(getMealApiUrl);
    const result = await resp.json();
    if (Array.isArray(result.meals) && result.meals.length) {
        meals = result.meals;
    }

    return meals;
}

async function fetchFavoriteMeals() {
    const mealIds = getMealsFromLocalStorage();
    const meals = [];

    for (let i = 0; i < mealIds.length; i++) {
        const meal = await getMealById(mealIds[i]);
        if (meal) {
            meals.push(meal);
        }
    }

    return meals;
}


searchButton.addEventListener('click', async () => {
    const term = searchInput.value;
    const meals = await getMealsBySearch(term);
    if (meals) {
        clearMeals();
        meals.forEach(meal => displayMeal(meal))
    }
})

