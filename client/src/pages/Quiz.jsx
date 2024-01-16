
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import QuizQuestionOptions from '../QuizQuestionOptions';
import styles from '../Quiz.module.css';

import Button from '@mui/material/Button';

function Quiz() {
    let { id } = useParams(); // This captures the :id from the URL
    let navigate = useNavigate();

    const [quiz, setQuiz] = useState();//holds quiz data
    const [currQuestion, setCurrQuestion] = useState(0); //holds index of question to be currently displayed
    const [answers, setAnswers] = useState([]); //holds user answers to questions for quiz 
    const [time, setTime] = useState(60); // 300 seconds for 5 minutes

    console.log(`answers: ${answers}`)
    useEffect(() => {
        const fetchProblemSets = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/problemsets/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(`data for quiz ${data._id}: ${data}`)
                setQuiz(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchProblemSets();

        // Timer countdown
        const countdown = setInterval(() => {

            setTime((prevTime) => {
                if (prevTime === 1) {
                    console.log('timer complete !')
                    clearInterval(countdown);
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(countdown); // Clear interval on component unmount

    }, [id]);



    console.log(`time remaining: ${time}`)

    const submitTest = async (problemSetId, score, totalQuestions) => {
        try {
            const response = await fetch('http://localhost:5000/api/submit-score', { // Adjust the URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problemSetId, score, totalQuestions }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.text();
            console.log(data); // Handle the successful response
        } catch (error) {
            console.error('Error while submitting the test:', error);
        }
    };



    const autoSubmit = () => {

        let newScore = 0;

        quiz.questions.forEach((question, index) => {
            // Assuming the 'answers' array stores the index of the selected option
            // And 'question.answer' is the index of the correct answer
            if (parseInt(answers[index]) === question.answer) {
                newScore += 1;
            }
        });
        console.log(`timer complete, auto submit with score of : ${newScore}`)
        submitTest(id, newScore, quiz.questions.length);

        navigate(`/quiz/${id}/result`, { state: { score: newScore, total: quiz.questions.length, name: quiz.setName } });
        // To see the updated score, use useEffect or another method

    }

    useEffect(() => {
        if (time === 1) {
            autoSubmit();
        }
    }, [time]); // Only trigger this effect when 'time' changes


    const previousQuestion = () => {
        if (currQuestion > 0) {

            setCurrQuestion(currQuestion - 1)
        }
    }

    const nextQuestion = () => {
        if (currQuestion < quiz.questions.length - 1) {

            setCurrQuestion(currQuestion + 1)
        }
    }



    const checkAnswers = () => {
        console.log(`answers in checkAnswers: ${answers}`)
        if (answers.length < quiz.questions.length) {
            alert("must complete all questions before submitting.")
            return null;
        }

        let newScore = 0;

        quiz.questions.forEach((question, index) => {
            // Assuming the 'answers' array stores the index of the selected option
            // And 'question.answer' is the index of the correct answer
            if (parseInt(answers[index]) === question.answer) {
                newScore += 1;
            }
        });

        submitTest(id, newScore, quiz.questions.length);

        navigate(`/quiz/${id}/result`, { state: { score: newScore, total: quiz.questions.length, name: quiz.setName } });
        // To see the updated score, use useEffect or another method
    }

    return (
        <div>


            {quiz ? (
                <>
                    <div className={styles.quizContainerParent}>
                        <div className={styles.quizContainer} >

                            <div className={styles.timerContainer}>
                                <div className={styles.timer}>Time left: {Math.floor(time / 60)}:{('0' + time % 60).slice(-2)}</div>
                            </div>
                            <h3 className={styles.questionTitle}>{quiz.questions[currQuestion].question}</h3>


                            <QuizQuestionOptions
                                options={quiz.questions[currQuestion].options}
                                answers={answers}
                                setAnswers={setAnswers}
                                questionIndex={currQuestion}
                            />

                            <div className={styles.buttonContainer}>
                                <Button className={styles.customButton} onClick={previousQuestion} variant='contained'>previous question</Button>
                                {currQuestion === quiz.questions.length - 1 ? <Button className={styles.submitButton} onClick={checkAnswers} variant='contained'>Submit Quiz</Button> : null}
                                {currQuestion === quiz.questions.length - 1 ? null : <Button className={styles.customButton} onClick={nextQuestion} variant='contained'>next question</Button>}


                            </div>


                        </div>

                    </div>

                </>
            ) : null
            }




        </div >
    );

}



export default Quiz;
