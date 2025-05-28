export default function Stats({ items }) {
	if (!items.length)
		return (
			<footer className="stats">
				Start adding items to your packing list...
			</footer>
		);

	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const percent = Math.round((numPacked / numItems) * 100);
	return (
		<footer className="stats">
			<em>
				{percent === 100
					? "You got everything! Ready to go."
					: `You have ${numItems} items on your list, & you have already
				packed ${numPacked} (${percent} %) items.`}
			</em>
		</footer>
	);
}
