 const token = sessionStorage.getItem("token");
const role = sessionStorage.getItem("role");
const username = sessionStorage.getItem("username");
const id = sessionStorage.getItem("id");

if(!token){
       
        alert("Login first");
        window.location.href="login.html";
}
    function logoutPatient() {
    sessionStorage.clear(); 
    window.location.href = "login.html";
}



async function loadPatientProfile() {


    console.log(token);
    //  document.getElementById("role").innerText=token;

    // if (!token) {
    //     window.location.href = "login.html";
    //     return;
    // }

    // if (role != 72) {
    //     document.getElementById("err").innerText = "Access denied!";
    //     return;
    // }

    try {
        const response = await fetch("http://localhost:8080/api/patient/profile", {
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        });

        if (!response.ok) throw new Error("Failed to fetch pateint profile");

         
        const data = await response.json();
        console.log("patint Profile:", data);


          if (data.profilePicture) {
            document.getElementById("patientImage").src =
                "data:image/png;base64," + data.profilePicture;

                //  document.getElementById("profilePicture").src =
                // "data:image/png;base64," + data.profilePicture;
          }

          document.getElementById("firstName").innerHTML=data.firstName;
          document.getElementById("lastName").innerHTML=data.lastName;

          document.getElementById("profirstName").innerHTML=data.firstName;
          document.getElementById("prolastName").innerHTML=data.lastName;
          document.getElementById("gender").innerHTML=data.gender;
          document.getElementById("email").innerHTML=data.email;
          document.getElementById("userName").innerHTML=data.userName;
          document.getElementById("password").innerHTML=data.password;
          document.getElementById("bloodGroup").innerHTML=data.bloodGroup;
          document.getElementById("id").innerHTML=data.id;





    } catch (err) {
        console.error("Error:", err.message);
        document.getElementById("err").innerText = err.message;
    }
}


loadPatientProfile();







{/* <script> */}
document.addEventListener('DOMContentLoaded', async function () {
    // ✅ Read token and user data
    
    const doctorId = new URLSearchParams(window.location.search).get("doctorId");
    const patientId = sessionStorage.getItem("id");
    // const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("username");




    console.log("Doctor ID:", doctorId);
    console.log("Patient ID:", patientId);
    console.log("JWT Token:", token);
    console.log("JWT usename:", userName);

    // Select UI elements
    const selectTrigger = document.querySelector('.select-trigger');
    const optionsContainer = document.querySelector('.options-container');
    const selectedValue = document.querySelector('.selected-value .splaceholder');

    try {
        // ✅ Fetch all diseases from backend
        const response = await fetch("http://localhost:8080/api/diseases/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // send JWT token
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch diseases. Status: " + response.status);
        }

        const diseases = await response.json();
        // console.log("Loaded Diseases:", diseases);

        // ✅ Clear old options
        optionsContainer.innerHTML = "";

        // ✅ Create new dropdown options
        diseases.forEach(d => {
            const option = document.createElement('div');
            option.classList.add('option');
            option.setAttribute('data-value', d.id);
            option.innerHTML = `<span>${d.title}</span>`;
            // option.innerHTML = `<span>${d.id}</span>`;
            // console.log(option);

            optionsContainer.appendChild(option);
        });

        // ✅ Dropdown toggle open/close
        selectTrigger.addEventListener('click', function () {
            optionsContainer.classList.toggle('active');
            selectTrigger.classList.toggle('active');
        });

        // ✅ Select option handler
        optionsContainer.addEventListener('click', function (e) {
            const option = e.target.closest('.option');
            if (option) {
                const selectedId = option.getAttribute('data-value');
                const selectedText = option.textContent.trim();

                // Update UI text
                selectedValue.textContent = selectedText;

                // Highlight selected option
                optionsContainer.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                   diseaseId = option.getAttribute('data-value');
                option.classList.add('selected');

                // Close dropdown
                optionsContainer.classList.remove('active');
                selectTrigger.classList.remove('active');

                console.log("Selected Disease ID:", selectedId);
                console.log("Selected Disease Title:", selectedText);

                // ✅ Example: if you want to send selected disease to backend
                // (for example when booking appointment)
                // sendSelectedDisease(selectedId, doctorId, patientId, token);
            }
        });

        // ✅ Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!selectTrigger.contains(e.target)) {
                optionsContainer.classList.remove('active');
                selectTrigger.classList.remove('active');
            }
        });


 takeAppointmentBtn.addEventListener('click', async function () {
            if (!diseaseId) {
                alert("Please select a disease first!");
                return;
            }

            let date=document.getElementById("date").value;
            let time=document.getElementById("time").value;

            const appointmentData = {
                doctorId: doctorId,
                patientId: patientId,
                diseaseId: diseaseId,
                date: date,
                time: time
            };

            console.log("Sending appointment:", appointmentData);

            const saveResponse = await fetch("http://localhost:8080/api/appointments/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(appointmentData)
            });

            if (saveResponse.ok) {
                alert("✅ Appointment saved successfully!");
            } else {
                const errText = await saveResponse.text();
                alert(" Failed to save appointment: " + errText);
                console.log(errText);
            }
        });














    } catch (error) {
        console.error("Error loading diseases:", error);
    }





    









});

  
   



    //   document.getElementById('cv').addEventListener('change', function(e) {
    //         const fileName = e.target.files[0] ? e.target.files[0].name : 'None';
    //         document.getElementById('fileName').textContent = fileName;
    //     });

















        
    