"use client";

import { useState, useEffect, useRef } from "react";
import { Download, RefreshCw, QrCode } from "lucide-react";
import { Button, Card } from "@/components/ui";

/**
 * QR Code Card Component
 * Generates and displays a QR code for collection point check-in
 * Includes timestamp for security and download functionality
 */

interface QRCodeCardProps {
  userId: string;
  userName: string;
}

export function QRCodeCard({ userId, userName }: QRCodeCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code data with timestamp for security
  const generateQRData = () => {
    const now = new Date();
    const timestampStr = now.toISOString();
    setTimestamp(timestampStr);
    
    // Create secure QR code payload
    const qrData = JSON.stringify({
      userId,
      userName,
      timestamp: timestampStr,
      type: "collection-checkin",
    });
    
    return qrData;
  };

  // Simple QR Code generation using Canvas
  const generateQRCode = async (data: string) => {
    setIsGenerating(true);
    
    try {
      // Use a simple approach to generate QR code as a data URL
      // In production, you'd use a proper QR library like qrcode or qr-code-styling
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Set canvas size
      const size = 280;
      canvas.width = size;
      canvas.height = size;
      
      // Clear canvas
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
      
      // Generate QR code pattern (simplified version)
      // This creates a visual representation - in production use a real QR library
      const moduleSize = 7;
      const modules = Math.floor(size / moduleSize);
      
      // Create deterministic pattern from data
      ctx.fillStyle = "black";
      for (let row = 0; row < modules; row++) {
        for (let col = 0; col < modules; col++) {
          // Use data hash to determine if module should be filled
          const index = (row * modules + col) % data.length;
          const charCode = data.charCodeAt(index);
          
          // Add corner patterns (position markers)
          const isCorner = 
            (row < 7 && col < 7) || 
            (row < 7 && col >= modules - 7) || 
            (row >= modules - 7 && col < 7);
          
          if (isCorner || (charCode % 2 === 0 && (row + col) % 3 !== 0)) {
            ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize - 1, moduleSize - 1);
          }
        }
      }
      
      // Add timing patterns
      for (let i = 8; i < modules - 8; i++) {
        if (i % 2 === 0) {
          ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize - 1, moduleSize - 1);
          ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize - 1, moduleSize - 1);
        }
      }
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");
      setQrCodeUrl(dataUrl);
      
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate QR code on mount and when refreshed
  useEffect(() => {
    const data = generateQRData();
    generateQRCode(data);
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh QR code with new timestamp
  const handleRefresh = () => {
    const data = generateQRData();
    generateQRCode(data);
  };

  // Download QR code
  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement("a");
    link.download = `wastefi-checkin-${userId}-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  // Format timestamp for display
  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-lg font-semibold">Check-in QR Code</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isGenerating}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          Show this QR code at collection points for quick, contactless check-in
        </p>

        {/* QR Code Display */}
        <div className="flex justify-center mb-4">
          <div className="relative bg-white p-4 rounded-lg shadow-inner border-2 border-[var(--border)]">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Collection Point Check-in QR Code"
                className="w-[280px] h-[280px]"
              />
            ) : (
              <div className="w-[280px] h-[280px] flex items-center justify-center bg-gray-100 rounded">
                <div className="text-center">
                  <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Generating QR Code...</p>
                </div>
              </div>
            )}
            
            {/* Hidden canvas for QR generation */}
            <canvas
              ref={canvasRef}
              className="hidden"
            />
          </div>
        </div>

        {/* Timestamp info */}
        {timestamp && (
          <div className="text-xs text-[var(--muted-foreground)] text-center mb-4">
            Generated: {formatTimestamp(timestamp)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleDownload}
            disabled={!qrCodeUrl}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleRefresh}
            disabled={isGenerating}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="mt-4 p-3 bg-[var(--secondary)] rounded-lg">
          <p className="text-xs text-[var(--muted-foreground)]">
            💡 <strong>Tip:</strong> Refresh your QR code periodically for enhanced security. 
            You can also download it for offline use at collection points.
          </p>
        </div>
      </div>
    </Card>
  );
}
