document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('app-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const contentViews = document.querySelectorAll('.content-view');
    const mainContent = document.querySelector('.main-content');

    // ==========================================
    // 1. Sidebar Collapsing Logic
    // ==========================================
    
    // Retrieve saved sidebar collapsed state
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (isCollapsed && sidebar) {
        sidebar.classList.add('collapsed');
    }

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // ==========================================
    // 2. Tab Navigation & Hash Routing Logic
    // ==========================================
    
    function switchView(viewId) {
        let matched = false;

        contentViews.forEach(view => {
            if (view.id === viewId) {
                view.classList.remove('hidden');
                matched = true;
            } else {
                view.classList.add('hidden');
            }
        });

        if (!matched) return; // Exit if view ID doesn't exist

        // Update Nav Menu Active States
        navItems.forEach(item => {
            const targetView = item.getAttribute('data-view');
            if (targetView === viewId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Scroll main content to top
        if (mainContent) {
            mainContent.scrollTop = 0;
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Nav Item Click Listeners
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = item.getAttribute('data-view');
            
            // Update URL Hash corresponding to view
            const hash = targetView === 'games-view' ? '#games' : '#tutorials';
            history.pushState(null, null, hash);
            
            switchView(targetView);
        });
    });

    // Handle Hash Changes (Back button or direct link navigation)
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash === '#tutorials') {
            switchView('tutorials-view');
        } else {
            switchView('games-view'); // Default view
        }
    }

    // Initial load view check
    handleHashChange();

    // Listen to hash events
    window.addEventListener('hashchange', handleHashChange);
});
