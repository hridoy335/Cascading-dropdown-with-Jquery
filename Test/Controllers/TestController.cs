using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Test.Models;

namespace Test.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getProductCategories()
        {
            List<Category> categories = new List<Category>();
            using (AdvMasterDetailsEntities dc = new AdvMasterDetailsEntities())
            {
                categories = dc.Categories.OrderBy(a => a.CategortyName).ToList();
            }
            return new JsonResult { Data = categories, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult getProducts(int categoryID)
        {
            List<Product> products = new List<Product>();
            using (AdvMasterDetailsEntities dc = new AdvMasterDetailsEntities())
            {
                products = dc.Products.Where(a => a.CategoryID.Equals(categoryID)).OrderBy(a => a.ProductName).ToList();
            }
            return new JsonResult { Data = products, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}