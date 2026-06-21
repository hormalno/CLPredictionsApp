// PredictMate · My Profile · shared types
// ProfileForm / ProfileStats live in the central types folder; re-exported here for local imports.
export type { ProfileForm, ProfileStats } from "../../../types";

export type PasswordPayload = {
    current: string;
    next: string;
};
