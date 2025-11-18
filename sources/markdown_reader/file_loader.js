// File Loader for Markdown Documents with URL Shortening
const documentRegistry = {
    // Short IDs mapped to file paths (not full URLs)
    'constitution': 'contents/01B_constitution.md',
    // Legal Framework and Governance
    'poetic_justice': 'contents/education/textbook/00_analysis-flexible_sentencing.md',
    'proxicide_doctrine': 'contents/education/textbook/01A_analysis-proxicide_doctrine.md',
    'tiered_self_defense_framework': 'contents/education/textbook/01B_analysis-tiered_self_defense_framework.md',
    'defense_and_transferred_liability': 'contents/education/textbook/01C_analysis-defense_and_transferred_liability.md',
    'the_last_landlord': 'contents/education/textbook/01D_the_last_landlord.md',
    'housing': 'contents/education/textbook/01E_analysis-housing.md',
    'what_is_a_theocrat': 'contents/education/textbook/01F_analysis-what_is_a_theocrat.md', 
    'immigration_and_secularism': 'contents/education/textbook/01G_analysis-immigration_and_secularism.md',
    'bodily_autonomy_and_public_health': 'contents/education/textbook/01H_analysis-bodily_autonomy_and_public_health.md',
    'womens_autonomy': 'contents/education/textbook/01I_analysis-womens_autonomy.md', 
    'coerced_marriage': 'contents/education/textbook/01J_analysis-coerced_marriage.md',
    'no_fault_divorce': 'contents/education/textbook/01K_analysis-no_fault_divorce.md',
    'romeo_and_juliet': 'contents/education/textbook/01L_analysis-romeo_and_juliet.md',
    'safe_emancipation_of_minors': 'contents/education/textbook/01M_analysis-safe_emancipation_of_minors.md',
    'citizens_branch': 'contents/education/textbook/01N_analysis-citizens_branch.md',
    'workers_branch': 'contents/education/textbook/01O_analysis-workers_branch.md',
    'scientific_branch': 'contents/education/textbook/01P_analysis-scientific_branch.md', // Fixed duplicate
    'surgeon_court': 'contents/education/textbook/01Q_analysis-surgeon_court.md',
    'historian_branch': 'contents/education/textbook/01R_analysis-historian_branch.md',
    'historian_court': 'contents/education/textbook/01S_analysis-historian_court.md', 
    'covert_ops': 'contents/education/textbook/01T_analysis-covert_ops.md', 
    'conspiracy_framework': 'contents/education/textbook/01U_analysis-conspiracy_framework.md', 
    'financial_conflicts': 'contents/education/textbook/01V_analysis-financial_conflicts.md', 
    'substance_over_form': 'contents/education/textbook/01W_analysis-substance_over_form.md', 
    'poisoned_chalice_provision': 'contents/education/textbook/01X_analysis-poisoned_chalice_provision.md', 
    'anti_corruption_architecture': 'contents/education/textbook/01Y_anti_corruption_architecture.md', 
    'civil_war_crimes': 'contents/education/textbook/01Z_analysis-civil_war_crimes.md', 
    'retained_sovereignty': 'contents/education/textbook/02A_analysis-retained_sovereignty.md',
    // Case Study
    'highway_interceptor': 'contents/simulations/case_study/highway_interceptor_case.md',
    'hoa_vs_doe': 'contents/simulations/case_study/hoa_vs_doe.md',
    'oakwood_vs_vance': 'contents/simulations/case_study/oakwood_vs_vance.md', 
    'petrov_vs_extradition': 'contents/simulations/case_study/petrov_vs_extradition_treaty.md',
    'poisoned_chalic_doctrine': 'contents/simulations/case_study/poisoned_chalice_doctrine.md',
    'the_perpetual_tenancy': 'contents/simulations/case_study/the_perpetual_tenancy.md', 
    'thou_shalt_not_bear_false_witness': 'contents/simulations/case_study/thou_shalt_not_bear_false_witness.md',
    'tiptoeing_the_voice_activated_minefield': 'contents/simulations/case_study/tiptoeing_the_voice_activated_minefield.md', 
    'troll_kings_downfall': 'contents/simulations/case_study/troll_kings_downfall.md', 
    
};

// Configuration - update these once if your repo changes
const REPO_CONFIG = {
    username: 'GeaucefStone',
    repository: 'Secular_Democratic_Republic',
    branch: 'main',
    basePath: 'https://raw.githubusercontent.com'
};

// Generate full raw GitHub URL from short path
function getFullRawUrl(shortPath) {
    return `${REPO_CONFIG.basePath}/${REPO_CONFIG.username}/${REPO_CONFIG.repository}/${REPO_CONFIG.branch}/${shortPath}`;
}

// Load a specific document by ID
function loadDocument(docId) {
    const shortPath = documentRegistry[docId];
    if (!shortPath) {
        console.error('Document not found:', docId);
        return false;
    }

    const fullUrl = getFullRawUrl(shortPath);
    const output = document.getElementById('markdown-output');
    
    // Show loading state
    output.innerHTML = '<p style="text-align: center; color: #999;">Loading document...</p>';
    
    // Update URL without page reload
    window.history.pushState(null, '', `#${docId}`);
    
    // Use your existing markdown loader
    loadMarkdownFromGitHub(fullUrl);
    return true;
}

// Get all available document IDs
function getAvailableDocuments() {
    return Object.keys(documentRegistry);
}

// Get full document URL by ID
function getDocumentUrl(docId) {
    const shortPath = documentRegistry[docId];
    return shortPath ? getFullRawUrl(shortPath) : null;
}

// Get short path by ID (useful for debugging)
function getDocumentShortPath(docId) {
    return documentRegistry[docId];
}

// Update repository configuration (if you ever move the repo)
function updateRepoConfig(newConfig) {
    Object.assign(REPO_CONFIG, newConfig);
    console.log('Repository configuration updated:', REPO_CONFIG);
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

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        documentRegistry,
        loadDocument,
        getAvailableDocuments,
        getDocumentUrl,
        getDocumentShortPath,
        updateRepoConfig,
        initDocumentLoader,
        REPO_CONFIG
    };
}