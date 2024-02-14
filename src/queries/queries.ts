import { gql } from '@apollo/client';

export const GET_USERS_AND_ROLES = gql`
    query {
        usersRoles {
        id
        email
        address
        userRoles {
            id
            createdDate
            role {
            id
            name
            }
        }
        }
    }
`;

export const GET_USER_AND_ROLE = gql`
  query($userId: Int!) {
    userRole(id: $userId) {
      id
      email
      address
      userRoles {
        id
        createdDate
        role {
          id
          name
        }
      }
    }
  }
`;

export const EDIT_USER_ROLES = gql`
  mutation($userRoleInput: EditUserRoleDto!) {
    editUserRole(userRoleInput: $userRoleInput) {
      id
      createdDate
      role {
        id
        name
      }
    }
  }
`;

export const GET_ROLES = gql`
  query {
    roles {
      id
      name      
    }
  }
`;