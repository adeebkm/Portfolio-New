export function hoverChangeExperience(
  nameCard,
  changeDescription,
  titleExperience,
  companyExperience,
  dateExperience
) {
  // Wait for DOM to be ready before adding click events
  document.addEventListener("DOMContentLoaded", function() {
    const varChangeDescription = document.querySelector(".changeExperience");
    const varTitleExperience = document.querySelector(".titleExperience");
    const varCompanyExperience = document.querySelector(".companyExperience");
    const varDateExperience = document.querySelector(".dateExperience");
    
    const experienceCard = document.querySelector(nameCard);
    
    if (!experienceCard || !varChangeDescription || !varTitleExperience || !varCompanyExperience || !varDateExperience) {
      console.error(`Missing elements for experience card ${nameCard}`);
      return;
    }
    
    experienceCard.addEventListener("click", () => {
      console.log(`Clicked on experience: ${nameCard}`);
      varChangeDescription.innerHTML = changeDescription;
      varCompanyExperience.innerHTML = companyExperience;
      varTitleExperience.innerHTML = titleExperience;
      varDateExperience.innerHTML = dateExperience;
    });
  });
}

// Move the active class code inside DOMContentLoaded to ensure elements exist
document.addEventListener("DOMContentLoaded", function() {
  console.log("Setting up experience tab functionality");
  
  const header = document.getElementById("experience-company");
  if (!header) {
    console.error("Experience company container not found");
    return;
  }
  
  const btns = header.getElementsByClassName("company");
  console.log(`Found ${btns.length} experience company buttons`);
  
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      console.log(`Clicked on company tab: ${this.querySelector('h3').textContent}`);
      
      const current = document.getElementsByClassName("activeExperience");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" activeExperience", "");
      }
      
      this.className += " activeExperience";
    });
  }
});
