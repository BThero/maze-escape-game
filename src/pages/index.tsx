import { Physics } from '@react-three/cannon';
import Floor from '@/components/canvas/Floor';
import Player from '@/components/canvas/Player';
import Ghost from '@/components/canvas/Ghost';
import Flashlight from '@/components/canvas/Flashlight';
import Camera from '@/components/canvas/Camera';
import PlayerControls from '@/components/canvas/PlayerControls';
import BotControls from '@/components/canvas/BotControls';
import useStore from '@/misc/store';

import { GameState } from '@/misc/enums';
import PlayerLighting from '@/components/canvas/PlayerLighting';

/* DOM */
import WelcomeScreen from '@/components/dom/WelcomeScreen';
import WonScreen from '@/components/dom/WonScreen';
import LostScreen from '@/components/dom/LostScreen';
import GameInterface from '@/components/dom/GameInterface';
import Map from '@/components/canvas/Map';

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

const R3F = () => {
	const state = useStore((state) => state.state);

	return (
		<>
			<PlayerControls />
			<BotControls />
			<Camera />
			<PlayerLighting />
			<Physics gravity={[0, -50, 0]} isPaused={state !== GameState.RUNNING}>
				<Floor />
				<Player />
				<Ghost />
				<Flashlight />
				<Map />
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
