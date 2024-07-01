const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the frontend app
app.use(express.static(path.join(__dirname, 'dist')));

// 提供静态文件服务
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 获取目录下所有文件
function getFiles(directory){
    const notesDirectory = path.resolve(__dirname, directory);
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
    return notes;
}

// API 路由
app.get('/api/notes', (req, res) => {
    const notes = getFiles('notes');
    res.json(notes);
});

app.get('/api/blogs', (req, res) => {
    const blogs = getFiles('blogs');
    res.json(blogs);
});

app.get('/api/notes/:filename', (req, res) => {
    const notesDirectory = path.resolve(__dirname, 'notes');
    const filePath = path.join(notesDirectory, req.params.filename);

    if (fs.existsSync(filePath) && filePath.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.json({ content });
    } else {
        res.status(404).json({ error: '文件未找到' });
    }
});

app.get('/api/blogs/:filename', (req, res) => {
    const notesDirectory = path.resolve(__dirname, 'blogs');
    const filePath = path.join(notesDirectory, req.params.filename);

    if (fs.existsSync(filePath) && filePath.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.json({ content });
    } else {
        res.status(404).json({ error: '文件未找到' });
    }
});



// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});