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
});
