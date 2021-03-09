"use strict";

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


module.exports.createBlog = async (event) => {
    const requestBody = JSON.parse(event.body);
    const title = requestBody.title;
    const categories = requestBody.categories;
    const meta = requestBody.meta;

    if (
        typeof title !== "string" ||
        typeof categories !== "object" ||
        typeof meta !== "object"
    ) {
        console.error("Validation Failed");
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: "Error: Validation Failed!",
                },
                null,
                2
            ),
        }
    }

    submitContext(blogContext(title, meta))
        .then(submitCategories(categories))
            .then(res => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(
                        {
                            message: `Sucessfully submitted candidate with email ${email}`,
                            blogLink: res.PK,
                        },
                        null,
                        2
                    ),
                };
            })
            .catch(err => {
                console.log(err);
                return {
                    statusCode: 200,
                    body: JSON.stringify(
                        {
                            message: `Unable to submit candidate with email ${email}`,
                        },
                        null,
                        2
                    ),
                };
              });

};



const submitContext = context => {
    console.log('Submitting context');
    // Submit the blog Context to DynamoDb
}

const submitCategories = categories => {
    let i=1;
    array.forEach(element => {
        blogCategories(element, i++)
        // Submit the blog category to DynamoDB
    });
}

const blogCategories = (category, index) => {
    return {
        PK: slugify(title),
        SK: `Category#${index}`,
        category: category,
    };
}

const blogContext = (title, meta) => {
    const timestamp = new Date().getTime();
    return {
        PK: slugify(title),
        SK: "Context#1",
        title: title,
        image: meta.image ? meta.image : undefined,
        author: meta.author ? meta.author : undefined,
        caption: meta.caption ? meta.caption : undefined,
        description: meta.description ? meta.description : undefined,
        body: meta.body ? meta.body : undefined,
        submittedAt: timestamp,
        updatedAt: timestamp,
    };
}


module.exports.deleteBlog = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Delete Blog!",
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
                message: "Update Blog!",
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
                message: "View Blog!",
                input: event,
            },
            null,
            2
        ),
    };
};
