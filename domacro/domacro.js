// Domacro Website JavaScript
// Author: DomNHT
// Description: Interactive functionality for Domacro website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupSmoothScrolling();
    setupScrollAnimations();
    // setupFormHandling();
    console.log('Domacro website initialized successfully');
}

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to clicked button and corresponding pane
    event.target.classList.add('active');
    const targetPane = document.getElementById(tabName + '-tab');
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form submission handler
function handleFeedback(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const feedback = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('feedback'),
        timestamp: new Date().toISOString()
    };
    
    // Validate form data
    if (!validateFeedbackForm(feedback)) {
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // In a real implementation, send this data to a server
        console.log('Feedback submitted:', feedback);
    }, 1500);
}

// Validate feedback form
function validateFeedbackForm(feedback) {
    if (!feedback.name || feedback.name.trim().length < 2) {
        showNotification('Vui lòng nhập tên hợp lệ (ít nhất 2 ký tự)', 'error');
        return false;
    }
    
    if (!feedback.email || !isValidEmail(feedback.email)) {
        showNotification('Vui lòng nhập địa chỉ email hợp lệ', 'error');
        return false;
    }
    
    if (!feedback.message || feedback.message.trim().length < 10) {
        showNotification('Vui lòng nhập nội dung phản hồi (ít nhất 10 ký tự)', 'error');
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 350px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add icon based on type
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.feature-card, .install-step').forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Download tracking (for analytics)
function trackDownload(fileName) {
    console.log(`Download started: ${fileName}`);
    // In a real implementation, send this to your analytics service
    // gtag('event', 'download', { 'file_name': fileName });
}

// Add download tracking to download links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.download-link').forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.href.split('/').pop();
            trackDownload(fileName);
        });
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showEasterEgg();
        konamiCode = []; // Reset
    }
});

function showEasterEgg() {
    showNotification('🎉 Chúc mừng! Bạn đã khám phá ra Easter Egg của Domacro!', 'success');
    
    // Add some fun animation
    document.body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Copy to clipboard functionality (for download links)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Đã copy vào clipboard!', 'success');
    }).catch(() => {
        showNotification('Không thể copy. Vui lòng copy thủ công.', 'error');
    });
}

// Version check (placeholder for future use)
function checkForUpdates() {
    // This would check against your server for new versions
    console.log('Checking for updates...');
}

// Export functions for global use
window.switchTab = switchTab;
window.handleFeedback = handleFeedback;
window.trackDownload = trackDownload;
window.toggleMobileMenu = toggleMobileMenu;
window.copyToClipboard = copyToClipboard;