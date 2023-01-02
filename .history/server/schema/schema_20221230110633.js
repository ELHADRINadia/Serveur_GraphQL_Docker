const { projects, clients} = require('../sampleData.js')
 // mongoose models
 const Project = require('../models/Project');
 const Client =require('../models/Client');





const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    // GraphQLNonNull,
    // GraphQLEnumType,
} = require('graphql') 

// Project type
// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});
// client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
  });
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      project: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          return projects.find();
        },
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return projects;
        },
      },
      clients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
          return clients.find();
        },
      },
      client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Client.findById(args.id);
        },
      },
    },
  });
module.exports = new GraphQLSchema({
    query: RootQuery
});