/**
 * This file contains all the endpoints for the app
 */

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

//this contains all the endpoints
export const Endpoints = {
  login: `/api/auth/login`,
  analyticsDashboard: `/api/analytic/dashboard-admin`,
  userDetails: `/api/user`,
};
