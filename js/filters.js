document.addEventListener('DOMContentLoaded', () => {
    const platformButtons = document.querySelectorAll('#platform-filters .filter-btn');
    const genreButtons = document.querySelectorAll('#genre-filters .filter-btn');
    const appCards = document.querySelectorAll('.app-card');

    let currentPlatform = 'all';
    let currentGenre = 'all';

    function updateFilters() {
        appCards.forEach(card => {
            const cardPlatform = card.getAttribute('data-platform') || '';
            const cardGenre = card.getAttribute('data-genre') || '';

            // Handle placeholder card which has empty attributes
            if (cardPlatform === '' && cardGenre === '') {
                if (currentPlatform !== 'all' || currentGenre !== 'all') {
                    card.classList.add('hidden');
                    return;
                }
            }

            const platformMatch = currentPlatform === 'all' || cardPlatform === currentPlatform;
            const genreMatch = currentGenre === 'all' || cardGenre === currentGenre;

            if (platformMatch && genreMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            platformButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentPlatform = button.getAttribute('data-platform');
            updateFilters();
        });
    });

    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            genreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentGenre = button.getAttribute('data-genre');
            updateFilters();
        });
    });
});
