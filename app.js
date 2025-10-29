const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');
const ai = new GoogleGenAI({});

// APP SETTINGS SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', true);

// MIDDLEWARE USE - SHORT SETUP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicFolder, {
	maxAge: '7d', // changed '1y' rather than using cache busting
	etag: false
}));
app.use(express.static(publicFolder));

// MIDDLEWARE SETUP - LONG VERSION
app.use(
	helmet.contentSecurityPolicy({
		directives: {
                	defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                    imgSrc: ["'self'", "data:"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com"],
                    connectSrc: ["'self'"]
		}
}));

const sanitizeInput = (input) => {
	return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const limiter = rateLimit({ windowMs: 60 * 1000, max: 50 });
app.use('/story', limiter);

const corsOptions = {
        origin: [
                'http://localhost:8000',
                'https://biruksendeku.com',
                'https://biruksendeku.onfirebase.com',
                'https://biruksendeku.onrender.com'
        ],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // allow cookies/auth headers
        optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// CRUD OPERATION
app.post('/story', [
    check('prompt')
    .trim()
    .escape()
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('story', {
            errors: errors.array(),
            story: null,
            error: null,
            prompt: req.body.prompt
        });
    }

    try {
        let { prompt } = req.body;
        
        if (!prompt || typeof prompt !== "string") {
            return res.render('story', {
                story: null,
                error: 'Invalid story idea.',
                prompt: prompt
            });
        }

        prompt = sanitizeInput(prompt.trim());

        const blockedKeywords = ["violence", "rape", "sex", "ass", "pussy", "dick", "penis", "vagina", "booty", "cock", "drug", "drugs", "hate", "kill", "kills", "adult"];
        if (blockedKeywords.some(word => prompt.toLowerCase().includes(word))) {
            return res.render('story', {
                story: null,
                error: 'Inappropriate theme for children. Please keep it family-friendly.',
                prompt: prompt
            });
        }

        // Generate story
        let storyPrompt = `Create a sweet, engaging bedtime story for children about: ${prompt}. Make it magical, age-appropriate, not scary and under 300 words.`;

        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: storyPrompt,
        });

        if (!result || !result.candidates || !result.candidates[0]) {
            throw new Error('Invalid response from AI service - no candidates');
        }

        const candidate = result.candidates[0];
        if (!candidate.content || !candidate.content.parts || !candidate.content.parts[0]) {
            throw new Error('Invalid response from AI service - no content parts');
        }

        const storyText = candidate.content.parts[0].text.trim();

        // Success - render with story data
        res.render('story', {
            story: {
                text: storyText,
                timestamp: Date.now()
            },
            error: null,
            prompt: prompt
        });

    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.render('story', {
            story: null,
            error: 'Failed to generate story. Please try again in a moment.',
            prompt: req.body.prompt
        });
    }
});

app.get('/', (req, res) => {
	try {
		res.render('home');
	} catch(err) {
		next(err);
	}
});

app.get('/donate', (req, res) => {
	try {
		res.render('donate');
	} catch(err) {
		next(err);
	}
});

app.get('/faq', (req, res) => {
	try {
		res.render('faq');
	} catch(err) {
		next(err);
	}
});

app.get('/tips', (req, res) => {
	try {
		res.render('tips');
	} catch(err) {
		next(err);
	}
});

app.get('/updates', (req, res) => {
	try {
		res.render('updates');
	} catch(err) {
		next(err);
	}
});

app.use((req, res, next) => {
	try {
		res.status(404).render('404');
	} catch(err) {
		next(err);
	}
});

app.use((err, req, res, next) => {
	res.status(500).send('Internal Server Error!');
	console.log('Error Message: ', err.message);
	console.log('Error Stack: ', err.stack);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});
