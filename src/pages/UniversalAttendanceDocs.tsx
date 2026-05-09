import React from 'react';
import { 
  Smartphone, 
  QrCode, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Users, 
  Download, 
  Bell, 
  Shield, 
  AlertCircle,
  Camera,
  LogIn,
  UserPlus,
  Settings,
  Mail
} from 'lucide-react';

const UniversalAttendanceDocs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Universal Attendance Interface</h1>
            </div>
            <div className="bg-blue-700 px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold">v2.0.1</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Quick Start Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 border-blue-200 pb-2">
            Quick Start
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">1. Download the App</h3>
              <p className="text-gray-600">Search for "Universal Attendance Interface" on Google Play Store or App Store</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <LogIn className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">2. Register/Login</h3>
              <p className="text-gray-600">Enter company code, phone number, and name. Verify with OTP</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">3. Grant Permissions</h3>
              <p className="text-gray-600">Allow camera access for QR scanning and location services</p>
            </div>
          </div>
        </section>

        {/* For Employees Section */}
        <section className="mb-12 bg-blue-50 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-blue-800">For Employees: Marking Attendance</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Arrive at Workplace
                  </h3>
                  <p className="text-gray-600">Ensure you're within the company's verified location (Google Maps checks automatically)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                    <QrCode className="h-5 w-5 mr-2 text-blue-600" />
                    Scan QR Code
                  </h3>
                  <p className="text-gray-600 mb-3">Open the app and tap Mark Entry or Mark Exit. Point your camera at the company's QR code</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">💡 Displayed at entrance/exit or in admin panel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Confirm Details
                  </h3>
                  <p className="text-gray-600">Review your name, time, and location. Tap Confirm</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Success
                  </h3>
                  <p className="text-gray-600">You'll see a confirmation screen with timestamp. Status updates in real-time for admins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips for Employees */}
          <div className="mt-6 bg-blue-600 text-white rounded-xl p-6">
            <h4 className="font-bold text-lg mb-3">💡 Pro Tips:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mark entry/exit separately for accurate hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>If QR fails, use manual location check (admin-enabled)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Update profile anytime via My Profile tab</span>
              </li>
            </ul>
          </div>
        </section>

        {/* For Admins Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Settings className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-blue-800">For Admins: Managing the Dashboard</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <LogIn className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Login to Admin Panel</h3>
              <p className="text-gray-600">Use your admin credentials in the app or web dashboard</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Set Up Company</h3>
              <p className="text-gray-600">Add organization details and register employees by name, phone, and role</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Monitor Attendance</h3>
              <p className="text-gray-600">View real-time dashboard and download reports (CSV/Excel)</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Generate QR Code</h3>
              <p className="text-gray-600">Print or share the unique QR for your location</p>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Advanced Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Attendances per minute</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <Bell className="h-8 w-8 mb-3" />
              <div className="font-semibold mb-2">Real-time notifications</div>
              <div className="text-sm text-blue-100">For late arrivals or absences</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <Users className="h-8 w-8 mb-3" />
              <div className="font-semibold mb-2">Employee self-edits</div>
              <div className="text-sm text-blue-100">For profile updates</div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-blue-800">Troubleshooting</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-blue-100">
              <div className="p-4 hover:bg-blue-50 transition">
                <h3 className="font-semibold text-blue-800 mb-1">📍 Location Not Detected</h3>
                <p className="text-gray-600 text-sm">Enable GPS and ensure you're on-site</p>
              </div>
              <div className="p-4 hover:bg-blue-50 transition">
                <h3 className="font-semibold text-blue-800 mb-1">📷 QR Scan Issues</h3>
                <p className="text-gray-600 text-sm">Clean camera lens; regenerate QR in admin panel</p>
              </div>
              <div className="p-4 hover:bg-blue-50 transition">
                <h3 className="font-semibold text-blue-800 mb-1">🔑 Login Problems</h3>
                <p className="text-gray-600 text-sm">Contact admin for company code reset</p>
              </div>
            </div>
          </div>
        </section>

        {/* Support & Security */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-blue-800">Support</h3>
            </div>
            <p className="text-gray-600 mb-2">Email: support@universalattendance.com</p>
            <p className="text-gray-600">or chat in-app</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-blue-800">Security Note</h3>
            </div>
            <p className="text-gray-600">Data is secure and encrypted. Always use official company QR codes.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-6 border-t border-blue-100">
          <p>Universal Attendance Interface © 2024. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default UniversalAttendanceDocs;