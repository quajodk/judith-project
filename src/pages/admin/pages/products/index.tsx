import React, { useEffect, useRef } from "react";
import { getAllProducts } from "../../../../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setDone } from "../../../../redux/reducers/app/appReducer";
import { productColumns } from "../../components/options";
import Table from "../../components/Table";

interface Props {}

const AdminProductsPage = (props: Props) => {
  const { allProduct, loadingProducts } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch(getAllProducts());
    dispatch(setDone(false));
  }, []);

  return (
    <div className="mt-8 px-4 sm:px-6">
      {allProduct && (
        <Table
          columns={productColumns}
          data={allProduct}
          loading={loadingProducts}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
