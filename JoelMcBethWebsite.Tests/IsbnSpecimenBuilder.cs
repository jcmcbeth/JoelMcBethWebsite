namespace JoelMcBethWebsite.Tests
{
    using System;
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Text;
    using AutoFixture.Kernel;

    public class IsbnSpecimenBuilder<TEntity> : ISpecimenBuilder
    {
        private readonly PropertyInfo property;

        public IsbnSpecimenBuilder(Expression<Func<TEntity, string>> getter)
        {
            this.property = (PropertyInfo)((MemberExpression)getter.Body).Member;
        }

        public object Create(object request, ISpecimenContext context)
        {
            var currentProperty = request as PropertyInfo;

            if (currentProperty != null && this.AreEquivalent(currentProperty, this.property))
            {
                return this.CreateRandomIsbn();
            }

            return new NoSpecimen();
        }

        private bool AreEquivalent(PropertyInfo a, PropertyInfo b)
        {
            return a.DeclaringType == b.DeclaringType
                   && a.Name == b.Name;
        }

        private string CreateRandomIsbn()
        {
            var random = new Random();
            var isbn = new StringBuilder();

            for (int i = 0; i < 13; i++)
            {
                var digit = (char)random.Next('0', '9');
                isbn.Append(digit);
            }

            return isbn.ToString();
        }
    }
}
