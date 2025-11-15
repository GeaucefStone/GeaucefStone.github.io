 // Load sidebar
fetch('sidebar.html')
   .then(response => {
       if (!response.ok) throw new Error('Sidebar not found');
       return response.text();
})
.then(html => {
   document.getElementById('sidebar-container').innerHTML = html;
})
.catch(error => {
   console.error('Error loading sidebar:', error);
   document.getElementById('sidebar-container').innerHTML = '<p>Navigation loading failed</p>';
});
