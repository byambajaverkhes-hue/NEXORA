import { useMemo, useState } from "react";
import {
  Activity, ArrowRight, Bell, CalendarDays, ChevronRight, Crown,
  Gamepad2, Menu, MessageCircle, Search, Shield, Swords, Trophy,
  Users, X, Zap, UserCircle2, LayoutDashboard
} from "lucide-react";
import { firebaseConfigured } from "./firebase";

type Page = "Home" | "Tournaments" | "Teams" | "Community" | "Leaderboard" | "Profile";
const nav: { name: Page; icon: typeof Activity }[] = [
  { name: "Home", icon: LayoutDashboard },
  { name: "Tournaments", icon: Trophy },
  { name: "Teams", icon: Users },
  { name: "Community", icon: MessageCircle },
  { name: "Leaderboard", icon: Activity },
  { name: "Profile", icon: UserCircle2 }
];

const tournaments = [
  { game: "MOBILE LEGENDS", short: "MLBB", title: "NEXORA WEEKLY CLASH", date: "FRIDAY · 20:00", teams: "12 / 16", status: "REGISTRATION OPEN", tone: "red" },
  { game: "STANDOFF 2", short: "SO2", title: "NEXORA ARENA", date: "FRIDAY · 20:00", teams: "8 / 16", status: "REGISTRATION OPEN", tone: "muted" }
];

function App() {
  const [page, setPage] = useState<Page>("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const filtered = useMemo(() => tournaments.filter(t =>
    `${t.game} ${t.title}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  const go = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const announce = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 3200); };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <button className="brand" onClick={() => go("Home")} aria-label="NEXORA home">
          <span className="brand-mark">N</span><span>NEXORA<span className="brand-dot">.</span></span>
        </button>
        <nav className="desktop-nav">
          {nav.map(item => <button key={item.name} className={page === item.name ? "nav-link active" : "nav-link"} onClick={() => go(item.name)}>{item.name}</button>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button notification" aria-label="Notifications" onClick={() => announce("You're all caught up.")}><Bell size={18} /></button>
          <button className="login-button" onClick={() => setShowLogin(true)}>LOG IN <ArrowRight size={15} /></button>
        </div>
      </header>

      {menuOpen && <div className="mobile-nav">{nav.map(item => <button key={item.name} onClick={() => go(item.name)}><item.icon size={18}/>{item.name}</button>)}</div>}

      <main className="main-content">
        {page === "Home" && <>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span className="live-dot" /> THE NEXT LEVEL STARTS HERE</div>
              <h1>PLAY.<br/><span>CONNECT.</span><br/>WIN.</h1>
              <p className="hero-description">Your arena. Your team. Your moment.<br/>Join the community and compete.</p>
              <div className="hero-buttons">
                <button className="primary-button" onClick={() => go("Tournaments")}>EXPLORE TOURNAMENTS <ArrowRight size={16}/></button>
                <button className="text-button" onClick={() => go("Community")}>JOIN COMMUNITY <ChevronRight size={16}/></button>
              </div>
              <div className="hero-footnote"><Shield size={14}/> FREE TO JOIN · BUILT FOR PLAYERS</div>
            </div>
            <div className="hero-art" aria-label="NEXORA esports graphic">
              <div className="art-ring ring-one"/><div className="art-ring ring-two"/>
              <div className="art-core"><span>N</span></div>
              <div className="art-tag tag-top">NEXORA <b>ARENA</b></div>
              <div className="art-tag tag-bottom"><Zap size={14}/> READY TO COMPETE</div>
              <div className="art-cross">+</div>
            </div>
          </section>

          <section className="stats-grid">
            <Stat icon={<Users/>} value="COMMUNITY" label="PLAY TOGETHER"/>
            <Stat icon={<Trophy/>} value="WEEKLY" label="TOURNAMENTS"/>
            <Stat icon={<Zap/>} value="FREE" label="TO JOIN"/>
          </section>

          <section className="section-block">
            <div className="section-heading"><div><div className="eyebrow">FIND YOUR ARENA</div><h2>FEATURED <span>GAMES</span></h2></div><button className="view-all" onClick={() => go("Tournaments")}>VIEW ALL <ArrowRight size={15}/></button></div>
            <div className="game-grid">
              <GameCard title="MOBILE LEGENDS" subtitle="BANG BANG" initials="ML" number="01" onClick={() => go("Tournaments")}/>
              <GameCard title="STANDOFF 2" subtitle="TACTICAL FPS" initials="S2" number="02" onClick={() => go("Tournaments")}/>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading"><div><div className="eyebrow">DON'T MISS OUT</div><h2>UPCOMING <span>EVENTS</span></h2></div><button className="view-all" onClick={() => go("Tournaments")}>ALL EVENTS <ArrowRight size={15}/></button></div>
            <div className="event-card">
              <div className="event-date"><CalendarDays/><b>FRI</b><strong>20:00</strong><small>UTC +8</small></div>
              <div className="event-info"><span className="status-pill"><i/> REGISTRATION OPEN</span><h3>NEXORA WEEKLY CLASH</h3><p>Mobile Legends · 5-player teams · Free entry</p></div>
              <button className="round-arrow" onClick={() => go("Tournaments")} aria-label="View event"><ArrowRight/></button>
            </div>
          </section>
        </>}

        {page === "Tournaments" && <PageHeader eyebrow="COMPETE WITH THE COMMUNITY" title={<>TOURNAMENT <span>HUB</span></>} description="Find your next match. All community tournaments are free to enter."/>}
        {page === "Tournaments" && <div className="content-panel">
          <div className="toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tournaments or games"/></div><span className="result-count">{filtered.length} EVENTS</span></div>
          <div className="tournament-list">{filtered.map((t,i)=><div className="tournament-row" key={t.title}><div className="game-chip">{t.short}</div><div className="tournament-details"><small>{t.game}</small><h3>{t.title}</h3><p><CalendarDays size={14}/> {t.date} <span>·</span> <Users size={14}/> {t.teams} TEAMS</p></div><div className="tournament-side"><span className="status-pill"><i/> {t.status}</span><button className="small-outline" onClick={() => announce("Tournament registration will open after account setup.")}>VIEW DETAILS <ArrowRight size={14}/></button></div></div>)}
          {filtered.length===0 && <div className="empty-state">No tournaments match your search.</div>}</div>
          <p className="fine-print">Schedules are shown in Mongolia time (UTC+8). Registration requires a verified account and a complete 5-player team.</p>
        </div>}

        {page === "Teams" && <><PageHeader eyebrow="FIND YOUR SQUAD" title={<>BUILD YOUR <span>TEAM</span></>} description="Create a five-player roster and get ready for the next tournament."/><div className="feature-grid"><Feature icon={<Users/>} title="CREATE A TEAM" text="Choose a team name and become its captain."/><Feature icon={<Shield/>} title="INVITE 4 PLAYERS" text="Invite four verified members to complete your roster."/><Feature icon={<Swords/>} title="ENTER THE ARENA" text="Register your full team for an open tournament." /></div><div className="callout"><div><b>YOUR TEAM STARTS HERE</b><p>Sign in to create a team and invite players.</p></div><button className="primary-button" onClick={() => setShowLogin(true)}>GET STARTED <ArrowRight size={15}/></button></div></>}

        {page === "Community" && <><PageHeader eyebrow="MEET YOUR PEOPLE" title={<>THE <span>COMMUNITY</span></>} description="Find players, share moments and build your gaming circle."/><div className="feature-grid"><Feature icon={<MessageCircle/>} title="GROUP CHAT" text="Community text and image discussions."/><Feature icon={<Users/>} title="PLAYER GROUPS" text="Create a group with up to 100 verified members."/><Feature icon={<Shield/>} title="SAFER SPACE" text="Report, block and mute tools with moderation." /></div><div className="callout"><div><b>CONNECT WITH PLAYERS</b><p>Community features become available after sign-in.</p></div><button className="primary-button" onClick={() => setShowLogin(true)}>JOIN NEXORA <ArrowRight size={15}/></button></div></>}

        {page === "Leaderboard" && <><PageHeader eyebrow="THE TOP PLAYERS" title={<>LEADER<span>BOARD</span></>} description="Earn points through community tournaments and climb the rankings."/><div className="content-panel"><div className="empty-state"><Trophy size={30}/><h3>THE RANKINGS ARE WAITING</h3><p>Player rankings will appear here when verified tournament results are published.</p></div></div></>}

        {page === "Profile" && <><PageHeader eyebrow="YOUR NEXORA IDENTITY" title={<>PLAYER <span>PROFILE</span></>} description="Manage your account, team invitations and preferences."/><div className="profile-card"><div className="avatar"><UserCircle2 size={38}/></div><div><b>GUEST PLAYER</b><p>Sign in to create your NEXORA profile.</p></div><button className="primary-button" onClick={() => setShowLogin(true)}>LOG IN <ArrowRight size={15}/></button></div><div className="feature-grid"><Feature icon={<Bell/>} title="NOTIFICATIONS" text="Tournament updates and team invitations."/><Feature icon={<Shield/>} title="ACCOUNT SECURITY" text="Verified email and secure sign-in."/><Feature icon={<Crown/>} title="ROLES" text="Owner, Admin, Tournament Staff and Member." /></div></>}
      </main>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">N</span> NEXORA<span className="brand-dot">.</span></div><span>PLAY. CONNECT. WIN.</span><span>© 2026 NEXORA COMMUNITY</span></footer>
      <nav className="bottom-nav">{nav.map(item=><button key={item.name} className={page===item.name?"bottom-item selected":"bottom-item"} onClick={()=>go(item.name)}><item.icon size={18}/><span>{item.name}</span></button>)}</nav>

      {notice && <div className="toast">{notice}</div>}
      {showLogin && <div className="modal-backdrop" onClick={() => setShowLogin(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowLogin(false)}><X/></button><div className="eyebrow">WELCOME TO NEXORA</div><h2>YOUR GAME.<br/><span>YOUR COMMUNITY.</span></h2><p>Account registration and secure sign-in will be enabled when Firebase is connected.</p><div className="setup-note"><Shield size={17}/><span>{firebaseConfigured ? "Firebase settings detected. Authentication setup is the next step." : "Firebase connection required to enable real accounts."}</span></div><button className="primary-button full-width" onClick={() => {setShowLogin(false);announce("Account setup is the next build step.");}}>GOT IT</button></div></div>}
    </div>
  );
}

function Stat({icon,value,label}:{icon:React.ReactNode,value:string,label:string}) { return <div className="stat-card"><span>{icon}</span><div><b>{value}</b><small>{label}</small></div></div>; }
function GameCard({title,subtitle,initials,number,onClick}:{title:string,subtitle:string,initials:string,number:string,onClick:()=>void}) { return <button className="game-card" onClick={onClick}><div className="game-number">{number} / NEXORA GAME</div><div className="game-symbol">{initials}</div><div className="game-card-bottom"><div><h3>{title}</h3><p>{subtitle}</p></div><span className="round-arrow"><ArrowRight/></span></div></button>; }
function PageHeader({eyebrow,title,description}:{eyebrow:string,title:React.ReactNode,description:string}) { return <section className="page-header"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></section>; }
function Feature({icon,title,text}:{icon:React.ReactNode,title:string,text:string}) { return <div className="feature-card"><span>{icon}</span><h3>{title}</h3><p>{text}</p></div>; }

export default App;
