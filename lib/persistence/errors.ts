export class PersistenceError extends Error {
  readonly code = "PERSISTENCE_ERROR";

  constructor(message = "We could not save this trace. Please try again.", cause?: unknown) {
    super(message, { cause });
    this.name = "PersistenceError";
  }
}
