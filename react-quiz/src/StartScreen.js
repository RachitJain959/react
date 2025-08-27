function StartScreen({ numQuestions }) {
	return (
		<div className="start">
			<h2>Welcome to react quiz!</h2>
			<h3>{numQuestions} questions remaining </h3>
			<button className="btn btn-ui">Let's Start</button>
		</div>
	);
}

export default StartScreen;
