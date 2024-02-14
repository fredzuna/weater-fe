import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokenFromLocalStorage } from './Api';
import { API_BASE_URL } from './ApiConfig';

export const CreateApolloClient = () => {
    let uri = `${API_BASE_URL}/graphql`;

    const httpLink = createHttpLink({
        uri,
    });

    const authLink = setContext(async (_, { headers }) => {
        const token = getTokenFromLocalStorage();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};
