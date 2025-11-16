// File Loader for Markdown Documents
const documentRegistry = {
    'constitution': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/01B_constitution.md',
    'poetic_justice': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/00_analysis-flexible_sentencing.md',
    'proxicide_doctrine': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01A_analysis-proxicide_doctrine.md',
    'tiered_self_defense_framework': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01B_analysis-tiered_self_defense_framework.md',
    'defense_and_transferred_liability': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01C_analysis-defense_and_transferred_liability.md',
    'the_last_landlord': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01D_the_last_landlord.md',
    'housing': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01E_analysis-housing.md',
    'what_is_a_theocrat': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01F_analysis-what_is_a_theocrat.md', 
};

// Load a specific document by ID
function loadDocument(docId) {
    const url = documentRegistry[docId];
    if (!url) {
        console.error('Document not found:', docId);
        return false;
    }

    const output = document.getElementById('markdown-output');
    
    // Show loading state
    output.innerHTML = '<p style="text-align: center; color: #999;">Loading document...</p>';
    
    // Update URL without page reload
    window.history.pushState(null, '', `#${docId}`);
    
    // Use your existing markdown loader
    loadMarkdownFromGitHub(url);
    return true;
}

// Get all available document IDs
function getAvailableDocuments() {
    return Object.keys(documentRegistry);
}

// Get document URL by ID
function getDocumentUrl(docId) {
    return documentRegistry[docId];
}

// Initialize document loader
function initDocumentLoader() {
    // Load document from URL hash if present
    const initialDoc = window.location.hash.substring(1);
    if (initialDoc && documentRegistry[initialDoc]) {
        loadDocument(initialDoc);
    }
    
    return true;
}
