import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CHAR = {
  name: "Алексей Нов",
  age: 28,
  mood: 72,
  energy: 58,
  stress: 45,
  money: 124500,
  day: 847,
};

const STATS = [
  { key: "Харизма", value: 78, color: "from-pink-500 to-rose-400", icon: "Sparkles" },
  { key: "Интеллект", value: 85, color: "from-blue-500 to-cyan-400", icon: "Brain" },
  { key: "EQ", value: 62, color: "from-amber-400 to-orange-400", icon: "Heart" },
  { key: "Воля", value: 91, color: "from-emerald-500 to-teal-400", icon: "Zap" },
];

const RELATIONS = [
  { name: "Марина", role: "Партнёр", trust: 61, tension: 38, attach: "тревожный", avatar: "💜", status: "Дома" },
  { name: "Игорь", role: "Друг", trust: 88, tension: 5, attach: "надёжный", avatar: "🔵", status: "Работает" },
  { name: "Светлана", role: "Мать", trust: 74, tension: 22, attach: "избегающий", avatar: "🟡", status: "Онлайн" },
  { name: "Дмитрий", role: "Конкурент", trust: 12, tension: 85, attach: "тёмная триада", avatar: "🔴", status: "Следит" },
];

const EVENTS = [
  { time: "Сегодня", text: "Марина нашла сообщение. Уровень доверия −12.", type: "danger", icon: "AlertTriangle" },
  { time: "2 дня назад", text: "Повышение на работе. +8500 ₽/мес.", type: "success", icon: "TrendingUp" },
  { time: "5 дней назад", text: "Конфликт с матерью. Старая травма активирована.", type: "warning", icon: "Brain" },
  { time: "Неделю назад", text: "Дмитрий запустил газлайтинг-кампанию.", type: "danger", icon: "Eye" },
];

const CAREER = { title: "Старший аналитик", company: "Nexus Corp", progress: 67, salary: 124500 };

const PSYCHOLOGY = {
  ocean: [
    { label: "O", full: "Открытость", value: 82 },
    { label: "C", full: "Сознательность", value: 71 },
    { label: "E", full: "Экстраверсия", value: 44 },
    { label: "A", full: "Доброжелательность", value: 38 },
    { label: "N", full: "Нейротизм", value: 67 },
  ],
  hidden: ["Страх отвержения", "Тяга к контролю", "Нарциссическая рана"],
  trauma: "Развод родителей в 9 лет",
};

const TABS = [
  { id: "main", label: "Жизнь", icon: "User" },
  { id: "relations", label: "Связи", icon: "Users" },
  { id: "psyche", label: "Психика", icon: "Brain" },
  { id: "career", label: "Карьера", icon: "Briefcase" },
];

function StatBar({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/60 font-body flex items-center gap-1">
          <Icon name={icon} size={11} className="opacity-70" /> {label}
        </span>
        <span className="text-xs font-display text-white font-bold">{value}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function VitalBar({ icon, value, color, label }: { icon: string; value: number; color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color} shadow-lg`}>
        <Icon name={icon} size={15} className="text-white" />
      </div>
      <div className="w-1.5 h-14 bg-white/10 rounded-full overflow-hidden flex flex-col-reverse">
        <div
          className={`bg-gradient-to-t ${color.replace('bg-', 'from-').replace('/20', '')} to-white/90 rounded-full transition-all duration-1000`}
          style={{ height: `${value}%` }}
        />
      </div>
      <span className="text-[10px] text-white/50 font-body">{label}</span>
    </div>
  );
}

function RelationCard({ r }: { r: typeof RELATIONS[0] }) {
  const trustColor = r.trust > 70 ? "text-emerald-400" : r.trust > 40 ? "text-amber-400" : "text-red-400";
  const tensionColor = r.tension > 60 ? "text-red-400" : r.tension > 30 ? "text-amber-400" : "text-emerald-400";
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 space-y-2 animate-slide-up hover:bg-white/8 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-lg border border-white/10">
            {r.avatar}
          </div>
          <div>
            <div className="text-sm font-display font-semibold text-white">{r.name}</div>
            <div className="text-[10px] text-white/40 font-body">{r.role} · {r.attach}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/30 font-body">{r.status}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[9px] text-white/40 font-body mb-0.5">Доверие</div>
          <div className="h-1 bg-white/10 rounded-full">
            <div className={`h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400`} style={{ width: `${r.trust}%` }} />
          </div>
          <span className={`text-[10px] font-display font-bold ${trustColor}`}>{r.trust}%</span>
        </div>
        <div>
          <div className="text-[9px] text-white/40 font-body mb-0.5">Напряжение</div>
          <div className="h-1 bg-white/10 rounded-full">
            <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-400" style={{ width: `${r.tension}%` }} />
          </div>
          <span className={`text-[10px] font-display font-bold ${tensionColor}`}>{r.tension}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState("main");
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState("09:42");

  useEffect(() => {
    const t = setInterval(() => {
      setTick(p => p + 1);
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A12] font-body overflow-hidden" style={{ background: "radial-gradient(ellipse at top, #1a0a2e 0%, #0a0a12 60%)" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 animate-spin-slow" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
      </div>

      {/* Mobile frame */}
      <div className="relative mx-auto max-w-[390px] min-h-screen flex flex-col">

        {/* Status bar */}
        <div className="flex justify-between items-center px-6 pt-4 pb-2">
          <span className="text-xs text-white/40 font-body">{time}</span>
          <div className="flex items-center gap-1.5">
            <Icon name="Wifi" size={12} className="text-white/40" />
            <Icon name="Battery" size={12} className="text-white/40" />
          </div>
        </div>

        {/* Header */}
        <div className="px-5 pt-1 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring" />
              </div>
              <span className="text-[11px] text-emerald-400 font-body uppercase tracking-widest">День {CHAR.day}</span>
            </div>
            <h1 className="text-xl font-display font-black text-white mt-0.5 leading-tight">
              {CHAR.name}
            </h1>
            <p className="text-xs text-white/40 font-body">{CHAR.age} лет · {CAREER.title}</p>
          </div>
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-2xl animate-glow-pulse shadow-xl">
              👤
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
              <span className="text-[9px] font-display font-black text-black">28</span>
            </div>
          </div>
        </div>

        {/* Vitals strip */}
        <div className="mx-5 mb-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-lg">😐</div>
              <div className="text-[10px] text-white/40 font-body">Настрой</div>
              <span className="text-xs font-display font-bold text-amber-400">{CHAR.mood}%</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-lg">⚡</div>
              <div className="text-[10px] text-white/40 font-body">Энергия</div>
              <span className="text-xs font-display font-bold text-cyan-400">{CHAR.energy}%</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-lg">🧠</div>
              <div className="text-[10px] text-white/40 font-body">Стресс</div>
              <span className="text-xs font-display font-bold text-red-400">{CHAR.stress}%</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-lg">💰</div>
              <div className="text-[10px] text-white/40 font-body">Баланс</div>
              <span className="text-xs font-display font-bold text-emerald-400">{(CHAR.money / 1000).toFixed(0)}к</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mx-5 mb-4 grid grid-cols-4 gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-200 ${
                tab === t.id
                  ? "bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg scale-105"
                  : "hover:bg-white/5"
              }`}
            >
              <Icon name={t.icon} size={15} className={tab === t.id ? "text-white" : "text-white/40"} />
              <span className={`text-[9px] font-display font-semibold ${tab === t.id ? "text-white" : "text-white/40"}`}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-5 pb-6 overflow-y-auto space-y-3">

          {tab === "main" && (
            <>
              {/* Stats */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Характеристики</span>
                  <Icon name="BarChart2" size={13} className="text-white/30" />
                </div>
                {STATS.map(s => (
                  <StatBar key={s.key} label={s.key} value={s.value} color={s.color} icon={s.icon} />
                ))}
              </div>

              {/* Recent events */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Хроника событий</span>
                  <Icon name="Clock" size={13} className="text-white/30" />
                </div>
                <div className="space-y-2">
                  {EVENTS.map((e, i) => (
                    <div key={i} className={`flex gap-2.5 p-2 rounded-xl ${
                      e.type === "danger" ? "bg-red-500/10 border border-red-500/20" :
                      e.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20" :
                      "bg-amber-500/10 border border-amber-500/20"
                    }`}>
                      <Icon
                        name={e.icon}
                        size={14}
                        className={e.type === "danger" ? "text-red-400 mt-0.5 shrink-0" : e.type === "success" ? "text-emerald-400 mt-0.5 shrink-0" : "text-amber-400 mt-0.5 shrink-0"}
                      />
                      <div>
                        <p className="text-[11px] text-white/80 font-body leading-tight">{e.text}</p>
                        <p className="text-[9px] text-white/30 font-body mt-0.5">{e.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Работать", icon: "Briefcase", grad: "from-blue-600 to-cyan-500" },
                  { label: "Отдохнуть", icon: "Coffee", grad: "from-amber-500 to-orange-400" },
                  { label: "Общаться", icon: "MessageCircle", grad: "from-violet-600 to-purple-400" },
                ].map(a => (
                  <button key={a.label} className={`bg-gradient-to-br ${a.grad} rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-lg active:scale-95 transition-transform`}>
                    <Icon name={a.icon} size={20} className="text-white" />
                    <span className="text-[10px] font-display font-bold text-white">{a.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === "relations" && (
            <>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Социальная сеть</span>
                <span className="text-[10px] text-white/30 font-body">{RELATIONS.length} связи</span>
              </div>
              {RELATIONS.map((r, i) => (
                <div key={i} style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }} className="animate-slide-up">
                  <RelationCard r={r} />
                </div>
              ))}
              {/* Memory bank */}
              <div className="bg-gradient-to-br from-red-900/30 to-rose-900/20 border border-red-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertTriangle" size={14} className="text-red-400" />
                  <span className="text-xs font-display font-bold text-red-400 uppercase tracking-wider">Банк обид</span>
                </div>
                <p className="text-[11px] text-white/50 font-body leading-relaxed">
                  Марина помнит измену <span className="text-red-400 font-semibold">2 года назад</span>. Шкала отношений заполнена, но доверие восстановлено лишь на 61%. Скрытый триггер активен.
                </p>
              </div>
            </>
          )}

          {tab === "psyche" && (
            <>
              {/* OCEAN */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Модель OCEAN</span>
                  <Icon name="Activity" size={13} className="text-white/30" />
                </div>
                <div className="flex justify-around items-end h-24">
                  {PSYCHOLOGY.ocean.map((o, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[9px] font-display font-bold text-white/60">{o.value}</span>
                      <div className="w-6 rounded-full overflow-hidden bg-white/10" style={{ height: "64px" }}>
                        <div
                          className="w-full rounded-full"
                          style={{
                            height: `${o.value}%`,
                            marginTop: `${100 - o.value}%`,
                            background: `hsl(${i * 60 + 260}, 80%, 65%)`
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-display font-black" style={{ color: `hsl(${i * 60 + 260}, 80%, 65%)` }}>{o.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-1 gap-1">
                  {PSYCHOLOGY.ocean.map((o, i) => (
                    <div key={i} className="flex justify-between text-[10px]">
                      <span className="text-white/30 font-body">{o.full}</span>
                      <span className="font-display font-bold" style={{ color: `hsl(${i * 60 + 260}, 80%, 65%)` }}>{o.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trauma */}
              <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/20 border border-violet-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Zap" size={14} className="text-violet-400" />
                  <span className="text-xs font-display font-bold text-violet-400 uppercase tracking-wider">Ключевая травма</span>
                </div>
                <p className="text-sm text-white/80 font-body">{PSYCHOLOGY.trauma}</p>
                <p className="text-[10px] text-white/40 font-body mt-1">Сформировала тревожный тип привязанности. Влияет на выбор партнёров с нестабильностью.</p>
              </div>

              {/* Hidden needs */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Eye" size={14} className="text-pink-400" />
                  <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Скрытые потребности</span>
                </div>
                <div className="space-y-2">
                  {PSYCHOLOGY.hidden.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
                      <span className="text-[11px] text-white/70 font-body">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "career" && (
            <>
              {/* Current position */}
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] text-blue-400 font-body uppercase tracking-widest">{CAREER.company}</div>
                    <div className="text-lg font-display font-black text-white mt-0.5">{CAREER.title}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Icon name="Briefcase" size={22} className="text-blue-400" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white/40 font-body">Прогресс до повышения</span>
                    <span className="text-blue-400 font-display font-bold">{CAREER.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: `${CAREER.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Доход в месяц</span>
                  <span className="text-2xl font-display font-black text-emerald-400">{CAREER.salary.toLocaleString()} ₽</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: "Аренда", val: "-35 000", color: "text-red-400" },
                    { label: "Еда", val: "-12 000", color: "text-amber-400" },
                    { label: "Остаток", val: "+77 500", color: "text-emerald-400" },
                  ].map(f => (
                    <div key={f.label} className="bg-white/5 rounded-xl p-2 text-center">
                      <div className="text-[9px] text-white/30 font-body">{f.label}</div>
                      <div className={`text-[11px] font-display font-bold ${f.color} mt-0.5`}>{f.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career paths */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="TrendingUp" size={14} className="text-emerald-400" />
                  <span className="text-xs font-display font-bold text-white/70 uppercase tracking-wider">Карьерные пути</span>
                </div>
                <div className="space-y-2">
                  {[
                    { title: "Ведущий аналитик", req: "EQ > 70", locked: false },
                    { title: "Руководитель отдела", req: "Харизма > 85", locked: true },
                    { title: "Собственный бизнес", req: "Капитал > 500к", locked: true },
                  ].map((p, i) => (
                    <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl border ${p.locked ? "bg-white/3 border-white/5 opacity-50" : "bg-emerald-500/10 border-emerald-500/20"}`}>
                      <div>
                        <div className={`text-[11px] font-display font-semibold ${p.locked ? "text-white/40" : "text-white/80"}`}>{p.title}</div>
                        <div className="text-[9px] text-white/30 font-body">{p.req}</div>
                      </div>
                      <Icon name={p.locked ? "Lock" : "ArrowRight"} size={14} className={p.locked ? "text-white/20" : "text-emerald-400"} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom safe area */}
        <div className="h-4" />
      </div>
    </div>
  );
}