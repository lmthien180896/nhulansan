namespace NlsShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFieldsProduct : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Model", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.Products", "Quantity", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "Material", c => c.String(maxLength: 256));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "Material");
            DropColumn("dbo.Products", "Quantity");
            DropColumn("dbo.Products", "Model");
        }
    }
}
