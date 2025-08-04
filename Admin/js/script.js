 function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }



//  =================login page satrt====================


function togglePassword() {
  const passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
//  =================login page end=========================


















