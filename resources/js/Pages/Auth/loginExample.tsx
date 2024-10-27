import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegistrationForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" dir="rtl">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">مرحبا بكم في برنامج بسيط</h1>
          <p className="mt-2 text-sm text-gray-600">
            نظام بسيط لحساب الأرباح والخسائر لمحلكم
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="store-name" className="block text-sm font-medium text-gray-700">
                إسم المحل
              </Label>
              <Input
                id="store-name"
                name="store-name"
                type="text"
                required
                className="mt-1 block w-full text-right"
              />
            </div>
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                إسم المستخدم
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full text-right"
              />
            </div>
            <div>
              <Label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                إسم و اللقب
              </Label>
              <Input
                id="full-name"
                name="full-name"
                type="text"
                required
                className="mt-1 block w-full text-right"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
              سجل
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}