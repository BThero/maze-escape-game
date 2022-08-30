import { Triplet, useBox } from '@react-three/cannon';
import type { Mesh } from 'three';
import { GameObjects } from '@/misc/enums';

const Ghost = () => {
	const initialPosition: Triplet = [5, 1, 5];
	const [ref, api] = useBox<Mesh>(() => ({
		mass: 1,
		position: initialPosition,
		args: [1, 1, 1],
		onCollide: (e) => {
			if (e.body.userData?.type === GameObjects.HUMAN) {
				console.log('player lost');
			}
		},
		userData: {
			type: GameObjects.GHOST,
		},
	}));

	return (
		<>
			<mesh ref={ref} receiveShadow>
				<meshStandardMaterial color="red" />
				<boxGeometry />
			</mesh>
		</>
	);
};

export default Ghost;
