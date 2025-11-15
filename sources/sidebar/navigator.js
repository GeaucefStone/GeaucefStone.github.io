// Document configuration - maps sidebar links to your markdown files
const documents = {
    'constitution': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/01B_constitution.md'
};

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    // Set up sidebar click handlers
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1); // Remove #
            loadDocument(docId);
            
            // Update active state
            document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load document from URL hash if present
    const initialDoc = window.location.hash.substring(1);
    if (initialDoc && documents[initialDoc]) {
        loadDocument(initialDoc);
        document.querySelector(`a[href="#${initialDoc}"]`).classList.add('active');
    }
});

// Load document using your existing markdown loader
function loadDocument(docId) {
    const url = documents[docId];
    if (!url) return;

    const output = document.getElementById('markdown-output');
    
    // Show loading state
    output.innerHTML = '<p style="text-align: center; color: #999;">Loading document...</p>';
    
    // Update URL without page reload
    window.history.pushState(null, '', `#${docId}`);
    
    // Use your existing markdown loader
    loadMarkdownFromGitHub(url);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const docId = window.location.hash.substring(1);
    if (docId && documents[docId]) {
        loadDocument(docId);
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        document.querySelector(`a[href="#${docId}"]`).classList.add('active');
    }
});
