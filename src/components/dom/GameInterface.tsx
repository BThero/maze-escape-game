import { useEffect, useState } from 'react';

const GameInterface = () => {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((x) => x + 1);
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<div className="bg-transparent p-2 text-center text-white">
			<h1>
				{Math.floor(timer / 60)}:{timer % 60}
			</h1>
		</div>
	);
};

export default GameInterface;
