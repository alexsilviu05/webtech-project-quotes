CREATE DATABASE `quotes` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;

USE `quotes`;


-- --------------------------------------------------------

--

-- Tabela Format

--

CREATE TABLE IF NOT EXISTS `Author` (

  `id_author` smallint(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,

  `name` varchar(30) DEFAULT NULL,

  `createdAt` timestamp,

  `updatedAt` timestamp

) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--

-- Table structure for table `products`

--

CREATE TABLE IF NOT EXISTS `quotes` (

  `id_quotes` smallint(5) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,

  `id_author` smallint(5) DEFAULT NULL,

  `sourceTitle` varchar(100) DEFAULT NULL,

  `AuthorName` varchar(50) DEFAULT NULL,

  `Description` varchar(300) DEFAULT NULL,

  `AppearedAt` DATE,

  `createdAt` timestamp,

  `updatedAt` timestamp,

  CONSTRAINT fk_format FOREIGN KEY (id_author) REFERENCES formate(id_author)

) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

