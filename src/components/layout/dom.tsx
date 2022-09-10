const Dom = ({ children }) => {
	return (
		<div className="absolute left-0 top-0 z-10 h-[100vh] w-[100%] overflow-hidden">
			{children}
		</div>
	);
};

export default Dom;
