# NerdStop (In Progress)

The geek and gaming products market is rapidly growing, but many e-commerce platforms feature complicated interfaces or lack personalization. NerdStop aims to address this by offering an intuitive, interactive platform for pop culture fans, nerds, and gamers, delivering a streamlined shopping experience with an appealing design.

## Brief Overview of the Application’s Functionality:

The app will allow users to:
- Browse and search for products, including games, consoles, action figures, electronic accessories, and other geek items.
- Add products to a shopping cart and complete purchases securely.
- Create an account to access their order history.
- Explore detailed product pages with reviews and recommendations.
- Access an admin dashboard to add, update, and delete products.

## Technology Stack:

**Frontend:**
  - React.js for UI components.
  - React Router for navigation.
  - Tailwind CSS.

**Backend:**
  - Node.js with Express.js
  - JWT for user authentication.
    
**Database:**
  - MongoDB: To store products, users and orders information.
    
**Version Control:** GitHub for code collaboration.

**Stripe API** for payment integration.

## API Contract:

### USER ENDPOINTS

| Method | Path                                   | Description                                   | Requires Authorization? |
|--------|----------------------------------------|-----------------------------------------------|-------------------------|
| POST   | /api/auth/register                     | Create a new user                             | ❌                      |
| POST   | /api/auth/login                        | User Login                                    | ❌                       |
| GET    | /api/products                          | Get a list of products                        | ❌                       |
| GET    | /api/products/{id}                     | Get detail of a specific product              | ❌                       |
| GET    | /api/cart                              | Get the logged-in user's cart                 | ✅                      |
| POST   | /api/cart/add                          | Add a product to the cart                     | ✅                      |
| DELETE | /api/cart/remove/{product_id}          | Removes a product from the cart               | ✅                      |
| GET    | /api/orders                            | Fetches the list of orders for the logged-in user | ✅                    |
| POST   | /api/orders                            | Create a new order from the cart              | ✅                      |
| POST   | /api/products/{product_id}/reviews     | Add a review for a product                    | ✅                      |
| GET    | /api/products/{product_id}/reviews     | Fetches reviews for a specific product        | ❌                       |
| POST   | /api/payments                          | Process payment for an order                  | ✅                      |

### ADMIN ENDPOINTS

| Method | Path                                   | Description                                   | Requires Authorization? |
|--------|----------------------------------------|-----------------------------------------------|-------------------------|
| GET    | /api/admin/products                    | Fetches a list of products                    | ✅                      |
| POST   | /api/admin/products                    | Add a new product                             | ✅                      |
| PUT    | /api/admin/products/{product_id}       | Update existing products                      | ✅                      |
| DELETE | /api/admin/products/{product_id}       | Delete products                               | ✅                      |

## Links:

- **High-level architecture diagrams**: [View Diagram](https://lucid.app/lucidchart/b13d5c49-e829-4a05-a3c1-56975dd33176/edit?viewport_loc=-1227%2C-367%2C3580%2C1721%2C.Q4MUjXso07N&invitationId=inv_1f2f81b5-b638-42e0-a8bb-ce62f14c3ed4)
- **ER Diagrams**: [View Diagram](https://lucid.app/lucidchart/2516964d-9406-4b50-829e-2062abe0183f/edit?viewport_loc=-424%2C-333%2C2147%2C1032%2C0_0&invitationId=inv_6cb0c0ca-e2c5-42a2-bcc5-9f2e271609b7)



