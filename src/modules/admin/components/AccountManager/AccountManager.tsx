import AccountActions from './components/AccountActions';
import AccountTable from './components/AccountTable';
import { useGetAllUserQuery, useGetRolesQuery, Role } from './components/querys';
import { IUserDataType } from '@/lib/apis/types.';
import { useDeleteUserMutation } from './components/mutations';
import { useState } from 'react';
import PaginationAccount from './components/PaginationAccount';
import { DialogEditAccount } from './components/Dialog/DialogEditAccount';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DialogDeleteConfirmation } from './components/Dialog/DialogDeleteConfirmation';

type SortField = 'email' | 'fullName' | 'phone' | 'address' | 'points' | 'roleId';
type SortDirection = 'asc' | 'desc';
type CategoryTab = 'all' | 'admin' | 'customer' | 'staff' | 'kitchen';

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
  const [deletingUser, setDeletingUser] = useState<IUserDataType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: deleteUserMutate } = useDeleteUserMutation();
  const { data } = useGetAllUserQuery();
  const { data: rolesData } = useGetRolesQuery();

  // Get role names from API or use defaults
  const roleNames = {
    admin: rolesData?.data?.find((role: Role) => role.id === 1)?.name || 'Quản trị',
    user: rolesData?.data?.find((role: Role) => role.id === 2)?.name || 'Người dùng',
    staff: rolesData?.data?.find((role: Role) => role.id === 3)?.name || 'Nhân viên bán hàng',
    kitchen: rolesData?.data?.find((role: Role) => role.id === 5)?.name || 'Bếp'
  };

  // Filter users based on search query and active tab
  const filteredUsers = data?.data.filter(user => {
    // First filter by search query
    const matchesSearch = user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.fullName ? user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      (user.phone ? user.phone.toLowerCase().includes(searchQuery.toLowerCase()) : false);

    // Then filter by category tab
    if (activeTab === 'all') return matchesSearch;

    const roleId = typeof user.roleId === 'object' ? user.roleId?.id : user.roleId;

    if (!roleId) return false;

    return matchesSearch && (
      (activeTab === 'admin' && roleId === 1) ||
      (activeTab === 'customer' && roleId === 2) ||
      (activeTab === 'staff' && roleId === 3) ||
      (activeTab === 'kitchen' && roleId === 5)
    );
  }) || [];

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA: any;
    let valueB: any;

    if (sortField === 'roleId') {
      // Extract role IDs for sorting
      valueA = typeof a.roleId === 'object' ? a.roleId?.id : a.roleId;
      valueB = typeof b.roleId === 'object' ? b.roleId?.id : b.roleId;

      // Convert to numbers for numerical comparison
      valueA = valueA ? Number(valueA) : 0;
      valueB = valueB ? Number(valueB) : 0;
    } else if (sortField === 'fullName' || sortField === 'email' || sortField === 'phone' || sortField === 'address') {
      valueA = a[sortField] || '';
      valueB = b[sortField] || '';

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }
      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }
    } else {
      valueA = a[sortField] || 0;
      valueB = b[sortField] || 0;
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
    setDeletingUser(customer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (customer: IUserDataType) => {
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
    admin: data?.data.filter(user => {
      const roleId = typeof user.roleId === 'object' ? user.roleId?.id : user.roleId;
      return roleId === 1;
    }).length || 0,
    customer: data?.data.filter(user => {
      const roleId = typeof user.roleId === 'object' ? user.roleId?.id : user.roleId;
      return roleId === 2;
    }).length || 0,
    staff: data?.data.filter(user => {
      const roleId = typeof user.roleId === 'object' ? user.roleId?.id : user.roleId;
      return roleId === 3;
    }).length || 0,
    kitchen: data?.data.filter(user => {
      const roleId = typeof user.roleId === 'object' ? user.roleId?.id : user.roleId;
      return roleId === 5;
    }).length || 0
  };

  return (
    data && (
      <div className='p-6 bg-white'>
        <AccountActions onSearch={handleSearch} searchQuery={searchQuery} />

        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all" className="flex items-center justify-center">
              Tất cả
              <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.all}
              </span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center justify-center">
              {roleNames.admin}
              <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.admin}
              </span>
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center justify-center">
              {roleNames.user}
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.customer}
              </span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center justify-center">
              {roleNames.staff}
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.staff}
              </span>
            </TabsTrigger>
            <TabsTrigger value="kitchen" className="flex items-center justify-center">
              {roleNames.kitchen}
              <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                {userCounts.kitchen}
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

        <DialogDeleteConfirmation
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          user={deletingUser}
          onConfirm={confirmDelete}
        />
      </div>
    )
  );
}
