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

const BotControls = () => {
	const player = useStore((state) => state.player);
	const isFlashlightOn = useStore((state) => state.isFlashlightOn);
	const ghost = useStore((state) => state.ghost);
	const updateGhost = useStore((state) => state.updateGhost);

	useFrame(() => {
		const [ref, api] = ghost.obj;
		const newState = produce(ghost, (ghost) => {
			if (isFlashlightOn) {
				const diffX = player.position[0] - ghost.position[0];
				const diffY = player.position[2] - ghost.position[2];
				let targetDirection: number;

				if (Math.abs(diffY) < 1e-3) {
					targetDirection = Math.PI / 2;
				} else {
					targetDirection = Math.atan2(diffY, diffX);
				}

				if (ghost.velocity.direction > targetDirection) {
					ghost.velocity.direction = Math.max(
						targetDirection,
						ghost.velocity.direction - ANGLE_DELTA
					);
				} else {
					ghost.velocity.direction = Math.min(
						targetDirection,
						ghost.velocity.direction + ANGLE_DELTA
					);
				}

				ghost.velocity.magnitude = Math.min(
					SPEED_CAP,
					ghost.velocity.magnitude + ACCELERATION
				);
			} else {
				ghost.velocity.magnitude = Math.max(
					0,
					ghost.velocity.magnitude - DECELERATION
				);
			}
		});

		const components = extractVectorComponents(newState.velocity);
		ref.current.rotation.y = -newState.velocity.direction + Math.PI / 2;
		api.velocity.set(...components);
		updateGhost(newState);
	});

	return null;
};

export default BotControls;
