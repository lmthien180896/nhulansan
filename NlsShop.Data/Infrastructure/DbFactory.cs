namespace NlsShop.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private NlsShopDbContext dbContext;

        public NlsShopDbContext Init()
        {
            return dbContext ?? (dbContext = new NlsShopDbContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}