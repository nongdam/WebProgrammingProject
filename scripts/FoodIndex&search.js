
    document.addEventListener("DOMContentLoaded", function() {
        // URL에서 쿼리 파라미터 값을 가져오는 함수
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // URL에서 'search' 파라미터를 가져옴
        const searchQuery = getQueryParam('search');

        // 추천 음식 목록 로드
        fetch('/data/foodsList.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(data => {
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
                            <input type="hidden" name="image" value="${imageUrl}">
                            <input type="hidden" name="ingredients" value="${recipe.ingredients.join(',')}">
                            <input type="hidden" name="method" value="${recipe.method.join('. ')}">
                            <input type="hidden" name="calories" value="${recipe.calories}">
                            <input type="hidden" name="nutrients" value="${recipe.nutrients.join(',')}">
                            <h1>${recipe.name}</h1>
                            <h3>${recipe.category}</h3>
                        </button>
                    </form>
                `;
                container.appendChild(recipeElement);
            });

            // 추천 음식 목록이 로드된 후 검색 기능 실행
            if (searchQuery) {
                filterItems(searchQuery.toLowerCase());
            }
        })
        .catch(error => {
            console.error('Error loading the recipes:', error);
        });

        // 검색어에 따라 아이템을 필터링하는 함수
        function filterItems(query) {
            const foodItems = document.querySelectorAll('.foodList li');
            foodItems.forEach(function(item) {
                const name = item.querySelector('h1').textContent.toLowerCase();
                const category = item.querySelector('h3').textContent.toLowerCase();
                if (name.includes(query) || category.includes(query)) {
                    item.style.display = ''; // 검색어가 이름이나 카테고리에 포함되면 'li' 요소를 보이게 함
                } else {
                    item.style.display = 'none'; // 그렇지 않으면 'li' 요소를 숨김
                }
            });
        }
    });
