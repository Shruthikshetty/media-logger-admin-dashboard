/**
 * This file contains all the endpoints for the app
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

//this contains all the endpoints
export const Endpoints = {
  login: `${baseUrl}/api/auth/login`,
  analyticsDashboard: `${baseUrl}/api/analytic/dashboard-admin`,
};
