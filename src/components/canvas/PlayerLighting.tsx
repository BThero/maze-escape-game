import useStore from '@/misc/store';
import SceneLight from './SceneLight';

const PlayerLighting = () => {
	const player = useStore((state) => state.player);
	const ghost = useStore((state) => state.ghost);

	return (
		<>
			<SceneLight target={player.obj} color="white" />
			<SceneLight target={ghost.obj} color="white" />
		</>
	);
};

export default PlayerLighting;
