using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using MetalMerchStore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API.Controllers
{
    public class ProductsController(StoreContext context) : BaseController
    {

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts([FromQuery]ProductParams productParams)
    {
        var query = context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchBy)
            .Filter(productParams.Category, productParams.Band, productParams.Genre)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.Metadata);

        return products;
    }   
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await context.Products.FindAsync(id);

        if(product == null) return NotFound("There was a problem finding this product!");

        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetProductByFilters()
    {
        var category = await context.Products.Select(x => x.Category).Distinct().ToListAsync();
        var band = await context.Products.Select(x => x.Band).Distinct().ToListAsync();
        var genre = await context.Products.Select(x => x.Genre).Distinct().ToListAsync();

        return Ok(new { category, band, genre});
    }

    }



}
