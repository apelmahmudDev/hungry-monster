const form = document.getElementById('myForm');
const handleForm = (e) => {
	const getInput = document.getElementById('search').value;
	e.preventDefault();
	console.log(getInput);
	fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getInput}`)
		.then((res) => res.json())
		.then((data) => displayMeal(data.meals.splice(0, 8)));
};
form.addEventListener('submit', handleForm);

const mealDetails = (id) => {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((res) => res.json())
		.then((data) => console.log(data.meals[0]));
};

const displayMeal = (meals) => {
	console.log(meals);
	meals.forEach((meal) => {
		console.log(meal);
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
