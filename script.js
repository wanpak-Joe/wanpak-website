// ============================================================
//  wanpak OFFICIAL WEBSITE — script.js
// ============================================================

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.reveal');
    let delay = 0;
    siblings.forEach(el => {
      if (el === entry.target) entry.target.style.transitionDelay = delay + 'ms';
      delay += 100;
    });
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ===== COUNTDOWN TIMER =====
// Target: 2026年7月19日 10:00:00 JST（1stプロダクト公開日 / CEO確定 2026-06-18）
const TARGET = new Date('2026-07-19T10:00:00+09:00');

function pad(n) { return String(n).padStart(2, '0'); }

let revealed = false;

function reveal() {
  if (revealed) return;
  revealed = true;

  // カウントダウンブロックを非表示
  const cdWrap = document.querySelector('.cd-wrap');
  if (cdWrap) cdWrap.style.display = 'none';

  // teaserセクション背景を濃紺（#262262）に切り替え
  const teaser = document.getElementById('teaser');
  if (teaser) teaser.style.background = '#262262';

  // タイトル（decisions.md 2026-06-18 確定コピー）
  const title = document.querySelector('.teaser-title');
  if (title) title.textContent = '1st プロダクト公開';

  // 紹介文（確定コピー）
  const desc = document.querySelector('.teaser-desc');
  if (desc) {
    desc.innerHTML = 'あなたの為に設計された勝つ為の一足<br><span style="font-size:0.9em;opacity:0.75">競輪・トラック競技のための、フルカスタムシューズ。あなたの足型を起点に、"調整"ではなく"設計"する一足。</span>';
  }

  // ボタンをプロダクトページへのリンクに差し替え
  const btn = document.getElementById('btn-subscribe');
  if (btn) {
    const link = document.createElement('a');
    link.href = 'product.html';
    link.className = btn.className;
    link.style.cssText = 'background:#ff3131;border-color:#ff3131;color:#fff;text-decoration:none;display:inline-block;';
    link.textContent = 'プロダクトページへ →';
    btn.parentNode.replaceChild(link, btn);
  }

  // 続報フォームも非表示
  const formWrap = document.getElementById('subscribe-form-wrap');
  if (formWrap) formWrap.style.display = 'none';
}

function updateCountdown() {
  const diff = TARGET - new Date();
  if (diff <= 0) {
    reveal();
    return;
  }
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== CONTACT FORM =====
const form = document.querySelector('.contact-form');
if (form) {
  const isEN = form.getAttribute('name') === 'contact-en';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = isEN ? 'Sending...' : '送信中...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (response.ok) {
        form.innerHTML = isEN
          ? '<div class="form-success"><span class="form-success-icon">✓</span><p>Thank you for your message.<br>We will get back to you shortly.</p></div>'
          : '<div class="form-success"><span class="form-success-icon">✓</span><p>お問い合わせを受け付けました。<br>担当者よりご連絡いたします。</p></div>';
      } else {
        throw new Error('server_' + response.status);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      btn.textContent = isEN ? 'Send' : '送信する';
      btn.disabled = false;
      btn.style.opacity = '1';
      alert(isEN
        ? 'An error occurred. Please try again later or email us directly at info@wanpak.jp.'
        : '送信中にエラーが発生しました。時間をおいて再度お試しいただくか、info@wanpak.jp までご連絡ください。');
    }
  });
}

// ===== NEWS MODAL =====
const newsModal        = document.getElementById('news-modal');
const newsModalContent = newsModal ? newsModal.querySelector('.news-modal-content') : null;
const newsModalClose   = newsModal ? newsModal.querySelector('.news-modal-close') : null;
const newsModalOverlay = newsModal ? newsModal.querySelector('.news-modal-overlay') : null;

function openNewsModal(templateId) {
  const tmpl = document.getElementById(templateId);
  if (!tmpl || !newsModal) return;
  newsModalContent.innerHTML = '';
  newsModalContent.appendChild(tmpl.content.cloneNode(true));
  newsModal.classList.add('open');
  newsModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  newsModalClose && newsModalClose.focus();
}

function closeNewsModal() {
  if (!newsModal) return;
  newsModal.classList.remove('open');
  newsModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// 未来日付のニュースを非表示（公開日になったら自動表示）
document.querySelectorAll('.news-item[data-modal]').forEach(btn => {
  const timeEl = btn.querySelector('time.news-date');
  if (timeEl) {
    const dateStr = timeEl.textContent.trim().replace(/\./g, '-');
    const itemDate = new Date(dateStr + 'T12:00:00+09:00');
    if (itemDate > new Date()) {
      btn.style.display = 'none';
      return;
    }
  }
  btn.addEventListener('click', () => openNewsModal(btn.dataset.modal));
});

if (newsModalClose)   newsModalClose.addEventListener('click', closeNewsModal);
if (newsModalOverlay) newsModalOverlay.addEventListener('click', closeNewsModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && newsModal && newsModal.classList.contains('open')) closeNewsModal();
});

// ===== SUBSCRIBE INLINE FORM =====
// Google Apps Script Web App URL（デプロイ後に差し替え）
const SUBSCRIBE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxcvXG-CZPPpV-YaiNoqzYVkcSDi0yORXwbmN5ahqaYbd4Te3rUxnguury0d3jfowhLiA/exec';

const btnSubscribe      = document.getElementById('btn-subscribe');
const subscribeWrap     = document.getElementById('subscribe-form-wrap');
const subscribeForm     = document.getElementById('subscribe-form');
const btnClose          = document.getElementById('btn-subscribe-close');
const subscribeSuccess  = document.getElementById('subscribe-success');
const sfEmailInput      = document.getElementById('sf-email');
const sfEmailError      = document.getElementById('sf-email-error');

const openText  = btnSubscribe ? (btnSubscribe.dataset.openText  || btnSubscribe.textContent) : '';
const closeText = btnSubscribe ? (btnSubscribe.dataset.closeText || 'Close ×') : '';
const errorText = btnSubscribe ? (btnSubscribe.dataset.errorText || '') : '';

function openSubscribeForm() {
  subscribeWrap.classList.add('open');
  subscribeWrap.removeAttribute('aria-hidden');
  btnSubscribe.textContent = closeText;
  setTimeout(() => sfEmailInput && sfEmailInput.focus(), 350);
}

function closeSubscribeForm() {
  subscribeWrap.classList.remove('open');
  subscribeWrap.setAttribute('aria-hidden', 'true');
  btnSubscribe.textContent = openText;
}

if (btnSubscribe) {
  btnSubscribe.addEventListener('click', () => {
    subscribeWrap.classList.contains('open') ? closeSubscribeForm() : openSubscribeForm();
  });
}

if (btnClose) {
  btnClose.addEventListener('click', closeSubscribeForm);
}

if (subscribeForm) {
  subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation
    const email = sfEmailInput.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (sfEmailError && errorText) sfEmailError.textContent = errorText;
    sfEmailInput.classList.toggle('is-error', !emailOk);
    sfEmailError.classList.toggle('visible', !emailOk);
    if (!emailOk) { sfEmailInput.focus(); return; }

    const submitBtn = subscribeForm.querySelector('.btn-sf-submit');
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;

    const payload = {
      email,
      name:        document.getElementById('sf-name').value.trim(),
      affiliation: document.getElementById('sf-affil').value.trim(),
      timestamp:   new Date().toISOString(),
      source:      'wanpak.jp/teaser'
    };

    try {
      await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',                        // Apps Script は CORS 非対応のため no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // no-cors では response は常に opaque → 成功と見なして完了表示
      subscribeForm.hidden = true;
      subscribeSuccess.hidden = false;
    } catch (err) {
      console.error('Subscribe error:', err);
      submitBtn.textContent = '送信する';
      submitBtn.disabled = false;
      alert('送信中にエラーが発生しました。時間をおいて再度お試しください。');
    }
  });
}
