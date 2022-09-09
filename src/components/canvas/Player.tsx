import { CollideEvent, Triplet, useBox, useSphere } from '@react-three/cannon';
import type { Mesh } from 'three';
import { useStore } from '@/misc/store';
import { useEffect, useRef } from 'react';
import { GameEvent, GameObjects } from '@/misc/enums';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import useMapStore from '@/misc/mapStore';

type GLTFResult = GLTF & {
	nodes: {
		armLeft_1: THREE.Mesh;
		armLeft_2: THREE.Mesh;
		armLeft_3: THREE.Mesh;
		armRight_1: THREE.Mesh;
		armRight_2: THREE.Mesh;
		armRight_3: THREE.Mesh;
		body_1: THREE.Mesh;
		body_2: THREE.Mesh;
		body_3: THREE.Mesh;
		Group_122001: THREE.Mesh;
		Group_122_1: THREE.Mesh;
		Group_122_2: THREE.Mesh;
		legLeft_1: THREE.Mesh;
		legLeft_2: THREE.Mesh;
		legRight_1: THREE.Mesh;
		legRight_2: THREE.Mesh;
	};
	materials: {
		['textile.002']: THREE.MeshStandardMaterial;
		['wood.015']: THREE.MeshStandardMaterial;
		textileRed: THREE.MeshStandardMaterial;
		_defaultMat: THREE.MeshStandardMaterial;
		['iron.005']: THREE.MeshStandardMaterial;
		['sand.003']: THREE.MeshStandardMaterial;
	};
};

const Player = (props: JSX.IntrinsicElements['group']) => {
	const { nodes, materials } = useGLTF('models/pirate2.glb') as GLTFResult;
	const group = useRef<THREE.Group>();

	const send = useStore((state) => state.send);
	const initialPosition = useMapStore((store) => store.playerPosition);
	const [_ref, api] = useSphere<Mesh>(() => ({
		mass: 1,
		position: initialPosition,
		args: [0.5],
		onCollide: handleCollide,
		userData: {
			type: GameObjects.HUMAN,
		},
	}));
	const updatePlayer = useStore((state) => state.updatePlayer);
	const pos = useRef<Triplet>(initialPosition);
	const handleCollide = (e: CollideEvent) => {
		if (e.body?.userData?.type === GameObjects.GHOST) {
			send(GameEvent.LOST);
		}

		if (e.body?.userData?.type === GameObjects.EXIT) {
			send(GameEvent.WON);
		}
	};

	useEffect(() => {
		if (group.current) {
			updatePlayer({
				obj: [group, api],
			});
		}
	}, [group, api, updatePlayer]);

	useEffect(() => {
		const unsubscribe = api.position.subscribe((v) => {
			if (v != pos.current) {
				pos.current = v;
				group.current.position.x = v[0];
				group.current.position.y = v[1];
				group.current.position.z = v[2];
				updatePlayer({
					position: pos.current,
				});
			}
		});
		return unsubscribe;
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				geometry={nodes.armLeft_1.geometry}
				material={materials['textile.002']}
			/>
			<mesh
				geometry={nodes.armLeft_2.geometry}
				material={materials['wood.015']}
			/>
			<mesh
				geometry={nodes.armLeft_3.geometry}
				material={materials.textileRed}
			/>
			<mesh
				geometry={nodes.armRight_1.geometry}
				material={materials['textile.002']}
			/>
			<mesh
				geometry={nodes.armRight_2.geometry}
				material={materials['wood.015']}
			/>
			<mesh
				geometry={nodes.armRight_3.geometry}
				material={materials.textileRed}
			/>
			<mesh geometry={nodes.body_1.geometry} material={materials['wood.015']} />
			<mesh geometry={nodes.body_2.geometry} material={materials.textileRed} />
			<mesh geometry={nodes.body_3.geometry} material={materials._defaultMat} />
			<mesh
				geometry={nodes.Group_122001.geometry}
				material={materials['iron.005']}
			/>
			<mesh
				geometry={nodes.Group_122_1.geometry}
				material={materials['sand.003']}
			/>
			<mesh
				geometry={nodes.Group_122_2.geometry}
				material={materials['wood.015']}
			/>
			<mesh
				geometry={nodes.legLeft_1.geometry}
				material={materials['textile.002']}
			/>
			<mesh
				geometry={nodes.legLeft_2.geometry}
				material={materials['wood.015']}
			/>
			<mesh
				geometry={nodes.legRight_1.geometry}
				material={materials['wood.015']}
			/>
			<mesh
				geometry={nodes.legRight_2.geometry}
				material={materials['textile.002']}
			/>
		</group>
	);
};

useGLTF.preload('models/pirate2.glb');

export default Player;
