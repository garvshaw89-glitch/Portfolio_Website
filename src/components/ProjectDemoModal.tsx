import { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  Play, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  BrainCircuit, 
  Check, 
  RefreshCw, 
  Sparkles,
  Sliders,
  Award
} from 'lucide-react';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDemoModal({ project, onClose }: ProjectDemoModalProps) {
  if (!project) return null;

  const isStockMentor = project.id === 'stock-mentor';
  const isTypingChecker = project.id === 'typing-speed-checker';

  // Typing Speed Checker demo states
  const [typingInput, setTypingInput] = useState('');
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const sampleTypingPrompt = "The quick brown fox jumps over the lazy dog to verify keystroke latency.";

  // StockMentor interactive demo states
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockPrice, setStockPrice] = useState(184.50);
  const [tradeLogs, setTradeLogs] = useState<string[]>([
    "Initial paper balance: $10,000.00",
    "Loaded live simulated order book for AAPL"
  ]);
  const [aiQuestion, setAiQuestion] = useState(
    "Notice the consolidation near the $184 support. What risk-to-reward ratio would protect your trade?"
  );
  const [socraticAnswer, setSocraticAnswer] = useState<string | null>(null);

  // MicroSkill interactive demo states
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [confidence, setConfidence] = useState(70);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [calibrationResult, setCalibrationResult] = useState<string | null>(null);

  const sampleFlashcards = [
    {
      topic: "System Design",
      question: "What is the primary difference between horizontal scaling and vertical scaling in distributed databases?",
      answer: "Vertical scaling increases compute/RAM of a single node (hardware limits), while horizontal scaling adds more commodity nodes using partitioning, sharding, and consensus algorithms (CAP theorem considerations)."
    },
    {
      topic: "Machine Learning",
      question: "Why does the vanishing gradient problem occur in deep networks using Sigmoid activation functions?",
      answer: "The derivative of the standard Sigmoid function peaks at 0.25. When backpropagating through multiple layers, multiplying fractional derivatives causes gradients to exponentially decay toward zero."
    },
    {
      topic: "Data Structures",
      question: "What is the amortized time complexity of inserting into a dynamic array that doubles its capacity?",
      answer: "O(1) amortized time. Although copying elements takes O(n) during a resize, the cost spread across the previous n insertions is an average of O(1)."
    }
  ];

  const handleStockTrade = (type: 'BUY' | 'SELL') => {
    const delta = (Math.random() * 2 - 0.9).toFixed(2);
    const newPrice = +(stockPrice + parseFloat(delta)).toFixed(2);
    setStockPrice(newPrice);
    const log = `[${type}] 10 shares @ $${newPrice} (${delta >= '0' ? '+' : ''}${delta})`;
    setTradeLogs(prev => [log, ...prev.slice(0, 3)]);
  };

  const handleAskSocratic = (q: string) => {
    setAiQuestion(q);
    if (q.includes("support")) {
      setSocraticAnswer("AI Tutor: If support fails, where is the next historical liquidity pool? Setting a stop-loss 1.5% below support limits downside while maintaining positive expectation.");
    } else if (q.includes("volume")) {
      setSocraticAnswer("AI Tutor: High volume on a green candle confirms institutional participation. Low volume rallies often signal an exhausted bull trap. What does the current volume bar tell you?");
    } else {
      setSocraticAnswer("AI Tutor: Socratic analysis suggests checking trendline slope and RSI divergence before positioning. What is your planned entry trigger?");
    }
  };

  const handleEvaluateMicroSkill = () => {
    setIsAnswerRevealed(true);
    if (confidence >= 80) {
      setCalibrationResult("High Confidence Confirmed: Spaced interval advanced to +7 days!");
    } else {
      setCalibrationResult("Calibrated Review: Targeted reinforcement scheduled for +24 hours.");
    }
  };

  const handleNextCard = () => {
    setIsAnswerRevealed(false);
    setCalibrationResult(null);
    setFlashcardIndex((prev) => (prev + 1) % sampleFlashcards.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0a0e27] border border-white/20 rounded-sm shadow-2xl shadow-black overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                {project.title} <span className="text-xs font-mono font-normal text-[#06b6d4]">// Interactive Simulation</span>
              </h3>
              <span className="text-[10px] font-mono text-[#a78bfa] uppercase tracking-wider">
                Live Prototype Sandbox
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-cyan-200 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/20"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-[#06b6d4]" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#c7d2fe] hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {isStockMentor ? (
            // StockMentor Simulation
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#0e1438] border border-purple-800/40">
                <div className="flex items-center gap-2 font-mono text-xs">
                  {['AAPL', 'NVDA', 'TSLA'].map((ticker) => (
                    <button
                      key={ticker}
                      type="button"
                      onClick={() => {
                        setSelectedStock(ticker);
                        setStockPrice(ticker === 'AAPL' ? 184.50 : ticker === 'NVDA' ? 118.20 : 212.80);
                      }}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        selectedStock === ticker
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'bg-purple-950 text-purple-300 hover:text-white'
                      }`}
                    >
                      {ticker}
                    </button>
                  ))}
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-purple-400 block">Simulated Price</span>
                  <span className="text-xl font-display font-bold text-emerald-400 flex items-center gap-1 justify-end">
                    <TrendingUp className="w-4 h-4" /> ${stockPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Simulated Candlestick mini visual */}
              <div className="p-5 rounded-xl bg-[#080b22] border border-purple-900/50 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-purple-400 pb-2 border-b border-purple-900/40">
                  <span>MARKET DEPTH & SINE CANDLES</span>
                  <span className="text-emerald-400">STATUS: LIVE SIMULATION</span>
                </div>
                
                <div className="h-28 flex items-end justify-between gap-2 px-2 py-1 bg-[#060818] rounded-lg border border-purple-950">
                  {[40, 55, 45, 68, 80, 62, 75, 90, 85, 95].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        style={{ height: `${val}%` }}
                        className={`w-full rounded-sm transition-all ${
                          idx % 2 === 0 ? 'bg-cyan-400/80 hover:bg-cyan-300' : 'bg-purple-500/80 hover:bg-purple-400'
                        }`}
                      />
                      <span className="text-[9px] text-purple-500">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStockTrade('BUY')}
                      className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                    >
                      Paper Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockTrade('SELL')}
                      className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50"
                    >
                      Paper Sell
                    </button>
                  </div>
                  <span className="text-[11px] text-purple-400">Zero Financial Risk</span>
                </div>
              </div>

              {/* Socratic AI Mentor Dialogue Box */}
              <div className="p-4 rounded-xl bg-[#0c1236] border border-cyan-500/30 font-sans space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Socratic AI Mentoring Bot</span>
                </div>

                <div className="p-3 rounded-lg bg-[#070a20] border border-purple-900/60 text-xs sm:text-sm text-purple-100 font-mono">
                  <strong className="text-cyan-300">Question: </strong>"{aiQuestion}"
                </div>

                {socraticAnswer && (
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-200 font-mono animate-in fade-in">
                    {socraticAnswer}
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-purple-400 block">
                    Choose a prompt to test Socratic guidance:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleAskSocratic("How should I place a stop loss around current support?")}
                      className="text-xs font-mono px-3 py-1 rounded bg-purple-900/40 hover:bg-purple-800 text-purple-200 border border-purple-700/40 text-left"
                    >
                      "How should I place stop-loss around support?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAskSocratic("How does market volume validate the breakout?")}
                      className="text-xs font-mono px-3 py-1 rounded bg-purple-900/40 hover:bg-purple-800 text-purple-200 border border-purple-700/40 text-left"
                    >
                      "How does market volume validate the breakout?"
                    </button>
                  </div>
                </div>
              </div>

              {/* Trade Logs */}
              <div className="p-3 rounded-xl bg-[#070a1c] border border-purple-950 font-mono text-xs text-purple-300/80 space-y-1">
                <span className="text-[10px] text-purple-500 block uppercase">Simulator Terminal Logs:</span>
                {tradeLogs.map((log, i) => (
                  <div key={i} className="text-[11px] text-cyan-300/90">
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>
          ) : isTypingChecker ? (
            // Typing Speed Checker Simulation
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0a122c] border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-cyan-400">
                  <span className="text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Interactive Keystroke Engine
                  </span>
                  <span>Pure Vanilla JavaScript</span>
                </div>

                <div className="p-4 rounded-xl bg-[#060a1c] border border-white/10 font-mono">
                  <span className="text-[10px] text-purple-300 block uppercase mb-1">Target Passage:</span>
                  <p className="text-sm text-cyan-100 select-none leading-relaxed tracking-wide">
                    {sampleTypingPrompt}
                  </p>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Type the passage above to test real-time WPM calculation..."
                    value={typingInput}
                    onChange={(e) => {
                      if (!typingStartTime && e.target.value.length > 0) {
                        setTypingStartTime(Date.now());
                      }
                      setTypingInput(e.target.value);
                    }}
                    className="w-full p-3 rounded-xl bg-[#060919] border border-cyan-500/40 focus:border-cyan-400 text-white font-mono text-sm outline-none resize-none"
                  />

                  {/* Calculated metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#070e28] border border-cyan-500/20 text-center">
                      <span className="text-[10px] font-mono text-[#c7d2fe] block uppercase">Est. WPM</span>
                      <span className="text-xl font-bold font-mono text-cyan-300">
                        {typingStartTime && typingInput.length > 3
                          ? Math.min(160, Math.round((typingInput.trim().split(/\s+/).length / ((Date.now() - typingStartTime) / 60000))))
                          : 0}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#070e28] border border-purple-500/20 text-center">
                      <span className="text-[10px] font-mono text-[#c7d2fe] block uppercase">Accuracy</span>
                      <span className="text-xl font-bold font-mono text-emerald-400">
                        {typingInput.length > 0
                          ? Math.round(
                              (typingInput.split('').filter((char, i) => char === sampleTypingPrompt[i]).length /
                                typingInput.length) *
                                100
                            )
                          : 100}
                        %
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#070e28] border border-cyan-500/20 text-center">
                      <span className="text-[10px] font-mono text-[#c7d2fe] block uppercase">Characters</span>
                      <span className="text-xl font-bold font-mono text-[#a78bfa]">
                        {typingInput.length} / {sampleTypingPrompt.length}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setTypingInput('');
                        setTypingStartTime(null);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#c7d2fe] bg-white/5 hover:bg-white/10 border border-white/10"
                    >
                      Reset Test
                    </button>

                    <a
                      href="https://typing-speed-checker-liard.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    >
                      <span>Open Full Deployed App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // MicroSkill Simulation
            <div className="space-y-6">
              {/* MicroSkill Card */}
              <div className="p-6 rounded-2xl bg-[#0d1338] border border-purple-500/40 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-purple-400">
                  <span className="text-cyan-300 font-semibold uppercase">
                    Topic: {sampleFlashcards[flashcardIndex].topic}
                  </span>
                  <span>Card {flashcardIndex + 1} of {sampleFlashcards.length}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#070a22] border border-purple-900/60">
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-2 font-display">
                    Active Recall Challenge:
                  </h4>
                  <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-sans">
                    {sampleFlashcards[flashcardIndex].question}
                  </p>
                </div>

                {/* Confidence Calibration Slider */}
                <div className="p-4 rounded-xl bg-[#090e2b] border border-purple-800/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Subjective Confidence Calibration:</span>
                    </span>
                    <span className="font-bold text-cyan-300">{confidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={confidence}
                    onChange={(e) => setConfidence(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-purple-400">
                    <span>Uncertain (10%)</span>
                    <span>Moderately Sure (50%)</span>
                    <span>100% Mastery</span>
                  </div>
                </div>

                {/* Answer reveal */}
                {isAnswerRevealed ? (
                  <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/40 space-y-2 animate-in fade-in">
                    <span className="text-xs font-mono text-cyan-300 font-semibold block">
                      Canonical Answer & Model Reasoning:
                    </span>
                    <p className="text-xs sm:text-sm text-purple-100 font-sans leading-relaxed">
                      {sampleFlashcards[flashcardIndex].answer}
                    </p>
                    {calibrationResult && (
                      <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-400/40 text-xs font-mono text-cyan-200 flex items-center gap-2">
                        <Award className="w-4 h-4 text-cyan-300 shrink-0" />
                        <span>{calibrationResult}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleEvaluateMicroSkill}
                    className="w-full py-2.5 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:opacity-95 transition-opacity"
                  >
                    Reveal Answer & Check Calibration
                  </button>
                )}

                {isAnswerRevealed && (
                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="w-full py-2 rounded-xl font-mono text-xs text-purple-200 bg-purple-900/60 hover:bg-purple-800 border border-purple-600/40 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Next Micro-Session Card</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-purple-900/50 bg-[#080b20] flex items-center justify-between text-xs font-mono text-purple-400">
          <span>Garv Shaw Portfolio Interactive Demo</span>
          <button
            type="button"
            onClick={onClose}
            className="text-cyan-300 hover:underline"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
}
