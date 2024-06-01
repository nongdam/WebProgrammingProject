document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("randomRecipe").addEventListener("click", function(event) {
        event.preventDefault();
        fetch('../data/foodsList.json')
            .then(response => response.json())
            .then(data => {
                const recipes = data.recipes;
                const randomIndex = Math.floor(Math.random() * recipes.length);
                const randomRecipe = recipes[randomIndex];

                // 요리 정보 페이지로 리디렉션
                const form = document.createElement("form");
                form.action = "./foodInformation_base.html";
                form.method = "get";

                form.innerHTML = `
                    <input type="hidden" name="foodName" value="${randomRecipe.name}">
                    <input type="hidden" name="foodTag" value="${randomRecipe.category}">
                    <input type="hidden" name="image" value="${randomRecipe.image}">
                    <input type="hidden" name="ingredients" value="${randomRecipe.ingredients.join(',')}">
                    <input type="hidden" name="method" value="${randomRecipe.method.join('. .')}">
                    <input type="hidden" name="calories" value="${randomRecipe.calories}">
                    <input type="hidden" name="nutrients" value="${randomRecipe.nutrients.join(',')}">
                    <input type="hidden" name="averageRating" value="${randomRecipe['average-rating']}">
                    <input type="hidden" name="ratingCount" value="${randomRecipe['rating-count']}">
                    <input type="hidden" name="time" value="${randomRecipe['time']}">
                `;

                document.body.appendChild(form);
                form.submit();
            })
            .catch(error => console.error('Error fetching recipes:', error));
    });
});
