import authRoutes from './auth.js';
import usersRoutes from './users.js';
import usersAuth from './usersAuth.js';
import roomsRoutes from './rooms.js';
import hotelsRoutes from './hotels.js';
import reservationsRoutes from './reservations.js';

export default [
  usersRoutes,
  authRoutes,
  roomsRoutes,
  hotelsRoutes,
  reservationsRoutes,
  usersAuth,
];
