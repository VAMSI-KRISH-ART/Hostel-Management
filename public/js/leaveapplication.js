
        // Calculate total days when dates are selected
        document.addEventListener('DOMContentLoaded', function() {
            const startDateInput = document.getElementById('startDate');
            const endDateInput = document.getElementById('endDate');
            const totalDaysInput = document.getElementById('totalDays');
            const leaveForm = document.getElementById('leaveApplicationForm');
            
            function calculateDays() {
                if (startDateInput.value && endDateInput.value) {
                    const startDate = new Date(startDateInput.value);
                    const endDate = new Date(endDateInput.value);
                    
                    // Calculate the difference in milliseconds
                    const diffTime = Math.abs(endDate - startDate);
                    
                    // Convert to days and add 1 to include both start and end dates
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    
                    totalDaysInput.value = diffDays + ' day(s)';
                }
            }
            
            startDateInput.addEventListener('change', calculateDays);
            endDateInput.addEventListener('change', calculateDays);
            
            // Form submission handling
            leaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // ... validation logic ...
            alert('Leave application submitted successfully!');
            window.location.href = 'index.html';
            });
            // Save as draft functionality
            document.getElementById('saveAsDraft').addEventListener('click', function() {
                // TODO: Save form data as draft
                alert('Application saved as draft');
            });
        });
    