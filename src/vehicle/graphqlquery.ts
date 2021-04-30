import { gql } from "graphql-request";

export const GET_TEAM_QUERY = gql `
    query{
             vehicleById(id:int) {
                nodeId
               id
               firstName
               lastName
               email
               carMake
               carModel
               vinNumber
               manufacturedDate
               ageOfVehicle
         }
        }
`;