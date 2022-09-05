import { CollideEvent, Triplet, useBox } from '@react-three/cannon';
import type { Mesh } from 'three';
import { useStore } from '@/misc/store';
import { useEffect, useRef } from 'react';
import { GameEvent, GameObjects } from '@/misc/enums';

const Player = () => {
	const send = useStore((state) => state.send);
	const initialPosition: Triplet = [0, 1, 0];
	const [ref, api] = useBox<Mesh>(() => ({
		mass: 1,
		position: initialPosition,
		args: [1, 1, 1],
		onCollide: handleCollide,
		userData: {
			type: GameObjects.HUMAN,
		},
	}));
	const updatePlayer = useStore((state) => state.updatePlayer);
	const pos = useRef<Triplet>(initialPosition);
	const handleCollide = (e: CollideEvent) => {
		if (e.body?.userData?.type === GameObjects.GHOST) {
			send(GameEvent.LOST);
		}

		if (e.body?.userData?.type === GameObjects.EXIT) {
			send(GameEvent.WON);
		}
	};

	useEffect(() => {
		if (ref.current) {
			updatePlayer({
				obj: [ref, api],
			});
		}
	}, [ref, api, updatePlayer]);

	useEffect(() => {
		const unsubscribe = api.position.subscribe((v) => {
			if (v != pos.current) {
				pos.current = v;
				updatePlayer({
					position: pos.current,
				});
			}
		});
		return unsubscribe;
	});

	return (
		<>
			<mesh ref={ref} receiveShadow>
				<meshStandardMaterial
					color="blue"
					emissive="white"
					emissiveIntensity={0.2}
				/>
				<boxGeometry args={[1, 1, 1]} />
			</mesh>
		</>
	);
};

export default Player;
