'use client'
import { useState } from "react";

/* =========================================================
   DỮ LIỆU MẪU (sau này thay bằng JSON theo từng bài)
   ========================================================= */
const LESSONS = [
  { id: 1, title: "Bài 1", topic: "Giới thiệu bản thân", progress: 100, status: "done" },
  { id: 2, title: "Bài 2", topic: "Đồ vật quanh ta", progress: 60, status: "learning" },
  { id: 3, title: "Bài 3", topic: "Địa điểm", progress: 0, status: "new" },
  { id: 4, title: "Bài 4", topic: "Thời gian", progress: 0, status: "new" },
];

const LESSON_DETAIL = {
  1: {
    vocab: [
      { word: "わたし", kanji: "私", meaning: "tôi", type: "danh từ" },
      { word: "がくせい", kanji: "学生", meaning: "học sinh, sinh viên", type: "danh từ" },
      { word: "せんせい", kanji: "先生", meaning: "giáo viên", type: "danh từ" },
    ],
    grammar: [
      {
        pattern: "N1 は N2 です",
        usage: "Câu khẳng định: N1 là N2.",
        examples: [
          { jp: "わたしは がくせいです。", vi: "Tôi là học sinh." },
          { jp: "リンさんは せんせいです。", vi: "Bạn Linh là giáo viên." },
        ],
        note: "は đọc là 'wa' khi làm trợ từ.",
      },
      {
        pattern: "N1 は N2 じゃ ありません",
        usage: "Câu phủ định.",
        examples: [{ jp: "わたしは せんせいじゃ ありません。", vi: "Tôi không phải giáo viên." }],
        note: "",
      },
    ],
    kanji: [
      { char: "私", on: "シ", kun: "わたし", meaning: "tôi, riêng tư", strokes: 7 },
      { char: "学", on: "ガク", kun: "まな-ぶ", meaning: "học", strokes: 8 },
      { char: "生", on: "セイ", kun: "い-きる, う-まれる", meaning: "sống, sinh", strokes: 5 },
    ],
    reading: {
      title: "自己紹介",
      // mỗi từ có thể kèm furigana và nghĩa để hiện popup
      sentences: [
        [
          { t: "私", f: "わたし", m: "tôi" },
          { t: "は" },
          { t: "学生", f: "がくせい", m: "sinh viên" },
          { t: "です。" },
        ],
        [
          { t: "友達", f: "ともだち", m: "bạn bè" },
          { t: "も" },
          { t: "学生", f: "がくせい", m: "sinh viên" },
          { t: "です。" },
        ],
      ],
      questions: [
        {
          q: "Người viết là ai?",
          options: ["Giáo viên", "Sinh viên", "Nhân viên công ty"],
          answer: 1,
        },
      ],
    },
    listening: {
      title: "Nghe hội thoại 1",
      audio: "/audio/lesson1-track1.mp3",
      lines: [
        { speaker: "A", jp: "はじめまして。", vi: "Rất vui được gặp." },
        { speaker: "B", jp: "はじめまして。わたしは リンです。", vi: "Rất vui được gặp. Tôi là Linh." },
      ],
      questions: [
        {
          q: "B tên là gì?",
          options: ["Lan", "Linh", "Long"],
          answer: 1,
        },
      ],
    },
  },
};

const SECTIONS = [
  { key: "vocab", label: "Từ vựng" },
  { key: "grammar", label: "Ngữ pháp" },
  { key: "kanji", label: "Kanji" },
  { key: "reading", label: "Đọc" },
  { key: "listening", label: "Nghe" },
];

/* =========================================================
   APP: chuyển giữa danh sách bài và chi tiết bài
   ========================================================= */
export default function App() {
  const [lessonId, setLessonId] = useState(null);

  return (
    <div className="app">
      {lessonId === null ? (
        <LessonList onSelect={setLessonId} />
      ) : (
        <LessonDetail id={lessonId} onBack={() => setLessonId(null)} />
      )}
    </div>
  );
}

/* =========================================================
   MÀN HÌNH 1: TOÀN BỘ BÀI HỌC (grid các thẻ bài)
   ========================================================= */
function LessonList({ onSelect }) {
  return (
    <main className="lesson-list">
      <header className="lesson-list__header">
        <h1>Giáo trình</h1>
        <input type="search" placeholder="Tìm từ vựng, ngữ pháp..." />
      </header>

      <section className="lesson-grid">
        {LESSONS.map((l) => (
          <button
            key={l.id}
            className={`lesson-card lesson-card--${l.status}`}
            onClick={() => onSelect(l.id)}
          >
            <span className="lesson-card__title">{l.title}</span>
            <span className="lesson-card__topic">{l.topic}</span>
            <progress value={l.progress} max="100" />
          </button>
        ))}
      </section>
    </main>
  );
}

/* =========================================================
   MÀN HÌNH 2: CHI TIẾT BÀI (grid: header / sidebar / content)
   ========================================================= */
function LessonDetail({ id, onBack }) {
  const [section, setSection] = useState("vocab");
  const lesson = LESSONS.find((l) => l.id === id);
  const data = LESSON_DETAIL[id]; // bài chưa có dữ liệu sẽ là undefined

  return (
    <div className="lesson-detail">
      {/* Vùng header của grid */}
      <header className="lesson-detail__header">
        <button onClick={onBack}>← Tất cả bài</button>
        <h1>
          {lesson.title}: {lesson.topic}
        </h1>
      </header>

      {/* Vùng sidebar của grid */}
      <nav className="lesson-detail__nav">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            className={section === s.key ? "is-active" : ""}
            onClick={() => setSection(s.key)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Vùng nội dung của grid */}
      <section className="lesson-detail__content">
        {!data ? (
          <p>Bài này chưa có nội dung.</p>
        ) : (
          <>
            {section === "vocab" && <VocabTable items={data.vocab} />}
            {section === "grammar" && <GrammarCards items={data.grammar} />}
            {section === "kanji" && <KanjiTable items={data.kanji} />}
            {section === "reading" && <Reading data={data.reading} />}
            {section === "listening" && <Listening data={data.listening} />}
          </>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   TỪ VỰNG: dạng bảng
   ========================================================= */
function VocabTable({ items }) {
  return (
    <table className="vocab-table">
      <thead>
        <tr>
          <th>Từ</th>
          <th>Kanji</th>
          <th>Nghĩa</th>
          <th>Loại từ</th>
          <th>Nghe</th>
          <th>Nhớ</th>
        </tr>
      </thead>
      <tbody>
        {items.map((v) => (
          <tr key={v.word}>
            <td>{v.word}</td>
            <td>{v.kanji}</td>
            <td>{v.meaning}</td>
            <td>{v.type}</td>
            <td><button aria-label={`Phát âm ${v.word}`}>▶</button></td>
            <td><input type="checkbox" aria-label={`Đã nhớ ${v.word}`} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* =========================================================
   NGỮ PHÁP: thẻ lớn, mỗi mẫu câu một thẻ
   ========================================================= */
function GrammarCards({ items }) {
  const [showVi, setShowVi] = useState(true);

  return (
    <div className="grammar">
      <label className="grammar__toggle">
        <input type="checkbox" checked={showVi} onChange={(e) => setShowVi(e.target.checked)} />
        Hiện bản dịch
      </label>

      <div className="grammar-list">
        {items.map((g) => (
          <article key={g.pattern} className="grammar-card">
            <h2 className="grammar-card__pattern">{g.pattern}</h2>
            <p className="grammar-card__usage">{g.usage}</p>

            <ul className="grammar-card__examples">
              {g.examples.map((ex) => (
                <li key={ex.jp}>
                  <span lang="ja">{ex.jp}</span>
                  {showVi && <span className="translation">{ex.vi}</span>}
                </li>
              ))}
            </ul>

            {g.note && <aside className="grammar-card__note">Lưu ý: {g.note}</aside>}
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   KANJI: dạng bảng
   ========================================================= */
function KanjiTable({ items }) {
  return (
    <table className="kanji-table">
      <thead>
        <tr>
          <th>Kanji</th>
          <th>Âm On</th>
          <th>Âm Kun</th>
          <th>Nghĩa</th>
          <th>Số nét</th>
        </tr>
      </thead>
      <tbody>
        {items.map((k) => (
          <tr key={k.char}>
            <td lang="ja">{k.char}</td>
            <td>{k.on}</td>
            <td>{k.kun}</td>
            <td>{k.meaning}</td>
            <td>{k.strokes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* =========================================================
   BÀI ĐỌC (thiết kế đề xuất)
   ┌──────────────────────────────┐
   │ Thanh công cụ: [Furigana] [Dịch] │
   ├──────────────────────────────┤
   │ Đoạn văn (bấm từ -> popup nghĩa) │
   ├──────────────────────────────┤
   │ Câu hỏi hiểu bài (trắc nghiệm)   │
   └──────────────────────────────┘
   ========================================================= */
function Reading({ data }) {
  const [furigana, setFurigana] = useState(true);
  const [picked, setPicked] = useState(null); // từ đang bấm để hiện popup

  return (
    <div className="reading">
      <div className="reading__toolbar">
        <label>
          <input type="checkbox" checked={furigana} onChange={(e) => setFurigana(e.target.checked)} />
          Furigana
        </label>
      </div>

      <h2 lang="ja">{data.title}</h2>

      <div className="reading__text" lang="ja">
        {data.sentences.map((sentence, i) => (
          <p key={i}>
            {sentence.map((w, j) =>
              w.f ? (
                <button key={j} className="word" onClick={() => setPicked(w)}>
                  <ruby>
                    {w.t}
                    {furigana && <rt>{w.f}</rt>}
                  </ruby>
                </button>
              ) : (
                <span key={j}>{w.t}</span>
              )
            )}
          </p>
        ))}
      </div>

      {/* Popup nghĩa từ, có thể đổi thành tooltip khi thêm CSS */}
      {picked && (
        <div className="reading__popup" role="status">
          <strong>{picked.t}</strong> ({picked.f}): {picked.m}
          <button onClick={() => setPicked(null)}>Đóng</button>
        </div>
      )}

      <Quiz questions={data.questions} />
    </div>
  );
}

/* =========================================================
   BÀI NGHE (thiết kế đề xuất)
   ┌──────────────────────────────┐
   │ Trình phát: ▶  ⏮  ⏭  tốc độ  lặp │
   ├──────────────────────────────┤
   │ Transcript từng câu (bấm để tua) │
   │  [Ẩn/Hiện chữ]  [Ẩn/Hiện dịch]   │
   ├──────────────────────────────┤
   │ Câu hỏi nghe hiểu                │
   └──────────────────────────────┘
   Gợi ý luyện: nghe không nhìn chữ -> làm câu hỏi -> mở transcript đối chiếu.
   ========================================================= */
function Listening({ data }) {
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [showText, setShowText] = useState(false); // mặc định ẩn để luyện nghe
  const [showVi, setShowVi] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <div className="listening">
      <h2>{data.title}</h2>

      {/* Trình phát */}
      <div className="listening__player">
        <audio controls src={data.audio} />
        <div className="listening__controls">
          <button onClick={() => setActive(Math.max(0, active - 1))}>⏮ Câu trước</button>
          <button onClick={() => setActive(Math.min(data.lines.length - 1, active + 1))}>Câu sau ⏭</button>

          <label>
            Tốc độ
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
            </select>
          </label>

          <label>
            <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
            Lặp câu
          </label>
        </div>
      </div>

      {/* Transcript */}
      <div className="listening__transcript">
        <div className="listening__toggles">
          <label>
            <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
            Hiện chữ Nhật
          </label>
          <label>
            <input type="checkbox" checked={showVi} onChange={(e) => setShowVi(e.target.checked)} />
            Hiện bản dịch
          </label>
        </div>

        <ol>
          {data.lines.map((line, i) => (
            <li
              key={i}
              className={i === active ? "line is-active" : "line"}
              onClick={() => setActive(i)}
            >
              <span className="line__speaker">{line.speaker}</span>
              <span className="line__jp" lang="ja">{showText ? line.jp : "・・・"}</span>
              {showVi && <span className="line__vi">{line.vi}</span>}
            </li>
          ))}
        </ol>
      </div>

      <Quiz questions={data.questions} />
    </div>
  );
}

/* =========================================================
   TRẮC NGHIỆM DÙNG CHUNG (Đọc + Nghe)
   ========================================================= */
function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});

  return (
    <div className="quiz">
      {questions.map((q, i) => (
        <fieldset key={i} className="quiz__question">
          <legend>{q.q}</legend>
          {q.options.map((opt, j) => {
            const chosen = answers[i] === j;
            const state = answers[i] === undefined ? "" : j === q.answer ? "is-correct" : chosen ? "is-wrong" : "";
            return (
              <label key={j} className={`quiz__option ${state}`}>
                <input
                  type="radio"
                  name={`q${i}`}
                  checked={chosen}
                  onChange={() => setAnswers({ ...answers, [i]: j })}
                />
                {opt}
              </label>
            );
          })}
        </fieldset>
      ))}
    </div>
  );
}