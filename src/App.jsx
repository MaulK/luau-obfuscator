import { useState, useRef, useEffect } from 'react';

// --- HELPER FUNCTIONS ---
const randomString = (length = 8) => {
  const chars = "XYZ01_VOID_RUNNER_99_SYSTEM_CRITICAL"; 
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const randomVar = () => {
  const prefix = ["_VOID", "MEM", "HEX", "CYPHER", "NULL", "ROOT", "STACK"];
  const randPre = prefix[Math.floor(Math.random() * prefix.length)];
  return randPre + "_0x" + Math.floor(Math.random() * 99999).toString(16).toUpperCase();
};

function App() {
  // --- STATE ---
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("COPY DATA");
  const [statusMsg, setStatusMsg] = useState("SYSTEM_READY");
  
  // State untuk Real-Time Memory Usage
  const [memUsage, setMemUsage] = useState("CALCULATING...");

  // --- REFS ---
  const fileInputRef = useRef(null);

  // --- EFFECT: REAL TIME MEMORY MONITOR ---
  useEffect(() => {
    const updateMemory = () => {
      // Cek apakah browser mendukung API memory (Chrome/Edge support)
      if (window.performance && window.performance.memory) {
        const usedBytes = window.performance.memory.usedJSHeapSize;
        const totalBytes = window.performance.memory.totalJSHeapSize;
        
        // Konversi ke MB dengan 1 desimal
        const usedMB = (usedBytes / (1024 * 1024)).toFixed(1);
        const totalMB = (totalBytes / (1024 * 1024)).toFixed(0);
        
        setMemUsage(`HEAP: ${usedMB}MB / ${totalMB}MB`);
      } else {
        // Fallback untuk Firefox/Safari yang memblokir API ini
        setMemUsage("MEM: SYSTEM_OPTIMIZED");
      }
    };

    // Jalankan pertama kali
    updateMemory();

    // Update setiap 2 detik agar tidak memberatkan performa
    const interval = setInterval(updateMemory, 2000);

    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---

  // 1. ADVANCED OBFUSCATION LOGIC (V5)
  const handleObfuscate = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setStatusMsg("COMPRESSING & ENCRYPTING...");
    
    let steps = 0;
    const interval = setInterval(() => {
        setOutputText(prev => prev + randomString(64) + "\n");
        steps++;
        if(steps > 20) clearInterval(interval);
    }, 40);

    setTimeout(() => {
      clearInterval(interval);
      
      const key1 = Math.floor(Math.random() * 255);
      const key2 = Math.floor(Math.random() * 255);
      const keyString = randomString(32); 
      
      const v_data = randomVar();    
      const v_keyStr = randomVar();  
      const v_idx = randomVar();     
      const v_res = randomVar();     
      const v_func = randomVar();    
      const v_byte = randomVar();    
      const v_char = randomVar();    
      const v_concat = randomVar();  
      const v_xor = randomVar();     
      const v_bit = randomVar();

      let encryptedString = "";
      
      for (let i = 0; i < inputText.length; i++) {
        const charCode = inputText.charCodeAt(i);
        const polyKey = keyString.charCodeAt(i % keyString.length);
        let step1 = charCode ^ polyKey;
        let step2 = (step1 + i + key1) % 256;
        let finalByte = step2 ^ key2;
        encryptedString += "\\" + finalByte.toString().padStart(3, '0');
      }

      const payload = `--[[ 
    // PROTOCOL: VOID_RUNNER // CORE: V5_STABLE
    // TARGET: ROBLOX LUAU
    // SECURITY: POLY_XOR + COMPRESSION
]]

local ${v_data} = "${encryptedString}"
local ${v_keyStr} = "${keyString}"

-- [OPTIMIZATION] Upvalue Caching
local ${v_byte} = string.byte
local ${v_char} = string.char
local ${v_concat} = table.concat

-- [COMPATIBILITY] Robust Bitwise XOR for Roblox
local ${v_bit} = bit32 or require('bit')
local ${v_xor} = ${v_bit}.bxor

local function ${v_func}()
    local ${v_res} = {}
    local _len = #${v_data}
    local _kLen = #${v_keyStr}
    
    for ${v_idx} = 1, _len do
        local _b = ${v_byte}(${v_data}, ${v_idx})
        local _pk = ${v_byte}(${v_keyStr}, (${v_idx} - 1) % _kLen + 1)
        
        -- Decryption Logic
        local _s1 = ${v_xor}(_b, ${key2})
        local _s2 = (_s1 - (${v_idx} - 1) - ${key1}) % 256
        if _s2 < 0 then _s2 = _s2 + 256 end
        local _final = ${v_xor}(_s2, _pk)
        
        ${v_res}[${v_idx}] = ${v_char}(_final)
    end
    
    return ${v_concat}(${v_res})
end

local _exec = loadstring or load
_exec(${v_func}())()`;

      setOutputText(payload);
      setIsProcessing(false);
      setStatusMsg("OPTIMIZED_BUILD // ROBLOX_READY");
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target.result);
      setStatusMsg(`FILE_LOADED: ${file.name.toUpperCase()}`);
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VOID_SECURE.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopyStatus("COPIED!");
    setTimeout(() => setCopyStatus("COPY DATA"), 1500);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setStatusMsg("SYSTEM_CLEARED");
  };

  return (
    <div className="relative min-h-screen bg-void text-neon-blue font-mono selection:bg-neon-pink selection:text-white flex items-center justify-center p-2 sm:p-6 overflow-hidden">
      
      <div className="crt-overlay"></div>
      
      <div className="fixed inset-0 grid grid-cols-[repeat(20,1fr)] opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <div key={i} className="border-r border-neon-blue h-full"></div>
        ))}
      </div>

      <div className="relative w-full max-w-6xl border-2 border-neon-blue bg-void/90 z-10 clip-corner shadow-[0_0_50px_rgba(0,243,255,0.1)] flex flex-col h-[90vh] sm:h-auto">
        
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-pink -translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-pink translate-x-1 translate-y-1"></div>

        {/* --- HEADER --- */}
        <div className="flex items-center justify-between border-b border-neon-blue/30 p-4 bg-neon-blue/5 backdrop-blur shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-neon-blue flex items-center justify-center bg-black">
                <i className="fa-solid fa-biohazard text-xl text-neon-pink animate-pulse-fast"></i>
            </div>
            <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-widest text-glow hover-glitch cursor-default">
                    PROTOCOL<span className="text-neon-pink">_VOID</span>
                </h1>
                <p className="text-[10px] text-neon-blue/60 tracking-[0.3em]">SECURE LUA ENCRYPTION ENGINE</p>
            </div>
          </div>
          
          <div className="text-right hidden sm:block">
            <div className="text-xs text-neon-pink font-bold animate-pulse">STATUS: {isProcessing ? 'PROCESSING' : 'ONLINE'}</div>
            <div className="text-[10px] text-neon-blue/50">V1.5 // STABLE VERSION</div>
          </div>
        </div>

        {/* --- WORKSPACE --- */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            
            {/* LEFT: INPUT */}
            <div className="flex-1 p-4 flex flex-col border-b lg:border-b-0 lg:border-r border-neon-blue/30 relative min-h-[300px]">
                <div className="absolute top-10 right-0 w-2 h-20 bg-neon-blue hidden lg:block"></div>

                <div className="flex justify-between items-end mb-2 shrink-0">
                    <label className="text-xs font-bold bg-neon-blue/10 px-2 py-1 border-l-2 border-neon-blue">
                        <i className="fa-solid fa-code mr-2"></i>INPUT_SOURCE
                    </label>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} 
                        className="text-[10px] border border-neon-blue/50 px-3 py-1 hover:bg-neon-blue hover:text-black transition-all uppercase tracking-wider">
                        [ UPLOAD_FILE ]
                    </button>
                </div>

                <div className="flex-1 bg-panel border border-neon-blue/20 p-1">
                    <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full h-full bg-black/50 text-gray-300 p-4 text-xs focus:outline-none focus:bg-black/80 transition-all resize-none font-mono leading-relaxed"
                        placeholder="// INSERT_MALICIOUS_CODE_HERE..."
                        spellCheck="false"
                    />
                </div>
            </div>

            {/* MIDDLE: EXECUTE BUTTON */}
            <div className="w-full lg:w-24 border-b lg:border-b-0 lg:border-r border-neon-blue/30 flex lg:flex-col items-center justify-center gap-4 p-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] shrink-0">
                <button 
                    onClick={handleObfuscate}
                    disabled={isProcessing}
                    className="group relative w-full lg:w-full h-14 lg:h-auto lg:py-8 border border-neon-blue bg-black hover:bg-neon-blue/10 transition-all flex lg:flex-col flex-row items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(0,243,255,0.2)]"
                >
                    <div className={`absolute inset-0 bg-neon-blue/20 lg:translate-y-full lg:group-hover:translate-y-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${isProcessing ? 'translate-y-0 translate-x-0 animate-pulse' : ''}`}></div>
                    <i className={`fa-solid fa-fingerprint text-2xl ${isProcessing ? 'text-neon-pink animate-spin' : 'text-neon-blue'}`}></i>
                    <span className="text-[12px] lg:text-[10px] font-bold tracking-widest lg:writing-vertical-lr lg:writing-mode-horizontal">
                        {isProcessing ? 'wait...' : 'EXECUTE'}
                    </span>
                </button>
            </div>

            {/* RIGHT: OUTPUT */}
            <div className="flex-1 p-4 flex flex-col relative min-h-[300px]">
                <div className="flex justify-between items-end mb-2 shrink-0">
                    <label className="text-xs font-bold bg-neon-pink/10 text-neon-pink px-2 py-1 border-l-2 border-neon-pink">
                        <i className="fa-solid fa-terminal mr-2"></i>OUTPUT_TERMINAL
                    </label>
                    <div className="text-[10px] text-gray-500 truncate max-w-[150px]">{statusMsg}</div>
                </div>

                <div className="flex-1 bg-panel border border-neon-pink/20 p-1 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat space-y-2">
                        {[...Array(10)].map((_, i) => <div key={i} className="h-px w-full bg-white/20"></div>)}
                    </div>

                    <textarea 
                        value={outputText}
                        readOnly
                        className="relative w-full h-full bg-black/50 text-neon-blue p-4 text-xs focus:outline-none resize-none font-mono leading-relaxed"
                        placeholder="// WAITING_FOR_EXECUTION..."
                    />
                </div>

                {/* ACTION BAR */}
                <div className="mt-4 flex gap-3 h-10 items-stretch shrink-0">
                    <button onClick={handleDownload} className="flex-1 border border-neon-blue bg-neon-blue/5 hover:bg-neon-blue hover:text-black transition-all text-xs font-bold uppercase flex items-center justify-center gap-2 group clip-corner">
                        <i className="fa-solid fa-download group-hover:animate-bounce"></i> <span className="hidden sm:inline">SAVE_LUA</span>
                    </button>
                    
                    <button onClick={handleCopy} className="flex-1 border border-neon-blue bg-neon-blue/5 hover:bg-neon-blue hover:text-black transition-all text-xs font-bold uppercase flex items-center justify-center gap-2 group clip-corner">
                        <i className={copyStatus === 'COPIED!' ? "fa-solid fa-check" : "fa-regular fa-copy"}></i> {copyStatus}
                    </button>

                    <button 
                        onClick={handleClear} 
                        className="w-20 bg-neon-pink text-white border-2 border-neon-pink hover:bg-black hover:text-neon-pink hover:shadow-[0_0_35px_#ff003c] transition-all duration-300 text-sm font-bold uppercase clip-corner flex items-center justify-center shadow-[0_0_15px_#ff003c] group relative overflow-hidden"
                        title="EMERGENCY PURGE"
                    >
                        <div className="absolute inset-0 bg-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 mix-blend-overlay"></div>
                        <i className="fa-solid fa-trash-can group-hover:animate-pulse z-10"></i>
                    </button>
                </div>
            </div>
        </div>

        {/* --- FOOTER (UPDATED REAL-TIME MEMORY) --- */}
        <div className="border-t border-neon-blue/30 p-2 bg-black flex justify-between items-center text-[9px] uppercase tracking-widest text-gray-600 shrink-0">
            {/* Bagian ini sekarang dinamis */}
            <div>{memUsage} // SECURE_CONNECTION</div>
            
            <div className="flex gap-4">
                <a href="https://github.com/MaulanaKhoirusyifa" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue cursor-pointer transition-colors">
                    GITHUB_REPO
                </a>
                <a href="https://discord.gg/yourinvite" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink cursor-pointer transition-colors">
                    DISCORD
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;