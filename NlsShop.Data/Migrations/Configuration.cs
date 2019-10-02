﻿namespace NlsShop.Data.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using NlsShop.Model.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<NlsShopDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(NlsShopDbContext context)
        {
            CreateProductCategorySample(context);
            //CreateUser(context);
        }

        private void CreateUser(NlsShopDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new NlsShopDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new NlsShopDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "lmthien",
                Email = "leminhthien18081996@gmail.com",
                EmailConfirmed = true,
                BirthDay = DateTime.Now,
                FullName = "Lê Minh Thiện"

            };

            manager.Create(user, "123456");

            if (!roleManager.Roles.Any())
            {
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByEmail("leminhthien18081996@gmail.com");

            manager.AddToRoles(adminUser.Id, new string[] { "Admin", "User" });
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
