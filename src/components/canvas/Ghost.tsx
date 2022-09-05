import { Triplet, useBox } from '@react-three/cannon';
import type { Mesh, PointLight } from 'three';
import { GameObjects } from '@/misc/enums';
import { useEffect, useRef } from 'react';

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
	const glowRef = useRef<PointLight | null>(null);

	useEffect(() => {
		// const unsubscribe = api.position.subscribe((v) => {
		// 	glowRef.current.position.x = v[0];
		// 	glowRef.current.position.y = v[1];
		// 	glowRef.current.position.z = v[2];
		// });
		// return unsubscribe;
	});

	return (
		<group>
			<mesh ref={ref} receiveShadow>
				<meshStandardMaterial
					color="white"
					// emissive="white"
					// emissiveIntensity={0.1}
				/>
				<boxGeometry />
			</mesh>
			{/* <pointLight ref={glowRef} intensity={0.2} distance={2} color="white" /> */}
		</group>
	);
};

export default Ghost;
