const APP_CONFIG = {
    climbing: "Ninja Cat Tower",
    gravityflip: "Gravity Flip Lab",
    mergemals: "MERGEMALS: Shoot & Merge"
};

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const contactEmail = "meeekestudio@gmail.com";

    // Update copyright year
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });

    // Update contact email
    document.querySelectorAll('.contact-email').forEach(el => {
        if (el.tagName === 'A' && el.href.startsWith('mailto:')) {
            el.href = 'mailto:' + contactEmail;
        }
        if (el.textContent.includes('@')) {
            el.textContent = contactEmail;
        }
    });

    // Update App Names from CONFIG
    document.querySelectorAll('[data-app-name]').forEach(el => {
        const appKey = el.getAttribute('data-app-name');
        if (APP_CONFIG[appKey]) {
            const appName = APP_CONFIG[appKey];
            
            if (el.tagName === 'IMG') {
                el.alt = el.alt.replace(/.*Icon|.*Screenshot/i, (match) => appName + match.substring(match.indexOf(' ')));
                // If alt is just the old name, replace it entirely
                if (!el.alt || el.alt === "Climbing" || el.alt === "Gravity Flip" || el.alt === "MERGEMALS") {
                    el.alt = appName;
                }
            } else if (el.tagName === 'A' && el.getAttribute('href') === '#') {
                // Keep existing text but could be used for dynamic links
            } else {
                el.textContent = appName;
            }
        }
    });

    // Special case for page titles if applicable
    const bodyAppKey = document.body.getAttribute('data-app-page');
    if (bodyAppKey && APP_CONFIG[bodyAppKey]) {
        const appName = APP_CONFIG[bodyAppKey];
        document.title = document.title.replace(/^.*(?= \|)/, appName);
        
        // Also update strong tags in descriptions if they exist
        document.querySelectorAll('strong').forEach(strong => {
            if (APP_CONFIG[bodyAppKey] && (strong.textContent === "Climbing" || strong.textContent === "Gravity Flip" || strong.textContent === "MERGEMALS" || strong.textContent === "Ninja Cat Tower")) {
                strong.textContent = appName;
            }
        });
    }
});
