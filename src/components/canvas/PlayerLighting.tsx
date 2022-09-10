import useStore from '@/misc/store';
import SceneLight from './SceneLight';

/** This component will cast light on the main player */
const PlayerLighting = () => {
	const player = useStore((state) => state.player);
	// const ghost = useStore((state) => state.ghost);

	return (
		<>
			<SceneLight target={player.obj} color="white" />
			{/* <SceneLight target={ghost.obj} color="white" /> */}
		</>
	);
};

export default PlayerLighting;
