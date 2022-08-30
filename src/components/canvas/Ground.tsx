import { usePlane, PlaneProps } from '@react-three/cannon';
import type { Mesh } from 'three';
import { GameObjects } from '@/misc/enums';

const Ground = (props: PlaneProps) => {
	const [ref] = usePlane<Mesh>(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		...props,
		type: 'Static',
		userData: {
			type: GameObjects.GROUND,
		},
	}));

	return (
		<mesh ref={ref}>
			<planeGeometry args={[100, 100]} />
			<meshPhysicalMaterial color="darkgrey" />
		</mesh>
	);
};

export default Ground;
