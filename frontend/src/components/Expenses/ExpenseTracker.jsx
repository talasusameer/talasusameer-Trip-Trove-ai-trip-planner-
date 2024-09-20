import React, {useState, useEffect} from 'react';
import {PlusCircle, Trash2} from 'lucide-react';
import pb from "../../pocketbase/pocketbase.js";
import {useParams} from "react-router-dom";
import {processDate} from "../../utils/helper.js";
import ExpensesPieChart from "./ExpensesPieChart.jsx";

const ExpenseTracker = () => {
    let {tripId} = useParams();
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Food');

    // Fetch expenses from PocketBase on component mount
    useEffect(() => {
        const fetchExpenses = async () => {
            const records = await pb.collection('expenses').getFullList({filter: `expenses_of='${tripId}'`});
            setExpenses(records);
        };
        fetchExpenses();
    }, []);

    // Add expense to PocketBase
    const addExpense = async () => {
        if (description && amount) {
            const newExpense = {
                description,
                amount: parseFloat(amount),
                type,
                expenses_of: tripId,
            };

            const record = await pb.collection('expenses').create(newExpense);
            setExpenses([...expenses, record]);

            setDescription('');
            setAmount('');
            setType('Food');
        }
    };

    // Remove expense from PocketBase
    const removeExpense = async (index, id) => {
        await pb.collection('expenses').delete(id);
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="ml-64 w-full bg-gray-800 text-white shadow-md">
            <ExpensesPieChart expenses={expenses}/>
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Expense Tracker</h2>
            </div>
            <div className="p-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 space-x-2">
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex-grow px-3 py-2 bg-gray-700 text-white rounded"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="px-3 py-2 bg-gray-700 text-white rounded"
                        />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="px-3 py-2 bg-gray-700 text-white rounded"
                        >
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                        <button
                            onClick={addExpense}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center"
                        >
                            <PlusCircle className="w-4 h-4 mr-2"/>
                            Add
                        </button>
                    </div>
                    <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
                        <span className="font-bold">Total Expenses</span>
                        <span className="font-bold text-green-400"> ₹ {total.toFixed(2)}</span>
                    </div>
                    <ul className="space-y-2">
                        {expenses.map((expense, index) => (
                            <li key={expense.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                                <div className="flex items-center space-x-2">
                                    <span>{expense.description}</span>
                                    <span className="text-gray-400">({expense.type})</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>{processDate(expense.created)}</span>
                                    <span> ₹{expense.amount.toFixed(2)}</span>
                                    <button
                                        onClick={() => removeExpense(index, expense.id)}
                                        className="p-1 hover:bg-gray-600 rounded"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400"/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
