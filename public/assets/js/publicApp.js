// ============================ start of loading roles in select box===============
async function loadRoles() {

            const res=await fetch('http://localhost:8080/api/user/roles');

            const roles=await res.json();

            const select=document.getElementById("roleId");
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;        // <-- correct numeric ID
                option.textContent = role.role; // <-- visible name
                select.appendChild(option);
});

        }

loadRoles()

async function loadSpecialty() {

            const res=await fetch('http://localhost:8080/api/specialty/all_Specialty');

            const speciaty=await res.json();

            console.log(speciaty);

            const select=document.getElementById("specialtyId");
            speciaty.forEach(speciaty => {
                const option = document.createElement('option');
                option.value = speciaty.id;        // <-- correct numeric ID
                option.textContent = speciaty.title; // <-- visible name
                select.appendChild(option);
});

        }

loadSpecialty();



document.getElementById("registrationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;

    // msg_err
    const formData = new FormData(form);

    try {
        const response = await fetch("http://localhost:8080/api/user/save", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        console.log(data);

    form.querySelectorAll('.msg_err').forEach(span => span.innerText = '');

    if (data.status === "error" && data.errors) {
    const errors = data.errors;
    for (const field in errors) {
        const input = form.querySelector(`[name="${field}"]`);
        if (input) {
        
            const span = input.parentNode.querySelector('.msg_err');
            if (span) span.innerText = errors[field]; 
        }
    }

}
if (data.status === "error" && data.message) {
    document.getElementById("globalError").innerText = data.message;
    return;
}

   
        // After user fills registration form and submits
        const typedUsername = document.getElementById("userName").value;
        const typedPassword = document.getElementById("password").value;

        // store plain password for auto-login
        sessionStorage.setItem("registrationUserName", typedUsername);
        sessionStorage.setItem("registrationPassword", typedPassword);



        if(data.user.roleId==1)
         {
                window.location.href=`doctorForm.html?id=${data.user.id}`;
        }else if(data.user.roleId==72){

              window.location.href=`patientForm.html?id=${data.user.id}`;

        }
        
        
    } catch (err) {

        
      
    }
});




// ===========================start of save doctore =============



   


// ===========================emd of save doctore===============


