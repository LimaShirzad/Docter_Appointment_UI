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

loadRoles();
// ============================ end of loading roles in select box===============


// ======================== start of saving user information ================




// document.getElementById("registrationForm").addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const formData = new FormData(this); // now includes the selected file
//     const response = await fetch(saveUrl, {
//         method: "POST",
//         body: formData
//     });

//     const data = await response.json();
//     console.log(data);
// });











// ======================== end of saving user information ================
