document.addEventListener('DOMContentLoaded', function() {
    // Get form and input elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
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
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        
        // Remove shake class if present
        usernameInput.parentElement.classList.remove('input-shake');
        emailInput.parentElement.classList.remove('input-shake');
        passwordInput.parentElement.classList.remove('input-shake');
        
        // Validate username
        if (usernameInput.value.trim() === '') {
          usernameError.textContent = 'Username is required';
          usernameInput.parentElement.classList.add('input-shake');
          isValid = false;
        } else if (usernameInput.value.trim().length < 3) {
          usernameError.textContent = 'Username must be at least 3 characters';
          usernameInput.parentElement.classList.add('input-shake');
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
        } else if (passwordInput.value.length < 6) {
          passwordError.textContent = 'Password must be at least 6 characters';
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
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            remember: document.getElementById('remember').checked
          };
          
          // Send login request to server
          fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              window.location.href = 'studenthome.html';
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
    
    // Save username if "Remember me" is checked
    const rememberCheckbox = document.getElementById('remember');
    
    // Check if username is saved in localStorage
    if (localStorage.getItem('rememberedUsername')) {
      usernameInput.value = localStorage.getItem('rememberedUsername');
      rememberCheckbox.checked = true;
    }
    
    // Save username when checkbox state changes
    rememberCheckbox.addEventListener('change', function() {
      if (this.checked) {
        localStorage.setItem('rememberedUsername', usernameInput.value);
      } else {
        localStorage.removeItem('rememberedUsername');
      }
    });
  });