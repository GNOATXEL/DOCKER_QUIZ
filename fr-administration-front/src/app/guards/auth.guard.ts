import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenStorageService} from "../../services/token-storage.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
    const service = inject(TokenStorageService)

     if(service.isLogged()) {
           console.log("AuthGard : true");
        return true;
     }

    console.log("AuthGard : false");
    router.navigateByUrl('/login');
    return false;

};
