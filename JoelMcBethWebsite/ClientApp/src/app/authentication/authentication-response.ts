import { AuthenticationResult } from "./authentication-result";

export interface AuthenticationResponse {
    result: AuthenticationResult;
    token: string;
}
