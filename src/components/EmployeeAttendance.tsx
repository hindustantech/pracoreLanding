import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Camera, MapPin, LogIn, LogOut, User, Clock } from "lucide-react";

interface AttendanceRecord {
  id: string;
  timestamp: string;
  type: "check-in" | "check-out";
  location: string;
}

const EmployeeAttendance = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recentAttendance, setRecentAttendance] = useState<AttendanceRecord[]>([
    { id: "1", timestamp: "2025-01-15 09:00 AM", type: "check-in", location: "Office" },
    { id: "2", timestamp: "2025-01-15 06:00 PM", type: "check-out", location: "Office" },
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Get location automatically when component mounts
    getLocation();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location captured",
            description: "Your current location has been recorded.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Could not get your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  const startCamera = async () => {
    if (!employeeId) {
      toast({
        title: "Employee ID required",
        description: "Please enter your Employee ID first.",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location required",
        description: "Please allow location access first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCapturing(true);
    } catch (error) {
      toast({
        title: "Camera error",
        description: "Could not access camera. Please allow camera permissions.",
        variant: "destructive",
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/png");
        setPhotoData(imageData);
        
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        setIsCapturing(false);
        
        toast({
          title: "Photo captured",
          description: "Your photo has been captured successfully.",
        });
      }
    }
  };

  const handleAttendance = (type: "check-in" | "check-out") => {
    if (!employeeId) {
      toast({
        title: "Employee ID required",
        description: "Please enter your Employee ID.",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location required",
        description: "Please allow location access.",
        variant: "destructive",
      });
      return;
    }

    if (!photoData) {
      toast({
        title: "Photo required",
        description: "Please capture your photo first.",
        variant: "destructive",
      });
      return;
    }

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      type,
      location: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
    };

    setRecentAttendance([newRecord, ...recentAttendance.slice(0, 4)]);
    
    toast({
      title: `${type === "check-in" ? "Check-In" : "Check-Out"} successful!`,
      description: `Recorded at ${newRecord.timestamp}`,
    });

    // Reset form
    setEmployeeId("");
    setPhotoData(null);
    setLocation(null);
    setTimeout(() => getLocation(), 500);
  };

  return (
    <section id="attendance" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Employee <span className="bg-gradient-primary bg-clip-text text-transparent">Attendance</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick and secure attendance tracking with location and photo verification
            </p>
          </div>

          <Card className="p-8 shadow-glow animate-fade-up">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <User className="w-4 h-4 inline mr-2" />
                  Employee ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter your Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                <MapPin className={`w-5 h-5 ${location ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Location Status</div>
                  <div className="text-sm text-muted-foreground">
                    {location 
                      ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`
                      : "Fetching location..."}
                  </div>
                </div>
              </div>

              {!isCapturing && !photoData && (
                <Button 
                  onClick={startCamera} 
                  variant="outline" 
                  className="w-full"
                  size="lg"
                >
                  <Camera className="w-5 h-5" />
                  Capture Photo
                </Button>
              )}

              {isCapturing && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full"
                    />
                  </div>
                  <Button 
                    onClick={capturePhoto} 
                    variant="default"
                    className="w-full"
                    size="lg"
                  >
                    Take Photo
                  </Button>
                </div>
              )}

              {photoData && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={photoData} alt="Captured" className="w-full" />
                  </div>
                  <Button 
                    onClick={() => {
                      setPhotoData(null);
                      startCamera();
                    }} 
                    variant="outline"
                    className="w-full"
                  >
                    Retake Photo
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button 
                  onClick={() => handleAttendance("check-in")}
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  <LogIn className="w-5 h-5" />
                  Check In
                </Button>
                <Button 
                  onClick={() => handleAttendance("check-out")}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Check Out
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Recent Attendance
            </h3>
            <div className="space-y-3">
              {recentAttendance.map((record) => (
                <Card 
                  key={record.id} 
                  className="p-4 flex items-center justify-between hover:shadow-soft transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      record.type === "check-in" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-accent/10 text-accent"
                    }`}>
                      {record.type === "check-in" ? (
                        <LogIn className="w-5 h-5" />
                      ) : (
                        <LogOut className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground capitalize">
                        {record.type.replace("-", " ")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {record.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {record.location}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAttendance;
