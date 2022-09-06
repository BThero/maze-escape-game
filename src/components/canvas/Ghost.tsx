import { Triplet, useSphere } from '@react-three/cannon';
import type { Mesh, PointLight } from 'three';
import { GameObjects } from '@/misc/enums';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
	nodes: {
		Object_7: THREE.Mesh;
		Object_8: THREE.Mesh;
	};
	materials: {
		['01_-_Default.002']: THREE.MeshStandardMaterial;
		['02_-_Default.002']: THREE.MeshStandardMaterial;
	};
};

const Ghost = (props: JSX.IntrinsicElements['group']) => {
	const { nodes, materials } = useGLTF('models/ghost2.glb') as GLTFResult;
	const initialPosition: Triplet = [5, 1, 5];
	const [_ref, api] = useSphere<Mesh>(() => ({
		mass: 1,
		position: initialPosition,
		args: [0.6],
		onCollide: (e) => {
			if (e.body.userData?.type === GameObjects.HUMAN) {
				console.log('player lost');
			}
		},
		userData: {
			type: GameObjects.GHOST,
		},
	}));
	const group = useRef<THREE.Group>();

	useEffect(() => {
		const unsubscribe = api.position.subscribe((v) => {
			group.current.position.x = v[0];
			group.current.position.y = v[1];
			group.current.position.z = v[2];
		});
		return unsubscribe;
	});

	useFrame(() => {
		api.velocity.set(-0.5, 0, 0);
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				geometry={nodes.Object_7.geometry}
				material={materials['01_-_Default.002']}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes.Object_8.geometry}
				material={materials['02_-_Default.002']}
				castShadow
				receiveShadow
			/>
		</group>
	);
};

useGLTF.preload('models/ghost2.glb');
export default Ghost;
