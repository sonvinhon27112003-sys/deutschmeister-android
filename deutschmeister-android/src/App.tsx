import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Mic, MicOff, BookOpen, Calendar, Award, Wrench, Play, Pause, CheckCircle2, 
  XCircle, AlertCircle, RefreshCw, Clock, ArrowRight, ShieldCheck, Sparkles, UserCheck, 
  Send, Layers, Moon, Sun, Settings, Bell, Download, ChevronRight, MessageSquare, Headphones,
  Briefcase, Check, HelpCircle, Flame, RotateCw, CheckSquare, Layers2, Sparkle, Smartphone, Share
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

// ============================================================================
// KHO BÀI HỌC HÀNG NGÀY (DAILY VOCAB, GRAMMAR & MECHANICAL DECK)
// ============================================================================
const DAILY_CARD_DATABASE = [
  // Nhóm 1: Giao tiếp hàng ngày (Alltagssprache & Redemittel)
  { id: 'd1', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Wie läuft’s bei dir?', vi: 'Mọi việc dạo này thế nào?', note: 'Thân mật, dùng với bạn bè/đồng nghiệp thân thiết thay cho Wie geht es dir?', example: 'Hi Alex, wie läuft’s bei dir im neuen Projekt?' },
  { id: 'd2', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Ich gebe dir Bescheid.', vi: 'Tôi sẽ báo lại cho bạn sau.', note: 'Mẫu câu cực phổ biến trong công sở Đức khi cần xác nhận thông tin sau.', example: 'Sobald ich den Termin kenne, gebe ich dir Bescheid.' },
  { id: 'd3', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Das macht Sinn.', vi: 'Điều đó hợp lý đấy / Có lý đấy.', note: 'Khái niệm tư duy logic rất hay dùng trong thảo luận công việc.', example: 'Dein Vorschlag macht absolut Sinn.' },
  { id: 'd4', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Ich bin gleich zurück.', vi: 'Tôi sẽ quay lại ngay.', note: 'Dùng khi tạm rời vị trí làm việc hoặc máy tính.', example: 'Macht kurz Pause, ich bin gleich zurück.' },
  { id: 'd5', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Könnten Sie das bitte wiederholen?', vi: 'Ngài có thể nhắc lại điều đó được không?', note: 'Lịch sự khi chưa nghe rõ trong trao đổi công việc.', example: 'Entschuldigung, könnten Sie das bitte wiederholen?' },
  { id: 'd6', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Ich stimme dir vollkommen zu.', vi: 'Tôi hoàn toàn đồng ý với bạn.', note: 'Đồng tán thành ý kiến trong cuộc họp.', example: 'Das ist ein guter Punkt, ich stimme dir vollkommen zu.' },
  { id: 'd7', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Lass uns das später besprechen.', vi: 'Hãy thảo luận chuyện này sau nhé.', note: 'Tránh xao nhãng khi đang dở ca làm.', example: 'Wir haben jetzt Meeting. Lass uns das später besprechen.' },
  { id: 'd8', category: 'giao_tiep', tag: 'Giao tiếp', de: 'Passt es dir morgen?', vi: 'Ngày mai có tiện cho bạn không?', note: 'Hỏi lịch hẹn làm việc.', example: 'Haben Sie Zeit? Passt es Ihnen morgen um 10 Uhr?' },

  // Nhóm 2: Ngữ pháp ứng dụng B1/B2 (Grammatik im Alltag)
  { id: 'd9', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Cấu trúc: je ... desto + Komparativ', vi: 'Càng ... thì càng ...', note: 'Je + Động từ ở cuối mệnh đề phụ, desto + Động từ đứng ngay sau so sánh hơn.', example: 'Je schneller wir produzieren, desto mehr sparen wir Zeit.' },
  { id: 'd10', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Passiv mit Modalverben (Thể bị động với ĐT khuyết thiếu)', vi: 'Phải / Cần được làm gì đó', note: 'Cấu trúc: Modalverb + Partizip II + werden', example: 'Das Bauteil muss sofort repariert werden. (Chi tiết máy phải được sửa ngay)' },
  { id: 'd11', category: 'ngu_phap', tag: 'Ngữ pháp B2', de: 'Konjunktiv II mit "wäre / hätte / würde"', vi: 'Giả định / Lịch sự / Đề xuất', note: 'Dùng khi đưa ra yêu cầu lịch sự hoặc giả định trái thực tế.', example: 'Ich würde empfehlen, die Maschine zuerst abzuschalten.' },
  { id: 'd12', category: 'ngu_phap', tag: 'Ngữ pháp B2', de: 'Relativsätze mit Präpositionen', vi: 'Mệnh đề quan hệ đi kèm giới từ', note: 'Giới từ đứng trước Đại từ quan hệ (dem/der/den...).', example: 'Das ist die Fräsmaschine, mit der ich täglich arbeite.' },
  { id: 'd13', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Cấu trúc: anstatt ... zu + Infinitiv', vi: 'Thay vì làm việc gì...', note: 'Nhấn mạnh giải pháp thay thế.', example: 'Anstatt zu warten, sollten wir den Meister anrufen.' },
  { id: 'd14', category: 'ngu_phap', tag: 'Ngữ pháp B2', de: 'Nomen-Verb-Verbindungen: "in Betracht ziehen"', vi: 'Cân nhắc / Cân nhắc tới', note: 'Thay thế cho động từ cân nhắc "überlegen".', example: 'Wir müssen eine neue Lösung in Betracht ziehen.' },

  // Nhóm 3: Từ vựng & Mẫu câu Cơ khí chuyên sâu (Maschinenbau Werkstatt & Büro)
  { id: 'd15', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'die Wartung (-en)', vi: 'Bảo trì / Bảo dưỡng định kỳ', note: 'Quy trình bắt buộc bảo đảm tuổi thọ máy móc.', example: 'Die Wartung der Roboteranlage findet jeden Freitag statt.' },
  { id: 'd16', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'der Kühlchmierstoff (KSS)', vi: 'Dung dịch làm mát & bôi trơn gia công', note: 'Rất hay dùng khi vận hành máy tiện / máy phay CNC.', example: 'Überprüfe bitte den Füllstand vom Kühlschmierstoff.' },
  { id: 'd17', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'das Rauheitsmessgerät', vi: 'Thước / Máy đo độ nhám bề mặt', note: 'Thiết bị QC xưởng kiểm tra độ mịn chi tiết.', example: 'Die Oberflächenrauheit wird mit dem Rauheitsmessgerät geprüft.' },
  { id: 'd18', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'die Abgleichschraube', vi: 'Ốc hiệu chỉnh / Ốc căn chỉnh', note: 'Dùng điều chỉnh vị trí chính xác của khuôn / gá kẹp.', example: 'Drehe die Abgleichschraube vorsichtig nach rechts.' },
  { id: 'd19', category: 'co_khi', tag: 'Cơ khí Văn phòng', de: 'die Bemaßung', vi: 'Sự ghi kích thước trên bản vẽ CAD', note: 'Thuật ngữ CAD quan trọng khi tạo Drawing.', example: 'Die Bemaßung auf der Zeichnung ist unvollständig.' },
  { id: 'd20', category: 'co_khi', tag: 'Cơ khí Văn phòng', de: 'die Belastungsgrenze', vi: 'Giới hạn chịu tải / Độ bền giới hạn', note: 'Thuật ngữ mô phỏng FEA tính toán độ bền.', example: 'Das Material hat seine Belastungsgrenze erreicht.' },
  { id: 'd21', category: 'co_khi', tag: 'Cơ khí Văn phòng', de: 'das Pflichtenheft', vi: 'Bản yêu cầu kỹ thuật chi tiết của khách hàng', note: 'Tài liệu quản lý dự án cơ khí kỹ thuật.', example: 'Alle Spezifikationen stehen im Pflichtenheft.' },
  { id: 'd22', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'der Drehmomentschlüssel', vi: 'Cờ lê lực / Khóa siết lực', note: 'Siết bu-lông đúng tiêu chuẩn Nm.', example: 'Ziehe die Radschrauben mit dem Drehmomentschlüssel an.' },
  { id: 'd23', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'der Span (-"e)', vi: 'Phôi gia công (phôi cắt kim loại)', note: 'Phôi sinh ra khi tiện, phay, bào kim loại.', example: 'Vorsicht vor den heißen Spänen beim Fräsen!' },
  { id: 'd24', category: 'co_khi', tag: 'Cơ khí Văn phòng', de: 'die FEM-Analyse', vi: 'Phân tích phần tử hữu hạn (Mô phỏng Ứng suất)', note: 'Dùng phần mềm ANSYS/SolidWorks Simulation.', example: 'Die FEM-Analyse zeigt hohe Spannungen am Radius.' },
  { id: 'd25', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'die Geometrische Produktspezifikation (GPS)', vi: 'Dung sai hình học & vị trí (GD&T)', note: 'Độ đồng tâm, độ vuông góc, độ phẳng.', example: 'Lies die Form- und Lagetoleranzen gemäß GPS-Norm.' },

  // Nhóm 4: Giao tiếp công việc và đời sống (B1)
  { id: 'd26', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Könnten Sie mir dabei helfen?', vi: 'Ông/bà có thể giúp tôi việc này được không?', note: 'Cách nhờ giúp đỡ lịch sự trong môi trường công sở.', example: 'Könnten Sie mir bitte bei dieser Zeichnung helfen?' },
  { id: 'd27', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Ich kümmere mich darum.', vi: 'Tôi sẽ xử lý việc đó.', note: 'Dùng khi nhận trách nhiệm giải quyết một công việc.', example: 'Keine Sorge, ich kümmere mich um die Bestellung.' },
  { id: 'd28', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Das hängt davon ab.', vi: 'Điều đó còn tùy thuộc vào.', note: 'Dùng để trả lời khi chưa thể khẳng định ngay.', example: 'Das hängt davon ab, wie viel Zeit wir haben.' },
  { id: 'd29', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Ich bin damit einverstanden.', vi: 'Tôi đồng ý với việc đó.', note: 'Cách thể hiện sự đồng ý rõ ràng trong cuộc họp.', example: 'Mit diesem Vorschlag bin ich einverstanden.' },
  { id: 'd30', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Könnten wir einen Termin vereinbaren?', vi: 'Chúng ta có thể hẹn một lịch được không?', note: 'Câu hữu ích khi sắp xếp cuộc họp hoặc trao đổi kỹ thuật.', example: 'Könnten wir für morgen einen Termin vereinbaren?' },
  { id: 'd31', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Ich habe das leider nicht ganz verstanden.', vi: 'Tiếc là tôi chưa hiểu rõ hoàn toàn.', note: 'Thẳng thắn nhưng lịch sự khi chưa hiểu hướng dẫn.', example: 'Könnten Sie es bitte noch einmal erklären?' },
  { id: 'd32', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Soweit ich weiß, ist das richtig.', vi: 'Theo như tôi biết thì điều đó đúng.', note: 'Dùng khi đưa ra thông tin nhưng vẫn muốn thể hiện mức độ chắc chắn vừa phải.', example: 'Soweit ich weiß, beginnt die Besprechung um neun.' },
  { id: 'd33', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Wir sollten eine andere Lösung finden.', vi: 'Chúng ta nên tìm một giải pháp khác.', note: 'Mẫu câu đề xuất giải pháp khi gặp vấn đề.', example: 'Die Kosten sind zu hoch. Wir sollten eine andere Lösung finden.' },
  { id: 'd34', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Ich melde mich später bei Ihnen.', vi: 'Tôi sẽ liên hệ lại với ông/bà sau.', note: 'Cách kết thúc trao đổi khi cần kiểm tra thông tin trước.', example: 'Ich prüfe die Maße und melde mich später bei Ihnen.' },
  { id: 'd35', category: 'giao_tiep', tag: 'Giao tiếp B1', de: 'Vielen Dank für Ihre Rückmeldung.', vi: 'Cảm ơn ông/bà đã phản hồi.', note: 'Câu thường dùng trong email và trao đổi công việc.', example: 'Vielen Dank für Ihre schnelle Rückmeldung.' },

  // Nhóm 5: Ngữ pháp ứng dụng B1/B2
  { id: 'd36', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Obwohl + Nebensatz', vi: 'Mặc dù ...', note: 'Obwohl mở đầu mệnh đề phụ; động từ chia đứng cuối mệnh đề.', example: 'Obwohl die Maschine alt ist, funktioniert sie zuverlässig.' },
  { id: 'd37', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Damit + Nebensatz', vi: 'Để / nhằm mục đích ...', note: 'Damit diễn tả mục đích; động từ chia đứng cuối mệnh đề.', example: 'Wir prüfen das Bauteil, damit keine Fehler entstehen.' },
  { id: 'd38', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Nachdem + Plusquamperfekt', vi: 'Sau khi một việc đã xảy ra ...', note: 'Trong văn kể quá khứ, mệnh đề nachdem thường dùng Plusquamperfekt trước hành động ở Präteritum/Perfekt.', example: 'Nachdem wir die Zeichnung geprüft hatten, starteten wir die Produktion.' },
  { id: 'd39', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Infinitiv mit zu', vi: 'Động từ nguyên mẫu có zu', note: 'Thường dùng sau versuchen, planen, vergessen, beginnen. Với động từ tách, zu đứng giữa tiền tố và gốc động từ.', example: 'Ich versuche, den Fehler zu finden.' },
  { id: 'd40', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Indirekte Fragen', vi: 'Câu hỏi gián tiếp', note: 'Trong câu hỏi gián tiếp, động từ chia đứng cuối mệnh đề.', example: 'Können Sie mir sagen, wann die Lieferung kommt?' },
  { id: 'd41', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'Passiv: werden + Partizip II', vi: 'Câu bị động ở hiện tại', note: 'Nhấn mạnh hành động hoặc đối tượng chịu tác động thay vì người thực hiện.', example: 'Die Teile werden in der Werkstatt geprüft.' },
  { id: 'd42', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'wegen + Genitiv', vi: 'Bởi vì / do ...', note: 'Trong văn viết chuẩn, wegen thường đi với Genitiv.', example: 'Wegen des Defekts steht die Maschine still.' },
  { id: 'd43', category: 'ngu_phap', tag: 'Ngữ pháp B1', de: 'nicht nur ... sondern auch', vi: 'Không những ... mà còn ...', note: 'Nối hai thành phần có chức năng ngữ pháp tương đương.', example: 'Der Ingenieur prüft nicht nur die Maße, sondern auch die Oberfläche.' },
  { id: 'd44', category: 'ngu_phap', tag: 'Ngữ pháp B2', de: 'Trotzdem + Hauptsatz', vi: 'Tuy vậy / mặc dù thế', note: 'Trotzdem là trạng từ nối; động từ chia đứng ngay sau trotzdem ở vị trí thứ hai.', example: 'Die Zeichnung ist kompliziert. Trotzdem kann ich sie verstehen.' },
  { id: 'd45', category: 'ngu_phap', tag: 'Ngữ pháp B2', de: 'Falls + Nebensatz', vi: 'Trong trường hợp nếu ...', note: 'Falls mở đầu mệnh đề phụ, động từ chia đứng cuối.', example: 'Falls ein Problem auftritt, informieren Sie bitte den Meister.' },

  // Nhóm 6: Cơ khí, bản vẽ và CAD
  { id: 'd46', category: 'co_khi', tag: 'Cơ khí CAD', de: 'die Schnittansicht', vi: 'Hình chiếu mặt cắt', note: 'Biểu diễn cấu tạo bên trong chi tiết bằng mặt phẳng cắt trên bản vẽ.', example: 'Die Schnittansicht zeigt die innere Geometrie des Bauteils.' },
  { id: 'd47', category: 'co_khi', tag: 'Cơ khí CAD', de: 'die Schweißnaht', vi: 'Mối hàn / đường hàn', note: 'Thuật ngữ quan trọng khi đọc bản vẽ kết cấu thép và bản vẽ hàn.', example: 'Die Schweißnaht muss vollständig geprüft werden.' },
  { id: 'd48', category: 'co_khi', tag: 'Cơ khí CAD', de: 'die Blechdicke', vi: 'Chiều dày tấm kim loại', note: 'Dùng khi chọn tôn/tấm và kiểm tra kích thước vật liệu.', example: 'Die Blechdicke beträgt sechs Millimeter.' },
  { id: 'd49', category: 'co_khi', tag: 'Cơ khí CAD', de: 'der Lochabstand', vi: 'Khoảng cách tâm lỗ', note: 'Khoảng cách giữa tâm hai lỗ trên chi tiết hoặc bản vẽ.', example: 'Bitte kontrollieren Sie den Lochabstand.' },
  { id: 'd50', category: 'co_khi', tag: 'Cơ khí CAD', de: 'die Baugruppe', vi: 'Cụm lắp ráp', note: 'Tập hợp nhiều chi tiết được lắp thành một cụm trong CAD.', example: 'Die Baugruppe besteht aus zwölf Einzelteilen.' },
  { id: 'd51', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'die Maßtoleranz', vi: 'Dung sai kích thước', note: 'Giới hạn sai lệch cho phép của một kích thước.', example: 'Die Maßtoleranz beträgt plus/minus 0,1 Millimeter.' },
  { id: 'd52', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'die Oberfläche', vi: 'Bề mặt chi tiết', note: 'Thường gặp khi mô tả độ nhám, lớp phủ và chất lượng gia công.', example: 'Die Oberfläche muss glatt und sauber sein.' },
  { id: 'd53', category: 'co_khi', tag: 'Cơ khí Xưởng', de: 'die Instandhaltung', vi: 'Công tác bảo dưỡng và duy trì thiết bị', note: 'Khái niệm rộng hơn bảo trì định kỳ, bao gồm duy trì khả năng hoạt động của máy.', example: 'Die Instandhaltung plant die Reparatur der Anlage.' },
  { id: 'd54', category: 'co_khi', tag: 'Cơ khí CAD', de: 'die Stückliste', vi: 'Bảng kê vật tư / danh mục chi tiết (BOM)', note: 'Danh sách các chi tiết, số lượng và vật liệu trong một cụm lắp ráp.', example: 'Die Stückliste enthält alle benötigten Bauteile.' },
  { id: 'd55', category: 'co_khi', tag: 'Cơ khí CAD', de: 'die Bezugskante', vi: 'Cạnh chuẩn / cạnh tham chiếu', note: 'Cạnh dùng làm cơ sở đo hoặc xác định vị trí trong bản vẽ.', example: 'Der Abstand wird von der Bezugskante gemessen.' }

];


// Tạo bộ bài ổn định theo ngày: mỗi ngày 5 giao tiếp + 5 ngữ pháp + 5 cơ khí.
// Nội dung được biên soạn sẵn trong ứng dụng, không cần mạng hay API key.
const getLocalDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const dailySortScore = (id, dateKey) => {
  const input = `${dateKey}-${id}`;
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const buildDailyDeck = (dateKey) => {
  const categories = ['giao_tiep', 'ngu_phap', 'co_khi'];
  return categories.flatMap(category =>
    DAILY_CARD_DATABASE
      .filter(card => card.category === category)
      .sort((a, b) => dailySortScore(a.id, dateKey) - dailySortScore(b.id, dateKey))
      .slice(0, 5)
  );
};


const VOCAB_BASES = [
  { stem: 'Sicherheits', vi: 'an toàn lao động' },
  { stem: 'Qualitäts', vi: 'chất lượng' },
  { stem: 'Produktions', vi: 'sản xuất' },
  { stem: 'Arbeits', vi: 'công việc / lao động' },
  { stem: 'Maschinen', vi: 'máy móc' },
  { stem: 'Werkstoff', vi: 'vật liệu' },
  { stem: 'Konstruktions', vi: 'thiết kế' },
  { stem: 'Fertigungs', vi: 'chế tạo / gia công' },
  { stem: 'Montage', vi: 'lắp ráp' },
  { stem: 'Abnahme', vi: 'nghiệm thu' },
  { stem: 'Mess', vi: 'đo lường' },
  { stem: 'Zeichnungs', vi: 'bản vẽ' },
  { stem: 'Werkzeug', vi: 'dụng cụ' },
  { stem: 'Anlagen', vi: 'hệ thống thiết bị' },
  { stem: 'Projekt', vi: 'dự án' },
  { stem: 'Kunden', vi: 'khách hàng' },
  { stem: 'Kosten', vi: 'chi phí' },
  { stem: 'Energie', vi: 'năng lượng' },
  { stem: 'Umwelt', vi: 'môi trường' },
  { stem: 'Daten', vi: 'dữ liệu' },
  { stem: 'Betriebs', vi: 'vận hành / doanh nghiệp' },
  { stem: 'Wartungs', vi: 'bảo trì' },
  { stem: 'Ersatzteil', vi: 'phụ tùng thay thế' },
  { stem: 'Lager', vi: 'kho' },
  { stem: 'Transport', vi: 'vận chuyển' }
];
const VOCAB_ENDINGS = [
  { suffix: 'prüfung', article: 'die', vi: 'kiểm tra' },
  { suffix: 'planung', article: 'die', vi: 'lập kế hoạch' },
  { suffix: 'dokumentation', article: 'die', vi: 'tài liệu hóa' },
  { suffix: 'prozess', article: 'der', vi: 'quy trình' },
  { suffix: 'ablauf', article: 'der', vi: 'trình tự / quy trình' },
  { suffix: 'kontrolle', article: 'die', vi: 'kiểm soát' },
  { suffix: 'bericht', article: 'der', vi: 'báo cáo' },
  { suffix: 'methode', article: 'die', vi: 'phương pháp' },
  { suffix: 'maschine', article: 'die', vi: 'máy' },
  { suffix: 'anlage', article: 'die', vi: 'thiết bị / hệ thống' },
  { suffix: 'werkzeug', article: 'das', vi: 'dụng cụ' },
  { suffix: 'bauteil', article: 'das', vi: 'chi tiết máy' },
  { suffix: 'material', article: 'das', vi: 'vật liệu' },
  { suffix: 'qualität', article: 'die', vi: 'chất lượng' },
  { suffix: 'sicherheit', article: 'die', vi: 'an toàn' },
  { suffix: 'messung', article: 'die', vi: 'phép đo' },
  { suffix: 'toleranz', article: 'die', vi: 'dung sai' },
  { suffix: 'zeichnung', article: 'die', vi: 'bản vẽ' },
  { suffix: 'berechnung', article: 'die', vi: 'phép tính / tính toán' },
  { suffix: 'konstruktion', article: 'die', vi: 'kết cấu / thiết kế' },
  { suffix: 'fertigung', article: 'die', vi: 'chế tạo / gia công' },
  { suffix: 'montage', article: 'die', vi: 'lắp ráp' },
  { suffix: 'wartung', article: 'die', vi: 'bảo trì' },
  { suffix: 'reparatur', article: 'die', vi: 'sửa chữa' },
  { suffix: 'bestellung', article: 'die', vi: 'đơn đặt hàng' },
  { suffix: 'lieferung', article: 'die', vi: 'giao hàng' },
  { suffix: 'lagerung', article: 'die', vi: 'lưu kho' },
  { suffix: 'transport', article: 'der', vi: 'vận chuyển' },
  { suffix: 'verpackung', article: 'die', vi: 'đóng gói' },
  { suffix: 'schulung', article: 'die', vi: 'đào tạo' },
  { suffix: 'vorschrift', article: 'die', vi: 'quy định' },
  { suffix: 'anweisung', article: 'die', vi: 'hướng dẫn' },
  { suffix: 'abteilung', article: 'die', vi: 'bộ phận / phòng ban' },
  { suffix: 'mitarbeiter', article: 'der', vi: 'nhân viên' },
  { suffix: 'arbeitsplatz', article: 'der', vi: 'vị trí làm việc' },
  { suffix: 'arbeitszeit', article: 'die', vi: 'thời gian làm việc' },
  { suffix: 'kosten', article: 'die', vi: 'chi phí' },
  { suffix: 'energieverbrauch', article: 'der', vi: 'mức tiêu thụ năng lượng' },
  { suffix: 'umweltschutz', article: 'der', vi: 'bảo vệ môi trường' },
  { suffix: 'fehleranalyse', article: 'die', vi: 'phân tích lỗi' }
];
const VOCAB_SPECIALS = {
  '0-14': ['Sicherheitsstandard', 'der', 'tiêu chuẩn an toàn'],
  '8-21': ['Montagearbeit', 'die', 'công việc lắp ráp'],
  '12-10': ['Werkzeugsatz', 'der', 'bộ dụng cụ'],
  '16-36': ['Gesamtkosten', 'die', 'tổng chi phí'],
  '24-27': ['Transportweg', 'der', 'tuyến đường vận chuyển']
};
const EXPANDED_VOCABULARY = VOCAB_BASES.flatMap((base, bi) =>
  VOCAB_ENDINGS.map((ending, ei) => {
    const key = bi + '-' + ei;
    const special = VOCAB_SPECIALS[key];
    const word = special ? special[0] : base.stem + ending.suffix;
    const article = special ? special[1] : ending.article;
    const meaning = special ? special[2] : base.vi + ' – ' + ending.vi;
    const exampleTemplates = [
      'Der Fachbegriff „' + word + '“ wird in technischen Dokumenten verwendet.',
      'Bitte prüfen Sie den Begriff „' + word + '“ in der Zeichnung.',
      'Wir verwenden den Begriff „' + word + '“ bei der technischen Planung.',
      'Die Dokumentation enthält den Begriff „' + word + '“.',
      'Kennen Sie die Bedeutung des Begriffs „' + word + '“?'
    ];
    return {
      id: 'v' + String(bi * 40 + ei + 1).padStart(4, '0'),
      category: 'tu_vung_moi',
      tag: 'Cơ khí & kỹ thuật',
      de: article + ' ' + word,
      vi: meaning,
      note: 'Từ ghép kỹ thuật: chú ý thành phần đầu và danh từ chính ở cuối. Một số cách ghép ít gặp cần học kèm ngữ cảnh chuyên ngành.',
      example: exampleTemplates[(bi * 40 + ei) % exampleTemplates.length]
    };
  })
);

const GRAMMAR_TOPICS = [
  { level: 'A1', title: 'Động từ ở vị trí số 2 (V2)', vi: 'Trong câu chính, động từ đã chia thường đứng ở vị trí thứ hai.', note: 'Nếu đưa thời gian hoặc địa điểm lên đầu, chủ ngữ đứng sau động từ.', examples: ['Ich arbeite heute in der Werkstatt.', 'Heute arbeite ich in der Werkstatt.'] },
  { level: 'A1', title: 'Động từ sein', vi: 'Dùng sein để nói về danh tính, nghề nghiệp và trạng thái.', note: 'Chia: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.', examples: ['Ich bin Maschinenbauingenieur.', 'Die Maschine ist heute außer Betrieb.'] },
  { level: 'A1', title: 'Động từ haben', vi: 'Haben diễn tả sở hữu hoặc có một thứ gì đó.', note: 'Haben đi với tân ngữ Akkusativ.', examples: ['Wir haben eine neue Zeichnung.', 'Der Betrieb hat drei CNC-Maschinen.'] },
  { level: 'A1', title: 'Mạo từ xác định der/die/das', vi: 'Mạo từ xác định thay đổi theo giống và cách của danh từ.', note: 'Học danh từ kèm mạo từ để nhớ giống.', examples: ['Der Motor läuft ruhig.', 'Die Zeichnung liegt auf dem Tisch.'] },
  { level: 'A1', title: 'Akkusativ với tân ngữ trực tiếp', vi: 'Tân ngữ trực tiếp thường ở Akkusativ; giống đực đổi der thành den.', note: 'Động từ như brauchen, prüfen, sehen thường có tân ngữ Akkusativ.', examples: ['Ich prüfe den Motor.', 'Wir brauchen ein Ersatzteil.'] },
  { level: 'A1', title: 'Danh từ số nhiều (Plural)', vi: 'Danh từ có nhiều cách tạo số nhiều; cần học cùng dạng số nhiều.', note: 'Mạo từ số nhiều xác định là die ở Nominativ và Akkusativ.', examples: ['Die Schrauben sind neu.', 'Die Bauteile liegen neben der Maschine.'] },
  { level: 'A1', title: 'Câu hỏi W-Fragen', vi: 'Từ để hỏi đứng đầu câu, sau đó là động từ đã chia.', note: 'Ví dụ: wer, was, wann, wo, warum, wie.', examples: ['Wann beginnt die Schicht?', 'Wo liegt die technische Zeichnung?'] },
  { level: 'A1', title: 'Câu hỏi Ja/Nein', vi: 'Trong câu hỏi có/không, động từ đã chia đứng đầu câu.', note: 'Câu trả lời thường bắt đầu bằng ja, nein hoặc doch.', examples: ['Ist die Maschine bereit?', 'Haben Sie die Maße geprüft?'] },
  { level: 'A1', title: 'Phủ định nicht', vi: 'Nicht phủ định động từ, tính từ hoặc cả ý câu.', note: 'Vị trí của nicht phụ thuộc phần muốn phủ định.', examples: ['Die Anlage funktioniert nicht.', 'Der Motor startet heute nicht.'] },
  { level: 'A1', title: 'Phủ định kein', vi: 'Kein phủ định danh từ thường đi với ein/eine hoặc không có mạo từ.', note: 'Kein biến đổi như ein: kein, keine, keinen...', examples: ['Wir haben kein Ersatzteil.', 'Das ist keine technische Zeichnung.'] },
  { level: 'A1', title: 'Động từ khuyết thiếu können', vi: 'Können diễn tả khả năng hoặc xin phép; động từ chính ở nguyên mẫu cuối câu.', note: 'Chia: ich kann, du kannst, er kann, wir können.', examples: ['Ich kann die Zeichnung lesen.', 'Können Sie mir bitte helfen?'] },
  { level: 'A1', title: 'Động từ khuyết thiếu müssen', vi: 'Müssen diễn tả sự cần thiết hoặc bắt buộc.', note: 'Động từ chính ở nguyên mẫu cuối câu.', examples: ['Wir müssen die Maße prüfen.', 'Die Maschine muss heute stoppen.'] },
  { level: 'A1', title: 'Động từ khuyết thiếu dürfen', vi: 'Dürfen diễn tả được phép hoặc không được phép.', note: 'Nicht dürfen mang nghĩa bị cấm.', examples: ['Hier darf man nicht rauchen.', 'Sie dürfen die Anlage nicht öffnen.'] },
  { level: 'A1', title: 'Động từ tách (Trennbare Verben)', vi: 'Tiền tố tách thường chuyển về cuối câu chính.', note: 'Ví dụ: ausschalten → Ich schalte die Maschine aus.', examples: ['Ich schalte die Maschine aus.', 'Der Techniker baut das Teil ein.'] },
  { level: 'A1', title: 'Thời gian và giới từ um / am / im', vi: 'Um dùng với giờ; am với ngày; im với tháng hoặc mùa.', note: 'Ví dụ: um acht Uhr, am Montag, im Januar.', examples: ['Ich beginne um acht Uhr.', 'Am Montag arbeiten wir im Büro.'] },
  { level: 'A2', title: 'Perfekt với haben', vi: 'Perfekt thường dùng haben + Partizip II cho phần lớn động từ có tân ngữ.', note: 'Partizip II thường đứng cuối câu.', examples: ['Ich habe den Bericht geschrieben.', 'Wir haben die Teile bestellt.'] },
  { level: 'A2', title: 'Perfekt với sein', vi: 'Perfekt dùng sein với nhiều động từ chỉ di chuyển hoặc thay đổi trạng thái.', note: 'Ví dụ: gehen, kommen, fahren, aufstehen, ausfallen.', examples: ['Der Techniker ist gekommen.', 'Die Maschine ist plötzlich ausgefallen.'] },
  { level: 'A2', title: 'Präteritum của sein và haben', vi: 'Sein và haben thường dùng Präteritum trong lời kể quá khứ.', note: 'war / waren; hatte / hatten.', examples: ['Ich war gestern im Büro.', 'Wir hatten heute wenig Zeit.'] },
  { level: 'A2', title: 'So sánh hơn (Komparativ)', vi: 'Tính từ thường thêm -er; dùng als để so sánh hai đối tượng.', note: 'Một số tính từ có biến âm: alt → älter, groß → größer.', examples: ['Dieses Bauteil ist leichter als das alte.', 'Die neue Maschine arbeitet schneller.'] },
  { level: 'A2', title: 'So sánh nhất (Superlativ)', vi: 'Dạng thường gặp: am + tính từ + -sten hoặc mạo từ + tính từ -ste.', note: 'Chú ý biến âm ở một số tính từ.', examples: ['Diese Lösung ist am besten.', 'Das ist die wichtigste Prüfung.'] },
  { level: 'A2', title: 'Mệnh đề phụ với weil', vi: 'Weil diễn tả nguyên nhân; động từ chia đứng cuối mệnh đề phụ.', note: 'Dùng weil để giải thích lý do.', examples: ['Wir warten, weil die Maschine defekt ist.', 'Ich frage nach, weil ich die Anweisung nicht verstehe.'] },
  { level: 'A2', title: 'Mệnh đề phụ với dass', vi: 'Dass mở đầu mệnh đề nội dung; động từ chia đứng cuối.', note: 'Thường dùng sau sagen, glauben, wissen, hoffen.', examples: ['Ich glaube, dass der Plan funktioniert.', 'Der Meister sagt, dass die Lieferung morgen kommt.'] },
  { level: 'A2', title: 'Mệnh đề điều kiện với wenn', vi: 'Wenn diễn tả điều kiện hoặc sự việc lặp lại; động từ chia đứng cuối mệnh đề phụ.', note: 'Nếu mệnh đề wenn đứng đầu, động từ chính đứng ngay sau dấu phẩy.', examples: ['Wenn ein Fehler auftritt, stoppen wir die Maschine.', 'Wenn Sie fertig sind, geben Sie mir bitte Bescheid.'] },
  { level: 'A2', title: 'Động từ phản thân (Reflexive Verben)', vi: 'Một số động từ đi kèm đại từ phản thân mich, dich, sich...', note: 'Ví dụ: sich interessieren für, sich vorbereiten auf.', examples: ['Ich interessiere mich für Konstruktion.', 'Wir bereiten uns auf die Prüfung vor.'] },
  { level: 'A2', title: 'Wechselpräpositionen: Dativ / Akkusativ', vi: 'Vị trí tĩnh dùng Dativ; hướng di chuyển/đặt vào dùng Akkusativ.', note: 'Wo? → Dativ. Wohin? → Akkusativ.', examples: ['Das Werkzeug liegt auf dem Tisch.', 'Ich lege das Werkzeug auf den Tisch.'] },
  { level: 'B1', title: 'Mệnh đề nhượng bộ obwohl', vi: 'Obwohl diễn tả sự tương phản; động từ chia đứng cuối mệnh đề phụ.', note: 'Có thể đặt obwohl ở đầu hoặc giữa câu.', examples: ['Obwohl es spät ist, arbeiten wir weiter.', 'Obwohl die Zeichnung kompliziert ist, verstehe ich sie.'] },
  { level: 'B1', title: 'Trạng từ nối trotzdem', vi: 'Trotzdem nối hai ý tương phản; động từ chia đứng vị trí thứ hai.', note: 'Sau trotzdem, động từ chia đứng ngay sau nó.', examples: ['Die Zeit ist knapp. Trotzdem prüfen wir alles.', 'Die Maschine ist alt. Trotzdem funktioniert sie zuverlässig.'] },
  { level: 'B1', title: 'Mệnh đề mục đích damit', vi: 'Damit diễn tả mục đích, thường dùng khi hai mệnh đề có chủ ngữ khác nhau.', note: 'Động từ chia đứng cuối mệnh đề damit.', examples: ['Wir prüfen das Teil, damit keine Fehler entstehen.', 'Ich erkläre den Ablauf, damit alle ihn verstehen.'] },
  { level: 'B1', title: 'um ... zu + Infinitiv', vi: 'Dùng để diễn tả mục đích khi chủ ngữ hai vế giống nhau.', note: 'Zu đứng trước động từ nguyên mẫu; với động từ tách, zu nằm giữa tiền tố và gốc.', examples: ['Wir messen erneut, um sicherzugehen.', 'Ich lerne Deutsch, um in Deutschland zu arbeiten.'] },
  { level: 'B1', title: 'Mệnh đề quan hệ (Relativsätze)', vi: 'Đại từ quan hệ thay cho danh từ; động từ chia đứng cuối mệnh đề.', note: 'Giống và số theo danh từ đứng trước; cách phụ thuộc vai trò trong mệnh đề.', examples: ['Das ist der Kollege, der die Anlage wartet.', 'Das ist die Maschine, die wir gestern repariert haben.'] },
  { level: 'B1', title: 'Câu hỏi gián tiếp (Indirekte Fragen)', vi: 'Trong câu hỏi gián tiếp, động từ chia đứng cuối mệnh đề.', note: 'Thường bắt đầu bằng Können Sie mir sagen..., Wissen Sie...?', examples: ['Können Sie mir sagen, wann die Schicht endet?', 'Wissen Sie, wo die Zeichnung liegt?'] },
  { level: 'B1', title: 'Bị động hiện tại (Passiv Präsens)', vi: 'Werden + Partizip II nhấn mạnh hành động hoặc đối tượng chịu tác động.', note: 'Ví dụ: wird geprüft, werden montiert.', examples: ['Das Bauteil wird geprüft.', 'Die Teile werden in der Werkstatt montiert.'] },
  { level: 'B1', title: 'Bị động quá khứ (Passiv Präteritum)', vi: 'Wurde / wurden + Partizip II diễn tả hành động bị động trong quá khứ.', note: 'Dùng trong báo cáo hoặc mô tả quy trình đã hoàn thành.', examples: ['Die Maschine wurde repariert.', 'Der Bericht wurde gestern geschickt.'] },
  { level: 'B1', title: 'Infinitiv mit zu', vi: 'Zu + động từ nguyên mẫu thường dùng sau versuchen, planen, vergessen...', note: 'Với động từ tách: einzuschalten, aufzubauen.', examples: ['Ich versuche, den Fehler zu finden.', 'Wir planen, die Anlage zu modernisieren.'] },
  { level: 'B1', title: 'Konjunktiv II lịch sự', vi: 'Könnte / würde giúp yêu cầu hoặc đề xuất lịch sự hơn.', note: 'Dùng phổ biến trong giao tiếp công sở.', examples: ['Könnten Sie mir bitte helfen?', 'Ich würde gern einen Termin vereinbaren.'] },
  { level: 'B1', title: 'Đuôi tính từ sau mạo từ', vi: 'Tính từ đứng trước danh từ phải chia đuôi theo giống, số và cách.', note: 'Học theo cụm danh từ hoàn chỉnh: einen neuen Motor, die geprüften Teile.', examples: ['Wir brauchen einen neuen Motor.', 'Die geprüften Teile liegen hier.'] },
  { level: 'B1', title: 'wegen + Genitiv', vi: 'Trong văn viết chuẩn, wegen thường đi với Genitiv.', note: 'Ví dụ: wegen des Defekts, wegen der Lieferung.', examples: ['Wegen des Defekts steht die Maschine still.', 'Wegen der verspäteten Lieferung warten wir noch.'] },
  { level: 'B1', title: 'nicht nur ... sondern auch', vi: 'Nối hai thành phần có chức năng ngữ pháp tương đương.', note: 'Dùng để nhấn mạnh hai yếu tố cùng quan trọng.', examples: ['Der Ingenieur prüft nicht nur die Maße, sondern auch die Oberfläche.', 'Wir brauchen nicht nur Zeit, sondern auch Material.'] },
  { level: 'B1', title: 'weder ... noch', vi: 'Diễn tả phủ định cả hai lựa chọn: không ... cũng không ...', note: 'Các thành phần nối với nhau nên song song về cấu trúc.', examples: ['Wir haben weder Zeit noch Ersatzteile.', 'Die Maschine ist weder laut noch langsam.'] },
  { level: 'B1', title: 'Nachdem + Plusquamperfekt', vi: 'Sau nachdem, hành động xảy ra trước thường dùng Plusquamperfekt.', note: 'Hành động sau đó dùng Präteritum hoặc Perfekt.', examples: ['Nachdem wir die Zeichnung geprüft hatten, starteten wir die Produktion.', 'Nachdem der Techniker angekommen war, begann die Reparatur.'] },
  { level: 'B2', title: 'Plusquamperfekt', vi: 'Hatte/war + Partizip II diễn tả hành động xảy ra trước một mốc quá khứ khác.', note: 'Phân biệt với Perfekt và Präteritum.', examples: ['Wir hatten die Teile bestellt, bevor der Termin geändert wurde.', 'Ich hatte den Bericht fertiggestellt, bevor die Besprechung begann.'] },
  { level: 'B2', title: 'Konjunktiv II quá khứ', vi: 'Hätte/wäre + Partizip II diễn tả giả định hoặc tiếc nuối về quá khứ.', note: 'Thường đi với wenn trong mệnh đề điều kiện.', examples: ['Ich hätte den Fehler früher bemerkt.', 'Wir wären pünktlich angekommen, wenn der Zug nicht ausgefallen wäre.'] },
  { level: 'B2', title: 'Bị động với động từ khuyết thiếu', vi: 'Modalverb + Partizip II + werden diễn tả việc cần/có thể được thực hiện.', note: 'Động từ khuyết thiếu chia; Partizip II và werden đứng cuối.', examples: ['Die Schrauben müssen kontrolliert werden.', 'Der Fehler kann schnell behoben werden.'] },
  { level: 'B2', title: 'Partizip I và Partizip II làm tính từ', vi: 'Partizip I thường mang nghĩa chủ động; Partizip II thường mô tả kết quả/trạng thái.', note: 'Ví dụ: laufende Produktion; geprüftes Bauteil.', examples: ['Die laufende Produktion darf nicht gestört werden.', 'Das geprüfte Bauteil liegt hier.'] },
  { level: 'B2', title: 'Nomen-Verb-Verbindungen', vi: 'Kết hợp danh từ và động từ tạo cách diễn đạt tự nhiên, trang trọng.', note: 'Học cả cụm như eine Entscheidung treffen, eine Prüfung durchführen.', examples: ['Wir treffen eine Entscheidung.', 'Der Techniker führt eine Prüfung durch.'] },
  { level: 'B2', title: 'je ... desto', vi: 'Diễn tả hai sự thay đổi tăng/giảm tương ứng.', note: 'Mệnh đề je có động từ cuối; mệnh đề desto có đảo vị trí động từ.', examples: ['Je genauer wir messen, desto sicherer ist das Ergebnis.', 'Je länger die Maschine läuft, desto wärmer wird sie.'] },
  { level: 'B2', title: 'indem + Nebensatz', vi: 'Indem diễn tả cách thức hoặc phương tiện để đạt kết quả.', note: 'Động từ chia đứng cuối mệnh đề indem.', examples: ['Wir sparen Zeit, indem wir den Prozess verbessern.', 'Er löst das Problem, indem er die Maße neu berechnet.'] },
  { level: 'B2', title: 'sofern + Nebensatz', vi: 'Sofern diễn tả điều kiện với sắc thái trang trọng.', note: 'Động từ chia đứng cuối mệnh đề sofern.', examples: ['Sofern alle Teile verfügbar sind, beginnen wir morgen.', 'Sofern die Daten stimmen, geben wir den Auftrag frei.'] },
  { level: 'B2', title: 'während', vi: 'Während có thể mở đầu mệnh đề phụ chỉ thời gian hoặc sự tương phản.', note: 'Trong mệnh đề phụ, động từ chia đứng cuối.', examples: ['Während die Maschine läuft, kontrollieren wir die Werte.', 'Während der Prüfung notieren wir alle Ergebnisse.'] },
  { level: 'B2', title: 'einerseits ... andererseits', vi: 'Nêu hai mặt hoặc hai khía cạnh đối lập của một vấn đề.', note: 'Dùng để lập luận cân bằng trong thảo luận và bài viết.', examples: ['Einerseits ist die Lösung günstig, andererseits ist sie langsam.', 'Einerseits brauchen wir mehr Personal, andererseits müssen wir Kosten sparen.'] }
];
const EXPANDED_GRAMMAR = GRAMMAR_TOPICS.flatMap((topic, topicIndex) =>
  topic.examples.map((example, exampleIndex) => ({
    id: 'g' + String(topicIndex * 2 + exampleIndex + 1).padStart(3, '0'),
    category: 'ngu_phap_moi',
    tag: 'Ngữ pháp ' + topic.level,
    de: topic.title,
    vi: topic.vi,
    note: topic.note,
    example
  }))
);

export default function App() {
  // Theme & App Navigation State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('daily_hub'); // Set 'daily_hub' as default home tab

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  // PWA Registration & Install Event Listener
  useEffect(() => {
    // Check if iOS device
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Listen for Web App Install Prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) {
      alert("Hướng dẫn cài ứng dụng:\n\n• Trên Chrome/Edge (Android/PC): Bấm vào nút menu 3 chấm trên trình duyệt -> Chọn 'Thêm vào màn hình chính' (Add to Home screen).\n• Trên Safari (iPhone): Bấm nút Nút chia sẻ (Share) -> Chọn 'Thêm vào Màn hình chính'.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  // Daily Hub & Flashcard Deck States
  const [dailyDate, setDailyDate] = useState(() => getLocalDateKey());
  const [dailyCards, setDailyCards] = useState(() => {
    const today = getLocalDateKey();
    const savedDate = localStorage.getItem('dm_daily_date');
    const saved = localStorage.getItem('dm_daily_cards');
    if (savedDate === today && saved) {
      try { return JSON.parse(saved); } catch { /* tạo lại bộ bài nếu dữ liệu lưu lỗi */ }
    }
    return buildDailyDeck(today);
  });

  const [masteredIds, setMasteredIds] = useState(() => {
    const saved = localStorage.getItem('dm_mastered_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [streakCount, setStreakCount] = useState(() => {
    const saved = localStorage.getItem('dm_streak_count');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'giao_tiep' | 'ngu_phap' | 'co_khi'

  // Filtered Cards
  const filteredDailyCards = dailyCards.filter(c => selectedFilter === 'all' || c.category === selectedFilter);
  const currentCard = filteredDailyCards[activeCardIndex] || filteredDailyCards[0];
  const [expandedDay, setExpandedDay] = useState(() => Math.max(1, Math.min(50, Number(localStorage.getItem('dm_expanded_day') || '1'))));
  const [expandedCardIndex, setExpandedCardIndex] = useState(0);
  const [expandedFlipped, setExpandedFlipped] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState('all');
  const [expandedMasteredIds, setExpandedMasteredIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dm_expanded_mastered') || '[]'); } catch { return []; }
  });
  const expandedDayCards = [
    ...EXPANDED_VOCABULARY.slice((expandedDay - 1) * 20, expandedDay * 20),
    ...EXPANDED_GRAMMAR.slice((expandedDay - 1) * 2, expandedDay * 2)
  ];
  const expandedFilteredCards = expandedDayCards.filter(card =>
    expandedFilter === 'all' || card.category === expandedFilter
  );
  const expandedCurrentCard = expandedFilteredCards[expandedCardIndex] || expandedFilteredCards[0];
  const expandedMasteredCount = expandedDayCards.filter(card => expandedMasteredIds.includes(card.id)).length;
  const expandedProgress = Math.round((expandedMasteredCount / 22) * 100);
  const handleExpandedDayChange = (value) => {
    const next = Math.max(1, Math.min(50, Number(value) || 1));
    setExpandedDay(next);
    localStorage.setItem('dm_expanded_day', String(next));
    setExpandedCardIndex(0);
    setExpandedFlipped(false);
  };
  const toggleExpandedMastered = (id) => {
    const next = expandedMasteredIds.includes(id)
      ? expandedMasteredIds.filter(item => item !== id)
      : [...expandedMasteredIds, id];
    setExpandedMasteredIds(next);
    localStorage.setItem('dm_expanded_mastered', JSON.stringify(next));
  };

  // Tự đổi bộ 15 thẻ khi sang ngày mới; nút bấm tải lại bộ của ngày hiện tại.
  const handleRefreshDailyDeck = () => {
    const today = getLocalDateKey();
    const deck = buildDailyDeck(today);
    setDailyDate(today);
    setDailyCards(deck);
    localStorage.setItem('dm_daily_date', today);
    localStorage.setItem('dm_daily_cards', JSON.stringify(deck));
    setActiveCardIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const checkNewDay = () => {
      const today = getLocalDateKey();
      if (today !== dailyDate) {
        const deck = buildDailyDeck(today);
        setDailyDate(today);
        setDailyCards(deck);
        setActiveCardIndex(0);
        setIsFlipped(false);
        localStorage.setItem('dm_daily_date', today);
        localStorage.setItem('dm_daily_cards', JSON.stringify(deck));
      }
    };
    checkNewDay();
    const timer = window.setInterval(checkNewDay, 60000);
    return () => window.clearInterval(timer);
  }, [dailyDate]);

  // Toggle Mark as Mastered
  const toggleMastered = (cardId) => {
    let updated;
    if (masteredIds.includes(cardId)) {
      updated = masteredIds.filter(id => id !== cardId);
    } else {
      updated = [...masteredIds, cardId];
    }
    setMasteredIds(updated);
    localStorage.setItem('dm_mastered_ids', JSON.stringify(updated));
  };

  // State & References for AI Interview & Audio
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [currentLesson, setCurrentLesson] = useState(SAMPLE_LESSONS[0]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userSpokenText, setUserSpokenText] = useState('');
  const [interviewRole, setInterviewRole] = useState('hr_manager');
  const [interviewHistory, setInterviewHistory] = useState([
    {
      sender: 'ai',
      text: 'Guten Tag! Willkommen zum Vorstellungsgespräch. Stellen Sie sich bitte kurz vor.',
      viText: 'Xin chào! Chào mừng bạn đến với buổi phỏng vấn. Xin vui lòng tự giới thiệu ngắn gọn về bản thân.'
    }
  ]);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const [studySchedule, setStudySchedule] = useState([
    { id: '1', time: '08:00', title: 'Học 25 từ vựng & ngữ pháp Daily Hub', days: ['Thứ 2', 'Thứ 4', 'Thứ 6'] },
    { id: '2', time: '19:30', title: 'Luyện Nghe & Làm Test Trình Độ', days: ['Hàng Ngày'] },
    { id: '3', time: '21:00', title: 'Phòng Luyện Nói Voice-to-Voice với AI', days: ['Thứ 3', 'Thứ 5', 'Thứ 7'] }
  ]);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition API
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'de-DE';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
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
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('daily_hub')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg md:text-xl tracking-tight text-emerald-950 dark:text-emerald-300">
              DeutschMeister <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">Cơ Khí & Daily Hub</span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Tiếng Đức Chuyên Ngành & Giao Tiếp Chuẩn Bản Xứ</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Daily Streak Counter */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-700 dark:text-amber-400 font-bold text-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakCount} Ngày Streak</span>
          </div>

          {/* Install App Button */}
          <button
            onClick={handleInstallClick}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition shadow-sm"
            title="Cài đặt ứng dụng về màn hình chính điện thoại"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Tải App</span>
          </button>

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

      {/* Mobile Install Notification Banner */}
      {showInstallBanner && (
        <div className="bg-emerald-800 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-emerald-300" />
            <span>Cài đặt <strong>DeutschMeister</strong> về màn hình chính điện thoại để truy cập nhanh không cần gõ web!</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 bg-white text-emerald-900 rounded-lg font-bold text-xs hover:bg-emerald-100 transition"
            >
              Cài Đặt Ngay
            </button>
            <button onClick={() => setShowInstallBanner(false)} className="p-1 hover:text-emerald-200">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* iOS Installation Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>Cài Đặt Trên iPhone / iPad</span>
              </h3>
              <button onClick={() => setShowIOSModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p>Do chính sách bảo mật của Apple iOS, vui lòng làm theo 2 bước đơn giản sau:</p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">1</span>
                  <span>Nhấn vào biểu tượng <strong>Chia sẻ (Share) <Share className="w-3.5 h-3.5 inline text-blue-500" /></strong> ở thanh menu dưới cùng của trình duyệt Safari.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">2</span>
                  <span>Cuộn xuống và chọn <strong>"Thêm vào Màn hình chính" (Add to Home Screen)</strong>.</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}

      {/* ================= NAVIGATION TABS ================= */}
      <nav className="desktop-tabs bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/70 dark:border-slate-800 px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex space-x-1 md:space-x-4 py-2">
          {[
            { id: 'daily_hub', label: '🔥 Học Hàng Ngày (25 Bài)', icon: Sparkles },
            { id: 'expanded_vocab', label: '📚 50 Ngày • 1.000 Từ + 100 Ngữ Pháp', icon: BookOpen },
            { id: 'roadmap', label: 'Lộ Trình A1-B2', icon: Layers },
            { id: 'lesson', label: 'Luyện Nghe & Bài Test', icon: BookOpen },
            { id: 'ai_interview', label: 'Phòng Nói AI (Voice-to-Voice)', icon: Mic },
            { id: 'mech_vocab', label: 'Kho Cơ Khí ⚙️', icon: Wrench },
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
        
        {/* TAB 0: DAILY LEARNING HUB (GÓI HỌC TỪ VỰNG & NGỮ PHÁP HÀNG NGÀY) */}
        {activeTab === 'daily_hub' && (
          <div className="space-y-6">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30 flex items-center gap-1">
                    <Sparkle className="w-3.5 h-3.5" />
                    Daily Learning Hub • Cập Nhật Mỗi Ngày
                  </span>
                  <span className="text-xs text-emerald-200">15 mục học mỗi ngày</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  Gói Học Hàng Ngày: Giao Tiếp • Ngữ Pháp B1/B2 • Cơ Khí
                </h2>
                <p className="text-emerald-100/80 text-xs md:text-sm leading-relaxed">
                  Mỗi ngày tự chuyển sang 15 thẻ mới: 5 giao tiếp, 5 ngữ pháp và 5 cơ khí kèm âm thanh phát âm chuẩn. Ngày học: <strong className="text-white font-bold">{dailyDate}</strong> • Đã thuộc <strong className="text-white font-bold">{dailyCards.filter(card => masteredIds.includes(card.id)).length} / {dailyCards.length}</strong> mục hôm nay.
                </p>
              </div>

              {/* Daily Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleRefreshDailyDeck}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl text-xs font-semibold flex items-center space-x-2 backdrop-blur-md transition"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Tải lại bài hôm nay</span>
                </button>
              </div>
            </div>

            {/* Category Filter & Progress Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'Tất cả (15)' },
                    { id: 'giao_tiep', label: '💬 Giao tiếp hàng ngày' },
                    { id: 'ngu_phap', label: '📘 Ngữ pháp B1/B2' },
                    { id: 'co_khi', label: '⚙️ Cơ khí (Xưởng & Văn phòng)' }
                  ].map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setSelectedFilter(filter.id);
                        setActiveCardIndex(0);
                        setIsFlipped(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                        selectedFilter === filter.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="flex items-center space-x-3 text-xs">
                  <span className="font-semibold text-slate-500">Tiến độ hôm nay:</span>
                  <div className="w-32 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.round((dailyCards.filter(card => masteredIds.includes(card.id)).length / dailyCards.length) * 100)}%` }}
                    />
                  </div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {Math.round((masteredIds.length / dailyCards.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* FLASHCARD INTERACTIVE DISPLAY */}
            {currentCard && (
              <div className="max-w-2xl mx-auto space-y-4">
                
                {/* Flashcard Header Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                  <span>Thẻ {activeCardIndex + 1} trên {filteredDailyCards.length}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    {currentCard.tag}
                  </span>
                </div>

                {/* Card Container (Click to Flip) */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`min-h-[280px] bg-white dark:bg-slate-900 border-2 rounded-3xl p-8 shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                    isFlipped 
                      ? 'border-teal-500 bg-teal-50/20 dark:bg-slate-900' 
                      : 'border-emerald-600/40 hover:border-emerald-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {isFlipped ? 'Mặt Sau (Nghĩa & Giải Thích)' : 'Mặt Trước (Tiếng Đức)'}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakGerman(currentCard.de);
                      }}
                      className="p-2.5 bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 rounded-2xl transition shadow-sm"
                      title="Nghe phát âm Tiếng Đức"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Card Content */}
                  {!isFlipped ? (
                    <div className="my-auto text-center space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif leading-snug">
                        {currentCard.de}
                      </h3>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        (Nhấp vào thẻ để xem nghĩa & mẹo ngữ pháp/ứng dụng)
                      </p>
                    </div>
                  ) : (
                    <div className="my-auto space-y-3">
                      <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
                        {currentCard.vi}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700">
                        💡 <strong>Ghi chú / Mẹo dùng:</strong> {currentCard.note}
                      </p>
                      {currentCard.example && (
                        <p className="text-xs italic text-slate-500 dark:text-slate-400">
                          Ví dụ: "{currentCard.example}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400 text-[11px]">Bấm micro hoặc icon âm thanh để nghe phát âm</span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMastered(currentCard.id);
                      }}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-semibold transition ${
                        masteredIds.includes(currentCard.id)
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{masteredIds.includes(currentCard.id) ? 'Đã Thuộc' : 'Đánh Dấu Đã Thuộc'}</span>
                    </button>
                  </div>
                </div>

                {/* Card Controls (Prev / Next) */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    disabled={activeCardIndex === 0}
                    onClick={() => {
                      setActiveCardIndex(prev => prev - 1);
                      setIsFlipped(false);
                    }}
                    className="flex-1 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
                  >
                    ← Thẻ Trước
                  </button>

                  <button
                    disabled={activeCardIndex === filteredDailyCards.length - 1}
                    onClick={() => {
                      setActiveCardIndex(prev => prev + 1);
                      setIsFlipped(false);
                    }}
                    className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-semibold text-xs disabled:opacity-40 transition shadow-md shadow-emerald-700/20"
                  >
                    Thẻ Tiếp Theo →
                  </button>
                </div>

              </div>
            )}

            {/* List View of All Daily Items */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center justify-between">
                <span>Danh Sách 25 Mục Học Trong Ngày</span>
                <span className="text-xs font-normal text-slate-400">Chuyển thẻ hoặc bấm nghe nhanh bên dưới</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDailyCards.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveCardIndex(idx);
                      setIsFlipped(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      masteredIds.includes(item.id)
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {item.tag}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakGerman(item.de);
                        }}
                        className="p-1 text-slate-400 hover:text-emerald-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.de}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{item.vi}</p>
                    </div>

                    {masteredIds.includes(item.id) && (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Đã thuộc
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

{activeTab === 'expanded_vocab' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-lg space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">Lộ trình học mở rộng</span>
                <span className="text-xs text-emerald-200">50 NGÀY • 1.000 TỪ • 100 THẺ NGỮ PHÁP</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Mỗi ngày 20 từ mới + 2 mục ngữ pháp</h2>
              <p className="text-emerald-100/90 text-sm">Giữ nguyên kho bài học cũ. Phần mở rộng được chia thành 50 ngày, tiến độ đã thuộc được lưu trên điện thoại.</p>
              <div className="flex items-center gap-3 text-xs">
                <span>Ngày {expandedDay}/50</span>
                <div className="flex-1 max-w-xs h-2.5 rounded-full bg-white/20 overflow-hidden"><div className="h-full bg-emerald-300 rounded-full" style={{width: expandedProgress + '%'}} /></div>
                <strong>{expandedMasteredCount}/22 • {expandedProgress}%</strong>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-sm">Chọn ngày học</h3>
                <p className="text-xs text-slate-500">Mỗi ngày có đúng 20 thẻ từ vựng và 2 thẻ ngữ pháp.</p>
              </div>
              <select value={expandedDay} onChange={e => handleExpandedDayChange(e.target.value)} className="w-full sm:w-52 rounded-xl border border-emerald-200 dark:border-slate-700 bg-emerald-50 dark:bg-slate-800 px-3 py-3 text-sm font-semibold">
                {Array.from({length: 50}, (_, i) => <option key={i + 1} value={i + 1}>Ngày {i + 1} / 50</option>)}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                {id:'all', label:'Tất cả 22 thẻ'},
                {id:'tu_vung_moi', label:'20 từ vựng'},
                {id:'ngu_phap_moi', label:'2 ngữ pháp'}
              ].map(item => (
                <button key={item.id} onClick={() => {setExpandedFilter(item.id); setExpandedCardIndex(0); setExpandedFlipped(false);}} className={'px-4 py-2 rounded-xl text-xs font-semibold ' + (expandedFilter === item.id ? 'bg-emerald-700 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300')}>
                  {item.label}
                </button>
              ))}
            </div>

            {expandedCurrentCard && (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                  <span>Thẻ {expandedCardIndex + 1} / {expandedFilteredCards.length}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">{expandedCurrentCard.tag}</span>
                </div>
                <div onClick={() => setExpandedFlipped(!expandedFlipped)} className="min-h-[280px] bg-white dark:bg-slate-900 border-2 border-emerald-600/40 rounded-3xl p-6 md:p-8 shadow-md cursor-pointer flex flex-col justify-between gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{expandedFlipped ? 'Nghĩa & giải thích' : 'Tiếng Đức'}</span>
                    <button onClick={e => {e.stopPropagation(); speakGerman(expandedCurrentCard.de);}} className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl"><Volume2 className="w-5 h-5" /></button>
                  </div>
                  {!expandedFlipped ? (
                    <div className="my-auto text-center space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">{expandedCurrentCard.de}</h3>
                      <p className="text-xs text-slate-500">Chạm vào thẻ để xem nghĩa và ví dụ.</p>
                    </div>
                  ) : (
                    <div className="my-auto space-y-3">
                      <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">{expandedCurrentCard.vi}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">{expandedCurrentCard.note}</p>
                      <p className="text-sm italic text-slate-500 dark:text-slate-400">Ví dụ: {expandedCurrentCard.example}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 gap-2">
                    <span className="text-[11px] text-slate-400">Chạm thẻ để lật</span>
                    <button onClick={e => {e.stopPropagation(); toggleExpandedMastered(expandedCurrentCard.id);}} className={'px-3 py-2 rounded-xl text-xs font-semibold ' + (expandedMasteredIds.includes(expandedCurrentCard.id) ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200')}>
                      <CheckCircle2 className="w-4 h-4 inline mr-1" />{expandedMasteredIds.includes(expandedCurrentCard.id) ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button disabled={expandedCardIndex === 0} onClick={() => {setExpandedCardIndex(v => v - 1); setExpandedFlipped(false);}} className="flex-1 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40">← Thẻ trước</button>
                  <button disabled={expandedCardIndex >= expandedFilteredCards.length - 1} onClick={() => {setExpandedCardIndex(v => v + 1); setExpandedFlipped(false);}} className="flex-1 py-3 rounded-xl bg-emerald-700 text-white text-xs font-semibold disabled:opacity-40">Thẻ tiếp theo →</button>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm">Danh sách bài học ngày {expandedDay}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {expandedFilteredCards.map((card, index) => (
                  <button key={card.id} onClick={() => {setExpandedCardIndex(index); setExpandedFlipped(false);}} className={'text-left p-3 rounded-xl border ' + (expandedMasteredIds.includes(card.id) ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50')}>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{card.tag}</span>
                    <div className="font-bold text-sm mt-1">{card.de}</div>
                    <div className="text-xs text-slate-500 mt-1">{card.vi}</div>
                    {expandedMasteredIds.includes(card.id) && <div className="text-[10px] text-emerald-700 mt-2">✓ Đã thuộc</div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
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

                <div className="bg-[#F4F1EA] dark:bg-slate-800/80 rounded-2xl p-5 border border-amber-900/5 space-y-3">
                  <p className="font-serif text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                    "{currentLesson.audioText}"
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic border-t border-slate-200/60 dark:border-slate-700 pt-2">
                    Dịch nghĩa: {currentLesson.translation}
                  </p>
                </div>

                <div className="bg-amber-50/80 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200 dark:border-amber-900/50 flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300">Mẹo Ngôn Ngữ Bản Xứ Đức (Redemittel & Văn Hóa Work culture):</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-400 mt-1">{currentLesson.nativeTips}</p>
                  </div>
                </div>

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
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col h-[580px]">
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

      {/* MOBILE BOTTOM NAVIGATION: tối ưu thao tác bằng ngón tay trên Android */}
      <nav className="mobile-bottom-nav" aria-label="Điều hướng chính">
        {[
          { id: 'daily_hub', label: 'Hằng ngày', icon: Sparkles },
          { id: 'expanded_vocab', label: '50 ngày', icon: BookOpen },
          { id: 'roadmap', label: 'Lộ trình', icon: Layers },
          { id: 'lesson', label: 'Bài học', icon: BookOpen },
          { id: 'ai_interview', label: 'Luyện nói', icon: Mic },
          { id: 'mech_vocab', label: 'Cơ khí', icon: Wrench },
          { id: 'schedule', label: 'Lịch học', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className={`mobile-nav-item ${isActive ? 'mobile-nav-item-active' : ''}`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400 dark:text-slate-500">
        DeutschMeister • Ứng Dụng Học Tiếng Đức Chuyên Nghe Nói & Cơ Khí Cho Người Việt ❤️
      </footer>

    </div>
  );
}