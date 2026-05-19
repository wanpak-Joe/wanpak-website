# Hero セクション バックアップ（画像なし・元の状態）
> 作成日: 2026-04-23 / split hero 実装前の状態
> 元に戻す場合: 以下のコードをそれぞれのファイルに貼り戻す

---

## 1. index.html / en/index.html — HERO セクション

### JP版（index.html の `<!-- ===== HERO ===== -->` を丸ごと置き換え）

```html
  <!-- ===== HERO ===== -->
  <section id="hero">
    <div class="hero-grid-bg"></div>
    <div class="hero-glow"></div>
    <div class="hero-content">
      <p class="hero-eyebrow">MASS CUSTOMIZATION PLATFORM</p>
      <h1 class="hero-title">
        「ちょうどいい」は、<br>もういらない。
      </h1>
      <p class="hero-os">新しいモノづくりのOSを、社会実装する。</p>
      <p class="hero-sub">
        職人技×デジタル技術で、その人のための道具を生み出す。<br>
        必要な人に、必要なものを、必要なだけ。
      </p>
      <div class="hero-actions">
        <a href="#brand" class="btn-red">wanpakについて</a>
        <a href="#contact" class="btn-ghost">お問い合わせ</a>
      </div>
    </div>
    <div class="scroll-hint">
      <span>SCROLL</span>
      <div class="scroll-line"></div>
    </div>
  </section>
```

### EN版（en/index.html の `<!-- ===== HERO ===== -->` を丸ごと置き換え）

```html
  <!-- ===== HERO ===== -->
  <section id="hero">
    <div class="hero-grid-bg"></div>
    <div class="hero-glow"></div>
    <div class="hero-content">
      <p class="hero-eyebrow">MASS CUSTOMIZATION PLATFORM</p>
      <h1 class="hero-title">
        Good enough<br>is no longer good enough.
      </h1>
      <p class="hero-os">Implementing a new OS for manufacturing.</p>
      <p class="hero-sub">
        Artisanal craft × digital technology — crafting tools made for each person.<br>
        To the right person, the right thing, in the right amount.
      </p>
      <div class="hero-actions">
        <a href="#brand" class="btn-red">About wanpak</a>
        <a href="#contact" class="btn-ghost">Contact Us</a>
      </div>
    </div>
    <div class="scroll-hint">
      <span>SCROLL</span>
      <div class="scroll-line"></div>
    </div>
  </section>
```

---

## 2. style.css — HERO セクション（`/* HERO */` ブロック全体を置き換え）

```css
/* ============================================================
   HERO — dark navy (intentional: brand anchor)
   ============================================================ */
#hero {
  min-height: 100vh; background: var(--navy);
  display: flex; align-items: center; position: relative; overflow: hidden;
  padding: 9rem 2.5rem 6rem;
}
.hero-grid-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 64px 64px;
}
.hero-glow {
  position: absolute; width: 700px; height: 700px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,49,49,0.1) 0%, transparent 65%);
  top: 40%; left: 15%; transform: translate(-50%, -50%); pointer-events: none;
}
.hero-content { max-width: 1080px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
```

また style.css の `@media (max-width: 768px)` 内から以下の行を削除:
```css
  /* Hero split: stack vertically on mobile */
  .hero-split { flex-direction: column; }
  .hero-divider-line { left: 0; right: 0; top: 50%; bottom: auto; width: 100%; height: 2px; transform: translateY(-50%); }
  .hero-panel--left .hero-panel-label  { left: 1.5rem; bottom: 1.5rem; }
  .hero-panel--right .hero-panel-label { right: 1.5rem; bottom: 1.5rem; }
```

---

## 変更点サマリー（split hero で追加した要素）

| ファイル | 追加した要素 |
|---------|------------|
| index.html | `.hero-split` / `.hero-panel` × 2 / `.hero-divider-line` / `.hero-panel-label` |
| en/index.html | 同上（`../` パス） |
| style.css | `.hero-split` / `.hero-panel` / `.hero-panel-img` / `.hero-panel-overlay` / `.hero-panel--left/right` / `.hero-panel-label` / `.hero-divider-line` / `@media` 内の4行 |
| hp/ | `hero_craftsman.png` / `hero_3dprint.png` / `hero_3dprint..png`（元ファイル） |
