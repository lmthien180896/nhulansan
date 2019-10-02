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
    public class HomeController : Controller
    {
        private IProductCategoryService _productCategoryService;
        public HomeController(IProductCategoryService productCategoryService)
        {
            this._productCategoryService = productCategoryService;
        }

        public ActionResult Index()
        {
            return View();
        }


        [ChildActionOnly]
        public ActionResult Footer()
        {
            return PartialView();
        }

        [ChildActionOnly]
        public ActionResult MainMenu()
        {
            var productCategories = _productCategoryService.GetAll();
            var productCategoryVm = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(productCategories);
            return PartialView(productCategoryVm);
        }
    }
}