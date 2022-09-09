const Dom = ({ children }) => {
	return (
		<div
			style={{
				position: 'absolute',
				width: '100%',
				height: '100vh',
				top: 0,
				left: 0,
				zIndex: 10,
				overflow: 'hidden',
			}}
		>
			{children}
		</div>
	);
};

export default Dom;
