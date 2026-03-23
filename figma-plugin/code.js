// ================================================================
//  AP Portfolio Generator
//  Generates "Homepage — Dark" frame based on the HTML prototype.
//  Run once, then edit freely in Figma.
// ================================================================

(async function () {

  // ── FONT LOADING ──────────────────────────────────────────────
  let FAM = 'Space Grotesk';
  try {
    await figma.loadFontAsync({ family: 'Space Grotesk', style: 'Light' });
    await figma.loadFontAsync({ family: 'Space Grotesk', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Space Grotesk', style: 'Medium' });
  } catch (_) {
    FAM = 'Inter';
    await figma.loadFontAsync({ family: 'Inter', style: 'Light' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  }

  const REG = { family: FAM, style: 'Regular' };
  const MED = { family: FAM, style: 'Medium' };
  const LGT = { family: FAM, style: 'Light' };

  // ── COLOR HELPERS ─────────────────────────────────────────────
  const BG     = { r: 0.039, g: 0.039, b: 0.039 }; // #0A0A0A
  const FG     = { r: 0.925, g: 0.918, b: 0.894 }; // #ECEAE4
  const BORDER = FG; // same, low opacity

  const fill  = (c, a = 1) => [{ type: 'SOLID', color: c, opacity: a }];
  const noFill = () => [];

  // ── DOM HELPERS ───────────────────────────────────────────────
  const W   = 1440;
  const PAD = 48;

  function fr(name, w, h, fills = noFill()) {
    const f = figma.createFrame();
    f.name = name;
    f.resize(w, Math.max(h, 1));
    f.fills = fills;
    f.clipsContent = false;
    return f;
  }

  function rect(w, h, color, opacity = 1) {
    const r = figma.createRectangle();
    r.resize(w, Math.max(h, 1));
    r.fills = fill(color, opacity);
    return r;
  }

  function txt(content, size, font, color, opacity = 1, opts = {}) {
    const t = figma.createText();
    t.fontName = font;
    t.fontSize = size;
    t.characters = content;
    t.fills = fill(color, opacity);
    if (opts.ls)   t.letterSpacing = opts.ls;
    if (opts.lh)   t.lineHeight    = opts.lh;
    if (opts.case) t.textCase      = opts.case;
    if (opts.w)    t.resize(opts.w, t.height);
    return t;
  }

  function rule(w, opacity = 0.08) {
    return rect(w, 1, BORDER, opacity);
  }

  function place(parent, node, x, y) {
    node.x = Math.round(x);
    node.y = Math.round(y);
    parent.appendChild(node);
  }

  // ── ROOT FRAME ────────────────────────────────────────────────
  const root = fr('Portfolio Homepage — Dark', W, 100, fill(BG));
  figma.currentPage.appendChild(root);
  let Y = 0; // vertical cursor

  // ═══════════════════════════════════════════════════════════════
  //  SECTION 1 — HEADER (overlay, sits at y=0)
  // ═══════════════════════════════════════════════════════════════
  {
    const H = 68;
    const sec = fr('Header', W, H, fill(BG, 0));

    // Name
    const name = txt('Anton Pepelyaev', 12, MED, FG, 1, {
      ls: { value: 2.5, unit: 'PERCENT' },
    });
    place(sec, name, PAD, (H - name.height) / 2);

    // Nav links
    const navItems = ['Contact', 'About', 'Works⁴'];
    let nx = W - PAD - 108; // offset for theme pill
    for (const label of navItems) {
      const t = txt(label, 12, REG, FG, 0.42);
      place(sec, t, nx - t.width, (H - t.height) / 2);
      nx = nx - t.width - 36;
    }

    // Theme toggle pill
    const pill = fr('Theme Toggle', 96, 30, fill(FG, 0.08));
    pill.cornerRadius = 15;
    const pillTxt = txt('○  Light', 11, REG, FG, 0.42, {
      ls: { value: 6, unit: 'PERCENT' },
    });
    place(pill, pillTxt, 12, (30 - pillTxt.height) / 2);
    place(sec, pill, W - PAD - 96, (H - 30) / 2);

    sec.x = 0; sec.y = 0;
    root.appendChild(sec);
    // Header is overlay — does NOT advance Y
  }

  // ═══════════════════════════════════════════════════════════════
  //  SECTION 2 — HERO
  // ═══════════════════════════════════════════════════════════════
  {
    const HERO_H = 900;
    const sec = fr('Hero', W, HERO_H);

    // Eyebrow label
    const eyebrow = txt(
      'Art Direction  ·  Brand Identity  ·  Visual Systems',
      11, REG, FG, 0.42,
      { ls: { value: 10, unit: 'PERCENT' }, case: 'UPPER' }
    );
    place(sec, eyebrow, PAD, 336);

    // Three hero lines
    const heroLines = [
      'Design with',
      '10+ years of experience',
      'at fintech|',
    ];
    const LINE_SIZE = 112;
    const LINE_STEP = 108; // tight leading
    heroLines.forEach((line, i) => {
      const t = txt(line, LINE_SIZE, MED, FG, 1, {
        ls: { value: -3.5, unit: 'PERCENT' },
      });
      place(sec, t, PAD, 376 + i * LINE_STEP);
    });

    // Description
    const desc = txt(
      'Building brands, digital experiences, and visual systems\n' +
      'that communicate with precision —\n' +
      'where every detail carries intent.',
      14, REG, FG, 0.42,
      { lh: { value: 165, unit: 'PERCENT' } }
    );
    place(sec, desc, PAD, 718);

    // Scroll hint
    const scrollLine = rect(36, 1, FG, 0.14);
    place(sec, scrollLine, PAD, 822);
    const scrollTxt = txt('Scroll', 11, REG, FG, 0.14, {
      ls: { value: 10, unit: 'PERCENT' }, case: 'UPPER',
    });
    place(sec, scrollTxt, PAD + 50, 816);

    // Bottom rule
    place(sec, rule(W - PAD * 2), PAD, HERO_H - 1);

    sec.x = 0; sec.y = Y;
    root.appendChild(sec);
    Y += HERO_H;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SECTION 3 — WORKS
  // ═══════════════════════════════════════════════════════════════
  {
    const projects = [
      { name: 'Project Name', cat: 'Brand Identity',    year: '2024' },
      { name: 'Project Name', cat: 'Digital Experience', year: '2023' },
      { name: 'Project Name', cat: 'Editorial Design',  year: '2023' },
      { name: 'Project Name', cat: 'Art Direction',     year: '2022' },
    ];

    const TOP_PAD = 88;
    const LABEL_H = 52;
    const ROW_H   = 110;
    const BOT_PAD = 88;
    const SEC_H   = TOP_PAD + LABEL_H + ROW_H * projects.length + BOT_PAD;

    const sec = fr('Works', W, SEC_H);

    // Section label
    const lbl = txt('Selected Works', 11, MED, FG, 0.42, {
      ls: { value: 12, unit: 'PERCENT' }, case: 'UPPER',
    });
    place(sec, lbl, PAD, TOP_PAD);

    const meta = txt('2022 — 2024', 11, REG, FG, 0.14);
    place(sec, meta, W - PAD - meta.width, TOP_PAD);

    // Header rule
    place(sec, rule(W - PAD * 2), PAD, TOP_PAD + lbl.height + 10);

    // Project rows
    projects.forEach((proj, i) => {
      const ry = TOP_PAD + LABEL_H + i * ROW_H;

      // Project name
      const nameT = txt(proj.name, 52, REG, FG, 1, {
        ls: { value: -2.5, unit: 'PERCENT' },
      });
      place(sec, nameT, PAD, ry + (ROW_H - nameT.height) / 2);

      // Category
      const catT = txt(proj.cat, 13, REG, FG, 0.42);
      place(sec, catT, PAD + 370, ry + (ROW_H - catT.height) / 2 + 4);

      // Year
      const yearT = txt(proj.year, 13, REG, FG, 0.42);
      place(sec, yearT, W - PAD - yearT.width - 36, ry + (ROW_H - yearT.height) / 2 + 4);

      // Arrow
      const arrowT = txt('↗', 18, REG, FG, 0.42);
      place(sec, arrowT, W - PAD - arrowT.width, ry + (ROW_H - arrowT.height) / 2 + 2);

      // Row rule
      place(sec, rule(W - PAD * 2), PAD, ry + ROW_H);
    });

    sec.x = 0; sec.y = Y;
    root.appendChild(sec);
    Y += SEC_H;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SECTION 4 — ABOUT
  // ═══════════════════════════════════════════════════════════════
  {
    const SEC_H = 360;
    const sec = fr('About', W, SEC_H);

    // Top rule (full width)
    place(sec, rule(W), 0, 0);

    // Bio text
    const bio = txt(
      'Art director and designer based in Moscow.\n' +
      'Focused on brand identity, editorial systems,\n' +
      'and digital experiences — built on the belief\n' +
      'that visual clarity is a form of respect.',
      24, REG, FG, 1,
      {
        lh: { value: 150, unit: 'PERCENT' },
        ls: { value: -1, unit: 'PERCENT' },
      }
    );
    place(sec, bio, PAD, 72);

    // Detail rows
    const details = [
      ['Based in',      'Moscow, Russia'],
      ['Available for', 'Freelance & Consulting'],
      ['Experience',    '10+ years'],
      ['Specialisation','Brand, Editorial, Digital'],
    ];

    const COL2 = W / 2 + 40;
    details.forEach(([label, val], i) => {
      const dy = 72 + i * 54;

      const lbl = txt(label, 13, REG, FG, 0.42);
      place(sec, lbl, COL2, dy);

      const v = txt(val, 13, MED, FG, 1);
      place(sec, v, W - PAD - 240, dy);

      if (i < details.length - 1) {
        const dr = rule(W / 2 - 40);
        place(sec, dr, COL2, dy + 40);
      }
    });

    sec.x = 0; sec.y = Y;
    root.appendChild(sec);
    Y += SEC_H;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SECTION 5 — FOOTER
  // ═══════════════════════════════════════════════════════════════
  {
    const SEC_H = 80;
    const sec = fr('Footer', W, SEC_H);

    // Top rule
    place(sec, rule(W), 0, 0);

    // Email
    const email = txt('hello@pepelyaev.com', 13, REG, FG, 0.42);
    place(sec, email, PAD, (SEC_H - email.height) / 2);

    // Copyright
    const copy = txt('© 2024 Anton Pepelyaev', 11, REG, FG, 0.14);
    place(sec, copy, W / 2 - copy.width / 2, (SEC_H - copy.height) / 2 + 1);

    // Social links
    const socials = ['LinkedIn', 'Instagram', 'Behance'];
    let sx = W - PAD;
    for (const s of socials) {
      const t = txt(s, 12, REG, FG, 0.42);
      sx -= t.width + 28;
      place(sec, t, sx + 28, (SEC_H - t.height) / 2);
    }

    sec.x = 0; sec.y = Y;
    root.appendChild(sec);
    Y += SEC_H;
  }

  // ── RESIZE ROOT TO CONTENT HEIGHT ────────────────────────────
  root.resize(W, Y);

  // ── ZOOM TO FIT ───────────────────────────────────────────────
  figma.viewport.scrollAndZoomIntoView([root]);

  figma.notify('✦ Portfolio Homepage — Dark created! Replace "Project Name" with real projects.', {
    timeout: 5000,
  });

  figma.closePlugin();
})();
