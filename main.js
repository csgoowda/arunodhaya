/* ═══════════════════════════════════════════════════
   ARUNODAYA CAFE — MAIN.JS (Premium Edition)
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Ultra-Premium Motion Engine ────────────────── */
    
    // Magnetic Buttons Interaction
    const magneticElements = document.querySelectorAll('.nav-link, .cat-btn, .c-btn, .s-btn, .spin-btn');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
            el.style.transition = 'transform 0.1s var(--ease-elite)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.5s var(--ease-elite)';
        });
    });

    // Custom Luxury Ripple
    document.addEventListener('click', e => {
        const ripple = document.createElement('div');
        ripple.className = 'elite-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });


    /* ═══════════════════════════════════════════════════
       1. ELITE SCROLL REVEAL (Observer)
    ═══════════════════════════════════════════════════ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.sr').forEach(el => revealObserver.observe(el));


    /* ═══════════════════════════════════════════════════
       2. CINEMATIC STORY (Modular Engine)
    ═══════════════════════════════════════════════════ */
    const frames = document.querySelectorAll('.story-frame');
    const dots = document.querySelectorAll('.s-dot');
    let currentFrame = 0;
    let storyInterval;

    const switchFrame = (index) => {
        frames[currentFrame].classList.remove('active');
        dots[currentFrame]?.classList.remove('active');
        currentFrame = index;
        frames[currentFrame].classList.add('active');
        dots[currentFrame]?.classList.add('active');
    };

    const nextFrame = () => switchFrame((currentFrame + 1) % frames.length);

    const startStory = () => {
        clearInterval(storyInterval);
        storyInterval = setInterval(nextFrame, 5000);
    };

    const stopStory = () => clearInterval(storyInterval);

    const storySection = document.getElementById('micro-story');
    if (storySection) {
        const observer = new IntersectionObserver((entries) => {
            entries[0].isIntersecting ? startStory() : stopStory();
        }, { threshold: 0.5 });
        observer.observe(storySection);

        storySection.addEventListener('click', nextFrame);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            switchFrame(i);
            startStory();
        });
    });

    // Discovery Anchor (replacing swipe hint)
    const swipeHint = document.getElementById('swipeUpHint');
    if (swipeHint) {
        swipeHint.addEventListener('click', () => {
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        });
    }


    /* ═══════════════════════════════════════════════════
       3. ELITE MENU ENGINE (Filter + Search)
    ═══════════════════════════════════════════════════ */
    const cards = document.querySelectorAll('.menu-card');
    const catBtns = document.querySelectorAll('.cat-btn');
    const searchInput = document.getElementById('menuSearch');
    const noResults = document.getElementById('noResults');
    const showMoreBtn = document.getElementById('showMoreBtn');

    let activeCategory = 'all';
    let searchQuery = '';
    let maxVisible = 4;
    let showAll = false;

    const updateMenu = () => {
        let matchedCards = [];
        cards.forEach(card => {
            const categories = (card.dataset.cat || '').toLowerCase();
            const itemName = (card.dataset.name || '').toLowerCase();
            const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
            const matchesSearch = searchQuery === '' || itemName.includes(searchQuery) || categories.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                matchedCards.push(card);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => card.style.display = 'none', 400);
            }
        });

        const totalMatched = matchedCards.length;
        const toShow = showAll ? totalMatched : Math.min(maxVisible, totalMatched);

        matchedCards.forEach((card, index) => {
            if (index < toShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => card.style.display = 'none', 400);
            }
        });

        if (showMoreBtn) {
            showMoreBtn.style.display = totalMatched > maxVisible && !showAll ? 'block' : 'none';
        }
        if (noResults) noResults.classList.toggle('visible', totalMatched === 0);
    };

    catBtns.forEach(btn => btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.cat;
        showAll = false;
        updateMenu();
    }));

    searchInput?.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase().trim();
        showAll = false;
        updateMenu();
    });

    showMoreBtn?.addEventListener('click', () => {
        showAll = true;
        updateMenu();
    });

    const reviewBtn = document.getElementById('reviewBtn');
    reviewBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.getElementById('feedback');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        reviewBtn.classList.add('clicked');
        setTimeout(() => reviewBtn.classList.remove('clicked'), 900);
    });

    // Interactive Hover Elevation (Replacing 3D tilt with cleaner elevation)
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });


    /* ═══════════════════════════════════════════════════
       4. SMART FEEDBACK SYSTEM
    ═══════════════════════════════════════════════════ */
    const starBtns   = document.querySelectorAll('.star-btn');
    const ratingLbl  = document.getElementById('ratingLabel');
    const starsBlock = document.getElementById('starsBlock');
    const pHigh      = document.getElementById('pHigh');
    const pLow       = document.getElementById('pLow');
    const pOk        = document.getElementById('pOk');
    const pLowIco    = document.getElementById('pLowIco');
    const pLowTitle  = document.getElementById('pLowTitle');
    const pLowDesc   = document.getElementById('pLowDesc');
    const fbForm     = document.getElementById('fbForm');

    const hints = ['','Terrible 😞','Poor 😕','Okay 🙂','Great 😊','Amazing ❤️'];

    let selRating = 0;

    const showPanel = (p) => {
        [pHigh,pLow,pOk].forEach(x => x?.classList.add('hidden'));
        p?.classList.remove('hidden');
    };

    const resetAll = () => {
        selRating = 0;
        starBtns.forEach(b => b.classList.remove('lit','selected'));
        if (ratingLbl) { ratingLbl.textContent = 'Tap a star to rate'; ratingLbl.classList.remove('active'); }
        starsBlock.style.display = '';
        showPanel(null);
    };

    starBtns.forEach(btn => {
        const val = +btn.dataset.v;

        btn.addEventListener('mouseenter', () => {
            if (selRating) return;
            starBtns.forEach(b => b.classList.toggle('lit', +b.dataset.v <= val));
            if (ratingLbl) { ratingLbl.textContent = hints[val]; ratingLbl.classList.add('active'); }
        });

        btn.addEventListener('mouseleave', () => {
            if (selRating) return;
            starBtns.forEach(b => b.classList.remove('lit'));
            if (ratingLbl) { ratingLbl.textContent = 'Tap a star to rate'; ratingLbl.classList.remove('active'); }
        });

        btn.addEventListener('click', () => {
            selRating = val;
            starBtns.forEach(b => {
                b.classList.remove('lit');
                b.classList.toggle('lit', +b.dataset.v <= val);
            });
            btn.classList.add('selected');
            if (ratingLbl) ratingLbl.textContent = hints[val];

            setTimeout(() => {
                starsBlock.style.display = 'none';
                if (val >= 4) {
                    showPanel(pHigh);
                } else {
                    if      (val === 1) { pLowIco.textContent='🚨'; pLowTitle.textContent='We Sincerely Apologise!'; pLowDesc.textContent='Your complaint is our top priority. Please share every detail.'; }
                    else if (val === 2) { pLowIco.textContent='😟'; pLowTitle.textContent="We're Very Sorry";        pLowDesc.textContent='Help us understand what went wrong.'; }
                    else                { pLowIco.textContent='😕'; pLowTitle.textContent='Help Us Improve';         pLowDesc.textContent="We'd love to hear your feedback."; }
                    showPanel(pLow);
                }
            }, 700);
        });
    });

    fbForm?.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('fbName')?.value.trim() || 'Anonymous';
        const phone = document.getElementById('fbPhone')?.value.trim() || 'N/A';
        const msg   = document.getElementById('fbMsg')?.value.trim() || '';
        if (!msg) {
            const el = document.getElementById('fbMsg');
            if (el) { el.style.borderColor='rgba(248,113,113,.6)'; setTimeout(()=>el.style.borderColor='',2000); }
            return;
        }
        // Telegram integration — replace before going live
        const urgency = selRating === 1 ? '🚨 URGENT — ' : '';
        const text = encodeURIComponent(`${urgency}⭐ Rating: ${selRating}/5\n👤 ${name}\n📞 ${phone}\n💬 ${msg}`);
        const BOT = 'YOUR_BOT_TOKEN', CHAT = 'YOUR_CHAT_ID';
        fetch(`https://api.telegram.org/bot${BOT}/sendMessage?chat_id=${CHAT}&text=${text}`).catch(()=>{});
        showPanel(pOk);
    });

    document.getElementById('rHigh')?.addEventListener('click', resetAll);
    document.getElementById('rLow')?.addEventListener('click', resetAll);
    document.getElementById('rOk')?.addEventListener('click', resetAll);

        /* ─── Interactive Fluid Stir ───────────────────────── */
    const mouseGlow = document.getElementById('mouseGlow');
    if (mouseGlow) {
        document.addEventListener('mousemove', e => {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top  = e.clientY + 'px';
        });
    }



    /* ═══════════════════════════════════════════════════
       6. CAFFEINE CATCH MINI-GAME
    ═══════════════════════════════════════════════════ */

    /* ═══════════════════════════════════════════════════
       6. CAFFEINE CATCH 2.0 (Elite Gaming Engine)
    ═══════════════════════════════════════════════════ */
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const startBtn = document.getElementById('startGameBtn');
        const restartBtn = document.getElementById('restartGameBtn');
        const overlay = document.getElementById('gameOverlay');
        const resultOverlay = document.getElementById('gameResult');
        const scoreEl = document.getElementById('gameScore');
        const loyaltyEl = document.getElementById('loyaltyPts');

        // Game State
        let score = 0, level = 1, lives = 3, gameActive = false, frame = 0;
        let speedMult = 1.0, shakeAmount = 0;
        let player = { x: 160, y: 440, w: 80, h: 50 };
        let items = [], particles = [];
        let loyalty = parseInt(localStorage.getItem('arndy_loyalty') || '0');
        if (loyaltyEl) loyaltyEl.textContent = loyalty;

        const drawBean = (x, y) => {
            ctx.shadowBlur = 15; ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
            ctx.fillStyle = '#C0A080';
            ctx.beginPath(); ctx.ellipse(x + 15, y + 15, 10, 15, Math.PI / 4, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 2; ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const drawIce = (x, y) => {
            ctx.shadowBlur = 10; ctx.shadowColor = '#80D8FF';
            ctx.fillStyle = 'rgba(179, 229, 252, 0.8)';
            ctx.fillRect(x, y, 30, 30);
            ctx.strokeStyle = '#00B0FF'; ctx.strokeRect(x, y, 30, 30);
            ctx.shadowBlur = 0;
        };

        const spawnParticles = (x, y, color) => {
            for (let i = 0; i < 8; i++) {
                particles.push({
                    x, y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                    life: 1.0, color, size: Math.random() * 4 + 2
                });
            }
        };

        const update = () => {
            if (!gameActive) return;
            frame++; shakeAmount *= 0.9;
            if (frame % Math.max(10, 40 - level * 2) === 0) {
                const isIce = Math.random() < (0.2 + level * 0.05);
                items.push({ x: Math.random() * (canvas.width - 40), y: -40, type: isIce ? 'ice' : 'bean', speed: (3 + Math.random() * 2) * speedMult, size: 30 });
            }

            items.forEach((item, i) => {
                item.y += item.speed;
                if (item.y + item.size > player.y && item.x + item.size > player.x && item.x < player.x + player.w) {
                    if (item.type === 'bean') {
                        score++; scoreEl.textContent = score;
                        if (score % 5 === 0) { level++; speedMult += 0.25; }
                        spawnParticles(item.x + 15, item.y + 15, '#FFD700');
                    } else {
                        lives--; shakeAmount = 15;
                        spawnParticles(item.x + 15, item.y + 15, '#00B0FF');
                        if (lives <= 0) endGame(false);
                    }
                    items.splice(i, 1);
                } else if (item.y > canvas.height) items.splice(i, 1);
            });

            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy; p.life -= 0.03;
                if (p.life <= 0) particles.splice(i, 1);
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            if (shakeAmount > 1) ctx.translate((Math.random() - 0.5) * shakeAmount, (Math.random() - 0.5) * shakeAmount);

            particles.forEach(p => { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); });
            ctx.globalAlpha = 1;
            items.forEach(item => item.type === 'bean' ? drawBean(item.x, item.y) : drawIce(item.x, item.y));

            // Draw Player
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.strokeStyle = lives > 1 ? '#FFD700' : '#FF5252';
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.roundRect(player.x, player.y, player.w, player.h, 10); ctx.fill(); ctx.stroke();
            ctx.font = '24px serif'; ctx.fillText('🥤', player.x + 25, player.y + 35);
            
            // Stats Overlay (Internal)
            ctx.fillStyle = '#fff'; ctx.font = '12px Outfit'; ctx.fillText(`LEVEL ${level} | HEALTH ${'❤️'.repeat(lives)}`, 10, 20);
            
            ctx.restore();
            if (gameActive) requestAnimationFrame(() => { update(); draw(); });
        };

        const startGame = () => {
            score = 0; level = 1; lives = 3; speedMult = 1.0;
            scoreEl.textContent = '0'; items = []; particles = [];
            gameActive = true; overlay.classList.add('hidden'); resultOverlay.classList.add('hidden');
            draw();
        };

        const endGame = (win) => {
            gameActive = false;
            resultOverlay.classList.remove('hidden');
            const title = document.getElementById('resultTitle'), msg = document.getElementById('resultMsg'), icon = document.getElementById('resultIcon');
            if (score >= 20 || win) {
                loyalty += 10; localStorage.setItem('arndy_loyalty', loyalty);
                if (loyaltyEl) loyaltyEl.textContent = loyalty;
                title.textContent = "Cafe Champion! 🏆"; icon.textContent = "🔥";
                msg.textContent = `Amazing! You scored ${score}. +10 Points earned!`;
            } else {
                title.textContent = "Game Over!"; icon.textContent = "💔";
                msg.textContent = `You reached Level ${level} with ${score} beans. Try again!`;
            }
        };

        const handleMove = (x) => {
            const rect = canvas.getBoundingClientRect();
            player.x = (x - rect.left) - player.w / 2;
            player.x = Math.max(0, Math.min(player.x, canvas.width - player.w));
        };

        canvas.addEventListener('mousemove', e => handleMove(e.clientX));

        // Touch Controls for Mobile Perfection
        canvas.addEventListener('touchstart', e => {
            if (gameActive) e.preventDefault();
            handleMove(e.touches[0].clientX);
        }, { passive: false });

        canvas.addEventListener('touchmove', e => {
            if (gameActive) e.preventDefault();
            handleMove(e.touches[0].clientX);
        }, { passive: false });

        startBtn?.addEventListener('click', startGame);
        restartBtn?.addEventListener('click', startGame);
    }

    /* ═══════════════════════════════════════════════════
       7. FOOTER — LIVE STATUS
    ═══════════════════════════════════════════════════ */
    const badge = document.getElementById('openBadge');
    if (badge) {
        const updateBadge = () => {
            const d = new Date(), h = d.getHours(), day = d.getDay();
            const wkd = day===0||day===6;
            const open = h >= (wkd?6:7) && h < (wkd?23:22);
            badge.textContent = open ? '🟢 Open Now' : '🔴 Closed Now';
            badge.className = 'status-badge ' + (open ? 'open' : 'closed');
        };
        updateBadge();
        setInterval(updateBadge, 60000);
    }

});
