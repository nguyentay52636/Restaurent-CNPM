import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MoveLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { loginAPI } from '@/lib/apis/userApi';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { login } from '@/redux/slices/authSlice';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập email hợp lệ',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự',
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginUI({ className, ...props }: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await dispatch(login(data)).unwrap();

      toast.success('Đăng nhập thành công! 🎉', {
        description: `Chào mừng  đã quay trở lại!`,
        duration: 5000,
        position: 'top-center',
        style: { background: '#4CAF50', color: 'white', border: 'none' },
      });

      // Redirect based on role
    } catch (error: any) {
      toast.error('Đăng nhập thất bại ❌', {
        description:
          error?.response?.data?.message ||
          'Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại.',
        duration: 5000,
        position: 'top-center',
        style: { background: '#F44336', color: 'white', border: 'none' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8 w-full max-w-md'>
        <Button
          type='button'
          className='bg-transparent text-white border-2 rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary absolute top-12 cursor-pointer right-20'
          onClick={() => navigate('/')}
        >
          <MoveLeft /> Quay về Home
        </Button>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-start'>
            <h1 className='text-4xl font-bold my-6'>Chào Mừng Trở Lại</h1>
            <p className='text-muted-foreground text-sm'>
              Nhập thông tin đăng nhập để truy cập tài khoản của bạn.
            </p>
          </div>

          {/* Google Sign-In Button */}
          <Button
            variant='outline'
            type='button'
            className='w-full flex gap-2 border-gray-300 cursor-pointer'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='svg0 9'>
                <path
                  id='Path'
                  d='M19.9997 10.2247C19.9997 9.56634 19.9401 8.94134 19.8379 8.33301H10.2168V12.0913H15.7255C15.4786 13.3247 14.7549 14.3663 13.6821 15.0747V17.5747H16.9686C18.8928 15.833 19.9997 13.2663 19.9997 10.2247Z'
                  fill='#4285F4'
                />
                <path
                  id='Path_2'
                  d='M10.2174 19.9999C12.976 19.9999 15.2834 19.0999 16.9692 17.5749L13.6827 15.0749C12.7632 15.6749 11.5967 16.0415 10.2174 16.0415C7.55244 16.0415 5.29616 14.2832 4.48731 11.9082H1.09863V14.4832C2.77594 17.7499 6.22422 19.9999 10.2174 19.9999Z'
                  fill='#34A853'
                />
                <path
                  id='Path_3'
                  d='M4.48702 11.9083C4.27416 11.3083 4.16347 10.6666 4.16347 9.99993C4.16347 9.33327 4.28267 8.6916 4.48702 8.0916V5.5166H1.09834C0.40017 6.8666 0 8.38327 0 9.99993C0 11.6166 0.40017 13.1333 1.09834 14.4833L4.48702 11.9083Z'
                  fill='#FBBC05'
                />
                <path
                  id='Path_4'
                  d='M10.2174 3.95833C11.7244 3.95833 13.0697 4.46667 14.134 5.45833L17.0458 2.60833C15.2834 0.991667 12.976 0 10.2174 0C6.22422 0 2.77594 2.25 1.09863 5.51667L4.48731 8.09167C5.29616 5.71667 7.55244 3.95833 10.2174 3.95833Z'
                  fill='#EA4335'
                />
              </g>
            </svg>
            Đăng Nhập Bằng Google
          </Button>

          <div className='text-center text-sm text-muted-foreground'>Hoặc sử dụng email</div>

          {/* Email Input */}
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              {...register('email')}
              id='email'
              type='email'
              placeholder='Nhập email'
              required
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className='grid gap-2'>
            <Label htmlFor='password'>Mật Khẩu</Label>
            <div className='relative'>
              <Input
                {...register('password')}
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Nhập mật khẩu'
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-gray-500' />
                ) : (
                  <Eye className='h-4 w-4 text-gray-500' />
                )}
              </Button>
            </div>
            {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
          </div>

          <div className='flex justify-between'>
            <div className='flex items-center justify-begin gap-2'>
              <Checkbox id='remember' />
              <Label htmlFor='remember' className='text-sm'>
                Ghi Nhớ Tôi
              </Label>
            </div>
            <div className='flex items-center justify-end gap-2'>
              <Link to='/auth/forget-password' className='text-sm text-blue-600 hover:underline'>
                Quên Mật Khẩu?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <Button
            type='submit'
            className='w-full bg-[#EA7E41] text-white hover:bg-[#4A3223] cursor-pointer'
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </Button>

          {/* Sign Up Link */}
          <div className='text-center text-sm'>
            Bạn chưa có tài khoản?{' '}
            <Link
              to='/auth/register'
              className='text-bg-primary text-[1rem] underline underline-offset-4'
            >
              Tạo tài khoản
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
