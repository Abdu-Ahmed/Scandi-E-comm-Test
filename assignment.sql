-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2025 at 04:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `__typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `product_id`, `name`, `type`, `__typename`) VALUES
('Capacity', 'ps-5', 'Capacity', 'text', 'AttributeSet'),
('Color', 'ps-5', 'Color', 'swatch', 'AttributeSet'),
('iphone_capacity_attr', 'apple-iphone-12-pro', 'Capacity', 'text', 'AttributeSet'),
('iphone_color_attr', 'apple-iphone-12-pro', 'Color', 'swatch', 'AttributeSet'),
('Size', 'huarache-x-stussy-le', 'Size', 'text', 'AttributeSet'),
('Touch ID in keyboard', 'apple-imac-2021', 'Touch ID in keyboard', 'text', 'AttributeSet'),
('With USB 3 ports', 'apple-imac-2021', 'With USB 3 ports', 'text', 'AttributeSet');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_items`
--

CREATE TABLE `attribute_items` (
  `id` varchar(255) NOT NULL,
  `attribute_id` varchar(255) NOT NULL,
  `displayValue` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `__typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attribute_items`
--

INSERT INTO `attribute_items` (`id`, `attribute_id`, `displayValue`, `value`, `__typename`) VALUES
('1T', 'Capacity', '1T', '1T', 'Attribute'),
('256GB', 'Capacity', '256GB', '256GB', 'Attribute'),
('40', 'Size', '40', '40', 'Attribute'),
('41', 'Size', '41', '41', 'Attribute'),
('42', 'Size', '42', '42', 'Attribute'),
('43', 'Size', '43', '43', 'Attribute'),
('512G', 'Capacity', '512G', '512G', 'Attribute'),
('512GB', 'Capacity', '512GB', '512GB', 'Attribute'),
('Black', 'Color', 'Black', '#000000', 'Attribute'),
('Blue', 'Color', 'Blue', '#030BFF', 'Attribute'),
('Cyan', 'Color', 'Cyan', '#03FFF7', 'Attribute'),
('Extra Large', 'Size', 'Extra Large', 'XL', 'Attribute'),
('Green', 'Color', 'Green', '#44FF03', 'Attribute'),
('imac_touchid_no', 'Touch ID in keyboard', 'No', 'No', 'Attribute'),
('imac_touchid_yes', 'Touch ID in keyboard', 'Yes', 'Yes', 'Attribute'),
('iphone_1t', 'iphone_capacity_attr', '1T', '1T', 'Attribute'),
('iphone_256g', 'iphone_capacity_attr', '256G', '256G', 'Attribute'),
('iphone_512g', 'iphone_capacity_attr', '512G', '512G', 'Attribute'),
('iphone_black', 'iphone_color_attr', 'Black', '#000000', 'Attribute'),
('iphone_green', 'iphone_color_attr', 'Green', '#44FF03', 'Attribute'),
('iphone_white', 'iphone_color_attr', 'White', '#FFFFFF', 'Attribute'),
('Large', 'Size', 'Large', 'L', 'Attribute'),
('Medium', 'Size', 'Medium', 'M', 'Attribute'),
('No', 'With USB 3 ports', 'No', 'No', 'Attribute'),
('Small', 'Size', 'Small', 'S', 'Attribute'),
('White', 'Color', 'White', '#FFFFFF', 'Attribute'),
('Yes', 'With USB 3 ports', 'Yes', 'Yes', 'Attribute');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `__typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `__typename`) VALUES
(1, 'all', 'Category'),
(2, 'clothes', 'Category'),
(3, 'tech', 'Category');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`attributes`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `quantity`, `attributes`, `created_at`) VALUES
(1, 'apple-imac-2021', 1, '[\"No\"]', '2025-02-26 17:36:56'),
(2, 'ps-5', 1, '[]', '2025-02-28 11:59:23'),
(3, 'ps-5', 1, '[]', '2025-02-28 11:59:24'),
(4, 'ps-5', 1, '[]', '2025-02-28 11:59:25'),
(5, 'ps-5', 1, '[]', '2025-02-28 11:59:25'),
(6, 'ps-5', 1, '[]', '2025-02-28 12:02:05'),
(7, 'ps-5', 1, '[]', '2025-02-28 12:02:06'),
(8, 'ps-5', 1, '[]', '2025-02-28 12:02:06'),
(9, 'ps-5', 1, '[]', '2025-02-28 12:02:07'),
(10, 'ps-5', 1, '[]', '2025-02-28 12:02:07'),
(11, 'ps-5', 1, '[]', '2025-02-28 12:05:27'),
(12, 'ps-5', 1, '[]', '2025-02-28 12:05:27'),
(13, 'ps-5', 1, '[]', '2025-02-28 12:05:49'),
(14, 'apple-airtag', 1, '[]', '2025-03-01 18:52:43'),
(15, 'apple-airtag', 1, '[]', '2025-03-01 18:52:47'),
(16, 'apple-airtag', 1, '[]', '2025-03-01 18:57:53'),
(17, 'apple-airtag', 1, '[]', '2025-03-01 18:57:59'),
(18, 'apple-airtag', 1, '[]', '2025-03-01 19:00:02'),
(19, 'apple-airtag', 1, '[]', '2025-03-01 19:00:09'),
(20, 'apple-airtag', 1, '[]', '2025-03-01 19:04:41'),
(21, 'apple-airtag', 1, '[]', '2025-03-01 19:06:38'),
(22, 'apple-airtag', 1, '[]', '2025-03-01 19:07:26'),
(23, 'apple-airtag', 1, '[]', '2025-03-01 19:08:01'),
(24, 'apple-airtag', 1, '[]', '2025-03-01 19:08:14'),
(25, 'apple-airtag', 1, '[]', '2025-03-01 19:08:45'),
(26, 'apple-iphone-12-pro', 1, '[{\"name\":\"Capacity\",\"value\":\"256G\"},{\"name\":\"Color\",\"value\":\"#FFFFFF\"}]', '2025-03-02 09:08:46'),
(27, 'apple-iphone-12-pro', 1, '[{\"name\":\"Capacity\",\"value\":\"256G\"},{\"name\":\"Color\",\"value\":\"#44FF03\"}]', '2025-03-02 09:08:52'),
(28, 'ps-5', 1, '[]', '2025-03-02 10:50:20');

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency_label` varchar(255) NOT NULL,
  `currency_symbol` varchar(255) NOT NULL,
  `__typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `product_id`, `amount`, `currency_label`, `currency_symbol`, `__typename`) VALUES
(1, 'huarache-x-stussy-le', 144.69, 'USD', '$', 'Price'),
(2, 'jacket-canada-goosee', 518.47, 'USD', '$', 'Price'),
(3, 'ps-5', 844.02, 'USD', '$', 'Price'),
(4, 'xbox-series-s', 333.99, 'USD', '$', 'Price'),
(5, 'apple-imac-2021', 1688.03, 'USD', '$', 'Price'),
(6, 'apple-iphone-12-pro', 1000.76, 'USD', '$', 'Price'),
(7, 'apple-airpods-pro', 300.23, 'USD', '$', 'Price'),
(8, 'apple-airtag', 120.57, 'USD', '$', 'Price');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`gallery`)),
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `__typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `inStock`, `gallery`, `description`, `category`, `brand`, `__typename`) VALUES
('apple-airpods-pro', 'AirPods Pro', 0, '[\"https:\\/\\/store.storeimages.cdn-apple.com\\/4982\\/as-images.apple.com\\/is\\/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000\"]', '\n<h3>Magic like you’ve never heard</h3>\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.\n\n<h3>Active Noise Cancellation</h3>\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.\n\n<h3>Transparency mode</h3>\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>\n\n<h3>All-new design</h3>\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\n\n<h3>Amazing audio quality</h3>\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\n\n<h3>Even more magical</h3>\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>\n', 'tech', 'Apple', 'Product'),
('apple-airtag', 'AirTag', 1, '[\"https:\\/\\/store.storeimages.cdn-apple.com\\/4982\\/as-images.apple.com\\/is\\/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000\"]', '\n<h1>Lose your knack for losing things.</h1>\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\n', 'tech', 'Apple', 'Product'),
('apple-imac-2021', 'iMac 2021', 1, '[\"https:\\/\\/store.storeimages.cdn-apple.com\\/4982\\/as-images.apple.com\\/is\\/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000\"]', 'The new iMac!', 'tech', 'Apple', 'Product'),
('apple-iphone-12-pro', 'iPhone 12 Pro', 1, '[\"https:\\/\\/store.storeimages.cdn-apple.com\\/4982\\/as-images.apple.com\\/is\\/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000\"]', 'This is iPhone 12. Nothing else to say.', 'tech', 'Apple', 'Product'),
('huarache-x-stussy-le', 'Nike Air Huarache Le', 1, '[\"https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0087\\/6193\\/3920\\/products\\/DD1381200_DEOA_2_720x.jpg?v=1612816087\",\"https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0087\\/6193\\/3920\\/products\\/DD1381200_DEOA_1_720x.jpg?v=1612816087\",\"https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0087\\/6193\\/3920\\/products\\/DD1381200_DEOA_3_720x.jpg?v=1612816087\",\"https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0087\\/6193\\/3920\\/products\\/DD1381200_DEOA_5_720x.jpg?v=1612816087\",\"https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0087\\/6193\\/3920\\/products\\/DD1381200_DEOA_4_720x.jpg?v=1612816087\"]', '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy', 'Product'),
('jacket-canada-goosee', 'Jacket', 1, '[\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_480,c_scale,f_auto,q_auto:best\\/v1576016105\\/product-image\\/2409L_61.jpg\",\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_480,c_scale,f_auto,q_auto:best\\/v1576016107\\/product-image\\/2409L_61_a.jpg\",\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_480,c_scale,f_auto,q_auto:best\\/v1576016108\\/product-image\\/2409L_61_b.jpg\",\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_480,c_scale,f_auto,q_auto:best\\/v1576016109\\/product-image\\/2409L_61_c.jpg\",\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_480,c_scale,f_auto,q_auto:best\\/v1576016110\\/product-image\\/2409L_61_d.jpg\",\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_1333,c_scale,f_auto,q_auto:best\\/v1634058169\\/product-image\\/2409L_61_o.png\",\"https:\\/\\/images.canadagoose.com\\/image\\/upload\\/w_1333,c_scale,f_auto,q_auto:best\\/v1634058159\\/product-image\\/2409L_61_p.png\"]', '<p>Awesome winter jacket</p>', 'clothes', 'Canada Goose', 'Product'),
('ps-5', 'PlayStation 5', 1, '[\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/510VSJ9mWDL._SL1262_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/610%2B69ZsKCL._SL1500_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/51iPoFwQT3L._SL1230_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/61qbqFcvoNL._SL1500_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/51HCjA3rqYL._SL1230_.jpg\"]', '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'tech', 'Sony', 'Product'),
('xbox-series-s', 'Xbox Series S 512GB', 0, '[\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/71vPCX0bS-L._SL1500_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/71q7JTbRTpL._SL1500_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/71iQ4HGHtsL._SL1500_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/61IYrCrBzxL._SL1500_.jpg\",\"https:\\/\\/images-na.ssl-images-amazon.com\\/images\\/I\\/61RnXmpAmIL._SL1500_.jpg\"]', '\n<div>\n    <ul>\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\n    </ul>\n</div>', 'tech', 'Microsoft', 'Product');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `attribute_items`
--
ALTER TABLE `attribute_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `attribute_items`
--
ALTER TABLE `attribute_items`
  ADD CONSTRAINT `attribute_items_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
