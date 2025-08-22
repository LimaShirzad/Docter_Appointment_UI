 async function loadRoles() {

            const res=await fetch('http://localhost:8080/api/roles');

            const roles=await res.json();

            const select=document.getElementById("role");
            select.innerHTML='';
            
            roles.forEach(role => {

                    const row=document.createElement('option');

                    row.innerHTML +=`

                                <option value="${role.id}">${role.role}</option>                   
                    
                    
                    `;

                    select.appendChild(row);
                
                
            });
        }

loadRoles();