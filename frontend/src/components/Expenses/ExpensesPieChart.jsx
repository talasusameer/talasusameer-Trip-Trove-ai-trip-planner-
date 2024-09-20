import React, {useMemo} from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

const ExpensesPieChart = ({expenses}) => {
    // Calculate the data for the Pie Chart
    const data = useMemo(() => {
        const groupedData = expenses.reduce((acc, expense) => {
            const existing = acc.find(item => item.name === expense.type);
            if (existing) {
                existing.value += expense.amount;
            } else {
                acc.push({name: expense.type, value: expense.amount});
            }
            return acc;
        }, []);

        return groupedData;
    }, [expenses]);


    // Define the colors for each category
    const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300'];

    return (
        <>
            {data.length !== 0 && (
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
                )}
        </>
    );
};

export default ExpensesPieChart;
