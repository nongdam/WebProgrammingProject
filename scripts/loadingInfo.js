document.addEventListener("DOMContentLoaded", function() {
    console.log("Fetching data from:", '/data/foodsList.json');
    fetch('/data/foodsList.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return response.json();
        }
    })
    .then(data => {
        // 별점 순서대로 정렬
        data.recipes.sort((a, b) => b["average-rating"] - a["average-rating"]);

        const container = document.querySelector('.foodList');
        data.recipes.forEach(recipe => {
            const defaultImage = '../Assets/placeholder-image.png'; // 기본 이미지 설정
            const imageUrl = recipe.image || defaultImage; // 이미지 경로가 없는 경우 기본 이미지 사용

            const recipeElement = document.createElement('li');
            recipeElement.innerHTML = `
                <form action="./foodInformation_base.html" method="get">
                    <button type="submit" class="foodCard">
                        <img src="${imageUrl}" alt="${recipe.name}" class="recommend">
                        <input type="hidden" name="foodName" value="${recipe.name}">
                        <input type="hidden" name="foodTag" value="${recipe.category}">
                        <input type="hidden" name="image" value="${imageUrl}"> <!-- 이미지 경로 추가 -->
                        <input type="hidden" name="ingredients" value="${recipe.ingredients.join(',')}">
                        <input type="hidden" name="method" value="${recipe.method.join('. .')}">
                        <input type="hidden" name="calories" value="${recipe.calories}">
                        <input type="hidden" name="nutrients" value="${recipe.nutrients.join(',')}">
                        <input type="hidden" name="averageRating" value="${recipe['average-rating']}">
                        <input type="hidden" name="ratingCount" value="${recipe['rating-count']}">
                        <input type="hidden" name="time" value="${recipe['time']}">
                        <h1>${recipe.name}</h1>
                        <h3>${recipe.category}</h3>
                    </button>
                </form>
            `;
            container.appendChild(recipeElement);
        });

        // 데이터 로드가 완료되면 커스텀 이벤트를 트리거
        const event = new CustomEvent('recipesLoaded');
        document.dispatchEvent(event);
    })
    .catch(error => {
        console.error('Error loading the recipes:', error);
    });
});