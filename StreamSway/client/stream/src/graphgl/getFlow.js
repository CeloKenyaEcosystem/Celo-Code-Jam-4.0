import { gql } from "graphql-tag";

export const GET_STREAMS = gql`
  query {
    streams(
      where: { sender: "0x37c123d902f4383ee13ae8445e2477a364930394", receiver: "0x65e28c9c4ef1a756d8df1c507b7a84efcf606fd4" }
    ) {
      token {
        id
        symbol
      }
      createdAtTimestamp
      updatedAtTimestamp
      currentFlowRate
      streamedUntilUpdatedAt
    }
  }
`;

export const endpoint = "https://celo-mainnet.subgraph.x.superfluid.dev/";
