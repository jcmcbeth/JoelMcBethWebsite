namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
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

        [TestInitialize]
        public virtual void Initialize()
        {
            this.ConnectionString = TestDatabaseInitializer.ConnectionString;

            this.Target = this.CreateTarget(this.ConnectionString);

            this.Transaction = new TransactionScope();
        }

        [TestCleanup]
        public virtual void Cleanup()
        {
            this.Transaction.Dispose();
        }

        public abstract TTarget CreateTarget(string connectionString);
    }
}
