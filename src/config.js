import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

export const access_token_bitly = '88ef56ebc43804ccc3587749be29832bcb801237';

export const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://one-sunfish-49.hasura.app/v1/graphql",
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': `ZtW4sekFYGobtcnxvUW4favcgKMArvwTnDuT7kMv7mtXDr3sO07dz0az6J7SwVZo`
        }
    }),
    cache: new InMemoryCache(),
  });