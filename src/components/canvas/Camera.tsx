import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import useStore from '@/misc/store';
import type { PerspectiveCamera as PC } from 'three';

const Camera = () => {
	const [playerRef, api] = useStore((state) => state.player.obj);
	const position = useStore((state) => state.player.position);
	const ref = useRef<PC>(null);

	return (
		<>
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
			<spotLight
				color="white"
				intensity={0.2}
				angle={0.1}
				position={[position[0], 5, position[2]]}
				target={playerRef?.current}
			/>
		</>
	);
};

export default Camera;

// import { useRef } from 'react';
// import { PerspectiveCamera } from '@react-three/drei';
// import useStore from '@/misc/store';
// import type { PerspectiveCamera as PC } from 'three';
// import { addTriplets, extractVectorComponents } from '@/misc/utils';

// const Camera = () => {
// 	const position = useStore((state) => state.player.position);
// 	const direction = useStore((state) => state.player.velocity.direction);
// 	const cameraPosition = addTriplets(
// 		position,
// 		extractVectorComponents({ magnitude: -2, direction })
// 	);
// 	const targetPosition = addTriplets(
// 		position,
// 		extractVectorComponents({ magnitude: 5, direction })
// 	);
// 	const ref = useRef<PC | null>(null);

// 	if (ref.current) {
// 		ref.current.position.x = cameraPosition[0];
// 		ref.current.position.y = 3;
// 		ref.current.position.z = cameraPosition[2];
// 	}

// 	return (
// 		<PerspectiveCamera
// 			ref={ref}
// 			makeDefault
// 			fov={45}
// 			near={1}
// 			far={40}
// 			position={[0, 15, 0]}
// 			onUpdate={(s) => {
// 				s.lookAt(...targetPosition);
// 				s.updateProjectionMatrix();
// 			}}
// 		/>
// 	);
// };

// export default Camera;
