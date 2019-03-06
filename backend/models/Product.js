// Here I handle the data

// Dependencies

/* Sequelize is a promise-based ORM for Node.js v4 and up. It supports
the dialects PostgreSQL, MySQL, SQLite and MSSQL
and features solid transaction support, relations,
read replication and more.*/
import Sequelize from 'sequelize';

/* slug is for create slug for individual productName */
import slugFn from 'slug';

// Database info
import config from '../config/index';

// Database connection with sequelize
// Instance of Sequelize object (to define model, to do a query, to sync the table)
const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  operatorsAliases: true
});

// Removing extra response
const queryType = {
  type: Sequelize.QueryTypes.SELECT
};

// Here the product model
const ProductModel = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'The product name is empty',
      }
    }
  },
  productPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'The product price is empty'
      }
    }
  },
  productAvailable: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'The product available is empty'
      }
    }
  }
});

// Method to find all products
export function findAllProducts(callback) {
  db.query('SELECT * FROM products', queryType).then(data => {
    callback(data);
  });
}

// Method to find single product by slug
export function findProductBySlug(slug, callback) {
  db.query(`SELECT * FROM products WHERE slug = '${slug}'`, queryType).then(data => {
    callback(data);
  });
}

// Method to create new product
export function createProduct(productData, callback) {
  // ES6 destructuring obtaining all the properties from the object.
  const {
    productName,
    productPrice,
    productAvailable
  } = productData;

  db.
    .sync()
    .then(() => {
      ProductModel.create({ // using the product model and create method
        productName,
        slug: productName ? slugFn(productName, { lower: 'on' }): '',
        productPrice,
        productAvailable,
        author: 'Cristina Rojas'
      }).then((insertedProduct) => {
        console.log(insertedProduct);
        callback(insertedProduct.dataValues);
      }).catch((error) => {
        console.log(error);
        callback(false, error);
      });
    });
}


// Method for updating product
export function updateProduct(slug, productData, callback) {
  const {
    productName,
    productPrice,
    productAvailable
  } = productData;

  ProductModel.update( // Using the product model and update method
    {
      productName,
      slug: slugFn(product, { lower: 'on' }),
      productPrice,
      productAvailable
    },
    {
      where: { slug }
    }
  ).then(rowsUpdated => {
    console.log('Updated', rowsUpdated);
    callback(rowsUpdated);
  }).catch(error => {
    console.log(error);
    callback(false, error);
  });
}

// Method to delete product
export function removeProduct(slug, callback) {
  ProductModel.destroy({
    where: {
      slug
    }
  }).then(rowDeleted => {
    console.log('DELETED', rowDeleted);
    callback(rowDeleted);
  }).catch(error => {
    callback(false, error);
  });
}
