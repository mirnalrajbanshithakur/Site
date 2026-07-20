document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark');
    if (themeToggle) themeToggle.checked = true;
  }

  const brandLogo = document.querySelector('.brand-logo');

  function updateLogo(useDarkTheme) {
    if (!brandLogo) return;
    const darkSrc = brandLogo.dataset.dark;
    const lightSrc = brandLogo.dataset.light;
    if (!darkSrc || !lightSrc) return;
    brandLogo.src = useDarkTheme ? lightSrc : darkSrc;
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      const isDark = themeToggle.checked;
      body.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateLogo(isDark);
    });
  }

  updateLogo(savedTheme === 'dark');

  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.scrollIntoView({ behavior: 'auto' });
  }

  const typewriterElement = document.querySelector('.typing-text');
  const typewriterText = ['Professional UI/UX Designer', 'Frontend Developer', 'Web & Graphics Designer', 'Photographer'];
  let phraseIndex = 0;
  let charIndex = 0;
  const typingSpeed = 70;
  const erasingSpeed = 60;
  const delayBetweenPhrases = 1500;

  function typeWriter() {
    if (!typewriterElement) return;

    const currentPhrase = typewriterText[phraseIndex];
    if (charIndex < currentPhrase.length) {
      typewriterElement.textContent += currentPhrase.charAt(charIndex);
      charIndex += 1;
      setTimeout(typeWriter, typingSpeed);
    } else {
      setTimeout(eraseWriter, delayBetweenPhrases);
    }
  }

  function eraseWriter() {
    if (!typewriterElement) return;

    if (charIndex > 0) {
      typewriterElement.textContent = typewriterText[phraseIndex].substring(0, charIndex - 1);
      charIndex -= 1;
      setTimeout(eraseWriter, erasingSpeed);
    } else {
      phraseIndex = (phraseIndex + 1) % typewriterText.length;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  typeWriter();
});
