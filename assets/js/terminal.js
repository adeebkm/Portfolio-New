// Terminal Simulator Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set the date display in the terminal
  const dateElement = document.getElementById('terminal-date');
  if (dateElement) {
    dateElement.textContent = new Date().toLocaleString();
  }

  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  // Prevent terminal from taking focus when scrolling to the section
  // Only focus the terminal input when explicitly clicking on the terminal
  const terminalContainer = document.getElementById('terminal-container');
  if (terminalContainer) {
    // Explicitly mark that the user clicked in the terminal
    let userClickedTerminal = false;
    
    terminalContainer.addEventListener('click', function(e) {
      // Prevent focus if clicking on a link inside terminal output
      if (e.target.tagName.toLowerCase() === 'a') {
        return;
      }
      
      userClickedTerminal = true;
      terminalInput.focus();
    });
    
    // Prevent automatic focus when scrolling to the terminal section
    terminalInput.addEventListener('focus', function(e) {
      if (!userClickedTerminal) {
        terminalInput.blur();
      }
      // Reset the flag after use
      userClickedTerminal = false;
    });
  }

  // Terminal command history
  let commandHistory = [];
  let historyIndex = -1;

  // Custom commands data
  const commands = {
    help: {
      description: 'Display a list of available commands',
      usage: 'help',
      action: function() {
        let output = 'Available commands:\n\n';
        
        Object.keys(commands).sort().forEach(cmd => {
          output += `<span class="command-highlight">${cmd}</span> - ${commands[cmd].description}\n`;
        });
        
        output += '\nType "help [command]" to learn more about a specific command.';
        return output;
      }
    },
    about: {
      description: 'Display information about me',
      usage: 'about',
      action: function() {
        return `<span class="command-highlight">Adeeb Khaja Mohamed</span>
                
Full Stack Developer & Data Analyst

I'm a graduate student pursuing an MS in Data Analytics Engineering at George Mason University. 
I recently completed my undergraduate degree in Information Science at Ramaiah Institute of Technology, 
where I built a strong foundation in software development and data analytics through impactful 
projects and hands-on experiences.

My goal is to leverage my academic knowledge, technical skills, and leadership experience to drive 
impactful solutions in technology and analytics, with the long-term vision of establishing my own 
tech enterprise to deliver meaningful innovations.`;
      }
    },
    skills: {
      description: 'List my technical skills',
      usage: 'skills [category]',
      details: 'Categories: all, frontend, backend, data, tools',
      action: function(args) {
        const skills = {
          frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Sass', 'Tailwind CSS', 'styled-components'],
          backend: ['Django', 'Node.js', 'Express', 'Python', 'SQL'],
          data: ['Data Analytics', 'Machine Learning', 'TensorFlow', 'AWS'],
          tools: ['Git', 'Docker', 'Microsoft Office', 'Figma']
        };
        
        const category = args[0] ? args[0].toLowerCase() : 'all';
        
        if (category === 'all') {
          let output = 'My Skills:\n\n';
          
          Object.keys(skills).forEach(cat => {
            output += `<span class="command-highlight">${cat.toUpperCase()}</span>:\n`;
            output += skills[cat].join(', ') + '\n\n';
          });
          
          return output;
        } else if (skills[category]) {
          return `<span class="command-highlight">${category.toUpperCase()}</span> Skills:\n${skills[category].join(', ')}`;
        } else {
          return `<span class="command-error">Error:</span> Unknown category "${category}". Try "skills all" or see "help skills" for available categories.`;
        }
      }
    },
    projects: {
      description: 'List my projects',
      usage: 'projects [category]',
      details: 'Categories: all, web, ai, iot',
      action: function(args) {
        const projects = {
          web: [
            { name: 'Bubble Bop', description: 'Food Dine In Platform' },
            { name: 'Compass Careers', description: 'AI-Powered Career Platform' }
          ],
          ai: [
            { name: 'DAIM', description: 'Decentralized AI Marketplace' },
            { name: 'Spoiler Detection System', description: 'AI-Powered Content Analysis' },
            { name: 'Bi-Directional Translation', description: 'Advanced NLP Research' },
            { name: 'Compass Careers', description: 'AI-Powered Career Platform' }
          ],
          iot: [
            { name: 'GPS Tracking System', description: 'Raspberry Pi IoT Solution' }
          ]
        };
        
        const category = args[0] ? args[0].toLowerCase() : 'all';
        
        if (category === 'all') {
          let output = 'My Projects:\n\n';
          
          Object.keys(projects).forEach(cat => {
            output += `<span class="command-highlight">${cat.toUpperCase()}</span>:\n`;
            projects[cat].forEach(project => {
              output += `- ${project.name}: ${project.description}\n`;
            });
            output += '\n';
          });
          
          return output;
        } else if (projects[category]) {
          let output = `<span class="command-highlight">${category.toUpperCase()}</span> Projects:\n`;
          projects[category].forEach(project => {
            output += `- ${project.name}: ${project.description}\n`;
          });
          return output;
        } else {
          return `<span class="command-error">Error:</span> Unknown category "${category}". Try "projects all" or see "help projects" for available categories.`;
        }
      }
    },
    contact: {
      description: 'Display my contact information',
      usage: 'contact',
      action: function() {
        return `<span class="command-highlight">Contact Information:</span>

Email: adeeb@example.com
LinkedIn: linkedin.com/in/adeebkm
GitHub: github.com/adeebkm
Instagram: instagram.com/adeebk.m`;
      }
    },
    experience: {
      description: 'Display my work experience',
      usage: 'experience',
      action: function() {
        return `<span class="command-highlight">Work Experience:</span>

- Resource Operations Head at Under 25 (Dec 2022 - Mar 2023)
- GDSC-Core Member at Google Developer Student Club (Apr 2023 - May 2024)
- Research Intern at Indian Institute of Science (Oct 2023 - Jun 2024)
- Application Developer at Journyz (Jan 2023 - Apr 2023)
- Lead at ClutchRIT Esports (Mar 2022 - May 2024)

Type "exp [company]" for more details about a specific experience.`;
      }
    },
    exp: {
      description: 'Get details about a specific experience',
      usage: 'exp [company]',
      details: 'Companies: under25, gdsc, iisc, journyz, clutch',
      action: function(args) {
        if (!args.length) {
          return `<span class="command-error">Error:</span> Please specify a company. See "help exp" for usage.`;
        }
        
        const experiences = {
          under25: {
            title: 'Resource Operations Head',
            company: 'Under-25',
            date: 'Dec 2022 - Mar 2023',
            description: `Led a 30-member team in managing both technological and physical resources effectively. 
Utilized predictive analytics for accurate resource forecasting and conducted regression 
analysis to assess demand. Enhanced leadership skills and deepened understanding of 
operational research in strategic resource management.`
          },
          gdsc: {
            title: 'GDSC-Core Member',
            company: 'Google Developer Student Club Ramaiah Institute of Technology',
            date: 'Apr 2023 - May 2024',
            description: `Contributed to a Google Developers program for university students. The program focused on 
teaching mobile and web development skills, design thinking, and leadership. By leveraging 
GDSC, we aimed to enhance students' employability through valuable development training.`
          },
          iisc: {
            title: 'Research Intern',
            company: 'Indian Institute of Science',
            date: 'Oct 2023 - Jun 2024',
            description: `Contributed to the advancement of unmanned aerial vehicle technologies and airspace 
algorithms, focusing on optimizing urban air mobility. Integrated advanced pathfinding 
algorithms within air traffic management systems to mitigate collision risks. Developed a 
Django and Docker-based web application to demonstrate 4D pathfinding for urban air mobility.`
          },
          journyz: {
            title: 'Application Developer',
            company: 'Journyz',
            date: 'Jan 2023 - Apr 2023',
            description: `Enhanced the digital platform's operational efficiency by designing and developing key 
mobile application features using React Native. Troubleshooted and improved app 
functionalities, and iteratively refined the user experience based on feedback. Utilized 
Figma to create detailed wireframes, further supporting the app's development process.`
          },
          clutch: {
            title: 'Lead',
            company: 'ClutchRIT Esports',
            date: 'Mar 2022 - May 2024',
            description: `Led ClutchRIT Esports, gaining valuable experience in the esports industry. Organized and 
hosted events, managed social media accounts, and promoted the organization's brand. 
Coordinated with team members, volunteers, external partners, and sponsors.`
          }
        };
        
        const company = args[0].toLowerCase();
        const exp = experiences[company];
        
        if (exp) {
          return `<span class="command-highlight">${exp.title} at ${exp.company}</span>
${exp.date}

${exp.description}`;
        } else {
          return `<span class="command-error">Error:</span> Unknown company "${args[0]}". Try "experience" to see all companies or "help exp" for usage.`;
        }
      }
    },
    clear: {
      description: 'Clear the terminal screen',
      usage: 'clear',
      action: function() {
        terminalOutput.innerHTML = '';
        return false; // Don't append any output
      }
    },
    echo: {
      description: 'Display a message',
      usage: 'echo [message]',
      action: function(args) {
        return args.join(' ');
      }
    },
    date: {
      description: 'Display the current date and time',
      usage: 'date',
      action: function() {
        return `Current date and time: ${new Date().toLocaleString()}`;
      }
    },
    whoami: {
      description: 'Display current user',
      usage: 'whoami',
      action: function() {
        return 'visitor@adeeb-portfolio';
      }
    },
    social: {
      description: 'Display my social media links',
      usage: 'social',
      action: function() {
        return `<span class="command-highlight">Social Media:</span>

LinkedIn: <a href="https://www.linkedin.com/in/adeebkm/" target="_blank">linkedin.com/in/adeebkm</a>
GitHub: <a href="https://github.com/adeebkm" target="_blank">github.com/adeebkm</a>
Instagram: <a href="https://www.instagram.com/adeebk.m/" target="_blank">instagram.com/adeebk.m</a>`;
      }
    },
    ls: {
      description: 'List directories',
      usage: 'ls',
      action: function() {
        return `<span class="command-highlight">Directory Contents:</span>

about/
projects/
skills/
experience/
contact.txt
resume.pdf`;
      }
    },
    cat: {
      description: 'Read file contents',
      usage: 'cat [filename]',
      action: function(args) {
        if (!args.length) {
          return `<span class="command-error">Error:</span> Missing filename. Usage: cat [filename]`;
        }
        
        const filename = args[0].toLowerCase();
        
        if (filename === 'contact.txt') {
          return commands.contact.action();
        } else if (filename === 'resume.pdf') {
          return `<span class="command-highlight">Resume:</span>

My resume is available for download on my LinkedIn profile.
Visit <a href="https://www.linkedin.com/in/adeebkm/" target="_blank">linkedin.com/in/adeebkm</a>`;
        } else {
          return `<span class="command-error">Error:</span> File not found: ${filename}`;
        }
      }
    }
  };

  // Set up command execution handler
  terminalInput.addEventListener('keydown', function(e) {
    // If Enter key is pressed
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      
      // Add command to history if not empty
      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
      
        // Process command
        processCommand(command);
        
        // Clear input field
        terminalInput.value = '';
      }
    }
    
    // Handle up/down arrow for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  // Process a command
  function processCommand(commandText) {
    // Add command to output
    appendOutput(`<span class="terminal-prompt">adeeb@portfolio:~$</span> ${commandText}`);
    
    // Parse command and arguments
    const parts = commandText.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Execute command if it exists
    if (commands[cmd]) {
      const result = commands[cmd].action(args);
      
      // Only append result if it's not false (used by clear command)
      if (result !== false) {
        appendOutput(result);
      }
    } else if (cmd === '') {
      // Do nothing for empty command
    } else {
      appendOutput(`<span class="command-error">Error:</span> Command not found: ${cmd}. Type 'help' to see available commands.`);
    }
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Append text to terminal output
  function appendOutput(text) {
    const outputEl = document.createElement('p');
    outputEl.innerHTML = text;
    terminalOutput.appendChild(outputEl);
  }
}); 