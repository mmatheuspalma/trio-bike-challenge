import { Express, Router } from 'express';
import { makeListBikesController } from '@/main/factories/make-list-bikes-controller';
import { makeListAvailableBikesController } from '@/main/factories/make-list-available-bikes-controller';
import { adaptRoute } from '@/main/adapters/express-route-adapter';
import { makeListUsersController } from '@/main/factories/make-list-users-controller';
import { makeCreateUserController } from '@/main/factories/make-create-user-controller';
import { makeCreateCandidateController } from '@/main/factories/make-create-candidate-controller';
import { makeBikeRentController } from '@/main/factories/make-bike-rent-controller';
import { makeBikeRentAmountController } from '@/main/factories/make-bike-rent-amount-controller';
import { makeListRentByBikeController } from '@/main/factories/make-list-rent-by-bike-controller';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  createListBikesRoute(router);
  createListAvailableBikesRoute(router);
  createListUsersRoute(router);
  createRentBikeRoute(router);
  createAmountRentBikeRoute(router);
  createListRentByBikeRoute(router);
  createCreateUserRoute(router);
  createCreateCandidateRoute(router);
}

function createListBikesRoute(router: Router) {
  router.get('/bikes', adaptRoute(makeListBikesController()));
}

function createListAvailableBikesRoute(router: Router) {
  router.get('/bikes/available', adaptRoute(makeListAvailableBikesController()));
}

function createRentBikeRoute(router: Router) {
  router.post('/bikes/rent', adaptRoute(makeBikeRentController()));
}

function createAmountRentBikeRoute(router: Router) {
  router.post('/bikes/rent/amount', adaptRoute(makeBikeRentAmountController()));
}

function createListRentByBikeRoute(router: Router) {
  router.get('/rents/bike/:bikeId', adaptRoute(makeListRentByBikeController()));
}

function createListUsersRoute(router: Router) {
  router.get('/users', adaptRoute(makeListUsersController()));
}

function createCreateUserRoute(router: Router) {
  router.post('/users', adaptRoute(makeCreateUserController()));
}

function createCreateCandidateRoute(router: Router) {
  router.post('/candidates', adaptRoute(makeCreateCandidateController()));
}
