export class EnvironmentVariableMissing extends Error {
  public constructor(name: string) {
    super(`Environment variable ${name} is missing`);
    Object.setPrototypeOf(this, EnvironmentVariableMissing.prototype);
  }
}
