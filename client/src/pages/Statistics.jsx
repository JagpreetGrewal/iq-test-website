import React, { useEffect, useState } from 'react';
import BasicTable from '../BasicTable'
import TabsWrappedLabel from '../BasicTableTabs';
//import BasicButtonGroup from '../ButtonGroup';
import BarChart from '../BarChart'
import styles from '../Statistics.module.css';
export default function () {


    const [scores, setScores] = useState()
    const [quizzes, setQuizzes] = useState();



    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/scores');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const uniqueQuizIds = [...new Set(data.map(obj => obj.problemSetId))];
                const uniqueQuizNames = [...new Set(data.map(obj => obj.problemSetName))];
                const uniqueQuizzes = uniqueQuizIds.map((id, index) => ({ quizId: id, quizName: uniqueQuizNames[index] }));

                setQuizzes(uniqueQuizzes);

                setScores(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchScores();
    }, []);





    if (!scores || !quizzes) {
        return <p>Loading scores...</p>;
    }

    return (
        <div>
            <TabsWrappedLabel quizzes={quizzes} setScores={setScores} />
            <div className={styles.dataContainer}>
                <BasicTable scores={scores} />
                <BarChart scores={scores} quizzes={quizzes} />
            </div>
        </div >

    )


}
