import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useMapStore } from '@/misc/mapStore';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { GameObjects } from '@/misc/enums';

const DOM = () => {
	const toggleObject = useMapStore((state) => state.toggleObject);
	const clearObjects = useMapStore((state) => state.clearObjects);

	const refX = useRef<HTMLInputElement>(null);
	const refY = useRef<HTMLInputElement>(null);
	const refType = useRef<HTMLSelectElement>(null);

	const handleClick = () => {
		let x: number,
			y: number,
			type:
				| GameObjects.HORIZONTAL_WALL
				| GameObjects.VERTICAL_WALL
				| GameObjects.EXIT;

		x = parseInt(refX.current.value);
		y = parseInt(refY.current.value);

		if (isNaN(x) || isNaN(y)) {
			throw new Error('not a number provided');
		}

		switch (refType.current.value) {
			case 'hor': {
				type = GameObjects.HORIZONTAL_WALL;
				break;
			}

			case 'ver': {
				type = GameObjects.VERTICAL_WALL;
				break;
			}

			case 'exit': {
				type = GameObjects.EXIT;
				break;
			}

			default: {
				throw new Error('weird');
			}
		}

		console.log({ x, y, type });

		toggleObject({
			x,
			y,
			type,
		});
	};

	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				width: '400px',
				backgroundColor: 'black',
				border: '1px solid white',
				zIndex: 10,
				padding: 16,
			}}
		>
			<h1 style={{ color: 'white' }}>Interface</h1>
			<input ref={refX} type="number" min={-20} max={20} />
			<input ref={refY} type="number" min={-20} max={20} />
			<select ref={refType}>
				<option value={'hor'} defaultChecked>
					Horizontal Wall
				</option>
				<option value={'ver'}>Vertical Wall</option>
				<option value={'exit'}>Exit</option>
			</select>
			<button
				style={{ color: 'white' }}
				type="button"
				onClick={(e) => {
					e.preventDefault();
					handleClick();
				}}
			>
				Submit
			</button>
			<button
				style={{ color: 'white' }}
				type="button"
				onClick={(e) => {
					e.preventDefault();
					clearObjects();
				}}
			>
				Clear
			</button>
		</div>
	);
};

const Plane = () => {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
			<planeGeometry args={[100, 100, 100]} />
			<meshBasicMaterial color="gray" />
		</mesh>
	);
};

const Box = () => {
	return (
		<mesh position={[-1, -1, -1]}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="blue" />
		</mesh>
	);
};

const R3F = () => {
	const objects = useMapStore((store) => store.objects);
	console.log('obj', objects);

	return (
		<>
			<PerspectiveCamera
				makeDefault
				position={[0, 20, 0]}
				onUpdate={(s) => {
					s.lookAt(0, 0, 0);
					s.updateProjectionMatrix();
				}}
			/>
			{objects.map((item) => {})}
			<Plane />
			<Box />
			<ambientLight intensity={1} color="white" />
		</>
	);
};

const Page = () => {
	return (
		<>
			<DOM />
			<R3F />
		</>
	);
};

export default Page;
