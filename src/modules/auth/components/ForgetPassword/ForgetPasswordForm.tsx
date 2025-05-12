import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MoveLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ForgetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="flex items-center justify-center h-full bg-white">


                <form className="p-6 md:p-8 w-full max-w-md">
                    <Button className=" bg-transparent text-white border-2 rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary absolute top-12 cursor-pointer  right-20">
                        <MoveLeft /> Quay về Home
                    </Button>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-start">
                            <h1 className="text-4xl font-bold my-6">Quên mật khẩu</h1>
                            <p className="text-muted-foreground text-sm">
                                Nhập thông tin đăng nhập để truy cập tài khoản của bạn.
                            </p>
                        </div>

                        {/* Google Sign-In Button */}


                        <div className="text-center text-sm text-muted-foreground">
                            Hoặc sử dụng email
                        </div>

                        {/* Email Input */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Nhập email"
                                required
                            />
                        </div>






                        <Button
                            onClick={() => window.location.href = '/auth/confirm-password'}
                            type="submit"
                            className="w-full bg-[#C95D2F] text-white hover:bg-[#4A3223] cursor-pointer"
                        >
                            Gửi
                        </Button>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm">
                            Bạn chưa có tài khoản?{" "}
                            <Link
                                to="/auth/register"
                                className="text-bg-primary text-[1rem] underline underline-offset-4"
                            >
                                Tạo tài khoản
                            </Link>

                        </div>
                    </div>
                </form>
            </div></>
    );
}