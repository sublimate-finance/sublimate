export function wait<T>(numSeconds: number, v: T): Promise<T> {
	return new Promise(function (resolve) {
		setTimeout(resolve.bind(null, v), numSeconds * 1000)
	})
}

export const resolveENS = async (ens: string) => {
	return ens // TODO: resolve ens name to pass in subscribe()
}