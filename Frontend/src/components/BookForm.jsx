import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function BookForm({ fetchBooks, editingBook, setEditingBook }) {
  const [book, setBook] = useState({ title: '', author: '', category: '', status: 'Available' });

  useEffect(() => {
    if (editingBook) setBook(editingBook);
  }, [editingBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await API.put(`/books/${editingBook._id}`, book);
      setEditingBook(null);
    } else {
      await API.post('/books', book);
    }
    setBook({ title: '', author: '', category: '', status: 'Available' });
    fetchBooks();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      <input placeholder="Title" value={book.title} onChange={e => setBook({...book, title: e.target.value})} required />
      <input placeholder="Author" value={book.author} onChange={e => setBook({...book, author: e.target.value})} required />
      <input placeholder="Category" value={book.category} onChange={e => setBook({...book, category: e.target.value})} required />
      <select value={book.status} onChange={e => setBook({...book, status: e.target.value})}>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
      </select>
      <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
      {editingBook && <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>}
    </form>
  );
}