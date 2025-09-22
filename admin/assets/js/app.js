// =====================role form save part start======================


const form=document.getElementById("RoleForm");
const msg=document.getElementById("msg");


const cancelBtn=document.getElementById("role_cancel_btn");

const msgBox=document.getElementById("msg_box");

if(form){

    msg.innerText="";

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


cancelBtn.addEventListener('click',function()
{
 form.reset();
});
});

}


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



// =======================load addSpecialty  start=====================

    
 let currentPage=0;

 let pageSize=3;

  async function loadSpecialty(page) {

                    const res=await fetch('http://localhost:8080/api/specialty/all?page='+page + "&size="+pageSize);

                    const data=await res.json();

                    let tbody=document.querySelector("#specialtyTable tbody");

                    tbody.innerHTML="";

                    data.content.forEach(specialty => {

                        let row=`<tr>
                                     <td>${specialty.id}</td>
                                     <td>${specialty.title}</td>

                                            <td>
                                                <button class="btn btn-sm btn-outline-warning me-1" onclick="window.location.href='updateSpecialty.html?id=${specialty.id}'"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-outline-danger" onclick="deleteSpecialty(${specialty.id})"><i class="fas fa-trash"></i></button>
                                            </td>
                            
                            
                            </tr>`;

                            tbody.innerHTML+=row;
                        
                    });


                    let pageDiv=document.querySelector(".pagination");
                    pageDiv.innerHTML="";

                    for(let i=0;i<data.totalPages;i++){

                        // pageDiv.innerHTML+=`<button  class="page-item" onclick="loadUser(${i})">${i+1}</button>`;

                         pageDiv.innerHTML+= `<li class="page-item  page-link" onclick="loadSpecialty(${i})">${i+1}</li>`;


                    }

 
    }


loadSpecialty(currentPage);

async function deleteSpecialty(id){


    if(!id) return alert("invalid id");


     const confirm=await customConfirm("are you sure to Delete the Specialty");
     if(!confirm) return;



     const res=await fetch(`http://localhost:8080/api/specialty/${id}`,{method : 'DELETE'});

    if(res.ok)
    {
       
        customAlert("Specialty Deleted successfully!", "success");
loadSpecialty(currentPage);

   
    }else{
        const error=await res.json();

        customAlert(error.error || 'failed');

    }

}
// =======================load ddSpecialty  end=======================

document.addEventListener("DOMContentLoaded", async () => {
//  msg.innerHTML="";
       
    const updateSpecialtyForm=document.getElementById("update_specialty_form");
    const title=document.getElementById("title");
    const specialtyIdInput=document.getElementById("id");




    const specialty_id=new URLSearchParams(window.location.search).get("id");

    const getSpecialty_URL=`http://localhost:8080/api/specialty/${specialty_id}`;

   
    // if (!specialty_id) {

    //     // msg.innerHTML="";
    //     msg.innerText = "No Specialty ID provided!";
    //     msg.style.color = "red";
    //     return;
    // }


    try{
        const res = await fetch(getSpecialty_URL);
        if (!res.ok) throw new Error("Failed to load Speclaity");

        const data = await res.json();
        title.value = data.title;  
        specialtyIdInput.value = data.id;  

    }catch {
        msg.innerText = "Error loading Specialty!";
        msg.style.color = "red";
        return;
    }
   


          
 updateSpecialtyForm.onsubmit = async e => {

                    e.preventDefault();

                       msg.innerText = "";
                       msgBox.innerText = "";
                       const updateSpecialty_URL=(`http://localhost:8080/api/specialty/${specialty_id}`);

                    
        try {
            const res = await fetch(updateSpecialty_URL,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title.value })
            });

            const data = await res.json();

            if (!res.ok) {
                let errorMessage = "";
                if (data.errors) {
                    for (const field in data.errors) {
                        errorMessage += `${data.errors[field]} `;
                    }
                }
                if (data.message) {
                    errorMessage += data.message;
                }
                msg.innerText = errorMessage || "Update failed!";
                msg.style.color = "red";
            } else {
                msgBox.innerText = "Specialty Updated Successfully!";
                msgBox.style.right = "0";
                window.location.href = "specialties.html";

                setTimeout(() => {
                    msgBox.style.right = "-100%";
                    window.location.href = "specialties.html";
                }, 3000);
            }

        } catch {
            msg.innerText = "Network error!";
            msg.style.color = "red";
        }

                    


                   
                  


           }

        
});





// =============================add specailty====================



const specialtySaveForm=document.getElementById("specialty_form");

const saveSpecialtyData_URL=("http://localhost:8080/api/specialty/save");

// const msgBox=document.getElementById("msg_box");

const errmsg=document.getElementById("msg");

specialtySaveForm.addEventListener('submit',async e =>{

    e.preventDefault();

    const title=document.getElementById("title").value;

    errmsg.innerText=" ";

    const res=await fetch(saveSpecialtyData_URL,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({title: title})

  });

    const data=await res.json();
    console.log(data);

    if(!res.ok){
     if(data.errors && data.errors.title)
     {
          errmsg.innerText=data.errors.title;
     }
     else if(data.message){

        errmsg.innerText=data.message;

     }
    }else{
         
          msgBox.innerText = "New Specialty Added Successfully"; //  shows success message
                msgBox.style.right=0;
                msg.innerText="";

                specialtySaveForm.reset();
     }
   
      setInterval(() => {

                msgBox.style.right="-100%";

                
      }, 4000);


    

});
    
// =============================end specailty====================



// ==============load data in dashord start=======================

  async function getTotalDoctor() {

    const totalPattient=document.getElementById("total_patient");

   

    try {
        
   
    const response= await fetch(`http://localhost:8080/api/dashboard/allPatent`);

    const allPatient=await response.json();

    if(response.ok)
    {
         totalPattient.innerHTML=allPatient;   

    }else{

        totalPattient.innerText="No Patients In Database";
    }
   }
     catch {

        totalPattient.innerText="Network Error";
        totalPattient.style.color="red";
        
    }
        
  }

  getTotalDoctor();

    async function getTotalPatient() {

    const totalDoctor=document.getElementById("total_doctor");

    // const totalDotor_URL="http://localhost:8080/api/dashboard/allDoctor";

   
   try {

     const response= await fetch(`http://localhost:8080/api/dashboard/allDoctor`);

    const allDoctore=await response.json();

    if(response.ok)
    {
         totalDoctor.innerHTML=allDoctore;   

    }else{

        totalDoctor.innerText="No Docotore In Database";
    }

    
   } catch {
                 totalDoctor.innerText="Network Err";
                 totalDoctor.style.color="red";
                 
   }
    

        
  }

  getTotalPatient();

// ==============load data in dashord start=======================
















