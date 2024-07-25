import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";


export const CanActivate = () => {

    const router = inject(Router);
    const authserv = inject(AuthService)
    const isAuthenticated = authserv.isAuthenticatedUser();
    if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
    }

    return true;
}