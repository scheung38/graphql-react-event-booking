const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();

// app.get('/', (err, res) => {
//     res.send('Hello World!');
// })

const events = []; // temp variable

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`

    type Event {
        _id: ID!
        title:  String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }
     
    type RootQuery {
        events: [Event!]!

    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.date
            };
            console.log(args);
            events.push(event);

            return event;
            // const eventName = args.name;
            // return eventName;
        }
    },
    graphiql: true
})
);


app.listen(3000);


// Examples of queries
// query {
//     events
//   }

//   {
//     "data": {
//       "events": [
//         "Romantic Cooking",
//         "Sailing",
//         "All-Night Coding"
//       ]
//     }
//   }


// mutation {
//     createEvent(name: "Bagua")
//   }

//   {
//     "data": {
//       "createEvent": "Bagua"
//     }
//   }


// mutation {
// createEvent(eventInput: { title: "A test", description: "Do", price: 9.99, date: "2019-01-21T22:43:02.078Z" })
// {
//   title
//   description
//  }
// }

// {
//    "data": {
//      "createEvent": {
//      "title": "A test",
//      "description": "Do"
//   }
//  }
// }

// mutation {
// createEvent(eventInput: { title: "A test", description: "Do", price: 9.99, date: "2019-01-21T22:43:02.078Z" })
// {
//   title
//   price
// }
// }

// {
//     "data": {
//       "createEvent": {
//       "title": "A test",
//       "price": 9.99
//         }
//     }
// }