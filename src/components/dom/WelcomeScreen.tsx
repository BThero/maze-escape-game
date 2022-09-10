import useStore from '@/misc/store';
import { GameEvent } from '@/misc/enums';
import { FaGithub } from 'react-icons/fa';

const WelcomeScreen = () => {
	const send = useStore((store) => store.send);

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center justify-center gap-4 bg-black bg-gradient-radial-welcome">
			<div className="absolute left-6 top-4">
				<a
					href="https://github.com/bthero"
					className="flex flex-row items-center gap-1 text-white opacity-60"
				>
					See my GitHub
					<FaGithub size={'0.9rem'} />
				</a>
			</div>
			<h1 className="text-8xl tracking-tighter text-[#f5f5f7]">Ghost Escape</h1>
			<button
				className="text-3xl uppercase tracking-wider text-[#dcff50]"
				onClick={() => send(GameEvent.START)}
			>
				Start the game
			</button>
			<div className="absolute right-9 bottom-6 flex flex-col items-start gap-2">
				<span className="text-3xl text-[#f5f5f7]">3D Next.js game</span>
				<span className="text-2xl text-[#f5f5f7]">by Temirlan Baibolov</span>
			</div>
		</div>
	);
};

export default WelcomeScreen;
