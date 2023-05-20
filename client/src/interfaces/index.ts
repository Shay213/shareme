export interface Comment {
	id: string
	description: string
	pinId: string
	ownerId: string
}
export interface Pin {
	id: string
	title: string
	about: string
	destination: string
	category: string
	imagePath: string
	ownerId: string
}

export interface User {
	id: string
	userName: string
	imagePath: string
	ownPins: Pin[]
	savedPins: Pin[]
	comments: Comment[]
}

interface FeedPinsUser {
	id: string
	userName: string
	imagePath: string
}

export interface FeedPin {
	id: string
	imagePath: string
	destination: string
	owner: FeedPinsUser
	savedBy: FeedPinsUser[]
}

interface Comments {
	id: string
	description: string
	ownerId: string
	pinId: string
}

export interface DetailsPin extends FeedPin {
	title: string
	about: string
	category: string
	comments: Comments[]
}
