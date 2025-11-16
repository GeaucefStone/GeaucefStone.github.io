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
    'immigration_and_secularism': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01G_analysis-immigration_and_secularism.md',
    'bodily_autonomy_and_public_health': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01H_analysis-bodily_autonomy_and_public_health.md',
    'womens_autonomy': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01I_analysis-womens_autonomy.md', 
    'coerced_marriage': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01J_analysis-coerced_marriage.md',
    'no_fault_divorce': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01K_analysis-no_fault_divorce.md',
    'romeo_and_juliet': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01L_analysis-romeo_and_juliet.md',
    'safe_emancipation_of_minors': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01M_analysis-safe_emancipation_of_minors.md',
    'citizens_branch': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01N_analysis-citizens_branch.md',
    'workers_branch': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01O_analysis-workers_branch.md',
    'scientific_branch': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01N_analysis-citizens_branch.md', 
    'surgeon_court': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/refs/heads/main/contents/education/textbook/01Q_analysis-surgeon_court.md',
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
