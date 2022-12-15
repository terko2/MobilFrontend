-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Dec 15. 11:11
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `nyaralas`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auto`
--

CREATE TABLE `auto` (
  `auto_id` int(11) NOT NULL,
  `auto_nev` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `auto_evjarat` date NOT NULL,
  `auto_kep` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `auto_akcio` int(11) NOT NULL,
  `auto_ar` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `auto_akcios_ar` int(11) NOT NULL,
  `auto_pontozas` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `auto`
--

INSERT INTO `auto` (`auto_id`, `auto_nev`, `auto_evjarat`, `auto_kep`, `auto_akcio`, `auto_ar`, `auto_akcios_ar`, `auto_pontozas`) VALUES
(1, 'Mercedes C 300', '2019-06-11', '1.png', 0, '75000 Ft', 0, 8),
(2, 'Toyota 2020 Yaris', '2020-01-28', '2.png', 0, '120000 Ft', 100000, 0),
(3, 'Mazda 2017 CX5', '2017-12-12', '3.png', 0, '115000 Ft', 0, 0),
(4, 'BMW i3', '2019-04-17', '4.PNG', 0, '220000 Ft', 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `elerhetoseg`
--

CREATE TABLE `elerhetoseg` (
  `el_id` int(11) NOT NULL,
  `el_nev` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `eler_szam` int(12) NOT NULL,
  `eler_email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `elerhetoseg`
--

INSERT INTO `elerhetoseg` (`el_id`, `el_nev`, `eler_szam`, `eler_email`) VALUES
(1, 'Rácz Péter', 204118483, 'terkosky@gmail.com'),
(2, 'Boros Tamás', 205607454, 'borostamas@gmail.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szalloda`
--

CREATE TABLE `szalloda` (
  `szalloda_id` int(11) NOT NULL,
  `szalloda_neve` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `csillagok_ertek` int(11) NOT NULL,
  `szalloda_kep` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `szalloda_hely` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szalloda`
--

INSERT INTO `szalloda` (`szalloda_id`, `szalloda_neve`, `csillagok_ertek`, `szalloda_kep`, `szalloda_hely`) VALUES
(1, 'Hotel Divinus', 5, 'sz_1.png', ''),
(2, 'PlatanHotel', 4, 'sz_2.png', '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`auto_id`);

--
-- A tábla indexei `elerhetoseg`
--
ALTER TABLE `elerhetoseg`
  ADD PRIMARY KEY (`el_id`);

--
-- A tábla indexei `szalloda`
--
ALTER TABLE `szalloda`
  ADD PRIMARY KEY (`szalloda_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `auto`
--
ALTER TABLE `auto`
  MODIFY `auto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
