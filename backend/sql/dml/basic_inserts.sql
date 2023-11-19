-- ROLES
INSERT INTO `encomienda`.`Role` (`name`) VALUES
('TI'),
('Secretaria/o'),
('Bodega'),
('Conserje'),
('Operaciones de Logística'),
('Guardia'),
('Piloto'),
('Auxiliar de Piloto'),
('Gerente'),
('Informática'),
('pasante'),
('Contador');


-- Insertar registro en la tabla Branch
INSERT INTO `encomienda`.`Branch` (`name`, `address`, `location`)
VALUES ('Sucursal A', 'Dirección 1', 'Ciudad A');
INSERT INTO `encomienda`.`Branch` (`name`, `address`, `location`)
VALUES ('Sucursal B', 'Dirección 2', 'Ciudad B');
INSERT INTO `encomienda`.`Branch` (`name`, `address`, `location`)
VALUES ('Sucursal C', 'Dirección 3', 'Ciudad C');

-- Insertar registro en la role_assignment Branch
INSERT INTO `encomienda`.`role_assignment` (`branch`, `role`, `salary`)
VALUES (1, 1, 7000.2);

INSERT INTO `encomienda`.`role_assignment` (`branch`, `role`, `salary`)
VALUES (1, 2, 3200.10);