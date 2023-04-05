import { query } from "./_generated/server";

export default query(async ({ db }) => {
	const males = await db.query("simple").collect();
	return males;
});
