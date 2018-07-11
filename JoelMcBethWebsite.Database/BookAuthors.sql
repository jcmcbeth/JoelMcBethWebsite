CREATE TABLE [dbo].[BookAuthors]
(
	[BookId] INT NOT NULL , 
    [AuthorId] INT NOT NULL, 
    PRIMARY KEY ([AuthorId], [BookId]), 
    CONSTRAINT [FK_BookAuthors_Authors] FOREIGN KEY (AuthorId) REFERENCES [Authors]([Id]), 
    CONSTRAINT [FK_BookAuthors_Books] FOREIGN KEY ([BookId]) REFERENCES [Books]([Id])
)
