import { initScrollReveal } from "./scrollReveal.js";
import { hoverChangeExperience } from "./hoverChangeExperience.js";
import { typeWrite } from "./typeWrite.js";
import { hoverChangeDescription } from "./hoverChangeDescription.js";
import { menu } from "./menu.js";

menu();
initScrollReveal();
typeWrite(document.querySelector(".typewriter"));

hoverChangeExperience(
  ".digitalhouse",
  `Coordinated resource allocation and scheduling for diverse projects and events.
  Orchestrated cross-functional collaboration between sales, marketing, and operations teams to optimize supply chain.
  Maintained a clear communication channel and ensured timely delivery of necessary resources.`,
  "Resource Operational Leader",
  "Under-25",
  "Dec 2022 - Mar 2023"
);

hoverChangeExperience(
  ".zuplae",
  `As a GDSC core member, I contributed to a Google Developers program for university students. The program focused on teaching mobile and web development skills, design thinking, and leadership. By leveraging GDSC, we aimed to enhance students' employability through valuable  development training.`,
  "GDSC-Core Member",
  "Google Developer Student Club Ramaiah Institute of Technology",
  "April 2023 - Present"
);

hoverChangeExperience(
  ".codigofontetv",
  `Led ClutchRIT Esports, gaining valuable experience in the esports industry. Organized and hosted events,
  managed social media accounts, and promoted the organization’s brand. Coordinated with team members,
  volunteers, external partners, and sponsors. Developed skills in leadership, communication, event planning, and
  marketing.`,
  "Lead",
  "ClutchRIT Esports",
  "Mar 2022 - Present"
);

hoverChangeExperience(
  ".contweb",
  `As Director of Business Development at Sigma Distributors since August 2023, I am instrumental in fostering strategic partnerships and expanding our distribution network. Leveraging our key supplier relationships with industry giants like Nestlé, Tata Tea, and Kaff, I drive growth by connecting high-quality products to retail stores, ensuring seamless supply chain operations.`,
  "Director of Business Development",
  "Sigma Distributors",
  "Aug 2023 - Present"
);

hoverChangeDescription(
  ".html",
  "HTML is a markup language, where we mark elements to define what information the page will display."
);
hoverChangeDescription(
  ".css",
  "CSS is a style sheet language made up of “layers”, created for the purpose of styling pages."
);
hoverChangeDescription(
  ".js",
  "JavaScript is a programming language that allows you to implement dynamic elements on web pages."
);
hoverChangeDescription(
  ".sass",
  "Sass is a CSS preprocessor that adds some features that aren't available natively."
);
hoverChangeDescription(
  ".react",
  "React is a JavaScript library focused on creating componentized user interfaces."
);
hoverChangeDescription(
  ".next",
  "Next.js is a web framework that enables functionality like server-side rendering and static website generation for React-based web sites."
);
hoverChangeDescription(
  ".styled",
  "styled-components is a library that uses the concept of CSS-in-JS, that is, it allows us to write CSS codes inside Javascript."
);
hoverChangeDescription(
  ".tailwind",
  "Tailwind CSS is a CSS framework that provides us with utility classes for the purpose of styling pages."
);
hoverChangeDescription(
  ".typescript",
  "TypeScript is a superset of JavaScript that includes features that are not natively present in the language, in addition to making it static."
);
hoverChangeDescription(
  ".radix",
  "Radix is ​​a library that provides accessible, unstyled components for building React applications."
);



const checkbox = document.querySelector('.my-form input[type="checkbox"]');
const btns = document.querySelectorAll(".my-form button");

checkbox.addEventListener("change", function() {
  const checked = this.checked;
  for (const btn of btns) {
    checked ? (btn.disabled = false) : (btn.disabled = true);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const evangaImage = document.getElementById("logo");

  // Use a setTimeout to add a slight delay before increasing the opacity
  setTimeout(function () {
    evangaImage.style.opacity = "1";
  }, 100); // You can adjust the delay (in milliseconds) as needed
});

const audio = document.getElementById("audio");
const evangaImage = document.getElementById("logo");
let isPlaying = false;

evangaImage.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(error => {
      // Handle any errors here if autoplay is blocked
      console.error(error);
    });
    isPlaying = true;
  }
});
