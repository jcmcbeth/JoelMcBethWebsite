namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
    using AutoFixture;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Transactions;

    [TestClass]
    public abstract class MicrosoftSqlTestBase<TTarget>
    {
        protected Database Database
        {
            get;
            set;
        }

        protected string ConnectionString
        {
            get;
            set;
        }

        protected TransactionScope Transaction
        {
            get;
            set;
        }

        protected TTarget Target
        {
            get;
            set;
        }

        protected Fixture Fixture
        {
            get;
            set;
        }

        [TestInitialize]
        public virtual async Task Initialize()
        {
            this.Database = TestDatabaseInitializer.Database;
            this.ConnectionString = TestDatabaseInitializer.ConnectionString;

            this.Fixture = new Fixture();

            this.SetupFixture(this.Fixture);

            await this.Reset();

            this.Target = this.CreateTarget(this.ConnectionString);
        }

        [TestCleanup]
        public virtual void Cleanup()
        {
        }

        protected abstract TTarget CreateTarget(string connectionString);

        protected virtual void SetupFixture(Fixture fixture)
        {
        }

        protected virtual Task Reset()
        {
            return Task.CompletedTask;
        }
    }
}