// file_loader_github.js - GitHub ONLY version
const documentRegistry = {
    // Constitution
    'constitution': 'contents/01B_constitution.md',

    // Base System
    'legal_dictionary': 'contents/01C_legal_dictionary.md',
    'department_structure': 'contents/01D_department_structure.md',
    'agency_structure': 'contents/01E_agency_structure.md',
    'tax_structure': 'contents/01F_tax_structure.md',
    'law_making_process': 'contents/01G_law_making_process.md',
    'governing_system': 'contents/01H_governing_system.md',

    // Penal Code
    'criminal_cowardice': 'contents/penal_code/criminal_cowardice.md',
    'defense_and_liability': 'contents/penal_code/defense_and_liability.md',
    'homicide': 'contents/penal_code/homicide.md',

    // Acts and Bills
    'secure_systems_act': 'contents/acts/01A_secure_microkernel_systems_act.md',
    'adult_freedom_guarantor_act': 'contents/acts/01B_adult_freedom_guarantor_act.md',
    'universal_sanitary_infrastructure_act': 'contents/acts/01C_universal_sanitary_infrastructure.md',
    'hate_crime_enhancement_act': 'contents/acts/01D_hate_crime_enhancement_act.md',
    'hate_symbol_evidence_act': 'contents/acts/01E_hate_symbol_evidence_act.md',
    'social_compliance_act': 'contents/acts/01F_social_compliance_act.md',
    'animal_testing_act': 'contents/acts/01G_animal_testing_act.md',
    'military_age_cognition_act': 'contents/acts/01H_military_age_cognition_act.md',
    'conversion_therapy_ban': 'contents/acts/01I_conversion_therapy_ban.md',
    'responsible_carry': 'contents/acts/01J_responsible_carry.md',
    'school_nutrition': 'contents/acts/01K_school_nutrition_integrity.md',
    'substance_free': 'contents/acts/01L_substance_free_spaces.md',

    // Legal Framework & Governance
    'poetic_justice': 'contents/education/textbook/00_analysis-flexible_sentencing.md',
    'proxicide_doctrine': 'contents/education/textbook/01A_analysis-proxicide_doctrine.md',
    'privacy_and_surveilance': 'contents/education/textbook/01A0_analysis-balance_of_privacy_and_surveilance.md',
    'private_prisons': 'contents/education/textbook/01A01_analysis-private_prisons.md',
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
    'proportionate_fines': 'contents/education/textbook/01W0_analysis-proportionate_fines.md',
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
    'anti_transphobic_showdown': 'contents/simulations/scenarios/anti_transphobic_showdown.md',
    'atlas_dilemma': 'contents/simulations/scenarios/atlas_dilemma.md',
    'landlords_gambit': 'contents/simulations/scenarios/landlords_gambit.md',
    'nathaniels_dilemma': 'contents/simulations/scenarios/nathaniels_dilemma.md',
    'quarantine_dilemma': 'contents/simulations/scenarios/quarantine_dilemma.md',
    'sterling_dilemma': 'contents/simulations/scenarios/sterling_dilemma.md',
    'case_of_two_schools': 'contents/simulations/scenarios/the_case_of_two_schools.md',
    'groves_defense': 'contents/simulations/scenarios/the_groves_defense.md',
    'mathematical_sentence': 'contents/simulations/scenarios/the_mathematical_sentence.md',
    'secular_defense': 'contents/simulations/scenarios/the_secular_defense.md'
};

// PURE GITHUB LOADER - NO CODEBERG, NO CORS, NO FALLBACKS
async function loadDocument(docId) {
    console.log(`GitHub Loader: Loading ${docId}`);
    
    const filePath = documentRegistry[docId];
    if (!filePath) {
        console.error('Document not found:', docId);
        showError(`Document "${docId}" not found in registry`);
        return false;
    }
    
    const output = document.getElementById('markdown-output');
    if (!output) {
        console.error('markdown-output element not found');
        return false;
    }
    
    // Update URL
    window.location.hash = docId;
    
    // Show loading
    output.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p>Loading <strong>${docId}</strong>...</p>
            <p><small>Source: GitHub</small></p>
            <div style="width: 100px; height: 3px; background: #24292e; margin: 20px auto;"></div>
        </div>
    `;
    
    // GitHub Raw URL - THE ONLY SOURCE
    const githubUrl = `https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/${filePath}`;
    console.log('GitHub URL:', githubUrl);
    
    try {
        // Simple fetch - no CORS issues with GitHub Raw
        const response = await fetch(githubUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub returned HTTP ${response.status}: ${response.statusText}`);
        }
        
        const text = await response.text();
        console.log(`✅ Loaded ${text.length} characters from GitHub`);
        
        // Parse markdown
        if (window.parseMarkdown) {
            output.innerHTML = window.parseMarkdown(text);
        } else {
            output.innerHTML = `<pre>${text}</pre>`;
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ GitHub load failed:', error);
        
        // GitHub-specific error
        output.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d63031;">
                <h3>⚠️ GitHub Load Failed</h3>
                <p>Could not load "${docId}" from GitHub.</p>
                <p><strong>Error:</strong> ${error.message}</p>
                <p><strong>File:</strong> ${filePath}</p>
                
                <div style="margin-top: 30px; background: #f8f9fa; padding: 20px; border-radius: 5px; text-align: left;">
                    <h4>Possible issues:</h4>
                    <ol>
                        <li>The file doesn't exist at: <code>${filePath}</code></li>
                        <li>GitHub is down or rate-limiting</li>
                        <li>Network connectivity issues</li>
                        <li>Browser extension blocking the request</li>
                    </ol>
                    
                    <h4>Direct links:</h4>
                    <ul>
                        <li><a href="${githubUrl}" target="_blank">GitHub Raw File</a></li>
                        <li><a href="https://github.com/GeaucefStone/Secular_Democratic_Republic/blob/main/${filePath}" target="_blank">GitHub Repository View</a></li>
                    </ul>
                </div>
                
                <div style="margin-top: 30px;">
                    <button onclick="loadDocument('${docId}')" 
                            style="padding: 10px 20px; background: #3498db; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                        Try Again
                    </button>
                    <button onclick="testGitHubConnection()" 
                            style="padding: 10px 20px; background: #f39c12; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                        Test GitHub Connection
                    </button>
                </div>
                
                <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    <p>This is a GitHub-only loader. If GitHub is blocked in your region, 
                    you need to use the Codeberg version of this site.</p>
                </div>
            </div>
        `;
        
        return false;
    }
}

// Test GitHub connection
async function testGitHubConnection() {
    const testUrl = 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/01B_constitution.md';
    const output = document.getElementById('markdown-output');
    
    output.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p>Testing GitHub connection...</p>
            <div style="width: 100px; height: 3px; background: #f39c12; margin: 20px auto;"></div>
        </div>
    `;
    
    try {
        const start = Date.now();
        const response = await fetch(testUrl);
        const time = Date.now() - start;
        
        if (response.ok) {
            output.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #2ecc71;">
                    <h3>✅ GitHub Connection Test</h3>
                    <p><strong>Status:</strong> Connected (${time}ms)</p>
                    <p><strong>HTTP:</strong> ${response.status} ${response.statusText}</p>
                    <button onclick="loadDocument('constitution')" 
                            style="padding: 10px 20px; background: #3498db; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
                        Load Constitution
                    </button>
                </div>
            `;
        } else {
            output.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #d63031;">
                    <h3>❌ GitHub Connection Test</h3>
                    <p><strong>Status:</strong> Failed (${time}ms)</p>
                    <p><strong>HTTP:</strong> ${response.status} ${response.statusText}</p>
                    <p>GitHub is reachable but returned an error.</p>
                </div>
            `;
        }
    } catch (error) {
        output.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d63031;">
                <h3>❌ GitHub Connection Test</h3>
                <p><strong>Error:</strong> ${error.name}</p>
                <p><strong>Message:</strong> ${error.message}</p>
                <p>GitHub is not reachable from your network.</p>
            </div>
        `;
    }
}

function showError(message) {
    const output = document.getElementById('markdown-output');
    if (output) {
        output.innerHTML = `<div style="color: #d63031; padding: 20px;">${message}</div>`;
    }
}

// Get all document IDs (for debugging)
function getAllDocumentIds() {
    return Object.keys(documentRegistry);
}

// Get document count
function getDocumentCount() {
    return Object.keys(documentRegistry).length;
}

// Check if document exists
function documentExists(docId) {
    return !!documentRegistry[docId];
}

// Initialize
function initDocumentLoader() {
    console.log('GitHub-only document loader initialized');
    console.log(`Registry contains ${getDocumentCount()} documents`);
    
    // Load document from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && documentRegistry[hash]) {
        console.log(`Loading from hash: ${hash}`);
        setTimeout(() => loadDocument(hash), 100);
    } else if (hash) {
        console.warn(`Hash "${hash}" not found in registry`);
    }
    
    // Set up sidebar navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip dropdown toggles
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1);
            
            if (documentRegistry[docId]) {
                loadDocument(docId);
            } else {
                console.error(`Document "${docId}" not found in registry`);
                showError(`Document "${docId}" not found. Check console for available documents.`);
            }
        });
    });
    
    // Add debug info
    console.log('Available documents:', getAllDocumentIds());
}

// Export
window.loadDocument = loadDocument;
window.testGitHubConnection = testGitHubConnection;
window.getAllDocumentIds = getAllDocumentIds;
window.getDocumentCount = getDocumentCount;
window.documentExists = documentExists;
window.initDocumentLoader = initDocumentLoader;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocumentLoader);
} else {
    initDocumentLoader();
}