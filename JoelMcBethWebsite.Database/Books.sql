CREATE TABLE [dbo].[Books]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Isbn13] NCHAR(13) NOT NULL, 
    [Title] NVARCHAR(64) NOT NULL, 
    [Edition] NVARCHAR(64) NULL, 
    [Pages] INT NULL 
)

GO

CREATE UNIQUE INDEX [IX_Isbn13] ON [dbo].[Books] ([Isbn13])
