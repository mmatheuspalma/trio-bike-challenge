import { Bike } from '@/usecases/datatypes/bike';
import { BikeRepository } from '@/usecases/ports/bike-repository';
import prismaClient from '@/external/repository/prisma/prisma-client';
import { RENT_BIKE_PRICING_FEE } from './prisma-bike-rent-repository';

export class PrismaBikeRepository implements BikeRepository {
  async list(candidateId: number): Promise<Bike[]> {
    const bikes = await prismaClient.bike.findMany({
      where: {
        candidateId,
      },
    });
    const bikesWithImageUrls: Bike[] = [];
    for (const bike of bikes) {
      const imageUrlRecords = await prismaClient.imageUrl.findMany({
        where: {
          bikeId: bike.id,
        },
      });
      const imageUrls = imageUrlRecords.map((imageUrlRecord) => imageUrlRecord.url);
      bikesWithImageUrls.push({ ...bike, imageUrls });
    }
    return bikesWithImageUrls;
  }

  async listAvailable(candidateId: number): Promise<Bike[]> {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const openRents = await prismaClient.bikeRent.findMany({
      where: {
        dateFrom: {
          lte: today,
        },
        dateTo: {
          gte: today,
        }
      },
    });

    const allBikes = await this.list(candidateId);

    const availableBikes: Bike[] = [];
    allBikes.forEach((bike) => {
      const bikeIsAvailable = !openRents.some((rent) => rent.bikeId === bike.id);
      if (bikeIsAvailable) availableBikes.push(bike);
    });

    return availableBikes.map((bike) => {
      const rentDays = 1;
      const rentAmount = rentDays * bike.rate;
      const rentFee = rentAmount * RENT_BIKE_PRICING_FEE;
      const rentTotalAmount = rentAmount + rentFee;

      return {
        ...bike,
        baseRentAmount: {
          fee: rentFee,
          rentAmount,
          totalAmount: rentTotalAmount,
        },
      }
    });
  }

  async add(bike: Bike): Promise<Bike> {
    const { candidateId, ...bikeData } = bike;
    const bikeImageUrls = bike.imageUrls;
    const createdBike = await prismaClient.bike.create({
      data: {
        ...bikeData,
        candidate: {
          connect: {
            id: bike.candidateId,
          },
        },
        imageUrls: {
          create: bikeImageUrls.map((imageUrl) => ({ url: imageUrl })),
        },
      },
    });
    return { ...createdBike, imageUrls: bikeImageUrls };
  }

  async findById(id: number, candidateId: number): Promise<any> {
    return await prismaClient.bike.findFirst({
      where: {
        id,
        candidateId,
      },
    });
  }
}
