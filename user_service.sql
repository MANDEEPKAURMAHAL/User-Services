/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.4.6-MariaDB : Database - user_services
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`user_services` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `user_services`;

/*Table structure for table `user_detail` */

DROP TABLE IF EXISTS `user_detail`;

CREATE TABLE `user_detail` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(250) DEFAULT NULL,
  `user_last_name` varchar(250) DEFAULT NULL,
  `user_email` varchar(250) DEFAULT NULL,
  `user_password` varchar(250) DEFAULT NULL,
  `user_mobile_number` varchar(15) NOT NULL,
  `user_address` varchar(250) DEFAULT NULL,
  `user_active_flag` tinyint(2) DEFAULT 1,
  `user_create_date` datetime DEFAULT NULL,
  `user_update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`),
  FULLTEXT KEY `user_first_name` (`user_first_name`),
  FULLTEXT KEY `user_last_name` (`user_last_name`),
  FULLTEXT KEY `user_email` (`user_email`),
  FULLTEXT KEY `user_mobile_number` (`user_mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7458475886 DEFAULT CHARSET=latin1;

/*Data for the table `user_detail` */

insert  into `user_detail`(`user_id`,`user_first_name`,`user_last_name`,`user_email`,`user_password`,`user_mobile_number`,`user_address`,`user_active_flag`,`user_create_date`,`user_update_date`) values (7458475882,'Mandeep','Mahal','mandeepkaur1208@gmail.com','$2b$10$KSpoTjG.yv2WoT.Egq3kv.5svouZIlEI2XUBKKCy/vkSluf.PLoU2','7758095877','nanded city pune mmm',1,'2021-06-16 01:27:39','2021-06-16 01:36:11'),(7458475883,'Mandeep','Mahal','mandeepkaur1208@gmail.com','$2b$10$Zuxh/PiZC2NzUgVE3eKOp.WuXkXz9/pEpG2/M8pA3EXd8Omy.8m7e','7758095878','nanded city pune',1,'2021-06-16 01:28:43','2021-06-16 01:28:43'),(7458475884,'Mandeep kaur','Mahal','mandeepkaur1208@gmail.com','$2b$10$LXig9PCVl4l6k1COO0Bzbey/KN.hkc8.yeoGtT30E3mqRzzgE4fgC','7758095878','nanded city pune 411041',1,'2021-06-16 01:28:59','2021-06-16 01:29:40'),(7458475885,'Mandeep','Mahal','mandeepkaur1208@gmail.com','$2b$10$rSj5L4flMsUWKnkKWNwNn.VnbTDRJYCzROOMs75AwdNDcpKwd0Kzu','7758095879','nanded city pune mmm',1,'2021-06-16 10:27:10','2021-06-16 10:27:10');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
