using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtension
    {
        public static BasketDto ToDto(this Basket basket)
        {
             return new BasketDto 
            {
                BasketId = basket.BasketId,
                Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                ImageUrl = x.Product.ImageUrl,
                Category = x.Product.Category,
                Band = x.Product.Band, 
                Quantity = x.Quantity
            }).ToList()

            };
        }
    }
}