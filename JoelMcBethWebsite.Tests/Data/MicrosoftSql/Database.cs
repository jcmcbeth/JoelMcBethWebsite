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

        public async Task DeleteAsync()
        {
            using (var connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand($"DROP DATABASE [{this.databaseName}]", connection))
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

        public async Task DeployDacPackAsync(string fileName)
        {
            var dacServices = new DacServices(this.connectionString);

            var completionSource = new TaskCompletionSource<object>();

            using (var dacPackage = DacPackage.Load(fileName))
            {
                var options = new DacDeployOptions();

                dacServices.ProgressChanged += (s, e) =>
                {
                    switch (e.Status)
                    {
                        case DacOperationStatus.Cancelled:
                            completionSource.TrySetCanceled();
                            break;
                        case DacOperationStatus.Completed:
                            completionSource.TrySetResult(null);
                            break;
                        case DacOperationStatus.Faulted:
                            var exception = new Exception(e.Message);
                            completionSource.SetException(exception);
                            break;
                    }
                };

                dacServices.Deploy(dacPackage, this.databaseName, false, options);

                await completionSource.Task;
            }
        }
    }
}
