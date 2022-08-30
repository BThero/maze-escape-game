import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import useStore from '@/misc/store';
import type { PerspectiveCamera as PC } from 'three';

const Camera = () => {
	const position = useStore((state) => state.player.position);
	const ref = useRef<PC>(null);

	if (ref.current) {
		ref.current.position.x = position[0];
		ref.current.position.z = position[2];
	}

	return (
		<PerspectiveCamera
			ref={ref}
			makeDefault
			fov={45}
			near={1}
			far={40}
			position={[0, 15, 0]}
			onUpdate={(s) => {
				s.lookAt(...position);
				s.updateProjectionMatrix();
			}}
		/>
	);
};

export default Camera;
