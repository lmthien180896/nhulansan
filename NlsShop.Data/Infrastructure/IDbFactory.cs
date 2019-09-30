using System;

namespace NlsShop.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        NlsShopDbContext Init();
    }
}