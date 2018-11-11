SET IDENTITY_INSERT [Authors] ON;

MERGE INTO [Authors] AS [Target]
USING (VALUES
	(1, 'Armin A.', 'Brott', 'A.'),
	(2, 'Gary', 'Greenberg', ''),
	(3, 'Joel', 'Grus', ''),
	(4, 'Robert', 'Martin', 'C.'),
	(5, 'Martin', 'Sternberg', ''),
	(6, 'Wenbo', 'Mao', ''),
	(7, 'Andrew', 'Hunt', ''),
	(8, 'David', 'Thomas', ''),
	(9, 'Robert', 'Faludi', ''),
	(10, 'Daniel', 'Kalla', ''),
	(11, 'Jeff', 'Duntemann', ''),
	(12, 'Aron', 'Ralston', ''),
	(13, 'Donald', 'Knuth', 'E.'),
	(14, 'Kyle', 'Baley', ''),
	(15, 'Donald', 'Belcham', ''),
	(16, 'John', 'Derbyshire', ''),
	(17, 'Charles', 'Platt', ''),
	(18, 'Michael', 'Feathers', ''),		
	(19, 'Mark', 'Seemann', ''),
	(20, 'Roy', 'Osherove', ''),
	(21, 'Francesco', 'Balena', ''),
	(22, 'Giuseppe', 'Dimauro', ''),
	(23, 'Bruce', 'Payette', ''),		
	(24, 'Marcin', 'Kawalerowicz', ''),
	(25, 'Craig', 'Berntson', ''),
	(26, 'William', 'Bartholomew', ''),
	(27, 'Sayed', 'Hashimi', ''),
	(28, 'Nick', 'Ramirez', ''),
	(29, 'Jennifer', 'Gunter', ''),
	(30, 'Gary', 'Ezzo', ''),
	(31, 'Robert', 'Bucknam', ''),
	(32, 'Dale', 'Carnagie', ''),
	(33, 'Coyote', 'Peterson', ''),
	(34, 'John', 'Sonmez', ''),
	(35, 'Stephen', 'Prata', '')
) AS [Source] ([Id], [FirstName], [LastName], [MiddleName])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[FirstName] = [Source].[FirstName],
		[LastName] = [Source].[LastName],
		[MiddleName] = [Source].[MiddleName]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [FirstName], [LastName], [MiddleName])
	VALUES (
		[Source].[Id],
		[Source].[FirstName],
		[Source].[LastName], 
		[Source].[MiddleName]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [Authors] OFF;