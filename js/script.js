const searchForm = document.getElementById('search-form');
const mealWrapper = document.getElementById('meal-wrapper');
const hungryMonsterModal = document.getElementById('hungry-monster-modal');

// get meal filter by ingredients
const getMeals = (e) => {
	e.preventDefault();
	let searchInput = document.getElementById('search-input').value.trim();
	const inputAlert = document.getElementById('alert-msg');
	if (searchInput.length === 0) {
		inputAlert.classList.remove('d-none');
	} else {
		mealWrapper.innerHTML = '';
		loaderSpinner(true);
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
			.then((res) => res.json())
			.then((data) => {
				let html = '';
				if (data.meals) {
					const meals = data.meals.splice(0, 8);
					meals.forEach((meal) => {
						html += `
                            <button class="meal-card-btn" onclick="getMealDetails(${meal.idMeal})">
                                <div class="meal-card" data-id="${meal.idMeal}">
                                    <img
                                        class="meal-card-img"
                                        src="${meal.strMealThumb}"
                                        alt="Recipe image"
                                    />
                                    <h3 class="meal-card-title">${meal.strMeal}</h3>
                                </div>
                            </button>
                        `;
					});
					mealWrapper.classList.remove('not-found');
				} else {
					html = 'No meals found!';
					mealWrapper.classList.add('not-found');
				}
				mealWrapper.innerHTML = html;
				loaderSpinner(false);
			});
		inputAlert.classList.add('d-none');
	}
};
// event listener
searchForm.addEventListener('submit', getMeals);

// loader spinner
const loaderSpinner = (show) => {
	if (show) {
		document.getElementById('loader-spin').style.display = 'inline-block';
	} else {
		document.getElementById('loader-spin').style.display = 'none';
	}
};

// get meal details by clicking on the
const getMealDetails = (id) => {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((res) => res.json())
		.then((data) => hungryMonsterModalDisplay(data.meals[0]));
};

// displaying modal after click on meal-card
const hungryMonsterModalDisplay = (meal) => {
	console.log(meal);
	hungryMonsterModal.style.display = 'block';
	let html = `
                <div class="hungry-monster-modal-header">
                    <i onclick="modalClose()" class="fas fa-times modal-close-icon"></i>
                </div>
                <img
                    class="hungry-monster-modal-img"
                    src="${meal.strMealThumb}"
                />
                <h2 class="modal-first-title">${meal.strMeal}</h2>
                <h3 class="modal-second-title">Instructions</h3>
                <div class="modal-body">
                    <p>${meal.strInstructions}</p>
                </div>
    `;
	hungryMonsterModal.innerHTML = html;
};

// modal close method
const modalClose = () => {
	hungryMonsterModal.style.display = 'none';
};
