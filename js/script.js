// Update mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
const body = document.body;

menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  navUl.classList.toggle('show');
  body.classList.toggle('menu-open');
});

// Close menu when clicking on links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menuToggle.classList.remove('active');
      navUl.classList.remove('show');
      body.classList.remove('menu-open');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Highlight active nav link
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Load academics data
    loadAcademics();
    
    // Load work experience
    loadWorkExperience();

    // Load projects
    loadProjects();

    // Load certificates
    loadCertificates();

    // Initialize navigations
    initProjectNavigation();
    initCertificatesCarousel();
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.academic-item').forEach(item => {
        observer.observe(item);
    });
});

function loadAcademics() {
    fetch('data/academics.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Sort by end date (newest first)
            data.sort((a, b) => {
                const dateA = new Date(b.duration.split(' - ')[1]);
                const dateB = new Date(a.duration.split(' - ')[1]);
                return dateA - dateB;
            });
            
            renderAcademics(data);
        })
        .catch(error => {
            console.error('Error loading academics data:', error);
            // Fallback data
            const fallbackData = [
                {
                    "degree": "Masters. Computer Science",
                    "institution": "Guru Nanak Khalsa College, Mumbai",
                    "duration": "June 2021 - June 2023",
                    "grade": "First Class",
                    "summary": "Completed with an overall CGPA of 9.83 out of 10."
                }
            ];
            renderAcademics(fallbackData);
        });
}

function renderAcademics(data) {
    const container = document.getElementById('academics-container');
    container.innerHTML = '';
    
    data.forEach((item, index) => {
        const academicItem = document.createElement('div');
        academicItem.className = 'academic-item';
        
        // Add animation delay
        academicItem.style.transitionDelay = `${index * 0.1}s`;
        
        const html = `
            <h3>${item.degree}</h3>
            <div class="academic-meta">
                <span class="institution"><i class="fas fa-university"></i>${item.institution}</span>
                <span class="duration"><i class="far fa-calendar-alt"></i>${item.duration}</span>
                <span class="grade"><i class="fas fa-award"></i>${item.grade}</span>
            </div>
            ${item.summary ? `<div class="academic-summary">${item.summary}</div>` : ''}
        `;
        
        academicItem.innerHTML = html;
        container.appendChild(academicItem);
    });
}

function loadWorkExperience() {
    fetch('data/work_exp.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Sort by tenure (newest first)
            data.sort((a, b) => {
                const dateA = new Date(a.tenure.split(' - ')[1] === 'Present' ? '9999' : a.tenure.split(' - ')[1]);
                const dateB = new Date(b.tenure.split(' - ')[1] === 'Present' ? '9999' : b.tenure.split(' - ')[1]);
                return dateB - dateA;
            });
            
            renderWorkExperience(data);
        })
        .catch(error => {
            console.error('Error loading work experience data:', error);
            // Fallback data
            const fallbackData = [
                {
                    "position": "Software Engineer",
                    "company": "Example Company",
                    "tenure": "January 2023 - Present",
                    "summary": "Example work experience description."
                }
            ];
            renderWorkExperience(fallbackData);
        });
}

function renderWorkExperience(data) {
    const container = document.getElementById('work-exp-container');
    container.innerHTML = '';
    
    data.forEach((item, index) => {
        const workItem = document.createElement('div');
        workItem.className = 'work-item';
        
        // Add animation delay
        workItem.style.transitionDelay = `${index * 0.1}s`;
        
        const html = `
            <h3 class="work-position">${item.position}</h3>
            <div class="work-company">
                <i class="fas fa-building"></i>${item.company}
            </div>
            <span class="work-tenure"><i class="far fa-calendar-alt"></i> ${item.tenure}</span>
            <div class="work-summary">${item.summary}</div>
        `;
        
        workItem.innerHTML = html;
        container.appendChild(workItem);
        
        // Add to intersection observer
        if (typeof observer !== 'undefined') {
            observer.observe(workItem);
        }
    });
}

function loadProjects() {
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderProjects(data);
        })
        .catch(error => {
            console.error('Error loading projects data:', error);
            // Fallback data
            const fallbackData = [
                {
                    "name": "Sample Project",
                    "type": "Personal",
                    "link": "",
                    "summary": "This is an example project description."
                }
            ];
            renderProjects(fallbackData);
        });
}

function renderProjects(data) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    data.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const hasLink = project.link && project.link.trim() !== '';
        const typeClass = project.type.toLowerCase();
        
        const html = `
            <span class="project-type ${typeClass}">${project.type}</span>
            <h3 class="project-name">${project.name}</h3>
            <p class="project-summary">${project.summary}</p>
            <a href="${hasLink ? project.link : '#'}" 
               class="project-link ${hasLink ? 'active' : 'disabled'}" 
               ${hasLink ? '' : 'tabindex="-1"'}
               target="_blank" rel="noopener noreferrer">
               ${hasLink ? 'View Project' : 'Not Available'}
            </a>
        `;
        
        projectCard.innerHTML = html;
        container.appendChild(projectCard);
        
        // Add to intersection observer
        if (typeof observer !== 'undefined') {
            observer.observe(projectCard);
        }
    });
}

function initProjectNavigation() {
    const container = document.getElementById('projects-container');
    const leftNav = document.querySelector('.projects-nav.left');
    const rightNav = document.querySelector('.projects-nav.right');
    
    if (!container || !leftNav || !rightNav) return;
    
    leftNav.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    rightNav.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    // Hide/show arrows based on scroll position
    container.addEventListener('scroll', () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        leftNav.style.display = scrollLeft > 0 ? 'flex' : 'none';
        rightNav.style.display = scrollLeft < scrollWidth - clientWidth - 1 ? 'flex' : 'none';
    });
    
    // Initial check
    container.dispatchEvent(new Event('scroll'));
}

function loadCertificates() {
    fetch('data/certificates.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderCertificates(data);
        })
        .catch(error => {
            console.error('Error loading certificates data:', error);
            // Fallback data
            const fallbackData = [
                {
                    "name": "Sample Certificate",
                    "summary": "This is an example certificate description.",
                    "link": "",
                    "highlightWords": ["example", "description"]
                }
            ];
            renderCertificates(fallbackData);
        });
}

function renderCertificates(data) {
    const container = document.getElementById('certificates-container');
    const dotsContainer = document.getElementById('cert-dots');
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    data.forEach((cert, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'certificate-slide';
        slide.dataset.index = index;
        
        // Highlight words in summary
        let highlightedSummary = cert.summary;
        cert.highlightWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            highlightedSummary = highlightedSummary.replace(regex, 
                `<span class="highlight">${word}</span>`);
        });
        
        const hasLink = cert.link && cert.link.trim() !== '';
        
        slide.innerHTML = `
            <div class="certificate-card">
                <h3 class="certificate-name">${cert.name}</h3>
                <p class="certificate-summary">${highlightedSummary}</p>
                <a href="${hasLink ? cert.link : '#'}" 
                   class="certificate-link ${hasLink ? 'active' : 'disabled'}" 
                   ${hasLink ? '' : 'tabindex="-1"'}
                   target="_blank" rel="noopener noreferrer">
                   ${hasLink ? 'View Certificate' : 'Certificate Not Available'}
                </a>
            </div>
        `;
        
        container.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.dataset.index = index;
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

function initCertificatesCarousel() {
    const container = document.getElementById('certificates-container');
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');
    const dotsContainer = document.getElementById('cert-dots');
    let dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    if (!container || !prevBtn || !nextBtn) return;

    // Create a function to update dots
    const updateDots = () => {
        dots = document.querySelectorAll('.dot'); // Refresh dots collection
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === container.children.length - 1;
    }

    // Button click handlers
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < container.children.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Dot click handlers
    dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.dot');
        if (dot) {
            e.stopPropagation();
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            e.preventDefault();
            nextBtn.click();
        } else if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            e.preventDefault();
            prevBtn.click();
        }
    });

    // Initialize
    updateCarousel();

    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}