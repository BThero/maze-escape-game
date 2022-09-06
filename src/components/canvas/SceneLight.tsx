import { PublicApi } from '@react-three/cannon';
import { RefObject, useEffect, useRef } from 'react';
import type { Color, Group } from 'three';

type SceneLightProps = {
	target: [RefObject<Group>, PublicApi];
	color?: Color | string;
};

const SceneLight = ({ target, color }: SceneLightProps) => {
	const ref = useRef(null);

	useEffect(() => {
		const api = target[1];

		if (api) {
			const unsub = api.position.subscribe((v) => {
				if (ref.current) {
					ref.current.position.x = v[0];
					ref.current.position.z = v[2];
				}
			});

			return unsub;
		}
	}, [target]);

	return (
		<spotLight
			ref={ref}
			color={color || 'white'}
			intensity={0.2}
			angle={0.1}
			position={[0, 5, 0]}
			target={target[0]?.current}
		/>
	);
};

export default SceneLight;
