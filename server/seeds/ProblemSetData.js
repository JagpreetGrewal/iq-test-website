const problemSets = [
    {
        setName: "Logical Patterns",
        questions: [
            {
                question: "What comes next in the series: 2, 4, 8, 16, ...?",
                options: ["24", "32", "30", "28"],
                answer: 1 // Corresponds to "32"
            },
            {
                question: "Which of the following does not belong: Cat, Dog, Lion, Dolphin?",
                options: ["Cat", "Dog", "Lion", "Dolphin"],
                answer: 3 // Corresponds to "Dolphin"
            },
            {
                question: "If you rearrange the letters 'CIFAIPC' you would have the name of a(n):",
                options: ["City", "Animal", "Ocean", "River"],
                answer: 2 // Corresponds to "Ocean"
            }
        ]
    },
    {
        setName: "Numerical Reasoning",
        questions: [
            {
                question: "What is the missing number: 4, 9, 16, 25, ?, 49",
                options: ["30", "36", "42", "45"],
                answer: 1 // Corresponds to "36"
            },
            {
                question: "If all Bloops are Razzies and all Razzies are Lazzies, all Bloops are definitely Lazzies?",
                options: ["True", "False"],
                answer: 0 // Corresponds to "True"
            },
            {
                question: "What number best completes the analogy: 8:4 as 10:?",
                options: ["3", "5", "7", "9"],
                answer: 1 // Corresponds to "5"
            }
        ]
    }
];



module.exports = problemSets;