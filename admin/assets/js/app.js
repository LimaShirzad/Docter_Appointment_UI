// =====================role form save part start======================
const form=document.getElementById("RoleForm");
const msg=document.getElementById("msg");
const cancelBtn=document.getElementById("role_cancel_btn");

const msgBox=document.getElementById("msg_box");


form.addEventListener('submit',async e =>{

    e.preventDefault();

    const role=document.getElementById("role").value;


    const res=await fetch('http://localhost:8080/api/roles/save',{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({role})





           });

           const data = await res.json();

           if (!res.ok) {
            if (data.errors && data.errors.role) {
                msg.innerText = data.errors.role; // ✅ shows validation error
                msg.style.color="red";
            } else if (data.message) {
                msg.innerText = data.message; // ✅ shows business error
                msg.style.color="red";

            }
            } else {
                msgBox.innerText = "New Role Added Successfully"; // ✅ shows success message
                msgBox.style.right=0;
                msg.innerText="";

                form.reset();

            }



            setInterval(() => {
                msgBox.style.right="-100%";

                
            }, 5000);



});

cancelBtn.addEventListener('click',function()
{
 form.reset();
});



// =====================role form save part end======================

//         async function loadRoles() {

//             const res=await fetch('http://localhost:8080/api/roles');

//             const roles=await res.json();

//             const tbody=document.getElementById("roleTable").querySelector("tbody");
//             tbody.innerHTML='';
            
//             roles.forEach(role => {

//                     const row=document.createElement('tr');

//                     row.innerHTML +=`

//                                 <td>${role.id}</td>
//                                 <td>${role.role}</td>

//                                  <td>
//                                                 <button class="btn btn-sm btn-outline-primary me-1" ><i class="fas fa-eye"></i></button>
//                                                 <button class="btn btn-sm btn-outline-warning me-1"><i class="fas fa-edit"></i></button>
//                             <button class="btn btn-sm btn-outline-danger" onclick="deleteRole(${role.id})"><i class="fas fa-trash"></i></button>
//                                  </td>


                    
                    
                    
//                     `;

//                     tbody.appendChild(row);
                
                
//             });
//         }


// loadRoles();



// ==============================delete Role start=============================


function customConfirm(message) {
    return new Promise((resolve) => {
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


function customAlert(message, type = 'success') {
    const alertBox = document.getElementById("customAlert");
    const msg = document.getElementById("alertMessage");
    const box = alertBox.querySelector(".alert-box");

    msg.textContent = message;

    // Remove old type classes & add new type
    box.className = "alert-box " + type;

    alertBox.style.display = "block";

    // Hide after 2 seconds with fade-out
    setTimeout(() => {
        box.style.animation = "fadeSlideOut 0.4s ease forwards";
        setTimeout(() => {
            alertBox.style.display = "none";
            box.style.animation = "fadeSlideIn 0.4s ease forwards"; // reset for next use
        }, 400);
    }, 2000);
}



async function deleteRole(id)
{
 

 if(!id) return alert("invalid id");

//  if(confirm("Are you sure to delete role")){

     const confirm=await customConfirm("are you sure to delete the role");
     if(!confirm) return;

     const res=await fetch(`http://localhost:8080/api/roles/${id}`,{method : 'DELETE'});

    if(res.ok)
    {
       
        customAlert("Role deleted successfully!", "success");
        loadRoles();
    }else{
        const error=await res.json();

        customAlert(error.error || 'failed');

    }

//  }

}
// ==============================delete Role end=============================

// =======================update role satrt=====================




// =======================update role end=======================
