import { usePlane, PlaneProps } from '@react-three/cannon';
import type { Mesh } from 'three';

const Ground = (props: PlaneProps) => {
	const [ref] = usePlane<Mesh>(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		...props,
		type: 'Static',
	}));
	return (
		<mesh ref={ref}>
			<planeGeometry args={[100, 100]} />
			<ambientLight intensity={0.2} />
			<meshPhysicalMaterial color="darkgrey" />
		</mesh>
	);
};

export default Ground;
