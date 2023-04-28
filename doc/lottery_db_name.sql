-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 28 2023 г., 10:31
-- Версия сервера: 5.5.62-log
-- Версия PHP: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lottery_db_name`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `clientID` int(11) NOT NULL,
  `clientUniqId` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isWinner` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`clientID`, `clientUniqId`, `isWinner`) VALUES
(57, '413305cb-6060-4f79-b54b-e6e2a97a3027', 1),
(58, '9e3dfd7a-a048-4914-93b4-68c8b97e7cc7', 1),
(59, '4f7973d1-75c7-4e1f-bcb5-da6aca1fcb4e', 1),
(60, '2710135c-b368-4bd1-a6a6-fd61b3b65035', 1),
(61, '9f72ef82-baf2-4f5f-815f-b7f2f004011e', 1),
(62, '044a723b-4882-467f-9a0f-28093e988980', 1),
(63, '67da26b0-a8f6-45fe-9e92-682f72d933d0', 1),
(64, 'a131803d-4660-4a48-a836-219b1f01c517', 1),
(65, '46f811ad-cb7c-4f62-b43c-3b1a4c44bdb1', 1),
(66, 'ee705eb1-9526-4876-8205-0b794c29703b', 1),
(67, 'f65d1513-784f-4b18-bb38-f5436de03875', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`clientID`),
  ADD UNIQUE KEY `clientUniqId` (`clientUniqId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
