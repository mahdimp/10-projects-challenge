
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const popupElement = document.getElementById('pop-up');
const popupCloseElement = document.getElementById('pop-up-close');
const mealInfoElement = document.getElementById('meal-info');

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
        event.stopPropagation();
        removeMealFromLocalStorage(meal);
        displayFavoriteMeals();
    })

    favoriteMeal.addEventListener('click', (event) => {
        displayMealInfo(meal);
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
        ${isRandom ? `<span class="category"> Random Recipe </span>` : ``}
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${meal.strMeal}</h4>
        <button class="fav-button"><i class="fa fa-heart"></i></button>
    </div>`;

    const btnElement = mealElement.querySelector('.meal-body .fav-button');
    const titleElement = mealElement.querySelector('h4');


    btnElement.addEventListener('click', (event) => {
        if (btnElement.classList.contains('active')) {
            removeMealFromLocalStorage(meal);
            btnElement.classList.remove('active');

        } else {
            addMealToLocalStorage(meal);
            btnElement.classList.add('active');
        }
        displayFavoriteMeals();
    });

    titleElement.addEventListener('click', (event) => displayMealInfo(meal))

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

function clearMeals() {
    document.getElementById('meals').innerHTML = '';
}

function generateIngredients(meal) {
    const ingredients = []
    for (let i = 1; i < 20; i++) {
        if (!meal[`strIngredient${i}`]) {
            break;
        }

        const ingredient = meal[`strIngredient${i}`] + ' - ' + meal[`strMeasure${i}`];
        console.log(ingredient)
        ingredients.push(ingredient)
    }

    return ingredients;
}

function displayMealInfo(meal) {
    if (!meal) {
        return
    }

    const ingredients = generateIngredients(meal);

    const mealElement = document.createElement('div');
    mealInfoElement.innerHTML = '';

    mealElement.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <p>${meal.strInstructions}</p>
    ${ displayIngredients(ingredients) }
    `
    mealInfoElement.appendChild(mealElement)
    popupElement.classList.add('visible')
}

function displayIngredients(ingredients){
    console.log(ingredients)
    if(!ingredients.length){
        return
    }
    return `
    <h3>Ingredients</h3>
    <ul class="recipe">
        ${ingredients.map((ingredient) => '<li>' + ingredient + '</li>').join('')}
    </ul>
    `
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

popupCloseElement.addEventListener('click', (event) => {
    event.stopPropagation();
    popupElement.classList.remove('visible')
});
