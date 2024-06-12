import React, {useState, useContext} from "react"
import styles from '../../css modules/Host/Income.module.css'
import { HostContext } from '../../components/HostContext'
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
    const { transactions, last30DaysIncome, last30DaysTransactions } = useContext(HostContext);
    
    const handleToggleShow = () => {
        setShowAll(!showAll);
        if (!showAll) {
            setDisplayCount(transactions.length);
        } else {
            setDisplayCount(5);
        }
    };

    const displayedTransactions = showAll ? transactions : transactions.slice(0, displayCount);
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
        },
    };

    return (
        <section className={styles.hostIncome}>
            <div className={styles.hostIncomeTop}>
            <h1>Income</h1>
            <p>
                Last <span>30 days</span>
            </p>
            </div>
            <h2>${last30DaysIncome}</h2>
            <div className={styles.hostChart}>
            <Bar options={options} data={newData} />
            </div>
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