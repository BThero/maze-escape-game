import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameObjects } from './enums';
import produce from 'immer';

export type GameObject = {
	x: number;
	y: number;
	type:
		| GameObjects.HORIZONTAL_WALL
		| GameObjects.VERTICAL_WALL
		| GameObjects.EXIT;
};

export type GameDimensions = {
	rows: number;
	columns: number;
};

export interface MapState {
	dimensions: GameDimensions;
	setDimensions: (value: Partial<GameDimensions>) => void;

	objects: Array<GameObject>;
	addObject: (value: GameObject) => void;
	removeObject: (value: GameObject) => void;
}

export const useMapStore = create<MapState>()(
	devtools((set) => ({
		dimensions: {
			rows: 15,
			columns: 15,
		},
		setDimensions: (value) =>
			set(
				produce((state: MapState) => {
					state.dimensions = {
						...state.dimensions,
						...value,
					};
				})
			),

		objects: [],
		addObject: (value) =>
			set(
				produce((state: MapState) => {
					if (!state.objects.includes(value)) {
						state.objects.push(value);
					}
				})
			),
		removeObject: (value) =>
			set(
				produce((state: MapState) => {
					state.objects = state.objects.filter((item) => item !== value);
				})
			),
	}))
);
