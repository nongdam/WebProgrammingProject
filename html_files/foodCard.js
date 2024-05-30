document.addEventListener('DOMContentLoaded', function() {
    fetch('foods.json')
    .then(response => response.json())
    .then(data => displayRecipes(data))
    .catch(error => console.error('Error loading the JSON file:', error));
});

function displayRecipes(recipes) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = ''; // Clear previous contents

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'foodCard';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" class="recommend">
            <h1>${recipe.name}</h1>
            <h3>${recipe.category}</h3>
        `;
        container.appendChild(card);
    });
}