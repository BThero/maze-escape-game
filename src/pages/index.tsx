import { Physics } from '@react-three/cannon';
import Floor from '@/components/canvas/Floor';
import Player from '@/components/canvas/Player';
import Ghost from '@/components/canvas/Ghost';
import Flashlight from '@/components/canvas/Flashlight';
import Obstacle from '@/components/canvas/Obstacle';
import Camera from '@/components/canvas/Camera';
import { PlayerControls } from '@/components/canvas/PlayerControls';
import useStore from '@/misc/store';
import useMapStore from '@/misc/mapStore';

import { GameObjects, GameState } from '@/misc/enums';
import PlayerLighting from '@/components/canvas/PlayerLighting';
import Exit from '@/components/canvas/Exit';

/* DOM */
import WelcomeScreen from '@/components/dom/WelcomeScreen';
import WonScreen from '@/components/dom/WonScreen';
import LostScreen from '@/components/dom/LostScreen';
import GameInterface from '@/components/dom/GameInterface';

const DOM = () => {
	const state = useStore((state) => state.state);

	switch (state) {
		case GameState.MENU: {
			return <WelcomeScreen />;
		}

		case GameState.WON: {
			return <WonScreen />;
		}

		case GameState.LOST: {
			return <LostScreen />;
		}

		default: {
			return <GameInterface />;
		}
	}
};

const Objects = () => {
	const objects = useMapStore((store) => store.objects);

	return (
		<>
			{objects.map(({ x, y, type }, idx) => {
				if (type === GameObjects.EXIT) {
					return <Exit key={idx} position={[x, 0, y]} />;
				} else {
					return <Obstacle key={idx} position={[x, 0, y]} type={type} />;
				}
			})}
		</>
	);
};

const R3F = () => {
	const state = useStore((state) => state.state);

	return (
		<>
			<PlayerControls />
			<Camera />
			<PlayerLighting />
			<Physics gravity={[0, -50, 0]} isPaused={state !== GameState.RUNNING}>
				<Floor />
				<Player />
				<Ghost />
				<Flashlight />
				<Objects />
			</Physics>
		</>
	);
};

export default function Page() {
	return (
		<>
			<DOM />
			<R3F />
		</>
	);
}
