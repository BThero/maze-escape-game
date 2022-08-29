import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { A11yAnnouncer } from '@react-three/a11y';
import {
	OrbitControls,
	Preload,
	Stats,
	PerspectiveCamera,
} from '@react-three/drei';
import { Object3D } from 'three';

const Controls = () => {
	const control = useRef(null);
	return (
		<>
			<PerspectiveCamera
				makeDefault
				fov={45}
				near={1}
				far={40}
				position={[0, 10, 0]}
				onUpdate={(s) => {
					s.lookAt(0, 0, 0);
					s.updateProjectionMatrix();
				}}
			/>
			<OrbitControls />
		</>
	);
};

const CanvasWrapper = ({ children }) => {
	return (
		<>
			<Canvas
				// Is this deprecated or typed wrong? Ignoring for now.
				// @ts-ignore
				mode="concurrent"
				shadows={true}
				style={{
					position: 'absolute',
					top: 0,
				}}
			>
				<Stats />
				<Controls />
				<Preload all />
				{children}
			</Canvas>
			<A11yAnnouncer />
		</>
	);
};

export default CanvasWrapper;
