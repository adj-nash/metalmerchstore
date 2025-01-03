using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static void Initialize(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retrieve database.");

            SeedData(context);
    }

    private static void SeedData(StoreContext context)
    {
        context.Database.Migrate();

        if(context.Products.Any()) return;

        var products = new List<Product>
        {
           new Product
                {
                    Name = "Enforced War Remains",
                    Description = "Faceripper artwork from the new War Remains record.",
                    Price = 3499,
                    ImageUrl= "https://evilgreed.net/cdn/shop/files/ENFORCED-WarRemains-LS-F_5000x.jpg?v=1709202244",
                    Category = "Longsleeve",
                    Stock=  1,
                    Size= 'M',
                    Band= "Enforced",
                    Genre= "Thrash"
                },  
                new Product
                {
                    Name = "Sodom Partisan",
                    Description = "Artwork from the Partisan EP, printed front & back.",
                    Price = 2999,
                    ImageUrl= "https://m.media-amazon.com/images/I/A18Zbr2L5LL._CLa%7C2140%2C2000%7CB1mIFN0BOTL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX569_.png",
                    Category = "Longsleeve",
                    Stock= 1,
                    Size= 'M',
                    Band= "Sodom",
                    Genre= "Thrash"
                },
                new Product
                {
                    Name = "Demolition Hammer Epidemic of Violence",
                    Description = "Artwork from the Epidemic of Violence record.",
                    Price = 3499,
                    ImageUrl="https://www.warlordclothing.com/images/product/demohammer_epidemic_longsleeve_front.jpg",
                    Category = "Longsleeve",
                    Stock=  1,
                    Size= 'M',
                    Band= "Demolitioner Hammer",
                    Genre= "Thrash"
                },
                                new Product
                {
                    Name = "Kreator Pleasure to Kill",
                    Description = "Artwork from the Pleasure to Kill record.",
                    Price = 3999,
                    ImageUrl="https://m.media-amazon.com/images/I/A1mN82gBRyL._CLa%7C2140%2C2000%7CB1c7S5pkQjL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX466_.png",
                    Category = "Sweatshirt",
                    Stock=  1,
                    Size= 'M',
                    Band= "Kreator",
                    Genre= "Thrash"
                }, 
        };

        context.Products.AddRange(products);
        context.SaveChanges();
    }
}
