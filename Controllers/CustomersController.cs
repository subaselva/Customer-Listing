using Microsoft.AspNetCore.Mvc;

namespace CustomerListingApp.Controllers
{
    public class CustomersController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CustomersController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
