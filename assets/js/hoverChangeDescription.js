export function hoverChangeDescription(nameCard, text) {
  console.log(`Setting up hover for ${nameCard} with text: ${text}`);
  
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    // Define a function to set up hover that can be called multiple times
    const setupHover = function() {
      var changeDescription = document.querySelector(".changeDescription");
      
      if (!changeDescription) {
        console.error("Element with class 'changeDescription' not found");
        return;
      }
      
      var card = document.querySelector(nameCard);
      if (!card) {
        console.error(`Element with selector '${nameCard}' not found`);
        return;
      }
      
      console.log(`Successfully found elements for ${nameCard}, adding event listeners`);
      
      // Remove any existing event listeners to prevent duplicates
      const handleMouseOver = function() {
        changeDescription.innerHTML = text;
        changeDescription.style.opacity = "1";
        console.log(`Mouseover on ${nameCard}: Changed text to "${text}"`);
      };
      
      const handleMouseOut = function() {
        changeDescription.innerHTML = `*hover mouse cursor over card to read*`;
        console.log(`Mouseout on ${nameCard}: Reset text`);
      };
      
      // Store the handlers on the element to allow removal later
      if (card._hoverHandler) {
        card.removeEventListener("mouseover", card._hoverHandler);
      }
      if (card._outHandler) {
        card.removeEventListener("mouseout", card._outHandler);
      }
      
      // Store new handlers
      card._hoverHandler = handleMouseOver;
      card._outHandler = handleMouseOut;
      
      // Add the event listeners
      card.addEventListener("mouseover", card._hoverHandler);
      card.addEventListener("mouseout", card._outHandler);
      
      // Make sure cursor shows this is interactive
      card.style.cursor = 'pointer';
      
      // Force an initial setup check
      console.log(`Hover functionality set up for ${nameCard}`);
    };
    
    // Try immediately and also with a series of delays to ensure DOM is ready
    setupHover();
    
    // Also try with increasing delays
    setTimeout(setupHover, 500);
    setTimeout(setupHover, 1000);
    setTimeout(setupHover, 2000);
  });
  
  // Also try on window load as a final safety measure
  window.addEventListener('load', function() {
    setTimeout(function() {
      var changeDescription = document.querySelector(".changeDescription");
      var card = document.querySelector(nameCard);
      
      if (changeDescription && card) {
        const handleMouseOver = function() {
          changeDescription.innerHTML = text;
          changeDescription.style.opacity = "1";
        };
        
        const handleMouseOut = function() {
          changeDescription.innerHTML = `*hover mouse cursor over card to read*`;
        };
        
        // Store the handlers on the element to allow removal later
        if (card._hoverHandler) {
          card.removeEventListener("mouseover", card._hoverHandler);
        }
        if (card._outHandler) {
          card.removeEventListener("mouseout", card._outHandler);
        }
        
        // Store new handlers
        card._hoverHandler = handleMouseOver;
        card._outHandler = handleMouseOut;
        
        // Add the event listeners
        card.addEventListener("mouseover", card._hoverHandler);
        card.addEventListener("mouseout", card._outHandler);
        
        // Make sure cursor shows this is interactive
        card.style.cursor = 'pointer';
      }
    }, 500);
  });
}
