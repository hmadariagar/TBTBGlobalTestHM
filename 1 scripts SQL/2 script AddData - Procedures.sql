
--EJECUTAR SCRIPT PARA CREAR PROCEDIMIENTOS E INYECTAR ALGUNOS VALORES A LA BASE DE DATOS 

------------------------
----Add New Employee----
------------------------
CREATE PROCEDURE AddNewEmployee
	@firstName VARCHAR(40),
	@lastName VARCHAR(40),
	@email VARCHAR(50),
	@professionId INT 
AS
	BEGIN TRY
		BEGIN TRAN 
			INSERT INTO Users (firstName, lastName, email, professionId) 
			VALUES (@firstName, @lastName, @email, @professionId)
		COMMIT TRAN 
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION
		PRINT 'Ha ocurrido un error, no se guardó el registro'
	END CATCH
GO


------------------------
--Create New Project----
------------------------
CREATE PROCEDURE CreateNewProject
	@nameProject VARCHAR(80),
	@descriptionProject VARCHAR(100)
AS

	BEGIN TRY
		BEGIN TRAN 
			INSERT INTO Project (nameProject, descriptionProject) 
			VALUES (@nameProject, @descriptionProject)
		COMMIT TRAN 
		SELECT * FROM Project;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION
		PRINT 'Ha ocurrido un error, no se guardó el registro'
	END CATCH
GO


---------------------------------
--assign a project to an employee
---------------------------------
CREATE PROCEDURE AssignAProject
	@ProjectId INT,
	@userId INT
AS
	BEGIN TRY
		BEGIN TRAN 
			INSERT INTO AssignedProjects (ProjectId, userId) 
			VALUES (@ProjectId, @userId);
		COMMIT TRAN 
		SELECT * FROM AssignedProjects;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION
		PRINT 'Ha ocurrido un error, no se guardó el registro'
	END CATCH
GO


---------------------------------
-------find User for ID----------
--------------------------------
CREATE PROCEDURE findUser
	@id INT
AS
	SELECT * FROM Users WHERE Id = @id
GO


--------------------------------
---------show Users-------------
--------------------------------
CREATE PROCEDURE showUsers
AS
	SELECT * FROM Users
GO


--------------------------------
---------Show Profession--------
--------------------------------
CREATE PROCEDURE ShowProfession
AS
	SELECT * FROM Profession
GO


--------------------------------
----------Show Project------------
--------------------------------
CREATE PROCEDURE ShowProject
AS
	SELECT * FROM Project
GO

--------------------------------
--------Show Assigned Projects---------
--------------------------------
CREATE PROCEDURE ShowAssignedProjects
AS
	SELECT * FROM AssignedProjects
GO


---------------------------
-----Update Email-----------
---------------------------
CREATE PROCEDURE UpdateEmail
	@email VARCHAR(50),
	@IdUser INT
AS
	IF EXISTS (SELECT Id FROM Users WHERE Id = @IdUser) 
		BEGIN TRY	
			BEGIN TRAN 	
				UPDATE [Users] SET [email] = @email
				WHERE [id] = @IdUser
				PRINT 'usuario modificado'
				EXEC findUser @IdUser
			COMMIT TRAN 
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION
			PRINT 'Ha ocurrido un error, no se guardó el registro'
		END CATCH
	ELSE
		BEGIN
			PRINT 'Usuario no Existe'
		END
GO


-----------------------
-----delete User-------
-----------------------
CREATE PROCEDURE deletedUser
	@userId INT
AS
	IF EXISTS (SELECT Id FROM Users WHERE Id = @userId) 
		BEGIN TRY
			BEGIN TRAN 
				DELETE FROM [AssignedProjects] WHERE [userId] = @userId
				DELETE FROM [Users] WHERE [id] = @userId;
			COMMIT TRAN 
			SELECT * FROM Users;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION
			PRINT 'Ha ocurrido un error, no se guardó el registro'
		END CATCH
	ELSE
		BEGIN
			PRINT 'Usuario no Existe'
		END
GO


----------------------------------------------
--INNER JOIN
--Shows list user and Profession linked to it
----------------------------------------------
CREATE PROCEDURE InnerJoinTest
AS
	BEGIN
		SELECT * 
		FROM Users U
		JOIN Profession P
		ON P.Id= U.Id
	END
GO

---------------------------------------------
--LEFT JOIN
--Show associated users and Professions
---------------------------------------------
CREATE PROCEDURE LeftJoinTest
AS
	BEGIN
		SELECT
		U.firstName as 'Empleado',
		P.profession as 'Profesión'
		FROM Users U
		LEFT JOIN Profession P
		ON U.id = P.Id
	END
GO

---------------------------------
--UNION
--Union of all users and Project.  
----------------------------------
CREATE PROCEDURE UnionTest
AS
	BEGIN
		SELECT firstName FROM Users
		UNION
		SELECT nameProject FROM Project
	END
GO


---------------------------------------------
--CASE
--Shows the status of the task for each case 
---------------------------------------------
CREATE PROCEDURE CaseTest
AS
	BEGIN
		SELECT nameProject,
		CASE WHEN Id = 1 THEN 'Ata'
		WHEN Id= 2 THEN 'Emergente'
		ELSE 'Baja'
		END AS Prioridad
		FROM Project;
	END
GO





-------------------------------------------------------------------
----------------------****** Data Test ******----------------------
-------------------------------------------------------------------
--Create list Users
INSERT INTO Profession (profession) 
VALUES
	('Desarrollador Frontend'),
	('Desarrollador BackEnd'),
	('Diseñador Web'),
	('Analista Big Data'),
	('Especialista Open Data'),
	('Programador Informático'),
	('Administrador de Contenido'),
	('Gestor de Proyectos'),
	('Ingeniero de control'),
	('Instructor TIC')
;
select * from Profession


--Create list Employees
INSERT INTO Users (firstName, lastName, email, professionId) 
VALUES
	('Ana', 'Perez', 'ana@gmail.com', 2),
	('Jose', 'Mendoza', 'jose@gmail.com', 4),
	('Hector', 'Madariaga', 'hector@gmail.com', 1),
	('Pedro', 'Perez', 'pedro@gmail.com', 10),
	('Luisa', 'Barrientos', 'luisa@gmail.com', 8)
;
select * from Users

--Create list Projects
INSERT INTO Project (nameProject, descriptionProject) 
VALUES
	('Pagina Web', 'Creación de Página Web para la empresa Don Pedro'),
	('Webinar de Contenido', 'Conferencia Web para mostrar las últimas tecnologias'),
	('Integracion Salesforce', 'Integración del backend con salesforce')
;
select * from Project

--Create list assigned Projects
INSERT INTO AssignedProjects (ProjectId, userId) 
VALUES
	(1, 3),
	(1, 1),
	(1, 5),
	(2, 5),
	(2, 4),
	(3, 1),
	(3, 5),
	(3, 2)
;
select * from AssignedProjects 
