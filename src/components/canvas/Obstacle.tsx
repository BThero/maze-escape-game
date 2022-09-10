import { Triplet, useBox } from '@react-three/cannon';
import type { Mesh } from 'three';
import { TILE_SIZE, WALL_HEIGHT, WALL_THICKNESS } from '@/misc/constants';
import { GameObjects } from '@/misc/enums';
import { useTexture } from '@react-three/drei';

type ObstacleProps = {
	position: Triplet;
	type: GameObjects.HORIZONTAL_WALL | GameObjects.VERTICAL_WALL;
};

const Obstacle = ({ position, type }: ObstacleProps) => {
	position[1] += WALL_HEIGHT / 2;
	let rot: number;

	if (type === GameObjects.HORIZONTAL_WALL) {
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
		rotation: [0, rot, 0],
		userData: {
			type: type,
		},
	}));

	const textureProps = useTexture({
		map: 'textures/BrickWall/baseColor.jpeg',
		normalMap: 'textures/BrickWall/normal.jpeg',
		roughnessMap: 'textures/BrickWall/roughness.jpeg',
		metallicMap: 'textures/BrickWall/metallic.jpeg',
	});

	return (
		<mesh receiveShadow castShadow ref={ref}>
			<boxBufferGeometry attach="geometry" args={size} />
			<meshStandardMaterial attach="material" {...textureProps} />
		</mesh>
	);
};

export default Obstacle;
