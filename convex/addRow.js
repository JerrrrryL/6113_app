import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { a, b, c }) => {
	const tup = {
		A: a,
		B: b,
		C: c,
	};
	const res = await db.insert("simple", tup);
	return res;
});
