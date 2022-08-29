import { Physics, Debug, Triplet } from '@react-three/cannon';
import Ground from '@/components/canvas/Ground';
import Sphere from '@/components/canvas/Sphere';
import Wall from '@/components/canvas/Wall';
import { AxesHelper } from 'three';
import useStore from '@/helpers/store';
import { useEffect } from 'react';

const movementLimit: Triplet = [3, 3, 3];

const UI = () => {
	const { movement, setMovement, player } = useStore();

	const setMovementSync = (key: string) => {
		console.log('key', key);

		switch (key) {
			case 'ArrowLeft': {
				const threshold = -movementLimit[0];
				const distance = movement[0] - threshold;
				movement[0] -= distance / 3;
				break;
			}

			case 'ArrowRight': {
				const threshold = movementLimit[0];
				const distance = threshold - movement[0];
				movement[0] += distance / 3;
				break;
			}

			case 'ArrowUp': {
				const threshold = -movementLimit[2];
				const distance = movement[2] - threshold;
				movement[2] -= distance / 3;
				break;
			}

			case 'ArrowDown': {
				const threshold = movementLimit[2];
				const distance = threshold - movement[2];
				movement[2] += distance / 3;
				break;
			}

			default: {
			}
		}

		const [ref, api] = player;
		api.velocity.set(movement[0], movement[1], movement[2]);
		setMovement(movement);
	};

	useEffect(() => {
		const handlePress = (e: KeyboardEvent) => {
			setMovementSync(e.key);
		};

		document.addEventListener('keydown', handlePress);

		return () => {
			document.removeEventListener('keydown', handlePress);
		};
	});

	return null;
};

// DOM elements here
const DOM = () => {
	return (
		<>
			<UI />
		</>
	);
};

// Canvas/R3F components here
const R3F = () => {
	return (
		<>
			<primitive object={new AxesHelper(10)} />
			<Physics gravity={[0, -50, 0]}>
				<Debug color="black" scale={1.1}>
					<pointLight
						castShadow
						position={[-10, 0, 0]}
						intensity={1}
						color="white"
					/>
					<Ground />
					<Sphere />
					<Wall position={[-2, 2.5, 0]} color="blue" size={[0.1, 5, 5]} />
				</Debug>
			</Physics>
		</>
	);
};

export default function Page() {
	return (
		<>
			<DOM />
			<R3F />
		</>
	);
}
