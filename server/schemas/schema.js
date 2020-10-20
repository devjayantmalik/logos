const graphql = require("graphql");

const base_url = "http://localhost:4500";

let cart = [];

const logos = [
  {
    id: "1",
    url: `${base_url}/images/subash.svg`,
    price: 1,
  },
  {
    id: "2",
    url: `${base_url}/images/bhim.svg`,
    price: 5,
  },
  {
    id: "3",
    url: `${base_url}/images/google-pay.svg`,
    price: 40,
  },
  {
    id: "4",
    url: `${base_url}/images/myAvatar.svg`,
    price: 10,
  },
  {
    id: "5",
    url: `${base_url}/images/paytm.svg`,
    price: 10,
  },
  {
    id: "6",
    url: `${base_url}/images/phonepe.svg`,
    price: 10,
  },
  {
    id: "7",
    url: `${base_url}/images/upi.svg`,
    price: 10,
  },
];

const LogoSchemaType = new graphql.GraphQLObjectType({
  name: "Logo",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    url: { type: graphql.GraphQLString },
    price: { type: graphql.GraphQLInt },
  }),
  args: {
    id: { type: graphql.GraphQLID },
  },
  resolve(parent, args) {
    return logos.filter((logo) => logo.id === args.id);
  },
});

const CartItemType = new graphql.GraphQLObjectType({
  name: "CartItem",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    logo: {
      type: LogoSchemaType,
      resolve(parent, args) {
        return logos.find((logo) => parent.id === logo.id);
      },
    },
  }),
});

const mutations = new graphql.GraphQLObjectType({
  name: "Mutations",
  fields: () => ({
    addToCart: {
      type: LogoSchemaType,
      args: {
        id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
      },
      resolve(parent, args) {
        cart.push({ id: args.id });
        return logos.find((item) => item.id === args.id);
      },
    },
    removeFromCart: {
      type: LogoSchemaType,
      args: {
        id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
      },
      resolve(parent, args) {
        cart = cart.filter((item) => item.id !== args.id);
        return logos.find((item) => item.id === args.id);
      },
    },
  }),
});

const RootSchemaType = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    logo: {
      type: LogoSchemaType,
    },
    cart: {
      type: CartItemType,
    },
    cartItems: {
      type: graphql.GraphQLList(CartItemType),
      resolve(parent, args) {
        return cart;
      },
    },
    logos: {
      type: graphql.GraphQLList(LogoSchemaType),
      resolve(parent, args) {
        return logos;
      },
    },
    cartItems: {
      type: graphql.GraphQLList(CartItemType),
      resolve(parent, args) {
        return cart;
      },
    },
  }),
});

module.exports = new graphql.GraphQLSchema({
  query: RootSchemaType,
  mutation: mutations,
});
