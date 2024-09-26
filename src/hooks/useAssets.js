import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";




const useAssets = (assetType, itemsPerPage = 10) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [assets, setAssets] = useState([]);
  const [currentAssets, setCurrentAssets] = useState([]);
  const [statuses, setStatuses] = useState([0, 0, 0]);

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();





  useEffect(() => {
    setCurrentAssets(
      assets.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [page, assets]);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `${config.serverUrl}/axios/cards/fetchAssets.php`,
        { company_id: company_id, assets: assetType },
        headers
      )
      .then((response) => {
        const data = response.data;
        setAssets(data);
        setCurrentAssets(
          data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        );

        setStatuses([
          data.filter((item) => item[`${assetType}Status`] === "1").length,
          data.filter((item) => item[`${assetType}Status`] === "2").length,
          data.filter((item) => item[`${assetType}Status`] === "3").length,
        ]);

        setTimeout(() => {
          setLoading(false);
        }, 650);
      })
      .catch((error) => {
        console.error(error);
        throw error; // Упрощено для обробки помилок на рівні компонента
      });
  }, [company_id, assetType]);

  const handleDeleteItem = (itemId) => {
    const updatedAssets = assets.filter((item) => item.id !== itemId);
    setAssets(updatedAssets);

    const newTotalPages = Math.ceil(updatedAssets.length / itemsPerPage);
    if (page > newTotalPages) {
      setPage(newTotalPages);
    } else {
      setCurrentAssets(
        updatedAssets.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      );
    }

    setStatuses([
      updatedAssets.filter((item) => item[`${assetType}Status`] === "1").length,
      updatedAssets.filter((item) => item[`${assetType}Status`] === "2").length,
      updatedAssets.filter((item) => item[`${assetType}Status`] === "3").length,
    ]);
  };

  return {
    loading,
    page,
    setPage,
    assets,
    currentAssets,
    statuses,
    handleDeleteItem,
  };
};

export default useAssets;
