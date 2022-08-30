import { Physics, Debug, Triplet } from '@react-three/cannon';
import Ground from '@/components/canvas/Ground';
import Player from '@/components/canvas/Player';
import Ghost from '@/components/canvas/Ghost';
import Flashlight from '@/components/canvas/Flashlight';
import Wall, { WallType } from '@/components/canvas/Wall';
import Camera from '@/components/canvas/Camera';
import { ROWS, COLUMNS, TILE_SIZE } from '@/misc/constants';
import { PlayerControls } from '@/components/canvas/PlayerControls';

const DOM = () => {
	return <></>;
};

const R3F = () => {
	const walls = Array.from({ length: ROWS }).map((_, i) => {
		return Array.from({ length: COLUMNS }).map((_, j) => {
			return [WallType.vertical, WallType.horizontal].map((type, index) => {
				const base: Triplet = [i * TILE_SIZE, 0, j * TILE_SIZE];

				if (Math.random() < 0.3) {
					return <Wall position={base} type={type} key={index} />;
				} else {
					return null;
				}
			});
		});
	});

	return (
		<>
			<PlayerControls />
			<Camera />
			<Physics gravity={[0, -50, 0]}>
				<Debug color="black" scale={1.1}>
					<Ground />
					<Player />
					<Ghost />
					<Flashlight />
					{/* {walls} */}
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
