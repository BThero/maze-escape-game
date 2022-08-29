import { SphereProps, useSphere } from '@react-three/cannon';
import { useEffect } from 'react';
import { BoxGeometry, Mesh, SphereGeometry } from 'three';
import { useStore } from '@/helpers/store';
import { useFrame } from '@react-three/fiber';

const Sphere = (props: SphereProps) => {
	const [ref, api] = useSphere<Mesh>(() => ({
		mass: 1,
		position: [0, 5, 0],
		...props,
		args: [1],
		onCollide: (e) => {
			if (e.target.userData?.type === 'Player') {
				console.log('player collision');
			}
		},
	}));
	const { setPlayer } = useStore();

	useEffect(() => {
		setPlayer([ref, api]);
	}, [ref, api, setPlayer]);

	return (
		<mesh
			ref={ref}
			castShadow
			receiveShadow
			userData={{
				type: 'player',
			}}
		>
			<meshStandardMaterial color="red" />
			<sphereGeometry />
		</mesh>
	);
};

export default Sphere;
