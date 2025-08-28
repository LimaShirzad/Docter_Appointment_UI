// ============================ start of loading roles in select box===============
async function loadRoles() {

            const res=await fetch('http://localhost:8080/api/user/roles');

            const roles=await res.json();

            const select=document.getElementById("role");
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



let saveUrl="http://localhost:8080/api/user/save";
document.getElementById("registrationForm").addEventListener('submit',async function(e)
{

        e.preventDefault();

        const formData=new FormData(this);

        const response= await fetch(saveUrl,{

                method: "POST",
                body: formData


        }).then(async res=>{
                if(!res.ok)
                {
                    const errors=await res.json();
                    console.log(errors);
                    return;
                }
                return res.json();
        }).then(data=>console.log(data));

        // return res.json();)

        // const data=await response.json();
        // console.log(data);


});



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
