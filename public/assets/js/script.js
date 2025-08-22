 document.addEventListener('DOMContentLoaded', function() {
     // Password toggle functionality
     const passwordToggle = document.getElementById('passwordToggle');
     const passwordField = document.getElementById('password');
     const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
     const confirmPasswordField = document.getElementById('confirmPassword');
     
     function togglePasswordVisibility(field, toggle) {
  if (field.type === 'password') {
      field.type = 'text';
      toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
      field.type = 'password';
      toggle.innerHTML = '<i class="fas fa-eye"></i>';
  }
     }
     
     passwordToggle.addEventListener('click', function() {
  togglePasswordVisibility(passwordField, passwordToggle);
     });
     
     confirmPasswordToggle.addEventListener('click', function() {
  togglePasswordVisibility(confirmPasswordField, confirmPasswordToggle);
     });
     
     // Profile picture upload
     const profilePicPreview = document.getElementById('profilePicPreview');
     const profilePicInput = document.getElementById('profilePic');
     const uploadBtn = document.getElementById('uploadBtn');
     const previewImage = document.getElementById('previewImage');
     
     uploadBtn.addEventListener('click', function() {
  profilePicInput.click();
     });
     
     profilePicInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
   previewImage.src = e.target.result;
   previewImage.style.display = 'block';
   profilePicPreview.querySelector('i').style.display = 'none';
      }
      reader.readAsDataURL(file);
  }
     });
     
     // Gender selection
 
 });
