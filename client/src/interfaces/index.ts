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
