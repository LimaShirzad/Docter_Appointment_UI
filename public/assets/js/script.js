

    const token = sessionStorage.getItem("token");
    
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");
    const id = sessionStorage.getItem("id");



    function logoutPatient() {
    sessionStorage.clear(); 
    window.location.href = "login.html";
}



async function loadPatientProfile() {

    // document.getElementById("username").innerText=username;
    // document.getElementById("role").innerText=role;
    
    console.log(token);

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    if (role != 72) {
        document.getElementById("err").innerText = "Access denied!";
        return;
    }

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

                 document.getElementById("profilePicture").src =
                "data:image/png;base64," + data.profilePicture;
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














      document.getElementById('cv').addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'None';
            document.getElementById('fileName').textContent = fileName;
        });


    