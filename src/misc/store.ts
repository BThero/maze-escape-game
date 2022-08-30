import { PublicApi } from '@react-three/cannon';
import { RefObject } from 'react';
import type { Mesh } from 'three';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Triplet } from '@react-three/cannon';
import produce from 'immer';

interface PlayerModel {
	obj: [RefObject<Mesh>, PublicApi];
	position: Triplet;
	velocity: {
		direction: number;
		magnitude: number;
	};
}

export interface AppState {
	player: PlayerModel;
	pressedKeys: Array<string>;
	updatePlayer: (changes: Partial<PlayerModel>) => void;
	addKey: (key: string) => void;
	removeKey: (key: string) => void;
}

export const useStore = create<AppState>()(
	devtools((set) => ({
		player: {
			obj: undefined,
			position: [0, 0, 0],
			velocity: {
				direction: 0,
				magnitude: 0,
			},
		},
		pressedKeys: [],
		updatePlayer: (changes) =>
			set(
				produce((state: AppState) => {
					state.player = { ...state.player, ...changes };
				})
			),
		addKey: (key) =>
			set(
				produce((state: AppState) => {
					if (!state.pressedKeys.includes(key)) {
						state.pressedKeys.push(key);
					}
				})
			),
		removeKey: (key) =>
			set(
				produce((state: AppState) => {
					state.pressedKeys = state.pressedKeys.filter((x) => x != key);
				})
			),
	}))
);

export default useStore;
