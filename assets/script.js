(function(){
	const toggle = document.querySelector('.nav-toggle');
	const menu = document.getElementById('primary-menu');
	const links = document.querySelectorAll('.nav-link');
	const year = document.getElementById('year');

	year && (year.textContent = String(new Date().getFullYear()));

	// Mobile menu toggle
	if (toggle && menu) {
		toggle.addEventListener('click', () => {
			const open = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!open));
			menu.classList.toggle('show', !open);
		});
		// Close menu on link click
		menu.addEventListener('click', (e) => {
			const a = e.target.closest('a');
			if (!a) return;
			toggle.setAttribute('aria-expanded','false');
			menu.classList.remove('show');
		});
	}

	// Smooth scroll
	links.forEach(a => {
		a.addEventListener('click', (e) => {
			const href = a.getAttribute('href');
			if (!href || !href.startsWith('#')) return;
			const target = document.querySelector(href);
			if (!target) return;
			e.preventDefault();
			target.scrollIntoView({behavior:'smooth', block:'start'});
			history.replaceState(null, '', href);
		});
	});

	// Active link on scroll
	const sections = Array.from(document.querySelectorAll('main section[id]'));
	const setActive = () => {
		const pos = window.scrollY + 96;
		let activeId = '';
		for (const sec of sections) {
			const top = sec.offsetTop;
			if (pos >= top) activeId = sec.id;
		}
		links.forEach(l => l.classList.toggle('active', l.dataset.section === activeId));
	};
	setActive();
	window.addEventListener('scroll', setActive, {passive:true});
})();
