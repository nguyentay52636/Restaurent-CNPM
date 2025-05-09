import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAddUserMutation } from '../mutations';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetRolesQuery } from '../querys';
import { useEffect } from 'react';

const formSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
  roleId: z.number(),
  points: z.number().optional(),
});

interface DialogAddAccountProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Define role interface
interface Role {
  id: number;
  name: string;
}

export function DialogAddAccount({ open, onOpenChange }: DialogAddAccountProps) {
  // Fetch roles
  const { data: rolesData, isLoading: isLoadingRoles } = useGetRolesQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      roleId: 2, // Default to user role
      points: 0, // Always default to 0
    },
  });

  // Default roles in case API fails
  const defaultRoles: Role[] = [
    { id: 1, name: "Quản trị" },
    { id: 2, name: "Người dùng" },
    { id: 3, name: "nhân viên bán hàng" },
    { id: 5, name: "Bếp" }
  ];

  // Use API roles if available, otherwise fallback to default roles
  const roles = rolesData?.data || defaultRoles;

  // Set roleId value when roles are loaded
  useEffect(() => {
    if (roles && roles.length > 0) {
      // Find user role (id=2) or use the first role
      const userRole = roles.find((role: Role) => role.id === 2) || roles[0];
      form.setValue('roleId', userRole.id);
    }
  }, [roles, form]);

  const { mutate } = useAddUserMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Make sure points is always 0 when adding a new user regardless of what was entered
    const userData = {
      ...values,
      points: 0,
    };

    console.log('Submitting with roleId:', values.roleId);

    mutate(userData, {
      onSuccess: () => {
        toast.success('Tạo tài khoản thành công ✅', {
          description: 'Tài khoản người dùng mới đã được thêm',
          duration: 3000,
          position: 'top-center',
          style: { background: '#4CAF50', color: 'white', border: 'none' },
        });
        form.reset();
        onOpenChange(false);
      },
      onError: (error: any) => {
        console.error("Add user error:", error);
        toast.error('Lỗi khi tạo tài khoản ❌', {
          description: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
          duration: 3000,
          position: 'top-center',
          style: { background: '#F44336', color: 'white', border: 'none' },
        });
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm tài khoản mới</DialogTitle>
          <DialogDescription>
            Tạo tài khoản người dùng mới bằng cách điền vào biểu mẫu dưới đây.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập họ và tên' {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập email' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập mật khẩu' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập số điện thoại' {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập địa chỉ' {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='roleId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vai trò</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const roleId = Number(value);
                      field.onChange(roleId);
                      console.log('Selected role ID:', roleId);
                    }}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò">
                          {field.value ? roles.find((r: Role) => r.id === field.value)?.name || "Chọn vai trò" : "Chọn vai trò"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role: Role) => (
                        <SelectItem
                          key={role.id}
                          value={role.id.toString()}
                          className={
                            role.id === 1 ? 'text-red-600' :
                              role.id === 2 ? 'text-blue-600' :
                                role.id === 3 ? 'text-green-600' :
                                  role.id === 5 ? 'text-purple-600' : 'text-gray-600'
                          }
                        >
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Thêm tài khoản</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
