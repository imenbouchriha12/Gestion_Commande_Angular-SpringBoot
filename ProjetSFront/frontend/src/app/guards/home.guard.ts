import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { Router } from '@angular/router';

export const HomeGuard: CanActivateFn = (route, state) => {
  // Inject the necessary services
  const jwtDecoderService = inject(JwtDecoderService);
  const router = inject(Router);

  const token = window.localStorage.getItem('access_token');
  if (token == null) {
    return true; // Allow access if no token exists
  }

  // Decode the token
  const decodedToken = jwtDecoderService.decodeToken(token);

  // Redirect to different pages based on the role
  if (decodedToken.roles.includes("ROLE_ADMIN")) {
    router.navigate(['/ProductsAdmin']); // Navigate to the admin page
    return false; // Prevent the current navigation
  } else {
    router.navigate(['/ProductsClient']); // Navigate to the client page
    return false; // Prevent the current navigation
  }
};
