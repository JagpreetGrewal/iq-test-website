
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Quiz() {
    let { id } = useParams(); // This captures the :id from the URL
    const [quiz, setQuiz] = useState();
    const [currQuestion, setCurrQuestion] = useState(0); //holds index of question to be currently displayed

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
    }, [id]);



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


    return (
        <div>
            <h2>Quiz ID: {id}</h2>
            <ul>
                {quiz ? <li>{quiz.questions[currQuestion].question}</li> : null}
                <button onClick={previousQuestion}>previous question</button>
                <button onClick={nextQuestion}>next question</button>
            </ul>
        </div>
    );
}

export default Quiz;
