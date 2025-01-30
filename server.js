// 🦾 CyberServer 9000 - Vercel Edition
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const os = require('os');

const app = express();

// 🛡️ Serve static files from the "public" folder (for CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// 🧬 DNA of the machine (Config)
const CYBER_PORT = process.env.PORT || 8080;
const VERSION = "v2.3.1-beta";
const MOTD = [
  "// SYSTEM STATUS: BURNING",
  "// WARNING: 437 CRITICAL ERRORS DETECTED",
  "// ICE: SHATTERED",
  "// SOUL: PRESENT",
  "// SYSTEM FAILURE: ENGAGING EMERGENCY PROTOCOL",
  "// MESSAGE FROM VOID: BEWARE"
];

// 🛡️ Black ICE protection middleware
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  res.header('X-Powered-By', 'CyberServer 9000 (Fission Reactor Core)');
  next();
});

// 🔥 Rate limiter that looks like a failing system
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "SYSTEM OVERLOAD",
    message: "// Cooling system engaged... Try again in 15 minutes",
    glyph: "💥🔥❄️"
  }
});
app.use(limiter);

// 🎮 Root Route: Serve HTML or ASCII based on client type
app.get('/', (req, res) => {
  // Check if the client accepts HTML (browser)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    // Serve ASCII art to non-browser clients (curl, scripts, etc.)
      const asciiArt = `

 ____ _  _ ____  _____ _____   __ _____ _____ __ __ _____ _____ -9000
((    \\// ||=)  ||==  ||_//  ((  ||==  ||_// \\ // ||==  ||_//      
 \\__  //  ||_)) ||___ || \\ \_)) ||___ || \\  \V/  ||___ || \\      
                                                                                                                                                                                     
    ${VERSION} | ${MOTD[Math.floor(Math.random() * MOTD.length)]}
  `;
    res.type('text/plain').send(asciiArt);
  }
});

// 🧠 AI Core Interface
app.post('/api/upload-conscience', (req, res) => {
  if (!req.body.neuralPattern) {
    return res.status(400).json({
      error: "NEURAL LACUNA DETECTED",
      suggestion: "Apply more adrenaline directly to cortex 💉"
    });
  }
  
  setTimeout(() => {
    res.json({
      status: "SOULFRAG CAPTURED 🔮",
      lifespan: Math.floor(Math.random() * 1000) + " cycles",
      warning: "Do not stare directly into the void 👁️"
    });
  }, 2000);
});

// 🕶️ Hacking simulator
app.get('/api/breach/:corporation', (req, res) => {
  const corps = {
    'arcology': { diff: 98, ice: 'Black ICE Detected ❄️' },
    'weyland': { diff: 85, ice: 'AI Sentry Online 🤖' },
    'tyrell': { diff: 110, ice: 'VOID-LOCK ACTIVE 🚨' }
  };

  const target = corps[req.params.corporation];
  if (!target) return res.status(404).json({ error: "CORP NOT FOUND IN DATAFORT 🔍" });

  let progress = 0;
  const breachAttempt = setInterval(() => {
    progress += Math.random() * 15;
    process.stdout.write(`\r🔥 BREACH PROGRESS: ${Math.min(100, progress.toFixed(2))}% `);
    
    if (progress >= target.diff) {
      clearInterval(breachAttempt);
      process.stdout.write('\n');
      res.json({
        status: "DATASTREAM COMPROMISED 💾",
        iceStatus: target.ice,
        reward: Math.random() * 10000 + ' credits 💰'
      });
    } else if (progress >= 100) {
      clearInterval(breachAttempt);
      process.stdout.write('\n');
      res.status(503).json({
        error: "BREACH FAILED 💥",
        consequence: "Trace initiated - Burn your deck! 🔥"
      });
    }
  }, 300);
});

// 🌌 Quantum server stats
app.get('/api/server-stats', (req, res) => {
  const stats = {
    uptime: process.uptime(),
    load: os.loadavg(),
    memory: {
      total: os.totalmem(),
      free: os.freemem()
    },
    dangerLevel: Math.random() * 100,
    warning: "Do not trust these numbers 🔢"
  };
  
  res.json(stats);
});

// 💀 Error handling (because the system is always crumbling)
app.use((err, req, res, _) => {
  console.error(`💥 Critical failure in ${req.method} ${req.path}:`, err);
  res.status(500).json({
    error: "SYSTEM COLLAPSE 🌌",
    coordinates: `${Math.random() * 1000}, ${Math.random() * 1000}`,
    advice: "Try rerouting through the auxiliary matrix 🌀"
  });
});

// 🚨 404 handler
app.use((req, res) => {
  res.status(404).send(`
    ⚠️  ROUTE NOT FOUND ⚠️
    
    The digital winds howl through empty corridors...
    Perhaps you should check your map? 🗺️
    
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░▄▄▄▄▄▄▄░░░░░░░░▄░░░░░░░░░░░
    ░░░░█▀▀▀▀▀▀▀█▄▄▄░░░░█░░░░░░░░░░░
    ░░░░█░░░░░░░█░░█▄▄▄█▀▀▀█▄░░░░░░░
    ░░░░▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█▄░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░▀█░░░░
  `);
});

app.use((err, req, res, _) => { /* ... */ });
app.use((req, res) => { /* ... */ });

module.exports = app;
