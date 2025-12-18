-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Dec 18, 2025 at 04:20 PM
-- Server version: 11.8.5-MariaDB-ubu2404
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carwash`
--
CREATE DATABASE IF NOT EXISTS `carwash` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;
USE `carwash`;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `filename` varchar(255) NOT NULL DEFAULT 'unknown',
  `mimetype` varchar(255) NOT NULL DEFAULT 'image/jpeg',
  `size` int(11) NOT NULL DEFAULT 0,
  `data` longblob NOT NULL,
  `task_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
--

CREATE TABLE `measurements` (
  `id` int(11) NOT NULL,
  `measurement_name` varchar(255) NOT NULL,
  `measurement_symbol` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `measurement_name`, `measurement_symbol`, `createdAt`, `updatedAt`) VALUES
(1, 'Liter', 'L', '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(2, 'Milliliter', 'ml', '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(3, 'Kilogram', 'Kg', '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(4, 'Gram', 'g', '2025-12-08 13:22:11', '2025-12-08 13:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `measurement_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `is_deleted`, `measurement_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Shampoo', 0, 1, 1, '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(2, 'Detergent', 0, 1, 1, '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(3, 'Window Cleaner', 0, 2, 1, '2025-12-08 13:22:11', '2025-12-08 13:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `is_admin`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 1, '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(2, 'Staff', 0, '2025-12-08 13:22:11', '2025-12-08 13:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20251027130830-create-role.js'),
('20251027131000-create-user.js'),
('20251027131032-create-image.js'),
('20251027131130-create-station.js'),
('20251027131213-create-measurement.js'),
('20251027131307-create-product.js'),
('20251113110418-modify-images-table-for-blob-storage.js'),
('20251114100117-create-task.js'),
('20251117210404-add-cleaning-of-forecourt-to-stations.js'),
('20251123104920-create-task-product.js'),
('20251124125603-add-task-id-column-in-image-model.js'),
('20251124212920-add-amount-column-to-task-product.js'),
('20251202091813-update-user-passwords.js');

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cleaning_of_forecourt` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`id`, `name`, `email`, `address`, `phone`, `user_id`, `createdAt`, `updatedAt`, `cleaning_of_forecourt`) VALUES
(1, 'Circle K', 'circle@k.com', 'Main St 1, 1000 City', '12345678', 2, '2025-12-08 13:22:11', '2025-12-08 13:22:11', 0),
(2, '7-Elevelen', '7@elevelen.com', 'Main St 12, 1700 City', '71171171', 3, '2025-12-08 13:22:11', '2025-12-08 13:22:11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `completed_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `stations_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `link_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_products`
--

CREATE TABLE `task_products` (
  `task_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Peter Parker', 'spidey@man.com', '$2b$10$vHXTtgdx2t/oteID4bGKE.1aje460bhwmRsxf5taU02TyC8nIb3p2', 1, '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(2, 'Gwen Stacy', 'gwen@stacy.com', 'password456', 2, '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(3, 'Norman Osborn', 'norman@osborn.com', 'password789', 2, '2025-12-08 13:22:11', '2025-12-08 13:22:11'),
(4, 'test', 'test@test.test', '$2b$10$PwPWyfcci8TyoZ8gbySQ3OMsoG4XmkIpWmSVZW0nlutEv4DIlYW7e', 2, '2025-12-08 13:59:21', '2025-12-08 13:59:21'),
(5, 'admin admin', 'admin@admin.com', '$2b$10$L7R9c5.HRSG3QJXBGyeKwerlo0Z2tcWc0xZ0GRVrlgyTZ2hWM7P5i', 1, '2025-12-08 14:13:03', '2025-12-08 14:13:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `images_task_id_foreign_idx` (`task_id`);

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `measurement_id` (`measurement_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `link_key` (`link_key`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `stations_id` (`stations_id`);

--
-- Indexes for table `task_products`
--
ALTER TABLE `task_products`
  ADD PRIMARY KEY (`task_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `images_task_id_foreign_idx` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`measurement_id`) REFERENCES `measurements` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `stations`
--
ALTER TABLE `stations`
  ADD CONSTRAINT `stations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`stations_id`) REFERENCES `stations` (`id`);

--
-- Constraints for table `task_products`
--
ALTER TABLE `task_products`
  ADD CONSTRAINT `task_products_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `task_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
--
-- Database: `playground`
--
CREATE DATABASE IF NOT EXISTS `playground` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;
USE `playground`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
