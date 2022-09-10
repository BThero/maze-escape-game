import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import useStore from '@/misc/store';
import { GameEvent } from '@/misc/enums';

const GameInterface = () => {
	const send = useStore((store) => store.send);
	const [timer, setTimer] = useState(0);
	const [showHelp, setShowHelp] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((x) => x + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-row justify-center bg-transparent pl-6 pr-6 pt-4">
			<div className="absolute left-6 top-4">
				<button
					className="text-xl text-white drop-shadow-glow"
					onClick={() => setShowHelp((h) => !h)}
				>
					<FaQuestionCircle />
				</button>
				{showHelp && (
					<ul className="ml-8 list-disc text-xl text-white drop-shadow-glow">
						<li>Use arrows to move</li>
						<li>Spacebar to turn on/off flashlight</li>
						<li>Get to the exit before ghost catches you!</li>
					</ul>
				)}
			</div>
			<h1 className="text-xl text-white drop-shadow-glow">
				{Math.floor(timer / 60)
					.toString()
					.padStart(2, '0')}
				:{(timer % 60).toString().padStart(2, '0')}
			</h1>
			<button
				className="absolute right-6 top-4 rounded border-[2px] border-[#F95B89] bg-transparent bg-gradient-to-br from-[#A43B3B] to-[#F1199A] pl-5 pr-5 pt-2 pb-2 text-lg leading-none tracking-tighter text-white"
				onClick={() => {
					send(GameEvent.LOST);
				}}
			>
				I Give Up
			</button>
		</div>
	);
};

export default GameInterface;
