import useStore from '@/misc/store';
import { GameEvent } from '@/misc/enums';

const WonScreen = () => {
	const send = useStore((store) => store.send);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'black',
			}}
		>
			<header>
				<h1
					style={{
						color: 'white',
						fontSize: '3rem',
					}}
				>
					You won
				</h1>
			</header>
			<button
				style={{
					background: 'none',
					border: 'none',
					fontSize: '2rem',
					color: 'white',
				}}
				onClick={() => {
					send(GameEvent.START);
				}}
			>
				Play Again
			</button>
		</div>
	);
};

export default WonScreen;
