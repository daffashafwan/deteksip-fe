import React, { useState } from "react";
import { gql } from "@apollo/client";


export const CREATE_SOAL = gql`
  mutation($soal: String!, $url: String!) {
    insert_soal(objects: { soal_soal: $soal,  soal_url: $url}) {
        affected_rows
        returning{
            soal_id
            soal_soal
            soal_url
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
    }
  }
`

export const UPDATE_SOAL = gql`
  mutation($id: Int!, $soal: String!, $url: String!) {
    update_soal_by_pk(
      pk_columns: {soal_id: $id }
      _set: { soal_soal: $soal, soal_url: $url }
    ) {
      soal_id
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