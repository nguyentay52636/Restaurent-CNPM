import AccountActions from './components/AccountActions';
import AccountTable from './components/AccountTable';
import { useGetAllUserQuery } from './components/querys';
import { IUserDataType } from '@/lib/apis/types.';
import { useDeleteUserMutation } from './components/mutations';

// Define the Customer interface based on the table in the image

export default function AccountManager() {
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [rowsPerPage] = useState(10);
  //   const totalPages = Math.ceil(customers.length / rowsPerPage);

  //   const handlePageChange = (page: number) => {
  //     setCurrentPage(page);
  //   };

  const { mutate: deleteUserMutate } = useDeleteUserMutation();

  // Handlers for Edit and Delete
  const handleEdit = (customer: IUserDataType) => {
    // Placeholder for edit functionality (e.g., open a modal with customer data)
    console.log('Edit customer:', customer);
  };

  const handleDelete = (customer: IUserDataType) => {
    deleteUserMutate(customer.id);
  };

  const { data } = useGetAllUserQuery();

  return (
    data && (
      <div className='p-6 bg-white!'>
        <AccountActions />
        <div className=''>
          <AccountTable customers={data.data} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        {/* <PaginationAccount
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
        /> */}
      </div>
    )
  );
}
