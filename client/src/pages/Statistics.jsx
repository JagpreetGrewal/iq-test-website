import React, { useEffect, useState } from 'react';
import BasicTable from '../BasicTable'
//import styles from '../Statistics.module.css';
export default function () {

    const [scores, setScores] = useState()

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/get-scores');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setScores(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchScores();
    }, []);

    if (!scores) {
        return <p>Loading scores...</p>;
    }

    return (
        <div>
            <h1>Statistics page!</h1>
            <p>{scores[0]._id}</p>

            <BasicTable />

        </div>
    )


}