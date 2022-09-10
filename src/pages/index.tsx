import React, { lazy } from 'react';
import { Physics } from '@react-three/cannon';

import useStore from '@/misc/store';
import { GameState } from '@/misc/enums';

/** CANVAS */
import Floor from '@/components/canvas/Floor';
import Player from '@/components/canvas/Player';
import Ghost from '@/components/canvas/Ghost';
import Flashlight from '@/components/canvas/Flashlight';
import Camera from '@/components/canvas/Camera';
import PlayerControls from '@/components/canvas/PlayerControls';
import BotControls from '@/components/canvas/BotControls';
import Map from '@/components/canvas/Map';
import PlayerLighting from '@/components/canvas/PlayerLighting';

/* DOM */
const WelcomeScreen = lazy(() => import('@/components/dom/WelcomeScreen'));
const WonScreen = lazy(() => import('@/components/dom/WonScreen'));
const LostScreen = lazy(() => import('@/components/dom/LostScreen'));
const GameInterface = lazy(() => import('@/components/dom/GameInterface'));

const DOM = () => {
	const state = useStore((state) => state.state);
	let Component;

	switch (state) {
		case GameState.MENU: {
			Component = WelcomeScreen;
			break;
		}

		case GameState.WON: {
			Component = WonScreen;
			break;
		}

		case GameState.LOST: {
			Component = LostScreen;
			break;
		}

		default: {
			Component = GameInterface;
			break;
		}
	}

	/** TODO: Implement loading screen & transitions */
	return (
		<React.Suspense fallback={<></>}>
			<Component />
		</React.Suspense>
	);
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
