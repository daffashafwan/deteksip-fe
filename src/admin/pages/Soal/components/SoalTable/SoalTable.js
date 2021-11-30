import React, { useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { READ_SOAL, DELETE_SOAL } from "../../../../../graphql/queries";
import { SoalContext } from "../../contexts/SoalContext";
import Swal from "sweetalert2";

const SoalTable = () => {
  const { loading, error, data } = useQuery(READ_SOAL);
  const [deleteSoalMutation] = useMutation(DELETE_SOAL);
  const { onEdit, formStateContext, setOnEdit, setFormStateContext } = useContext(SoalContext);

  const HandleDelete = (soal_id) => {

    Swal.fire({
      title: 'Antum yakin Mau Hapus ?',
      text: "Ntar input lagi lho kalo dihapus",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Iya'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSoalMutation({
          variables: { soal_id: soal_id },
          optimisticResponse: true,
          update: (cache) => {
            const existingSoal = cache.readQuery({ query: READ_SOAL });
            const soals = { soal: existingSoal.soal.filter((t) => t.soal_id !== soal_id) }
            cache.writeQuery({
              query: READ_SOAL,
              data: soals
            });
          },
        });
        Swal.fire(
          'Terhapus',
          'Sudah Terhapus, nda bisa',
          'success'
        )
      }
    })
  };

  const HandleEdit = (soal_id) => {
    setOnEdit(true);
    data.soal.forEach((k, v) => {
      if (k.soal_id === soal_id) {
        setFormStateContext({
          id: k.soal_id,
          soal: k.soal_soal,
          url: k.soal_url,
          hint: k.soal_hint,
        })
      }
    })
  };

  const HandlePreview = (soal_id) => {
    data.soal.forEach((k, v) => {
      if (k.soal_id === soal_id) {
        Swal.fire({
          imageUrl: k.soal_url,
          imageHeight: 100,
          title: k.soal_soal,
          text: k.soal_hint,
          imageAlt: 'A tall image'
        })
      }
    })
  }

  const columns = [{
    dataField: 'soal_id',
    text: 'Soal ID'
  }, {
    dataField: 'soal_soal',
    text: 'Soal'
  }
    , {
    dataField: 'soal_hint',
    text: 'Hint'
  }
    , {
    dataField: "remove",
    text: "Delete",
    formatter: (cellContent, row) => {
      return (
        <div>
          <button
            className="m-2 btn btn-warning btn-xs"
            onClick={() => HandlePreview(row.soal_id)}
          >
            Preview
          </button>
          <button
            className="m-2 btn btn-primary btn-xs"
            onClick={() => HandleEdit(row.soal_id)}
          >
            Edit
          </button>
          <button
            className="m-2 btn btn-danger btn-xs"
            onClick={() => HandleDelete(row.soal_id)}
          >
            Delete
          </button>
        </div>
      );
    },
  },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error !</div>;
  }
  return (
    <div className="SoalList">
      <BootstrapTable wrapperClasses="table-responsive" keyField='soal_id' data={data.soal} columns={columns} />
    </div>
  );
}

export default SoalTable;