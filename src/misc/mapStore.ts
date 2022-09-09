import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GameObjects } from './enums';
import produce from 'immer';
import { Triplet } from '@react-three/cannon';

export type GameObject = {
	x: number;
	y: number;
	type:
		| GameObjects.HORIZONTAL_WALL
		| GameObjects.VERTICAL_WALL
		| GameObjects.EXIT;
};

export interface MapState {
	playerPosition: Triplet;
	ghostPosition: Triplet;

	objects: Array<GameObject>;
	toggleObject: (value: GameObject) => void;
	clearObjects: () => void;
}

const useMapStore = create<MapState>()(
	persist(
		devtools((set) => ({
			playerPosition: [1, 1, -1],
			ghostPosition: [9, 1, -7],

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
		})),
		{
			name: 'map-store',
		}
	)
);

export default useMapStore;
