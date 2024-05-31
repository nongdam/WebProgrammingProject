document.addEventListener("DOMContentLoaded", function() {
    // URL에서 쿼리 파라미터 값을 가져오는 함수
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // URL에서 'search' 파라미터를 가져옴
    const searchQuery = getQueryParam('search');

    // 페이지 로드 시 검색어가 URL에 있을 경우 필터링 실행
    document.addEventListener('recipesLoaded', function() {
        if (searchQuery) {
            filterItems(searchQuery.toLowerCase());
        }
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