'use strict';

// Pre-rendered Function
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



// Main Program Starts Here

//
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient(/*{ apiVersion: '2012-08-10' }*/);
const { v4: uuidv4 } = require('uuid');

//
const blogsTable = process.env.BLOGS_TABLE;

// Sending Response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

// Slugify Function
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
    !request.categories ||
    typeof request.categories != "object" ||
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

  //Updating Every Category
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

  // Storing Blog Context
  const blog = {
    PK: "Blog#"+slugify(request.title),
    SK: "Context#1"+uuidv4(),
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
// Remard: Everything works as intended but you may get
// two version of same post, as it does not hide the older
// versions, and show every changes.
module.exports.getAllPosts = (event, context, callback) => {

  // Returnign Only Posts using Filter
  return db
    .scan({
      TableName: blogsTable,
      // ProjectionExpression: "title",
      FilterExpression: "begins_with(#key1, :val1) and begins_with(#key2, :val2)",
      ExpressionAttributeNames: {
          "#key1": "PK",
          "#key2": "SK"
      },
      ExpressionAttributeValues: {
        ":val1": "Blog#",
        ":val2": "Context#"
      }
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate) ));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get Number of Posts
// Remark: It does the work but not as intended,
// for example If you want suppose 5 posts,
// it will fetch 5 objects from the Db and then do filter on them
// Thus if 2 objects get left out it will only show 3 posts,
// Even tho 5 posts were intended to have
module.exports.getPosts = (event, context, callback) => {
  const numberOfPosts = event.pathParameters.number;

  // Scaning for number of objects which are posts
  const params = {
    TableName: blogsTable,
    FilterExpression: "begins_with(#key1, :val1) and begins_with(#key2, :val2)",
      ExpressionAttributeNames: {
          "#key1": "PK",
          "#key2": "SK"
      },
      ExpressionAttributeValues: {
        ":val1": "Blog#",
        ":val2": "Context#"
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
// Remark: Error
// Postman returns this object
// {
//   "message": "The provided key element does not match the schema",
//   "code": "ValidationException",
//   "time": "2021-03-11T11:11:35.253Z",
//   "requestId": "HK504V6CFMVA9QH15MJMDF9H5FVV4KQNSO5AEMVJF66Q9ASUAAJG",
//   "statusCode": 400,
//   "retryable": false,
//   "retryDelay": 23.95629035583733
// }
module.exports.getPost = (event, context, callback) => {
  const PK = event.pathParameters.PK;

  const params = {
    Key: {
      PK: "Blog#"+pk
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
// Remark: Same Error
module.exports.deletePost = (event, context, callback) => {
  const PK = event.pathParameters.PK;
  const params = {
    Key: {
      PK: PK
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

//For Update Posts, i did create the create function but if we want
//to use it more effectively then we have either have to all meta data
//within meta column wihtin DB and have every Conext as context
//not with Context#ID since ID is very randomly generate and there is
//no way to access that ID


//This is an example of how data is stored in DB for one object
/*
{
  "category": "Lifestyle",
  "createdAt": "2021-03-10T13:49:27.140Z",
  "PK": "Blog#the-legal-drug",
  "SK": "Category#ad922e52-8651-418b-86ff-b605b1569fcc"
},
{
  "author": "Harsh Mohan",
  "caption": "The Legal Drug",
  "createdAt": "2021-03-10T13:49:27.199Z",
  "description": "From the very beginning, we have been told not to form any sort of addiction, yet we are enslaved to coffee. We keep on consuming it and till that extinct when our body receives more coffee than water as a liquid intake.  There is no way coffee is any less addictive than any sort of drugs, but this one is like a cute little one within the devils.",
  "image": "06-taylor-hill-paris.jpg",
  "PK": "Blog#the-legal-drug",
  "SK": "Context#141781eed-1e32-4cc4-b459-85970d44d1f1",
  "title": "The Legal Drug",
  "updatedAt": "2021-03-10T13:49:27.199Z"
},
{
  "author": "Harsh Mohan",
  "caption": "The Legal Drug",
  "createdAt": "2021-03-10T13:49:27.199Z",
  "description": "Any sort of addiction, yet we are enslaved to coffee. We keep on consuming it and till that extinct when our body receives more coffee than water as a liquid intake.  There is no way coffee is any less addictive than any sort of drugs, but this one is like a cute little one within the devils.",
  "image": "06-taylor-hill-paris.jpg",
  "PK": "Blog#the-legal-drug",
  "SK": "Context#141781eed-1e32asdasd59-85970d44d1f1",
  "title": "The Legal Drug",
  "updatedAt": "2021-04-10T13:49:27.199Z"
}
*/