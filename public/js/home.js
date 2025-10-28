const promptIdeas = [
    "A tiny robot who learns about friendship in a enchanted forest",
    "A lost star who finds its way home with help from a sleepy owl",
    "The little bear who discovered a cave filled with glowing, singing crystals",
    "A brave mouse's quest for the last moonberry before winter",
    "The day the moon swapped places with the sun for a day of gentle adventure",
    "A magical blanket that takes a child on a dreamy journey through cloud kingdoms",
    "The friendly ghost who was afraid of the dark, and the child who helped him",
    "An old turtle who tells stories about the secret language of the ocean waves",
    "The little fox who learned to fly by believing in the wind's song",
    "A pocket-sized dragon who breathes bubbles of dreams instead of fire",
    "A lonely cloud who learns to make shapes that bring joy to children below",
    "The caterpillar who was afraid of change and the butterfly who encouraged her",
    "A garden where flowers whisper secrets to anyone who listens carefully",
    "The night the stars decided to rearrange themselves into new constellations",
    "A child who discovers their shadow has a personality of its own",
    "The rabbit who could hop between dreams and help children with nightmares",
    "A tiny boat that sails on moonbeams to collect stardust for dreams",
    "The squirrel who collected not nuts, but memories of sunny days",
    "A rainbow that lost its colors and the children who helped find them",
    "The penguin who wanted to fly and discovered a different kind of soaring"
];

// DOM Elements
const storyPrompt = document.getElementById('storyPrompt');
const useIdeaBtn = document.getElementById('useIdeaBtn');
const themeBtn = document.getElementById("theme__choice");
const lightMode = document.getElementById("light__theme");
const darkMode = document.getElementById("dark__theme");
const menuBtn = document.getElementById("menu__btn");
const closeBtn = document.getElementById("close__btn");
const menuLinksSection = document.getElementById("menu__links__section");

// Set random placeholder
function setRandomPlaceholder() {
    const randomIndex = Math.floor(Math.random() * promptIdeas.length);
    storyPrompt.placeholder = `Try: ${promptIdeas[randomIndex]}`;
}

// Use Idea button functionality
useIdeaBtn.addEventListener('click', () => {
    const currentPlaceholder = storyPrompt.placeholder;
    if (currentPlaceholder.startsWith('Try: ')) {
        storyPrompt.value = currentPlaceholder.replace('Try: ', '');
    }
});

// THEME MANIPULATION LOGIC
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

// Menu functionality
menuBtn.addEventListener("click", () => {
    menuLinksSection.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    menuLinksSection.style.display = "none";
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (!menuLinksSection.contains(event.target) && !menuBtn.contains(event.target)) {
        menuLinksSection.style.display = "none";
    }
});

// Initialize
setRandomPlaceholder();
