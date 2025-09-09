async function checkAuth() {
    const token = localStorage.getItem("token");

    if(!token){
        // که JWT موجود نه وي → Login page ته redirect
        window.location.href = "adminLogin.html";
        return;
    }

    // JWT شته، نو Data fetch کوه
    try {
        const res = await fetch("http://localhost:8080/api/dashboard", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(res.status === 401){
            // JWT invalid یا expired → Login page ته redirect
            window.location.href = "login.html";
        } else {
            const data = await res.json();
            console.log("Dashboard Data:", data);
            // دلته د Dashboard DOM update کوه
        }
    } catch (err) {
        console.error("Error fetching dashboard data", err);
        window.location.href = "adminLogin.html";
    }
};

checkAuth();
