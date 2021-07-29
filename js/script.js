const form = document.getElementById('myForm');
const handleForm = (e) => {
	const getInput = document.getElementById('search').value;
	e.preventDefault();
	fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getInput}`)
		.then((res) => res.json())
		.then((data) => displayMeal(data.meals.splice(0, 8)));
};
form.addEventListener('submit', handleForm);

const mealDetails = (id) => {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((res) => res.json())
		.then((data) => mealDetailShow(data.meals[0]));
};

const mealDetailShow = (meal) => {
	const mealDetail = document.getElementById('meal-details');
	const mealDetailCard = document.createElement('div');
	const createMealDetailCard = `
        <img width="300" src="${meal.strMealThumb}" alt="meal image"/>
        <h3>Ingredients</h3>
        <ul class="ingredient-list">
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient1}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient2}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient3}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient4}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient5}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient6}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient7}
            </li>
            <li>
                <span><i class="fas fa-check-square ingredient-icon"></i></span>
                ${meal.strIngredient8}
            </li>
        </ul>
    `;
	mealDetailCard.innerHTML = createMealDetailCard;
	mealDetail.appendChild(mealDetailCard);
};

const displayMeal = (meals) => {
	meals.forEach((meal) => {
		const mealContainer = document.getElementById('meal-container');
		const mealCard = document.createElement('div');
		const createMeal = `<button onclick="mealDetails(${meal.idMeal})">
            <img src="${meal.strMealThumb}" alt="meal image"/>
            <h3>${meal.strMeal}</h3>
		</button>`;
		mealCard.innerHTML = createMeal;
		mealCard.setAttribute('class', 'meal-card');
		mealContainer.appendChild(mealCard);
	});
};
