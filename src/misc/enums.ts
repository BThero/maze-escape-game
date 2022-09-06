export enum GameObjects {
	EXIT,
	HORIZONTAL_WALL,
	VERTICAL_WALL,
	HUMAN,
	GHOST,
	FLASHLIGHT,
	GROUND,
}

export enum GameState {
	MENU,
	RUNNING,
	WON,
	LOST,
}

export enum GameEvent {
	START,
	LOST,
	WON,
}
