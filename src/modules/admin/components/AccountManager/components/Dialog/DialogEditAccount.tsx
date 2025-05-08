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

const formSchema = z.object({
    id: z.number(),
    fullName: z.string().optional(),
    email: z.string().email({
        message: 'Vui lòng nhập địa chỉ email hợp lệ.',
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    role_id: z.number().optional(),
    points: z.number().optional(),
});

interface DialogEditAccountProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: IUserDataType | null;
}

export function DialogEditAccount({ open, onOpenChange, user }: DialogEditAccountProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: user?.id || 0,
            fullName: user?.fullName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            role_id: user?.roleId?.id,
            points: user?.points || 0,
        },
    });

    // Update form values when user changes
    useEffect(() => {
        if (user) {
            form.reset({
                id: user.id,
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                role_id: user.roleId?.id,
                points: user.points || 0,
            });
        }
    }, [user, form]);

    const { mutate } = useUpdateUserMutation();

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values, {
            onSuccess: () => {
                toast('Cập nhật tài khoản thành công', {
                    description: 'Thông tin tài khoản đã được cập nhật',
                });
                onOpenChange(false);
            },
            onError: () => {
                toast('Lỗi khi cập nhật tài khoản', {
                    description: 'Đã xảy ra lỗi. Vui lòng thử lại.',
                });
            },
        });
    }

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
                                        <Input placeholder='Nhập họ và tên' {...field} />
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
                                        <Input placeholder='Nhập số điện thoại' {...field} />
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
                                        <Input placeholder='Nhập địa chỉ' {...field} />
                                    </FormControl>
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
