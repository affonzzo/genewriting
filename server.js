import http from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(async (req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = join(__dirname, filePath);

    const ext = extname(filePath);
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.tsx': 'text/javascript',
        '.ts': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
    };

    try {
        const content = await readFile(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // Adiciona os headers necessários para módulos ES
        const headers = {
            'Content-Type': contentType,
        };
        
        if (ext === '.mjs' || ext === '.js' || ext === '.tsx' || ext === '.ts') {
            headers['Content-Type'] = 'application/javascript';
            if (req.url.includes('/src/')) {
                headers['Content-Type'] = 'application/javascript; charset=utf-8';
            }
        }

        res.writeHead(200, headers);
        res.end(content);
    } catch (error) {
        console.error('Error:', error);
        if(error.code === 'ENOENT') {
            res.writeHead(404);
            res.end('404 - File Not Found');
        } else {
            res.writeHead(500);
            res.end('500 - Internal Server Error');
        }
    }
});

const port = 3002;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
