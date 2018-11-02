SELECT
	[Books].[Id] AS BookId,
    [Books].[Isbn13],
    [Books].[Title],
    [Books].[Edition],
    [Books].[Pages],
    [Books].[Rating],
    [Books].[Order],
	[Authors].[Id] AS AuthorId,
	[Authors].[FirstName],
	[Authors].[LastName],
	[Authors].[MiddleName]
FROM
	[Books]
INNER JOIN
	BookAuthors ON [Books].[Id] = [BookAuthors].[BookId]
INNER JOIN
	Authors ON [BookAuthors].[AuthorId] = [Authors].[Id]