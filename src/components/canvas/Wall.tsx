import { BoxProps, Triplet, useBox } from '@react-three/cannon';
import type { Mesh, Color, InstancedMesh } from 'three';

type WallProps = {
	color: Color | string;
	position: Triplet;
	size: Triplet;
};

const Wall = ({ color, position, size }: WallProps) => {
	const [ref] = useBox<Mesh>(() => ({
		position: position,
		args: size,
		type: 'Static',
		name: 'Wall',
	}));

	return (
		<mesh receiveShadow castShadow ref={ref}>
			<boxBufferGeometry attach="geometry" args={size} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
};

export default Wall;
