using Microsoft.AspNetCore.Mvc;

namespace MuhammadNabi.PerceiveDemo.Web.Controllers
{
    public abstract class BaseController<T> : ControllerBase where T : BaseController<T>
    {
        private ILogger<T> _logger;
        protected ILogger<T> Logger => _logger ?? (_logger = HttpContext.RequestServices.GetService<ILogger<T>>());
    }
}