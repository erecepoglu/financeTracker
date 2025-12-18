// src/components/FinanceDashboard.js
import React, { useState, useEffect } from 'react';
import { getTransactions, addTransaction, deleteTransaction } from '../services/api';

const FinanceDashboard = () => {
    // State to store the list of transactions
    const [transactions, setTransactions] = useState([]);

    // State to handle the form input
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'EXPENSE',
        category: 'Food', // Default category
        date: new Date().toISOString().split('T')[0] // Default to today's date
    });

    // 1. Load data when the app starts
    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const result = await getTransactions();
            setTransactions(result.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    // 2. Handle Form Input Changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Submit New Transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTransaction(formData);
            loadTransactions();
            // Reset form but keep default Date/Category nice and ready
            setFormData({
                description: '',
                amount: '',
                type: 'EXPENSE',
                category: 'Food',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    // 4. Delete Transaction
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteTransaction(id);
                loadTransactions();
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">💰 Personal Finance Manager</h2>

            <div className="row">
                {/* LEFT SIDE: The Form */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h4>Add New</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Category</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    className="form-control"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Type</label>
                                <select
                                    name="type"
                                    className="form-select"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="INCOME">Income (+)</option>
                                    <option value="EXPENSE">Expense (-)</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add Transaction</button>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE: The List */}
                <div className="col-md-8">
                    <div className="card p-3 shadow-sm">
                        <h4>Transaction History</h4>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(t => (
                                    <tr key={t.id}>
                                        <td>{t.date}</td>
                                        <td>{t.category}</td>
                                        <td>{t.description}</td>
                                        <td className={t.type === 'INCOME' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                            ${t.amount}
                                        </td>
                                        <td>
                                            <span className={`badge ${t.type === 'INCOME' ? 'bg-success' : 'bg-danger'}`}>
                                                {t.type}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(t.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceDashboard;