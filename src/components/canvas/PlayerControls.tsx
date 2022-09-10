import {
	ACCELERATION,
	ANGLE_DELTA,
	DECELERATION,
	SPEED_CAP,
} from '@/misc/constants';
import useStore from '@/misc/store';
import { extractVectorComponents } from '@/misc/utils';
import { useFrame } from '@react-three/fiber';
import produce from 'immer';
import { useEffect } from 'react';

const PlayerControls = () => {
	const pressedKeys = useStore((state) => state.pressedKeys);
	const addKey = useStore((state) => state.addKey);
	const removeKey = useStore((state) => state.removeKey);

	const player = useStore((state) => state.player);
	const updatePlayer = useStore((state) => state.updatePlayer);

	const toggleFlashlight = useStore((store) => store.toggleFlashlight);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === ' ') {
				toggleFlashlight();
			} else {
				addKey(e.key);
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === ' ') {
				// ignore
			} else {
				removeKey(e.key);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [addKey, removeKey, toggleFlashlight]);

	useFrame(() => {
		const [ref, api] = player.obj;
		const newState = produce(player, (player) => {
			if (pressedKeys.includes('ArrowUp')) {
				player.velocity.magnitude = Math.min(
					SPEED_CAP,
					player.velocity.magnitude + ACCELERATION
				);
			} else {
				player.velocity.magnitude = Math.max(
					0,
					player.velocity.magnitude - DECELERATION
				);
			}

			if (pressedKeys.includes('ArrowLeft')) {
				player.velocity.direction += ANGLE_DELTA;
			}

			if (pressedKeys.includes('ArrowRight')) {
				player.velocity.direction -= ANGLE_DELTA;
			}
		});
		const components = extractVectorComponents(newState.velocity);
		ref.current.rotation.y = -newState.velocity.direction - Math.PI / 2;
		api.velocity.set(...components);
		updatePlayer(newState);
	});

	return null;
};

export default PlayerControls;
