import { GameObjects } from '@/misc/enums';
import useMapStore from '@/misc/mapStore';
import Exit from './Exit';
import Obstacle from './Obstacle';

const Map = () => {
	const objects = useMapStore((store) => store.objects);

	return (
		<>
			{objects.map(({ x, y, type }, idx) => {
				if (type === GameObjects.EXIT) {
					return <Exit key={idx} position={[x, 0, y]} />;
				} else {
					return <Obstacle key={idx} position={[x, 0, y]} type={type} />;
				}
			})}
		</>
	);
};

export default Map;
