'use strict';
// Main Program Starts Here

//
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
var slugify = require('slugify')
//
const blogsTable = process.env.BLOGS_TABLE;

// Sending Response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

// Sorting by Date Function
function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
}


// Create Post Function
// Remarks: Everything Works Perfectly as Intended
module.exports.createPost = (event, context, callback) => {
  const request = JSON.parse(event.body);

  // Validating Data
  if (
    !request.title ||
    request.title.trim() === '' ||
    // !request.categories ||
    // typeof request.categories != "object" ||
    !request.meta ||
    typeof request.meta != "object"
  ) {
    return callback(
      null,
      response(400, {
        error: 'Post must have a title and body and they must not be empty',
        request: request
      })
    );
  }

  // //Updating Every Category
  // request.categories.forEach(element => {
  //   const category = {
  //     PK: slugify(request.title),
  //     SK: "Category",
  //     category: element,
  //     createdAt: new Date().toISOString(),
  //   };
  //   db
  //     .put({
  //       TableName: blogsTable,
  //       Item: category
  //     })
  //     .promise()
  //     .catch((err) => response(null, response(err.statusCode, err)))
  // })

  // Storing Blog Context
  const blog = {
    PK: slugify(request.title),
    SK: "Context",
    title: request.title,
    image: request.meta.image ? request.meta.image : undefined,
    author: request.meta.author ? request.meta.author : undefined,
    caption: request.meta.caption ? request.meta.caption : undefined,
    description: request.meta.description ? request.meta.description : undefined,
    body: request.meta.body ? request.meta.body : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // Updating Blog Context and Returning Message
  return db
  .put({
    TableName: blogsTable,
    Item: blog
  })
  .promise()
  .then(() => {
    callback(null, response(201, {
      message: 'Blog Created Successfully!',
      request: request
    }));
  })
  .catch((err) => response(null, response(err.statusCode, err)));
};

// Get All Posts
module.exports.getAllPosts = (event, context, callback) => {

  // Returnign Only Posts using Filter
  return db
    .scan({
      TableName: blogsTable,
      // ProjectionExpression: "title",
      FilterExpression: "begins_with(#key, :val)",
      ExpressionAttributeNames: {
          "#key": "SK"
      },
      ExpressionAttributeValues: {
        ":val": "Context"
      }
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate) ));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get Number of Posts
module.exports.getPosts = (event, context, callback) => {
  const numberOfPosts = event.pathParameters.number;

  // Scaning for number of objects which are posts
  const params = {
    TableName: blogsTable,
    FilterExpression: "begins_with(#key, :val)",
      ExpressionAttributeNames: {
          "#key": "SK"
      },
      ExpressionAttributeValues: {
        ":val": "Context"
      },
    Limit: numberOfPosts
  };
  return db
    .scan(params)
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};


// Get spesific Post
module.exports.getPost = (event, context, callback) => {
  const PK = event.pathParameters.id;

  const params = {
    Key: {
      PK: PK,
      SK: "Context"
    },
    TableName: blogsTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'Post not found' }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Delete Spesific Post
module.exports.deletePost = (event, context, callback) => {
  const PK = event.pathParameters.id;
  const params = {
    Key: {
      PK: PK,
      SK: "Context"
    },
    TableName: blogsTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Post deleted successfully' }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Update a post
module.exports.updatePost = (event, context, callback) => {
  const PK = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { body, title } = reqBody;

  const params = {
    Key: {
      PK: PK,
      SK: "Context"
    },
    TableName: blogsTable,
    ConditionExpression: 'attribute_exists(PK)',
    UpdateExpression: 'SET title = :title, body = :body, updatedAt = :timestamp',
    ExpressionAttributeValues: {
      ':title': title,
      ':body': body,
      ':timestamp': new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  };
  console.log('Updating');

  return db
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};