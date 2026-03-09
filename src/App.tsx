import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';

export default function App() {
  const coverRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!coverRef.current) return;
    
    try {
      setIsDownloading(true);
      // Small delay to ensure any rendering is complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await htmlToImage.toPng(coverRef.current, {
        pixelRatio: 3, // High resolution for print/sharing
        backgroundColor: '#000000',
      });
      
      const link = document.createElement('a');
      link.download = 'GenZ-Survival-Manual-Cover.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-[420px] my-8">
      {/* Cover Container */}
      <div ref={coverRef} className="w-full aspect-[148/210] bg-black relative overflow-hidden shadow-2xl shadow-pink-4/20 border border-white/10 group">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-80 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-4 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
        <div className="absolute bottom-10 -left-20 w-72 h-72 bg-pink-2 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff47bd1a_1px,transparent_1px),linear-gradient(to_bottom,#ff47bd1a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative h-full flex flex-col justify-between p-8 z-10">
        
        {/* Top Section: Author */}
        <div className="flex justify-between items-start">
          <div className="uppercase tracking-[0.2em] text-pink-1 text-sm font-semibold">
            Charoensin Ko
          </div>
          <div className="bg-pink-4 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm transform rotate-3 shadow-lg shadow-pink-4/50">
            Bestseller
          </div>
        </div>

        {/* Middle Section: Title */}
        <div className="mt-12 flex-grow">
          <h1 className="font-display font-black text-[4.5rem] leading-[0.85] text-white tracking-tighter uppercase flex flex-col">
            <span className="text-pink-1">Gen Z</span>
            <span className="text-pink-3">Survival</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-2 to-pink-4">Manual</span>
          </h1>
          
          <div className="mt-8 border-l-4 border-pink-4 pl-4">
            <h2 className="text-white font-semibold text-xl leading-tight">
              กลยุทธ์ครองออฟฟิศยุคใหม่
              <br />
              <span className="text-pink-2">ทำงานจากที่ไหนก็ได้ให้โลกจำ</span>
            </h2>
          </div>
        </div>

        {/* Bottom Section: Blurb */}
        <div className="mt-auto pt-6 border-t border-pink-4/30">
          <p className="text-pink-1/90 text-[0.9rem] leading-relaxed font-light">
            เบื่อออฟฟิศระบบเต่าล้านปี? เปลี่ยนความอึดอัดเป็นอำนาจต่อรอง ด้วยกลยุทธ์ทำงานริมทะเลแต่ผลงานกระแทกตาจนหัวหน้าต้องยอมสยบ
          </p>
        </div>
      </div>
      
      {/* Decorative barcode/ISBN area */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end opacity-60 pointer-events-none">
        <div className="flex gap-[2px] h-8 items-end">
          {[...Array(15)].map((_, i) => {
            const widths = ['w-[1px]', 'w-[2px]', 'w-[3px]', 'w-[4px]'];
            const heights = ['h-full', 'h-[80%]', 'h-[90%]'];
            const w = widths[Math.floor(Math.random() * widths.length)];
            const h = heights[Math.floor(Math.random() * heights.length)];
            return <div key={i} className={`bg-pink-1 ${w} ${h}`}></div>;
          })}
        </div>
        <div className="text-[8px] text-pink-1 mt-1 font-mono tracking-widest">A5 EDITION</div>
      </div>
    </div>

      {/* Download Button */}
      <button 
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center justify-center gap-2 w-full py-4 bg-pink-4 text-black font-bold text-lg rounded-xl hover:bg-pink-3 hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-lg shadow-pink-4/20"
      >
        {isDownloading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            กำลังเตรียมไฟล์ภาพ...
          </>
        ) : (
          <>
            <Download size={24} />
            ดาวน์โหลดหน้าปก (PNG)
          </>
        )}
      </button>
    </div>
  );
}
