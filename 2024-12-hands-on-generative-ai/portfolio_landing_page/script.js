// Load and parse CV data
async function loadCV() {
    try {
        const response = await fetch('cv.json');
        const cvData = await response.json();
        populateContent(cvData);
    } catch (error) {
        console.error('Error loading CV:', error);
    }
}

function populateContent(cv) {
    // Populate summary
    document.querySelector('.summary').textContent = cv.basics.summary;

    // Populate skills
    const skillsGrid = document.querySelector('.skills-grid');
    cv.skills.forEach((skill, index) => {
        const levelPercentage = {
            'Master': '95%',
            'Advanced': '80%',
            'Intermediate': '60%',
            'Beginner': '40%'
        };
        
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.style.setProperty('--animation-order', index);
        skillCard.innerHTML = `
            <h3>${skill.name}</h3>
            <p>Level: ${skill.level}</p>
            <div class="skill-level">
                <div class="skill-level-fill" style="width: ${levelPercentage[skill.level]}"></div>
            </div>
            <p class="skill-keywords">${skill.keywords.join(', ')}</p>
        `;
        skillsGrid.appendChild(skillCard);
    });

    // Populate work experience
    const timeline = document.querySelector('.timeline');
    cv.work.forEach((job, index) => {
        const startDate = new Date(job.startDate);
        const endDate = job.endDate ? new Date(job.endDate) : new Date();
        const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24 * 30)); // months

        const jobElement = document.createElement('div');
        jobElement.className = 'timeline-item';
        jobElement.style.setProperty('--animation-order', index);
        jobElement.innerHTML = `
            <div class="timeline-content">
                <h3>${job.position}</h3>
                <h4>${job.name}</h4>
                <p class="date">${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : 'Present'}</p>
                <p class="duration">${duration} months</p>
                <p class="summary">${job.summary}</p>
            </div>
        `;
        timeline.appendChild(jobElement);
    });

    // Enhanced projects section with better handling
    const projectsGrid = document.querySelector('.projects-grid');
    cv.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.setProperty('--animation-order', index);
        
        // Skip image section if no image is provided
        const imageSection = project.image ? 
            `<img src="${project.image}" alt="${project.name}" class="project-image">` : '';
        
        projectCard.innerHTML = `
            <div class="project-content">
                ${imageSection}
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-highlights">
                    ${project.highlights.map(highlight => 
                        `<span class="highlight">${highlight}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    ${project.url ? `
                        <a href="${project.url}" target="_blank" class="project-link primary">
                            <i class="fas fa-external-link-alt"></i> View Live
                        </a>
                    ` : ''}
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" class="project-link secondary">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Helper function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long'
    });
}

// Replace theme switching functionality with this
function initializeThemeSwitcher() {
    const buttons = document.querySelectorAll('.theme-btn');
    const themeStyle = document.getElementById('theme-style');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update theme
            const theme = button.dataset.theme;
            themeStyle.href = `themes/${theme}.css`;
            
            // Optional: Save preference
            localStorage.setItem('preferred-theme', theme);
        });
    });

    // Load saved theme if exists
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        const savedButton = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
        if (savedButton) {
            savedButton.click();
        }
    }
}

// Enhanced scroll animations
function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                if (entry.target.classList.contains('project-card')) {
                    const highlights = entry.target.querySelectorAll('.highlight');
                    highlights.forEach((highlight, i) => {
                        highlight.style.animationDelay = `${(i * 0.1) + 0.5}s`;
                        highlight.style.animationPlayState = 'running';
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCV();
    handleScrollAnimations();
    initializeThemeSwitcher();
}); 