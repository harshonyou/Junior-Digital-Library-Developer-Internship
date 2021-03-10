'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient(/*{ apiVersion: '2012-08-10' }*/);
const { v4: uuidv4 } = require('uuid');
const blogsTable = process.env.BLOGS_TABLE;

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

function slugify (str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  return str;
}

module.exports.createPost = (event, context, callback) => {
  const request = JSON.parse(event.body);

  if (
    !request.title ||
    request.title.trim() === '' ||
    !request.categories ||
    typeof request.categories != "object"
  ) {
    return callback(
      null,
      response(400, {
        error: 'Post must have a title and body and they must not be empty',
        request: request
      })
    );
  }

  request.categories.forEach(element => {
    const category = {
      PK: "Blog#"+slugify(request.title),
      SK: "Category#"+uuidv4(),
      category: element,
      createdAt: new Date().toISOString(),
    };
    db
      .put({
        TableName: blogsTable,
        Item: category
      })
      .promise()
      .catch((err) => response(null, response(err.statusCode, err)))
  })

  callback(null, response(201, {
    message: 'Categories Created Successfully!',
    request: request
  }));

};