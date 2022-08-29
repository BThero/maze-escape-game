import Head from 'next/head';

type HeaderProps = {
	title?: string;
	coverImage?: string;
};

const Header = ({ title, coverImage }: HeaderProps) => {
	return (
		<>
			<Head>
				<title>{title || 'Maze escape game'}</title>
				<meta charSet="utf-8" />
				<meta name="description" content={'Maze escape game'} />
				{coverImage && <meta name="image" content={coverImage} />}
			</Head>
		</>
	);
};

export default Header;
