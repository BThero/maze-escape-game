import { Triplet, useBox } from '@react-three/cannon';
import type { Mesh } from 'three';
import { TILE_SIZE, WALL_HEIGHT, WALL_THICKNESS } from '@/misc/constants';
import { GameObjects } from '@/misc/enums';

export enum WallType {
	'horizontal',
	'vertical',
}

type WallProps = {
	position: Triplet;
	type: WallType;
};

const Wall = ({ position, type }: WallProps) => {
	position[1] += WALL_HEIGHT / 2;
	let rot: number;

	if (type === WallType.horizontal) {
		position[0] += TILE_SIZE / 2;
		rot = Math.PI / 2;
	} else {
		position[2] -= TILE_SIZE / 2;
		rot = 0;
	}

	const size: Triplet = [WALL_THICKNESS, WALL_HEIGHT, TILE_SIZE];

	const [ref] = useBox<Mesh>(() => ({
		position: position,
		args: size,
		type: 'Static',
		name: 'Wall',
		rotation: [0, rot, 0],
		userData: {
			type: GameObjects.WALL,
		},
	}));

	return (
		<mesh receiveShadow castShadow ref={ref}>
			<boxBufferGeometry attach="geometry" args={size} />
			<meshLambertMaterial attach="material" />
		</mesh>
	);
};

export default Wall;
