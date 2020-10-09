import { watch, ref } from "@vue/composition-api";

interface IHistory {
	id			: Number,
	name		: String,
	state		: String,
	timestamp	: String,
}

interface IUserItem {
	id			: Number,
	firstname	: String,
	lastname	: String,
	email		: String,
	name		: String,
}

interface IUser {
	id			: Number,
	firstname	: String,
	lastname	: String,
	name		: String,
	state		: String,
	history		: Array<IHistory>
	items		: Array<IUserItem>,
	active		: Boolean,
}

class User implements IUser {
	public id		: Number;
	public firstname: String;
	public lastname : String;
	public items	: Array <IUserItem>;
	public state	: any;
	public history	: Array<IHistory>;
	public active	: Boolean;

	public constructor( data: IUser ) {
		this.id			= data.id;
		this.firstname	= data.firstname;
		this.lastname	= data.lastname;
		this.state		= ref('common');
		this.history	= [];
		this.items		= [];
		this.active 	= true;

		data.items.forEach((subItem : IUserItem) => {
			this.items.push( <IUserItem> {
				id			: subItem.id,
				firstname	: subItem.firstname,
				lastname	: subItem.lastname,
				email		: subItem.email,
				get name() { return `${this.firstname}${this.lastname}@${this.email}` }
			})
		})

		watch(this.state, (state) => this.onStateChange(state));
	}

	public get name() : String {
		return `${this.firstname} ${this.lastname}`;
	}

	private onStateChange(newState: any) : void {
		const time = new Date(Date.now());
		this.history.push( <IHistory> {
			id			: this.id,
			name		: this.name,
			state		: newState,
			timestamp	: `${time.getHours()}h : ${time.getMinutes()}m : ${time.getSeconds()}s`,
		})
	}
}

export { User, IHistory, IUser, IUserItem }
