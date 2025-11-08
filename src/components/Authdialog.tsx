import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

const AuthDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "", password: "", department: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  // ✅ Allow only 10-digit numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!/^\d{10}$/.test(formData.phone)) {
      setLoading(false);
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      if (isLogin) {
        const res = await api.login({ phone: formData.phone, password: formData.password });
        const token = (res && (res.token || res.data?.token || res.user?.token)) as string | undefined;
        const user = (res && (res.user || res.data?.user || res)) as any;
        login({ user, token });
        onOpenChange(false);
      } else {
        await api.register({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          department: formData.department,
        });
        setIsLogin(true);
        setFormData({ name: "", phone: "", password: "", department: "" });
        setError("Registration successful! Please login now.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Card className="border-none shadow-none">
            <CardContent className="space-y-4 pt-4">
              {!isLogin && (
                <>
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <Label>Phone (10 digits)</Label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="Enter 10-digit phone number"
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
