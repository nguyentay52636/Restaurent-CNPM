"use client"

import React from 'react'
import { TrendingUp, Users, ShoppingBag, Package, CreditCard, Calendar, ArrowUpRight } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, TooltipProps } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Dữ liệu doanh thu theo tháng
const revenueData = [
    { month: "Tháng 1", doanhThu: 18600000, donHang: 80 },
    { month: "Tháng 2", doanhThu: 30500000, donHang: 120 },
    { month: "Tháng 3", doanhThu: 23700000, donHang: 100 },
    { month: "Tháng 4", doanhThu: 27300000, donHang: 110 },
    { month: "Tháng 5", doanhThu: 20900000, donHang: 90 },
    { month: "Tháng 6", doanhThu: 31400000, donHang: 130 },
    { month: "Tháng 7", doanhThu: 29800000, donHang: 125 },
    { month: "Tháng 8", doanhThu: 32500000, donHang: 135 },
    { month: "Tháng 9", doanhThu: 34100000, donHang: 140 },
    { month: "Tháng 10", doanhThu: 36200000, donHang: 150 },
    { month: "Tháng 11", doanhThu: 38500000, donHang: 160 },
    { month: "Tháng 12", doanhThu: 42000000, donHang: 175 },
]

// Dữ liệu doanh thu theo quý
const quarterlyData = [
    { quarter: "Quý 1", doanhThu: 72800000, donHang: 300 },
    { quarter: "Quý 2", doanhThu: 79600000, donHang: 330 },
    { quarter: "Quý 3", doanhThu: 96400000, donHang: 400 },
    { quarter: "Quý 4", doanhThu: 116700000, donHang: 485 },
]

// Dữ liệu thống kê sản phẩm theo danh mục
const productCategoryData = [
    { name: "Cà phê", value: 35 },
    { name: "Trà", value: 25 },
    { name: "Đồ ăn", value: 20 },
    { name: "Tráng miệng", value: 20 },
]

// Màu sắc cho biểu đồ tròn
const COLORS = ['#A27B5C', '#4CAF50', '#FF9800', '#E91E63'];

// Dữ liệu sản phẩm bán chạy
const topSellingProducts = [
    { name: "CAPPUCINO", category: "Cà phê", sold: 320, revenue: 13440000 },
    { name: "MILK TEA", category: "Trà", sold: 280, revenue: 11760000 },
    { name: "BEEF SANDWICH", category: "Đồ ăn", sold: 240, revenue: 15600000 },
    { name: "TIRAMISU", category: "Tráng miệng", sold: 210, revenue: 11550000 },
    { name: "ESPRESSO", category: "Cà phê", sold: 200, revenue: 7000000 },
]

// Type for pie chart label
interface PieChartLabelProps {
    name: string;
    percent: number;
}

export default function ManagerDashBoard() {
    // Format số tiền VND
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Format số lượng với dấu phân cách hàng nghìn
    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    return (
        <div className="p-6 space-y-6 bg-white">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Thống kê doanh thu</h1>
                <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                    Xuất báo cáo
                </Button>
            </div>

            {/* Thẻ thống kê tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                                <h3 className="text-2xl font-bold mt-1">{formatCurrency(365500000)}</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-4 w-4 mr-1" /> 12.5% so với tháng trước
                                </p>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-full">
                                <CreditCard className="h-6 w-6 text-orange-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                                <h3 className="text-2xl font-bold mt-1">{formatNumber(1515)}</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-4 w-4 mr-1" /> 8.2% so với tháng trước
                                </p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <ShoppingBag className="h-6 w-6 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tổng sản phẩm</p>
                                <h3 className="text-2xl font-bold mt-1">{formatNumber(29)}</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-4 w-4 mr-1" /> 5.3% so với tháng trước
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <Package className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tổng khách hàng</p>
                                <h3 className="text-2xl font-bold mt-1">{formatNumber(450)}</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-4 w-4 mr-1" /> 7.8% so với tháng trước
                                </p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Biểu đồ doanh thu */}
            <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Biểu đồ doanh thu</h2>
                    <TabsList className="bg-gray-100">
                        <TabsTrigger value="monthly" className="cursor-pointer">Theo tháng</TabsTrigger>
                        <TabsTrigger value="quarterly" className="cursor-pointer">Theo quý</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="monthly">
                    <Card>
                        <CardHeader>
                            <CardTitle>Doanh thu theo tháng</CardTitle>
                            <CardDescription>Năm 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" tickMargin={10} />
                                        <YAxis
                                            yAxisId="left"
                                            tickFormatter={(value: number) => `${value / 1000000}tr`}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tickFormatter={(value: number) => `${value}`}
                                        />
                                        <Tooltip
                                            formatter={(value: number, name: string) => {
                                                if (name === "doanhThu") return [formatCurrency(value), "Doanh thu"];
                                                return [formatNumber(value), "Đơn hàng"];
                                            }}
                                            labelFormatter={(label: string) => `${label}`}
                                        />
                                        <Legend
                                            payload={[
                                                { value: 'Doanh thu', type: 'rect', color: '#A27B5C' },
                                                { value: 'Đơn hàng', type: 'rect', color: '#4CAF50' }
                                            ]}
                                        />
                                        <Bar yAxisId="left" dataKey="doanhThu" name="Doanh thu" fill="#A27B5C" radius={[4, 4, 0, 0]} />
                                        <Bar yAxisId="right" dataKey="donHang" name="Đơn hàng" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Tăng 12.5% so với tháng trước <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">Hiển thị doanh thu và số đơn hàng trong năm 2024</div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="quarterly">
                    <Card>
                        <CardHeader>
                            <CardTitle>Doanh thu theo quý</CardTitle>
                            <CardDescription>Năm 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={quarterlyData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="quarter" tickMargin={10} />
                                        <YAxis
                                            yAxisId="left"
                                            tickFormatter={(value: number) => `${value / 1000000}tr`}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tickFormatter={(value: number) => `${value}`}
                                        />
                                        <Tooltip
                                            formatter={(value: number, name: string) => {
                                                if (name === "doanhThu") return [formatCurrency(value), "Doanh thu"];
                                                return [formatNumber(value), "Đơn hàng"];
                                            }}
                                            labelFormatter={(label: string) => `${label}`}
                                        />
                                        <Legend
                                            payload={[
                                                { value: 'Doanh thu', type: 'rect', color: '#A27B5C' },
                                                { value: 'Đơn hàng', type: 'rect', color: '#4CAF50' }
                                            ]}
                                        />
                                        <Bar yAxisId="left" dataKey="doanhThu" name="Doanh thu" fill="#A27B5C" radius={[4, 4, 0, 0]} />
                                        <Bar yAxisId="right" dataKey="donHang" name="Đơn hàng" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Tăng 21.1% so với quý trước <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">Hiển thị doanh thu và số đơn hàng theo quý trong năm 2024</div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Biểu đồ sản phẩm và bảng sản phẩm bán chạy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thống kê sản phẩm theo danh mục</CardTitle>
                        <CardDescription>Tỷ lệ phân bổ sản phẩm</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={productCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }: PieChartLabelProps) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {productCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${value}%`, 'Tỷ lệ']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sản phẩm bán chạy</CardTitle>
                        <CardDescription>Top 5 sản phẩm bán chạy nhất</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-2">Sản phẩm</th>
                                        <th className="text-left py-3 px-2">Danh mục</th>
                                        <th className="text-right py-3 px-2">Đã bán</th>
                                        <th className="text-right py-3 px-2">Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topSellingProducts.map((product, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-2 font-medium">{product.name}</td>
                                            <td className="py-3 px-2">{product.category}</td>
                                            <td className="py-3 px-2 text-right">{formatNumber(product.sold)}</td>
                                            <td className="py-3 px-2 text-right">{formatCurrency(product.revenue)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button variant="outline" className="cursor-pointer">
                            Xem tất cả sản phẩm
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
