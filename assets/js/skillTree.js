// Skill Tree Visualization
document.addEventListener('DOMContentLoaded', function() {
  const skillTreeContainer = document.getElementById('skill-tree-visualization');
  const skillDetailTitle = document.getElementById('skill-detail-title');
  const skillDetailDescription = document.getElementById('skill-detail-description');
  const skillDetailConnections = document.getElementById('skill-detail-connections');
  
  if (!skillTreeContainer) return;
  
  // Add zoom controls to the container
  addZoomControls();
  
  // Add floating particles for background effect
  addFloatingParticles();
  
  // Current zoom level
  let currentZoom = 1;
  
  // Skill data definition
  const skills = [
    // Frontend Skills
    {
      id: 'html',
      name: 'HTML',
      category: 'frontend',
      x: 20,
      y: 15,
      description: 'HTML5 for semantic markup and structured content. Experienced with accessibility best practices and modern HTML features.',
      connections: ['css', 'javascript', 'react', 'bootstrap']
    },
    {
      id: 'css',
      name: 'CSS',
      category: 'frontend',
      x: 35,
      y: 10,
      description: 'Advanced CSS including Flexbox, Grid, animations, and responsive design. Familiar with preprocessors like SASS and CSS-in-JS.',
      connections: ['html', 'javascript', 'react', 'bootstrap']
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'frontend',
      x: 50,
      y: 20,
      description: 'Modern JavaScript (ES6+) including promises, async/await, modules, and DOM manipulation.',
      connections: ['html', 'css', 'react', 'node', 'typescript']
    },
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      x: 65,
      y: 10,
      description: 'Building complex UI with React, including hooks, context API, and state management solutions like Redux.',
      connections: ['javascript', 'typescript', 'node', 'aws']
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap',
      category: 'frontend',
      x: 15,
      y: 35,
      description: 'Creating responsive layouts quickly with Bootstrap components and utilities.',
      connections: ['html', 'css']
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      x: 40,
      y: 30,
      description: 'Using TypeScript for type-safe code, interfaces, and improved developer experience.',
      connections: ['javascript', 'react', 'node']
    },
    
    // Backend Skills
    {
      id: 'node',
      name: 'Node.js',
      category: 'backend',
      x: 75,
      y: 25,
      description: 'Building scalable backend services with Node.js, Express, and related ecosystems.',
      connections: ['javascript', 'typescript', 'mongodb', 'aws', 'sql']
    },
    {
      id: 'python',
      name: 'Python',
      category: 'backend',
      x: 30,
      y: 50,
      description: 'Python for backend development, scripting, and data analysis tasks.',
      connections: ['django', 'sql', 'data-analysis']
    },
    {
      id: 'django',
      name: 'Django',
      category: 'backend',
      x: 15,
      y: 60,
      description: 'Django framework for building secure, scalable web applications with Python.',
      connections: ['python', 'sql', 'aws']
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'backend',
      x: 45,
      y: 60,
      description: 'Database design, complex queries, and optimization across various SQL databases.',
      connections: ['node', 'python', 'django', 'mongodb']
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'backend',
      x: 65,
      y: 45,
      description: 'NoSQL database design, aggregation pipelines, and integration with Node.js applications.',
      connections: ['node', 'aws', 'sql']
    },
    
    // Data Skills
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      category: 'data',
      x: 35,
      y: 75,
      description: 'Analyzing datasets to extract insights using Python libraries and visualization tools.',
      connections: ['python', 'sql', 'visualization']
    },
    {
      id: 'visualization',
      name: 'Data Viz',
      category: 'data',
      x: 20,
      y: 85,
      description: 'Creating informative and interactive data visualizations with D3.js and other libraries.',
      connections: ['data-analysis', 'javascript', 'react']
    },
    
    // Tools Skills
    {
      id: 'git',
      name: 'Git',
      category: 'tools',
      x: 85,
      y: 65,
      description: 'Advanced version control with Git including branching strategies, rebasing, and collaborative workflows.',
      connections: ['github', 'terminal', 'aws']
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'tools',
      x: 90,
      y: 55,
      description: 'GitHub for collaboration including actions, CI/CD pipelines, and project management.',
      connections: ['git', 'aws']
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'tools',
      x: 80,
      y: 40,
      description: 'Deploying and managing applications on AWS using services like EC2, S3, Lambda, and more.',
      connections: ['react', 'node', 'mongodb', 'git', 'github']
    },
    {
      id: 'terminal',
      name: 'Terminal',
      category: 'tools',
      x: 95,
      y: 75,
      description: 'Command line proficiency for development workflows, automation, and system management.',
      connections: ['git', 'aws', 'node']
    },
    {
      id: 'office',
      name: 'Office',
      category: 'tools',
      x: 10,
      y: 75,
      description: 'Advanced proficiency with Microsoft Office suite for documentation, data analysis with Excel, and presentations.',
      connections: ['data-analysis']
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
    skills.forEach((skill, index) => {
      skill.connections.forEach(targetId => {
        const targetSkill = skills.find(s => s.id === targetId);
        if (targetSkill) {
          createConnection(skill, targetSkill);
        }
      });
    });
    
    // Create nodes
    skills.forEach((skill, index) => {
      createSkillNode(skill, index);
    });

    // Add the category class to each legend item
    document.querySelectorAll('.legend-item').forEach(item => {
      const categoryText = item.querySelector('.legend-label').textContent.toLowerCase();
      item.classList.add(categoryText);
      
      // Add click event to filter by category
      item.addEventListener('click', () => {
        filterByCategory(categoryText);
      });
    });
  }
  
  // Filter skills by category
  function filterByCategory(category) {
    // Reset all nodes and connections
    document.querySelectorAll('.skill-node').forEach(node => {
      node.style.opacity = '1';
      node.classList.remove('dimmed');
    });
    
    document.querySelectorAll('.skill-connection').forEach(conn => {
      conn.style.opacity = '0.3';
      conn.classList.remove('dimmed');
    });
    
    // Update active state of legend items
    document.querySelectorAll('.legend-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`.legend-item.${category}`).classList.add('active');
    
    if (category === 'all') {
      // If "all" is selected, just make sure everything is visible
      // Play "all" category sound
      playCategorySound('all');
      return;
    }
    
    // Dim nodes that don't match the category
    document.querySelectorAll(`.skill-node:not(.${category})`).forEach(node => {
      node.style.opacity = '0.3';
      node.classList.add('dimmed');
    });
    
    // Dim connections that don't match the category
    document.querySelectorAll(`.skill-connection:not(.${category})`).forEach(conn => {
      conn.style.opacity = '0.1';
      conn.classList.add('dimmed');
    });
    
    // Play category selection sound
    playCategorySound(category);
  }
  
  // Create a skill node
  function createSkillNode(skill, index) {
    const node = document.createElement('div');
    node.className = `skill-node ${skill.category}`;
    node.textContent = skill.name;
    node.dataset.id = skill.id;
    
    // Set custom animation delay based on index
    node.style.setProperty('--node-index', index);
    
    node.style.left = `${skill.pixelX}px`;
    node.style.top = `${skill.pixelY}px`;
    node.style.transform = 'translate(-50%, -50%)';
    
    // Add hover sound effect
    node.addEventListener('mouseenter', () => {
      playHoverSound(skill.category);
      
      // Create a ripple effect on hover
      createRippleEffect(node);
    });
    
    // Add click handler
    node.addEventListener('click', () => {
      highlightConnections(skill);
      showSkillDetails(skill);
      
      // Play click sound
      playClickSound();
    });
    
    skillTreeContainer.appendChild(node);
  }
  
  // Create a ripple effect when hovering over nodes
  function createRippleEffect(node) {
    const ripple = document.createElement('div');
    ripple.className = 'node-ripple';
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.borderRadius = '8px';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    ripple.style.zIndex = '-1';
    ripple.style.animation = 'ripple 0.8s ease-out forwards';
    
    node.appendChild(ripple);
    
    // Remove the ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 800);
  }
  
  // Create a connection line between skills
  function createConnection(sourceSkill, targetSkill) {
    const connection = document.createElement('div');
    connection.className = `skill-connection ${sourceSkill.category}`;
    connection.dataset.source = sourceSkill.id;
    connection.dataset.target = targetSkill.id;
    
    const dx = targetSkill.pixelX - sourceSkill.pixelX;
    const dy = targetSkill.pixelY - sourceSkill.pixelY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    connection.style.width = `${length}px`;
    connection.style.left = `${sourceSkill.pixelX}px`;
    connection.style.top = `${sourceSkill.pixelY}px`;
    
    // Calculate angle in radians and convert to degrees
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    connection.style.setProperty('--rotation-angle', `${angle}deg`);
    connection.style.transform = `rotate(${angle}deg)`;
    
    // Add animation delay based on distance
    const delay = Math.random() * 0.5 + 0.5; // 0.5 to 1 second
    connection.style.animationDelay = `${delay}s`;
    connection.style.setProperty('--animation-delay', `${delay}s`);
    
    skillTreeContainer.appendChild(connection);
  }
  
  // Add floating particles to the background
  function addFloatingParticles() {
    const container = document.getElementById('skill-tree-container');
    if (!container) return;
    
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      // Random size
      const size = Math.random() * 2 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random animation duration and delay
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1;
      particle.style.opacity = opacity;
      
      container.appendChild(particle);
    }
  }
  
  // Add zoom controls
  function addZoomControls() {
    const container = document.getElementById('skill-tree-container');
    if (!container) return;
    
    const controls = document.createElement('div');
    controls.className = 'skill-tree-controls';
    
    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '+';
    zoomInBtn.title = 'Zoom In';
    zoomInBtn.addEventListener('click', () => {
      zoomIn();
      playUISound('zoomIn');
    });
    
    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '-';
    zoomOutBtn.title = 'Zoom Out';
    zoomOutBtn.addEventListener('click', () => {
      zoomOut();
      playUISound('zoomOut');
    });
    
    // Reset zoom button
    const resetZoomBtn = document.createElement('button');
    resetZoomBtn.innerHTML = '↺';
    resetZoomBtn.title = 'Reset Zoom';
    resetZoomBtn.addEventListener('click', () => {
      resetZoom();
      playUISound('reset');
    });
    
    controls.appendChild(zoomInBtn);
    controls.appendChild(zoomOutBtn);
    controls.appendChild(resetZoomBtn);
    
    container.appendChild(controls);
  }
  
  // Zoom in function
  function zoomIn() {
    if (currentZoom < 1.75) {
      currentZoom += 0.25;
      applyZoom();
    }
  }
  
  // Zoom out function
  function zoomOut() {
    if (currentZoom > 0.5) {
      currentZoom -= 0.25;
      applyZoom();
    }
  }
  
  // Reset zoom function
  function resetZoom() {
    currentZoom = 1;
    applyZoom();
  }
  
  // Apply zoom level to the visualization
  function applyZoom() {
    skillTreeContainer.style.transform = `scale(${currentZoom})`;
    
    // Adjust the container size based on zoom
    if (currentZoom > 1) {
      skillTreeContainer.style.height = `${350 * currentZoom}px`;
    } else {
      skillTreeContainer.style.height = '350px';
    }
  }
  
  // Highlight connections when a node is clicked
  function highlightConnections(skill) {
    // Reset all connections to normal state
    document.querySelectorAll('.skill-connection').forEach(conn => {
      conn.style.opacity = '0.3';
      conn.style.height = '2px';
    });
    
    // Highlight direct connections
    skill.connections.forEach(targetId => {
      const connection = document.querySelector(`.skill-connection[data-source="${skill.id}"][data-target="${targetId}"]`) ||
                         document.querySelector(`.skill-connection[data-source="${targetId}"][data-target="${skill.id}"]`);
      
      if (connection) {
        connection.style.opacity = '1';
        connection.style.height = '3px';
        connection.style.zIndex = '2';
        
        // Add a pulse animation to the connection
        connection.style.animation = 'connectionPulse 1.5s infinite';
      }
    });
  }
  
  // Show skill details when a node is clicked
  function showSkillDetails(skill) {
    // Highlight the selected node
    document.querySelectorAll('.skill-node').forEach(node => {
      node.classList.remove('selected');
    });
    
    const selectedNode = document.querySelector(`.skill-node[data-id="${skill.id}"]`);
    selectedNode.classList.add('selected');
    
    // Animate the detail panel
    skillDetailPanel = document.getElementById('skill-detail-panel');
    skillDetailPanel.style.opacity = '0';
    setTimeout(() => {
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
        heading.style.color = '#d1d5db';
        heading.style.marginBottom = '10px';
        skillDetailConnections.appendChild(heading);
        
        connectedSkills.forEach(connectedSkill => {
          const pill = document.createElement('span');
          pill.className = `connection-pill ${connectedSkill.category}`;
          pill.textContent = connectedSkill.name;
          pill.addEventListener('click', () => {
            // Highlight the connection between these skills
            highlightConnections(connectedSkill);
            showSkillDetails(connectedSkill);
            
            // Find and scroll to the connected skill node
            const node = document.querySelector(`.skill-node[data-id="${connectedSkill.id}"]`);
            if (node) {
              // Create a subtle pulse animation on the target node
              node.style.animation = 'none';
              setTimeout(() => {
                node.style.animation = 'nodePulse 0.6s ease';
              }, 10);
            }
            
            // Play click sound
            playClickSound();
          });
          skillDetailConnections.appendChild(pill);
        });
      }
      
      // Fade in the detail panel
      skillDetailPanel.style.opacity = '1';
    }, 200);
  }
  
  // Play a subtle hover sound
  function playHoverSound(category) {
    // Only play if browser supports AudioContext and if sound is enabled
    if (window.AudioContext && localStorage.getItem('soundEnabled') !== 'false') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // Different sound for each category
        let frequency = 400;
        if (category === 'frontend') frequency = 380;
        if (category === 'backend') frequency = 340;
        if (category === 'data') frequency = 420;
        if (category === 'tools') frequency = 460;
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      } catch (e) {
        // Silent failure for browsers that don't support audio API
        console.log("Audio not supported in this browser");
      }
    }
  }
  
  // Play a click sound
  function playClickSound() {
    // Only play if browser supports AudioContext and if sound is enabled
    if (window.AudioContext && localStorage.getItem('soundEnabled') !== 'false') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      } catch (e) {
        // Silent failure for browsers that don't support audio API
        console.log("Audio not supported in this browser");
      }
    }
  }
  
  // Play UI interaction sounds
  function playUISound(type) {
    // Only play if browser supports AudioContext and if sound is enabled
    if (window.AudioContext && localStorage.getItem('soundEnabled') !== 'false') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        if (type === 'zoomIn') {
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(350, audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.15);
        } else if (type === 'zoomOut') {
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(450, audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.15);
        } else if (type === 'reset') {
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
          oscillator.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(400, audioCtx.currentTime + 0.2);
        }
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        // Silent failure for browsers that don't support audio API
        console.log("Audio not supported in this browser");
      }
    }
  }
  
  // Play category filter sound
  function playCategorySound(category) {
    // Only play if browser supports AudioContext and if sound is enabled
    if (window.AudioContext && localStorage.getItem('soundEnabled') !== 'false') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create multiple oscillators for a chord effect
        const oscillator1 = audioCtx.createOscillator();
        const oscillator2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // Different chord for each category
        if (category === 'frontend') {
          oscillator1.frequency.setValueAtTime(400, audioCtx.currentTime);
          oscillator2.frequency.setValueAtTime(500, audioCtx.currentTime);
        } else if (category === 'backend') {
          oscillator1.frequency.setValueAtTime(300, audioCtx.currentTime);
          oscillator2.frequency.setValueAtTime(375, audioCtx.currentTime);
        } else if (category === 'data') {
          oscillator1.frequency.setValueAtTime(440, audioCtx.currentTime);
          oscillator2.frequency.setValueAtTime(550, audioCtx.currentTime);
        } else if (category === 'tools') {
          oscillator1.frequency.setValueAtTime(350, audioCtx.currentTime);
          oscillator2.frequency.setValueAtTime(420, audioCtx.currentTime);
        } else if (category === 'all') {
          oscillator1.frequency.setValueAtTime(400, audioCtx.currentTime);
          oscillator2.frequency.setValueAtTime(600, audioCtx.currentTime);
        }
        
        oscillator1.type = 'sine';
        oscillator2.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator1.start();
        oscillator2.start();
        oscillator1.stop(audioCtx.currentTime + 0.5);
        oscillator2.stop(audioCtx.currentTime + 0.5);
      } catch (e) {
        // Silent failure for browsers that don't support audio API
        console.log("Audio not supported in this browser");
      }
    }
  }
  
  // Add sound toggle button
  function addSoundToggle() {
    const container = document.getElementById('skill-tree-container');
    if (!container) return;
    
    // Create sound toggle button
    const soundToggle = document.createElement('button');
    soundToggle.id = 'sound-toggle';
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = localStorage.getItem('soundEnabled') === 'false' ? 
      '<span>🔇</span>' : '<span>🔊</span>';
    soundToggle.title = localStorage.getItem('soundEnabled') === 'false' ? 
      'Enable Sound Effects' : 'Disable Sound Effects';
    
    // Style the button
    soundToggle.style.position = 'absolute';
    soundToggle.style.top = '10px';
    soundToggle.style.right = '10px';
    soundToggle.style.background = 'rgba(30, 30, 35, 0.7)';
    soundToggle.style.border = '1px solid rgba(152, 109, 255, 0.3)';
    soundToggle.style.borderRadius = '50%';
    soundToggle.style.width = '30px';
    soundToggle.style.height = '30px';
    soundToggle.style.display = 'flex';
    soundToggle.style.alignItems = 'center';
    soundToggle.style.justifyContent = 'center';
    soundToggle.style.color = '#fff';
    soundToggle.style.cursor = 'pointer';
    soundToggle.style.zIndex = '10';
    soundToggle.style.transition = 'all 0.3s ease';
    soundToggle.style.fontSize = '14px';
    
    // Add hover effect
    soundToggle.onmouseenter = function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 0 10px rgba(152, 109, 255, 0.5)';
    };
    
    soundToggle.onmouseleave = function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    };
    
    // Toggle sound setting
    soundToggle.onclick = function() {
      const currentSetting = localStorage.getItem('soundEnabled') !== 'false';
      localStorage.setItem('soundEnabled', !currentSetting);
      this.innerHTML = !currentSetting ? '<span>🔇</span>' : '<span>🔊</span>';
      this.title = !currentSetting ? 'Enable Sound Effects' : 'Disable Sound Effects';
    };
    
    container.appendChild(soundToggle);
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
    
    // Reset zoom
    currentZoom = 1;
    
    // Re-add sound toggle button
    addSoundToggle();
    
    // Re-add floating particles
    addFloatingParticles();
    
    // Re-add zoom controls
    addZoomControls();
  }
  
  // Initial creation
  createSkillTree();
  
  // Add sound toggle button
  addSoundToggle();
  
  // Show a random skill on load with a delay for the animation to complete
  setTimeout(() => {
    const randomSkill = skills[Math.floor(Math.random() * skills.length)];
    showSkillDetails(randomSkill);
    highlightConnections(randomSkill);
  }, 1500);
  
  // Add resize listener
  window.addEventListener('resize', handleResize);
});

// Add CSS for selected skill node and animations
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .skill-node.selected {
      transform: scale(1.2) translate(-40%, -40%) !important;
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.2) !important;
      z-index: 10;
    }
    
    @keyframes nodePulse {
      0% { transform: scale(1) translate(-50%, -50%); }
      50% { transform: scale(1.3) translate(-40%, -40%); box-shadow: 0 0 30px rgba(255, 255, 255, 0.4); }
      100% { transform: scale(1) translate(-50%, -50%); }
    }
    
    @keyframes connectionPulse {
      0% { opacity: 1; box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
      50% { opacity: 0.7; box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
      100% { opacity: 1; box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
    }
    
    @keyframes ripple {
      0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1.8); }
    }
    
    #skill-detail-panel {
      transition: opacity 0.4s ease;
    }
    
    .sound-toggle:focus {
      outline: none;
    }
    
    .skill-node.dimmed {
      transition: all 0.5s ease;
    }
    
    .skill-connection.dimmed {
      transition: all 0.5s ease;
    }
    
    #skill-tree-visualization {
      transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      transform-origin: center center;
    }
    
    #skill-tree-visualization:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(1px at 30% 20%, rgba(255, 255, 255, 0.5), transparent 30px),
        radial-gradient(1px at 70% 40%, rgba(255, 255, 255, 0.3), transparent 40px),
        radial-gradient(1px at 40% 70%, rgba(255, 255, 255, 0.4), transparent 30px),
        radial-gradient(1px at 80% 80%, rgba(255, 255, 255, 0.3), transparent 50px);
      pointer-events: none;
      opacity: 0.4;
    }
  </style>
`); 