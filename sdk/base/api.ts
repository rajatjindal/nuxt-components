import { myfetch } from './myfetch'
import  type { PagesMeta, Entity } from './types'
import EventBus from '@/sdk/base/eventbus'

export interface apiOptions {
	redirect?: boolean;
	message?: boolean;
	reload?: boolean;
}

export const defaultOptions = function (): apiOptions {
	return {
		redirect: true,
		message: true,
		reload: true
	}
}

export interface IBaseAPI {
	slug(): string

	create<T extends Entity>(input: T, opts: apiOptions): Promise<T>
	get<T>(id: string): Promise<T>
	update<T extends Entity>(id: string, input: T, opts: apiOptions): Promise<T>
	delete(id: string, opts: apiOptions): Promise<void>
	export(filter: any): Promise<Blob>
	getAllItemsWithFilter<T>(filter: any): Promise<T>;
	getAllItemsWithFilterMeta(filter: any): Promise<PagesMeta>;
}

export const userinfo = async function(): Promise<void> {
	const path = `/userinfo`
	await myfetch(path)
}

export class BaseAPI implements IBaseAPI {
	slug(): string {
		return "slug"
	}

	async create<T extends Entity>(input: T, opts: apiOptions = defaultOptions()): Promise<T> {
		const path = `/${this.slug()}`
		const res = await myfetch(path, {
			method: 'POST',
			body: input,
		});

		if (opts.message) {
			EventBus.emit('success', `Created ${capitalCase(this.slug())} successfully`)
		}
		
		if (opts.redirect) {
			EventBus.emit('redirect', `/${this.slug()}`)
		}
		
		return res
	}

	async update<T extends Entity>(id: string, input: T, opts: apiOptions = defaultOptions()): Promise<T> {
		const path = "/" + this.slug() + "/" + id
		const res = await myfetch(path, {
			method: 'PUT',
			body: input,
		});

		if (opts.message) {
			EventBus.emit('success', `Updated ${capitalCase(this.slug())} successfully`)
		}
		
		if (opts.redirect) {
			EventBus.emit('redirect', `/${this.slug()}`)
		}
		
		return res
	}

	async delete(id: string, opts: apiOptions = defaultOptions()): Promise<void> {
		const path = `/${this.slug()}/${id}`
		const res = await myfetch(path, {
			method: 'DELETE',
		});

		if (opts.message) {
			EventBus.emit('success', `Deleted ${capitalCase(this.slug())} successfully`)
		}
		
		if (opts.redirect) {
			EventBus.emit('redirect', `/${this.slug()}`)
		}

		return res
	}

	async get<T>(id: string): Promise<T> {
		const path = `/${this.slug()}/${id}`
		return await myfetch(path, {
			method: 'GET',
		});
	}

	async export(filter: any): Promise<Blob> {
		console.log("this is ", typeof this)
		const path = `/${this.slug()}/export`
		return await myfetch(path, {
			method: 'POST',
			body: filter,
		});
	}

	async getAllItemsWithFilter<T>(filter: any): Promise<T> {
		const path = `/${this.slug()}/filter`
		const res = await myfetch(path, {
			method: 'POST',
			body: filter,
		});

		return res
	}

	async getAllItemsWithFilterMeta(filter: any): Promise<PagesMeta> {
		const path = `/meta/${this.slug()}/filter`
		return await myfetch(path, {
			method: 'POST',
			body: filter,
		});
	}
}

export const confirmAndExecute = async function(msg: string, action: () => Promise<void>) {
	if (confirm(msg)) {
		await action()
	}
}

const capitalCase = function(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}