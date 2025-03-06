using Microsoft.AspNetCore.Identity;

namespace MetalMerchStore;

public class User : IdentityUser
{
    public int? AddressId { get; set; }
    public Address? Address { get; set; }
}
