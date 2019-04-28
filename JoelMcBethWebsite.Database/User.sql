CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserName] NVARCHAR(50) NOT NULL, 
    [Email] NVARCHAR(75) NOT NULL, 
    [HashedPassword] BINARY(24) NULL, 
    [PasswordSalt] BINARY(24) NULL, 
    [IsApproved] BIT NOT NULL DEFAULT 0, 
    [FailedLoginAttempt] INT NOT NULL, 
    [IsLocked] BIT NOT NULL, 
    [LastLoginAttempts] DATETIME NULL
)
