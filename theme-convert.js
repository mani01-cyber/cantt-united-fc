const fs = require('fs');
const path = require('path');

const replacements = [
    // Backgrounds
    { old: /\bbg-slate-950\b/g, new: 'bg-white' },
    { old: /\bbg-slate-900\b/g, new: 'bg-slate-50' },
    { old: /\bbg-slate-800\b/g, new: 'bg-slate-100' },
    { old: /\bbg-black\b/g, new: 'bg-white' },

    // Gradients
    { old: /\bfrom-slate-950\b/g, new: 'from-white' },
    { old: /\bvia-slate-950\b/g, new: 'via-white' },
    { old: /\bto-slate-950\b/g, new: 'to-white' },

    { old: /\bfrom-slate-900\b/g, new: 'from-slate-50' },
    { old: /\bvia-slate-900\b/g, new: 'via-slate-50' },
    { old: /\bto-slate-900\b/g, new: 'to-slate-50' },

    { old: /\bfrom-black\b/g, new: 'from-white' },
    { old: /\bvia-black\b/g, new: 'via-white' },
    { old: /\bto-black\b/g, new: 'to-white' },

    // Text Colors
    { old: /\btext-white\b/g, new: 'text-slate-900' },
    { old: /\btext-slate-300\b/g, new: 'text-slate-700' },
    { old: /\btext-slate-400\b/g, new: 'text-slate-600' },

    // Borders
    { old: /\bborder-white\/10\b/g, new: 'border-slate-200' },
    { old: /\bborder-white\/5\b/g, new: 'border-slate-200' },
    { old: /\bborder-slate-700\b/g, new: 'border-slate-300' },
    { old: /\bborder-white\b/g, new: 'border-slate-900' },

    // Transparencies
    { old: /\bbg-white\/5\b/g, new: 'bg-slate-100/80' },
    { old: /\bbg-white\/10\b/g, new: 'bg-slate-200/80' },
    { old: /\bbg-white\/20\b/g, new: 'bg-slate-300/80' },

    // Specific elements like overlays
    { old: /\bbg-black\/40\b/g, new: 'bg-white/80' },
    { old: /\bbg-black\/50\b/g, new: 'bg-white/80' },
    { old: /\bbg-black\/70\b/g, new: 'bg-white/90' },
];

function convertFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    replacements.forEach(rule => {
        content = content.replace(rule.old, rule.new);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            convertFile(fullPath);
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Theme conversion complete.');
