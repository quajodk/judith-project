import React, { useEffect, useMemo, useRef, useState } from "react";
import Toggle from "./ToggleComponent";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useHistory, useParams } from "react-router";
import { uuid } from "uuidv4";
import ProductFileInput from "./ProductFileInput";
import ProductMediaInput from "./ProductMediaInput";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addProduct, getCategories } from "../../../redux/actions/appActions";
import Modal from "../../../components/Modal";
import AddCategory from "./AddCategory";
import _ from "lodash";
import useGetProduct from "../../../hooks/useGetProduct";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {};

const EditProduct = (props: Props) => {
  let { id } = useParams<{ id?: string }>();
  id = useMemo(() => (id ? id : uuid()), [id]);

  const { product, loading, error } = useGetProduct(id);

  const [enabled, setEnabled] = useState(false);
  const [currency, setCurrency] = useState<string>();
  const [tags, setTags] = useState<Record<string, any>[]>([]);
  const [category, setCategory] = useState<Record<string, any>[]>([]);
  const [productObj, setProductObj] = useState<Record<string, any>>({});
  const [productName, setProductName] = useState("Product will show here!");
  const [productFileUrl, setProductFileUrl] = useState<string>();
  const [productMediaUrl, setProductMediaUrl] = useState<string>();
  const [openModal, setOpenModal] = useState(false);
  const [ext, setExt] = useState("");
  const dispatch = useAppDispatch();
  const { categories, addingProduct, done } = useAppSelector(
    (state) => state.app
  );
  const history = useHistory();

  const categoryOptions = useMemo(() => {
    return categories
      ? categories.map((category) => ({
          value: category,
          label: _.startCase(_.toLower(category.name)),
        }))
      : [];
  }, [categories]);

  const init = useRef({ dispatch, history });

  useEffect(() => {
    if (product) {
      setProductObj(product);
      setEnabled(product.isAvailable);
      setProductFileUrl(product?.productFile);
    }
  }, [product]);

  useEffect(() => {
    const { dispatch, history } = init.current;
    dispatch(getCategories());
    if (done) {
      history.push("/admin/en/products");
    }
  }, [done]);

  const handleChange = (e: any) => {
    setTags(e.map((e: any) => ({ value: e.value, label: e.label })));
  };

  const onCategoryChange = (e: any) => {
    setCategory(e.map((e: any) => ({ ...e.value })));
  };

  const onInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setProductObj((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const product = {
      id,
      ...productObj,
      price: parseFloat(productObj.price),
      currency: currency ?? "GHS",
      tags,
      productFile: productFileUrl,
      imageSrc: productMediaUrl,
      isAvailable: enabled,
      imageAlt: productObj.title.toLowerCase().replace(/\s/g, "-"),
      categories: category,
      fileType: ext,
      createdAt: new Date(),
    };
    console.log(product);
    dispatch(addProduct(product));
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <AiOutlineLoading className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <form
        className="space-y-8 divide-y divide-gray-200 sm:px-6 lg:px-8 px-4 py-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={productObj.title}
                    autoComplete="title"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300 py-3"
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-black "
                >
                  Product price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productObj.price}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    onChange={onInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      onChange={(e) => {
                        setCurrency(e.target.value);
                      }}
                      defaultValue={"GHS"}
                    >
                      <option value="GHS">GHS</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={productObj.description}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    onChange={onInputChange}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about the product.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product file
                </label>
                <ProductFileInput
                  id={id}
                  setProductName={setProductName}
                  productName={productName}
                  setProductFileUrl={setProductFileUrl}
                  setExt={setExt}
                  fileId={product?.productFile}
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product image
                </label>
                <ProductMediaInput
                  id={id}
                  setProductMediaUrl={setProductMediaUrl}
                  isEditing={true}
                  originalUrl={product?.imageSrc}
                />
              </div>

              <div className="sm:col-span-6">
                <Toggle
                  enabled={enabled}
                  setEnabled={() => setEnabled(!enabled)}
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="product-tags"
                  className="text-sm font-medium flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">
                    Product category
                  </span>
                  <span
                    className="text-sm text-blue-700 cursor-pointer"
                    onClick={() => setOpenModal(true)}
                  >
                    Add category
                  </span>
                </label>
                <div className="mt-1">
                  <Select
                    isClearable={false}
                    onChange={onCategoryChange}
                    options={categoryOptions}
                    // defaultValue={product ? product?.category : null}
                    placeholder="Enter product category"
                    isMulti
                    tabSelectsValue
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="product-tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product tags
                </label>
                <div className="mt-1">
                  <CreatableSelect
                    isClearable={false}
                    onChange={handleChange}
                    options={[]}
                    defaultValue={product ? product.tags : null}
                    placeholder="Enter product tags"
                    isMulti
                    tabSelectsValue
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={addingProduct}
            >
              {addingProduct ? "Updating ..." : "Update"}
            </button>
          </div>
        </div>
      </form>

      <Modal open={openModal} setopen={() => setOpenModal(!openModal)}>
        <AddCategory closeModal={() => setOpenModal(!openModal)} />
      </Modal>
    </>
  );
};

export default EditProduct;
