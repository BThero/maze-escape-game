import { PublicApi, Triplet } from '@react-three/cannon';
import { Router } from 'next/router';
import { RefObject } from 'react';
import { Mesh } from 'three';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface AppState {
	// NextJS router
	router: Router;
	setRouter: (router) => void;
	movement: Triplet;
	setMovement: (movement: Triplet) => void;
	player: [RefObject<Mesh>, PublicApi];
	setPlayer: (player: [RefObject<Mesh>, PublicApi]) => void;

	// Add any types for app-wide state here
	// e.g. game start logic, points/score, etc
	// gameStarted: boolean;
	// points: number;
}

export const useStore = create<AppState>()(
	devtools(
		// Optional persist
		// This saves Zustand state when you close browser
		// Good in some cases, but not in others, especially prototyping
		// persist(

		(set) => ({
			// We keep the NextJS router in state because it's undefined in most components
			router: null,
			movement: [0, 0, 0],
			setRouter: (router) =>
				set((state) => ({
					...state,
					router,
				})),
			setMovement: (movement) =>
				set((state) => ({
					...state,
					movement,
				})),
			pressedKeys: [],
			setPressedKeys: (pressedKeys) =>
				set((state) => ({
					...state,
					pressedKeys,
				})),
			player: null,
			setPlayer: (player) =>
				set((state) => ({
					...state,
					player,
				})),

			// Add any default values for app-wide state here
			// e.g. game start logic, points/score, etc
			// gameStarted: true,
			// points: 100,
		})

		// END: Optional persist
		// )
	)
);

export default useStore;
