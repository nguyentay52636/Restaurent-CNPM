
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ComfirmPassword({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [code, setCode] = useState(["", "", "", ""]);

    const handleCodeChange = (index: number, value: string) => {
        if (/^[0-9]$/.test(value) || value === "") {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-full bg-white">
                <div className="p-6 md:p-8 w-full max-w-md">
                    <Link to="/shop">
                        <Button className="bg-transparent text-white border-2 rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary absolute top-12 cursor-pointer right-20">
                            <MoveLeft /> Back to Shop
                        </Button>
                    </Link>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-start">
                            <h1 className="text-4xl font-bold my-6">Nhập mã</h1>
                            <p className="text-muted-foreground text-sm">
                                We sent a code to imajidigital@gmail.com
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            {code.map((digit, index) => (
                                <Input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded"
                                />
                            ))}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#C95D2F] text-white hover:bg-[#4A3223] cursor-pointer"
                        >
                            Đặt lại mật khẩu
                        </Button>

                        <div className="text-center">
                            <Link
                                to="#"
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Gửi lại mã
                            </Link>
                        </div>

                        <div className="text-center text-sm">
                            <Link
                                to="/auth/login"
                                className="text-bg-primary text-[1rem] underline underline-offset-4"
                            >
                                Quay lại đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div></>
    );
}