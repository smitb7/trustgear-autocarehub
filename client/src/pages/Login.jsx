import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-neutral-300">Email</Label>
            <Input
              type="email"
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">Password</Label>
            <Input
              type="password"
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/80">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}