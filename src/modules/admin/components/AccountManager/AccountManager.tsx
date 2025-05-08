import AccountActions from './components/AccountActions';
import AccountTable from './components/AccountTable';
import { useGetAllUserQuery } from './components/querys';
import { IUserDataType } from '@/lib/apis/types.';
import { useDeleteUserMutation } from './components/mutations';
import { useState } from 'react';
import PaginationAccount from './components/PaginationAccount';
import { DialogEditAccount } from './components/Dialog/DialogEditAccount';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SortField = 'email' | 'fullName' | 'phone' | 'address' | 'points' | 'roleId';
type SortDirection = 'asc' | 'desc';
type CategoryTab = 'all' | 'admin' | 'customer' | 'staff';

// Define the Customer interface based on the table in the image

export default function AccountManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<IUserDataType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('email');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');

  const { mutate: deleteUserMutate } = useDeleteUserMutation();
  const { data } = useGetAllUserQuery();

  // Filter users based on search query and active tab
  const filteredUsers = data?.data.filter(user => {
    // First filter by search query
    const matchesSearch =
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchQuery.toLowerCase());

    // Then filter by category tab
    if (activeTab === 'all') return matchesSearch;

    const roleName = user.roleId?.name?.toLowerCase() || '';
    return matchesSearch && (
      (activeTab === 'admin' && roleName === 'admin') ||
      (activeTab === 'customer' && roleName === 'customer') ||
      (activeTab === 'staff' && roleName === 'staff')
    );
  }) || [];

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA: any;
    let valueB: any;

    if (sortField === 'roleId') {
      valueA = a.roleId?.name || '';
      valueB = b.roleId?.name || '';
    } else {
      valueA = a[sortField] || '';
      valueB = b[sortField] || '';
    }

    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);

  // Paginate users
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Handlers for Edit and Delete
  const handleEdit = (customer: IUserDataType) => {
    setEditingUser(customer);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (customer: IUserDataType) => {
    if (customer.id) {
      deleteUserMutate(customer.id);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSort = (field: SortField) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as CategoryTab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  // Count users by role for tab badges
  const userCounts = {
    all: data?.data.length || 0,
    admin: data?.data.filter(user => user.roleId?.name?.toLowerCase() === 'admin').length || 0,
    customer: data?.data.filter(user => user.roleId?.name?.toLowerCase() === 'customer').length || 0,
    staff: data?.data.filter(user => user.roleId?.name?.toLowerCase() === 'staff').length || 0
  };

  return (
    data && (
      <div className='p-6 bg-white'>
        <AccountActions onSearch={handleSearch} searchQuery={searchQuery} />

        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="flex items-center justify-center">
              Tất cả
              <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.all}
              </span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center justify-center">
              Admin
              <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.admin}
              </span>
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center justify-center">
              Khách hàng
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.customer}
              </span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center justify-center">
              Nhân viên
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.staff}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className='mb-6'>
              <AccountTable
                customers={paginatedUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            </div>
            {filteredUsers.length > 0 && (
              <PaginationAccount
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalItems={filteredUsers.length}
              />
            )}
          </TabsContent>
        </Tabs>

        <DialogEditAccount
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={editingUser}
        />
      </div>
    )
  );
}
