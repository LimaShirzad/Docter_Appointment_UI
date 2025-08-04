
        // Toggle password visibility
        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
        
        // Profile picture upload
        document.getElementById('uploadBtn').addEventListener('click', function() {
            document.getElementById('profilePic').click();
        });
        
        document.getElementById('profilePreview').addEventListener('click', function() {
            document.getElementById('profilePic').click();
        });
        
        document.getElementById('profilePic').addEventListener('change', function() {
            const file = this.files[0];
            const preview = document.getElementById('profilePreview');
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
                }
                
                reader.readAsDataURL(file);
            }
        });
        
        // Gender selection styling
        const genderOptions = document.querySelectorAll('.gender-option');
        genderOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                genderOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Check the radio button
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            });


            
         
            document.getElementById('profilePreview').innerHTML = '<i class="fas fa-user"></i>';
            
            // Reset gender selection
            genderOptions.forEach(option => option.classList.remove('active'));

        });
        



             window.addEventListener('scroll', function() {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                header.style.background = 'linear-gradient(120deg, var(--primary) 0%, var(--primary-dark) 100%)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                header.style.background = 'linear-gradient(120deg, var(--primary) 0%, var(--primary-dark) 100%)';
            }
        });