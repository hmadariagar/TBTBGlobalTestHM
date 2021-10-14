----------------------------
-----CREATE DATABASE--------
----------------------------

USE master
GO

DROP database IF EXISTS TestTBTBGlobal;

CREATE DATABASE TestTBTBGlobal;
GO

USE TestTBTBGlobal;


--CREATE TABLES
DROP TABLE IF EXISTS Profession;
CREATE TABLE Profession(
	Id INT PRIMARY KEY IDENTITY (1,1),
	profession VARCHAR(40) NOT NULL,
);


--CREATE TABLES
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	Id INT PRIMARY KEY IDENTITY (1,1),
	firstName VARCHAR(40) NOT NULL,
	lastName VARCHAR(40) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	userRole VARCHAR(20) DEFAULT 'Employee',
	professionId INT NOT NULL,
	CONSTRAINT fkProfession FOREIGN KEY (professionId) REFERENCES Profession (Id),
);

DROP TABLE IF EXISTS Project;
CREATE TABLE Project (
	Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	nameProject VARCHAR(80) NOT NULL,
	descriptionProject text
);

DROP TABLE IF EXISTS AssignedProjects;
CREATE TABLE AssignedProjects (
	PRIMARY KEY(userId, ProjectId),
	ProjectId INT NOT NULL,
	userId INT NOT NULL,
	CONSTRAINT fkProjectId FOREIGN KEY (ProjectId) REFERENCES Project (Id),
	CONSTRAINT fkUser FOREIGN KEY (userId) REFERENCES Users (Id),
);



