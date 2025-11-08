import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  Camera,
  LogIn,
  LogOut,
  Clock,
  RefreshCw,
  Loader2,
  FileText,
  CalendarDays,
} from "lucide-react";
import {
  markAttendance,
  getMyAttendance,
  getDailyReport,
  getMonthlySummary,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import imageCompression from "browser-image-compression";

interface AttendanceRecord {
  id: string;
  timestamp: string;
  type: "Check-In" | "Check-Out";
  location: string;
  comment?: string;
}

interface Address {
  display_name?: string;
}

const EmployeeAttendance = () => {
  const { token, isLoggedIn } = useAuth();

  const [locationStatus, setLocationStatus] = useState("");
  const [comment, setComment] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [recentAttendance, setRecentAttendance] = useState<AttendanceRecord[]>([]);
  const [dailyReport, setDailyReport] = useState<any>(null);
  const [monthlySummary, setMonthlySummary] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🧾 Fetch Attendance & Reports
  useEffect(() => {
    const fetchAll = async () => {
      if (!token) return;
      try {
        const data = await getMyAttendance(token);
        const formatted =
          data?.data
            ?.flatMap((record: any) =>
              record.sessions.map((session: any, index: number) => [
                {
                  id: `${record._id}-in-${index}`,
                  timestamp: new Date(session.checkIn).toLocaleString(),
                  type: "Check-In",
                  location: session.checkInStatus || "N/A",
                  comment: session.checkInComment || "N/A",
                },
                {
                  id: `${record._id}-out-${index}`,
                  timestamp: new Date(session.checkOut).toLocaleString(),
                  type: "Check-Out",
                  location: session.checkOutStatus || "N/A",
                  comment: session.checkOutComment || "N/A",
                },
              ])
            )
            .flat()
            .filter((s: any) => s.timestamp)
            .reverse() || [];

        setRecentAttendance(formatted);

        const daily = await getDailyReport(token);
        setDailyReport(daily?.report || daily);

        const now = new Date();
        const monthly = await getMonthlySummary(token, now.getMonth() + 1, now.getFullYear());
        setMonthlySummary(monthly?.summary || []);
      } catch (err: any) {
        console.error("❌ Failed to fetch reports:", err);
        toast({
          title: "Error fetching data",
          description: err.message || "Could not load reports",
          variant: "destructive",
        });
      }
    };

    fetchAll();
  }, [token]);

  // 📅 Fetch Monthly Summary
  const handleMonthChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedMonth(value);
    if (!token || !value) return;
    const [year, month] = value.split("-");
    try {
      const monthly = await getMonthlySummary(token, Number(month), Number(year));
      setMonthlySummary(monthly?.summary || []);
    } catch (err: any) {
      toast({
        title: "Failed to fetch monthly summary",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // 🌍 Reverse Geocode
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
      const res = await fetch(url);
      const data = await res.json();
      setAddress({ display_name: data.display_name });
    } catch {
      toast({ title: "Location error", variant: "destructive" });
    }
  }, []);

  // 📍 Get Location
  const getLocation = useCallback(() => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(coords);
        setIsLocating(false);
        await reverseGeocode(coords.lat, coords.lng);
      },
      () => {
        toast({ title: "Unable to get location", variant: "destructive" });
        setIsLocating(false);
      }
    );
  }, [reverseGeocode]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // 📸 Capture & Compress Photo
  const handlePhotoCapture = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 🔹 Compression options
      const options = {
        maxSizeMB: 0.3, // Target under 300KB
        maxWidthOrHeight: 800, // Resize large images
        useWebWorker: true,
      };

      // 🔹 Compress the image
      const compressedFile = await imageCompression(file, options);

      // 🔹 Read preview
      const reader = new FileReader();
      reader.onloadend = () => setPhotoData(reader.result as string);
      reader.readAsDataURL(compressedFile);

      setPhotoFile(compressedFile);

      toast({
        title: "Photo compressed successfully",
        description: `Original: ${(file.size / 1024 / 1024).toFixed(2)}MB → Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
      });
    } catch (error) {
      toast({
        title: "Compression Failed",
        description: "Please try again or capture a smaller image.",
        variant: "destructive",
      });
    }
  };

  const triggerCamera = () => {
    if (!locationStatus) {
      toast({ title: "Enter Location Status first", variant: "destructive" });
      return;
    }
    fileInputRef.current?.click();
  };

  // 🕒 Mark Attendance
  const handleAttendance = async (type: "Check-In" | "Check-Out") => {
    if (!isLoggedIn || !token) {
      toast({
        title: "Not logged in",
        description: "Please login first.",
        variant: "destructive",
      });
      return;
    }

    if (!locationStatus || !location || !photoFile) {
      toast({
        title: "Missing Information",
        description: "Enter status, capture selfie, and enable location.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await markAttendance({
        token,
        checkType: type,
        latitude: location.lat,
        longitude: location.lng,
        locationStatus,
        comment,
        selfieFile: photoFile,
      });

      toast({
        title: `${type} Successful`,
        description: res.message || "Recorded successfully",
      });

      setPhotoData(null);
      setPhotoFile(null);
      setLocationStatus("");
      setComment("");
    } catch (err: any) {
      toast({
        title: "Attendance Failed",
        description: err.message || "Server error",
        variant: "destructive",
      });
    }
  };

  // 📍 Render Address
  const renderAddress = () => {
    if (isLocating)
      return (
        <div className="text-sm text-muted-foreground flex items-center">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Fetching location...
        </div>
      );
    if (!address && !location)
      return <div className="text-sm text-muted-foreground">Location not available.</div>;
    if (address?.display_name)
      return <div className="text-sm text-muted-foreground">{address.display_name}</div>;
    if (location)
      return (
        <div className="text-sm text-muted-foreground">
          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
        </div>
      );
  };

  return (
    <section className="py-8 bg-secondary/30" id="attendance">
      <div className="container mx-auto px-4">
        <Card className="p-6 md:p-8 shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-center">Employee Attendance</h2>

          <Input
            type="text"
            placeholder="Enter your Location Status (e.g., Office, Site A)"
            value={locationStatus}
            onChange={(e) => setLocationStatus(e.target.value)}
          />

          <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
            <div>
              <div className="font-semibold text-foreground">Detected Location</div>
              {renderAddress()}
            </div>
            <Button onClick={getLocation} size="sm" disabled={isLocating}>
              {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            </Button>
          </div>

          <Input
            type="text"
            placeholder="Enter a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Selfie Input */}
          <input
            type="file"
            accept="image/*"
            capture="user"
            ref={fileInputRef}
            onChange={handlePhotoCapture}
            className="hidden"
          />

          <Button onClick={triggerCamera} className="w-full" size="lg">
            <Camera className="w-5 h-5 mr-2" /> {photoData ? "Retake Photo" : "Capture Selfie"}
          </Button>

          {photoData && (
            <img
              src={photoData}
              alt="Captured selfie"
              className="rounded-lg w-full max-h-96 object-cover border shadow-sm"
            />
          )}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button onClick={() => handleAttendance("Check-In")} disabled={!photoFile}>
              <LogIn className="w-5 h-5 mr-2" /> Check In
            </Button>
            <Button onClick={() => handleAttendance("Check-Out")} variant="outline" disabled={!photoFile}>
              <LogOut className="w-5 h-5 mr-2" /> Check Out
            </Button>
          </div>
        </Card>

        {/* Recent Attendance */}
        {recentAttendance.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" /> Recent Attendance
            </h3>
            {recentAttendance.map((r) => (
              <Card key={r.id} className="p-4 mb-2">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{r.type}</div>
                    <div className="text-sm text-muted-foreground">{r.timestamp}</div>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <span className="font-medium">Location:</span> {r.location}
                    <br />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Daily Report */}
        {dailyReport && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Daily Report
            </h3>
            <Card className="p-4">
              {dailyReport?.[0] ? (
                <div className="flex items-center justify-between text-sm">
                  <span>📅 Date: {dailyReport[0].date}</span>
                  <span>⏱️ Total Hours: {dailyReport[0].totalHours?.toFixed(2) || 0} hrs</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No daily data available.</p>
              )}
            </Card>
          </div>
        )}

        {/* Monthly Summary */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" /> Monthly Summary
          </h3>
          <Input type="month" value={selectedMonth} onChange={handleMonthChange} className="mb-4 w-fit" />
          <Card className="p-4">
            {monthlySummary && monthlySummary.length > 0 ? (
              monthlySummary.map((m: any) => (
                <div key={m._id} className="text-sm mb-2 border-b pb-2">
                  📅 {m.date} — ⏱️ {m.totalHours?.toFixed(2) || 0} hrs
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No monthly data found.</p>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAttendance;
