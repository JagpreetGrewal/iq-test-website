import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const Container = styled('div')({

    border: '1px solid #ccc',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    width: '30%',

});

const SelectProblemSet = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

const Title = styled('h1')({
    fontFamily: 'Arial, sans-serif', // Change the font as needed
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
});

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    '& button': {
        margin: '0 10px'
    }
});

export default function SelectQuiz() {

    const [problemSets, setProblemSets] = useState([]);

    useEffect(() => {
        const fetchProblemSets = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/problemsets');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setProblemSets(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchProblemSets();
    }, []);

    return (
        <SelectProblemSet>
            <Container>
                <Title>Select Quiz</Title>
                <ButtonContainer>
                    {problemSets.map((problemSet) => (
                        <Link key={problemSet._id} to={`/quiz/${problemSet._id}`} style={{ textDecoration: 'none' }}>
                            <button>{problemSet.setName}</button>
                        </Link>
                    ))}
                </ButtonContainer>
            </Container>
        </SelectProblemSet>
    );
}
