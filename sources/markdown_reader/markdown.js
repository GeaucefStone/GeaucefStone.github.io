// Markdown Parser - Pure parsing functionality only
(function() {
    // Focus on bold, italic (underscores only), and links
    function processBold(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    function processItalic(text) {
        return text.replace(/_(.*?)_/g, '<em>$1</em>');
    }

    function processLinks(text) {
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    }

    function processInlineMarkdown(text) {
        return processLinks(processItalic(processBold(text)));
    }

    // Function to parse markdown tables
    function parseTable(lines, startIndex) {
        let tableLines = [];
        let i = startIndex;
        
        while (i < lines.length && lines[i].trim().includes('|')) {
            tableLines.push(lines[i]);
            i++;
        }
        
        if (tableLines.length < 2) return { html: '', newIndex: startIndex };
        
        let html = '<table>';
        let hasHeader = false;
        
        for (let j = 0; j < tableLines.length; j++) {
            let line = tableLines[j].trim();
            if (line.startsWith('|')) line = line.substring(1);
            if (line.endsWith('|')) line = line.substring(0, line.length - 1);
            
            let cells = line.split('|').map(cell => cell.trim());
            if (cells.length === 0 || cells.every(cell => cell === '')) continue;
            
            let isSeparator = cells.every(cell => /^:?-+:?$/.test(cell));
            if (isSeparator) continue;
            
            html += '<tr>';
            for (let k = 0; k < cells.length; k++) {
                if (j === 0 && !hasHeader) {
                    html += '<th>' + processInlineMarkdown(cells[k]) + '</th>';
                } else {
                    html += '<td>' + processInlineMarkdown(cells[k]) + '</td>';
                }
            }
            html += '</tr>';
            
            if (j === 0) hasHeader = true;
        }
        
        html += '</table>';
        return { html: html, newIndex: i - 1 };
    }

    // Main Markdown parsing function
    function parseMarkdown(md) {
        let inSolidList = false;
        let inHollowList = false;
        let lines = md.split('\n');
        let result = [];
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // Check for table
            if (line.trim().includes('|') && !line.trim().startsWith('-') && !line.trim().startsWith('*')) {
                let tableLinesCount = 1;
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim().includes('|') && !lines[j].trim().startsWith('-') && !lines[j].trim().startsWith('*')) {
                        tableLinesCount++;
                    } else {
                        break;
                    }
                }

                if (tableLinesCount >= 2) {
                    const tableResult = parseTable(lines, i);
                    if (tableResult.html) {
                        result.push(tableResult.html);
                        i = tableResult.newIndex;
                        continue;
                    }
                }
            }
            
            // Solid bullet list (-)
            if (line.trim().startsWith('- ')) {
                if (!inSolidList) {
                    result.push('<ul style="list-style-type: disc;">');
                    inSolidList = true;
                }
                let listContent = processInlineMarkdown(line.trim().substring(2));
                result.push('<li>' + listContent + '</li>');
            }
            // Hollow bullet list (*)
            else if (line.trim().startsWith('* ')) {
                if (!inHollowList) {
                    result.push('<ul style="list-style-type: circle;">');
                    inHollowList = true;
                }
                let listContent = processInlineMarkdown(line.trim().substring(2));
                result.push('<li>' + listContent + '</li>');
            } 
            else {
                // Close any open lists
                if (inSolidList) {
                    result.push('</ul>');
                    inSolidList = false;
                }
                if (inHollowList) {
                    result.push('</ul>');
                    inHollowList = false;
                }
                
                // Process non-list lines
                if (line.trim()) {
                    let processedLine = line.trim();

                    if (processedLine.startsWith('> ')) {
                        processedLine = '<blockquote>' + processInlineMarkdown(processedLine.substring(2)) + '</blockquote>';
                    } else if (processedLine.startsWith('# ')) {
                        processedLine = '<h1>' + processInlineMarkdown(processedLine.substring(2)) + '</h1>';
                    } else if (processedLine.startsWith('## ')) {
                        processedLine = '<h2>' + processInlineMarkdown(processedLine.substring(3)) + '</h2>';
                    } else if (processedLine.startsWith('### ')) {
                        processedLine = '<h3>' + processInlineMarkdown(processedLine.substring(4)) + '</h3>';
                    } else if (processedLine.startsWith('#### ')) {
                        processedLine = '<h4>' + processInlineMarkdown(processedLine.substring(5)) + '</h4>';
                    } else if (processedLine.startsWith('##### ')) {
                        processedLine = '<h5>' + processInlineMarkdown(processedLine.substring(6)) + '</h5>';
                    } else if (processedLine.startsWith('###### ')) {
                        processedLine = '<h6>' + processInlineMarkdown(processedLine.substring(7)) + '</h6>';
                    } else if (processedLine === '---') {
                        processedLine = '<hr>';
                    } else {
                        processedLine = '<p>' + processInlineMarkdown(processedLine) + '</p>';
                    }
                    result.push(processedLine);
                }
            }
        }

        // Close any open lists
        if (inSolidList) result.push('</ul>');
        if (inHollowList) result.push('</ul>');

        return result.join('\n');
    }

    // Export the loadMarkdownFromGitHub function for external use
    window.loadMarkdownFromGitHub = function(githubRawUrl) {
        const output = document.getElementById('markdown-output');
        
        if (!output) {
            console.error('markdown-output element not found');
            return;
        }
        
        // Show loading state
        output.innerHTML = '<p style="text-align: center; color: #999;">Loading Markdown from GitHub...</p>';
        
        fetch(githubRawUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(markdownText => {
                output.innerHTML = parseMarkdown(markdownText);
            })
            .catch(error => {
                console.error('Error loading Markdown:', error);
                output.innerHTML = `
                    <div style="text-align: center; color: #d63031;">
                        <p>Failed to load Markdown from GitHub</p>
                        <p><small>Error: ${error.message}</small></p>
                        <p><a href="${githubRawUrl}" target="_blank" style="color: #7393B3;">Try opening the raw file directly</a></p>
                    </div>
                `;
            });
    };

    // Also export parseMarkdown in case it's needed elsewhere
    window.parseMarkdown = parseMarkdown;
})();
