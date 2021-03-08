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


module.exports.createBlog = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Create Blog!',
        input: event.rawQueryString === "" ? "" : event.queryStringParameters,
      },
      null,
      2
    ),
  };
};

module.exports.deleteBlog = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Delete Blog!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.updateBlog = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Update Blog!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.viewBlog = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'View Blog!',
        input: event,
      },
      null,
      2
    ),
  };
};
