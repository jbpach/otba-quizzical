import { useEffect, useState } from 'react';
import Start from './components/Start';
import Questions from './components/Questions';
import './App.css';


function App() {
    const [start, setStart] = useState(false)

    const [apiData, setApiData] = useState([])
    
    const [formData, setFormData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=29&type=multiple")
            .then(res => res.json())
            .then(data => setApiData(data.results))
        
    }, [start])


    function startGame() {
        if (start === false) {
            fixFormData()
            setStart(true)
        }else {
            setStart(false)
        }
    
    }

    function shuffleArray(arrayToShuffle) {
        let shuffleArray = []
        let usedIndexes = []
        let i = 0
        while (i < arrayToShuffle.length) {
            let randomNum = Math.floor(Math.random() * arrayToShuffle.length)
            if (!usedIndexes.includes(randomNum)) {
                shuffleArray.push(arrayToShuffle[randomNum].replace(/(&amp;)/g," & ").replace(/(&quot;)/g,"'"))
                usedIndexes.push(randomNum)
                i++
            }
        } 
        return shuffleArray
    }

    function fixFormData() {
        const data = apiData.map((question) => {
            return {
                question: question.question.replace(/(&quot;)/g,"'").replace(/(&#039;)/g,"'"),
                correct: question.correct_answer.replace(/(&amp;)/g," & ").replace(/(&quot;)/g,"'"),
                choices: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        })
        setFormData(data)
    }

    return (
        <div>
            {start ? <Questions formData={formData} endGame={startGame}/> : <Start startGame={startGame}/>}
        </div>

    );
}

export default App;
