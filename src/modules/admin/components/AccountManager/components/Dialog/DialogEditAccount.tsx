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
import { IUserDataType } from '@/lib/apis/types.';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useUpdateUserMutation } from '../mutations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Role, useGetRolesQuery } from '../querys';

const formSchema = z.object({
    id: z.number(),
    fullName: z.string().optional(),
    email: z.string().email({
        message: 'Vui lòng nhập địa chỉ email hợp lệ.',
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    roleId: z.number(),
    points: z.number().optional(),
});

interface DialogEditAccountProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: IUserDataType | null;
}

export function DialogEditAccount({ open, onOpenChange, user }: DialogEditAccountProps) {
    // Fetch roles
    const { data: rolesData } = useGetRolesQuery();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: user?.id || 0,
            fullName: user?.fullName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            roleId: typeof user?.roleId === 'object' ? user?.roleId?.id : user?.roleId || 2,
            points: user?.points || 0,
        },
    });

    // Update form values when user changes
    useEffect(() => {
        if (user) {
            form.reset({
                id: user.id || 0,
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                roleId: typeof user.roleId === 'object' ? user.roleId?.id : user.roleId || 2,
                points: user.points || 0,
            });
        }
    }, [user, form]);

    const { mutate } = useUpdateUserMutation();

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values, {
            onSuccess: () => {
                toast.success('Cập nhật tài khoản thành công ✅', {
                    description: 'Thông tin tài khoản đã được cập nhật',
                    duration: 3000,
                    position: 'top-center',
                    style: { background: '#4CAF50', color: 'white', border: 'none' },
                });
                onOpenChange(false);
            },
            onError: (error: any) => {
                toast.error('Lỗi khi cập nhật tài khoản ❌', {
                    description: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
                    duration: 3000,
                    position: 'top-center',
                    style: { background: '#F44336', color: 'white', border: 'none' },
                });
            },
        });
    }

    // Default roles in case API fails
    const defaultRoles: Role[] = [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user' },
        { id: 3, name: 'nhân viên bán hàng' },
        { id: 4, name: 'Người dùng' }
    ];

    // Use API roles if available, otherwise fallback to default roles
    const roles = rolesData?.data || defaultRoles;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin tài khoản người dùng bằng cách chỉnh sửa biểu mẫu dưới đây.
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
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        defaultValue={field.value?.toString()}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn vai trò" />
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
                        <FormField
                            control={form.control}
                            name='points'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Điểm tích lũy</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Nhập điểm tích lũy'
                                            type='number'
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type='submit'>Cập nhật</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
