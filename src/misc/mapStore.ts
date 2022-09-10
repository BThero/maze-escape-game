import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameObjects } from './enums';
import produce from 'immer';
import { Triplet } from '@react-three/cannon';

const mapObjects: GameObject[] = [
	{
		x: 0,
		y: 0,
		type: 1,
	},
	{
		x: 2,
		y: 0,
		type: 1,
	},
	{
		x: 4,
		y: 0,
		type: 1,
	},
	{
		x: 6,
		y: 0,
		type: 1,
	},
	{
		x: 8,
		y: 0,
		type: 1,
	},
	{
		x: 10,
		y: 0,
		type: 1,
	},
	{
		x: 12,
		y: 0,
		type: 1,
	},
	{
		x: 14,
		y: 0,
		type: 1,
	},
	{
		x: 16,
		y: 0,
		type: 1,
	},
	{
		x: 18,
		y: 0,
		type: 1,
	},
	{
		x: 2,
		y: -2,
		type: 1,
	},
	{
		x: 6,
		y: -2,
		type: 1,
	},
	{
		x: 2,
		y: -4,
		type: 1,
	},
	{
		x: 4,
		y: -4,
		type: 1,
	},
	{
		x: 10,
		y: -4,
		type: 1,
	},
	{
		x: 12,
		y: -4,
		type: 1,
	},
	{
		x: 18,
		y: -4,
		type: 1,
	},
	{
		x: 2,
		y: -6,
		type: 1,
	},
	{
		x: 8,
		y: -6,
		type: 1,
	},
	{
		x: 10,
		y: -6,
		type: 1,
	},
	{
		x: 12,
		y: -6,
		type: 1,
	},
	{
		x: 14,
		y: -6,
		type: 1,
	},
	{
		x: 0,
		y: -8,
		type: 1,
	},
	{
		x: 10,
		y: -8,
		type: 1,
	},
	{
		x: 2,
		y: -10,
		type: 1,
	},
	{
		x: 4,
		y: -10,
		type: 1,
	},
	{
		x: 12,
		y: -10,
		type: 1,
	},
	{
		x: 14,
		y: -10,
		type: 1,
	},
	{
		x: 2,
		y: -12,
		type: 1,
	},
	{
		x: 6,
		y: -12,
		type: 1,
	},
	{
		x: 10,
		y: -12,
		type: 1,
	},
	{
		x: 14,
		y: -12,
		type: 1,
	},
	{
		x: 16,
		y: -12,
		type: 1,
	},
	{
		x: 4,
		y: -14,
		type: 1,
	},
	{
		x: 6,
		y: -14,
		type: 1,
	},
	{
		x: 8,
		y: -14,
		type: 1,
	},
	{
		x: 10,
		y: -14,
		type: 1,
	},
	{
		x: 16,
		y: -14,
		type: 1,
	},
	{
		x: 18,
		y: -14,
		type: 1,
	},
	{
		x: 2,
		y: -16,
		type: 1,
	},
	{
		x: 4,
		y: -16,
		type: 1,
	},
	{
		x: 10,
		y: -16,
		type: 1,
	},
	{
		x: 12,
		y: -16,
		type: 1,
	},
	{
		x: 4,
		y: -18,
		type: 1,
	},
	{
		x: 8,
		y: -18,
		type: 1,
	},
	{
		x: 14,
		y: -18,
		type: 1,
	},
	{
		x: 16,
		y: -18,
		type: 1,
	},
	{
		x: 0,
		y: -20,
		type: 1,
	},
	{
		x: 2,
		y: -20,
		type: 1,
	},
	{
		x: 4,
		y: -20,
		type: 1,
	},
	{
		x: 6,
		y: -20,
		type: 1,
	},
	{
		x: 8,
		y: -20,
		type: 1,
	},
	{
		x: 10,
		y: -20,
		type: 1,
	},
	{
		x: 12,
		y: -20,
		type: 1,
	},
	{
		x: 14,
		y: -20,
		type: 1,
	},
	{
		x: 16,
		y: -20,
		type: 1,
	},
	{
		x: 18,
		y: -20,
		type: 1,
	},
	{
		x: 0,
		y: 0,
		type: 2,
	},
	{
		x: 0,
		y: -2,
		type: 2,
	},
	{
		x: 0,
		y: -4,
		type: 2,
	},
	{
		x: 0,
		y: -6,
		type: 2,
	},
	{
		x: 0,
		y: -8,
		type: 2,
	},
	{
		x: 0,
		y: -10,
		type: 2,
	},
	{
		x: 0,
		y: -12,
		type: 2,
	},
	{
		x: 0,
		y: -14,
		type: 2,
	},
	{
		x: 0,
		y: -16,
		type: 2,
	},
	{
		x: 0,
		y: -18,
		type: 2,
	},
	{
		x: 2,
		y: -4,
		type: 2,
	},
	{
		x: 2,
		y: -8,
		type: 2,
	},
	{
		x: 2,
		y: -12,
		type: 2,
	},
	{
		x: 2,
		y: -14,
		type: 2,
	},
	{
		x: 2,
		y: -16,
		type: 2,
	},
	{
		x: 4,
		y: 0,
		type: 2,
	},
	{
		x: 4,
		y: -6,
		type: 2,
	},
	{
		x: 4,
		y: -10,
		type: 2,
	},
	{
		x: 4,
		y: -18,
		type: 2,
	},
	{
		x: 6,
		y: -6,
		type: 2,
	},
	{
		x: 6,
		y: -8,
		type: 2,
	},
	{
		x: 8,
		y: -2,
		type: 2,
	},
	{
		x: 8,
		y: -4,
		type: 2,
	},
	{
		x: 8,
		y: -8,
		type: 2,
	},
	{
		x: 8,
		y: -10,
		type: 2,
	},
	{
		x: 8,
		y: -14,
		type: 2,
	},
	{
		x: 8,
		y: -16,
		type: 2,
	},
	{
		x: 10,
		y: -2,
		type: 2,
	},
	{
		x: 10,
		y: -6,
		type: 2,
	},
	{
		x: 10,
		y: -10,
		type: 2,
	},
	{
		x: 10,
		y: -16,
		type: 2,
	},
	{
		x: 12,
		y: 0,
		type: 2,
	},
	{
		x: 12,
		y: -12,
		type: 2,
	},
	{
		x: 12,
		y: -18,
		type: 2,
	},
	{
		x: 14,
		y: 0,
		type: 2,
	},
	{
		x: 14,
		y: -2,
		type: 2,
	},
	{
		x: 14,
		y: -8,
		type: 2,
	},
	{
		x: 14,
		y: -12,
		type: 2,
	},
	{
		x: 14,
		y: -16,
		type: 2,
	},
	{
		x: 16,
		y: -2,
		type: 2,
	},
	{
		x: 16,
		y: -4,
		type: 2,
	},
	{
		x: 16,
		y: -6,
		type: 2,
	},
	{
		x: 16,
		y: -14,
		type: 2,
	},
	{
		x: 18,
		y: 0,
		type: 2,
	},
	{
		x: 18,
		y: -2,
		type: 2,
	},
	{
		x: 18,
		y: -6,
		type: 2,
	},
	{
		x: 18,
		y: -8,
		type: 2,
	},
	{
		x: 18,
		y: -10,
		type: 2,
	},
	{
		x: 18,
		y: -16,
		type: 2,
	},
	{
		x: 20,
		y: 0,
		type: 2,
	},
	{
		x: 20,
		y: -2,
		type: 2,
	},
	{
		x: 20,
		y: -4,
		type: 2,
	},
	{
		x: 20,
		y: -6,
		type: 2,
	},
	{
		x: 20,
		y: -8,
		type: 2,
	},
	{
		x: 20,
		y: -10,
		type: 2,
	},
	{
		x: 20,
		y: -12,
		type: 2,
	},
	{
		x: 20,
		y: -14,
		type: 2,
	},
	{
		x: 20,
		y: -16,
		type: 2,
	},
	{
		x: 20,
		y: -18,
		type: 2,
	},
	{
		x: 10,
		y: -6,
		type: 0,
	},
	{
		x: 8,
		y: -16,
		type: 0,
	},
	{
		x: 4,
		y: 10,
		type: 1,
	},
	{
		x: 4,
		y: 8,
		type: 1,
	},
	{
		x: 4,
		y: 8,
		type: 2,
	},
];

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
	devtools((set) => ({
		playerPosition: [1, 1, -1],
		ghostPosition: [9, 1, -7],
		objects: mapObjects,
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

export default useMapStore;
