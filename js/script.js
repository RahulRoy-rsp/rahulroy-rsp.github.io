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