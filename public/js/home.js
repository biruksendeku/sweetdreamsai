const promptIdeas = [
	"A forgotten toy's journey back to its child through a storm",
	"The key that unlocks any dream, but also any nightmare",
	"A grumpy toad who accidentally becomes a forest's hero",
	"The day all the colors in the world decided to trade places",
	"A little witch whose spells always have sweet, unintended effects",           "The girl who could hear the songs that sunflowers sing at dawn",
	"A snail who delivers mail for all the garden's tiny creatures",
	"The bear who started hibernating in the summer by mistake",
	"An old lighthouse whose light guides lost stories home",
	"The first leaf to fall in autumn, and where the wind took it",
	"A child who finds a map of their own imagination",
	"The ant who questioned the path and discovered a new world",
	"A library where books whisper their stories to each other at night",
	"The little fish who dreamed of walking on land for a day",
	"A snowflake determined to be unique on its way down",
	"The night the ocean waves froze mid-crash, holding their shape",
	"A seed that grows into a tree bearing miniature, glowing suns",
	"The postman who delivers letters to the moon and back",
	"A clock that ticks backwards, revealing yesterday's secrets",
	"The crow who collected lost whispers instead of shiny objects",
	"A tiny robot learns friendship in an enchanted forest",
	"A lost star finds its way home with a sleepy owl",
	"A little bear finds a cave of glowing, singing crystals",
	"A brave mouse's quest for the last moonberry before winter",
	"The day the moon swapped places with the sun for an adventure",
	"A magical blanket takes a child on a journey through clouds",
	"A friendly ghost afraid of the dark, and the child who helped",
	"An old turtle tells stories of the ocean's secret language",
	"A little fox learns to fly by believing in the wind's song",
	"A pocket-sized dragon who breathes dream bubbles, not fire",
	"A lonely cloud learns to make shapes that bring joy",
	"A caterpillar afraid of change meets an encouraging butterfly",
	"A garden where flowers whisper secrets to careful listeners",
	"The night the stars rearranged into new constellations",
	"A child discovers their shadow has its own personality",
	"A rabbit who hops between dreams to help with nightmares",
	"A tiny boat sails moonbeams to collect stardust for dreams",
	"A squirrel who collected memories of sunny days, not nuts",
	"A rainbow that lost its colors, and the children who helped",
	"A penguin who discovered a different kind of soaring",
	"A grumpy mushroom learns to smile from a cheerful bumblebee",
	"A retired teddy bear leads a secret nighttime adventure",
	"The day all the raindrops tasted like different fruit juices",
	"A little baker who makes cookies that grant tiny, happy wishes",
	"A postman for the wind, delivering seeds and dandelion poems",
	"A shy firefly whose light is brighter when it sings",
	"Two stars, best friends, who play celestial hide-and-seek",
	"A child who finds a key that unlocks the sound of colors",
	"The old rocking horse that remembers all its children's dreams",
	"A garden scarecrow who is secretly the guardian of dreams",
	"A cup of hot cocoa that shares stories of cozy winters",
	"The little whale whose song mends cracked seashells",
	"A worn-out quilt patched together from forgotten memories",
	"A snail that leaves a trail of shimmering, starlight slime",
	"The first snowflake of winter, on a quest to find a friend",
	"A kitten who discovers it can purr small, fuzzy rainbows",
	"The forgotten path that only appears when you're humming",
	"A library book that's never the same story twice",
	"A compass that doesn't point north, but towards kindness",
	"The bear who traded its growl for a lullaby",
	"A dewdrop who dreams of becoming part of the great ocean",
	"The little clock that got anxious and made time slow down",
	"A chameleon who couldn't change color, but could change shape",
	"The day all the shadows decided to go on a silent adventure",
	"A baker whose bread, when eaten, reveals a happy memory",
	"A silent wind chime that only sings for those who are sad",
	"The old tree that grew a different fruit on every branch",
	"A little wolf who was scared of its own howl",
	"The suitcase that held an entire, tiny, weather-proof kingdom",
	"A child who could trade a worry for a dream with the moon",
	"The river that flowed backwards every full moon",
	"A broken crayon that could color things into existence",
	"The night all the cats in the city decided to throw a party",
	"A paper boat's epic journey across a single large puddle",
	"A gardener who plants secrets and grows glowing truth-flowers",
	"A little lighthouse whose light is made of captured laughter",
	"The little planet that was lonely and wanted a friend",
	"A key that could unlock any smell in the world",
	"The bear who collected and carefully stored away lost sighs",
	"A teacup that held an entire, calm, miniature sea",
	"The forgotten word that held immense, gentle power",
	"A little moth that delivers patches of moonlight",
	"The diary that wrote back to its lonely owner",
	"A silent concert for the creatures of the meadow at dawn",
	"The soap bubble that refused to pop, seeking adventure",
	"A recipe for a cake that bakes a little bit of courage",
	"The old bridge that remembered every footstep ever taken",
	"A compass that points to whatever you miss the most",
	"The tiny knight who protected a garden from gloom",
	"A seashell that held the entire ocean's lullaby",
	"The tree whose leaves were all tiny, painted portraits",
	"A door that appears only when you close your eyes to smile",
	"The weaver who spun thread from sunlight and spider-silk",
	"A lost sigh that turned into a gentle breeze",
	"The bookmark that let you step into the story",
	"A crown made of dandelions that granted kind wishes",
	"The baker whose gingerbread men came to life at midnight",
	"A path of fallen stars leading to a secret grove",
	"The coin that grew warmer the closer you were to a friend",
	"A well that reflected your happiest memory, not your face",
	"The final firefly of summer, holding onto its light"
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
