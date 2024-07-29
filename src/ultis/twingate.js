const axios = require('axios').default;
const log = require("../ultis/log");

const config = require("../../config.json");
require("dotenv").config();

const GetConnectorsQuery = `
        query connectors($before: String, $after: String, $first: Int, $last: Int, $filter: ConnectorFilterInput) {
            connectors(before: $before, after: $after, first: $first, last: $last, filter: $filter) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                edges {
                    node {
                        createdAt
                        updatedAt
                        lastHeartbeatAt
                        hostname
                        id
                        name
                        remoteNetwork {
                            id
                            name
                        }
                        state
                        hasStatusNotificationsEnabled
                        version
                        publicIP
                        privateIPs
                    }
                    cursor
                }
                totalCount
            }
        }
        `;

async function SendRequest(variables, query) {
    try {
        const response = await axios.post(`https://${config.TwingateNetwork}.twingate.com/api/graphql/`,
            {
                query: query,
                variables: variables
            },
            {
                headers: {
                    'x-api-key': process.env.TWINGATE_TOKEN,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (err) {
        if (err.response) {
            // Server responded with a status other than 200 range
            log(`Error: ${err.response.status} - ${err.response.statusText}`);
            log(`Data: ${JSON.stringify(err.response.data, null, 2)}`);
            return 1
        } else if (err.request) {
            // Request was made but no response was received
            log(`No response received: ${err.request}`);
            return 1
        } else {
            // Something else happened in setting up the request
            log(`Error: ${err.message}`);
            return 1
        }
    }
}

module.exports.getConnectors = async function getConnectors(FetchLimit = 10, before = null, after = null, last = null, filters = {}) {
    const variables = {
        before: before,
        after: after,
        first: FetchLimit,
        last: last, 
        filter: filters,
    };

    const requestResult = await SendRequest(variables, GetConnectorsQuery)
    return requestResult
}
