document.addEventListener('DOMContentLoaded', () => {
    // 1. Game Filters
    const genreButtons = document.querySelectorAll('#genre-filters .filter-btn');
    const appCards = document.querySelectorAll('.app-card');

    let currentGenre = 'all';

    function updateFilters() {
        appCards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre') || '';

            // Handle placeholder card which has empty attributes
            if (cardGenre === '') {
                if (currentGenre !== 'all') {
                    card.classList.add('hidden');
                    return;
                }
            }

            const genreMatch = currentGenre === 'all' || cardGenre === currentGenre;

            if (genreMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            genreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentGenre = button.getAttribute('data-genre');
            updateFilters();
        });
    });

    // 2. Tutorial Filters
    // Genre and level are fully independent — each resets its own state only.
    const tutorialGenreButtons = document.querySelectorAll('#tutorial-genre-filters .filter-btn');
    const tutorialLevelButtons = document.querySelectorAll('#tutorial-level-filters .filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    let currentTutorialGenre = 'all';
    let currentTutorialLevel = 'all';

    function updateTutorialFilters() {
        videoCards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre') || '';
            // data-level is comma-separated: e.g. "easy,hard" or "middle"
            const cardLevels = (card.getAttribute('data-level') || '').split(',');

            const genreMatch = currentTutorialGenre === 'all' || cardGenre === currentTutorialGenre;
            const levelMatch = currentTutorialLevel === 'all' || cardLevels.includes(currentTutorialLevel);

            if (genreMatch && levelMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    tutorialGenreButtons.forEach(button => {
        button.addEventListener('click', () => {
            tutorialGenreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTutorialGenre = button.getAttribute('data-genre');
            updateTutorialFilters();
        });
    });

    tutorialLevelButtons.forEach(button => {
        button.addEventListener('click', () => {
            tutorialLevelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTutorialLevel = button.getAttribute('data-level');
            updateTutorialFilters();
        });
    });
});
