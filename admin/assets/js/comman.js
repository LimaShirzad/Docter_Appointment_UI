//  document.querySelector('.menu-toggle').addEventListener('click', function() {
//             document.querySelector('.sidebar').classList.toggle('active');
//         });
        
//         // Navigation between pages
//         document.querySelectorAll('.sidebar-menu a').forEach(link => {
//             link.addEventListener('click', function(e) {
//                 e.preventDefault();
                
//                 // Remove active class from all links
//                 document.querySelectorAll('.sidebar-menu a').forEach(item => {
//                     item.classList.remove('active');
//                 });
                
//                 // Add active class to clicked link
//                 this.classList.add('active');
                
//                 // Hide all pages
//                 document.querySelectorAll('.page').forEach(page => {
//                     page.classList.remove('active');
//                 });
                
//                 // Show the selected page
//                 const pageId = this.getAttribute('data-page');
//                 document.getElementById(pageId).classList.add('active');
                
//                 // Close sidebar on mobile after selection
//                 if (window.innerWidth < 992) {
//                     document.querySelector('.sidebar').classList.remove('active');
//                 }
//  });
   
          
           
// });


// document.addEventListener("DOMContentLoaded",function()


// {



 document.getElementById('menu-toggle').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
        
        // Navigation between pages
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.sidebar-menu a').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
             
                });
                
            
                // Close sidebar on mobile after selection
                if (window.innerWidth < 992) {
                    document.querySelector('.sidebar').classList.remove('active');
                }
 });
   
// });


