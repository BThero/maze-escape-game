import { useEffect, useRef } from 'react';
import { Triplet } from '@react-three/cannon';
import useStore from '@/misc/store';
import { extractVectorComponents, addTriplets } from '@/misc/utils';
import { Object3D, SpotLight, SpotLightHelper, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { GameObjects } from '@/misc/enums';

const Flashlight = () => {
	const { scene } = useThree();

	const direction = useStore((state) => state.player.velocity.direction);
	const playerPosition = useStore((state) => state.player.position);
	let position: Triplet = [...playerPosition];
	position[1] = 1;
	console.log(position);

	const lightRef = useRef<SpotLight | null>(null);
	const targetRef = useRef<Object3D | null>(null);

	useHelper(lightRef, SpotLightHelper, 'white');

	const target = addTriplets(
		position,
		extractVectorComponents({ magnitude: 1, direction })
	);

	useEffect(() => {
		scene.add(lightRef.current.target);
		scene.add(targetRef.current);
		lightRef.current.target = targetRef.current;
	}, [scene, lightRef]);

	return (
		<spotLight
			ref={lightRef}
			position={position}
			castShadow
			shadow-mapSize-height={1024}
			shadow-mapSize-width={1024}
			distance={8}
		>
			<object3D ref={targetRef} position={target} />
		</spotLight>
	);
};

export default Flashlight;
