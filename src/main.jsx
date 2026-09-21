import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [
  ['WORK', '#work'],
  ['OUTSIDE', '#outside'],
  ['EXPERIENCE', '#experience'],
  ['ABOUT', '#about'],
  ['CONTACT', '#contact'],
]

const tags = (items) => (
  <div className="tag-row">
    {items.map((item) => <span className="tag" key={item}>{item}</span>)}
  </div>
)

function ArrowLink({ href, children }) {
  return <a className="arrow-link" href={href}>{children}<span aria-hidden="true">↗</span></a>
}

function MediaPanel({ variant = 'grid', eyebrow, title, note, className = '' }) {
  return (
    <div className={`media-panel media-${variant} ${className}`} aria-label={`${title} 项目视觉构图`}>
      <div className="media-frame">
        <span className="media-eyebrow">{eyebrow}</span>
        <span className="media-title">{title}</span>
        <span className="media-note">{note}</span>
        <span className="media-mark" aria-hidden="true">↗</span>
      </div>
    </div>
  )
}

function ProjectMeta({ items }) {
  return (
    <dl className="project-meta">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function CaseHeader({ number, title, english, intro, tags: projectTags }) {
  return (
    <div className="case-header">
      <div className="case-index">CASE {number}</div>
      <div>
        <p className="eyebrow">Selected work / {number}</p>
        <h2>{title}</h2>
        <p className="case-english">{english}</p>
        <p className="case-intro">{intro}</p>
        {tags(projectTags)}
      </div>
    </div>
  )
}

function YangmingCase() {
  return (
    <article className="case case-yangming" id="yangming">
      <CaseHeader
        number="01"
        title="一个让人慢下来的地方"
        english="A Place to Slow Down"
        intro="通过疗愈体验与既有资源的重新激活，想象一座运营十五年的温泉度假酒店，还可以如何重新变得值得到访。"
        tags={['文旅策划 Destination Planning', '体验策划 Experience Planning', '概念设计 Concept Development']}
      />
      <div className="case-intro-grid">
        <ProjectMeta items={[
          ['TYPE', '温泉度假酒店更新策划'],
          ['YEAR', '2025'],
          ['STATUS', '概念方案 · 后续未继续深化'],
          ['MY ROLE', '概念策划 / 体验创意 / 方案叙事 / 客户提案'],
        ]} />
        <MediaPanel variant="terrain" eyebrow="FIELD NOTE 01" title="RE-SEE THE PLACE" note="茶山 · 溪流 · 山林 · 温泉" />
      </div>
      <div className="story-grid split-reverse">
        <div className="story-copy">
          <p className="eyebrow">The starting point</p>
          <h3>一座逐渐老去的温泉酒店，怎样重新变得值得到访？</h3>
          <p>阳明温泉山庄已经营业十五年。建筑与基础设施仍维护得较为完整，但部分核心空间与体验已经逐渐难以匹配新的度假需求。</p>
          <p>甲方希望更新温泉与水乐园，重新利用闲置设施，并以此带动周边景观与整体度假体验的升级。</p>
        </div>
        <MediaPanel variant="water" eyebrow="SITE QUESTION" title="A NEW REASON TO STAY" note="温泉设施 / 闲置空间 / 度假需求" />
      </div>
      <div className="concept-band">
        <div>
          <p className="eyebrow">Core concept</p>
          <h3>松弛之境</h3>
          <p className="serif-note">A Place to Slow Down</p>
        </div>
        <p>不是用更多内容填满一段旅程，而是创造一种让人逐渐慢下来、重新感受身体与自然的状态。</p>
        <div className="concept-list">
          {[
            ['RETURN', '回归', '回到自然，也回到身体本身。'],
            ['RESTORE', '恢复', '暂时退出日常，重新获得能量。'],
            ['CONNECT', '连接', '与家人、同行者和自然重新发生关系。'],
            ['SENSE', '感知', '重新听见风、闻到香、看见星空和日落。'],
          ].map(([en, cn, desc]) => <div key={en}><strong>{en}</strong><span>{cn}</span><small>{desc}</small></div>)}
        </div>
      </div>
      <div className="experience-system">
        <div className="section-kicker"><span>01—04</span><span>Experience system</span></div>
        <h3>从概念，变成一种完整的度假方式</h3>
        <div className="system-grid">
          {[
            ['WATER', '水', '温泉 · 私汤 · 漂浮 · 亲水', 'water'],
            ['NATURE', '自然', '疗愈森林 · 芳香花圃 · 茶山', 'nature'],
            ['NOURISH', '滋养', '采摘 · 食养 · 茶咖', 'nourish'],
            ['STAY & CONNECT', '停留与连接', '露营 · 观星 · 家庭 · 自然社交', 'stay'],
          ].map(([en, cn, desc, variant]) => (
            <div className="system-card" key={en}>
              <div className={`system-orb orb-${variant}`}><span>{en}</span></div>
              <h4>{cn}</h4><p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="three-ideas">
        <div className="section-kicker"><span>KEY IDEAS</span><span>From strategy to scene</span></div>
        <div className="idea-grid">
          {[
            ['01', '水乐园的淡季功能转换', '夏季是嬉水空间，淡季则转换为更安静的漂浮冥想、桨板等水上体验场所。'],
            ['02', '一种新的入住方式', '形成车尾露营场景服务的设想，并加入观星、自然社交体验场景。'],
            ['03', '明逸轩的功能再利用', '一层向外打开为食养就餐空间；二层以更高、更安静的视野远眺茶山。'],
          ].map(([number, title, text]) => <div className="idea-card" key={number}><span>{number}</span><h4>{title}</h4><p>{text}</p></div>)}
        </div>
      </div>
      <blockquote className="pull-quote">一个好的概念，并不是为项目贴上一个漂亮的名字。<span>它应该帮助我们重新看待已经存在的问题，并继续生长出空间、活动和真实体验。</span></blockquote>
    </article>
  )
}

function BinrongCase() {
  return (
    <article className="case case-binrong" id="binrongfu">
      <CaseHeader
        number="02"
        title="从方案到现场"
        english="From Idea to Reality"
        intro="在两个与室内生活紧密相连的屋顶露台中，协调不同的使用场景与审美偏好，并在施工阶段面对荷载、设备等真实条件持续调整，最终完成落地。"
        tags={['全流程设计 Full-process Design', '客户沟通 Client Communication', '落地执行 Project Delivery']}
      />
      <div className="case-intro-grid binrong-intro">
        <MediaPanel variant="terrace" eyebrow="BUILT / 2024" title="TWO TERRACES" note="东露台 · 西露台 · 约 140㎡" />
        <ProjectMeta items={[
          ['TYPE', '高端大平层双露台花园'],
          ['YEAR', '2024'],
          ['AREA', '约 140㎡'],
          ['STATUS', '已交付 · Completed'],
          ['MY ROLE', '主创设计 / 方案深化 / 植物设计 / 施工跟进 / 客户沟通'],
        ]} />
      </div>
      <div className="terrace-story">
        <div className="terrace-copy"><p className="eyebrow">Two ways of living</p><h3>两个露台，两种生活场景</h3><p>东露台对应客厅，是较为狭长的 L 形空间。沿墙设置与景墙结合的立体叠水水景，并加入盆景展示台、景石以及灌木球与杂木风格植物。</p><p>西露台对应茶室，承担喝茶、朋友小聚与日常休闲。竹篱、植物、阳伞与沙发卡座共同组织出更完整的户外会客空间。</p></div>
        <div className="terrace-diagram"><div className="diagram-home">LIVING</div><div className="diagram-water">WATER</div><div className="diagram-bar">BAR</div><div className="diagram-label east">EAST TERRACE</div><div className="diagram-label west">WEST TERRACE</div></div>
      </div>
      <div className="constraint-row">
        <div className="constraint-block"><p className="eyebrow">01 / Privacy as experience</p><h3>私密性的目的，是让业主真正愿意坐下来。</h3><p>高层住宅露台与周边建筑距离较近，我们通过不同尺度的植物、竹篱、景墙与景观构筑形成多层次遮挡，同时尽量保留露台自身的开放感。</p></div>
        <div className="constraint-block"><p className="eyebrow">02 / Load limitation</p><h3>真实条件让设计更具体。</h3><div className="mini-list"><span>景石轻量化</span><span>减少覆土</span><span>调整植物配置</span></div><p>部分景石内部掏空，只保留外部造型壳体；缩小覆土范围并降低高度，再根据种植条件重新调整植物组合。</p></div>
        <div className="constraint-block"><p className="eyebrow">03 / Exhaust outlet</p><h3>让设备退到视线之后。</h3><p>现场存在体量明显的建筑主烟道排风口。方案通过景墙、水景、植物与构造重新组织关系，在保证设备正常工作的前提下，降低它对主要视线的影响。</p></div>
      </div>
      <div className="delivery-strip"><span>需求</span><i>→</i><span>方案</span><i>→</i><span>深化</span><i>→</i><span>现场</span><i>→</i><span>调整</span><i>→</i><strong>落地</strong></div>
      <blockquote className="pull-quote quote-dark">执行力，是让一个想法经历真实条件之后，仍然能够成立。</blockquote>
    </article>
  )
}

function YuelongCase() {
  return (
    <article className="case case-yuelong" id="yuelongwan">
      <CaseHeader
        number="03"
        title="两栋房子之间"
        english="Designing the In-between"
        intro="在接待与起居、车行与花园、现代与日式之间，为两栋用途不同的别墅建立一个完整而自然的空间系统。"
        tags={['私宅景观 Residential Landscape', '空间系统 Spatial System', '体验组织 Experience Planning']}
      />
      <div className="case-intro-grid yuelong-intro">
        <ProjectMeta items={[
          ['TYPE', '双别墅合并花园'],
          ['YEAR', '2025'],
          ['AREA', '约 1600㎡'],
          ['STATUS', '施工进行中 · Under Construction'],
          ['MY ROLE', '主创设计 / 方案深化 / 植物设计 / 施工跟进 / 客户沟通'],
        ]} />
        <MediaPanel variant="garden" eyebrow="SPATIAL SYSTEM" title="ARRIVAL → LIFE" note="入户花园 · 主花园 · 休闲花园" />
      </div>
      <div className="system-story">
        <div><p className="eyebrow">One garden, three sequences</p><h3>三个花园，一套系统</h3><p>业主先后购入两栋相邻别墅，希望将彼此独立的庭院合并成一个整体花园。一栋偏向接待与聚会，另一栋服务家庭日常起居。</p></div>
        <div className="sequence-list">
          {[
            ['01', '入户花园', 'Arrival Garden', '承担到达、行车、停车与建筑展示。'],
            ['02', '主花园', 'Main Garden', '以大草坪为核心，是主要公共生活空间。'],
            ['03', '休闲花园', 'Leisure Garden', '对应挑空客厅，形成更安静的日常停留场景。'],
          ].map(([n, cn, en, desc]) => <div key={n}><b>{n}</b><div><strong>{cn}</strong><span>{en}</span><p>{desc}</p></div></div>)}
        </div>
      </div>
      <div className="relationship-map"><div className="map-line map-line-a"><span>HOUSE</span><b>→</b><span>GARDEN</span></div><div className="map-line map-line-b"><span>ARRIVAL</span><b>↔</b><span>PARKING</span></div><div className="map-line map-line-c"><span>FORMAL</span><b>→</b><span>NATURAL</span></div><p className="map-caption">Designing relationships, not just spaces.</p></div>
      <div className="lookback-grid"><MediaPanel variant="pavilion" eyebrow="A DIFFERENT POINT OF VIEW" title="LOOK BACK" note="House → Garden → Pavilion" /><div><p className="eyebrow">A different point of view</p><h3>改变观看花园的位置</h3><p>主花园最远端设置一座相对独立的休闲亭。它除了承担喝茶、棋牌与日常停留，也改变了人观看整个花园的位置。</p><p>通常，人从住宅内部向外看花园。走到花园最远端后，观看方向第一次反转。</p><strong className="inline-equation">House → Garden → Pavilion → Look Back</strong></div></div>
      <blockquote className="pull-quote">很多时候，设计不是继续增加新的内容，而是重新安排人与空间之间的关系。</blockquote>
    </article>
  )
}

function HowIWork() {
  const steps = [
    ['01', 'OBSERVE', '观察', '先理解人、场景和真实需求。'],
    ['02', 'DEFINE', '定义', '找到真正需要解决的问题。'],
    ['03', 'CONCEPT', '构思', '建立一个能够统领项目的核心想法。'],
    ['04', 'ORGANIZE', '组织', '把想法转成具体内容、空间、动线和体验。'],
    ['05', 'DELIVER', '落地', '面对现场与现实限制持续调整，把方案推进完成。'],
  ]
  return <section className="how-section section-pad" id="how"><div className="section-kicker"><span>07 / How I Work</span><span>My process</span></div><div className="how-heading"><div><h2>从一个想法，<br />到真实发生</h2><p className="case-english">From Idea to Reality</p></div><p className="how-statement">我习惯把模糊的需求梳理成清晰的方案，再把方案推进到真实现场。</p></div><div className="steps-grid">{steps.map(([n, en, cn, desc]) => <div className="step-card" key={n}><span className="step-number">{n}</span><strong>{en}</strong><h3>{cn}</h3><p>{desc}</p></div>)}</div><div className="process-equation"><span>Concept</span><b>→</b><span>Experience</span><b>→</b><span>Execution</span><small>想法 → 体验 → 落地</small></div></section>
}

function OutsideSection() {
  const [active, setActive] = useState('ALL')
  const filters = ['ALL', 'STREET', 'LANDSCAPE', 'INTERIOR', 'FILM']
  const cards = [
    ['STREET', '城市、建筑、人和偶然出现的瞬间。', 'street'],
    ['LANDSCAPE', '自然、天气、植物与安静的空间关系。', 'landscape'],
    ['INTERIOR', '室内空间、生活细节、光线与物件。', 'interior'],
    ['FILM', '以胶片记录旅行、日常和更缓慢的观察。', 'film'],
  ]
  const shown = active === 'ALL' ? cards : cards.filter(([label]) => label === active)
  return <section className="outside-section section-pad" id="outside"><div className="section-kicker"><span>08 / Outside of Work</span><span>Personal practice</span></div><div className="outside-heading"><div><h2>工作之外</h2><p className="case-english">Outside of Work</p></div><p>工作之外，我也很喜欢观察、动手和创造一些具体的东西。</p></div><div className="outside-nav" role="tablist" aria-label="Photography categories">{filters.map((filter) => <button key={filter} className={active === filter ? 'is-active' : ''} onClick={() => setActive(filter)} role="tab" aria-selected={active === filter}>{filter}</button>)}</div><div className="photo-grid">{shown.map(([label, desc, variant], index) => <div className={`photo-card photo-${variant}`} key={label}><div className="photo-surface"><span>{String(index + 1).padStart(2, '0')}</span><i>{label}</i></div><div className="photo-copy"><strong>{label}</strong><p>{desc}</p></div></div>)}</div><div className="outside-practices"><div><span>02</span><strong>CRAFT</strong><p>我很享受一个想法从材料开始，最后变成真实物件的过程。</p></div><div><span>03</span><strong>FLORAL</strong><p>植物、颜色、比例和一点点偶然。</p></div><div><span>04</span><strong>ROOM MAKEOVER</strong><p>重新调整颜色、家具、灯光和物件之间的关系。</p></div></div></section>
}

function ExperienceSection() {
  return <section className="experience-section section-pad" id="experience"><div className="section-kicker"><span>09 / Experience</span><span>Selected path</span></div><div className="experience-heading"><h2>一路从空间，<br />走向体验。</h2><p>参与项目从公共空间、私宅景观延伸到大型度假酒店，并逐渐承担主创设计与项目推进职责。</p></div><div className="timeline"><div className="timeline-item"><span className="timeline-date">2021.08 — 2023.03</span><div><h3>中国美术学院风景建筑设计研究院</h3><p>参与展馆、美术馆、口袋公园、公共空间、文旅相关空间项目。</p>{tags(['空间设计', '视觉表达', '公共体验'])}</div></div><div className="timeline-item"><span className="timeline-date">2023.03 — 2026.03</span><div><h3>米人工作室 / 浙江华坤建筑设计院</h3><p>参与项目从高端私宅延伸到大型度假酒店、市政公园，并逐渐承担主创设计与项目推进职责。</p>{tags(['主创设计', '客户沟通', '方案汇报', '施工跟进', '落地交付'])}</div></div><div className="timeline-item timeline-now"><span className="timeline-date">NOW / 现在</span><div><h3>希望进入文旅内容与运营现场</h3><p>把过去在空间项目中积累的体验策划、视觉表达、客户沟通与落地能力，带进更加开放的文旅场景中。</p></div></div></div></section>
}

function App() {
  return <div className="site-shell"><header className="site-header"><a className="monogram" href="#top" aria-label="Back to top"><span>M</span><small>PORTFOLIO / 2026</small></a><nav>{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav><a className="header-contact" href="#contact">SAY HELLO <span>↗</span></a></header><main id="top"><section className="hero"><div className="hero-topline"><span>Interview portfolio / 01</span><span>Hangzhou, CN</span></div><div className="hero-content"><div className="hero-copy"><p className="eyebrow">Creative Planning × Experience Design</p><h1>让一个想法，<br /><em>真正发生。</em></h1><p className="hero-intro">我习惯从人、场景和体验出发，把模糊的需求梳理成清晰的方案，并持续推进到真实落地。</p><div className="hero-actions"><ArrowLink href="#work">Selected Works</ArrowLink><ArrowLink href="#contact">Contact</ArrowLink></div></div><div className="hero-art"><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-orbit orbit-three"></div><div className="hero-dot"></div><div className="hero-coordinate coord-a">01 / OBSERVE</div><div className="hero-coordinate coord-b">02 / ORGANIZE</div><div className="hero-coordinate coord-c">03 / DELIVER</div><p className="hero-art-caption">A way of working<br /><span>从观察，到发生</span></p></div></div><div className="quick-info"><div><span>AGE</span><strong>27</strong></div><div><span>BASE</span><strong>杭州 Hangzhou</strong></div><div><span>EDUCATION</span><strong>浙江大学 · 艺术学学士</strong><small>Zhejiang University · Bachelor of Arts</small></div><div><span>FOCUS</span><strong>文旅活动策划 / 体验策划 / 项目落地执行</strong></div></div></section><section className="works-intro section-pad" id="work"><div className="section-kicker"><span>02 / Selected Works</span><span>Three ongoing questions</span></div><div className="works-heading"><h2>精选项目</h2><p className="case-english">Selected Works</p><p>过去几年，我参与过私宅、酒店、文旅与公共空间项目。从概念、方案、客户沟通一路跟进到施工，也越来越关心：人在一个空间里，究竟会发生什么。</p></div><div className="work-index"><a href="#yangming"><span>01</span><strong>阳明温泉山庄</strong><small>Concept / Experience</small></a><a href="#binrongfu"><span>02</span><strong>滨融府</strong><small>Delivery / Built</small></a><a href="#yuelongwan"><span>03</span><strong>悦龙湾</strong><small>System / In progress</small></a></div></section><YangmingCase /><BinrongCase /><YuelongCase /><HowIWork /><OutsideSection /><ExperienceSection /><section className="about-section section-pad" id="about"><div className="section-kicker"><span>10 / About</span><span>In a few words</span></div><div className="about-grid"><p className="about-lead">我喜欢从人的真实行为和感受开始思考，也喜欢把一个模糊的念头逐渐整理成可以被看见、参与和使用的东西。</p><div><p>过去几年，我主要通过空间做这件事。接下来，我希望尝试活动、内容与运营，让一个想法不只停留在方案里，而是真正在现场发生。</p><span className="signature">M.</span></div></div></section><section className="contact-section section-pad" id="contact"><div className="contact-topline"><span>11 / Contact</span><span>Open to opportunities</span></div><div className="contact-main"><h2>Say<br /><em>Hello.</em></h2><div className="contact-detail"><span>目前开放工作机会</span><a href="mailto:1062672214@qq.com">1062672214@qq.com <b>↗</b></a><a href="tel:17326083215">17326083215 <b>↗</b></a><p>Phone / WeChat</p></div></div><footer><span>Creative Planning × Experience Design</span><span>© 2026 / Hangzhou</span><a href="#top">Back to top ↑</a></footer></section></main></div>
}

export default App

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(<App />)
