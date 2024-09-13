import { generateClient } from 'aws-amplify/api';

const client = generateClient();

async function getUser(id: string) {
    const result: any = await client.graphql({ query: `
        query MyQuery {
            getUserHistory(id: "${id}") {
                createdAt
                id
            }
            getUser(id: "${id}") {
                age
            }
        }
        `
    });

    return Object.values(result?.data).reduce((acc: any, value: any) => ({ ...acc, ...value }), {});
}

async function updateUserAge(id: string, age: number) {
    let result: any;

    try {
        result = await client.graphql({ query: `
mutation MyMutation {
  updateUser(input: {age: ${age}, id: "${id}"}) {
    age
    id
  }
}
            `
        });
    } catch (error) {
        result = await client.graphql({ query: `
            mutation MyMutation {
                createUser(input: {age: ${age}, id: "${id}"}) {
                   age
                   id
                }
            }
        `
        });
    }

    return result?.data;
}

export {
    getUser,
    updateUserAge
};