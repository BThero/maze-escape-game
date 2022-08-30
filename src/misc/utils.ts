import { Triplet } from '@react-three/cannon';

export const extractVectorComponents = (vec: {
	direction: number;
	magnitude: number;
}): Triplet => {
	const { direction, magnitude } = vec;
	return [magnitude * Math.cos(direction), 0, magnitude * Math.sin(direction)];
};

export const addTriplets = (a: Triplet, b: Triplet): Triplet => {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};
