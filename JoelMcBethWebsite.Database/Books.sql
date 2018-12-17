CREATE TABLE [dbo].[Books]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(100000, 1), 
    [Isbn13] NCHAR(13) NULL, 
    [Title] NVARCHAR(128) NOT NULL, 
    [Edition] NVARCHAR(64) NULL, 
    [Pages] INT NULL, 
    [Order] INT NULL 
)

GO

CREATE UNIQUE INDEX [IX_Isbn13] ON [dbo].[Books] ([Isbn13])
WHERE [Isbn13] IS NOT NULL;
