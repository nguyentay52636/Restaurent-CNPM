import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // shadcn/ui Card component
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotificationsHistoryOrder() {
    return (
        <div className="">
            <div className="py-2 flex items-center gap-2">

                <Link to="/admin/order-history">
                    <Button className='cursor-pointer hover:bg-bg-primary'>
                        <ChevronLeft className='size-6 font-bold' />
                    </Button>

                </Link>


            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">

                <Card className="flex flex-col items-center border-2 rounded-lg shadow-md p-8 ">
                    <CardContent className="flex flex-col items-center space-y-6">
                        <img
                            src="/images/toast-print.png"
                            alt="Printing illustration"
                            className=" object-contain"
                        />
                        <div className="text-center space-y-3">
                            <p className="text-2xl font-bold text-gray-800">
                                Invoice Printed Successfully!
                            </p>
                            <p className="text-lg text-gray-500">
                                Please wait 1 minute for print invoice.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >


    );
}