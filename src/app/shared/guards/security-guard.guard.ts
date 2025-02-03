import { CanActivateFn } from '@angular/router';

export const SecurityGuard: CanActivateFn = (route, state) => {
  return true;
};
