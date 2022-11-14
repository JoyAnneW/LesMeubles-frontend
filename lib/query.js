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
            attributes{formats}
          }
        }
      }
    }
  }
}`;
