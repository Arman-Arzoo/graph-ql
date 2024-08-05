export const typeDefs = `#graphql
type Game{
    id:ID!
    title:String!
    platform: [String!]!  

}
type Review {
    id:ID!
    rating:Int!
    content:String!
}

type Author {
    id:ID!
    name:String!
    verified:Boolean!

}
type Query{
    reviews:[Review]
    games:[Game]
    authors:[Author]
}
`;
// DataType would be => int, float , string,boolean,ID
// id:ID!   ! mean the filed is required if not it not requried
