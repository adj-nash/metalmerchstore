using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(StoreContext context) : ControllerBase
    {

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts()
    {
        return await context.Products.ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await context.Products.FindAsync(id);

        if(product == null) return NotFound("There was a problem finding this product!");

        return product;
    }

    }
}
