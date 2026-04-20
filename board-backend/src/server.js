const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// 게시글 전체 조회
app.get('/api/boards', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM boards ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

// 게시글 상세 조회
app.get('/api/boards/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM boards WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

// 게시글 생성
app.post('/api/boards', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO boards (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    );
    const [newBoard] = await pool.query('SELECT * FROM boards WHERE id = ?', [result.insertId]);
    res.status(201).json(newBoard[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

// 게시글 수정
app.put('/api/boards/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE boards SET title = ?, content = ? WHERE id = ?',
      [title, content, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    const [updatedBoard] = await pool.query('SELECT * FROM boards WHERE id = ?', [req.params.id]);
    res.json(updatedBoard[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

// 게시글 삭제
app.delete('/api/boards/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM boards WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    res.json({ message: '삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
