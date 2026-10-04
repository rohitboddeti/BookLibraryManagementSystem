import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SearchBar from './SearchBar';
import BookForm from './BookForm';

export default function Dashboard({ setToken }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const { data } = await API.get(`/books?search=${search}`);
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const handleDelete = async (id) => {
    await API.delete(`/books/${id}`);
    fetchBooks();
  };

  const toggleStatus = async (book) => {
    const newStatus = book.status === 'Available' ? 'Issued' : 'Available';
    await API.put(`/books/${book._id}`, { ...book, status: newStatus });
    fetchBooks();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Library Dashboard</h2>
        <button onClick={() => { localStorage.removeItem('token'); setToken(null); }}>Logout</button>
      </div>

      <BookForm fetchBooks={fetchBooks} editingBook={editingBook} setEditingBook={setEditingBook} />
      <SearchBar search={search} setSearch={setSearch} />

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => toggleStatus(b)}>Toggle Status</button>
                <button onClick={() => setEditingBook(b)} style={{ margin: '0 0.5rem' }}>Edit</button>
                <button onClick={() => handleDelete(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}