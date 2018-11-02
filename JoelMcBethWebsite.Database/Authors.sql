CREATE TABLE [dbo].[Authors]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] NVARCHAR(64) NULL, 
    [LastName] NVARCHAR(64) NULL, 
    [MiddleName] NVARCHAR(64) NULL
)
