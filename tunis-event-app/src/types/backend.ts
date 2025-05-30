export type BackendRole = "SUPERADMIN" | "ORGANISATEUR" | "PARTICIPANT";
export type ApiRole = Exclude<BackendRole, "SUPERADMIN">; // → 'ORGANISATEUR' | 'PARTICIPANT'
