"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
var slugify = require("slugify");

const blogsTable = process.env.blogsTable;

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}

// Sorting by Date Function
function sortByDate(a, b) {
  return a.createdAt > b.createdAt ? -1 : 1;
}

// Create Post Function
module.exports.createPost = (event, context, callback) => {
  const request = JSON.parse(event.body);

  const blog = {
    PK: slugify(request.title),
    SK: "Context",
    categories: request.categories,
    title: request.title,
    image: request.meta.image,
    author: request.meta.author,
    caption: request.meta.caption,
    description: request.meta.description,
    body: request.meta.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return db
    .put({
      TableName: blogsTable,
      Item: blog,
    })
    .promise()
    .then(() => {
      callback(
        null,
        response(201, {
          message: "Blog Created Successfully!",
          request: request,
        })
      );
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

// Get All Posts
module.exports.getAllPosts = (event, context, callback) => {
  return db
    .scan({
      TableName: blogsTable,
      FilterExpression: "begins_with(#key, :val)",
      ExpressionAttributeNames: {
        "#key": "SK",
      },
      ExpressionAttributeValues: {
        ":val": "Context",
      },
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get Number of Posts
module.exports.getPosts = (event, context, callback) => {
  const numberOfPosts = event.pathParameters.number;

  const params = {
    TableName: blogsTable,
    FilterExpression: "begins_with(#key, :val)",
    ExpressionAttributeNames: {
      "#key": "SK",
    },
    ExpressionAttributeValues: {
      ":val": "Context",
    },
    Limit: numberOfPosts,
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
      SK: "Context",
    },
    TableName: blogsTable,
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: "Post not found" }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Delete Spesific Post
module.exports.deletePost = (event, context, callback) => {
  const PK = event.pathParameters.id;

  const params = {
    Key: {
      PK: PK,
      SK: "Context",
    },
    TableName: blogsTable,
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: "Post deleted successfully" }))
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
      SK: "Context",
    },
    TableName: blogsTable,
    ConditionExpression: "attribute_exists(PK)",
    UpdateExpression:
      "SET title = :title, body = :body, updatedAt = :timestamp",
    ExpressionAttributeValues: {
      ":title": title,
      ":body": body,
      ":timestamp": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
  console.log("Updating");

  return db
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};