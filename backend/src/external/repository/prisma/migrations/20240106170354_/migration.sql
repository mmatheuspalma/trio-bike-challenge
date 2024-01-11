-- CreateTable
CREATE TABLE `BikeRent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidateId` INTEGER NOT NULL,
    `bikeId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `dateFrom` DATETIME(3) NOT NULL,
    `dateTo` DATETIME(3) NOT NULL,
    `fee` DOUBLE NOT NULL,
    `rentAmount` DOUBLE NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `rentDays` INTEGER NOT NULL,

    UNIQUE INDEX `BikeRent_id_key`(`id`),
    PRIMARY KEY (`id`, `candidateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BikeRent` ADD CONSTRAINT `BikeRent_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BikeRent` ADD CONSTRAINT `BikeRent_bikeId_fkey` FOREIGN KEY (`bikeId`) REFERENCES `Bike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BikeRent` ADD CONSTRAINT `BikeRent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
