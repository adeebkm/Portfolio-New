// Skill Tree Visualization
document.addEventListener('DOMContentLoaded', function() {
  const skillTreeContainer = document.getElementById('skill-tree-visualization');
  const skillDetailTitle = document.getElementById('skill-detail-title');
  const skillDetailDescription = document.getElementById('skill-detail-description');
  const skillDetailConnections = document.getElementById('skill-detail-connections');
  
  if (!skillTreeContainer) return;
  
  // Skill data definition
  const skills = [
    {
      id: 'html',
      name: 'HTML',
      category: 'frontend',
      description: 'HTML is a markup language, where we mark elements to define what information the page will display.',
      x: 25,
      y: 30,
      connections: ['css', 'js']
    },
    {
      id: 'css',
      name: 'CSS',
      category: 'frontend',
      description: 'CSS is a style sheet language made up of layers, created for the purpose of styling pages.',
      x: 45,
      y: 20,
      connections: ['sass', 'tailwind', 'styled']
    },
    {
      id: 'js',
      name: 'JavaScript',
      category: 'frontend',
      description: 'JavaScript is a programming language that allows you to implement dynamic elements on web pages.',
      x: 35,
      y: 50,
      connections: ['react', 'next', 'typescript', 'node']
    },
    {
      id: 'sass',
      name: 'Sass',
      category: 'frontend',
      description: 'Sass is a CSS preprocessor that adds some features that aren\'t available natively.',
      x: 60,
      y: 10,
      connections: ['styled']
    },
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      description: 'React is a JavaScript library focused on creating componentized user interfaces.',
      x: 55,
      y: 40,
      connections: ['next', 'styled', 'radix', 'typescript']
    },
    {
      id: 'next',
      name: 'Next.js',
      category: 'frontend',
      description: 'Next.js is a web framework that enables functionality like server-side rendering and static website generation for React-based web sites.',
      x: 70,
      y: 50,
      connections: ['react', 'node']
    },
    {
      id: 'styled',
      name: 'styled-components',
      category: 'frontend',
      description: 'styled-components is a library that uses the concept of CSS-in-JS, that is, it allows us to write CSS codes inside JavaScript.',
      x: 80,
      y: 20,
      connections: ['react']
    },
    {
      id: 'tailwind',
      name: 'Tailwind',
      category: 'frontend',
      description: 'Tailwind CSS is a CSS framework that provides us with utility classes for the purpose of styling pages.',
      x: 65,
      y: 30,
      connections: ['css']
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      description: 'TypeScript is a superset of JavaScript that includes features that are not natively present in the language, in addition to making it static.',
      x: 50,
      y: 70,
      connections: ['js', 'react', 'node']
    },
    {
      id: 'radix',
      name: 'Radix',
      category: 'frontend',
      description: 'Radix is a library that provides accessible, unstyled components for building React applications.',
      x: 60,
      y: 60,
      connections: ['react']
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'backend',
      description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that allows JavaScript to be run on the server-side.',
      x: 30,
      y: 75,
      connections: ['express', 'js']
    },
    {
      id: 'express',
      name: 'Express',
      category: 'backend',
      description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
      x: 15,
      y: 65,
      connections: ['node', 'mongodb']
    },
    {
      id: 'django',
      name: 'Django',
      category: 'backend',
      description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design with a model-template-view architectural pattern.',
      x: 20,
      y: 50,
      connections: ['python', 'sql']
    },
    {
      id: 'python',
      name: 'Python',
      category: 'backend',
      description: 'Python is a high-level, interpreted programming language known for its readability and versatility across various domains.',
      x: 20,
      y: 30,
      connections: ['django', 'tensorflow', 'data_analytics']
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'backend',
      description: 'SQL is a domain-specific language for managing and querying relational database systems, enabling efficient data manipulation and retrieval.',
      x: 10,
      y: 40,
      connections: ['django', 'data_analytics', 'mongodb']
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'backend',
      description: 'MongoDB is a document-oriented NoSQL database used for high volume data storage and flexible schema design.',
      x: 5,
      y: 55,
      connections: ['express', 'node']
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      category: 'data',
      description: 'TensorFlow is an open-source library for numerical computation and machine learning, enabling development of AI applications.',
      x: 35,
      y: 15,
      connections: ['python', 'machine_learning']
    },
    {
      id: 'data_analytics',
      name: 'Data Analytics',
      category: 'data',
      description: 'Data Analytics involves analyzing raw data to extract meaningful insights and support decision-making processes.',
      x: 10,
      y: 20,
      connections: ['python', 'sql', 'machine_learning', 'aws']
    },
    {
      id: 'machine_learning',
      name: 'Machine Learning',
      category: 'data',
      description: 'Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience.',
      x: 25,
      y: 5,
      connections: ['tensorflow', 'data_analytics', 'python']
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'tools',
      description: 'Amazon Web Services is a comprehensive cloud platform offering over 200 services for computing, storage, databases, and more.',
      x: 5,
      y: 5,
      connections: ['data_analytics', 'docker']
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'tools',
      description: 'Docker is a platform for developing, shipping, and running applications in containers for improved consistency and efficiency.',
      x: 15,
      y: 80,
      connections: ['aws', 'git']
    },
    {
      id: 'git',
      name: 'Git',
      category: 'tools',
      description: 'Git is a distributed version control system for tracking changes in source code during software development.',
      x: 45,
      y: 90,
      connections: ['docker', 'github']
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'tools',
      description: 'GitHub is a platform that provides hosting for software development version control using Git.',
      x: 75,
      y: 80,
      connections: ['git']
    },
    {
      id: 'office',
      name: 'Microsoft Office',
      category: 'tools',
      description: 'Microsoft Office is a suite of productivity software including Word, Excel, PowerPoint, and other applications for document creation and data analysis.',
      x: 90,
      y: 90,
      connections: ['data_analytics']
    }
  ];
  
  // Create the skill nodes and connections
  function createSkillTree() {
    const containerWidth = skillTreeContainer.clientWidth;
    const containerHeight = skillTreeContainer.clientHeight;
    
    // Calculate the actual pixel positions
    skills.forEach(skill => {
      skill.pixelX = (skill.x / 100) * containerWidth;
      skill.pixelY = (skill.y / 100) * containerHeight;
    });
    
    // Create connections first so they appear behind nodes
    skills.forEach(skill => {
      skill.connections.forEach(targetId => {
        const targetSkill = skills.find(s => s.id === targetId);
        if (targetSkill) {
          createConnection(skill, targetSkill);
        }
      });
    });
    
    // Create nodes
    skills.forEach(skill => {
      createSkillNode(skill);
    });
  }
  
  // Create a skill node
  function createSkillNode(skill) {
    const node = document.createElement('div');
    node.className = `skill-node ${skill.category}`;
    node.textContent = skill.name;
    node.dataset.id = skill.id;
    
    node.style.left = `${skill.pixelX}px`;
    node.style.top = `${skill.pixelY}px`;
    node.style.transform = 'translate(-50%, -50%)';
    
    node.addEventListener('click', () => showSkillDetails(skill));
    
    skillTreeContainer.appendChild(node);
  }
  
  // Create a connection line between skills
  function createConnection(sourceSkill, targetSkill) {
    const connection = document.createElement('div');
    connection.className = 'skill-connection';
    
    const dx = targetSkill.pixelX - sourceSkill.pixelX;
    const dy = targetSkill.pixelY - sourceSkill.pixelY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    connection.style.width = `${length}px`;
    connection.style.left = `${sourceSkill.pixelX}px`;
    connection.style.top = `${sourceSkill.pixelY}px`;
    
    // Calculate angle in radians and convert to degrees
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    connection.style.transform = `rotate(${angle}deg)`;
    
    skillTreeContainer.appendChild(connection);
  }
  
  // Show skill details when a node is clicked
  function showSkillDetails(skill) {
    // Highlight the selected node
    document.querySelectorAll('.skill-node').forEach(node => {
      node.classList.remove('selected');
    });
    document.querySelector(`.skill-node[data-id="${skill.id}"]`).classList.add('selected');
    
    // Update skill details panel
    skillDetailTitle.textContent = skill.name;
    skillDetailDescription.textContent = skill.description;
    
    // Clear previous connections
    skillDetailConnections.innerHTML = '';
    
    // Add connected skills
    const connectedSkills = skill.connections.map(id => skills.find(s => s.id === id)).filter(Boolean);
    
    if (connectedSkills.length > 0) {
      const heading = document.createElement('h4');
      heading.textContent = 'Related Skills:';
      skillDetailConnections.appendChild(heading);
      
      connectedSkills.forEach(connectedSkill => {
        const pill = document.createElement('span');
        pill.className = `connection-pill ${connectedSkill.category}`;
        pill.textContent = connectedSkill.name;
        pill.addEventListener('click', () => showSkillDetails(connectedSkill));
        skillDetailConnections.appendChild(pill);
      });
    }
  }
  
  // Handle window resize
  function handleResize() {
    // Clear the container
    skillTreeContainer.innerHTML = '';
    
    // Recreate the skill tree
    createSkillTree();
    
    // Reset skill details
    skillDetailTitle.textContent = 'Select a skill';
    skillDetailDescription.textContent = 'Click on any skill node to see details about it and how it connects to other skills.';
    skillDetailConnections.innerHTML = '';
  }
  
  // Initial creation
  createSkillTree();
  
  // Show a random skill on load
  const randomSkill = skills[Math.floor(Math.random() * skills.length)];
  setTimeout(() => showSkillDetails(randomSkill), 1000);
  
  // Add resize listener
  window.addEventListener('resize', handleResize);
});

// Add CSS for selected skill node
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .skill-node.selected {
      transform: scale(1.2) translate(-40%, -40%) !important;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5) !important;
      z-index: 10;
    }
  </style>
`); 