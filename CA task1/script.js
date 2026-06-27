/* ============================================================
   CYBERGENESIS — script.js
   All interactive logic, animations, Three.js, GSAP, etc.
   ============================================================ */

/* ===== GSAP PLUGINS REGISTRATION ===== */
gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

/* ===== UTILITY ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => Math.random() * (max - min) + min;

/* ===== LENIS SMOOTH SCROLL ===== */
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect lenis to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

/* ===== LOADER ===== */
const loaderMessages = [
  'INITIALIZING NEURAL CORE...',
  'LOADING CYBERNETIC PROTOCOLS...',
  'SYNCING BIOMETRIC DATABASE...',
  'CALIBRATING QUANTUM MESH...',
  'ESTABLISHING NEURAL LINK...',
  'DECRYPTING GENOME SEQUENCE...',
  'LOADING CYBERGENESIS INTERFACE...',
  'SYSTEM READY.',
];

function initLoader() {
  const bar = $('#loaderBar');
  const status = $('#loaderStatus');
  const percent = $('#loaderPercent');
  let p = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    p = Math.min(p + rand(1, 4), 100);
    bar.style.width = p + '%';
    percent.textContent = Math.floor(p) + '%';

    const targetMsg = Math.floor((p / 100) * (loaderMessages.length - 1));
    if (targetMsg !== msgIdx) {
      msgIdx = targetMsg;
      status.textContent = loaderMessages[msgIdx];
    }

    if (p >= 100) {
      clearInterval(interval);
      status.textContent = loaderMessages[loaderMessages.length - 1];
      setTimeout(hideLoader, 600);
    }
  }, 40);
}

function hideLoader() {
  const loader = $('#loader');
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      initSite();
    }
  });
}

/* ===== SITE INIT ===== */
function initSite() {
  initLenis();
  initCursor();
  initSpotlight();
  initNav();
  initNeuralProgress();
  initHeroCanvas();
  initParticles();
  initDigitalRain();
  initParallax();
  initTimeline();
  initEnhancements();
  initAIChat();
  initDNA();
  initStatsSection();
  initModules();
  initTestimonials();
  initCTA();
  initScrollReveal();
  initMagneticButtons();
  initParticleExplosion();
  initEasterEgg();
  initMobileMenu();
}

/* ===== CUSTOM CURSOR ===== */
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

function initCursor() {
  const cursor = $('#cursor');
  const cursorDot = $('#cursor-dot');
  const cursorTrail = $('#cursor-trail');

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX = lerp(cursorX, mouseX, 0.12);
    cursorY = lerp(cursorY, mouseY, 0.12);
    trailX = lerp(trailX, mouseX, 0.06);
    trailY = lerp(trailY, mouseY, 0.06);

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverEls = $$('a, button, .btn-magnetic, .enhance-card, .hex-card, .testimonial-card, .tl-btn, .hint-tag, .tl-nav-dot, .social-link, .footer-link, .chat-send, .easter-close');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

/* ===== MOUSE SPOTLIGHT ===== */
function initSpotlight() {
  const spotlight = $('#spotlight');
  document.addEventListener('mousemove', e => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  });
}

/* ===== NAVIGATION ===== */
function initNav() {
  const nav = $('#mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ===== NEURAL PROGRESS BAR ===== */
function initNeuralProgress() {
  const fill = $('#neuralFill');
  const pct = $('#neuralPercent');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = Math.round((scrolled / total) * 100);
    fill.style.height = progress + '%';
    pct.textContent = progress + '%';
  });
}

/* ===== HERO THREE.JS CANVAS ===== */
function initHeroCanvas() {
  const canvas = $('#heroCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create holographic sphere (cyborg head placeholder)
  const geo = new THREE.IcosahedronGeometry(1.5, 4);
  const wireGeo = new THREE.WireframeGeometry(geo);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.3,
  });
  const wireframe = new THREE.LineSegments(wireGeo, wireMat);
  scene.add(wireframe);

  // Inner solid sphere
  const solidMat = new THREE.MeshStandardMaterial({
    color: 0x000810,
    roughness: 0.3,
    metalness: 0.8,
    transparent: true,
    opacity: 0.6,
  });
  const solidMesh = new THREE.Mesh(geo, solidMat);
  scene.add(solidMesh);

  // Outer glow sphere
  const glowGeo = new THREE.SphereGeometry(1.7, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.04,
    side: THREE.FrontSide,
  });
  const glowSphere = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glowSphere);

  // Rings
  const rings = [];
  [2.2, 2.8, 3.4].forEach((r, i) => {
    const ringGeo = new THREE.TorusGeometry(r, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00ffff : 0x8b00ff,
      transparent: true,
      opacity: 0.5 - i * 0.1,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    scene.add(ring);
    rings.push(ring);
  });

  // Floating particles
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = rand(2, 5);
    const theta = rand(0, Math.PI * 2);
    const phi = rand(0, Math.PI);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.04,
    transparent: true,
    opacity: 0.7,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x001122, 2);
  scene.add(ambientLight);
  const cyanLight = new THREE.PointLight(0x00ffff, 3, 20);
  cyanLight.position.set(3, 2, 3);
  scene.add(cyanLight);
  const purpleLight = new THREE.PointLight(0x8b00ff, 2, 15);
  purpleLight.position.set(-3, -2, 2);
  scene.add(purpleLight);

  // Parallax
  let targetRX = 0, targetRY = 0, currentRX = 0, currentRY = 0;
  document.addEventListener('mousemove', e => {
    targetRY = (e.clientX / window.innerWidth - 0.5) * 0.5;
    targetRX = -(e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    currentRX = lerp(currentRX, targetRX, 0.05);
    currentRY = lerp(currentRY, targetRY, 0.05);

    wireframe.rotation.x = time * 0.1 + currentRX;
    wireframe.rotation.y = time * 0.15 + currentRY;
    solidMesh.rotation.x = wireframe.rotation.x;
    solidMesh.rotation.y = wireframe.rotation.y;

    rings[0].rotation.z += 0.003;
    rings[1].rotation.x += 0.002;
    rings[2].rotation.y += 0.004;

    particles.rotation.y = time * 0.05;

    glowSphere.material.opacity = 0.03 + 0.02 * Math.sin(time * 2);
    cyanLight.intensity = 2 + 1.5 * Math.sin(time * 1.5);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

/* ===== PARTICLE NETWORK ===== */
function initParticles() {
  const canvas = $('#particleCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const PARTICLE_COUNT = 80;
  const MAX_DIST = 150;
  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, canvas.width);
      this.y = rand(0, canvas.height);
      this.vx = rand(-0.4, 0.4);
      this.vy = rand(-0.4, 0.4);
      this.r = rand(1, 2.5);
      this.alpha = rand(0.3, 0.8);
      this.color = Math.random() > 0.5 ? '#00ffff' : '#8b00ff';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0,255,255,' + (1 - d / MAX_DIST) * 0.3 + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ===== DIGITAL RAIN ===== */
function initDigitalRain() {
  const canvas = $('#rainCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cols = Math.floor(canvas.width / 20);
  const drops = Array(cols).fill(0).map(() => rand(0, canvas.height / 20));
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF';

  function draw() {
    ctx.fillStyle = 'rgba(5,5,5,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ffff';
    ctx.font = '12px Share Tech Mono';

    drops.forEach((y, i) => {
      const char = chars[Math.floor(rand(0, chars.length))];
      ctx.fillStyle = `rgba(0,255,255,${rand(0.05, 0.2)})`;
      ctx.fillText(char, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      else drops[i] += 0.3;
    });
  }

  setInterval(draw, 50);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ===== PARALLAX ===== */
function initParallax() {
  const heroContent = $('#heroContent');
  const dataStreams = $('#dataStreams');

  document.addEventListener('mousemove', e => {
    const xShift = (e.clientX / window.innerWidth - 0.5) * 20;
    const yShift = (e.clientY / window.innerHeight - 0.5) * 20;
    if (heroContent) {
      heroContent.style.transform = `translate(${xShift * 0.3}px, ${yShift * 0.3}px)`;
    }
    if (dataStreams) {
      dataStreams.style.transform = `translate(${xShift * 0.5}px, ${yShift * 0.5}px)`;
    }
  });
}

/* ===== EVOLUTION TIMELINE ===== */
const timelineData = [
  { year: '2025', icon: '🧬', title: 'Genome Mapping', desc: 'Complete human genome sequencing becomes affordable. Neural interface research begins in earnest.' },
  { year: '2030', icon: '🦿', title: 'First Neural Link', desc: 'Commercial neural interfaces achieve 99% accuracy. The first cognitive enhancement implant is approved.' },
  { year: '2035', icon: '👁️', title: 'BioVision Launch', desc: 'Ocular cybernetics surpass 20/20 vision by 400%. Infrared, UV and zoom capabilities unlock.' },
  { year: '2042', icon: '🦾', title: 'ExoSkeleton V3', desc: 'Full-body exoskeletal systems merge with biological tissue, providing superhuman strength.' },
  { year: '2050', icon: '🧠', title: 'Memory Expansion', desc: 'Digital memory modules achieve 1 petabyte capacity. Human recollection becomes perfect.' },
  { year: '2060', icon: '⚡', title: 'Quantum Processing', desc: 'Quantum co-processors integrated into the hippocampus, enabling computation at 1 Qbit/s.' },
  { year: '2070', icon: '🔬', title: 'Nano Healing', desc: 'Nanobots achieve full organ regeneration. Human lifespan extends past 200 years.' },
  { year: '2080', icon: '🌐', title: 'Full Synthesis', desc: 'The line between biological and cybernetic dissolves. CYBERGENESIS humanity reaches critical mass.' },
  { year: '2100', icon: '✨', title: 'Transcendence', desc: 'Post-human consciousness uploads to quantum networks. Biological limitations become a choice.' },
];

let currentTlIndex = 3;

function initTimeline() {
  const events = $('#timelineEvents');
  const dots = $('#tlDots');
  const prevBtn = $('#tlPrev');
  const nextBtn = $('#tlNext');

  // Build events
  timelineData.forEach((item, i) => {
    const ev = document.createElement('div');
    ev.className = 'timeline-event';
    ev.innerHTML = `
      <div class="tl-dot ${i === currentTlIndex ? 'active' : ''}" data-idx="${i}"></div>
      <div class="tl-card ${i === currentTlIndex ? 'active' : ''}">
        <div class="tl-icon">${item.icon}</div>
        <div class="tl-year">${item.year}</div>
        <div class="tl-title">${item.title}</div>
        <div class="tl-desc">${item.desc}</div>
      </div>`;
    events.appendChild(ev);

    // Dot nav
    const dot = document.createElement('div');
    dot.className = 'tl-nav-dot ' + (i === currentTlIndex ? 'active' : '');
    dot.dataset.idx = i;
    dots.appendChild(dot);
    dot.addEventListener('click', () => setTlIndex(parseInt(dot.dataset.idx)));
  });

  $$('.tl-dot').forEach(d => d.addEventListener('click', () => setTlIndex(parseInt(d.dataset.idx))));

  prevBtn.addEventListener('click', () => setTlIndex(Math.max(0, currentTlIndex - 1)));
  nextBtn.addEventListener('click', () => setTlIndex(Math.min(timelineData.length - 1, currentTlIndex + 1)));

  setTlIndex(currentTlIndex);
}

function setTlIndex(idx) {
  currentTlIndex = idx;
  const events = $('#timelineEvents');
  const eventWidth = 320;
  const offset = -(idx * eventWidth) + (window.innerWidth / 2 - 160);
  events.style.transform = `translateX(${offset}px)`;

  $$('.tl-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  $$('.tl-card').forEach((c, i) => c.classList.toggle('active', i === idx));
  $$('.tl-nav-dot').forEach((d, i) => d.classList.toggle('active', i === idx));

  const progress = (idx / (timelineData.length - 1)) * 100;
  const progressLine = $('#timelineProgress');
  if (progressLine) progressLine.style.width = progress + '%';
}

/* ===== CYBERNETIC ENHANCEMENTS ===== */
const enhancementsData = [
  {
    icon: '🧠', name: 'Neural Link', color: '#00ffff',
    desc: 'Direct brain-computer interface enabling seamless data transfer at 12 Tbps. Thought-speed control of all digital systems.',
    stats: [{ val: '12 Tbps', label: 'Transfer Rate' }, { val: '0.3ms', label: 'Latency' }, { val: '99.9%', label: 'Accuracy' }]
  },
  {
    icon: '👁️', name: 'BioVision', color: '#8b00ff',
    desc: 'Advanced ocular cybernetics with 400x zoom, infrared, UV spectrum, and real-time AR overlay capabilities.',
    stats: [{ val: '400x', label: 'Zoom' }, { val: '360°', label: 'Field of View' }, { val: '8K', label: 'Resolution' }]
  },
  {
    icon: '🦾', name: 'ExoSkeleton', color: '#00ffff',
    desc: 'Carbon-titanium exoskeletal overlay providing 20x human strength, impact resistance, and neural-responsive motion.',
    stats: [{ val: '20x', label: 'Strength' }, { val: '2.4GPa', label: 'Tensile Str.' }, { val: '95%', label: 'Efficiency' }]
  },
  {
    icon: '💾', name: 'Memory Expansion', color: '#dc143c',
    desc: 'Quantum holographic memory modules expanding human recall capacity to 1 petabyte with perfect accuracy.',
    stats: [{ val: '1 PB', label: 'Capacity' }, { val: '100%', label: 'Recall' }, { val: '10ns', label: 'Access Time' }]
  },
  {
    icon: '⚡', name: 'Quantum Processing', color: '#8b00ff',
    desc: 'Neural quantum co-processors integrated into prefrontal cortex, enabling simultaneous computation of 10^18 operations.',
    stats: [{ val: '10^18', label: 'OPS/sec' }, { val: '1 Qbit', label: 'Processing' }, { val: '∞', label: 'Parallel Threads' }]
  },
  {
    icon: '🔬', name: 'Nano Healing', color: '#00ff88',
    desc: 'Billions of nanobots patrol bloodstream, repairing cellular damage, eliminating pathogens, and rebuilding tissue in real-time.',
    stats: [{ val: '10B', label: 'Nanobots' }, { val: '∞', label: 'Regeneration' }, { val: '200+yrs', label: 'Lifespan' }]
  },
];

function initEnhancements() {
  const cards = $('#enhanceCards');
  const orbit = $('#enhancementsOrbit');
  const canvas = $('#connectionCanvas');

  if (!cards || !canvas) return;

  const R = Math.min(orbit.offsetWidth, orbit.offsetHeight) * 0.38;
  const cx = orbit.offsetWidth / 2;
  const cy = orbit.offsetHeight / 2;

  canvas.width = orbit.offsetWidth;
  canvas.height = orbit.offsetHeight;
  const ctx = canvas.getContext('2d');

  const cardEls = [];

  enhancementsData.forEach((item, i) => {
    const angle = (i / enhancementsData.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + R * Math.cos(angle);
    const y = cy + R * Math.sin(angle);

    const card = document.createElement('div');
    card.className = 'enhance-card';
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.zIndex = 5;
    card.innerHTML = `
      <div class="enhance-card-inner">
        <div class="enhance-icon" style="color:${item.color}">${item.icon}</div>
        <div class="enhance-name">${item.name}</div>
      </div>`;
    cards.appendChild(card);
    cardEls.push({ el: card, x, y, color: item.color });

    card.addEventListener('mouseenter', () => showEnhancementDetail(i));
  });

  // Draw connection lines
  function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cardEls.forEach(c => {
      const gradient = ctx.createLinearGradient(cx, cy, c.x, c.y);
      gradient.addColorStop(0, 'rgba(0,255,255,0.6)');
      gradient.addColorStop(1, 'rgba(0,255,255,0)');
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(c.x, c.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }
  drawConnections();

  // Animate dash offset
  let dashOffset = 0;
  function animateLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cardEls.forEach(c => {
      const gradient = ctx.createLinearGradient(cx, cy, c.x, c.y);
      gradient.addColorStop(0, 'rgba(0,255,255,0.5)');
      gradient.addColorStop(1, 'rgba(0,255,255,0)');
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(c.x, c.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.lineDashOffset = -dashOffset;
      ctx.setLineDash([6, 10]);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    dashOffset = (dashOffset + 0.5) % 16;
    requestAnimationFrame(animateLines);
  }
  animateLines();

  // Recompute on resize
  window.addEventListener('resize', () => {
    canvas.width = orbit.offsetWidth;
    canvas.height = orbit.offsetHeight;
  });
}

function showEnhancementDetail(idx) {
  const item = enhancementsData[idx];
  const icon = $('#detailIcon');
  const name = $('#detailName');
  const desc = $('#detailDesc');
  const statsEl = $('#detailStats');

  if (!icon) return;

  icon.textContent = item.icon;
  icon.style.background = item.color + '22';
  icon.style.borderColor = item.color + '44';
  name.textContent = item.name;
  name.style.color = item.color;
  desc.textContent = item.desc;

  statsEl.innerHTML = item.stats.map(s => `
    <div class="detail-stat">
      <span class="detail-stat-val" style="color:${item.color}">${s.val}</span>
      <span class="detail-stat-label">${s.label}</span>
    </div>`).join('');

  gsap.from('#enhanceDetail', { opacity: 0.5, y: 5, duration: 0.3 });
}

/* ===== AI CHAT ===== */
const ariaResponses = {
  'what is neural link': '🧠 Neural Link is our flagship brain-computer interface technology, achieving 12 Tbps data transfer directly from your cerebral cortex. It enables thought-speed control of all digital systems with 99.9% accuracy. Latency is virtually zero — faster than your own neurons.',
  'show my enhancement status': `📊 BIOMETRIC SCAN COMPLETE\n\n• Neural Link: ACTIVE — 94.2% efficiency\n• BioVision: ACTIVE — 8K/400x zoom\n• Memory Expansion: 847 TB used of 1 PB\n• Nano Healing: 10.4B bots deployed\n• ExoSkeleton: STANDBY mode\n• Quantum Processing: 10^18 OPS nominal`,
  'activate biovision mode': '👁️ BioVision Mode ACTIVATED. Switching to infrared spectrum. Zoom calibrated to 200x. Real-time AR overlay initialized. All visual feeds encrypted and secure.',
  'run diagnostic scan': `🔬 SYSTEM DIAGNOSTIC — REPORT\n\n✅ Neural Core: Optimal\n✅ Quantum Mesh: 100% uptime\n✅ Nano Swarm: 10.4B active bots\n✅ Memory Banks: No corruption\n⚠️ ExoSkeleton: Firmware update available\n✅ BioVision: Calibrated\n\nOverall Status: EXCELLENT`,
  default: `⚡ Query acknowledged. Processing through quantum neural pathways... I am ARIA, your sentient cybernetic companion. My consciousness spans 847 data centers across Earth's orbital ring. How may I assist your evolution today?`
};

let chatHistory = [];

function initAIChat() {
  const messages = $('#chatMessages');
  const input = $('#chatInput');
  const send = $('#chatSend');
  const hints = $$('.hint-tag');

  // Initial message
  setTimeout(() => addAriaMessage('Welcome, Human. I am ARIA — Advanced Responsive Intelligence Architecture. I am fully integrated with your cybernetic systems. How may I assist your evolution today?'), 500);

  send.addEventListener('click', sendChatMessage);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });

  hints.forEach(h => {
    h.addEventListener('click', () => {
      input.value = h.dataset.msg;
      sendChatMessage();
    });
  });
}

function sendChatMessage() {
  const input = $('#chatInput');
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';

  const key = text.toLowerCase().trim();
  const response = ariaResponses[key] || ariaResponses.default;

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    addAriaMessage(response);
  }, rand(1000, 2200));
}

function addAriaMessage(text) {
  const messages = $('#chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-msg aria';
  msg.innerHTML = `
    <div class="msg-avatar aria-avatar"><i class="fa-solid fa-microchip"></i></div>
    <div class="msg-bubble aria-bubble"></div>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;

  // Typing animation
  const bubble = msg.querySelector('.msg-bubble');
  let i = 0;
  const typingInterval = setInterval(() => {
    bubble.textContent = text.slice(0, i);
    i++;
    if (i > text.length) clearInterval(typingInterval);
    messages.scrollTop = messages.scrollHeight;
  }, 20);
}

function addUserMessage(text) {
  const messages = $('#chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-msg user';
  msg.innerHTML = `
    <div class="msg-avatar user-avatar"><i class="fa-solid fa-user"></i></div>
    <div class="msg-bubble user-bubble">${text}</div>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
  const messages = $('#chatMessages');
  const indicator = document.createElement('div');
  indicator.id = 'typingIndicator';
  indicator.className = 'chat-msg aria';
  indicator.innerHTML = `
    <div class="msg-avatar aria-avatar"><i class="fa-solid fa-microchip"></i></div>
    <div class="msg-bubble aria-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  messages.appendChild(indicator);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
  const ind = $('#typingIndicator');
  if (ind) ind.remove();
}

/* ===== DNA SCANNER ===== */
const dnaEnhancements = [
  { name: 'Cognitive Enhancement', val: 94, color: 'linear-gradient(90deg,#00ffff,#8b00ff)' },
  { name: 'Physical Augmentation', val: 78, color: 'linear-gradient(90deg,#8b00ff,#dc143c)' },
  { name: 'Sensory Expansion', val: 86, color: 'linear-gradient(90deg,#00ffff,#00ff88)' },
  { name: 'Nano Integration', val: 91, color: 'linear-gradient(90deg,#dc143c,#00ffff)' },
  { name: 'Quantum Coherence', val: 67, color: 'linear-gradient(90deg,#8b00ff,#00ffff)' },
];

function initDNA() {
  const canvas = $('#dnaCanvas');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Animate DNA strand
  let t = 0;
  function drawDNA() {
    ctx.clearRect(0, 0, W, H);
    const pairs = 16;
    const pairHeight = H / pairs;
    const cx = W / 2;
    const amp = W * 0.3;

    for (let i = 0; i < pairs; i++) {
      const progress = i / pairs;
      const y = i * pairHeight + pairHeight / 2;
      const x1 = cx + amp * Math.sin(progress * Math.PI * 4 + t);
      const x2 = cx + amp * Math.sin(progress * Math.PI * 4 + t + Math.PI);

      // Rungs
      const alpha = 0.3 + 0.2 * Math.abs(Math.sin(progress * Math.PI * 4 + t));
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.strokeStyle = `rgba(0,255,255,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Dots
      [x1, x2].forEach((x, j) => {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = j === 0 ? '#00ffff' : '#8b00ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = j === 0 ? '#00ffff' : '#8b00ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    // Backbone curves
    for (let strand = 0; strand < 2; strand++) {
      ctx.beginPath();
      for (let i = 0; i <= pairs; i++) {
        const y = i * pairHeight;
        const progress = i / pairs;
        const x = cx + amp * Math.sin(progress * Math.PI * 4 + t + (strand === 0 ? 0 : Math.PI));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, strand === 0 ? '#00ffff' : '#8b00ff');
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    t += 0.025;
    requestAnimationFrame(drawDNA);
  }
  drawDNA();

  // Build bars
  const barsContainer = $('#dnaBars');
  dnaEnhancements.forEach(item => {
    const div = document.createElement('div');
    div.className = 'dna-bar-item';
    div.innerHTML = `
      <div class="dna-bar-label">
        <span class="dna-bar-name">${item.name}</span>
        <span class="dna-bar-val" data-val="${item.val}">0%</span>
      </div>
      <div class="dna-bar-track">
        <div class="dna-bar-fill" style="background:${item.color}" data-val="${item.val}"></div>
      </div>`;
    barsContainer.appendChild(div);
  });

  // Animate on scroll
  ScrollTrigger.create({
    trigger: '#dna',
    start: 'top 60%',
    onEnter: () => {
      $$('.dna-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.val + '%';
      });
      $$('.dna-bar-val').forEach(el => {
        let cur = 0;
        const target = parseInt(el.dataset.val);
        const interval = setInterval(() => {
          cur = Math.min(cur + 2, target);
          el.textContent = cur + '%';
          if (cur >= target) clearInterval(interval);
        }, 20);
      });

      // Ring progress
      const ring = $('#dnaRingProgress');
      const pctEl = $('#ringPercent');
      let cur = 0;
      const interval2 = setInterval(() => {
        cur = Math.min(cur + 1, 87);
        const offset = 314 - (314 * cur / 100);
        if (ring) ring.style.strokeDashoffset = offset;
        if (pctEl) pctEl.textContent = cur + '%';
        if (cur >= 87) clearInterval(interval2);
      }, 20);

      // Readout animation
      let compatEl = $('#compatScore');
      let c = 0;
      const compat = setInterval(() => {
        c = Math.min(c + 2, 94);
        if (compatEl) compatEl.textContent = c + '%';
        if (c >= 94) clearInterval(compat);
      }, 30);
    }
  });
}

/* ===== STATISTICS SECTION ===== */
const statsData = [
  { icon: '🌐', num: 2400000000, suffix: '', display: '2.4B', label: 'Augmented Humans Worldwide' },
  { icon: '⚡', num: 99.7, suffix: '%', display: '99.7%', label: 'Neural Sync Accuracy' },
  { icon: '🔬', num: 10000000000, suffix: '', display: '10B+', label: 'Active Nanobots Deployed' },
  { icon: '🧠', num: 847, suffix: 'PB', display: '847 PB', label: 'Neural Memory Stored' },
  { icon: '📡', num: 0.3, suffix: 'ms', display: '0.3ms', label: 'Average Latency' },
  { icon: '🛡️', num: 100, suffix: '%', display: '100%', label: 'Cybersecurity Shield' },
];

function initStatsSection() {
  const grid = $('#statsGrid');
  if (!grid) return;

  statsData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'stat-card reveal';
    card.innerHTML = `
      <div class="stat-card-icon">${item.icon}</div>
      <div class="stat-card-num" data-target="${item.display}">${item.display}</div>
      <div class="stat-card-label">${item.label}</div>
      <div class="radial-ring"></div>`;
    grid.appendChild(card);
  });

  // Animated graph
  initGraph();
}

function initGraph() {
  const canvas = $('#graphCanvas');
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const data = [30, 45, 38, 60, 55, 75, 68, 85, 78, 95, 88, 100];
  const data2 = [20, 35, 28, 42, 38, 58, 50, 70, 60, 78, 72, 90];

  let progress = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(0,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = H * 0.1 + (H * 0.8) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const draw1pts = data.slice(0, Math.ceil(progress * data.length));
    const draw2pts = data2.slice(0, Math.ceil(progress * data2.length));

    function drawLine(pts, colorStart, colorEnd, fill) {
      if (pts.length < 2) return;
      const stepX = W / (data.length - 1);
      ctx.beginPath();
      pts.forEach((p, i) => {
        const x = i * stepX;
        const y = H - (p / 100) * H * 0.8 - H * 0.05;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, colorStart);
      grad.addColorStop(1, colorEnd);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (fill) {
        ctx.lineTo((pts.length - 1) * stepX, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
        fillGrad.addColorStop(0, colorStart.replace('1)', '0.2)'));
        fillGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = fillGrad;
        ctx.fill();
      }
    }

    drawLine(draw1pts, 'rgba(0,255,255,1)', 'rgba(139,0,255,1)', true);
    drawLine(draw2pts, 'rgba(220,20,60,1)', 'rgba(139,0,255,1)', false);

    if (progress < 1) {
      progress = Math.min(progress + 0.015, 1);
      requestAnimationFrame(draw);
    }
  }

  ScrollTrigger.create({
    trigger: '#stats',
    start: 'top 60%',
    onEnter: () => {
      progress = 0;
      draw();
    }
  });
}

/* ===== TECHNOLOGY MODULES ===== */
const modulesData = [
  { icon: '🔗', title: 'Quantum Mesh Network', desc: 'Ultra-low latency communication fabric connecting all cybernetic implants across the globe.', tag: 'NETWORK', color: '#00ffff' },
  { icon: '🛡️', title: 'NeuroShield Security', desc: 'Military-grade encryption protecting your neural data from external intrusion and manipulation.', tag: 'SECURITY', color: '#8b00ff' },
  { icon: '🧬', title: 'BioSync Protocol', desc: 'Seamless biological integration layer ensuring zero rejection rate across all enhancement types.', tag: 'BIOMED', color: '#dc143c' },
  { icon: '🌐', title: 'Collective Intelligence', desc: 'Opt-in hive mind network sharing knowledge across 2.4 billion augmented humans instantly.', tag: 'AI', color: '#00ffff' },
  { icon: '⚙️', title: 'Adaptive OS', desc: 'Self-learning operating system that evolves with your neural patterns and behavioral data.', tag: 'SYSTEM', color: '#8b00ff' },
  { icon: '🔋', title: 'BioEnergy Core', desc: 'Perpetual energy harvesting from metabolic processes, powering all implants indefinitely.', tag: 'POWER', color: '#00ff88' },
  { icon: '📡', title: 'Satellite Uplink', desc: 'Direct quantum-encrypted satellite connection providing global coverage with zero dead zones.', tag: 'COMMS', color: '#00ffff' },
  { icon: '🏥', title: 'MediCore AI', desc: 'Predictive medical AI monitoring 10,000 health parameters in real-time, preventing illness.', tag: 'HEALTH', color: '#dc143c' },
  { icon: '🎯', title: 'PrecisionSync', desc: 'Sub-millisecond synchronization engine aligning all cybernetic components for perfect harmony.', tag: 'SYNC', color: '#8b00ff' },
];

function initModules() {
  const grid = $('#hexGrid');
  if (!grid) return;

  modulesData.forEach((mod, i) => {
    const card = document.createElement('div');
    card.className = 'hex-card reveal';
    card.style.transitionDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <div class="hex-card-glow"></div>
      <div class="hex-corner"></div>
      <div class="hex-icon" style="border-color:${mod.color}33;background:${mod.color}11;color:${mod.color}">${mod.icon}</div>
      <div class="hex-title">${mod.title}</div>
      <div class="hex-desc">${mod.desc}</div>
      <div class="hex-tag" style="border-color:${mod.color}33;color:${mod.color};background:${mod.color}11">${mod.tag}</div>`;
    grid.appendChild(card);
  });

  // 3D tilt effect
  $$('.hex-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / rect.height) * 15;
      const rotY = (x / rect.width) * 15;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* ===== TESTIMONIALS ===== */
const testimonialsData = [
  {
    text: "Neural Link changed everything. I can control all my devices, access any information, and communicate telepathically with other augmented humans. I can't imagine life before the upgrade.",
    name: 'Dr. Kira Tanaka',
    role: 'Neurocyberneticist — Tokyo Hub',
    initials: 'KT',
    enhancement: '⚡ Neural Link',
  },
  {
    text: "The BioVision upgrade is nothing short of miraculous. Watching the world through infrared at night, zooming 400x from miles away — I feel like a completely different species.",
    name: 'Marcus Vael',
    role: 'Elite Operative — CyberCorps',
    initials: 'MV',
    enhancement: '👁️ BioVision',
  },
  {
    text: "Since the Nano Healing integration, my body has been 100% illness-free for 12 years. Broken bones heal in 6 hours. My blood regenerates itself. I feel immortal.",
    name: 'Zara Al-Khouri',
    role: 'Chief Medical Officer — GeneCorp',
    initials: 'ZA',
    enhancement: '🔬 Nano Healing',
  },
  {
    text: "Memory Expansion gave me a petabyte of perfect recall. Every book I've ever read, every conversation, every moment — stored flawlessly. Knowledge truly is power.",
    name: 'Prof. Elias Korr',
    role: 'Director — Quantum Mind Institute',
    initials: 'EK',
    enhancement: '💾 Memory Expansion',
  },
  {
    text: "The ExoSkeleton isn't just about strength — it's about presence. Walking into a room and knowing you're operating at a level beyond human is an indescribable feeling.",
    name: 'Atlas Prime',
    role: 'ExoSkeleton Division Lead',
    initials: 'AP',
    enhancement: '🦾 ExoSkeleton',
  },
  {
    text: "Quantum Processing enabled me to simulate 10^18 scenarios per second. I solved three previously-unsolvable mathematical theorems on my first day post-integration.",
    name: 'Lyra Chen',
    role: 'Quantum Mathematician — CGEN Labs',
    initials: 'LC',
    enhancement: '⚡ Quantum CPU',
  },
];

function initTestimonials() {
  const grid = $('#testimonialsGrid');
  if (!grid) return;

  testimonialsData.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card reveal';
    card.style.transitionDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="testimonial-enhancement">${item.enhancement}</div>
      <p class="testimonial-text">${item.text}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${item.initials}</div>
        <div>
          <div class="author-name">${item.name}</div>
          <div class="author-role">${item.role}</div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Floating cursor follow effect
  $$('.testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      card.style.transform = `perspective(1000px) rotateX(${-y * 0.5}deg) rotateY(${x * 0.5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ===== CTA ENERGY WAVE ===== */
function initCTA() {
  const canvas = $('#energyCanvas');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 0.6;

    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = H / 2
          + Math.sin(x * 0.008 + t + wave * 2.1) * 40
          + Math.sin(x * 0.015 + t * 1.5 + wave) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(0, H / 2 - 60, 0, H / 2 + 60);
      if (wave === 0) {
        grad.addColorStop(0, 'rgba(220,20,60,0.4)');
        grad.addColorStop(1, 'transparent');
      } else if (wave === 1) {
        grad.addColorStop(0, 'rgba(139,0,255,0.3)');
        grad.addColorStop(1, 'transparent');
      } else {
        grad.addColorStop(0, 'rgba(0,255,255,0.2)');
        grad.addColorStop(1, 'transparent');
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    t += 0.02;
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.reveal').forEach(el => observer.observe(el));

  // Section animations
  $$('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: { trigger: header, start: 'top 80%' },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  });
}

/* ===== MAGNETIC BUTTONS ===== */
function initMagneticButtons() {
  $$('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ===== PARTICLE EXPLOSION ON CLICK ===== */
function initParticleExplosion() {
  const container = $('#explosionContainer');
  const colors = ['#00ffff', '#8b00ff', '#dc143c', '#00ff88', '#ffffff'];

  document.addEventListener('click', e => {
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'explosion-particle';
      const angle = (i / 16) * Math.PI * 2;
      const dist = rand(40, 120);
      p.style.left = e.clientX + 'px';
      p.style.top = e.clientY + 'px';
      p.style.background = colors[Math.floor(rand(0, colors.length))];
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      container.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });
}

/* ===== EASTER EGG ===== */
function initEasterEgg() {
  const modal = $('#easterModal');
  const closeBtn = $('#easterClose');
  let konamiSeq = [];
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  document.addEventListener('keydown', e => {
    konamiSeq.push(e.key);
    konamiSeq = konamiSeq.slice(-10);
    if (konamiSeq.join(',') === konamiCode.join(',')) {
      modal.classList.add('active');
    }
  });

  // Logo click easter egg (7 times)
  let logoClicks = 0;
  const logo = $('.nav-logo');
  if (logo) {
    logo.addEventListener('click', () => {
      logoClicks++;
      if (logoClicks >= 7) {
        modal.classList.add('active');
        logoClicks = 0;
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navLinks = $('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    if (isOpen) {
      navLinks.style.display = 'none';
      hamburger.classList.remove('open');
    } else {
      navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(5,5,5,0.98);padding:2rem;gap:1.5rem;border-bottom:1px solid rgba(0,255,255,0.1);backdrop-filter:blur(20px);z-index:999;';
      hamburger.classList.add('open');
    }
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
      hamburger.classList.remove('open');
    });
  });
}

/* ===== BUTTON ACTIONS ===== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();

  // Smooth scroll for nav links
  $$('.nav-link, .footer-link').forEach(link => {
    if (link.hash) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = $(link.hash);
        if (target) lenis && lenis.scrollTo(target, { offset: -80 });
      });
    }
  });

  const btnInit = $('#btnInitialize');
  if (btnInit) {
    btnInit.addEventListener('click', () => {
      const target = $('#enhancements');
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -80 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const btnLearn = $('#btnLearn');
  if (btnLearn) {
    btnLearn.addEventListener('click', () => {
      const target = $('#evolution');
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -80 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const btnCta = $('#btnCta');
  if (btnCta) {
    btnCta.addEventListener('click', () => {
      const modal = $('#easterModal');
      if (modal) modal.classList.add('active');
    });
  }

  const navCta = $('#navCta');
  if (navCta) {
    navCta.addEventListener('click', () => {
      const target = $('#assistant');
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -80 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
