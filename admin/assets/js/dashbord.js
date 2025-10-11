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
                        <a href="dashbord.html"  >
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
                        <a href="#" onclick="adminlogout()">
                            <i class="fas fa-sign-out-alt"></i>
                           
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        




  `;

    document.getElementById("header_box").innerHTML = `
   
  
 <header class="header">
                <div class="header-left">
                    <div id="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
                
                <div class="header-right">
                   
                    
                    <div class="user-profile">
                        <div class="user-avatar">
                          <img src="" id="adminImage" style="height:50px; width:50px; border-radius: 50px;" >
                        </div>
                        <div class="user-info">
                            <div class="user-name"><span id="adminfirstname"></span>  <span id="adminlastname"></span></div>
                            <div class="user-role" id="role"></div>
                        </div>
                    </div>
                </div>
            </header>


  `;



   document.getElementById('menu-toggle').addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
    });

      


  const currentPage = window.location.pathname.split("/").pop(); // get current file name
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }

        // Add click event for mobile toggle and active state
        link.addEventListener('click', function (e) {
            // Prevent default only if href is valid
            if (linkPage !== "#") {
                // Remove active from all links
                document.querySelectorAll('.sidebar-menu a').forEach(item => item.classList.remove('active'));
                this.classList.add('active');

                // Close sidebar on mobile
                if (window.innerWidth < 992) {
                    document.querySelector('.sidebar').classList.remove('active');
                }

                // Navigate to page
                window.location.href = linkPage;
            }
        });
    });

});



    async function loadAdminProfile() {


    try {
        const response = await fetch("http://localhost:8080/api/dashboard/adminprofile", {
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        });

        if (!response.ok) throw new Error("Failed to fetch admin profile");

         
        const data = await response.json();
        console.log("Doctor Profile:", data);



          if (data.profilePicture) {
            document.getElementById("adminImage").src =
                "data:image/png;base64," + data.profilePicture;
        }

          document.getElementById("adminfirstname").innerHTML=data.firstName;
          document.getElementById("adminlastname").innerHTML=data.lastName;
          document.getElementById("role").innerHTML=data.role;


    } catch (err) {
        console.error("Error:", err.message);
        document.getElementById("err").innerText = err.message;
    }
}

loadAdminProfile();







    //  document.querySelectorAll('.sidebar-menu a').forEach(link => {
    //     if (link.href === window.location.href) {
    //         link.classList.add('active');
    //     }
    // });

    // document.querySelectorAll('.sidebar-menu a').forEach(link => {
    //     link.addEventListener('click', function (e) {
    //         e.preventDefault();

    //         // Remove active from all
    //         document.querySelectorAll('.sidebar-menu a').forEach(item => {
    //             item.classList.remove('active');
    //         });

    //         // Add active to clicked
    //         this.classList.add('active');

    //         // Close sidebar in mobile
    //         if (window.innerWidth < 992) {
    //             document.querySelector('.sidebar').classList.remove('active');
            // }

            // Navigate to page
            // window.location.href = this.getAttribute("href");
        // });
    // });




// document.addEventListener("DOMContentLoaded", function () {

// });

//  document.getElementById('menu-toggle').addEventListener('click', function() {
//             document.querySelector('.sidebar').classList.toggle('active');
//         });
        
//         // Navigation between pages
//         document.querySelectorAll('.sidebar-menu a').forEach(link => {
//             link.addEventListener('click', function(e) {
//                 e.preventDefault();
                
//                 // Remove active class from all links
//                 document.querySelectorAll('.sidebar-menu a').forEach(item => {
//                     item.classList.remove('active');
//                 });
                
//                 // Add active class to clicked link
//                 this.classList.add('active');
                
             
//                 });
                
            
//                 // Close sidebar on mobile after selection
//                 if (window.innerWidth < 992) {
//                     document.querySelector('.sidebar').classList.remove('active');
//                 }
//  });


          
        



