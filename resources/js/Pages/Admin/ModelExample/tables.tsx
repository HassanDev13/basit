import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Trash } from "lucide-react"

// Mock data for the table
const initialProducts = [
  { id: 1, name: "منتج 1", price: 100, cost: 80, quantity: 50 },
  { id: 2, name: "منتج 2", price: 150, cost: 120, quantity: 30 },
  { id: 3, name: "منتج 3", price: 200, cost: 160, quantity: 20 },
  { id: 4, name: "منتج 4", price: 120, cost: 90, quantity: 40 },
  { id: 5, name: "منتج 5", price: 180, cost: 140, quantity: 25 },
]

export default function ProductTable() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber : number) => setCurrentPage(pageNumber)

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete.id))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-sm" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">المنتجات</h1>
      <div className="flex justify-between mb-4">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">إضافة</Button>
        <Input
          placeholder="بحث..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">اسم المنتج</TableHead>
            <TableHead className="text-right">السعر</TableHead>
            <TableHead className="text-right">التكلفة</TableHead>
            <TableHead className="text-right">الكمية المتاحة</TableHead>
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.cost}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setProductToDelete(product)
                    setDeleteDialogOpen(true)
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="mx-1"
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}