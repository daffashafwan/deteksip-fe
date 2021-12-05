import { gql } from "@apollo/client";


export const CREATE_SOAL = gql`
  mutation($soal: String!, $url: String!, $hint: String!) {
    insert_soal(objects: { soal_soal: $soal,  soal_url: $url, soal_hint: $hint}) {
        affected_rows
        returning{
            soal_id
            soal_soal
            soal_url
            soal_hint
        }
    }
  }
`

export const READ_SOAL = gql`
  query tebaggambar {
    soal {
        soal_id
        soal_soal
        soal_url
        soal_hint
    }
  }
`

export const UPDATE_SOAL = gql`
  mutation($id: Int!, $soal: String!, $url: String!, $hint: String!) {
    update_soal(
      where: {
          soal_id: {
          _eq: $id
          }
      }, 
      _set: {
        soal_hint: $hint, 
        soal_id: $id, 
        soal_soal: $soal, 
        soal_url: $url}
      ) {
      affected_rows
      returning{
        soal_id
        soal_soal
        soal_url
        soal_hint
      }
      }
  }
`


export const DELETE_SOAL = gql`
    mutation ($soal_id: Int) {
        delete_soal (
        where: {
            soal_id: {
            _eq: $soal_id
            }
        }
        ) {
        affected_rows
        }
    }
`

export const READ_USER = gql`
  query tebaggambar {
    user {
        user_id
        user_nama
        user_password
        user_username
    }
  }
`

export const READ_CHILD = gql`
  query tebaggambar {
    child {
      child_id
      child_nama
      child_password
      child_username
    }
  }
`

export const CREATE_CHILD = gql`
mutation($nama: String!, $username: String!, $password: String!) {
  insert_child(objects: {child_nama: $nama, child_password: $password, child_username: $username}) {
    affected_rows
    returning {
      child_id
      child_nama
      child_password
      child_username
    }
  }
}`