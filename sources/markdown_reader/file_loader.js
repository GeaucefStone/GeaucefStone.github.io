// File Loader for Markdown Documents with Multi-Platform Support
const documentRegistry = {
    // Short IDs mapped to file paths (not full URLs)
    'constitution': 'contents/01B_constitution.md',

    // Base System
    'legal_dictionary': 'contents/01C_legal_dictionary.md',
    'department_structure': 'contents/01D_department_structure.md',
    'agency_structure': 'contents/01E_agency_structure.md',
    'tax_structure': 'contents/01F_tax_structure.md',
    'law_making_process': 'contents/01G_law_making_process.md',
    'governing_syste': 'contents/01H_governing_system.md',

    // Legal Framework and Governance
    'poetic_justice': 'contents/education/textbook/00_analysis-flexible_sentencing.md',
    'proxicide_doctrine': 'contents/education/textbook/01A_analysis-proxicide_doctrine.md',
    'privacy_and_surveilance': 'contents/education/textbook/01A0_analysis-balance_of_privacy_and_surveilance.md',
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
    'scientific_branch': 'contents/education/textbook/01P_analysis-scientific_branch.md',
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

    // Civil Acts
    'holocaust_denial': 'contents/simulations/civil_acts/holocaust_denial.md',

    // Scenarios
    'atlas_dilemma': 'contents/simulations/scenarios/atlas_dilemma.md',
    'landlords_gambit': 'contents/simulations/scenarios/landlords_gambit.md',
    'nathaniels_dilemma': 'contents/simulations/scenarios/nathaniels_dilemma.md',
    'quarantine_dilemma': 'contents/simulations/scenarios/quarantine_dilemma.md',
    'sterling_dilemma': 'contents/simulations/scenarios/sterling_dilemma.md', 
    'case_of_two_schools': 'contents/simulations/scenarios/the_case_of_two_schools.md',
    'groves_defense': 'contents/simulations/scenarios/the_groves_defense.md', 
    'mathematical_sentence': 'contents/simulations/scenarios/the_mathematical_sentence.md',
    'secular_defense': 'contents/simulations/scenarios/the_secular_defense.md',
};

// Platform configurations
const PLATFORMS = {
    github: {
        name: 'GitHub',
        baseUrl: 'https://raw.githubusercontent.com',
        urlTemplate: '{baseUrl}/{username}/{repository}/{branch}/{filePath}'
    },
    codeberg: {
        name: 'Codeberg',
        baseUrl: 'https://codeberg.org',
        urlTemplate: '{baseUrl}/{username}/{repository}/raw/branch/{branch}/{filePath}'
    },
    gitlab: {
        name: 'GitLab',
        baseUrl: 'https://gitlab.com',
        urlTemplate: '{baseUrl}/{username}/{repository}/-/raw/{branch}/{filePath}'
    },
    gitea: {
        name: 'Gitea',
        baseUrl: 'https://gitea.com',
        urlTemplate: '{baseUrl}/{username}/{repository}/raw/branch/{branch}/{filePath}'
    }
};

// Default repository configuration
const REPO_CONFIG = {
    platform: 'github', // 'github', 'codeberg', 'gitlab', 'gitea'
    username: 'GeaucefStone',
    repository: 'Secular_Democratic_Republic',
    branch: 'main'
};

// Generate full raw URL from short path
function getFullRawUrl(shortPath) {
    const platform = PLATFORMS[REPO_CONFIG.platform];
    if (!platform) {
        console.error('Unsupported platform:', REPO_CONFIG.platform);
        return null;
    }
    
    return platform.urlTemplate
        .replace('{baseUrl}', platform.baseUrl)
        .replace('{username}', REPO_CONFIG.username)
        .replace('{repository}', REPO_CONFIG.repository)
        .replace('{branch}', REPO_CONFIG.branch)
        .replace('{filePath}', shortPath);
}

// Get URLs for all platforms (useful for mirroring)
function getAllPlatformUrls(docId) {
    const shortPath = documentRegistry[docId];
    if (!shortPath) return null;
    
    const urls = {};
    for (const [platformKey, platformConfig] of Object.entries(PLATFORMS)) {
        urls[platformKey] = platformConfig.urlTemplate
            .replace('{baseUrl}', platformConfig.baseUrl)
            .replace('{username}', REPO_CONFIG.username)
            .replace('{repository}', REPO_CONFIG.repository)
            .replace('{branch}', REPO_CONFIG.branch)
            .replace('{filePath}', shortPath);
    }
    return urls;
}

// Switch between platforms
function setPlatform(platform) {
    if (!PLATFORMS[platform]) {
        console.error('Unsupported platform. Available:', Object.keys(PLATFORMS));
        return false;
    }
    REPO_CONFIG.platform = platform;
    console.log(`Switched to ${PLATFORMS[platform].name}`);
    return true;
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
    
    // Show loading state with platform info
    output.innerHTML = `<p style="text-align: center; color: #999;">
        Loading document from ${PLATFORMS[REPO_CONFIG.platform].name}...
    </p>`;
    
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

// Get short path by ID
function getDocumentShortPath(docId) {
    return documentRegistry[docId];
}

// Update repository configuration
function updateRepoConfig(newConfig) {
    Object.assign(REPO_CONFIG, newConfig);
    console.log('Repository configuration updated:', REPO_CONFIG);
}

// Get current platform info
function getCurrentPlatform() {
    return {
        ...REPO_CONFIG,
        platformName: PLATFORMS[REPO_CONFIG.platform].name
    };
}

// Get document by category (useful for UI organization)
function getDocumentsByCategory() {
    const categories = {
        'Base System': [
            'constitution', 'legal_dictionary', 'department_structure', 
            'agency_structure', 'tax_structure'
        ],
        'Legal Framework': [
            'poetic_justice', 'proxicide_doctrine', 'tiered_self_defense_framework',
            'defense_and_transferred_liability', 'the_last_landlord', 'housing',
            'what_is_a_theocrat', 'immigration_and_secularism', 'bodily_autonomy_and_public_health',
            'womens_autonomy', 'coerced_marriage', 'no_fault_divorce', 'romeo_and_juliet',
            'safe_emancipation_of_minors', 'citizens_branch', 'workers_branch',
            'scientific_branch', 'surgeon_court', 'historian_branch', 'historian_court',
            'covert_ops', 'conspiracy_framework', 'financial_conflicts', 'substance_over_form',
            'poisoned_chalice_provision', 'anti_corruption_architecture', 'civil_war_crimes',
            'retained_sovereignty'
        ],
        'Case Studies': [
            'highway_interceptor', 'hoa_vs_doe', 'oakwood_vs_vance',
            'petrov_vs_extradition', 'poisoned_chalic_doctrine', 'the_perpetual_tenancy',
            'thou_shalt_not_bear_false_witness', 'tiptoeing_the_voice_activated_minefield',
            'troll_kings_downfall'
        ],
        'Civil Acts': [
            'holocaust_denial'
        ],
        'Scenarios': [
            'atlas_dilemma', 'landlords_gambit', 'nathaniels_dilemma',
            'quarantine_dilemma', 'sterling_dilemma', 'case_of_two_schools',
            'groves_defense', 'mathematical_sentence', 'secular_defense'
        ]
    };
    
    return categories;
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
        PLATFORMS,
        REPO_CONFIG,
        loadDocument,
        getAvailableDocuments,
        getDocumentUrl,
        getDocumentShortPath,
        updateRepoConfig,
        setPlatform,
        getCurrentPlatform,
        getAllPlatformUrls,
        getDocumentsByCategory,
        initDocumentLoader
    };
}
