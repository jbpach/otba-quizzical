import { useState } from "react"

export default function Questions(props) {

    const [check, setCheck] = useState(false)

    const [score, setScore] = useState(0)

    const [answers, setAnswers] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: ""
    })

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setAnswers((prevFormData) => {
            return (
                {
                    ...prevFormData, 
                    [name]: type === "checkbox" ? checked : value
                }
            )
        })
    }

    const questionElements = props.formData.map((question, index) => {
        return (
            <div key={index}>
                <h2 className="question-title">{question.question}</h2>
                {
                    question.choices.map((choice) => {
                        return (
                            <div className="radio-button" key={choice}>
                                <input 
                                    id={choice}
                                    type="radio"
                                    name={index}
                                    value={choice}
                                    checked={answers[index] === choice}
                                    onChange={handleChange}
                                />
                                {check ?
                                    choice === question.correct ? 
                                        <label  
                                            style={{backgroundColor: "#94D7A2"}}
                                            htmlFor={choice}>
                                            {choice}
                                        </label>
                                        :
                                        choice === answers[index] ? 
                                        <label  
                                            style={{backgroundColor: "#F8BCBC", opacity: "0.5"}}
                                            htmlFor={choice}>
                                            {choice}
                                        </label> 
                                        :
                                        <label  
                                            style={{opacity: "0.5"}}
                                            htmlFor={choice}>
                                            {choice}
                                        </label>  
                                    : 
                                    <label  
                                        htmlFor={choice}>
                                        {choice}
                                    </label>  
                                }
                                
                            </div>
                        )
                    })
                }
                <hr className="question-break"/>
            </div>
        )
    }) 

    function calcScore() {
        let dummyScore = 0
        for(let i = 0; i < props.formData.length; i++){
            if (props.formData[i].correct === answers[i]) {
                dummyScore = dummyScore + 1
            }

        }
        setScore(dummyScore)
        
    }

    function checkAnswers() {
        setCheck(true)
        calcScore()
    }

    return (
        
        <main className="questions-main">
            {questionElements}
            {!check ? 
                <div className="div-button">
                    <button className="check-button" onClick={checkAnswers}>Check Answers</button>
                </div>
                :
                <div className="div-button">
                    <p className="check-score">You scored {score}/5 correct answers</p>
                    <button className="check-button" onClick={props.endGame}>Play Again</button>
                </div>
            }
    
        </main>
    )
}