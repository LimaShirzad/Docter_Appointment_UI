document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("dashbord_box").innerHTML = `
   

    <div class="doctor_sidebar">
            <div class="doctor_sidebar_brand">
                <i class="fas fa-heartbeat me-2"></i>
                <span>MedPortal</span>
            </div>
            <div class="pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            <i class="fas fa-home"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-calendar-check"></i>
                            <span>Appointments</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-user-injured"></i>
                            <span>Patients</span>
                        </a>
                    </li>
                  
                  
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-chart-line"></i>
                            <span>Reports</span>
                        </a>
                    </li>
                   
                    <li class="nav-item mt-4" onclick="logoutDoctor()">
                        <a class="nav-link" href="#">
                            <i class="fas fa-sign-out-alt"></i>
                            <span >Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>





  `;
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("header_box").innerHTML = `

    <div class="topbar d-flex justify-content-between align-items-center">
                <div class="search-bar">
                
                </div>
                <div class="d-flex align-items-center">
              <a class="nav-link" href="doctorProfile.html">
                    <div class="user-profile d-flex align-items-center">
                        <img src="" alt="Doctor" id="doctorImage">
                        <div class="ms-2">
                            <div class="fw-bold">Dr . <span id="firstName"></span>  <span id="lastName"></span></div>
                            <div class="small text-muted" id="specialty"></div>
                        </div>
                    </div>
                </a>
                </div>
            </div>`

});