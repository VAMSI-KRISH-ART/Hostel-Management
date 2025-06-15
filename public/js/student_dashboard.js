// Display current date and day
document.addEventListener('DOMContentLoaded', function() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
    
    document.getElementById('current-day').textContent = day;
    document.getElementById('current-date').textContent = date;
});

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        this.classList.add('active');
        
        // Show selected section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

// Logout confirmation
document.getElementById('logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('logout-modal').style.display = 'block';
});

document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('logout-modal').style.display = 'none';
});

document.querySelector('.cancel-btn').addEventListener('click', function() {
    document.getElementById('logout-modal').style.display = 'none';
});

// File upload name display
document.getElementById('issue-image').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.querySelector('.file-name').textContent = fileName;
});

// Menu tabs functionality for mess info
document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const day = this.getAttribute('data-day');
        document.querySelectorAll('.menu-day').forEach(d => d.classList.remove('active'));
        document.getElementById(day + '-menu').classList.add('active');
    });
});