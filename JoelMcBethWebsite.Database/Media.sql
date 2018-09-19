CREATE TABLE [dbo].[Media]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Title] NVARCHAR(256) NOT NULL, 
    [Year] SMALLINT NULL, 
    [MediaType] INT NOT NULL, 
    [Medium] NVARCHAR(50) NOT NULL
)

GO

CREATE INDEX [IX_Media_Title] ON [dbo].[Media] ([Title])
