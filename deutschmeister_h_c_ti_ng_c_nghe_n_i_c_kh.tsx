import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Mic, MicOff, BookOpen, Calendar, Award, Wrench, Play, Pause, CheckCircle2, 
  XCircle, AlertCircle, RefreshCw, Clock, ArrowRight, ShieldCheck, Sparkles, UserCheck, 
  Send, Layers, Moon, Sun, Settings, Bell, Download, ChevronRight, MessageSquare, Headphones,
  Briefcase, Check, HelpCircle
} from 'lucide-react';

// ============================================================================
// DỮ LIỆU BÀI HỌC THEO LỘ TRÌNH (A1 - B2) & CƠ KHÍ CHUYÊN NGÀNH
// ============================================================================
const LESSON_LEVELS = [
  { id: 'A1', name: 'A1 - Nhập Môn & Giao Tiếp Cơ Bản', count: 12 },
  { id: 'A2', name: 'A2 - Giao Tiếp Hàng Ngày & Công Việc Nhẹ', count: 15 },
  { id: 'B1', name: 'B1 - Tự Tin Thảo Luận & Làm Việc', count: 18 },
  { id: 'B2', name: 'B2 - Thành Thạo Chuyên Môn & Phỏng Vấn', count: 20 },
  { id: 'MECHANICAL', name: '⚙️ Tiếng Đức Cơ Khí (Maschinenbau)', count: 16 }
];

// Mẫu bài học demo chuẩn
const SAMPLE_LESSONS = [
  {
    id: 'l1',
    level: 'A1',
    title: 'Sich vorstellen & im Büro begrüßen',
    description: 'Chào hỏi, giới thiệu bản thân và đồng nghiệp trong môi trường làm việc.',
    audioText: "Guten Tag! Mein Name ist Nguyen. Ich bin neuer Ingenieur hier im Betrieb. Freut mich, Sie kennenzulernen. Wie heißen Sie?",
    translation: "Xin chào! Tên tôi là Nguyên. Tôi là kỹ sư mới ở doanh nghiệp. Rất vui được quen biết ngài. Ngài tên là gì?",
    nativeTips: "Người Đức trong môi trường công sở ban đầu luôn xưng 'Sie' và dùng 'Guten Tag' hoặc 'Hallo'. Chỉ dùng 'Du' khi đồng nghiệp đề nghị (Siezen -> Duzen).",
    vocab: [
      { de: 'der Betrieb', vi: 'Doanh nghiệp / Xưởng sản xuất', example: 'Ich arbeite in einem großen Betrieb.' },
      { de: 'der Ingenieur', vi: 'Kỹ sư', example: 'Er ist Ingenieur von Beruf.' },
      { de: 'sich vorstellen', vi: 'Giới thiệu bản thân', example: 'Darf ich mich vorstellen?' }
    ],
    quiz: [
      {
        question: "Trong đoạn băng, anh Nguyên làm nghề gì?",
        options: ["Arzt (Bác sĩ)", "Ingenieur (Kỹ sư)", "Lehrer (Giáo viên)", "Techniker (Kỹ thuật viên)"],
        correct: 1
      },
      {
        question: "Từ nào trong tiếng Đức có nghĩa là 'Rất vui được quen biết ngài'?",
        options: ["Auf Wiedersehen", "Freut mich, Sie kennenzulernen", "Wie geht es Ihnen?", "Guten Morgen"],
        correct: 1
      }
    ]
  },
  {
    id: 'l2',
    level: 'MECHANICAL',
    title: 'Werkstatt & Messwerkzeuge (Xưởng & Dụng cụ đo)',
    description: 'Từ vựng & hội thoại thực tế tại xưởng gia công cơ khí Đức.',
    audioText: "Hallo Thomas! Kannst du mir bitte den Messschieber und die technische Zeichnung bringen? Wir müssen das Bauteil vor der Abnahme noch einmal nachmessen.",
    translation: "Chào Thomas! Cậu lấy giúp tớ cái thước kẹp và bản vẽ kỹ thuật được không? Chúng ta phải đo lại linh kiện trước khi nghiệm thu.",
    nativeTips: "Trong xưởng (Werkstatt), từ 'Messschieber' phổ biến hơn rất nhiều so với từ sách vở 'Schieblehre'.",
    vocab: [
      { de: 'der Messschieber', vi: 'Thước kẹp / Thước cặp', example: 'Miss die Dicke mit dem Messschieber.' },
      { de: 'die Zeichnung', vi: 'Bản vẽ kỹ thuật', example: 'Die Zeichnung ist im Maßstab 1:5.' },
      { de: 'das Bauteil', vi: 'Linh kiện / Chi tiết máy', example: 'Das Bauteil ist aus Edelstahl.' },
      { de: 'die Abnahme', vi: 'Sự nghiệm thu / Kiểm tra bàn giao', example: 'Morgen ist die finale Abnahme.' },
      { de: 'die Fräsmaschine', vi: 'Máy phay', example: 'Die Fräsmaschine läuft automatisch.' }
    ],
    quiz: [
      {
        question: "Dụng cụ đo nào được yêu cầu lấy trong hội thoại?",
        options: ["Mikrometer (Panme)", "Messschieber (Thước kẹp)", "Lineal (Thước thẳng)", "Wasserwaage (Thước nivo)"],
        correct: 1
      },
      {
        question: "Từ 'die Abnahme' trong cơ khí nghĩa là gì?",
        options: ["Lắp ráp", "Nghiệm thu / Bàn giao", "Sửa chữa", "Vận chuyển"],
        correct: 1
      }
    ]
  },
  {
    id: 'l3',
    level: 'B1',
    title: 'Probleme im Prozess melden (Báo cáo sự cố quy trình)',
    description: 'Cách phản ánh sự cố kỹ thuật và đề xuất giải pháp với Trưởng ca (Schichtleiter).',
    audioText: "Herr Müller, die CNC-Fräsmaschine hat eine Störung gemeldet. Die Toleranzabweichung ist zu hoch. Ich schlage vor, wir stoppen kurz die Produktion und prüfen das Werkzeug.",
    translation: "Thưa ông Müller, máy phay CNC vừa báo lỗi. Độ sai lệch dung sai quá cao. Tôi đề xuất chúng ta tạm dừng sản xuất và kiểm tra dao cụ.",
    nativeTips: "Khi báo sự cố ở Đức, hãy luôn đi kèm 'Ich schlage vor...' (Tôi đề xuất...) thay vì chỉ than phiền. Người Đức đánh giá cao tư duy hướng đến giải pháp (Lösungsorientiert).",
    vocab: [
      { de: 'die Störung', vi: 'Sự cố / Lỗi vận hành', example: 'Eine Störung ist aufgetreten.' },
      { de: 'die Toleranzabweichung', vi: 'Sai lệch dung sai', example: 'Die Toleranzabweichung liegt bei 0,02mm.' },
      { de: 'das Werkzeug', vi: 'Dụng cụ / Dao cụ gia công', example: 'Das Werkzeug ist verschlissen.' }
    ],
    quiz: [
      {
        question: "Vấn đề xảy ra với máy phay CNC là gì?",
        options: ["Mất điện", "Sai lệch dung sai quá cao", "Hết nhiên liệu", "Hỏng màn hình"],
        correct: 1
      }
    ]
  }
];

// TỪ VỰNG CƠ KHÍ TỪ XƯỞNG TỚI VĂN PHÒNG
const MECH_DICTIONARY = [
  { category: 'Werkstatt (Dưới Xưởng)', de: 'der Messschieber', vi: 'Thước kẹp', pronunciation: 'mɛs-ʃiːbər', example: 'Überprüfe die Maße mit dem Messschieber.' },
  { category: 'Werkstatt (Dưới Xưởng)', de: 'die Fräsmaschine', vi: 'Máy phay', pronunciation: 'frɛːs-ma-ʃiːnə', example: 'Die CNC-Fräsmaschine fräst das Gewinde.' },
  { category: 'Werkstatt (Dưới Xưởng)', de: 'das Schweißen', vi: 'Việc hàn / Kỹ thuật hàn', example: 'Beim Schweißen muss man Schutzbrille tragen.' },
  { category: 'Werkstatt (Dưới Xưởng)', de: 'der Arbeitsschutz', vi: 'Bảo hộ lao động', example: 'Arbeitsschutz steht an erster Stelle.' },
  { category: 'Werkstatt (Dưới Xưởng)', de: 'der Drehmomentschlüssel', vi: 'Cờ lê lực', example: 'Ziehe die Schraube mit dem Drehmomentschlüssel fest.' },
  { category: 'Büro (Văn Phòng Kỹ Thuật)', de: 'die Konstruktion (CAD)', vi: 'Thiết kế cơ khí (CAD)', example: 'Er arbeitet in der CAD-Konstruktion.' },
  { category: 'Büro (Văn Phòng Kỹ Thuật)', de: 'die Festigkeitsberechnung', vi: 'Tính toán độ bền', example: 'Die Berechnung zeigt eine hohe Belastbarkeit.' },
  { category: 'Büro (Văn Phòng Kỹ Thuật)', de: 'das Datenblatt', vi: 'Bảng thông số kỹ thuật', example: 'Schau bitte ins technische Datenblatt.' },
  { category: 'Büro (Văn Phòng Kỹ Thuật)', de: 'die Qualitätskontrolle', vi: 'Quản lý chất lượng (QC)', example: 'Die Qualitätskontrolle hat das Teil freigegeben.' },
  { category: 'Büro (Văn Phòng Kỹ Thuật)', de: 'die Stückliste', vi: 'Danh mục vật tư / BOM', example: 'Trage alle Komponenten in die Stückliste ein.' }
];

export default function App() {
  // Theme & App Navigation State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'lesson' | 'ai_interview' | 'mech_vocab' | 'schedule'

  // Current Lesson State
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [currentLesson, setCurrentLesson] = useState(SAMPLE_LESSONS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // AI Voice Interview Simulation State
  const [interviewRole, setInterviewRole] = useState('hr_manager'); // 'hr_manager' | 'workshop_master' | 'colleague'
  const [isRecording, setIsRecording] = useState(false);
  const [userSpokenText, setUserSpokenText] = useState('');
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([
    {
      sender: 'ai',
      text: "Guten Tag! Willkommen zum Vorstellungsgespräch. Stellen Sie sich bitte kurz vor und erzählen Sie uns von Ihrer Erfahrung im Maschinenbau.",
      viText: "Xin chào! Chào mừng bạn đến với buổi phỏng vấn. Bạn hãy giới thiệu ngắn gọn về bản thân và kinh nghiệm trong ngành cơ khí nhé.",
      audioUrl: null
    }
  ]);
  const [aiFeedback, setAiFeedback] = useState(null);

  // Schedule & Calendar Reminders State
  const [studySchedule, setStudySchedule] = useState(() => {
    const saved = localStorage.getItem('dm_schedule');
    return saved ? JSON.parse(saved) : [
      { id: 1, time: '07:30', title: 'Luyện Nghe & Từ Vựng 20 Phút (A1/A2)', days: ['Thứ 2', 'Thứ 4', 'Thứ 6'], active: true },
      { id: 2, time: '12:15', title: 'Học 5 Từ Vựng Cơ Khí Xưởng & Văn Phòng', days: ['Mỗi ngày'], active: true },
      { id: 3, time: '20:00', title: 'Phòng Luyện Nói AI Voice Phỏng Vấn (15p)', days: ['Thứ 3', 'Thứ 5', 'Thứ 7'], active: true }
    ];
  });
  const [newScheduleTime, setNewScheduleTime] = useState('19:30');
  const [newScheduleTitle, setNewScheduleTitle] = useState('');

  // Recognition Ref
  const recognitionRef = useRef(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'de-DE'; // Tiếng Đức

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserSpokenText(transcript);
      };

      recognitionRef.current.onerror = (err) => {
        console.error("Speech Recognition Error: ", err);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Text-To-Speech Helper for German
  const speakGerman = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9; // Slightly slower for clear listening practice
      
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ phát âm thanh trực tiếp SpeechSynthesis.");
    }
  };

  // Toggle Voice Recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói Web Speech API. Vui lòng thử dùng Chrome hoặc Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setUserSpokenText('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // Handle Send Spoken Audio to AI Analysis
  const handleSendSpokenText = async () => {
    if (!userSpokenText.trim()) return;

    const currentText = userSpokenText;
    setUserSpokenText('');

    // Add User message to chat
    const updatedHistory = [
      ...interviewHistory,
      { sender: 'user', text: currentText }
    ];
    setInterviewHistory(updatedHistory);
    setAiAnalyzing(true);

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt = `
      Bạn là một nhà tuyển dụng / chuyên gia kỹ thuật người Đức đang phỏng vấn trực tiếp một kỹ sư/người lao động Việt Nam.
      
      NHIỆM VỤ CỦA BẠN:
      1. Đưa ra câu phản hồi bằng Tiếng Đức tự nhiên (Next question or reply in interview).
      2. Đồng thời ĐÁNH GIÁ & SỬA LỖI chi tiết câu trả lời của người dùng vừa nói:
         - Phát âm & Ngữ pháp (Grammatik & Aussprache)
         - Gợi ý cách diễn đạt hay hơn, tự nhiên hơn đúng chuẩn phong cách nói chuyện bên Đức (Redemittel & Umgangssprache).
      
      BẮT BUỘC TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON sau:
      {
        "nextGermanResponse": "Câu phản hồi tiếp theo bằng tiếng Đức...",
        "vietnameseTranslation": "Bản dịch tiếng Việt của câu phản hồi...",
        "grammarCorrections": "Chỉ ra lỗi sai ngữ pháp nếu có...",
        "betterExpressions": "Gợi ý câu hay hơn sát với thực tế bên Đức...",
        "pronunciationRating": "Tốt / Cần cải thiện (kèm nhận xét)"
      }
      `;

      const userPrompt = `Người dùng vừa nói: "${currentText}". Bối cảnh phỏng vấn: ${interviewRole}. Hãy phản hồi theo định dạng JSON yêu cầu.`;

      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" }
      };

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        
        // Add AI response
        setInterviewHistory(prev => [
          ...prev,
          {
            sender: 'ai',
            text: parsed.nextGermanResponse,
            viText: parsed.vietnameseTranslation
          }
        ]);

        // Set feedback panel
        setAiFeedback({
          originalText: currentText,
          grammar: parsed.grammarCorrections,
          better: parsed.betterExpressions,
          rating: parsed.pronunciationRating
        });

        // Automatically speak AI German Response
        speakGerman(parsed.nextGermanResponse);
      }

    } catch (err) {
      console.error("AI Interview Error:", err);
      setInterviewHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Danke für Ihre Antwort. Können Sie das bitte noch einmal genauer erklären?",
          viText: "Cảm ơn câu trả lời của bạn. Bạn có thể giải thích rõ hơn về điều đó không?"
        }
      ]);
    } finally {
      setAiAnalyzing(false);
    }
  };

  // Export Calendar Reminder (.ics file)
  const exportIcsCalendar = (scheduleItem) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DeutschMeister//Learning Schedule//VI
BEGIN:VEVENT
SUMMARY:🇩🇪 ${scheduleItem.title}
DESCRIPTION:Đã đến giờ học tiếng Đức trên DeutschMeister! Hãy dành 15-20 phút rèn nghe nói nhé.
DTSTART:20261105T${scheduleItem.time.replace(':', '')}00
RRULE:FREQ=WEEKLY
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lich_Hoc_Tieng_Duc_${scheduleItem.time}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit Lesson Quiz
  const handleQuizSubmit = () => {
    let score = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#FAF8F5] text-slate-800'} font-sans transition-colors duration-300 flex flex-col`}>
      
      {/* ================= HEADER BAR ================= */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-900/10 dark:border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('roadmap')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg md:text-xl tracking-tight text-emerald-950 dark:text-emerald-300">
              DeutschMeister <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">Cơ Khí & Nghe Nói</span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Tiếng Đức Chuyên Ngành & Giao Tiếp Chuẩn Bản Xứ</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('schedule')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold transition border border-emerald-200 dark:border-slate-700"
          >
            <Bell className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Lịch Học</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
            title="Chuyển chế độ Sáng/Tối bảo vệ mắt"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* ================= NAVIGATION TABS ================= */}
      <nav className="bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/70 dark:border-slate-800 px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex space-x-1 md:space-x-4 py-2">
          {[
            { id: 'roadmap', label: 'Lộ Trình A1-B2', icon: Layers },
            { id: 'lesson', label: 'Luyện Nghe & Bài Test', icon: BookOpen },
            { id: 'ai_interview', label: 'Phòng Nói AI (Voice-to-Voice)', icon: Mic },
            { id: 'mech_vocab', label: 'Tiếng Đức Cơ Khí ⚙️', icon: Wrench },
            { id: 'schedule', label: 'Lịch Học & Nhắc Nhở', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        
        {/* TAB 1: LỘ TRÌNH HỌC (ROADMAP A1 - B2 & CƠ KHÍ) */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="px-3 py-1 bg-emerald-700/80 text-emerald-200 text-xs font-semibold rounded-full border border-emerald-500/30">
                  Lộ Trình Chuẩn Châu Âu (CEFR) & Ngành Cơ Khí Đức
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-3 leading-tight">
                  Rèn Tinh Luyện Nghe Nói • Sẵn Sàng Làm Việc Tại Đức
                </h2>
                <p className="text-emerald-100/90 text-xs md:text-sm mt-2 leading-relaxed">
                  Thiết kế giao diện tông màu Sage dịu mắt, giảm mỏi mắt khi học lâu. Học ngữ pháp thực tế, từ vựng xưởng/văn phòng và phản xạ trực tiếp bằng âm thanh với AI.
                </p>
              </div>
            </div>

            {/* Level Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LESSON_LEVELS.map(level => (
                <div
                  key={level.id}
                  onClick={() => {
                    setSelectedLevel(level.id);
                    const found = SAMPLE_LESSONS.find(l => l.level === level.id) || SAMPLE_LESSONS[0];
                    setCurrentLesson(found);
                    setActiveTab('lesson');
                  }}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition cursor-pointer group hover:shadow-md ${
                    selectedLevel === level.id
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-sm">
                      {level.id.slice(0, 2)}
                    </span>
                    <span className="text-xs text-slate-400">{level.count} Bài học</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                    {level.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    Luyện nghe hội thoại thực tế, vượt qua bài kiểm tra trắc nghiệm & điền từ nâng cao phản xạ.
                  </p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 gap-1">
                    <span>Bắt đầu bài học</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LUYỆN NGHE & BÀI TEST SAU BÀI HỌC */}
        {activeTab === 'lesson' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Audio & Dialogue */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                
                {/* Lesson Header */}
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
                      Trình độ {currentLesson.level}
                    </span>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-2">{currentLesson.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{currentLesson.description}</p>
                  </div>

                  <button
                    onClick={() => speakGerman(currentLesson.audioText)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-2xl shadow-md shadow-emerald-600/20 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe Hội Thoại'}</span>
                  </button>
                </div>

                {/* Audio Text Display */}
                <div className="bg-[#F4F1EA] dark:bg-slate-800/80 rounded-2xl p-5 border border-amber-900/5 space-y-3">
                  <p className="font-serif text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                    "{currentLesson.audioText}"
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic border-t border-slate-200/60 dark:border-slate-700 pt-2">
                    Dịch nghĩa: {currentLesson.translation}
                  </p>
                </div>

                {/* Native Speaker Tips (Góc Nhìn Thực Tế Bên Đức) */}
                <div className="bg-amber-50/80 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200 dark:border-amber-900/50 flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300">Mẹo Ngôn Ngữ Bản Xứ Đức (Redemittel & Văn Hóa Work culture):</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-400 mt-1">{currentLesson.nativeTips}</p>
                  </div>
                </div>

                {/* Vocabulary Cards */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Từ Vựng Mẫu Trong Bài:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentLesson.vocab.map((v, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300">{v.de}</span>
                          <button onClick={() => speakGerman(v.de)} className="p-1 hover:text-emerald-600">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{v.vi}</p>
                        <p className="text-[11px] text-slate-400 italic mt-1">Ví dụ: {v.example}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Quiz Test After Lesson */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Bài Test Trình Độ Nghe Hiểu</span>
                  </h3>
                  {quizSubmitted && (
                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      Đạt {quizScore}/{currentLesson.quiz.length} điểm
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {currentLesson.quiz.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-2">
                      <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Câu {qIdx + 1}: {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition ${
                              quizAnswers[qIdx] === optIdx
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition shadow-md shadow-emerald-700/20"
                  >
                    Nộp Bài Kiểm Tra
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition"
                  >
                    Làm Lai Bài Test
                  </button>
                )}

              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PHÒNG LUYỆN NÓI AI (VOICE-TO-VOICE SIMULATION) */}
        {activeTab === 'ai_interview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Audio Conversation Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col h-[580px]">
                
                {/* Interview Scenario Selector */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-emerald-600" />
                      <span>Phòng Giả Lập Nói Trực Tiếp (Voice-to-Voice)</span>
                    </h3>
                    <p className="text-xs text-slate-500">Trải nghiệm nói trực tiếp bằng micro không cần gõ phím</p>
                  </div>

                  <select
                    value={interviewRole}
                    onChange={(e) => setInterviewRole(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-200"
                  >
                    <option value="hr_manager">👔 Phỏng vấn Tuyển dụng Doanh nghiệp Đức</option>
                    <option value="workshop_master">⚙️ Trao đổi với Quản lý Xưởng (Meister)</option>
                    <option value="colleague">☕ Giao tiếp Văn phòng & Đồng nghiệp</option>
                  </select>
                </div>

                {/* Chat History Messages */}
                <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 custom-scrollbar">
                  {interviewHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-4 ${
                        item.sender === 'user'
                          ? 'bg-emerald-700 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700'
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold opacity-75 uppercase">
                            {item.sender === 'user' ? 'Bạn (Âm thanh)' : 'Doanh Nghiệp Đức AI'}
                          </span>
                          {item.sender === 'ai' && (
                            <button onClick={() => speakGerman(item.text)} className="p-1 hover:text-emerald-500">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-sm font-medium">{item.text}</p>
                        {item.viText && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-200/40 dark:border-slate-700 pt-1.5">
                            Dịch: {item.viText}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {aiAnalyzing && (
                    <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>Giám khảo Đức đang lắng nghe và phân tích ngữ pháp/phát âm...</span>
                    </div>
                  )}
                </div>

                {/* Voice Control Bar */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
                  {userSpokenText && (
                    <div className="p-2.5 bg-emerald-50 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300">Âm thanh vừa nhận diện: </span>
                      "{userSpokenText}"
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleRecording}
                      className={`flex-1 py-3 rounded-2xl font-semibold text-xs md:text-sm flex items-center justify-center space-x-2 transition shadow-md ${
                        isRecording
                          ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      <span>{isRecording ? 'Đang Lắng Nghe... (Bấm để Dừng)' : 'Bấm Micro Để Nói Tiếng Đức'}</span>
                    </button>

                    <button
                      onClick={handleSendSpokenText}
                      disabled={!userSpokenText.trim() || aiAnalyzing}
                      className="px-5 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-semibold text-xs disabled:opacity-50 transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: AI Analysis & Feedback */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Phân Tích & Sửa Lỗi Chi Tiết</span>
                </h3>

                {aiFeedback ? (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-500">Đánh giá phát âm:</span>
                      <p className="font-semibold text-emerald-700 dark:text-emerald-400 mt-1">{aiFeedback.rating}</p>
                    </div>

                    <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/50">
                      <span className="font-bold text-rose-800 dark:text-rose-300">Lỗi Ngữ Pháp / Cấu Trúc:</span>
                      <p className="text-rose-900 dark:text-rose-200 mt-1 leading-relaxed">{aiFeedback.grammar || 'Không phát hiện lỗi lớn nào.'}</p>
                    </div>

                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300">Gợi Ý Diễn Đạt Tự Nhiên Bên Đức:</span>
                      <p className="text-emerald-900 dark:text-emerald-200 mt-1 leading-relaxed">{aiFeedback.better}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400 space-y-2">
                    <HelpCircle className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                    <p className="text-xs">Bấm micro và nói một câu tiếng Đức để hệ thống AI đánh giá phát âm & sửa lỗi ngữ pháp cho bạn.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: KHO TỪ VỰNG CƠ KHÍ (MASCHINENBAU) */}
        {activeTab === 'mech_vocab' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Từ Vựng Chuyên Ngành Cơ Khí (Maschinenbau)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Từ xưởng gia công thực tế (Werkstatt) đến văn phòng thiết kế & quản lý (Büro)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MECH_DICTIONARY.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {item.category}
                      </span>
                      <button
                        onClick={() => speakGerman(item.de)}
                        className="p-1 text-slate-400 hover:text-emerald-600 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{item.de}</h3>
                    <p className="text-xs font-mono text-slate-400">Phát âm: /{item.pronunciation}/</p>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-1">{item.vi}</p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl italic border border-slate-100 dark:border-slate-700">
                    "{item.example}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LỊCH HỌC & TÍCH HỢP ĐỒNG BỘ LỊCH MÁY */}
        {activeTab === 'schedule' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Quản Lý Lịch Học & Nhắc Nhở Thông Minh</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lên lịch thời gian cố định mỗi ngày và xuất sự kiện ra Lịch điện thoại/máy tính (.ics)</p>
              </div>

              {/* Schedule List */}
              <div className="space-y-3">
                {studySchedule.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl font-mono font-bold text-sm">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {item.time}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.title}</h4>
                        <p className="text-xs text-slate-400">{item.days.join(', ')}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => exportIcsCalendar(item)}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition self-start sm:self-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Xuất Lịch (.ics)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400 dark:text-slate-500">
        DeutschMeister • Ứng Dụng Học Tiếng Đức Chuyên Nghe Nói & Cơ Khí Cho Người Việt ❤️
      </footer>

    </div>
  );
}