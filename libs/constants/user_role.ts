export class UserRole {
  private static readonly roles = Object.freeze({
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    COUNSELLOR: "counsellor",
    TRAINER: "trainer",
    STUDENT: "student",
    PARENT: "parent",
    GUEST: "guest",
    SYSTEM: "system",
  });

  static all() {
    return this.roles;
  }
}

export type TUserRole = (typeof UserRole)["all"] extends () => infer R
  ? R extends Record<string, infer V>
    ? V
    : never
  : never;

export default UserRole;
