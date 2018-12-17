CREATE TABLE [dbo].[BookReviews]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(100000, 1), 
    [Rating] TINYINT NULL, 
    [IsRecommended] BIT NULL, 
    [Comments] NVARCHAR(MAX) NULL, 
    [BookId] INT NOT NULL, 
    CONSTRAINT [FK_BookReviews_Books] FOREIGN KEY ([BookId]) REFERENCES [Books]([Id])
		ON DELETE CASCADE
)
