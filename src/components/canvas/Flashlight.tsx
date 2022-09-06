import { useEffect, useRef } from 'react';
import { Triplet } from '@react-three/cannon';
import useStore from '@/misc/store';
import { extractVectorComponents, addTriplets } from '@/misc/utils';
import { Object3D, SpotLight, SpotLightHelper } from 'three';
import { useThree } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';

const Flashlight = () => {
	const { scene } = useThree();

	const direction = useStore((state) => state.player.velocity.direction);
	const position = useStore((state) => state.player.position);
	const elevatedPosition: Triplet = [position[0], 1, position[2]];

	const lightRef = useRef<SpotLight | null>(null);
	const targetRef = useRef<Object3D | null>(null);

	const target = addTriplets(
		elevatedPosition,
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
			position={elevatedPosition}
			castShadow
			receiveShadow
			shadow-mapSize-height={1024}
			shadow-mapSize-width={1024}
			shadow-camera-near={0.1}
			shadow-camera-far={10}
			distance={8}
		>
			<object3D ref={targetRef} position={target} />
		</spotLight>
	);
};

export default Flashlight;
