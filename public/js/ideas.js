// Menu functionality
const menuBtn = document.getElementById("menu__btn");
const closeBtn = document.getElementById("close__btn");
const menuLinksSection = document.getElementById("menu__links__section");
let menuTimeout;

if (menuBtn && closeBtn && menuLinksSection) {
    menuBtn.addEventListener("click", () => {
        clearTimeout(menuTimeout);
        menuLinksSection.style.display = "inline";
    });

    closeBtn.addEventListener("click", () => {
        menuLinksSection.style.display = "none";
    });

    menuLinksSection.addEventListener("mouseleave", () => {
        menuTimeout = setTimeout(() => {
            menuLinksSection.style.display = "none";
        }, 300);
    });

    menuLinksSection.addEventListener("mouseenter", () => {
        clearTimeout(menuTimeout);
    });

    document.addEventListener('click', (e) => {
        if (!menuLinksSection.contains(e.target) && !menuBtn.contains(e.target)) {
            menuLinksSection.style.display = "none";
        }
    });
}

// COPY FUNCTIONALITY
function copyToClipboard(card) {
    const storyText = card.querySelector('h3').textContent + ' - ' + card.querySelector('p').textContent;
    const btn = card.querySelector('.copy-btn');

    // Add immediate visual feedback
    const originalText = btn.textContent;
    const originalBgColor = btn.style.backgroundColor;
    const originalColor = btn.style.color;

    btn.textContent = 'Copying...';
    btn.style.backgroundColor = '#ffa500';
    btn.style.color = 'white';

    // Use the modern Clipboard API
    navigator.clipboard.writeText(storyText).then(() => {
        // Success state
        btn.textContent = 'Copied! ✅';
        btn.style.backgroundColor = '#28a745';
        btn.style.color = 'white';

        // Add celebration effect to the card
        card.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.5)';
        card.style.transform = 'translateY(-2px)';

        setTimeout(() => {
            // Reset button
            btn.textContent = originalText;
            btn.style.backgroundColor = originalBgColor;
            btn.style.color = originalColor;

            // Reset card effects
            card.style.boxShadow = '';
            card.style.transform = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Error state
        btn.textContent = 'Failed ❌';
        btn.style.backgroundColor = '#dc3545';
        btn.style.color = 'white';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = originalBgColor;
            btn.style.color = originalColor;
        }, 2000);
    });
}

// Add click animation to cards
document.addEventListener('DOMContentLoaded', function() {
    const ideaCards = document.querySelectorAll('.idea-card');
    
    ideaCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// THEME MANIPULATION LOGIC
const themeBtn = document.getElementById("theme__choice");
const lightMode = document.getElementById("light__theme");
const darkMode = document.getElementById("dark__theme");

if (themeBtn && lightMode && darkMode) {
    // Check current theme from localStorage
    const savedTheme = localStorage.getItem("sweetdreamsaiDarkmode");
    const isDarkMode = savedTheme === "active";

    // Apply initial theme
    function applyTheme() {
        if (isDarkMode) {
            document.body.classList.add("darkmode");
            lightMode.style.display = "block";
            darkMode.style.display = "none";
        } else {
            document.body.classList.remove("darkmode");
            lightMode.style.display = "none";
            darkMode.style.display = "block";
        }
    }

    // Apply theme on page load
    applyTheme();

    // Event listener on the parent button
    themeBtn.addEventListener("click", () => {
        const isCurrentlyDark = document.body.classList.contains("darkmode");

        if (isCurrentlyDark) {
            // Switch to light mode
            document.body.classList.remove("darkmode");
            localStorage.setItem("sweetdreamsaiDarkmode", "inactive");
            lightMode.style.display = "none";
            darkMode.style.display = "block";
        } else {
            // Switch to dark mode
            document.body.classList.add("darkmode");
            localStorage.setItem("sweetdreamsaiDarkmode", "active");
            lightMode.style.display = "block";
            darkMode.style.display = "none";
        }
    });
}

// Make sure copy function is available globally
window.copyToClipboard = copyToClipboard;
