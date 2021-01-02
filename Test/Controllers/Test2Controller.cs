using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Test.Models;

namespace Test.Controllers
{
    public class Test2Controller : Controller
    {
        Models.AdvMasterDetailsEntities db = new AdvMasterDetailsEntities();
       
        // GET: Test2
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult PostIndex(OrderDetail orderDetail)
        { 
            if (ModelState.IsValid)
            {
                db.OrderDetails.Add(orderDetail);
                db.SaveChanges();
                return Json(true);
            }
            return View(orderDetail);
        }

        public ActionResult GetOrderdetails()
        {
            return View(db.OrderDetails.ToList());
        }

        // 
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