export default function Start(props) {
    return (
        <main className="start-main">
            <h1 className='start-title'>Quizzical</h1>
            <p className='start-description'>Some description if needed</p>
            <button 
                className='start-button'
                onClick={props.startGame}
            >
                Start Quiz
            </button>
        </main>
    )
}