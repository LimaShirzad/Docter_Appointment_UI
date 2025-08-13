// =====================role form save part start======================
const form=document.getElementById("RoleForm");
const msg=document.getElementById("msg");


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

           const data=await res.json();

           if(!res.ok){

                msg.innerText=data.name || '';
               
           }else{

                 msg.innerText= data.message;

           }



        //    let data= await res.json();
        //     if(res.ok){
        //         msg.style.color='green';
        //         msg.innerText='role saved ${data.id}';
        //         form.reset();
        //     }else{
        //                 msg.style.color='red';
        //                 msg.innerText=data.name || 'err saving role';

        //     }

        //     form.reset();


        
    
        
    



});
// =====================role form save part end======================


