import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
	const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
	const percentage = (points / maxPossiblePoints) * 100;

	return (
		<>
			<p className="result">
				You scored {points} out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore: {highscore}) </p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "restart" })}
			>
				Restart
			</button>
		</>
	);
}

export default FinishScreen;
