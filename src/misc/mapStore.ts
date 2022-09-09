import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
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

export interface MapState {
	objects: Array<GameObject>;
	toggleObject: (value: GameObject) => void;
	clearObjects: () => void;
}

export const useMapStore = create<MapState>()(
	devtools((set) => ({
		objects: [],
		toggleObject: (value) =>
			set(
				produce((state: MapState) => {
					const index = state.objects.findIndex(
						(item) => JSON.stringify(item) === JSON.stringify(value)
					);

					if (index === -1) {
						state.objects.push(value);
					} else {
						state.objects.splice(index, 1);
					}
				})
			),
		clearObjects: () =>
			set(
				produce((state: MapState) => {
					state.objects = [];
				})
			),
	}))
);
