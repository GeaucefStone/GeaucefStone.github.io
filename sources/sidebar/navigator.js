// Navigation handler - uses the file loader
document.addEventListener('DOMContentLoaded', function() {
    // Initialize document loader
    initDocumentLoader();
    
    // Get elements
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Mobile sidebar toggle
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            sidebarOverlay.classList.toggle('active');
        });
        
        // Close sidebar when overlay is clicked
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Dropdown functionality
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
        });
        
        // Prevent dropdown menu clicks from closing the dropdown
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Close dropdown when clicking outside of it
    document.addEventListener('click', function(e) {
        if (dropdownToggle && dropdownMenu) {
            const isClickInsideDropdown = dropdownToggle.contains(e.target) || dropdownMenu.contains(e.target);
            if (!isClickInsideDropdown) {
                dropdownToggle.classList.remove('active');
                dropdownMenu.classList.remove('active');
            }
        }
    });
    
    // Handle all document link clicks
    document.querySelectorAll('.sidebar-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle dropdown toggle separately
            if (this.classList.contains('dropdown-toggle')) {
                return; // Already handled above
            }
            
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1);
            
            // Use the file loader to load the document
            if (loadDocument(docId)) {
                // Update active state for all links
                document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                // If this is a dropdown item, also activate the dropdown toggle
                if (this.closest('.dropdown-menu')) {
                    const parentDropdown = this.closest('.dropdown');
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
                
                // Close mobile sidebar if on mobile (but NOT for dropdown toggle)
                if (window.innerWidth <= 768 && !this.classList.contains('dropdown-toggle')) {
                    if (sidebar && sidebarOverlay) {
                        sidebar.classList.remove('mobile-open');
                        sidebarOverlay.classList.remove('active');
                    }
                }
            }
        });
    });

    // Set initial active state based on URL hash
    const initialDoc = window.location.hash.substring(1);
    if (initialDoc) {
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${initialDoc}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // If active link is in dropdown, open the dropdown
            const parentDropdown = activeLink.closest('.dropdown-menu');
            if (parentDropdown) {
                parentDropdown.classList.add('active');
                const dropdownToggle = parentDropdown.previousElementSibling;
                if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (sidebar && sidebarOverlay) {
                sidebar.classList.remove('mobile-open');
                sidebarOverlay.classList.remove('active');
            }
        }
    });
    
    // Wrap tables for mobile scrolling
    function wrapTablesForMobile() {
        document.querySelectorAll('#markdown-output table').forEach(table => {
            if (!table.parentElement.classList.contains('table-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-container';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }
    
    // Observe for content changes to wrap new tables
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                wrapTablesForMobile();
            }
        });
    });
    
    const markdownOutput = document.getElementById('markdown-output');
    if (markdownOutput) {
        observer.observe(markdownOutput, {
            childList: true,
            subtree: true
        });
        
        // Initial wrap
        wrapTablesForMobile();
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const docId = window.location.hash.substring(1);
    if (docId) {
        loadDocument(docId);
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${docId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // If active link is in dropdown, open the dropdown
            const parentDropdown = activeLink.closest('.dropdown-menu');
            if (parentDropdown) {
                parentDropdown.classList.add('active');
                const dropdownToggle = parentDropdown.previousElementSibling;
                if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    }
});
