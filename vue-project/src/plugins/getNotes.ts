import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export default function notesPlugin(): Plugin {
    return {
        name: 'getNotes',
        configureServer(server) {
            server.middlewares.use('/api/notes', (req, res) => {
                const notesDirectory = path.resolve(__dirname, '../notes');
                const files = fs.readdirSync(notesDirectory);

                const notes = files
                    .filter(file => file.endsWith('.md'))
                    .map(file => {
                        const filePath = path.join(notesDirectory, file);
                        const content = fs.readFileSync(filePath, 'utf-8');
                        const stats = fs.statSync(filePath);
                        return {
                            filename: file,
                            content: content,
                            createdTime: stats.birthtime,
                            modifiedTime: stats.mtime
                        };
                    });

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(notes));
            });


            server.middlewares.use('/api/notes/:filename', (req, res) => {
                const notesDirectory = path.resolve(__dirname, '../notes');
                const filePath = path.join(notesDirectory, (req as any).params.filename);

                if (fs.existsSync(filePath) && filePath.endsWith('.md')) {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ content }));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'File not found' }));
                }
            });
        }
    };
}


// import { Plugin } from 'vite';
// import fs from 'fs';
// import path from 'path';
//
// export default function notesPlugin(): Plugin {
//     return {
//         name: 'getNotes',
//         configureServer(server) {
//             server.middlewares.use('/api/notes', (req, res) => {
//                 const notesDirectory = path.resolve(__dirname, 'src/notes');
//                 const files = fs.readdirSync(notesDirectory);
//
//                 const notes = files
//                     .filter(file => file.endsWith('.md'))
//                     .map(file => {
//                         const filePath = path.join(notesDirectory, file);
//                         const content = fs.readFileSync(filePath, 'utf-8');
//                         const stats = fs.statSync(filePath);
//                         return {
//                             fileName: file,
//                             content: content,
//                             createdTime: stats.birthtime,
//                             modifiedTime: stats.mtime
//                         };
//                     });
//
//                 res.setHeader('Content-Type', 'application/json');
//                 res.end(JSON.stringify(notes));
//             });
//
//             server.middlewares.use('/api/notes/:fileName', (req, res) => {
//                 const notesDirectory = path.resolve(__dirname, 'src/notes');
//                 const filePath = path.join(notesDirectory, (req as any).params.fileName);
//
//                 if (fs.existsSync(filePath) && filePath.endsWith('.md')) {
//                     const content = fs.readFileSync(filePath, 'utf-8');
//                     res.setHeader('Content-Type', 'application/json');
//                     res.end(JSON.stringify({ content }));
//                 } else {
//                     res.statusCode = 404;
//                     res.end(JSON.stringify({ error: 'File not found' }));
//                 }
//             });
//         }
//     };
// }