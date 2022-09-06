import { PublicApi } from '@react-three/cannon';
import { RefObject } from 'react';
import type { Group } from 'three';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Triplet } from '@react-three/cannon';
import produce from 'immer';
import { GameState, GameEvent } from '@/misc/enums';

interface PlayerModel {
	obj: [RefObject<Group>, PublicApi];
	position: Triplet;
	velocity: {
		direction: number;
		magnitude: number;
	};
}

export interface AppState {
	/* PLAYER */
	player: PlayerModel;
	updatePlayer: (changes: Partial<PlayerModel>) => void;

	/* GHOST */
	ghost: PlayerModel;
	updateGhost: (changes: Partial<PlayerModel>) => void;

	/* KEYS */
	pressedKeys: Array<string>;
	addKey: (key: string) => void;
	removeKey: (key: string) => void;

	/* GAME STATE */
	state: GameState;
	send: (e: GameEvent) => void;
}

const restartGame = (state: AppState): AppState => {
	const { obj } = state.player;

	if (obj) {
		const [_ref, api] = obj;
		api.position.set(0, 0, 0);
		api.velocity.set(0, 0, 0);
	}

	state.player = {
		...state.player,
		...{
			position: [0, 0, 0],
			velocity: {
				direction: 0,
				magnitude: 0,
			},
		},
	};

	state.state = GameState.RUNNING;
	return state;
};

const playerDefaultState: PlayerModel = {
	obj: [null, null],
	position: [0, 0, 0],
	velocity: {
		direction: 0,
		magnitude: 0,
	},
};

export const useStore = create<AppState>()(
	persist(
		devtools((set) => ({
			/* PLAYER */
			player: playerDefaultState,
			updatePlayer: (changes) =>
				set(
					produce((state: AppState) => {
						state.player = { ...state.player, ...changes };
					})
				),

			/* GHOST */
			ghost: playerDefaultState,
			updateGhost: (changes) =>
				set(
					produce((state: AppState) => {
						state.ghost = { ...state.ghost, ...changes };
					})
				),

			/* KEYS */
			pressedKeys: [],
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

			/* GAME STATE */
			state: GameState.MENU,
			send: (e) =>
				set(
					produce((state: AppState) => {
						switch (state.state) {
							case GameState.MENU: {
								if (e === GameEvent.START) {
									state = restartGame(state);
								}

								break;
							}

							case GameState.RUNNING: {
								if (e === GameEvent.LOST) {
									state.state = GameState.LOST;
								}

								if (e === GameEvent.WON) {
									state.state = GameState.WON;
								}

								break;
							}

							case GameState.WON: {
								if (e === GameEvent.START) {
									state = restartGame(state);
								}

								break;
							}

							case GameState.LOST: {
								if (e === GameEvent.START) {
									state = restartGame(state);
								}

								break;
							}

							default: {
							}
						}
					})
				),
		})),
		{
			name: 'game-map',
		}
	)
);

export default useStore;
