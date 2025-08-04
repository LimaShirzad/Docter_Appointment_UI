// dashbord.js

document.addEventListener("DOMContentLoaded", function () {
  const headerHTML = `

  <nav id="sidebar" class="sidebar p-3">
  <h4 class="text-white" id="brand"> MyClinic</h4>
  <a href="index.html" ><i class="bi bi-speedometer2"></i><span id="dashbord_link" class="p-2"></span> </a>
  <a href="docters.html" ><i class="bi bi-calendar-check"></i> <span id="docter_link" class="p-2"></span> </a>
  <a href="patients.html" ><i class="bi bi-people"></i>  <span id="patient_link" class="p-2"></span></a>
 
  <a href="" ><i class="bi bi-people"></i>  <span id="report" class="p-2"></span></a>
  <a href="" ><i class="bi bi-people"></i>  <span class="p-2">seeting</span></a>
   

</nav>


<main class="col-md-10 offset-md-2 ms-sm-auto px-md-4" style="margin-left:220px;">

  <div class="header">
    <button class="toggle-btn" onclick="toggleSidebar()">
      <i class="bi bi-list"></i>
    </button>
    <h4 id="text"></h4>
    <div>
      <i class="bi bi-person-circle fs-4"></i> Dr. Ali
    </div>
  </div>
   </main>
  `;

  document.getElementById("dashbord").innerHTML = headerHTML;
});




function callAdminDashbord(){
        
        fetch("http://localhost:8080/admin/dashbord")
        .then(response => response.json())
        .then(data => {


          document.getElementById("brand").innerHTML=data.brand;
        
          document.getElementById("dashbord_link").innerText=data.dashbord;
          
          document.getElementById("docter_link").innerText=data.docter;

          document.getElementById("patient_link").innerText=data.patient;

          document.getElementById("report").innerHTML=data.report;






          document.getElementById("text").innerText=data.admindashbord;

     


        }).catch(error => {
            console.error("err" ,error);
        })
    }

callAdminDashbord();




// ====================patientsCall() call===========









