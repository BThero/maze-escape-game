import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import useStore from '@/misc/store';
import type { PerspectiveCamera as PC } from 'three';

const Camera = () => {
	const position = useStore((state) => state.player.position);
	const ref = useRef<PC>(null);

	return (
		<PerspectiveCamera
			ref={ref}
			makeDefault
			fov={45}
			near={1}
			far={40}
			position={[position[0], 15, position[2]]}
			onUpdate={(s) => {
				s.lookAt(...position);
				s.updateProjectionMatrix();
			}}
		/>
	);
};

export default Camera;
