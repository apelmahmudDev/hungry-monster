fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
	.then((res) => res.json())
	.then((data) => displayMeal(data.meals.splice(0, 8)));

const displayMeal = (meals) => {
	meals.forEach((meal) => {
		const mealContainer = document.getElementById('meal-container');
		const mealCard = document.createElement('div');
		const createMeal = `
			       <img src="${meal.strMealThumb}" alt="meal image"/>
                   <h3>${meal.strMeal}</h3>
			    `;
		mealCard.innerHTML = createMeal;
		mealCard.setAttribute('class', 'meal-card');
		mealContainer.appendChild(mealCard);
	});
};
