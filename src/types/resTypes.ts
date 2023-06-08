

export interface RegisterRes {
    firstName: string
    lastName: string
    email: string
    token: string
    _id: string,
	avatar: string
}

export interface AuthMeRes {
    firstName: string
    lastName: string
    email: string
    _id: string,
	avatar: string
}
// ---------------------------------------------

export interface UserRes {
    _id: string
	firstName: string
	lastName: string
	email: string, 
	avatar: string
}

export interface PostsRes {
    _id:string
	text: string
	image: string
	user: UserRes
	comments: Array<string>
	createdAt: string
	updatedAt: string
	__v: number
}

export interface GetProfileRes {
    posts: PostsRes[],
	_id: string
	firstName: string
	lastName: string
	email: string
	avatar: string 
}


export interface CreatePostRes {
    text: string
	image: string
    user: string
	_id: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface PostCommentsRes {
	_id: string
	text: string
	user: UserRes
}

export interface Message {
	chat: {
		_id:string
		latestMessage: string
		users: UserRes[]
	}
	content: string
	sender: UserRes
	_id: string
}

export interface MessageShort {
	chat: {
		_id:string
		latestMessage: string
		users: string[]
	}
	content: string
	sender: UserRes
	_id: string
}

export interface DialogsRes {
	_id: string
	users: UserRes[]
	latestMessage: {
		chat: string
		content: string
		sender: UserRes
		_id: string
	}
}