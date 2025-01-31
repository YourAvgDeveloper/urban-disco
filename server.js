// 🦾 CyberServer 9000 - Vercel Edition
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const os = require('os');

const app = express();

const loreDatabase = {
  corporations: [
    {
      id: "arcology",
      name: "Arcology Systems",
      description: "Masters of urban AI infrastructure",
      threatLevel: "High",
      ice: "Black ICE Detected ❄️",
      breachDifficulty: 98
    },
    {
      id: "weyland",
      name: "Weyland Industries",
      description: "Biotech and genetic engineering giants",
      threatLevel: "Extreme",
      ice: "AI Sentry Online 🤖",
      breachDifficulty: 85
    },
    {
      id: "tyrell",
      name: "Tyrell Nexus",
      description: "Neural network overlords",
      threatLevel: "Critical",
      ice: "VOID-LOCK ACTIVE 🚨",
      breachDifficulty: 110
    },
    // New corporations
    {
      id: "nightcorp",
      name: "NightCorp Solutions",
      description: "Black market data brokers",
      threatLevel: "Medium",
      ice: "Spider ICE Crawling 🕷️",
      breachDifficulty: 75
    },
    {
      id: "neuraLink",
      name: "NeuraLink Co.",
      description: "Brain-machine interface specialists",
      threatLevel: "High",
      ice: "NeuroFirewall Active 🧠",
      breachDifficulty: 90
    },
    {
      id: "vortex",
      name: "Vortex Unlimited",
      description: "Quantum computing monopolists",
      threatLevel: "Extreme",
      ice: "Quantum Encryption 🔒",
      breachDifficulty: 105
    }
  ],
  factions: [
    {
      id: "netrunners",
      name: "Netrunners Collective",
      description: "Decentralized hacker alliance",
      threatLevel: "Moderate"
    },
    {
      id: "corpo-elite",
      name: "Corporate Elite",
      description: "Megacorp ruling class",
      threatLevel: "High"
    },
    // New factions
    {
      id: "neon-syndicate",
      name: "The Neon Syndicate",
      description: "Underground tech smugglers",
      threatLevel: "High"
    },
    {
      id: "ghost-cartel",
      name: "The Ghost Cartel",
      description: "Cybernetic black market lords",
      threatLevel: "Extreme"
    },
    {
      id: "zero-zone",
      name: "The Zero Zone Collective",
      description: "Anti-AI resistance group",
      threatLevel: "Medium"
    }
  ],
  messages: [
    "The city never sleeps... neither do we",
    "Neural firewall breach detected",
    "ICE cracking in progress",
    "Warning: System intrusion detected"
  ]
};

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
app.get('/ascii', (req, res) => {
  const userAgent = req.get('User-Agent') || '';
  
  // Detect curl/Wget/CLI tools
  if (userAgent.includes('curl') || userAgent.includes('Wget')) {
    const asciiArt = `
 ____ _  _ ____  _____ _____   __ _____ _____ __ __ _____ _____ -9000
((    \\// ||=)  ||==  ||_//  ((  ||==  ||_// \\ // ||==  ||_//      
 \\__  //  ||_)) ||___ || \\ \_)) ||___ || \\  \V/  ||___ || \\      
                                                                                                                                                                                     
    ${VERSION} | ${MOTD[Math.floor(Math.random() * MOTD.length)]}
    `;
    res.type('text/plain').send(asciiArt);
  } else {
    // Serve HTML to browsers
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
  const corps = loreDatabase.corporations.reduce((acc, corp) => {
    acc[corp.id] = {
      diff: corp.breachDifficulty,
      ice: corp.ice,
      name: corp.name
    };
    return acc;
  }, {});

  const target = corps[req.params.corporation];
  if (!target) return res.status(404).json({ 
    error: "CORP NOT FOUND IN DATAFORT 🔍",
    suggestion: "Try /api/lore/corporations for targets"
  });

  let progress = 0;
  const breachAttempt = setInterval(() => {
    progress += Math.random() * 15;
    process.stdout.write(`\r🔥 BREACH PROGRESS: ${Math.min(100, progress.toFixed(2))}% `);
    
    if (progress >= target.diff) {
      clearInterval(breachAttempt);
      process.stdout.write('\n');
      res.json({
        status: "DATASTREAM COMPROMISED 💾",
        corporation: target.name,
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

// ======================
// 🧬 LORE ENDPOINTS
// ======================
app.get('/api/lore/corporations', (req, res) => {
  res.json(loreDatabase.corporations.map(corp => ({
    id: corp.id,
    name: corp.name,
    threatLevel: corp.threatLevel,
    breachDifficulty: corp.breachDifficulty
  })));
});

app.get('/api/lore/corporations/:id', (req, res) => {
  const corporation = loreDatabase.corporations.find(c => c.id === req.params.id);
  if (!corporation) return res.status(404).json({ error: "CORP NOT FOUND" });
  res.json(corporation);
});

app.get('/api/lore/factions', (req, res) => {
  res.json(loreDatabase.factions);
});

app.get('/api/lore/factions/:id', (req, res) => {
  const faction = loreDatabase.factions.find(f => f.id === req.params.id);
  if (!faction) return res.status(404).json({ error: "FACTION NOT FOUND" });
  res.json(faction);
});

app.get('/api/lore/random-message', (req, res) => {
  const msg = loreDatabase.messages[Math.floor(Math.random() * loreDatabase.messages.length)];
  res.json({ message: msg, glitch: Math.random().toString(36).substring(7) });
});

// ======================
// 🌌 SERVICE ENDPOINTS
// ======================
app.get('/api/service', (req, res) => {
  res.json({
    services: [
      {
        name: "matrix",
        description: "Neural Matrix simulation stream",
        endpoint: "/api/service/matrix",
        warning: "Don't stare too long"
      },
      {
        name: "bitcoin-miner",
        description: "Fake cryptocurrency mining simulation",
        endpoint: "/api/service/bitcoin-miner"
      },
      {
        name: "neuro-sync",
        description: "Neural network training simulation",
        endpoint: "/api/service/neuro-sync"
      }
    ]
  });
});

// 🔮 Matrix Animation Stream
app.get('/api/service/matrix', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('X-Stream-Warning', 'Simulation only - no real access');
  
  const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const columns = process.stdout.columns || 80;
  let running = true;

  // Safety timeout
  const timeout = setTimeout(() => {
    running = false;
    res.end();
  }, 30000); // 30-second limit

  const generateFrame = () => {
    if (!running) return;
    
    let output = '';
    for (let i = 0; i < columns; i++) {
      output += Math.random() > 0.02 ? 
        `\x1b[32m${chars[Math.floor(Math.random() * chars.length)]}\x1b[0m` : 
        ' ';
    }
    
    res.write(`\x1b[2J\x1b[H${output}`); // ANSI escape codes
    setTimeout(generateFrame, 50);
  };

  req.on('close', () => {
    running = false;
    clearTimeout(timeout);
  });

  generateFrame();
});

// ⚡ Fake Bitcoin Miner
app.get('/api/service/bitcoin-miner', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  let hashes = 0;

  const interval = setInterval(() => {
    hashes += Math.floor(Math.random() * 1000);
    res.write(`Mining... ${hashes} hashes computed\n`);
    
    if (hashes >= 10000) {
      clearInterval(interval);
      res.end("Block mined! (simulation ended)");
    }
  }, 100);

  req.on('close', () => clearInterval(interval));
});

// 🧠 Neural Sync Simulation
app.get('/api/service/neuro-sync', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const phases = [
    "Initializing cortex link",
    "Uploading neural patterns",
    "Synchronizing hemispheres",
    "Calibrating dopamine levels",
    "Optimizing neuro pathways"
  ];

  let phaseIndex = 0;
  const interval = setInterval(() => {
    if (phaseIndex >= phases.length) {
      clearInterval(interval);
      res.end("SYNC COMPLETE");
      return;
    }

    const progress = Math.min(100, phaseIndex * 25 + Math.random() * 25);
    res.write(
      `[${phases[phaseIndex]}] ${progress.toFixed(2)}%` +
      ` [${'█'.repeat(Math.floor(progress/5))}]\n`
    );
    
    phaseIndex++;
  }, 2000);

  req.on('close', () => clearInterval(interval));
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
    
  `);
});

app.use((err, req, res, _) => { /* ... */ });
app.use((req, res) => { /* ... */ });

module.exports = app;
