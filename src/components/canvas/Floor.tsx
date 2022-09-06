import { usePlane, PlaneProps } from '@react-three/cannon';
import type { Mesh } from 'three';
import { GameObjects } from '@/misc/enums';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Floor = (props: PlaneProps) => {
	const [ref] = usePlane<Mesh>(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		...props,
		type: 'Static',
		userData: {
			type: GameObjects.GROUND,
		},
	}));

	const textureProps = useTexture({
		map: 'textures/Concrete material 1/baseColor.jpeg',
		normalMap: 'textures/Concrete material 1/normal.jpeg',
		roughnessMap: 'textures/Concrete material 1/roughness.jpeg',
		aoMap: 'textures/Concrete material 1/ambientOcclusion.jpeg',
		metalnessMap: 'textures/Concrete material 1/metallic.jpeg',
	});

	return (
		<mesh ref={ref} receiveShadow castShadow>
			<planeGeometry args={[100, 100]} />
			<meshStandardMaterial
				{...textureProps}
				map-wrapS={THREE.RepeatWrapping}
				map-wrapT={THREE.RepeatWrapping}
				map-repeat={[20, 20]}
				metalness={1} // set to 1 to use 100% of the metalnessMap
				metalnessMap-wrapS={THREE.RepeatWrapping}
				metalnessMap-wrapT={THREE.RepeatWrapping}
				normalMap-wrapS={THREE.RepeatWrapping}
				normalMap-wrapT={THREE.RepeatWrapping}
				normalMap-encoding={THREE.LinearEncoding}
				roughness={1} // set to 1 to use 100% of the roughnessMap
				roughnessMap-wrapS={THREE.RepeatWrapping}
				roughnessMap-wrapT={THREE.RepeatWrapping}
			/>
		</mesh>
	);
};

export default Floor;
