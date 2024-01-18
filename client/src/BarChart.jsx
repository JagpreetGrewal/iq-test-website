import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { quizScore } from './utils/quizUtils';

import styles from './BarChart.module.css'
import './BarChart.css'

export default function BasicBars({ scores, quizzes }) {

    const averageScore = (quizScores) => {
        let totalScore = 0;
        let totalQuestions = 0;
        for (const quizScore of quizScores) {
            totalScore = totalScore + quizScore.score;
            totalQuestions = totalQuestions + quizScore.totalQuestions;

        }
        return (totalScore / totalQuestions) * 100;
    }

    const yAxisArray = (quizScores) => {
        let totalQuestions = quizScores[0].totalQuestions + 1;
        const arr = [...Array(totalQuestions).keys()];
        const yArr = [];

        for (let index of arr) {

            let count = 0;

            for (let score of quizScores) {

                if (score.score === index) {
                    count = count + 1;
                }

            }

            yArr.push(count);

        }
        console.log(`y array:${yArr}`);
        return yArr;
    }

    const xAxisArray = (quizScores) => {
        let totalQuestions = quizScores[0].totalQuestions + 1;
        const xAxisArray = [...Array(totalQuestions).keys()].map(String);
        return xAxisArray;
    }


    const yArray = yAxisArray(scores);
    const xArray = xAxisArray(scores);



    const avgScore = averageScore(scores)
    console.log(`average score: ${avgScore}`)
    return (
        <div className={styles.barChart}>
            <BarChart

                xAxis={[{ scaleType: 'band', data: xArray }]}
                series={[{ data: yArray }]}
                width={500}
                height={400}
            />
        </div>
    );
}