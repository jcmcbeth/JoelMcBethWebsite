namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    [TestClass]
    public class TestDatabaseInitializer
    {
        public const string ConnectionString = @"Data Source=(LocalDb)\MSSQLLocalDB;Integrated Security=True; Initial Catalog=JoelMcBethWebsite-Test";

        public static Database Database { get; } = new Database(ConnectionString);

        [AssemblyInitialize]
        public static async Task InitializeDatabase(TestContext testContext)
        {
            if (await Database.ExistsAsync())
            {
                await Database.DeleteAsync();
            }

            await Database.DeployDacPackAsync("JoelMcBethWebsite.dacpac");
        }

        [AssemblyCleanup]
        public static async Task CleanupDatabase()
        {
            if (await Database.ExistsAsync())
            {
                await Database.DeleteAsync();
            }
        }
    }
}
