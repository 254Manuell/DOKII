import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/doki-logo.png"
                alt="DOKI - Your Pocket Doctor"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold">DOKI</span>
                <span className="text-xs text-gray-400">Your Pocket Doctor</span>
              </div>
            </div>
            <p className="text-gray-400">
              Empowering Kenya's health with AI-powered diagnostics and healthcare solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/diagnostics" className="hover:text-white transition-colors">
                  AI Diagnostics
                </a>
              </li>
              <li>
                <a href="/medicine-scanner" className="hover:text-white transition-colors">
                  Medicine Scanner
                </a>
              </li>
              <li>
                <a href="/clinic-locator" className="hover:text-white transition-colors">
                  Clinic Locator
                </a>
              </li>
              <li>
                <a href="/health-education" className="hover:text-white transition-colors">
                  Health Education
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe to our newsletter</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Input your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <select className="bg-gray-800 border-gray-700 text-white rounded px-3 py-1">
              <option>English</option>
              <option>Kiswahili</option>
            </select>
          </div>
          <p className="text-gray-400 text-sm">© 2024 DOKI. All rights reserved. Made in Kenya 🇰🇪</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
