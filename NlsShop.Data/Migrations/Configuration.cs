namespace NlsShop.Data.Migrations
{
    using NlsShop.Model.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<NlsShop.Data.NlsShopDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(NlsShop.Data.NlsShopDbContext context)
        {
            CreateProductCategorySample(context);
        }

        private void CreateProductCategorySample(NlsShop.Data.NlsShopDbContext context)
        {
            if (context.ProductCategories.Count() == 0)
            {
                List<ProductCategory> listProductCategory = new List<ProductCategory>()
            {
                new ProductCategory() { Name="Điện lạnh", Alias="dien-anh", Status=true},
                new ProductCategory() { Name="Viễn thông", Alias="vien-thong", Status=true},
                new ProductCategory() { Name="Đồ gia dụng", Alias="do-gia-dung", Status=true},
                new ProductCategory() { Name="Mỹ phẩm", Alias="my-pham", Status=true}
            };
                context.ProductCategories.AddRange(listProductCategory);
                context.SaveChanges();
            }
        }
    }
}
