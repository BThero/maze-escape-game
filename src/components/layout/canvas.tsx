import { Canvas } from '@react-three/fiber';
import { A11yAnnouncer } from '@react-three/a11y';
import { Preload, Stats } from '@react-three/drei';

const CanvasWrapper = ({ children }) => {
	return (
		<>
			<Canvas
				// @ts-ignore
				mode="concurrent"
				shadows={true}
				style={{
					position: 'absolute',
					top: 0,
				}}
			>
				<Stats />
				<Preload all />
				{children}
			</Canvas>
			<A11yAnnouncer />
		</>
	);
};

export default CanvasWrapper;
