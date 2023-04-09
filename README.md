
# Store API

This is a simple NodeJS and ExpressJS based API that allows filtering and sorting of store items based on various criteria such as featured, company, name, sort, fields, page, limit, and numericFilters.

## Installation

1. Clone the repository
2. Install dependencies using npm install
3. Run node populate.js to generate products
4. Start the server using npm start

## Usage

The API provides the following endpoints:

### GET /api/v1/products
Retrieves all products.

### GET /api/v1/products?<criteria>
Retrieves products based on the specified filtering and sorting criteria. The following query parameters can be used:

- `featured`: boolean (true/false)
- `company`: string (name of company)
- `name`: string (name of product)
- `sort`: string (name,price,rating,createdAt)
- `fields`: string (comma-separated list of fields to include in the response)
- `page`: number (page number)
- `limit`: number (number of items per page)
- `numericFilters`: string (comma-separated list of numeric filters in the format of price>30, which means price greater than 30)
