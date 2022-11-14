export const PRODUCT_QUERY = `query{
  products{
    data{
      attributes{
        name
        description
        price
        slug
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;

// getProduct based on its slug that is of type string. ! means it's required.
// strapi syntax - get the product where the slug property is the same as the $slug variable passed
export const GET_PRODUCT_QUERY = `
query getProduct($slug: String!){
  products(filters: {slug: {eq: $slug}}){
    data{
      attributes{
        name
        description
        price
        slug
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;
