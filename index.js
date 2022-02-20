const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 8000;

const apiKey = "28917c109c988310f6e127b9a527ea58";
const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    response: {
      title: "An Amazon Web API",
      description:
        "This is a Web API which allows for clients to use data from Amazon. To get started, please add the endpoint '/search/ANY_PRODUCT_NAME",
      creator: {
        firstName: "Harshil",
        lastName: "Shah",
      },
    },
  });
});

//Get search queries
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;
  
    try {
      const response = await request(
        `${baseURL}&url=https://www.amazon.com/s?k=${searchQuery}`
      );
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });


//general info for products page
app.get("/products", (req, res) => {  
    res.status(200).send({
        response: {
          title: "Product Details",
          description:
            "To access product details, please add a product ID endpoint to the API URI",
          creator: {
            firstName: "Harshil",
            lastName: "Shah",
          },
        },
      });
  });

//Get Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseURL}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
    const { productId } = req.params;
  
    try {
      const response = await request(
        `${baseURL}&url=https://www.amazon.com/product-reviews/${productId}`
      );
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
