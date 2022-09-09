import { Physics, Debug, Triplet } from '@react-three/cannon';
import Floor from '@/components/canvas/Floor';
import Player from '@/components/canvas/Player';
import Ghost from '@/components/canvas/Ghost';
import Flashlight from '@/components/canvas/Flashlight';
import Obstacle from '@/components/canvas/Obstacle';
import Camera from '@/components/canvas/Camera';
import { ROWS, COLUMNS, TILE_SIZE } from '@/misc/constants';
import { PlayerControls } from '@/components/canvas/PlayerControls';
import useStore from '@/misc/store';
import { GameEvent, GameObjects, GameState } from '@/misc/enums';
import PlayerLighting from '@/components/canvas/PlayerLighting';
import Exit from '@/components/canvas/Exit';

/* DOM */
import WelcomeScreen from '@/components/dom/WelcomeScreen';
import WonScreen from '@/components/dom/WonScreen';
import LostScreen from '@/components/dom/LostScreen';
import MapEditor from '@/components/dom/MapEditor';
import { useMapStore } from '@/misc/mapStore';
import { useEffect } from 'react';

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
			return <MapEditor />;
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

	const walls = Array.from({ length: ROWS }).map((_, i) => {
		return Array.from({ length: COLUMNS }).map((_, j) => {
			const types: Array<
				GameObjects.VERTICAL_WALL | GameObjects.HORIZONTAL_WALL
			> = [GameObjects.VERTICAL_WALL, GameObjects.HORIZONTAL_WALL];

			return types.map((type, index) => {
				if (Math.random() < 0.3) {
					const base: Triplet = [i * TILE_SIZE, 0, j * TILE_SIZE];
					return <Obstacle position={base} type={type} key={index} />;
				}
			});
		});
	});

	return (
		<>
			<PlayerControls />
			<Camera />
			<PlayerLighting />
			{/* <ambientLight intensity={1} /> */}
			<Physics gravity={[0, -50, 0]} isPaused={state !== GameState.RUNNING}>
				{/* <Debug> */}
				<Floor />
				<Player />
				<Ghost />
				<Flashlight />
				<Objects />
				{/* {walls} */}
				{/* </Debug> */}
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
