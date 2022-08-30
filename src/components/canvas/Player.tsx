import { Triplet, useBox } from '@react-three/cannon';
import type { Mesh } from 'three';
import { useStore } from '@/misc/store';
import { useEffect, useRef } from 'react';
import { GameObjects } from '@/misc/enums';

const Player = () => {
	const initialPosition: Triplet = [0, 1, 0];
	const [ref, api] = useBox<Mesh>(() => ({
		mass: 1,
		position: initialPosition,
		args: [1, 1, 1],
		onCollide: (e) => {
			console.log('col', e.body);

			if (e.body.userData?.type === GameObjects.GHOST) {
				console.log('I lost');
			}
		},
		userData: {
			type: GameObjects.HUMAN,
		},
	}));
	const updatePlayer = useStore((state) => state.updatePlayer);
	const pos = useRef<Triplet | null>(initialPosition);

	useEffect(() => {
		if (ref.current) {
			updatePlayer({
				obj: [ref, api],
			});
		}
	}, [ref, api, updatePlayer]);

	useEffect(() => {
		api.position.subscribe((v) => {
			if (v != pos.current) {
				pos.current = v;
				updatePlayer({
					position: pos.current,
				});
			}
		});
	}, [api.position, updatePlayer]);

	return (
		<>
			<mesh ref={ref} receiveShadow>
				<meshStandardMaterial color="blue" />
				<boxGeometry args={[1, 1, 1]} />
			</mesh>
		</>
	);
};

export default Player;
