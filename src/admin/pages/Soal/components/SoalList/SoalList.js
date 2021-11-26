import React from "react";
import { useQuery } from "@apollo/client";
import Soal from './Soal';
import { READ_SOAL } from "../../../../../graphql/queries";
import './SoalList.css';

const SoalList = () => {
    const { loading, error, data } = useQuery(READ_SOAL);

    if (loading) {
        return <div className="tasks">Loading...</div>;
    }
    if (error) {
        console.log(error);
        return <div className="tasks">Error !</div>;
    }
    console.log(data.soal);
    return (
        <div className="SoalList">
          {data.soal.map((soals) => (
            <Soal key={soals.soal_id} soal={soals} />
          ))}
        </div>
      );
};

export default SoalList;