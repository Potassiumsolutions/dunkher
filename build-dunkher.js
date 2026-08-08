// Build script: transforms hangher/index.html into dunkher/index.html
const fs = require("fs");
let html = fs.readFileSync("../hangher/index.html", "utf8");

function rep(tag, from, to) {
  const next = html.replace(from, to);
  if (next === html) { console.error("MISS: " + tag); process.exit(1); }
  console.log("OK: " + tag);
  html = next;
}

// ── 1. Page title ─────────────────────────────────────────────────────────────
rep("page title",
  "<title>HangHer</title>",
  "<title>DunkHer</title>"
);

// ── 1b. iOS/PWA head tags (viewport-fit + Apple Add-to-Home-Screen) ────────────
rep("ios head tags",
  `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
`<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#031a2e" />
<link rel="apple-touch-icon" href="apple-touch-icon.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="DunkHer" />`
);

// ── 2. Default :root colors → ocean blue ──────────────────────────────────────
rep("root colors",
`  :root {
    --bg: #2a1b30;
    --bg2: #3d2440;
    --panel: #4a2f55;
    --ink: #fbeef6;
    --muted: #c79fbf;
    --accent: #ff8fc8;
    --good: #5bd6a6;
    --bad: #ff7676;
    --beam: #c9a36b;
    --line: #fbeef6;
    --hair: #f4a93c;
    --skirt: #ff8fc8;
  }`,
`  :root {
    --bg: #031a2e; --bg2: #072540; --panel: #0e3a5c;
    --ink: #e8f4fc; --muted: #5b9dc0; --accent: #4fc3f7;
    --good: #69f0ae; --bad: #ef9a9a;
    --beam: #c9a36b; --line: #e8f4fc; --hair: #f4d03f; --skirt: #4fc3f7;
  }`
);

// ── 3. Add dunk tank + animation CSS (insert before "* { box-sizing...") ──────
const dunkCSS = `
  /* Dunk tank SVG parts */
  .tank-wall { stroke: var(--line); stroke-width: 3; fill: none; stroke-linejoin: round; }
  .water-fill { fill: #1565c0; }
  .water-shine { fill: #1976d2; opacity: 0.5; }
  .seat-plank { fill: var(--beam); stroke: none; rx: 2; }
  .target-ring  { stroke: #f44336; stroke-width: 2.5; fill: none; }
  .target-bull  { fill: #f44336; }
  .target-white { fill: white; }

  /* Dunk animation */
  @keyframes dunk-fall {
    0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
    25%  { transform: translateY(10px) rotate(8deg); opacity: 1; }
    70%  { transform: translateY(52px) rotate(4deg); opacity: 0.85; }
    100% { transform: translateY(72px);              opacity: 0; }
  }
  .person-group.dunked {
    transform-box: fill-box;
    transform-origin: center bottom;
    animation: dunk-fall 0.9s cubic-bezier(0.4,0,1,1) forwards;
  }
  @keyframes splash-anim {
    0%   { opacity: 0; transform: scale(0.2); }
    45%  { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.6); }
  }
  .splash-group { display: none; }
  .splash-group.show {
    display: block;
    transform-box: fill-box;
    transform-origin: center center;
    animation: splash-anim 0.9s 0.55s ease-out forwards;
  }
`;

rep("dunk CSS",
  "  * { box-sizing: border-box; }",
  dunkCSS + "  * { box-sizing: border-box; }"
);

// ── 4. H1 heading ─────────────────────────────────────────────────────────────
rep("h1 heading",
  '<h1>Hang<span class="swing" id="titleChar">Her</span></h1>',
  '<h1>Dunk<span class="swing" id="titleChar">Her</span></h1>'
);

// ── 5. Subtitle ───────────────────────────────────────────────────────────────
rep("subtitle",
  '<p class="sub" id="subtitle">Guess the secret word before the figure is complete. Nine wrong guesses and she\'s hanged.</p>',
  '<p class="sub" id="subtitle">Guess the word — each wrong letter puts her closer to the tank. Nine wrong guesses and she\'s dunked!</p>'
);

// ── 6. Footer ─────────────────────────────────────────────────────────────────
rep("footer",
  '<footer id="footer">HangHer • Head → Pigtails → Body → Arms → Skirt → Legs (9 pieces)</footer>',
  '<footer id="footer">DunkHer • Head → Pigtails → Body → Arms → Skirt → Legs (9 pieces)</footer>'
);

// ── 7. Replace HangHer SVG with DunkHer SVG ───────────────────────────────────
const dunkherSVG = `      <!-- DunkHer figure -->
      <svg id="svgHer" viewBox="0 0 200 220" aria-label="DunkHer dunk tank">

        <!-- Tank frame — always visible -->
        <!-- Poles -->
        <line class="gallows" x1="42" y1="20" x2="42" y2="143"/>
        <line class="gallows" x1="158" y1="20" x2="158" y2="143"/>
        <!-- Top crossbar -->
        <line class="gallows" x1="42" y1="20" x2="158" y2="20"/>
        <!-- Seat plank -->
        <rect class="seat-plank" x="68" y="87" width="64" height="7" rx="2"/>

        <!-- Dunk tank tub -->
        <rect class="tank-wall" x="18" y="143" width="164" height="68" rx="5"/>
        <!-- Water -->
        <rect class="water-fill" x="22" y="150" width="156" height="57" rx="3"/>
        <rect class="water-shine" x="22" y="150" width="156" height="10" rx="3"/>

        <!-- Bullseye target (right of frame) -->
        <circle class="target-white" cx="178" cy="91" r="14"/>
        <circle class="target-ring"  cx="178" cy="91" r="14"/>
        <circle class="target-white" cx="178" cy="91" r="9"/>
        <circle class="target-ring"  cx="178" cy="91" r="9"/>
        <circle class="target-bull"  cx="178" cy="91" r="4"/>

        <!-- Person (DunkHer) — revealed one part per wrong guess -->
        <g class="person-group" id="personGroupHer">
          <circle class="head part" id="p1" cx="100" cy="66" r="16"/>               <!-- 1 Head -->
          <path   class="hair part" id="p2" d="M88 58 Q70 64 76 85"/>               <!-- 2 Left pigtail -->
          <path   class="hair part" id="p3" d="M112 58 Q130 64 124 85"/>            <!-- 3 Right pigtail -->
          <line   class="body part" id="p4" x1="100" y1="82" x2="100" y2="91"/>    <!-- 4 Body (sitting) -->
          <line   class="body part" id="p5" x1="100" y1="86" x2="76" y2="104"/>    <!-- 5 Left arm -->
          <line   class="body part" id="p6" x1="100" y1="86" x2="124" y2="104"/>   <!-- 6 Right arm -->
          <polygon class="dress part" id="p7" points="100,92 82,126 118,126"/>      <!-- 7 Skirt -->
          <line   class="body part" id="p8" x1="91" y1="126" x2="83" y2="145"/>    <!-- 8 Left leg -->
          <line   class="body part" id="p9" x1="109" y1="126" x2="117" y2="145"/>  <!-- 9 Right leg -->
        </g>

        <!-- Splash (shown on dunk) -->
        <g class="splash-group" id="splashGroupHer">
          <ellipse cx="100" cy="150" rx="38" ry="9" fill="none" stroke="#4fc3f7" stroke-width="2.5"/>
          <line x1="73"  y1="150" x2="64"  y2="134" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="86"  y1="147" x2="80"  y2="130" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="100" y1="146" x2="100" y2="128" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="114" y1="147" x2="120" y2="130" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="127" y1="150" x2="136" y2="134" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`;

const oldHerSVG = `      <!-- HangHer figure -->
      <svg id="svgHer" viewBox="0 0 200 220" aria-label="HangHer gallows">
        <line class="gallows" x1="20"  y1="210" x2="120" y2="210" />
        <line class="gallows" x1="50"  y1="210" x2="50"  y2="20"  />
        <line class="gallows" x1="48"  y1="20"  x2="135" y2="20"  />
        <line class="gallows" x1="135" y1="20"  x2="135" y2="42"  />
        <circle class="head part" id="p1" cx="135" cy="58" r="16" />
        <path   class="hair part" id="p2" d="M122 48 Q103 54 109 76" />
        <path   class="hair part" id="p3" d="M148 48 Q167 54 161 76" />
        <line   class="body part" id="p4" x1="135" y1="74"  x2="135" y2="120" />
        <line   class="body part" id="p5" x1="135" y1="86"  x2="112" y2="112" />
        <line   class="body part" id="p6" x1="135" y1="86"  x2="158" y2="112" />
        <polygon class="dress part" id="p7" points="135,114 110,160 160,160" />
        <line   class="body part" id="p8" x1="126" y1="160" x2="119" y2="188" />
        <line   class="body part" id="p9" x1="144" y1="160" x2="151" y2="188" />
      </svg>`;

rep("DunkHer SVG", oldHerSVG, dunkherSVG);

// ── 8. Replace HangMan SVG with DunkMan SVG ───────────────────────────────────
const dunkmanSVG = `      <!-- DunkMan figure -->
      <svg id="svgMan" viewBox="0 0 200 220" aria-label="DunkMan dunk tank" style="display:none">

        <!-- Tank frame — always visible -->
        <line class="gallows" x1="42" y1="20" x2="42" y2="143"/>
        <line class="gallows" x1="158" y1="20" x2="158" y2="143"/>
        <line class="gallows" x1="42" y1="20" x2="158" y2="20"/>
        <rect class="seat-plank" x="68" y="87" width="64" height="7" rx="2"/>

        <!-- Dunk tank tub -->
        <rect class="tank-wall" x="18" y="143" width="164" height="68" rx="5"/>
        <rect class="water-fill" x="22" y="150" width="156" height="57" rx="3"/>
        <rect class="water-shine" x="22" y="150" width="156" height="10" rx="3"/>

        <!-- Bullseye -->
        <circle class="target-white" cx="178" cy="91" r="14"/>
        <circle class="target-ring"  cx="178" cy="91" r="14"/>
        <circle class="target-white" cx="178" cy="91" r="9"/>
        <circle class="target-ring"  cx="178" cy="91" r="9"/>
        <circle class="target-bull"  cx="178" cy="91" r="4"/>

        <!-- Person (DunkMan) — revealed one part per wrong guess -->
        <g class="person-group" id="personGroupMan">
          <circle class="man-head part" id="pm1" cx="100" cy="66" r="16"/>                <!-- 1 Head -->
          <line   class="man-body part" id="pm2" x1="100" y1="82" x2="100" y2="94"/>     <!-- 2 Body (sitting) -->
          <line   class="man-body part" id="pm3" x1="100" y1="86" x2="76" y2="106"/>     <!-- 3 Left arm -->
          <line   class="man-body part" id="pm4" x1="100" y1="86" x2="124" y2="106"/>    <!-- 4 Right arm -->
          <line   class="man-body part" id="pm5" x1="94"  y1="94" x2="86"  y2="128"/>    <!-- 5 Left leg -->
          <line   class="man-body part" id="pm6" x1="106" y1="94" x2="114" y2="128"/>    <!-- 6 Right leg -->
          <path   class="man-bow  part" id="pm7" d="M92,83 L100,89 L92,95 Z M108,83 L100,89 L108,95 Z"/> <!-- 7 Bow tie -->
          <rect   class="man-belt part" id="pm8" x="84" y="82" width="32" height="6" rx="2"/>           <!-- 8 Swim trunks waistband -->
          <path   class="man-hat  part" id="pm9" d="M82,48 L118,48 L118,45 L110,45 L110,34 L90,34 L90,45 L82,45 Z"/> <!-- 9 Hat -->
        </g>

        <!-- Splash (shown on dunk) -->
        <g class="splash-group" id="splashGroupMan">
          <ellipse cx="100" cy="150" rx="38" ry="9" fill="none" stroke="#4fc3f7" stroke-width="2.5"/>
          <line x1="73"  y1="150" x2="64"  y2="134" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="86"  y1="147" x2="80"  y2="130" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="100" y1="146" x2="100" y2="128" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="114" y1="147" x2="120" y2="130" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="127" y1="150" x2="136" y2="134" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`;

const oldManSVG = `      <!-- HangMan figure -->
      <svg id="svgMan" viewBox="0 0 200 220" aria-label="HangMan gallows" style="display:none">
        <line class="gallows" x1="20"  y1="210" x2="120" y2="210" />
        <line class="gallows" x1="50"  y1="210" x2="50"  y2="20"  />
        <line class="gallows" x1="48"  y1="20"  x2="135" y2="20"  />
        <line class="gallows" x1="135" y1="20"  x2="135" y2="42"  />
        <circle class="man-head part" id="pm1" cx="135" cy="58" r="16" />
        <line   class="man-body part" id="pm2" x1="135" y1="74"  x2="135" y2="132" />
        <line   class="man-body part" id="pm3" x1="135" y1="90"  x2="110" y2="116" />
        <line   class="man-body part" id="pm4" x1="135" y1="90"  x2="160" y2="116" />
        <line   class="man-body part" id="pm5" x1="135" y1="132" x2="118" y2="190" />
        <line   class="man-body part" id="pm6" x1="135" y1="132" x2="152" y2="190" />
        <path   class="man-bow  part" id="pm7" d="M127,74 L135,80 L127,86 Z M143,74 L135,80 L143,86 Z" />
        <rect   class="man-belt part" id="pm8" x="119" y="110" width="32" height="7" rx="2" />
        <path   class="man-hat  part" id="pm9" d="M113,44 L157,44 L157,41 L149,41 L149,27 L121,27 L121,41 L113,41 Z" />
      </svg>`;

rep("DunkMan SVG", oldManSVG, dunkmanSVG);

// ── 9. applyChar: update labels and footer text ────────────────────────────────
rep("applyChar labels",
  `  el("settHer").classList.toggle("active", isHer);
  el("settMan").classList.toggle("active", !isHer);
  for (let i = 1; i <= wrong.length; i++) el((isHer ? "p" : "pm") + i)?.classList.add("show");`,
  `  el("settHer").classList.toggle("active", isHer);
  el("settMan").classList.toggle("active", !isHer);
  for (let i = 1; i <= wrong.length; i++) el((isHer ? "p" : "pm") + i)?.classList.add("show");
  // Sync dunk group visibility
  document.getElementById("personGroupHer").style.display = isHer ? "" : "none";
  document.getElementById("personGroupMan").style.display = isHer ? "none" : "";`
);

rep("applyChar footer her",
  `"HangHer • Head → Pigtails → Body → Arms → Skirt → Legs (9 pieces)"`,
  `"DunkHer • Head → Pigtails → Body → Arms → Skirt → Legs (9 pieces)"`
);
rep("applyChar footer man",
  `"HangMan • Head → Body → Arms → Legs → Bow Tie → Belt → Hat (9 pieces)"`,
  `"DunkMan • Head → Body → Arms → Legs → Bow Tie → Trunks → Hat (9 pieces)"`
);

rep("applyChar subtitle her",
  `"Guess the secret word before the figure is complete. Nine wrong guesses and she's hanged."`,
  `"Guess the word — each wrong letter puts her closer to the tank. Nine wrong guesses and she's dunked!"`
);
rep("applyChar subtitle man",
  `"Guess the secret word before the figure is complete. Nine wrong guesses and he's hanged."`,
  `"Guess the word — each wrong letter puts him closer to the tank. Nine wrong guesses and he's dunked!"`
);

// ── 10. Settings char button labels ───────────────────────────────────────────
rep("sett her label",
  `<button class="sett-char-btn active" id="settHer">👩 HangHer</button>`,
  `<button class="sett-char-btn active" id="settHer">👩 DunkHer</button>`
);
rep("sett man label",
  `<button class="sett-char-btn" id="settMan">👨 HangMan</button>`,
  `<button class="sett-char-btn" id="settMan">👨 DunkMan</button>`
);

// ── 11. Win/loss messages ──────────────────────────────────────────────────────
rep("win message",
  `statusEl.textContent = "You saved " + (charMode === "her" ? "her" : "him") + "! The word was " + secret + ".";`,
  `statusEl.textContent = (charMode === "her" ? "She stays dry!" : "He stays dry!") + " The word was " + secret + ".";`
);
rep("loss message hanged",
  `statusEl.textContent = "Hanged! The word was " + secret + ".";`,
  `statusEl.textContent = "Splaaaash! The word was " + secret + ".";`
);
rep("loss message timesup",
  `statusEl.textContent = "Time's up! The word was " + secret + ".";`,
  `statusEl.textContent = "Time's up — dunked! The word was " + secret + ".";`
);
rep("loss message giveup",
  `statusEl.textContent = "Gave up. The word was " + secret + ".";`,
  `statusEl.textContent = "Gave up — dunked! The word was " + secret + ".";`
);

// ── 12. Add triggerDunk() function + call it at each game-over ─────────────────
rep("add triggerDunk fn",
  `function logGame(result) {`,
  `function triggerDunk() {
  const pg = document.getElementById(charMode === "her" ? "personGroupHer" : "personGroupMan");
  const sg = document.getElementById(charMode === "her" ? "splashGroupHer" : "splashGroupMan");
  if (pg) pg.classList.add("dunked");
  if (sg) sg.classList.add("show");
}

function logGame(result) {`
);

// Trigger dunk on all three loss paths
rep("dunk on hanged",
  `    logGame("Loss");
    statusEl.className = "status lose";
    statusEl.textContent = "Splaaaash!`,
  `    logGame("Loss");
    triggerDunk();
    statusEl.className = "status lose";
    statusEl.textContent = "Splaaaash!`
);
rep("dunk on timesup",
  `        logGame("Time's Up");
        statusEl.className = "status lose";
        statusEl.textContent = "Time's up — dunked!`,
  `        logGame("Time's Up");
        triggerDunk();
        statusEl.className = "status lose";
        statusEl.textContent = "Time's up — dunked!`
);
rep("dunk on giveup",
  `  logGame("Gave Up");
  statusEl.className = "status lose";
  statusEl.textContent = "Gave up — dunked!`,
  `  logGame("Gave Up");
  triggerDunk();
  statusEl.className = "status lose";
  statusEl.textContent = "Gave up — dunked!`
);

// ── 13. Clear dunk classes on new game ────────────────────────────────────────
rep("clear dunk on newgame",
  `  for (let i = 1; i <= NUM_PARTS; i++) {
    el("p" + i)?.classList.remove("show");
    el("pm" + i)?.classList.remove("show");
  }`,
  `  for (let i = 1; i <= NUM_PARTS; i++) {
    el("p" + i)?.classList.remove("show");
    el("pm" + i)?.classList.remove("show");
  }
  // Reset dunk animation
  ["personGroupHer","personGroupMan"].forEach(id => { const g=document.getElementById(id); if(g){g.classList.remove("dunked"); void g.offsetWidth;} });
  ["splashGroupHer","splashGroupMan"].forEach(id => { const g=document.getElementById(id); if(g) g.classList.remove("show"); });`
);

// ── 14. Info modal title ───────────────────────────────────────────────────────
rep("info modal title",
  "<h2>How to Play</h2>",
  "<h2>How to Play DunkHer</h2>"
);

// ── 15. Info modal: update game description ────────────────────────────────────
rep("info game description",
  `<p>Guess the hidden word one letter at a time. Each wrong guess adds a piece to the figure. Reveal the full word before all <b>9 pieces</b> appear — Head, Pigtails (×2), Body, Arms (×2), Skirt, Legs (×2) — or she's hanged.</p>`,
  `<p>Guess the hidden word one letter at a time. Each wrong guess adds a piece to the figure sitting on the dunk tank. Reveal the full word before all <b>9 pieces</b> appear — Head, Pigtails (×2), Body, Arms (×2), Skirt, Legs (×2) — or they get dunked!</p>`
);

fs.writeFileSync("index.html", html, "utf8");
console.log("\nDunkHer built successfully!");
