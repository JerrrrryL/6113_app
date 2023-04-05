/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.12.2.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as addRow from "../addRow";
import type * as deleteRow from "../deleteRow";
import type * as getData from "../getData";
import type * as listMessages from "../listMessages";
import type * as sampleDataset from "../sampleDataset";
import type * as sendMessage from "../sendMessage";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  addRow: typeof addRow;
  deleteRow: typeof deleteRow;
  getData: typeof getData;
  listMessages: typeof listMessages;
  sampleDataset: typeof sampleDataset;
  sendMessage: typeof sendMessage;
}>;
