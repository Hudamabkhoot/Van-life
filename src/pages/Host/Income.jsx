import React, {useState, useEffect} from "react"
import styles from '../../css modules/Income.module.css'
import { getTransactions } from '../../firebase'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
 
  
  export default function Income() {
    const [showAll, setShowAll] = useState(false);
    const [displayCount, setDisplayCount] = useState(5);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const dataArr = await getTransactions();
                setTransactions(dataArr);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                throw error;
            }
        }
        fetchTransactions();
    }, []);

    
    const handleToggleShow = () => {
        setShowAll(!showAll);
        if (!showAll) {
            setDisplayCount(transactions.length);
        } else {
            setDisplayCount(5);
        }
    };

    const displayedTransactions = showAll ? transactions : transactions.slice(0, displayCount);
    
    let last30DaysIncome = 0

    const last30DaysTransactions = transactions
        .map(item => ({ ...item, date: new Date(item.date) }))
        .filter(item => new Date() - item.date <= 30 * 24 * 60 * 60 * 1000);
        last30DaysIncome = last30DaysTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    
        const newData = {
        labels: last30DaysTransactions.map(item => {
            const options = { month: 'long', day: 'numeric' };
            return item.date.toLocaleDateString('en-US', options);
        }),
        datasets: [{
            label: 'Transactions',
            data: last30DaysTransactions.map(item => item.amount),
            backgroundColor: '#ff8c38',
            hoverOffset: 4,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Monthly Income' },
            tooltip: {
                callbacks: {
                    label: context => {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== null) label += `$${context.parsed.y.toFixed(2)}`;
                        return label;
                    }
                }
            }
        }
    };

    return (
        <section className={styles.hostIncome}>
            <h1>Income</h1>
            <p>
                Last <span>30 days</span>
            </p>
            <h2>${last30DaysIncome}</h2>
            <Bar options={options} data={newData} />
            <div className={styles.infoHeader}>
                <h3>Your transactions ({transactions.length})</h3>
            </div>
            <div className={styles.transactions}>
                {displayedTransactions.map((item) => (
                    <div key={item.id} className={styles.transaction}>
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </div>
                ))}
                {transactions.length > 5 && (
                    <div className={styles.showMoreContainer}>
                    <button 
                    onClick={handleToggleShow}
                    className={styles.showMore}
                    >{showAll ? "Show Less" : "Show More"}</button>
                    </div>
                )}
            </div>
        </section>
    )
}


/*
  
*/