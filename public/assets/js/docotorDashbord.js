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
                            <i class="fas fa-prescription"></i>
                            <span>Prescriptions</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-stethoscope"></i>
                            <span>Consultations</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-chart-line"></i>
                            <span>Reports</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li class="nav-item mt-4">
                        <a class="nav-link" href="#">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
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
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search...">
                        <button class="btn btn-primary">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="me-4 position-relative">
                        <a href="#" class="text-dark">
                            <i class="fas fa-bell fa-lg"></i>
                            <span class="notification-badge">3</span>
                        </a>
                    </div>
                    <div class="user-profile d-flex align-items-center">
                        <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg" alt="Doctor">
                        <div class="ms-2">
                            <div class="fw-bold">Dr. Sarah Johnson</div>
                            <div class="small text-muted">Cardiologist</div>
                        </div>
                    </div>
                </div>
            </div>`

});