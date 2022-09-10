import { PublicApi } from '@react-three/cannon';
import { RefObject, useEffect, useRef } from 'react';
import type { Color, Group } from 'three';

type SceneLightProps = {
	target: [RefObject<Group>, PublicApi];
	color?: Color | string;
};

const SceneLight = ({ target, color }: SceneLightProps) => {
	const light = useRef(null);
	const [ref, api] = target;

	useEffect(() => {
		if (api?.position?.subscribe) {
			const unsubscribe = api.position.subscribe((v) => {
				if (light.current) {
					light.current.position.x = v[0];
					light.current.position.z = v[2];
				}
			});
			return unsubscribe;
		}
	}, [api]);

	return (
		<spotLight
			ref={light}
			color={color || 'white'}
			intensity={0.2}
			angle={0.12}
			position={[0, 5, 0]}
			target={ref?.current}
		/>
	);
};

export default SceneLight;
