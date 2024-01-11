import { differenceInDays, setHours, setMinutes, setSeconds } from 'date-fns';

import prismaClient from '@/external/repository/prisma/prisma-client';

import { BikeRentAmount } from '@/usecases/datatypes/bikeRent';
import { BikeRentRepository } from '@/usecases/ports/bike-rent-repository';

export const RENT_BIKE_PRICING_FEE = 0.15;

export class PrismaBikeRentRepository implements BikeRentRepository {
  async rentsByBike(bikeId: number, candidateId: number): Promise<any[]> {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    try {
      const bikeRents = await prismaClient.bikeRent.findMany({
        where: {
          bikeId,
          candidateId,
          OR: [
            {
              dateFrom: {
                gte: today,
              },
            },
            {
              dateTo: {
                gte: today,
              }
            }
          ],
        },
        select: {
          dateFrom: true,
          dateTo: true,
          rentDays: true,
        },
      });

      return bikeRents;
    } catch (error) {
      return error;
    }
  }

  async list(candidateId: number): Promise<any[]> {
    try {
      const bikeRents = await prismaClient.bikeRent.findMany({
        where: {
          candidateId,
        },
      });

      return bikeRents;
    } catch (error) {
      return error;
    }
  }

  async amount(bikeId: number, dateFrom: string, dateTo: string, candidateId: number): Promise<BikeRentAmount> {
    try {
      const bike = await prismaClient.bike.findFirst({
        where: {
          id: bikeId,
          candidateId: candidateId,
        }
      });

      const rentDays = differenceInDays(dateTo, dateFrom);
      const rentAmount = rentDays * bike.rate;
      const rentFee = rentAmount * RENT_BIKE_PRICING_FEE;
      const rentTotalAmount = rentAmount + rentFee;

      return {
        fee: rentFee,
        rentAmount: rentAmount,
        totalAmount: rentTotalAmount,
        rentDays,
        dateFrom: dateFrom,
        dateTo: dateTo,
      };
    } catch (error) {
      return error;
    }
  }

  async rent(bikeId: number, userId: number, dateFrom: string, dateTo: string, candidateId: number): Promise<any> {
    const bikeRentAmount = await this.amount(bikeId, dateFrom, dateTo, candidateId);

    try {
      const rent = await prismaClient.bikeRent.create({
        data: {
          ...bikeRentAmount,
          dateFrom: setHours(setMinutes(setSeconds(dateFrom, 0), 0), -3),
          dateTo: setHours(setMinutes(setSeconds(dateTo, 0), 0), -3),
          user: {
            connect: {
              id: userId,
            },
          },
          bike: {
            connect: {
              id: bikeId,
            }
          },
          candidate: {
            connect: {
              id: candidateId,
            }
          },
        }
      });
      

      return rent;
    } catch (error) {
      return error;
    }
  }

  async checkAvailability(bikeId: number, dateFrom: string, dateTo: string, candidateId: number): Promise<boolean> {
    try {
      const availability = await prismaClient.bikeRent.findFirstOrThrow({
        where: {
          bikeId,
          candidateId,
          dateFrom: {
            lte: new Date(dateTo),
          },
          dateTo: {
            gte: new Date(dateFrom),
          }
        },
      });

      if (!availability) return Promise.resolve(true);

      return Promise.resolve(false);
    } catch (error) {
      return error;
    }
  }
}
