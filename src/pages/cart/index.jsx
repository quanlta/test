import { Button, Image, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axios";
import { toast } from "react-toastify";
import styles from "./CartPage.module.scss";
import { clearAll } from "../../redux/features/cartSlice";

function CartPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [shops, setShops] = useState([]);
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await api.get("/coffeeshops");
        console.log("Fetched shops:", response.data); // Debug log
        setShops(response.data);
      } catch (err) {
        toast.error("Failed to fetch shops");
      }
    };

    fetchShops();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getShopName = (shopId) => {
    console.log("Finding shop with ID:", shopId); // Debug log
    const shop = shops.find((shop) => shop.id === shopId);
    console.log("Found shop:", shop); // Debug log
    return shop ? shop.name : "Unknown Shop";
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => {
        return <Image className={styles["cart-image"]} src={img} width="200px" height="200px"></Image>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Shop",
      dataIndex: "shopId",
      render: (shopId) => getShopName(shopId),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleBuy = async () => {
    try {
      const productBought = data.filter((product) => selectedRowKeys.includes(product.id));
      const detail = productBought.map((product) => ({
        shopId: product.shopId,
        productId: product.id,
        quantity: product.quantity,
      }));
      const response = await api.post("orders", { detail: detail });
      dispatch(clearAll());
      console.log(response.data);
      window.open(response.data);
    } catch (err) {
      toast.error("Purchase failed");
    }
  };

  return (
    <div className={styles["cart-page"]}>
      <Button
        className={`${styles["cart-button"]} ${styles["clear"]}`}
        onClick={() => dispatch(clearAll())}
      >
        Clear
      </Button>
      <Table
        className={styles["cart-table"]}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
      <Button
        className={`${styles["cart-button"]} ${styles["buy"]}`}
        onClick={handleBuy}
      >
        Buy
      </Button>
    </div>
  );
}

export default CartPage;