using AutoMapper;
using NlsShop.Model.Models;
using NlsShop.Service;
using NlsShop.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NlsShop.Web.Controllers
{
    public class ProductCategoryController : Controller
    {
        private IProductService _productService;

        public ProductCategoryController(IProductService productService)
        {
            this._productService = productService;
        }

        public ActionResult Index(int id)
        {
            var listProduct = _productService.GetProductsByCategory(id);
            var listProductVm = Mapper.Map<IEnumerable<Product>, IEnumerable<ProductViewModel>>(listProduct);
            return View(listProductVm);
        }
    }
}