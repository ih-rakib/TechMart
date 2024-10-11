import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryListQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categorySlice";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories, refetch } = useGetCategoryListQuery();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategoy] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await createCategoy({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name} is created successfully`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatedName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatedName },
      }).unwrap();

      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name} is updated`);
        refetch();
        setSelectedCategory(null);
        setUpdatedName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is deleted!`);
        refetch();
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu></AdminMenu>

      <div className="md:w-3/4 p-3">
        <div className="h-12 text-2xl font-semibold">Manage Category</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        ></CategoryForm>
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatedName(category.name);
                  }
                }}
                className="bg-white border border-slate-500 text-slate-500 py-2 px-4 rounded-lg m-3 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50"
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatedName}
            setValue={(value) => setUpdatedName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          ></CategoryForm>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
