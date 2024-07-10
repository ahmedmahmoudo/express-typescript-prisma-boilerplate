export const getRouteMethod = (methods: {
	post: boolean;
	get: boolean;
	put: boolean;
	delete: boolean;
	patch: boolean;
}) => {
	const keys = Object.keys(methods);

	for (const key of keys) {
		if (methods[key]) {
			return key;
		}
	}
};
