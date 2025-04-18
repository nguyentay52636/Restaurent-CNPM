import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthPages({
    children,
    className,
    ...props
}: PropsWithChildren<React.ComponentProps<"div">>) {
    return (

        <div className={cn("flex min-h-screen w-full", className)} {...props}>

            <Card className="overflow-hidden p-0 h-screen w-full rounded-none">
                <CardContent className="grid p-0 md:grid-cols-[40%_60%] h-full">
                    <div className="bg-[#F5E8D3] relative hidden md:block h-full p-8">

                        <div className="flex flex-col gap-6 my-20 justify-center items-center">
                            <div className="flex justify-center gap-2">
                                <h1 className="text-3xl font-semibold text-black text-center">SGU</h1>
                                <h1 className="text-3xl font-semibold text-bg-primary text-center ">COFFEE</h1>
                            </div>
                            <div className="mx-4 ">
                                <h2 className="text-4xl font-semibold text-[#5A3E2B] whitespace-break-space mx-20 text-center">
                                    Chúng Tôi Cũng Có Cà Phê Dành Cho Bạn Tại Nhà.
                                </h2>
                                <p className="text-[#5A3E2B] text-sm  mx-20 my-4">
                                    Ngày lễ, công việc và tiệc tùng là cơ hội tuyệt vời để thưởng thức một tách cà phê thơm ngon.
                                </p>
                                <div className="my-8 flex justify-center">
                                    <Button className=" bg-transparent text-white border-2  rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary  cursor-pointer">
                                        Đặt hàng ngày
                                    </Button>
                                </div>
                            </div>


                        </div>
                        <div className="absolute bottom-0 left-0 w-full">
                            <img
                                src="/coffee-bags.png"
                                alt="Túi Cà Phê"
                                className="h-auto w-full object-contain"
                            />
                        </div>
                    </div>


                    <div className="flex items-center justify-center h-full bg-white">

                        <>
                            {children || <Outlet />}
                        </>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
