export function typeWrite(elemento, phrases, baseDelay = 2000) {
  let phraseIndex = 0;
  let letterIndex = 0;
  const type = () => {
      const currentPhrase = phrases[phraseIndex];
      const currentLetters = currentPhrase.slice(0, ++letterIndex);
      elemento.textContent = currentLetters;

      // Adjust speed based on the length of the phrase
      let typingSpeed = currentPhrase.length > 50 ? 50 : 75;

      if (currentLetters.length === currentPhrase.length) {
          setTimeout(() => {
              erase();
          }, baseDelay);
      } else {
          setTimeout(type, typingSpeed);
      }
  };

  const erase = () => {
      const currentPhrase = phrases[phraseIndex];
      const currentLetters = currentPhrase.slice(0, --letterIndex);
      elemento.textContent = currentLetters;

      // Adjust speed based on the length of the phrase
      let erasingSpeed = currentPhrase.length > 50 ? 25 : 50;

      if (currentLetters.length === 0) {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          letterIndex = 0;
          setTimeout(type, 500);
      } else {
          setTimeout(erase, erasingSpeed);
      }
  };

  type();
}
  