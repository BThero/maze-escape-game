import { useRef } from 'react';

const Dom = ({ children }) => {
	const ref = useRef(null);

	return (
		<div
			className="dom"
			style={{
				position: 'absolute',
				width: '100%',
				height: '100vh',
				top: 0,
				left: 0,
				zIndex: 10,
				overflow: 'hidden',
			}}
			ref={ref}
		>
			{children}
		</div>
	);
};

export default Dom;
