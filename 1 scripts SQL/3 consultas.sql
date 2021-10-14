
---CONSULTAS----


----Add New Employee----
--EXEC AddNewEmployee '@firstName','@lastName', '@email' ,@professionId
	EXEC AddNewEmployee 'Daniel','Lopez', 'daniel@gmail.com' ,4



--Create New Project----
--EXEC CreateNewProject '@nameProject', '@descriptionProject'
	EXEC CreateNewProject 'Crear proyecciones', 'Analizar los datos'



--assign a project to an employee
--EXEC AssignAProject	@ProjectId, @userId
	EXEC AssignAProject	7, 1


--find User for ID--
--EXEC findUser @id
	EXEC findUser 5


--show Users--
EXEC showUsers


--Show Profession--
EXEC ShowProfession

--Show Projects--
EXEC ShowProject

--Show Assigned Projects--
EXEC ShowAssignedProjects


--Update Email--
--EXEC UpdateEmail @email, @IdUser
EXEC UpdateEmail pedro1@nuevo, 4


--delete User--
--EXEC deletedUser @userId
EXEC deletedUser 2

--INNER JOIN
--Shows list user and Profession linked to it
EXEC InnerJoinTest


--LEFT JOIN
--Show associated users and Professions
EXEC LeftJoinTest


--UNION
--Union of all users and Project.
EXEC UnionTest

--CASE
--Shows the status of the task for each case 
EXEC CaseTest