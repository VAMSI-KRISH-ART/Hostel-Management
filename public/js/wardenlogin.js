document.addEventListener('DOMContentLoaded', function() {
    // Get form and input elements
    const loginForm = document.getElementById('wardenLoginForm');
    const adminIdInput = document.getElementById('adminId');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const adminIdError = document.getElementById('adminId-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.querySelector('.toggle-password');
    
    // Function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Toggle password visibility
    if (togglePassword) {
      togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
      });
    }
    
    // Form validation
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Reset error messages
        adminIdError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        
        // Remove shake class if present
        adminIdInput.parentElement.classList.remove('input-shake');
        emailInput.parentElement.classList.remove('input-shake');
        passwordInput.parentElement.classList.remove('input-shake');
        
        // Validate admin ID
        if (adminIdInput.value.trim() === '') {
          adminIdError.textContent = 'Admin ID is required';
          adminIdInput.parentElement.classList.add('input-shake');
          isValid = false;
        } else if (adminIdInput.value.trim().length < 4) {
          adminIdError.textContent = 'Admin ID must be at least 4 characters';
          adminIdInput.parentElement.classList.add('input-shake');
          isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
          emailError.textContent = 'Email is required';
          emailInput.parentElement.classList.add('input-shake');
          isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
          emailError.textContent = 'Please enter a valid email address';
          emailInput.parentElement.classList.add('input-shake');
          isValid = false;
        }
        
        // Validate password
        if (passwordInput.value === '') {
          passwordError.textContent = 'Password is required';
          passwordInput.parentElement.classList.add('input-shake');
          isValid = false;
        } else if (passwordInput.value.length < 8) {
          passwordError.textContent = 'Password must be at least 8 characters';
          passwordInput.parentElement.classList.add('input-shake');
          isValid = false;
        }
        
        // For demo purposes - in a real app, you'd send data to server
        if (!isValid) {
          e.preventDefault(); // Stop form submission if validation fails
        } else {
          // For demo purposes, we'll just let the form submit
          // In a real application, you would handle the login process via AJAX
          
          // Example for actual login logic (commented out for demo)
          /*
          e.preventDefault();
          const formData = {
            adminId: adminIdInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            remember: document.getElementById('remember').checked
          };
          
          // Send login request to server
          fetch('/api/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              window.location.href = 'wardenhome.html';
            } else {
              // Show login error
              alert(data.message || 'Login failed. Please check your credentials.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
          });
          */
        }
      });
    }
    
    // Save admin ID if "Remember me" is checked
    const rememberCheckbox = document.getElementById('remember');
    
    // Check if admin ID is saved in localStorage
    if (localStorage.getItem('rememberedAdminId')) {
      adminIdInput.value = localStorage.getItem('rememberedAdminId');
      rememberCheckbox.checked = true;
    }
    
    // Save admin ID when checkbox state changes
    rememberCheckbox.addEventListener('change', function() {
      if (this.checked) {
        localStorage.setItem('rememberedAdminId', adminIdInput.value);
      } else {
        localStorage.removeItem('rememberedAdminId');
      }
    });
    
    // Additional security feature - log out after inactivity (for demonstration)
    let inactivityTimer;
    const TIMEOUT = 15 * 60 * 1000; // 15 minutes
    
    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(function() {
        // This would typically redirect to logout in a real application
        // For this demo, we'll just show an alert
        alert('Your session would time out due to inactivity in a real application.');
      }, TIMEOUT);
    }
    
    // Reset timer on user activity
    ['mousemove', 'keypress', 'click', 'touchstart'].forEach(function(evt) {
      document.addEventListener(evt, resetInactivityTimer, false);
    });
    
    // Initial setup
    resetInactivityTimer();
  });