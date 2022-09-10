import useMapStore from '@/misc/mapStore';
import { useRef } from 'react';
import { GameObjects } from '@/misc/enums';

const MapEditor = () => {
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

		toggleObject({
			x: x * 2,
			y: y * 2,
			type,
		});
	};

	return (
		<div className="border-2 border-white bg-black p-2 opacity-75">
			<h1 className="text-white">Interface</h1>
			<div className="flex flex-row items-center justify-center gap-2">
				<input ref={refX} type="number" min={-20} max={20} />
				<input ref={refY} type="number" min={-20} max={20} />
				<select ref={refType}>
					<option value={'hor'} defaultChecked>
						Horizontal Wall
					</option>
					<option value={'ver'}>Vertical Wall</option>
					<option value={'exit'}>Exit</option>
				</select>
			</div>
			<button
				className="border-2 border-white bg-transparent text-white"
				type="button"
				onClick={(e) => {
					e.preventDefault();
					handleClick();
				}}
			>
				Submit
			</button>
			<button
				className="border-2 border-white bg-transparent text-white"
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

export default MapEditor;
