
// ================== SESSION and AUTH CHECK ===================
const token = sessionStorage.getItem("token");
const role = sessionStorage.getItem("adminrole");
const username = sessionStorage.getItem("adminusername");
const id = sessionStorage.getItem("adminid");

console.log(token);
console.log(username);
console.log(role);
console.log(id);

if (!token) {
  window.location.href = "adminLogin.html";
}

// ================== DASHBOARD DATA ===================
async function loadDoctorData() {
  try {
    const response = await fetch(`http://localhost:8080/api/dashboard/allDoctor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error(`Doctor fetch failed: ${response.status}`);

    const doctors = await response.json();
    document.getElementById("total_doctor").innerText = doctors;
  } catch (error) {
    console.error("Error loading doctors:", error);
  }
}

async function loadPatientData() {
  try {
    const response = await fetch(`http://localhost:8080/api/dashboard/allPatent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error(`Patient fetch failed: ${response.status}`);

    const patients = await response.json();
    console.log("All Patients:", patients);
    document.getElementById("total_patient").innerText = patients;
  } catch (error) {
    console.error("Error loading patients:", error);
  }
}

loadDoctorData();
loadPatientData();

// ===================== ROLE FORM SAVE =====================
const form = document.getElementById("RoleForm");
const msg = document.getElementById("msg");
const cancelBtn = document.getElementById("role_cancel_btn");
const msgBox = document.getElementById("msg_box");

if (form) {
  msg.innerText = "";
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const role = document.getElementById("role").value;

    try {
      const res = await fetch("http://localhost:8080/api/roles/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors?.role) {
          msg.innerText = data.errors.role;
          msg.style.color = "red";
        } else {
          msg.innerText = data.message || "Error saving role!";
          msg.style.color = "red";
        }
      } else {
        msgBox.innerText = "New Role Added Successfully";
        msgBox.style.right = 0;
        msg.innerText = "";
        form.reset();
      }

      setTimeout(() => {
        msgBox.style.right = "-100%";
      }, 5000);
    } catch (err) {
      console.error("Error saving role:", err);
      msg.innerText = "Network error!";
    }
  });

  cancelBtn?.addEventListener("click", () => form.reset());
}

// ===================== LOAD ROLES =====================
async function loadRoles() {
  try {
    const res = await fetch("http://localhost:8080/api/roles", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const roles = await res.json();
    const tbody = document.getElementById("roleTable").querySelector("tbody");
    tbody.innerHTML = "";

    roles.forEach(role => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${role.id}</td>
        <td>${role.role}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-outline-warning me-1" onclick="window.location.href='updateRole.html?id=${role.id}'"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteRole(${role.id})"><i class="fas fa-trash"></i></button>
        </td>`;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading roles:", err);
  }
}

loadRoles();

// ================= CUSTOM ALERTS & CONFIRM =================
function customConfirm(message) {
  return new Promise(resolve => {
    const overlay = document.getElementById("customConfirm");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    msg.textContent = message;
    overlay.style.display = "flex";

    yesBtn.onclick = () => {
      overlay.style.display = "none";
      resolve(true);
    };
    noBtn.onclick = () => {
      overlay.style.display = "none";
      resolve(false);
    };
  });
}

function customAlert(message, type = "success") {
  const alertBox = document.getElementById("customAlert");
  const msg = document.getElementById("alertMessage");
  const box = alertBox.querySelector(".alert-box");

  msg.textContent = message;
  box.className = "alert-box " + type;
  alertBox.style.display = "block";

  setTimeout(() => {
    box.style.animation = "fadeSlideOut 0.4s ease forwards";
    setTimeout(() => {
      alertBox.style.display = "none";
      box.style.animation = "fadeSlideIn 0.4s ease forwards";
    }, 400);
  }, 2000);
}

// ================= DELETE ROLE =================
async function deleteRole(id) {
  if (!id) return alert("Invalid ID");

  const confirm = await customConfirm("Are you sure to delete the role?");
  if (!confirm) return;

  const res = await fetch(`http://localhost:8080/api/roles/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (res.ok) {
    customAlert("Role deleted successfully!", "success");
    loadRoles();
  } else {
    const error = await res.json();
    customAlert(error.error || "Failed to delete role", "error");
  }
}

// ================= LOGOUT =================
function adminlogout() {
  sessionStorage.clear();
  window.location.href = "adminLogin.html";
  alert("Logout successfully!");
}

// ================= UPDATE ROLE =================
document.addEventListener("DOMContentLoaded", async () => {
  // loadSpecialty(0);
  const updateForm = document.getElementById("updateRoleForm");
  const roleInput = document.getElementById("role");
  const roleIdInput = document.getElementById("roleId");
  const msg = document.getElementById("msg");
  const msgBox = document.getElementById("msg_box");

  const roleId = new URLSearchParams(window.location.search).get("id");
  if (!roleId || !updateForm) return;

  try {
    const res = await fetch(`http://localhost:8080/api/roles/${roleId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load role");
    const data = await res.json();
    roleInput.value = data.role;
    roleIdInput.value = data.id;
  } catch {
    msg.innerText = "Error loading role!";
    msg.style.color = "red";
  }

  updateForm.onsubmit = async e => {
    e.preventDefault();
    msg.innerText = "";
    msgBox.innerText = "";

    try {
      const res = await fetch(`http://localhost:8080/api/roles/${roleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role: roleInput.value })
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "";
        if (data.errors) for (const field in data.errors) errorMessage += `${data.errors[field]} `;
        if (data.message) errorMessage += data.message;
        msg.innerText = errorMessage || "Update failed!";
        msg.style.color = "red";
      } else {
        msgBox.innerText = "Role Updated Successfully!";
        msgBox.style.right = "0";
        setTimeout(() => {
          msgBox.style.right = "-100%";
          window.location.href = "userRoles.html";
        }, 3000);
      }
    } catch {
      msg.innerText = "Network error!";
      msg.style.color = "red";
    }
  };

  document.getElementById("role_cancel_btn")?.addEventListener("click", () => {
    window.location.href = "userRoles.html";
  });
});

// ================= SPECIALTY LIST + PAGINATION =================
let currentPage = 0;
let pageSize = 3;

// async function loadSpecialty(page) {
//   try {
//     const res = await fetch(`http://localhost:8080/api/specialty/all?page=${page}&size=${pageSize}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//     });

//     const data = await res.json();
//     const tbody = document.querySelector("#specialtyTable tbody");
//     tbody.innerHTML = "";

//     data.content.forEach(specialty => {
//       tbody.innerHTML += `
//         <tr>
//           <td>${specialty.id}</td>
//           <td>${specialty.title}</td>
//           <td>
//             <button class="btn btn-sm btn-outline-warning me-1" onclick="window.location.href='updateSpecialty.html?id=${specialty.id}'"><i class="fas fa-edit"></i></button>
//             <button class="btn btn-sm btn-outline-danger" onclick="deleteSpecialty(${specialty.id})"><i class="fas fa-trash"></i></button>
//           </td>
//         </tr>`;
//     });

//     const pageDiv = document.querySelector(".pagination");
//     pageDiv.innerHTML = "";
//     for (let i = 0; i < data.totalPages; i++) {
//       pageDiv.innerHTML += `<li class="page-item page-link" onclick="loadSpecialty(${i})">${i + 1}</li>`;
//     }
//   } catch (err) {
//     console.error("Error loading specialties:", err);
//   }
// }

// loadSpecialty(currentPage);

// ================= DELETE SPECIALTY =================




async function loadSpecialty(page) {
  const keyword = document.getElementById("searchInput").value;

  try {
    const res = await fetch(`http://localhost:8080/api/specialty/all?page=${page}&size=${pageSize}&keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    const tbody = document.querySelector("#specialtyTable tbody");
    tbody.innerHTML = "";

    data.content.forEach(specialty => {
      tbody.innerHTML += `
        <tr>
          <td>${specialty.id}</td>
          <td>${specialty.title}</td>
          <td>
            <button class="btn btn-sm btn-outline-warning me-1" onclick="window.location.href='updateSpecialty.html?id=${specialty.id}'"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteSpecialty(${specialty.id})"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`;
    });

    // Pagination
    const pageDiv = document.querySelector(".pagination");
    pageDiv.innerHTML = "";
    for (let i = 0; i < data.totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item", "page-link");
      li.textContent = i + 1;
      li.onclick = () => loadSpecialty(i);
      if(i === data.number) li.classList.add("active");
      pageDiv.appendChild(li);
    }

  } catch (err) {
    console.error("Error loading specialties:", err);
  }
}

// loadSpecialty(4);

async function deleteSpecialty(id) {
  if (!id) return alert("Invalid ID");

  const confirm = await customConfirm("Are you sure to Delete the Specialty?");
  if (!confirm) return;

  const res = await fetch(`http://localhost:8080/api/specialty/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (res.ok) {
    customAlert("Specialty Deleted successfully!", "success");
    loadSpecialty(currentPage);
  } else {
    const error = await res.json();
    customAlert(error.error || "Failed to delete specialty", "error");
  }
}

// ================= ADD & UPDATE SPECIALTY =================
document.addEventListener("DOMContentLoaded", async () => {
  loadSpecialty(0);

  const updateSpecialtyForm = document.getElementById("update_specialty_form");
  const specialtySaveForm = document.getElementById("specialty_form");
  const title = document.getElementById("title");
  const specialtyIdInput = document.getElementById("id");
  const errmsg = document.getElementById("msg");

  const msgBox = document.getElementById("msg_box");
  const specialtyId = new URLSearchParams(window.location.search).get("id");

  // UPDATE
  if (updateSpecialtyForm && specialtyId) {
    try {
      const res = await fetch(`http://localhost:8080/api/specialty/${specialtyId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      title.value = data.title;
      specialtyIdInput.value = data.id;
    } catch {
      errmsg.innerText = "Error loading Specialty!";
      errmsg.style.color = "red";
    }

    updateSpecialtyForm.onsubmit = async e => {
      e.preventDefault();
      try {
        const res = await fetch(`http://localhost:8080/api/specialty/${specialtyId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ title: title.value })
        });
        const data = await res.json();

        if (!res.ok) {
          let errMsg = "";
          if (data.errors) for (const field in data.errors) errMsg += `${data.errors[field]} `;
          if (data.message) errMsg += data.message;
          errmsg.innerText = errMsg || "Update failed!";
          errmsg.style.color = "red";
        } else {
          msgBox.innerText = "Specialty Updated Successfully!";
          msgBox.style.right = "0";
          setTimeout(() => {
            msgBox.style.right = "-100%";
            window.location.href = "specialties.html";
          }, 3000);
        }
      } catch {
        errmsg.innerText = "Network error!";
        errmsg.style.color = "red";
      }
    };
  }

  // ADD
  if (specialtySaveForm) {
    specialtySaveForm.addEventListener("submit", async e => {
      e.preventDefault();
      errmsg.innerText = "";
      const titleValue = document.getElementById("title").value;

      const res = await fetch("http://localhost:8080/api/specialty/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: titleValue })
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors?.title) errmsg.innerText = data.errors.title;
        else errmsg.innerText = data.message || "Error saving specialty!";
      } else {
        msgBox.innerText = "New Specialty Added Successfully";
        msgBox.style.right = 0;
        specialtySaveForm.reset();
      }

      setTimeout(() => {
        msgBox.style.right = "-100%";
      }, 4000);
    });
  }
});


    const adddiseaSaveform=document.getElementById("adddiseas_form");

    const errmsg=document.getElementById("msg");
  if (adddiseaSaveform) {
    adddiseaSaveform.addEventListener("submit", async e => {
      e.preventDefault();
      errmsg.innerText = "";
      const title = document.getElementById("title").value;

      const res = await fetch("http://localhost:8080/api/diseas/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: title })
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors?.title) errmsg.innerText = data.errors.title;
        else errmsg.innerText = data.message || "Error saving specialty!";
      } else {
        msgBox.innerText = "New Dises Added Successfully";
        msgBox.style.right = 0;
        adddiseaSaveform.reset();
      }

      setTimeout(() => {
        msgBox.style.right = "-100%";
      }, 4000);
    });
  }


      














// ========================================================================================

  let totalPages = 1;
async function loadDoctorsWithePagination(page){
  try{
    const res = await fetch(`http://localhost:8080/api/dashboard/doctors?page=${page}&size=${pageSize}`,{
      headers: {"Authorization": `Bearer ${token}`}
    });

    if(!res.ok){
      const text = await res.text();
      console.error(" Failed to fetch doctors", res.status, text);
      return;
    }

    const response = await res.json();
    console.log("Doctors response:", response);
    // console.log("Doctors response:", response.status);
    // status

    const doctors = response.doctors; 
    console.log(doctors);
    const tbody = document.getElementById("doctorTableBody");
    tbody.innerHTML = "";

    if(!doctors || doctors.length === 0){
      tbody.innerHTML = `<tr><td colspan="11" class="text-center text-muted">No doctors found.</td></tr>`;
      return;
    }

    doctors.forEach(d=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
      
         <td>${d.profilePicture ? `<img src="data:image/png;base64,${d.profilePicture}" class="rounded-circle me-3"  height="40" width="50"/>` : ""}</td>

        <td>${d.firstName}</td>
        <td>${d.lastName}</td>
   
        <td>${d.specialty}</td>
        <td>${d.education}</td>
        <td>${d.universityName}</td>
     
        <td>${d.experienceYear || ""} Year</td>

           <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye" onclick="window.location.href='viewDoctore.html?id=${d.id}'"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteDoctor(${d.id})"><i class="fas fa-trash"></i></button>
      `;
      tbody.appendChild(tr);


    });

    //  const pageDiv = document.querySelector(".paginationnew");
    // pageDiv.innerHTML = "";
    // for (let i = 0; i < data.totalPages; i++) {
    //   pageDiv.innerHTML += `<li class="page-item page-link" onclick="loadSpecialty(${i})">${i + 1}</li>`;
    // }

    // Pagination buttons
    document.getElementById("pageInfo").innerText = `Page ${response.currentPage + 1} of ${response.totalPages}`;
    document.getElementById("prevBtn").disabled = (response.currentPage === 0);
    document.getElementById("nextBtn").disabled = (response.currentPage + 1 >= response.totalPages);

  }catch(err){
    console.error(" Error in loadDoctors:", err);
    document.getElementById("doctorTableBody").innerHTML = `<tr><td colspan="11" class="text-center text-danger">Failed to load doctors.</td></tr>`;
  }
}

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      loadDoctorsWithePagination(currentPage);
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++;
    loadDoctorsWithePagination(currentPage);
  });


  loadDoctorsWithePagination(currentPage);





// ======================================================================================





async function deleteDoctor(id) {

  if(!id) return alert("Invalid ID");

  const confirm = await customConfirm("Are you sure to Reomve The Docotor?");
   
  if(!confirm) return;
   
     const response=await fetch(`http://localhost:8080/api/dashboard/deleteDoctor/${id}`,{

            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}` }

     });

     if(response.ok)
     {
            customAlert("Doctore Remove Suesscfullly","success");
            loadDoctorsWithePagination(currentPage);
     }else{
                  
    const error = await response.json();

    customAlert(error.error || "Failed to delete Docotor", "error");

     }

      //  loadDoctorsWithePagination(page);
}




