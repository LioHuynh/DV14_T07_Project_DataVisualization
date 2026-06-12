:root {
    /* ===== UNIVERSE DARK MODE PALETTE ===== */
    --bg: #04091c;
    --card: rgba(11, 26, 54, 0.66);
    --card-2: rgba(9, 21, 45, 0.55);
    --ink: #dceeff;
    --muted: #7ea6d4;
    --primary: #38bdf8;
    --primary-dark: #0b3a66;
    --primary-text: #7dd3fc;
    --cyan: #22d3ee;
    --teal: #14b8a6;
    --violet: #7c3aed;
    --violet-soft: #a78bfa;
    --gold: #fbbf24;
    --border: rgba(56, 189, 248, 0.22);
    --border-soft: rgba(56, 189, 248, 0.12);
    --shadow: 0 24px 64px rgba(0, 0, 0, 0.62);
    --shadow-soft: 0 16px 38px rgba(0, 0, 0, 0.46);
    --radius-xl: 30px;
    --radius-lg: 22px;

    /* Holographic cube tokens (already deep-space — kept) */
    --cube-size: 550px;
    --cube-perspective: 2000px;
    --holo-edge: rgba(34, 211, 238, 0.9);
    --holo-glow: rgba(34, 211, 238, 0.55);
    --holo-glass: rgba(7, 22, 46, 0.62);
    --holo-glass-2: rgba(12, 34, 64, 0.55);
    --holo-ink: rgba(214, 240, 255, 0.92);
    --holo-ink-dim: rgba(160, 205, 240, 0.7);
    --cube-spin-duration: 750ms;
    --cube-spin-ease: cubic-bezier(.22, 1, .36, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    position: relative;
    min-height: 100vh;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    /* Universe: nebula glows over deep navy-black */
    background-color: #03071a;
    background-image:
        radial-gradient(circle at 15% 12%, rgba(34, 211, 238, 0.16), transparent 38%),
        radial-gradient(circle at 85% 8%, rgba(124, 58, 237, 0.18), transparent 42%),
        radial-gradient(circle at 50% 118%, rgba(14, 165, 233, 0.16), transparent 55%),
        linear-gradient(165deg, #04081d 0%, #060c26 52%, #0a1030 100%);
    background-attachment: fixed;
    color: var(--ink);
    line-height: 1.5;
    overscroll-behavior-y: contain;
}

/* Starfield — sits behind all content, faintly visible through the glass panels */
body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image:
        radial-gradient(1.5px 1.5px at 20% 30%, rgba(255, 255, 255, 0.9), transparent),
        radial-gradient(1.5px 1.5px at 70% 22%, rgba(190, 225, 255, 0.8), transparent),
        radial-gradient(1px 1px at 40% 68%, rgba(255, 255, 255, 0.7), transparent),
        radial-gradient(1px 1px at 85% 58%, rgba(255, 255, 255, 0.6), transparent),
        radial-gradient(1px 1px at 60% 85%, rgba(200, 230, 255, 0.7), transparent),
        radial-gradient(1.5px 1.5px at 10% 80%, rgba(255, 255, 255, 0.8), transparent),
        radial-gradient(1px 1px at 92% 36%, rgba(255, 255, 255, 0.6), transparent),
        radial-gradient(1px 1px at 32% 50%, rgba(255, 255, 255, 0.5), transparent),
        radial-gradient(1px 1px at 50% 15%, rgba(255, 255, 255, 0.55), transparent);
    background-repeat: repeat;
    background-size: 620px 620px;
    opacity: 0.6;
}

.dashboard {
    position: relative;
    width: min(1500px, calc(100% - 28px));
    margin: 14px auto;
    overflow: hidden;
    border: 1px solid var(--border-soft);
    border-radius: 34px;
    background: rgba(8, 18, 40, 0.55);
    box-shadow: var(--shadow), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(18px);
}

/* ==================== HEADER ==================== */
.dashboard-header {
    display: grid;
    grid-template-columns: minmax(0, 1.618fr) auto;
    gap: 1.5rem;
    align-items: center;
    padding: 0.85rem clamp(1rem, 3vw, 2rem);
    color: white;
    position: relative;
    isolation: isolate;
    /* Aurora: cyan + violet corner glows over a lifted navy — clearly brighter than the body */
    background:
        radial-gradient(120% 150% at 0% 0%, rgba(34, 211, 238, 0.16), transparent 46%),
        radial-gradient(120% 160% at 100% 0%, rgba(124, 58, 237, 0.22), transparent 52%),
        linear-gradient(118deg, #0a1c40 0%, #0d264f 46%, #122a5c 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.dashboard-header::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cyan) 25%, var(--violet-soft) 75%, transparent);
    box-shadow: 0 0 14px rgba(34, 211, 238, 0.5);
    z-index: 1;
    pointer-events: none;
}

.eyebrow,
.face-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: #7de3ff;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.dashboard-header h1 {
    max-width: 900px;
    margin-top: 0.1rem;
    font-size: clamp(1.35rem, 2.5vw, 1.85rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.03em;
    text-shadow: 0 0 18px rgba(34, 211, 238, 0.25);
}

.subhead {
    max-width: 750px;
    margin-top: 0.15rem;
    color: rgba(200, 226, 252, 0.82);
    font-size: clamp(0.78rem, 1.1vw, 0.88rem);
    line-height: 1.3;
}

.hero-panel {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.45rem 0.95rem;
    border: 1px solid rgba(34, 211, 238, 0.28);
    border-radius: 12px;
    background: rgba(34, 211, 238, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);

    cursor: help;
    will-change: transform, border-color, background-color;
    transition: transform 0.22s cubic-bezier(0.25, 1, 0.5, 1),
                border-color 0.22s cubic-bezier(0.25, 1, 0.5, 1),
                background-color 0.22s cubic-bezier(0.25, 1, 0.5, 1);
}

.hero-panel:hover {
    transform: translateY(-2px);
    border-color: rgba(34, 211, 238, 0.7);
    background: rgba(34, 211, 238, 0.14);
}

.hero-number {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.02em;
    order: 2;
    color: #e6f7ff;
    text-shadow: 0 0 14px rgba(34, 211, 238, 0.4);
}

.hero-label {
    margin-top: 0;
    color: rgba(190, 224, 252, 0.82);
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-align: right;
    max-width: 60px;
    line-height: 1.1;
    order: 1;
}

/* ==================== KPI ==================== */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding: 0.4rem clamp(1rem, 3vw, 2rem) 0;
}

.kpi-card {
    transition: transform 0.22s cubic-bezier(0.25, 1, 0.5, 1),
                box-shadow 0.22s cubic-bezier(0.25, 1, 0.5, 1),
                border-color 0.22s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: help;
    will-change: transform, box-shadow;
}

.kpi-card:hover {
    transform: translateY(-3px);
    border-color: var(--cyan);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5),
                0 0 18px rgba(34, 211, 238, 0.25);
}

.kpi-card {
    position: relative;
    overflow: hidden;

    display: grid;
    grid-template-areas:
        "label value"
        "note  value";
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: 0.6rem;
    row-gap: 1px;

    padding: 0.4rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--card);
    box-shadow: var(--shadow-soft), inset 0 0 24px rgba(34, 211, 238, 0.05);
    backdrop-filter: blur(6px);
}

.kpi-card::before {
    content: "";
    position: absolute;
    top: -10%;
    right: -5%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.22), rgba(14, 165, 233, 0.04));
}

.accent-card::before {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.22), rgba(34, 211, 238, 0.06));
}

.kpi-label {
    grid-area: label;
    display: block;
    color: var(--muted);
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.1;
}

.kpi-card small {
    grid-area: note;
    display: block;
    color: var(--muted);
    font-size: 0.62rem;
    font-weight: 650;
    line-height: 1.1;
    opacity: 0.85;
}

.kpi-card strong {
    grid-area: value;
    margin: 0;
    color: var(--primary-text);
    font-size: clamp(1.15rem, 1.8vw, 1.45rem);
    line-height: 1;
    letter-spacing: -0.02em;
    font-weight: 850;
    text-align: right;
    white-space: nowrap;
    text-shadow: 0 0 14px rgba(34, 211, 238, 0.35);
}

.accent-card strong {
    color: var(--gold);
    text-shadow: 0 0 14px rgba(251, 191, 36, 0.35);
}

/* ==================== FILTER BAR ==================== */
.filter-bar {
    flex: 0 0 250px;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--card);
    box-shadow: var(--shadow-soft), inset 0 0 30px rgba(34, 211, 238, 0.05);
    backdrop-filter: blur(10px);
}

.filter-group {
    min-width: 0;
}

.filter-group>label {
    display: block;
    margin-bottom: 0.45rem;
    color: var(--primary-text);
    font-size: 0.72rem;
    font-weight: 850;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.filter-group select,
.reset-btn {
    width: 100%;
    min-height: 44px;
    padding: 0.65rem 0.95rem;
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 999px;
    background: rgba(8, 20, 44, 0.85);
    color: var(--ink);
    font: inherit;
    font-size: 0.92rem;
    font-weight: 730;
    outline: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

/* Native dropdown list items (OS menu) readable on dark */
.filter-group select option {
    background: #0a1f3c;
    color: var(--ink);
}

.filter-group select:hover,
.filter-group select:focus {
    transform: translateY(-1px);
    border-color: var(--cyan);
    background: rgba(12, 28, 58, 0.95);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45), 0 0 14px rgba(34, 211, 238, 0.2);
}

.metric-filter-group {
    display: none !important;
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.checkbox-group label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 36px;
    padding: 0.45rem 0.72rem;
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(13, 30, 60, 0.9), rgba(8, 20, 44, 0.9));
    color: var(--ink);
    font-size: 0.82rem;
    font-weight: 760;
    cursor: pointer;
    user-select: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.checkbox-group label:hover {
    transform: translateY(-1px);
    border-color: rgba(34, 211, 238, 0.5);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4), 0 0 12px rgba(34, 211, 238, 0.15);
}

.checkbox-group input {
    width: 0.95rem;
    height: 0.95rem;
    accent-color: var(--cyan);
}

/* Action button — sci-fi glass that fills with light on hover */
.reset-btn {
    border: 1px solid rgba(34, 211, 238, 0.4);
    background: rgba(34, 211, 238, 0.08);
    color: #aef0ff;
    font-weight: 800;
    letter-spacing: 0.02em;
    box-shadow: inset 0 0 18px rgba(34, 211, 238, 0.1);
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.15s ease,
                box-shadow 0.15s ease,
                color 0.2s ease,
                border-color 0.2s ease;
}

.reset-btn:hover,
.reset-btn:focus {
    transform: translateY(-1px);
    background: linear-gradient(135deg, var(--primary), var(--cyan));
    color: #04122a;
    border-color: transparent;
    box-shadow: 0 10px 26px rgba(34, 211, 238, 0.35);
}

.reset-btn:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(34, 211, 238, 0.3);
}

/* ============================================================
   ============== HOLOGRAPHIC CUBE STAGE ======================
   ============================================================ */
.cube-stage {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: clamp(1rem, 2.5vw, 1.5rem);
    padding: clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2.2rem) 0.25rem;
}

/* Dark projection chamber the hologram floats inside */
.cube-chamber {
    transform: scale(0.75);
    transform-origin: top center;
    position: relative;
    flex: 1 1 560px;
    min-width: 0;
    display: grid;
    place-items: center;
    padding: clamp(1.5rem, 4vw, 2rem) clamp(0.5rem, 3vw, 2rem);
    margin-bottom: -50px;
    border-radius: var(--radius-xl);
    overflow: visible !important;
    /* background:
        radial-gradient(circle at 50% 42%, rgba(20, 60, 110, 0.55), transparent 60%),
        linear-gradient(160deg, #030c1c 0%, #071630 55%, #1c0a06 100%);
    border: 1px solid rgba(34, 211, 238, 0.22);
    box-shadow: inset 0 0 90px rgba(0, 4, 14, 0.9), var(--shadow); */
}

.chamber-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(34, 211, 238, 0.10) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 211, 238, 0.10) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(circle at 50% 50%, black, transparent 72%);
    -webkit-mask-image: radial-gradient(circle at 50% 50%, black, transparent 72%);
    opacity: 0.5;
    pointer-events: none;
}

.cube-viewport {
    position: relative;
    width: var(--cube-size);
    height: var(--cube-size);
    perspective: var(--cube-perspective);
    perspective-origin: 50% 46%;
    cursor: grab;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    z-index: 1;
}

.cube-viewport.is-dragging {
    cursor: grabbing;
}

.cube-shadow {
    position: absolute;
    left: 50%;
    bottom: -4%;
    width: 70%;
    height: 50px;
    transform: translateX(-50%);
    background: radial-gradient(ellipse at center, rgba(34, 211, 238, 0.4), transparent 70%);
    filter: blur(16px);
    pointer-events: none;
    z-index: 0;
}

.cube-scene {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    z-index: 1;
}

.cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(-12deg) rotateY(-24deg);
    transition: transform var(--cube-spin-duration) var(--cube-spin-ease);
}

.cube.no-transition {
    transition: none;
}

/* === HOLOGRAPHIC FACES === */
.cube-face {
    position: absolute; inset: 0;
    width: var(--cube-size); height: var(--cube-size);
    padding: 0.75rem 0.85rem 0.5rem;
    border: 1.5px solid var(--holo-edge);
    border-radius: 20px;
    background:
        linear-gradient(155deg, var(--holo-glass) 0%, var(--holo-glass-2) 100%);
    box-shadow:
        0 0 22px var(--holo-glow),
        inset 0 0 30px rgba(34, 211, 238, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.18);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
    color: var(--holo-ink);
}

.cube-face::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, transparent 26%, transparent 74%, rgba(34, 211, 238, 0.14) 100%);
    pointer-events: none;
}

.cube-face::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.05) 0px, rgba(34, 211, 238, 0.05) 1px, transparent 1px, transparent 4px);
    pointer-events: none;
    opacity: 0.5;
}

.face-front {
    transform: translateZ(calc(var(--cube-size) / 2));
}

.face-back {
    transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));
}

.face-right {
    transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));
}

.face-left {
    transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));
}

.face-top {
    transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));
}

.face-bottom {
    transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));
}

.cube-face.cap {
    background:
        radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.16), transparent 65%),
        linear-gradient(155deg, rgba(7, 22, 46, 0.5), rgba(12, 34, 64, 0.4));
    box-shadow: 0 0 26px var(--holo-glow), inset 0 0 40px rgba(34, 211, 238, 0.16);
}

.cube-face.cap::before {
    background:
        repeating-linear-gradient(45deg, rgba(34, 211, 238, 0.10) 0 2px, transparent 2px 18px);
    opacity: 0.7;
}

/* Face header */
.face-header {
    position: relative; z-index: 2;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: "kicker pill" "title pill";
    column-gap: 0.7rem; align-items: center;
    margin-bottom: 0.25rem;
}

.face-kicker {
    grid-area: kicker;
    color: var(--cyan);
    font-size: 0.66rem;
    text-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
}

.face-header h3 {
    grid-area: title;
    color: var(--holo-ink);
    font-size: clamp(1rem, 1.5vw, 1.35rem);
    font-weight: 850;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-top: 0.15rem;
    text-shadow: 0 0 12px rgba(34, 211, 238, 0.35);
}

.face-year {
    color: var(--cyan);
}

.face-pill {
    grid-area: pill;
    align-self: center;
    padding: 0.35rem 0.65rem;
    border: 1px solid rgba(34, 211, 238, 0.5);
    border-radius: 999px;
    background: rgba(34, 211, 238, 0.1);
    color: var(--cyan);
    font-size: 0.66rem;
    font-weight: 850;
    white-space: nowrap;
}

.face-chart {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    border-radius: 14px;
}

.face-chart svg {
    width: 100%;
    height: 100%;
    display: block;
}

.face-note {
    position: relative; z-index: 2;
    margin-top: 0.35rem;
    padding-top: 0.35rem;
    border-top: 1px solid rgba(34, 211, 238, 0.22);
    color: var(--holo-ink-dim); text-align: center;
    font-size: 0.68rem; font-weight: 650;
}

.cube-face.is-active {
    border-color: #67e8f9;
    box-shadow: 0 0 34px rgba(34, 211, 238, 0.8), inset 0 0 36px rgba(34, 211, 238, 0.2);
}

.cube-viewport.is-dragging .face-chart,
.cube-viewport.is-snapping .face-chart {
    pointer-events: none;
}

/* HUD corner brackets */
.hud-bracket {
    position: absolute;
    width: 26px;
    height: 26px;
    z-index: 3;
    pointer-events: none;
    border-color: var(--holo-edge);
    border-style: solid;
    border-width: 0;
    filter: drop-shadow(0 0 4px var(--holo-glow));
}

.hud-bracket.tl {
    top: -10px;
    left: -10px;
    border-top-width: 2px;
    border-left-width: 2px;
    border-top-left-radius: 6px;
}

.hud-bracket.tr {
    top: -10px;
    right: -10px;
    border-top-width: 2px;
    border-right-width: 2px;
    border-top-right-radius: 6px;
}

.hud-bracket.bl {
    bottom: -10px;
    left: -10px;
    border-bottom-width: 2px;
    border-left-width: 2px;
    border-bottom-left-radius: 6px;
}

.hud-bracket.br {
    bottom: -10px;
    right: -10px;
    border-bottom-width: 2px;
    border-right-width: 2px;
    border-bottom-right-radius: 6px;
}

/* === RIGHT-SIDE CONTROL PANEL === */
.cube-sidebar {
    flex: 0 0 230px;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--card);
    box-shadow: var(--shadow-soft), inset 0 0 30px rgba(34, 211, 238, 0.05);
    backdrop-filter: blur(10px);
    align-self: flex-start;
}

.cube-hint {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.35;
}

.hint-dot {
    flex: 0 0 auto;
    margin-top: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.18);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.18);
    }

    50% {
        box-shadow: 0 0 0 10px rgba(34, 211, 238, 0);
    }
}

.cube-controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.face-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.7rem 0.85rem;
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 14px;
    background: rgba(8, 20, 44, 0.7);
    color: var(--ink);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    text-align: left;
    transition: transform 0.18s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.face-btn:hover {
    transform: translateX(2px);
    color: var(--primary-text);
    border-color: var(--cyan);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4), 0 0 12px rgba(34, 211, 238, 0.18);
}

.face-btn.active {
    background: linear-gradient(135deg, var(--primary), var(--cyan));
    color: #04122a;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 12px 24px rgba(34, 211, 238, 0.3);
}

.btn-num {
    flex: 0 0 auto;
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: rgba(34, 211, 238, 0.16);
    color: var(--primary-text);
    font-size: 0.72rem;
    font-weight: 900;
}

.face-btn.active .btn-num {
    background: rgba(4, 18, 42, 0.35);
    color: #eafdff;
}

.btn-label {
    flex: 1;
}

.auto-toggle {
    width: 100%;
    padding: 0.65rem;
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 14px;
    background: rgba(8, 20, 44, 0.7);
    color: var(--primary-text);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 850;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.auto-toggle:hover {
    border-color: var(--cyan);
    background: rgba(12, 28, 58, 0.9);
}

.auto-toggle[aria-pressed="false"] {
    color: var(--gold);
    border-color: rgba(251, 191, 36, 0.4);
}

.status-block {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(34, 211, 238, 0.14);
}

.status-label {
    color: var(--muted);
    font-size: 0.66rem;
    font-weight: 850;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.status-pill {
    padding: 0.5rem 0.8rem;
    border-radius: 12px;
    text-align: center;
    background: linear-gradient(135deg, #061427, #0a1f3c);
    color: var(--cyan);
    font-size: 0.84rem;
    font-weight: 850;
    box-shadow: inset 0 0 14px rgba(34, 211, 238, 0.25);
    border: 1px solid rgba(34, 211, 238, 0.3);
}

/* ============================================================
   ===== CHART STYLING (light ink for dark holo faces) =======
   ============================================================ */
.face-chart .axis text {
    fill: var(--holo-ink-dim);
    font-size: 11px;
    font-weight: 700;
}

.face-chart .axis path,
.face-chart .axis line {
    stroke: rgba(125, 211, 252, 0.32);
}

.face-chart .grid line {
    stroke: rgba(125, 211, 252, 0.14);
    stroke-dasharray: 3 6;
}

.face-chart .grid path {
    stroke-width: 0;
}

.face-chart .value-label {
    fill: var(--holo-ink);
    font-size: 10px;
    font-weight: 800;
}

.face-chart .legend-item text {
    fill: var(--holo-ink);
    font-weight: 800;
}

.empty-state {
    display: grid;
    place-items: center;
    height: 100%;
    min-height: 220px;
    padding: 1.4rem;
    color: var(--holo-ink-dim);
    text-align: center;
    font-weight: 750;
}

/* Interactive chart elements */
.parliament-seat,
.waffle-cell,
.choro-state,
.stream-layer {
    cursor: pointer;
}

.choro-state {
    stroke: rgba(7, 22, 46, 0.6);
    stroke-width: 0.6;
    transition: opacity 0.2s ease;
}

.choro-state:hover {
    opacity: 1;
    stroke: #67e8f9;
    stroke-width: 1.6;
}


/* ==================== FOOTER & TOOLTIP ==================== */
.dashboard-footer {
    z-index: 1;
    position: relative;
    padding: 0.7rem 2rem 0.8rem;
    color: rgba(200, 226, 252, 0.82);
    text-align: center;
    font-size: 0.75rem;
    background:
        radial-gradient(120% 180% at 50% 100%, rgba(34, 211, 238, 0.12), transparent 60%),
        linear-gradient(0deg, #0a1c40 0%, #081530 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.dashboard-footer::before {
    content: "";
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cyan) 25%, var(--violet-soft) 75%, transparent);
    box-shadow: 0 0 12px rgba(34, 211, 238, 0.45);
    pointer-events: none;
}

svg {
    display: block;
    width: 100%;
    height: auto;
}

.d3-tooltip {
    position: absolute;
    z-index: 9999;
    max-width: 250px;
    padding: 0.7rem 0.9rem;
    border: 1px solid rgba(34, 211, 238, 0.6);
    border-radius: 14px;
    background: rgba(6, 18, 38, 0.95);
    color: #e0f7ff;
    box-shadow: 0 18px 40px rgba(2, 10, 25, 0.5), 0 0 18px rgba(34, 211, 238, 0.3);
    font-size: 0.82rem;
    pointer-events: none;
    backdrop-filter: blur(10px);
}

/* KPI / hero tooltips: fixed-shape box — never reflows by position or text length */
.d3-tooltip.tip-fixed {
    width: 230px;
    max-width: 230px;
    white-space: normal;
    line-height: 1.4;
}

.d3-tooltip b {
    color: #67e8f9;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1180px) {
    .kpi-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .filter-bar {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .road-filter {
        grid-column: 1 / -1;
    }

    :root {
        --cube-size: 460px;
        --cube-perspective: 1600px;
    }
}

@media (max-width: 900px) {

    .cube-stage {
        flex-direction: column;
    }

    .cube-sidebar {
        flex: 1 1 auto;
        width: 100%;
        align-self: stretch;
    }

    .cube-controls {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .face-btn {
        width: auto;
        flex: 1 1 130px;
    }

    .status-block {
        margin-top: 0.5rem;
    }
}

@media (max-width: 760px) {
    .dashboard {
        width: min(100% - 12px, 1500px);
        margin: 6px auto;
        border-radius: 24px;
    }

    .dashboard-header,
    .kpi-grid,
    .filter-bar {
        grid-template-columns: 1fr;
    }

    .hero-panel {
        justify-self: stretch;
    }

    .kpi-grid {
        padding-inline: 0.75rem;
    }

    .filter-bar {
        margin-inline: 0.75rem;
    }

    .kpi-card,
    .filter-bar {
        border-radius: 20px;
    }

    :root {
        --cube-size: min(42vh, 40vw, 540px);
        --cube-perspective: 1200px;
    }

    .cube-stage {
        padding: 0.75rem;
    }

    .cube-chamber {
        padding: 1.3rem;
    }

    .cube-face {
        padding: 0.7rem 0.7rem 0.5rem;
        border-radius: 16px;
    }

    .face-header h3 {
        font-size: 0.92rem;
    }

    .face-kicker {
        font-size: 0.58rem;
    }

    .face-pill {
        font-size: 0.58rem;
        padding: 0.28rem 0.48rem;
    }

    .face-note {
        font-size: 0.64rem;
    }

    .dashboard-footer {
        padding: 1rem;
    }
}

@media (max-width: 380px) {
    :root {
        --cube-size: min(270px, calc(100vw - 44px));
    }

    .cube-face {
        padding: 0.5rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .cube {
        transition: none !important;
    }

    .hint-dot {
        animation: none;
    }
}
