DROP SCHEMA IF EXISTS `encomienda` ;
CREATE SCHEMA IF NOT EXISTS `encomienda` DEFAULT CHARACTER SET utf8 ;
USE `encomienda` ;

-- -----------------------------------------------------
-- Table `encomienda`.`Branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Branch` (
  `id_branch` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NULL,
  PRIMARY KEY (`id_branch`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Role` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id_role`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Role_Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Role_Assignment` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `branch` INT NOT NULL,
  `role` INT NOT NULL,
  `salary` DECIMAL(10,2) NOT NULL,
  INDEX `FK_RA_BRANCH_idx` (`branch` ASC) ,
  INDEX `FK_RA_ROLE_idx` (`role` ASC) ,
  PRIMARY KEY (`id_role`),
  CONSTRAINT `FK_RA_BRANCH`
    FOREIGN KEY (`branch`)
    REFERENCES `encomienda`.`Branch` (`id_branch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_RA_ROLE`
    FOREIGN KEY (`role`)
    REFERENCES `encomienda`.`Role` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Employee` (
  `id_employee` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` TEXT NOT NULL,
  `role_assignment` INT NOT NULL,
  `hours` INT NOT NULL,
  PRIMARY KEY (`id_employee`),
  INDEX `FK_EMPLOYEE_ROLE_idx` (`role_assignment` ASC) ,
  CONSTRAINT `FK_EMPLOYEE_ROLE`
    FOREIGN KEY (`role_assignment`)
    REFERENCES `encomienda`.`Role_Assignment` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `encomienda`.`Fee`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `encomienda`.`Fee` (
--   `id_fee` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(100) NULL,
--   `amount` DECIMAL(10,2) NULL,
--   PRIMARY KEY (`id_fee`))
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Payment` (
  `id_payment` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  `type_payment` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`id_payment`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `encomienda`.`Budget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Budget` (
  `month_year` VARCHAR(7) NOT NULL COMMENT 'Formato: MM-YYYY (mes-año)',
  `amount` DECIMAL(10,2) NOT NULL COMMENT 'Cantidad del presupuesto',
  PRIMARY KEY (`month_year`)
)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `encomienda`.`Honorarium`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Honorarium` (
  `id_payment` INT NOT NULL,
  `employee` INT NOT NULL,
  `hours` INT NOT NULL,
  PRIMARY KEY (`id_payment`),
  INDEX `FK_FEE_EMPLOYEE_idx` (`employee` ASC) ,
  CONSTRAINT `FK_FEE_EMPLOYEE`
    FOREIGN KEY (`employee`)
    REFERENCES `encomienda`.`Employee` (`id_employee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_FEE_PAYMENT`
    FOREIGN KEY (`id_payment`)
    REFERENCES `encomienda`.`Payment` (`id_payment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Shipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Shipment` (
  `id_shipment` INT NOT NULL AUTO_INCREMENT,
  `origin` INT NOT NULL,
  `destiny` INT NOT NULL,
  `weight` DECIMAL(6,2) NOT NULL,
  `volume` DECIMAL(7,2) NOT NULL,
  `max_time` INT NOT NULL,
  `payment` DECIMAL(10,2) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_shipment`),
  INDEX `FK_S_BORIGIN_idx` (`origin` ASC) ,
  INDEX `FK_S_DESTINY_idx` (`destiny` ASC) ,
  CONSTRAINT `FK_S_ORIGIN`
    FOREIGN KEY (`origin`)
    REFERENCES `encomienda`.`Branch` (`id_branch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_S_DESTINY`
    FOREIGN KEY (`destiny`)
    REFERENCES `encomienda`.`Branch` (`id_branch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Transport`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Transport` (
  `id_transport` INT NOT NULL,
  `tonnage` DECIMAL(7,2) NOT NULL,
  `branch` INT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_transport`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Fixed_Cost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Fixed_Cost` (
  `id_fixed_cost` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_fixed_cost`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Cost_Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Cost_Assignment` (
  `id_cost` INT NOT NULL AUTO_INCREMENT,
  `cost` INT NOT NULL,
  `branch` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  INDEX `FK_CA_BRANCH_idx` (`branch` ASC) ,
  PRIMARY KEY (`id_cost`),
  CONSTRAINT `FK_CA_COST`
    FOREIGN KEY (`cost`)
    REFERENCES `encomienda`.`Fixed_Cost` (`id_fixed_cost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_CA_BRANCH`
    FOREIGN KEY (`branch`)
    REFERENCES `encomienda`.`Branch` (`id_branch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Payment_Salary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Payment_Salary` (
  `id_salary` INT NOT NULL,
  `employee` INT NOT NULL,
  `month_year` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id_salary`),
  INDEX `FK_S_EMPLOYEE_idx` (`employee` ASC) ,
  CONSTRAINT `FK_S_PAYMENT`
    FOREIGN KEY (`id_salary`)
    REFERENCES `encomienda`.`Payment` (`id_payment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_S_EMPLOYEE`
    FOREIGN KEY (`employee`)
    REFERENCES `encomienda`.`Employee` (`id_employee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Payment_Special`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Payment_Special` (
  `id_payment` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id_payment`),
  CONSTRAINT `FK_CS_PAYMENT`
    FOREIGN KEY (`id_payment`)
    REFERENCES `encomienda`.`Payment` (`id_payment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Payment_Cost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Payment_Cost` (
  `id_payment` INT NOT NULL,
  `id_cost_assignment` INT NOT NULL,
  PRIMARY KEY (`id_payment`),
  INDEX `FK_PC_COST_idx` (`id_cost_assignment` ASC) ,
  CONSTRAINT `FK_PC_COST`
    FOREIGN KEY (`id_cost_assignment`)
    REFERENCES `encomienda`.`Cost_Assignment` (`id_cost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PC_PAYMENT`
    FOREIGN KEY (`id_payment`)
    REFERENCES `encomienda`.`Payment` (`id_payment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Point`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Point` (
  `id_point` INT NOT NULL AUTO_INCREMENT,
  `demand` INT NOT NULL,
  PRIMARY KEY (`id_point`),
  CONSTRAINT `FK_P_BRANCH`
    FOREIGN KEY (`id_point`)
    REFERENCES `encomienda`.`Branch` (`id_branch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Point_Near`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Point_Near` (
  `id_point_near` INT NOT NULL AUTO_INCREMENT,
  `origin` INT NOT NULL,
  `destiny` INT NOT NULL,
  `distance` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `time` INT NOT NULL,
  PRIMARY KEY (`id_point_near`),
  INDEX `FK_PN_NEXT_idx` (`destiny` ASC) ,
  CONSTRAINT `FK_PN_CURRENT`
    FOREIGN KEY (`origin`)
    REFERENCES `encomienda`.`Point` (`id_point`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PN_NEXT`
    FOREIGN KEY (`destiny`)
    REFERENCES `encomienda`.`Point` (`id_point`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Route`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Route` (
  `id_route` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `steps` INT NOT NULL,
  PRIMARY KEY (`id_route`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Point_Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Point_Assignment` (
  `id_point_assignment` INT NOT NULL AUTO_INCREMENT,
  `id_point` INT NOT NULL,
  `id_route` INT NOT NULL,
  `sequence` INT NOT NULL,
  PRIMARY KEY (`id_point_assignment`),
  INDEX `FK_PA_POINT_idx` (`id_point` ASC) ,
  INDEX `FK_PA_ROUTE_idx` (`id_route` ASC) ,
  CONSTRAINT `FK_PA_POINT`
    FOREIGN KEY (`id_point`)
    REFERENCES `encomienda`.`Point_Near` (`id_point_near`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PA_ROUTE`
    FOREIGN KEY (`id_route`)
    REFERENCES `encomienda`.`Route` (`id_route`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `encomienda`.`Route_Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `encomienda`.`Route_Assignment` (
  `id_route_assignment` INT NOT NULL AUTO_INCREMENT,
  `route` INT NOT NULL,
  `transport` INT NOT NULL,
  `activated` TINYINT NOT NULL DEFAULT 0,
  `sequence` INT NOT NULL DEFAULT 0,
  `retorned` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_route_assignment`),
  INDEX `FK_RA_ROUTE_idx` (`route` ASC) ,
  INDEX `FK_RA_TRANSPORT_idx` (`transport` ASC) ,
  CONSTRAINT `FK_RA_ROUTE`
    FOREIGN KEY (`route`)
    REFERENCES `encomienda`.`Route` (`id_route`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_RA_TRANSPORT`
    FOREIGN KEY (`transport`)
    REFERENCES `encomienda`.`Transport` (`id_transport`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB