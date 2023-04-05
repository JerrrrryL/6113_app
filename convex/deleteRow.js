import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { id }) => {
	await db.delete(id);
});
