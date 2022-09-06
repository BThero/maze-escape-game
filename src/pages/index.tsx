import { Physics, Debug, Triplet } from '@react-three/cannon';
import Floor from '@/components/canvas/Floor';
import Player from '@/components/canvas/Player';
import Ghost from '@/components/canvas/Ghost';
import Flashlight from '@/components/canvas/Flashlight';
import Obstacle, { ObstacleDirection } from '@/components/canvas/Obstacle';
import Camera from '@/components/canvas/Camera';
import { ROWS, COLUMNS, TILE_SIZE } from '@/misc/constants';
import { PlayerControls } from '@/components/canvas/PlayerControls';
import useStore from '@/misc/store';
import { GameEvent, GameObjects, GameState } from '@/misc/enums';

/* DOM */
import WelcomeScreen from '@/components/dom/WelcomeScreen';
import WonScreen from '@/components/dom/WonScreen';
import LostScreen from '@/components/dom/LostScreen';

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
			return <></>;
		}
	}
};

const R3F = () => {
	const state = useStore((state) => state.state);
	const walls = Array.from({ length: ROWS }).map((_, i) => {
		return Array.from({ length: COLUMNS }).map((_, j) => {
			return [ObstacleDirection.VERTICAL, ObstacleDirection.HORIZONTAL].map(
				(direction, index) => {
					if (Math.random() < 0.3) {
						const base: Triplet = [i * TILE_SIZE, 0, j * TILE_SIZE];
						const type =
							Math.random() < 0.1 ? GameObjects.EXIT : GameObjects.WALL;

						return (
							<Obstacle
								position={base}
								direction={direction}
								type={type}
								key={index}
							/>
						);
					} else {
						return null;
					}
				}
			);
		});
	});

	return (
		<>
			<PlayerControls />
			<Camera />
			{/* <ambientLight intensity={0.05} /> */}
			<Physics gravity={[0, -50, 0]} isPaused={state !== GameState.RUNNING}>
				<Debug color="black" scale={1.1}>
					<Floor />
					<Player />
					<Ghost />
					<Flashlight />
					{/* <ambientLight /> */}
					{walls}
				</Debug>
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
