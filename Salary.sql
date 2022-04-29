-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 13, 2022 at 09:02 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Salary`
--

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `dept_id` int(11) NOT NULL,
  `dept_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`dept_id`, `dept_name`) VALUES
(1, 'Human Resources'),
(3, 'Marketing');

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `emp_id` int(15) NOT NULL,
  `emp_title` varchar(100) NOT NULL,
  `emp_name` varchar(100) NOT NULL,
  `emp_dob` date NOT NULL,
  `emp_doj` date NOT NULL,
  `emp_address` varchar(255) NOT NULL,
  `emp_city` varchar(100) NOT NULL,
  `emp_state` varchar(100) NOT NULL,
  `emp_pincode` int(15) NOT NULL,
  `emp_mobile_no` bigint(20) NOT NULL,
  `emp_mail_id` varchar(100) NOT NULL,
  `emp_aadhar_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`emp_id`, `emp_title`, `emp_name`, `emp_dob`, `emp_doj`, `emp_address`, `emp_city`, `emp_state`, `emp_pincode`, `emp_mobile_no`, `emp_mail_id`, `emp_aadhar_no`) VALUES
(1, 'Mr', 'Rohit Shetty', '1998-08-23', '2013-09-12', 'Marina Beach', 'Mumbai', 'Maharashtra', 400005, 9876543210, 'rohitshetty@gmail.com', '1234567890'),
(3, 'Mr', 'Ajay Devgn', '1973-10-20', '2001-12-11', 'MG Road', 'Mumbai', 'Maharashtra', 400012, 9237485637, 'ajaydevgn@gmail.com', '7638483892');

-- --------------------------------------------------------

--
-- Table structure for table `Employee_Grade`
--

CREATE TABLE `Employee_Grade` (
  `transaction_id` int(15) NOT NULL,
  `emp_id` int(15) NOT NULL,
  `emp_dept_id` int(15) NOT NULL,
  `emp_grade_id` int(15) NOT NULL,
  `emp_from_date` date NOT NULL,
  `emp_to_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Employee_Salary_Details`
--

CREATE TABLE `Employee_Salary_Details` (
  `transaction_id` int(15) NOT NULL,
  `emp_id` int(15) NOT NULL,
  `emp_salary_year` varchar(100) NOT NULL,
  `emp_salary_month` varchar(100) NOT NULL,
  `emp_salary_reimbursement_date` datetime NOT NULL,
  `emp_dept_id` int(15) NOT NULL,
  `emp_grade_id` int(15) NOT NULL,
  `emp_gross` bigint(20) NOT NULL,
  `emp_total_salary` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Employee_Salary_Details`
--

INSERT INTO `Employee_Salary_Details` (`transaction_id`, `emp_id`, `emp_salary_year`, `emp_salary_month`, `emp_salary_reimbursement_date`, `emp_dept_id`, `emp_grade_id`, `emp_gross`, `emp_total_salary`) VALUES
(1, 1, '2014', '04', '2014-05-12 00:00:00', 3, 1, 1310000, 1230000),
(2, 3, '2016', '03', '2015-03-12 00:00:00', 1, 1, 1310000, 1230000);

-- --------------------------------------------------------

--
-- Table structure for table `Grade`
--

CREATE TABLE `Grade` (
  `grade_id` int(11) NOT NULL,
  `grade_name` varchar(100) NOT NULL,
  `grade_short_name` varchar(100) NOT NULL,
  `grade_basic` bigint(100) NOT NULL,
  `grade_ma` int(15) DEFAULT NULL,
  `grade_bonus` int(15) DEFAULT NULL,
  `grade_pt` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Grade`
--

INSERT INTO `Grade` (`grade_id`, `grade_name`, `grade_short_name`, `grade_basic`, `grade_ma`, `grade_bonus`, `grade_pt`) VALUES
(1, 'Senior Grade', 'S', 1200000, 100000, 10000, 80000);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `usertype` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `user_name`, `password`, `email_id`, `usertype`) VALUES
(1, 'UserAdmin', 'getitin', 'useradmin@gmail.com', 'Admin'),
(3, 'UserTemp', 'the@pass', 'usertemp@gmail.com', 'Regular'),
(4, 'UserTemp3', 'the@pass', 'usertemp3@gmail.com', 'Regular'),
(5, 'UserTemp5', 'the@pass', 'usertemp5@gmail.com', 'Regular'),
(6, 'UserTemp6', 'the@pass', 'usert@gmail.com', 'Regular');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`dept_id`),
  ADD UNIQUE KEY `dept_name` (`dept_name`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_mail_id` (`emp_mail_id`),
  ADD UNIQUE KEY `emp_mobile_no` (`emp_mobile_no`);

--
-- Indexes for table `Employee_Grade`
--
ALTER TABLE `Employee_Grade`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `emp_dept_id` (`emp_dept_id`),
  ADD KEY `emp_grade_id` (`emp_grade_id`);

--
-- Indexes for table `Employee_Salary_Details`
--
ALTER TABLE `Employee_Salary_Details`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `emp_dept_id` (`emp_dept_id`),
  ADD KEY `emp_grade_id` (`emp_grade_id`);

--
-- Indexes for table `Grade`
--
ALTER TABLE `Grade`
  ADD PRIMARY KEY (`grade_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Department`
--
ALTER TABLE `Department`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `emp_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Employee_Salary_Details`
--
ALTER TABLE `Employee_Salary_Details`
  MODIFY `transaction_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Grade`
--
ALTER TABLE `Grade`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Employee_Grade`
--
ALTER TABLE `Employee_Grade`
  ADD CONSTRAINT `Employee_Grade_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `Employee` (`emp_id`),
  ADD CONSTRAINT `Employee_Grade_ibfk_2` FOREIGN KEY (`emp_dept_id`) REFERENCES `Department` (`dept_id`),
  ADD CONSTRAINT `Employee_Grade_ibfk_3` FOREIGN KEY (`emp_grade_id`) REFERENCES `Grade` (`grade_id`);

--
-- Constraints for table `Employee_Salary_Details`
--
ALTER TABLE `Employee_Salary_Details`
  ADD CONSTRAINT `Employee_Salary_Details_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `Employee` (`emp_id`),
  ADD CONSTRAINT `Employee_Salary_Details_ibfk_2` FOREIGN KEY (`emp_dept_id`) REFERENCES `Department` (`dept_id`),
  ADD CONSTRAINT `Employee_Salary_Details_ibfk_3` FOREIGN KEY (`emp_grade_id`) REFERENCES `Grade` (`grade_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
