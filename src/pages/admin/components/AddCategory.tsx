import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { uuid } from "uuidv4";
import { addCategory } from "../../../redux/actions/appActions";

type Props = {
  closeModal?: () => void;
};

export default function AddCategory({ closeModal }: Props) {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");
  const { addingCategory } = useAppSelector((state) => state.app);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const catObj = {
      id: uuid(),
      name: category,
    };
    dispatch(addCategory(catObj));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="category"
            id="category"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="eg; Fashion"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end pt-8 pb-4 space-x-3">
        <button
          type="button"
          className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-gray-600 bg-gray-100"
          onClick={closeModal && closeModal}
        >
          Close
        </button>
        <button
          type="submit"
          className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-blue-600"
        >
          {addingCategory ? (
            <>
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-1" />{" "}
              Creating ...
            </>
          ) : (
            "Create category"
          )}
        </button>
      </div>
    </form>
  );
}
