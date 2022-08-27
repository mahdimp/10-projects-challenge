
getRandomMeal();

async function getRandomMeal() {
    let meal;
    const randMealApiUrl = `https://themealdb.com/api/json/v1/1/random.php`;
    const resp = await fetch(randMealApiUrl);
    const result = await resp.json();

    if (Array.isArray(result.meals) && result.meals.length) {
        let meal = result.meals[0];
        displayMeal(meal)
    }
}

async function getMealById(id) {
    const getMealApiUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const resp = await fetch(getMealApiUrl);
    console.log(resp)
}

async function getMealsBySearch(term) {
    const getMealApiUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${term}`;
    const resp = await fetch(getMealApiUrl);
    console.log(resp)
}

function displayMeal(mealData) {
    if (!mealData) {
        return;
    }
    console.log(mealData)

    const mealsElement = document.getElementById('meals');
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');
    mealsElement.innerHTML = ''

    mealElement.innerHTML = `
    <div class="meal-header">
        <span class="title">
            Random Recipe
        </span>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-button"><i class="fa fa-heart"></i></button>
    </div>`;
    const btn = mealElement.querySelector('.meal-body .fav-button');

    btn.addEventListener('click', (event) => {
        btn.classList.toggle('active')
    });

    mealsElement.append(mealElement)
}

