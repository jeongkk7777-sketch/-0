"use client";

import { useState, useEffect } from "react";

type Quote = {
  text: string;
  author: string;
};

const defaultData: Record<string, Quote[]> = {
  자신감: [
    {
      text: "성공은 최종 목적지가 아니라 계속되는 여정이다.",
      author: "윈스턴 처칠",
    },
    {
      text: "당신이 할 수 있다고 믿든 할 수 없다고 믿든 결국 믿는 대로 된다.",
      author: "헨리 포드",
    },
    {
      text: "용기는 두려움이 없는 것이 아니라 두려움을 이기는 것이다.",
      author: "넬슨 만델라",
    },
  ],
  인간관계: [
    {
      text: "사람을 얻는 가장 좋은 방법은 먼저 진심을 주는 것이다.",
      author: "데일 카네기",
    },
    {
      text: "배려는 가장 강력한 인간관계의 기술이다.",
      author: "작자 미상",
    },
    {
      text: "상대방의 입장에서 생각하는 습관이 관계를 만든다.",
      author: "스티븐 코비",
    },
  ],
  공부: [
    {
      text: "오늘의 노력이 내일의 자신감을 만든다.",
      author: "작자 미상",
    },
    {
      text: "천재는 노력하는 사람을 이길 수 없고 노력하는 사람은 즐기는 사람을 이길 수 없다.",
      author: "공자",
    },
    {
      text: "작은 진전도 매일 반복되면 큰 변화가 된다.",
      author: "제임스 클리어",
    },
  ],
};

export default function Home() {
  const [quotes, setQuotes] = useState(defaultData);
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState("");
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  const [newCategory, setNewCategory] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const getRandomQuote = (cat: string) => {
    const list = quotes[cat];
    if (!list?.length) return;

    const random = list[Math.floor(Math.random() * list.length)];
    setCurrentQuote(random);
  };

  const openCategory = (cat: string) => {
    setCategory(cat);
    getRandomQuote(cat);
    setScreen("quote");
  };

  const addQuote = () => {
    if (!newQuote.trim()) return;

    const updated = {
      ...quotes,
      [category]: [
        ...quotes[category],
        {
          text: newQuote,
          author: newAuthor || "작자 미상",
        },
      ],
    };

    setQuotes(updated);
    setNewQuote("");
    setNewAuthor("");
    alert("명언 추가 완료!");
  };

  const deleteQuote = (index: number) => {
    const updated = { ...quotes };

    updated[category] = updated[category].filter((_, i) => i !== index);

    setQuotes(updated);
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;

    if (quotes[newCategory]) {
      alert("이미 존재하는 카테고리");
      return;
    }

    setQuotes({
      ...quotes,
      [newCategory]: [],
    });

    setNewCategory("");
  };

  const deleteCategory = (cat: string) => {
    if (
      cat === "자신감" ||
      cat === "인간관계" ||
      cat === "공부"
    ) {
      alert("기본 카테고리는 삭제할 수 없습니다.");
      return;
    }

    const updated = { ...quotes };
    delete updated[cat];
    setQuotes(updated);
  };

  if (screen === "home") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-4xl font-bold mb-8">오늘의 명언</h1>

        {Object.keys(quotes).map((cat) => (
          <button
            key={cat}
            onClick={() => openCategory(cat)}
            className="w-64 p-4 rounded-2xl border text-xl"
          >
            {cat}
          </button>
        ))}
      </main>
    );
  }

  if (screen === "quote") {
    return (
      <main className="min-h-screen p-6 flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={() => setScreen("settings")}
            className="text-2xl"
          >
            ⚙️
          </button>
        </div>

        <div
          className="flex-1 flex flex-col justify-center items-center text-center"
          onClick={() => getRandomQuote(category)}
        >
          <h2 className="text-3xl font-bold max-w-xl">
            "{currentQuote?.text}"
          </h2>

          <p className="mt-6 text-xl text-gray-500">
            - {currentQuote?.author}
          </p>

          <p className="mt-8 text-sm text-gray-400">
            터치하면 다른 명언 보기
          </p>
        </div>
      </main>
    );
  }

  if (screen === "settings") {
    return (
      <main className="p-6 space-y-6">
        <button
          onClick={() => setScreen("home")}
          className="border px-4 py-2 rounded"
        >
          홈
        </button>

        <button
          onClick={() => setScreen("add")}
          className="border px-4 py-2 rounded block"
        >
          명언 추가
        </button>

        <button
          onClick={() => setScreen("delete")}
          className="border px-4 py-2 rounded block"
        >
          삭제 관리
        </button>

        <div>
          <h2 className="font-bold mb-2">카테고리 추가</h2>

          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="새 카테고리"
            className="border p-2 rounded w-full"
          />

          <button
            onClick={addCategory}
            className="border px-4 py-2 rounded mt-2"
          >
            추가
          </button>
        </div>

        <div>
          <h2 className="font-bold mb-2">카테고리 삭제</h2>

          {Object.keys(quotes).map((cat) => (
            <div
              key={cat}
              className="flex justify-between border p-2 mb-2 rounded"
            >
              <span>{cat}</span>

              <button onClick={() => deleteCategory(cat)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (screen === "add") {
    return (
      <main className="p-6 space-y-4">
        <button
          onClick={() => setScreen("settings")}
          className="border px-4 py-2 rounded"
        >
          뒤로가기
        </button>

        <textarea
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="명언"
          className="border p-2 rounded w-full h-40"
        />

        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="작가"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={addQuote}
          className="border px-4 py-2 rounded"
        >
          추가
        </button>
      </main>
    );
  }

  return (
    <main className="p-6">
      <button
        onClick={() => setScreen("settings")}
        className="border px-4 py-2 rounded mb-4"
      >
        뒤로가기
      </button>

      {quotes[category]?.map((q, index) => (
        <div
          key={index}
          className="border p-4 rounded mb-3 flex justify-between"
        >
          <span>{q.text}</span>

          <button onClick={() => deleteQuote(index)}>
            삭제
          </button>
        </div>
      ))}
    </main>
  );
}