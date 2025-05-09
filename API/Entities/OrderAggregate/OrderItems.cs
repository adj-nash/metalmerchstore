using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    public class OrderItems
    {
        public int Id { get; set; }
        public required ProductOrdered ProductOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}