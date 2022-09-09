import { Triplet } from '@react-three/cannon';
import { useBox } from '@react-three/cannon';
import { TILE_SIZE, WALL_HEIGHT, WALL_THICKNESS } from '@/misc/constants';
import type { Mesh } from 'three';
import { GameObjects } from '@/misc/enums';

type ExitProps = {
	position: Triplet;
};

const Exit = ({ position }: ExitProps) => {
	position[0] += TILE_SIZE / 2;
	position[1] += 0.05;
	position[2] -= TILE_SIZE / 2;

	const [ref, api] = useBox<Mesh>(() => ({
		args: [1, 0.1, 1],
		position: position,
		type: 'Static',
		userData: {
			type: GameObjects.EXIT,
		},
	}));

	return (
		<mesh ref={ref} castShadow receiveShadow>
			<boxGeometry attach="geometry" args={[1, 0.1, 1]} />
			<meshStandardMaterial attach="material" color="red" />
		</mesh>
	);
};

export default Exit;
