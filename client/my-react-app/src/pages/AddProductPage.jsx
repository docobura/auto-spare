import AddProductsForm from '../components/Products/AddProductsForm';
import Header from '../components/Header';

const AddProductFormPage = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8 bg-white text-black w-screen h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white text-black rounded-lg shadow-lg">
          <AddProductsForm />
        </div>
      </main>
    </div>
  );
};

export default AddProductFormPage;
