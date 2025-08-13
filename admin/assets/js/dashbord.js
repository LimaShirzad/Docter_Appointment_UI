document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sidebar_box").innerHTML = `
   
      <div class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    <i class="fas fa-heartbeat"></i>MediCare
                </div>
            </div>
            
            <div class="sidebar-menu">
                <ul>
                    <li>
                        <a href="dashbord.html" class="active" >
                            <i class="fas fa-home"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="doctore.html" >
                            <i class="fas fa-user-md"></i>
                            <span>Doctors</span>
                        </a>
                    </li>
                    <li>
                        <a href="patients.html">
                            <i class="fas fa-procedures"></i>
                            <span>Patients</span>
                        </a>
                    </li>
                    <li>
                        <a href="specialties.html" >
                            <i class="fas fa-stethoscope"></i>
                            <span>Specialties</span>
                        </a>
                    </li>
                    <li>
                        <a href="userRoles.html" >
                            <i class="fas fa-user-tag"></i>
                            <span>Roles</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" >
                            <i class="fas fa-calendar-check"></i>
                            <span>Appointments</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" >
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        



  `;
});



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("header_box").innerHTML = `
   
  
 <header class="header">
                <div class="header-left">
                    <div id="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
                
                <div class="header-right">
                    <div class="notification-icon">
                        <i class="fas fa-bell"></i>
                        <span class="badge">3</span>
                    </div>
                    
                    <div class="messages-icon">
                        <i class="fas fa-envelope"></i>
                        <span class="badge">5</span>
                    </div>
                    
                    <div class="user-profile">
                        <div class="user-avatar">JD</div>
                        <div class="user-info">
                            <div class="user-name">John Doe</div>
                            <div class="user-role">Administrator</div>
                        </div>
                    </div>
                </div>
            </header>


  `;
});

 document.getElementById('menu-toggle').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
        
        // Navigation between pages
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.sidebar-menu a').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
             
                });
                
            
                // Close sidebar on mobile after selection
                if (window.innerWidth < 992) {
                    document.querySelector('.sidebar').classList.remove('active');
                }
 });


          
        



