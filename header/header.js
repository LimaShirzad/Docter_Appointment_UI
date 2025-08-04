// header.js

document.addEventListener("DOMContentLoaded", function () {

  const headerHTML = `


    <header class="main-header">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <div class="logo">
                        <div class="logo-icon">
                            <i class="fas fa-heartbeat"></i>
                        </div>
                        <div class="logo-text" id="navbar-brand"></div>
                    </div>
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon text-white"><i class="fas fa-bars"></i></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="header/index.html" id="home_link"><i class="fas fa-home me-1"></i> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/userLogin.html" id="login_link"><i class="fas fa-stethoscope me-1"></i> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/userRegistration.html" id="register_link"><i class="fas fa-user-md me-1"></i></a>
                        </li>
                       
                       
                    </ul>
                    
                    <div class="user-actions">
                        <a href="#" class="btn appointment-btn">
                            <i class="fas fa-calendar-plus"></i> Book Now
                        </a>
                        <a href="#" class="user-btn">
                            <i class="fas fa-user"></i>
                        </a>
                        <a href="#" class="user-btn">
                            <i class="fas fa-bell"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>


  `;

  document.getElementById("header").innerHTML = headerHTML;
});


function callWebsiteHeader(){
        
        fetch("http://localhost:8080/header")
        .then(response => response.json())
        .then(data => {

        
          document.getElementById("home_link").innerText=data.home;
          
          document.getElementById("login_link").innerText=data.login;

          document.getElementById("register_link").innerText=data.register;

          document.getElementById("navbar-brand").innerText=data.app_name;

     


        }).catch(error => {
            console.error("err" ,error);
        })
    }

callWebsiteHeader();












