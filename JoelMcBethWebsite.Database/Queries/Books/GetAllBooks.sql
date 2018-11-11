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
	[Authors].[MiddleName],
	[BookReviews].[Id] AS BookReviewId,
	[BookReviews].[Rating],
	[BookReviews].[IsRecommended],
	[BookReviews].[Comments]
FROM
	[Books]
LEFT JOIN
	[BookReviews] ON [Books].[Id] = [BookReviews].[BookId]
LEFT JOIN
	[BookAuthors] ON [Books].[Id] = [BookAuthors].[BookId]
LEFT JOIN
	[Authors] ON [BookAuthors].[AuthorId] = [Authors].[Id]