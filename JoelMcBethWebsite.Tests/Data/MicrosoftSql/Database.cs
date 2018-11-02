namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.SqlServer.Dac;

    public class Database
    {
        private readonly string databaseName;
        private readonly string connectionString;

        public Database(string connectionString)
        {
            var builder = new SqlConnectionStringBuilder(connectionString);

            if (string.IsNullOrWhiteSpace(builder.InitialCatalog))
            {
                throw new ArgumentException("Connection string must have an initial catalog.");
            }

            this.databaseName = builder.InitialCatalog;
            builder.InitialCatalog = string.Empty;

            this.connectionString = builder.ToString();
        }

        public async Task TruncateTableAsync(string tableName)
        {
            using (var connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand($"TRUNCATE TABLE [{this.databaseName}].[{tableName}]", connection))
                {
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task DeleteAllFromTableAsync(string tableName, bool resetIdentity = false)
        {
            var query = @"
                USE [{0}];
                DELETE FROM [{1}];              
                ";

            if (resetIdentity)
            {
                query += "DBCC CHECKIDENT ('{1}', RESEED, 1);";
            }

            query = string.Format(query, this.databaseName, tableName);

            using (var connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand(query, connection))
                {
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task DeleteAsync()
        {
            string query =
                @"
                    USE master;
                    ALTER DATABASE [{0}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
                    DROP DATABASE [{0}];
                ";
            query = string.Format(query, this.databaseName);

            using (var connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand(query, connection))
                {
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<bool> ExistsAsync()
        {
            using (var connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand($"SELECT db_id('{this.databaseName}')", connection))
                {
                    var id = await command.ExecuteScalarAsync();

                    return id != DBNull.Value;
                }
            }
        }

        public void DeployDacPac(string fileName)
        {
            // This would use the Microsoft.SqlServer.DacFx.x64, however, they do not provide
            // a version for .NET core. I am using the preview assemblies from sqlpackage for linux
            // https://docs.microsoft.com/en-us/sql/tools/sqlpackage-download?view=sql-server-2017
            // I have tried to include the assemblies needed for this but I have not found the subset
            // of assemblies required for DacServices to work so you have to copy all the files into
            // the bin for this to function without throwing an exception.
            var dacServices = new DacServices(this.connectionString);

            var completionSource = new TaskCompletionSource<object>();

            using (var dacPackage = DacPackage.Load(fileName))
            {
                var options = new DacDeployOptions();

                dacServices.Deploy(dacPackage, this.databaseName, false, options);
            }
        }
    }
}
