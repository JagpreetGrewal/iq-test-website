import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function QuizResult() {

    let { id } = useParams();

    const location = useLocation();
    const { score, total } = location.state;

    return (
        <div>
            <h2>Quiz {id} Results</h2>
            <p>Your score: {score} out of {total}</p>
            {/* Additional result display */}
        </div>
    );
}

export default QuizResult;
